// Servidor do Orvalis (ADRs 0016 e 0020 do jogo): salas fixas (`ROOMS`), cada uma um mundo compartilhado e salvo em
// disco, abertas a quem quiser entrar a qualquer hora. A sala em si (regras, jogadores, mundo, bolsas) é o `Room` do
// jogo, empacotado em vendor/orvalis-net.cjs — aqui só há rede, relógio e disco:
// WebSocket → mensagem lida com `parseClientMessage` → `Room` → mensagens entregues a quem deve receber.
// GET /        → página de teste (entra numa sala e mostra o que chega)
// GET /saude   → JSON com estado
// GET /salas   → lista das salas com quantos estão em cada uma (o menu do jogo mostra)
// WS  /ws      → protocolo do jogo (src/net/protocol.ts)
// Porta: process.env.PORT (a Hostinger define) ou 3000. CommonJS de propósito: o carregador de apps Node.js da
// hospedagem chama o arquivo de entrada com require().
const { createServer } = require('node:http');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const { WebSocketServer } = require('ws');
const net = require('../vendor/orvalis-net.cjs');
const { createStore } = require('./store');

const PACKAGE = readFileSync(join(__dirname, '..', 'vendor', 'orvalis-net.cjs'), 'utf8').split('\n', 1)[0].replace(/^\/\/\s*/, '');
/** De quanto em quanto tempo as salas com mudanças vão para o disco (ms). */
const SAVE_EVERY_MS = 15000;
/** Mensagens por segundo por conexão: acima disso são ignoradas; muito acima, a conexão cai. */
const MSG_PER_SEC = 40;
const MSG_KICK = 200;
/**
 * Endereços de onde o jogo pode conectar (o navegador manda a origem; clientes sem origem, como testes, passam).
 * O jogo espelha esta lista em `ONLINE_HOSTS` (`src/net/socket.ts` do mundoblocos-2d) para esconder "Jogar com amigos"
 * onde a conexão seria recusada: mudou aqui → mude lá.
 */
const DEFAULT_ORIGINS = [
  'https://orvalis.pensamentos.online',
  'https://santuario.orvalis.pensamentos.online',
  'https://orvalis-servidor.pensamentos.online',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
];

