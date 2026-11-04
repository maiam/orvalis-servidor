// Servidor do Orvalis — Etapa 2 (ADR 0016 do jogo): salas co-op com código de convite.
// A sala em si (regras, jogadores, edições) é o `Room` do jogo, empacotado em vendor/orvalis-net.cjs — aqui só há rede:
// WebSocket → mensagem lida com `parseClientMessage` → `Room` → mensagens entregues a quem deve receber.
// GET /        → página de teste (cria ou entra numa sala e mostra o que chega)
// GET /saude   → JSON com estado
// WS  /ws      → protocolo do jogo (src/net/protocol.ts)
// Porta: process.env.PORT (a Hostinger define) ou 3000. CommonJS de propósito: o carregador de apps Node.js da
// hospedagem chama o arquivo de entrada com require().
const { createServer } = require('node:http');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const { randomInt } = require('node:crypto');
const { WebSocketServer } = require('ws');
const net = require('../vendor/orvalis-net.cjs');

const PACKAGE = readFileSync(join(__dirname, '..', 'vendor', 'orvalis-net.cjs'), 'utf8').split('\n', 1)[0].replace(/^\/\/\s*/, '');
/** Salas abertas ao mesmo tempo (proteção de memória). */
const MAX_ROOMS = 200;
/** Mensagens por segundo por conexão: acima disso são ignoradas; muito acima, a conexão cai. */
const MSG_PER_SEC = 40;
const MSG_KICK = 200;
/** Endereços de onde o jogo pode conectar (o navegador manda a origem; clientes sem origem, como testes, passam). */
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
  /** código → { room, sockets: Map<id, ws> } */
  const rooms = new Map();

  const http = createServer((req, res) => {
    const url = new URL(req.url ?? '/', 'http://localhost');
    if (url.pathname === '/saude') {
      let jogadores = 0;
      for (const r of rooms.values()) jogadores += r.room.size;
      res.writeHead(200, { 'content-type': 'application/json; charset=utf-8', 'access-control-allow-origin': '*' });
      res.end(JSON.stringify({
        ok: true, protocolo: net.PROTOCOL_VERSION, pacote: PACKAGE, salas: rooms.size, jogadores,
        segundosNoAr: Math.round((Date.now() - started) / 1000),
      }));
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

  const sendTo = (ws, msg) => { if (ws.readyState === 1) ws.send(JSON.stringify(msg)); };
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
  const newCode = () => {
    let code;
    do code = net.makeRoomCode(() => randomInt(0, 1 << 30) / (1 << 30)); while (rooms.has(code));
    return code;
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
        let target;
        if (m.room !== undefined) {
          const code = net.normalizeRoomCode(m.room);
          target = code ? rooms.get(code) : undefined;
          if (!target) { sendTo(ws, { t: 'error', code: 'room', message: 'Sala não encontrada: confira o código de convite.' }); return; }
        } else {
          if (rooms.size >= MAX_ROOMS) { sendTo(ws, { t: 'error', code: 'full', message: 'Servidor cheio: tente de novo mais tarde.' }); return; }
          target = { room: new net.Room(newCode(), randomInt(0, 2 ** 31 - 1)), sockets: new Map() };
        }
        const r = target.room.join(m);
        if (r.id === null) { route(target, ws, r.out); return; }
        if (!rooms.has(target.room.code)) rooms.set(target.room.code, target);
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
      route(entry, ws, entry.room.leave(id));
      if (entry.room.size === 0) rooms.delete(entry.room.code); // sala vazia acaba (edições ficam só na memória, por ora)
    });
  });

  // Mantém a conexão viva atrás de proxies e derruba quem sumiu.
  const ping = setInterval(() => {
    for (const ws of wss.clients) {
      if (!ws.isAlive) { ws.terminate(); continue; }
      ws.isAlive = false;
      ws.ping();
    }
  }, 25000);
  http.listen(port, () => console.log(`orvalis-servidor ouvindo na porta ${http.address().port} — ${PACKAGE}`));
  return {
    http, wss, rooms,
    close: () => new Promise((r) => { clearInterval(ping); for (const c of wss.clients) c.terminate(); wss.close(); http.close(r); }),
  };
}

module.exports = { startServer };
