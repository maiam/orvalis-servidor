import { test } from 'node:test';
import assert from 'node:assert/strict';
import WebSocket from 'ws';
import { startServer } from '../server.js';

test('saúde, página de teste e eco pelo WebSocket', async () => {
  const s = startServer(0);
  await new Promise((r) => s.http.once('listening', r));
  const port = s.http.address().port;
  const saude = await (await fetch(`http://127.0.0.1:${port}/saude`)).json();
  assert.equal(saude.ok, true);
  const page = await (await fetch(`http://127.0.0.1:${port}/`)).text();
  assert.match(page, /teste do servidor/);
  const ws = new WebSocket(`ws://127.0.0.1:${port}/ws`);
  const msgs = [];
  await new Promise((resolve, reject) => {
    ws.on('message', (d) => {
      const m = JSON.parse(d);
      msgs.push(m);
      if (m.tipo === 'ola') ws.send('olá');
      if (m.tipo === 'eco') resolve();
    });
    ws.on('error', reject);
  });
  assert.equal(msgs.find((m) => m.tipo === 'eco').texto, 'olá');
  ws.close();
  await s.close();
});