function startServer(port = Number(process.env.PORT) || 3000, options = {}) {
  const origins = new Set(options.origins ?? (process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',').map((s) => s.trim()) : DEFAULT_ORIGINS));
  const page = readFileSync(join(__dirname, '..', 'public', 'teste.html'));
  const started = Date.now();
  const store = createStore(options.dataDir);
  /** Salas fixas, abertas desde o início e nunca fechadas: número → { room, sockets: Map<id, ws> }. */
  const rooms = new Map();
  const loaded = {};
  for (const def of net.ROOMS) {
    const room = new net.Room(def.id, def.name, def.seed);
    const snap = store.load(def.id);
    loaded[def.id] = !!snap && room.restore(snap);
    rooms.set(def.id, { room, sockets: new Map() });
  }
  let lastSave = null;
  const saveAll = (force = false) => {
    for (const [id, entry] of rooms) {
      if (!force && !entry.room.dirty) continue;
      try {
        store.save(id, entry.room.snapshot());
        lastSave = new Date().toISOString();
      } catch (e) {
        console.error(`sala ${id}: não foi possível gravar`, e.message);
      }
    }
  };

  const http = createServer((req, res) => {
    const url = new URL(req.url ?? '/', 'http://localhost');
    const json = (data) => {
      res.writeHead(200, { 'content-type': 'application/json; charset=utf-8', 'access-control-allow-origin': '*' });
      res.end(JSON.stringify(data));
    };
    if (url.pathname === '/saude') {
      let jogadores = 0;
      for (const r of rooms.values()) jogadores += r.room.size;
      json({
        ok: true, protocolo: net.PROTOCOL_VERSION, pacote: PACKAGE, salas: rooms.size, jogadores,
        segundosNoAr: Math.round((Date.now() - started) / 1000),
        dados: {
          pasta: store.dir, ultimaGravacao: lastSave,
          salas: Object.fromEntries([...rooms.keys()].map((id) => [id, { carregadaDoDisco: loaded[id], bytes: store.size(id) }])),
        },
      });
      return;
    }
    if (url.pathname === '/salas') {
      json([...rooms.values()].map(({ room }) => ({ numero: room.id, nome: room.name, jogadores: room.size, maximo: net.MAX_PLAYERS })));
      return;
    }
    if (url.pathname === '/' || url.pathname === '/teste.html') {
      res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
      res.end(page);
      return;
    }
    res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
    res.end('não encontrado');
  });

  const wss = new WebSocketServer({
    server: http, path: '/ws', maxPayload: 16 * 1024,
    verifyClient: ({ origin }) => !origin || origins.has(origin),
  });

  const sendTo = (ws, msg) => { if (ws && ws.readyState === 1) ws.send(JSON.stringify(msg)); };
  /** Entrega as mensagens que a sala devolveu (`Outgoing`): a um jogador, a todos ou a todos menos um. */
  const route = (entry, self, out) => {
    for (const { to, msg } of out) {
      if (to === 0) { sendTo(self, msg); continue; }
      for (const [id, ws] of entry.sockets) {
        const ok = to === 'all' || (typeof to === 'number' ? to === id : to.except !== id);
        if (ok) sendTo(ws, msg);
      }
    }
  };

  wss.on('connection', (ws) => {
    ws.isAlive = true;
    ws.on('pong', () => { ws.isAlive = true; });
    let entry = null;
    let id = null;
    let windowStart = Date.now();
    let count = 0;

    ws.on('message', (data) => {
      const now = Date.now();
      if (now - windowStart > 1000) { windowStart = now; count = 0; }
      if (++count > MSG_KICK) { ws.close(1008, 'mensagens demais'); return; }
      if (count > MSG_PER_SEC) return;
      const m = net.parseClientMessage(String(data));
      if (!m) { sendTo(ws, { t: 'error', code: 'bad', message: 'Mensagem inválida.' }); return; }
      if (id === null) {
        if (m.t !== 'hello') return;
        const target = rooms.get(m.room);
        if (!target) { sendTo(ws, { t: 'error', code: 'room', message: 'Sala não encontrada.' }); return; }
        const r = target.room.join(m);
        if (r.id === null) { route(target, ws, r.out); return; }
        entry = target;
        id = r.id;
        entry.sockets.set(id, ws);
        route(entry, ws, r.out);
        return;
      }
      route(entry, ws, entry.room.handle(id, m));
    });

    ws.on('close', () => {
      if (!entry || id === null) return;
      entry.sockets.delete(id);
      route(entry, ws, entry.room.leave(id)); // a sala continua (mundo e bolsas guardados)
    });
  });

  // Relógio das salas: 1×/s cada sala avança a hora e faz as plantas crescerem (com gente ou sem); mudanças vão a todos.
  let last = Date.now();
  const clock = setInterval(() => {
    const now = Date.now();
    const dt = Math.min(5, (now - last) / 1000); // servidor pausado/atrasado: não pula dias de uma vez
    last = now;
    for (const entry of rooms.values()) route(entry, null, entry.room.tick(dt));
  }, 1000);
  // Disco: grava as salas que mudaram de tempos em tempos e ao desligar.
  const saver = setInterval(() => saveAll(), SAVE_EVERY_MS);
  const onExit = () => { saveAll(); process.exit(0); };
  if (!options.noSignals) { process.once('SIGTERM', onExit); process.once('SIGINT', onExit); }

  // Mantém a conexão viva atrás de proxies e derruba quem sumiu.
  const ping = setInterval(() => {
    for (const ws of wss.clients) {
      if (!ws.isAlive) { ws.terminate(); continue; }
      ws.isAlive = false;
      ws.ping();
    }
  }, 25000);
  http.listen(port, () => console.log(`orvalis-servidor ouvindo na porta ${http.address().port} — ${PACKAGE} — dados em ${store.dir}`));
  return {
    http, wss, rooms, saveAll,
    close: () => new Promise((r) => {
      clearInterval(ping); clearInterval(clock); clearInterval(saver);
      saveAll();
      for (const c of wss.clients) c.terminate();
      wss.close(); http.close(r);
    }),
  };
}

module.exports = { startServer };
