// Servidor do Orvalis — Etapa 0 (teste de hospedagem): confirma que a Hostinger aceita conexões WebSocket de fora.
// GET /        → página de teste (abre o WebSocket e mostra o eco)
// GET /saude   → JSON com estado (para monitorar)
// WS  /ws      → devolve cada mensagem recebida (eco) e avisa quantos estão conectados
// Porta: process.env.PORT (a Hostinger define) ou 3000.
import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { WebSocketServer } from 'ws';

export function startServer(port = Number(process.env.PORT) || 3000) {
  const page = readFileSync(new URL('./public/teste.html', import.meta.url));
  const started = Date.now();
  const http = createServer((req, res) => {
    const url = new URL(req.url ?? '/', 'http://localhost');
    if (url.pathname === '/saude') {
      res.writeHead(200, { 'content-type': 'application/json; charset=utf-8', 'access-control-allow-origin': '*' });
      res.end(JSON.stringify({ ok: true, conectados: wss.clients.size, segundosNoAr: Math.round((Date.now() - started) / 1000) }));
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
  const wss = new WebSocketServer({ server: http, path: '/ws', maxPayload: 16 * 1024 });
  const broadcast = (msg) => { for (const c of wss.clients) if (c.readyState === 1) c.send(msg); };
  wss.on('connection', (ws) => {
    ws.isAlive = true;
    ws.on('pong', () => { ws.isAlive = true; });
    ws.send(JSON.stringify({ tipo: 'ola', conectados: wss.clients.size }));
    broadcast(JSON.stringify({ tipo: 'conectados', conectados: wss.clients.size }));
    ws.on('message', (data) => ws.send(JSON.stringify({ tipo: 'eco', texto: String(data).slice(0, 500) })));
    ws.on('close', () => broadcast(JSON.stringify({ tipo: 'conectados', conectados: wss.clients.size })));
  });
  // Mantém a conexão viva atrás de proxies (alguns cortam conexões paradas) e derruba quem sumiu.
  const ping = setInterval(() => {
    for (const ws of wss.clients) {
      if (!ws.isAlive) { ws.terminate(); continue; }
      ws.isAlive = false;
      ws.ping();
    }
  }, 25000);
  wss.on('close', () => clearInterval(ping));
  http.listen(port, () => console.log(`orvalis-servidor ouvindo na porta ${http.address().port}`));
  return { http, wss, close: () => new Promise((r) => { clearInterval(ping); wss.close(); http.close(r); }) };
}

if (import.meta.url === `file://${process.argv[1]}`) startServer();
