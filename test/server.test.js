const { test } = require('node:test');
const assert = require('node:assert/strict');
const WebSocket = require('ws');
const { startServer } = require('../src/app');
const net = require('../vendor/orvalis-net.cjs');

async function boot() {
  const s = startServer(0);
  await new Promise((r) => s.http.once('listening', r));
  return { s, url: `ws://127.0.0.1:${s.http.address().port}/ws`, port: s.http.address().port };
}

/** Cliente de teste: guarda as mensagens e espera por uma que satisfaça `pred`. */
function client(url, origin) {
  const ws = new WebSocket(url, origin ? { origin } : undefined);
  const msgs = [];
  const waiters = [];
  ws.on('message', (d) => {
    const m = JSON.parse(d);
    msgs.push(m);
    for (const w of [...waiters]) if (w.pred(m)) { waiters.splice(waiters.indexOf(w), 1); w.resolve(m); }
  });
  const open = new Promise((r, j) => { ws.once('open', r); ws.once('error', j); });
  return {
    ws, msgs, open,
    send: (m) => ws.send(JSON.stringify(m)),
    wait: (pred) => { const found = msgs.find(pred); return found ? Promise.resolve(found) : new Promise((resolve) => waiters.push({ pred, resolve })); },
  };
}

test('saúde mostra protocolo e pacote', async () => {
  const { s, port } = await boot();
  const saude = await (await fetch(`http://127.0.0.1:${port}/saude`)).json();
  assert.equal(saude.ok, true);
  assert.equal(saude.protocolo, net.PROTOCOL_VERSION);
  assert.match(saude.pacote, /mundoblocos-2d v/);
  await s.close();
});

test('dois jogadores na mesma sala: entrada, posição, ação aplicada para todos e recusa na cidade', async () => {
  const { s, url } = await boot();
  const a = client(url); await a.open;
  a.send({ t: 'hello', v: net.PROTOCOL_VERSION, name: 'Ana' });
  const wa = await a.wait((m) => m.t === 'welcome');
  assert.match(wa.room, /^[A-Z2-9]{6}$/);
  const b = client(url); await b.open;
  b.send({ t: 'hello', v: net.PROTOCOL_VERSION, name: 'Beto', room: wa.room.toLowerCase() });
  const wb = await b.wait((m) => m.t === 'welcome');
  assert.equal(wb.seed, wa.seed);
  // Protocolo 7: a sala tem hora própria (a mesma para todos) e o relógio dela anda sozinho.
  assert.equal(typeof wa.time, 'number');
  assert.ok(wb.time >= wa.time);
  assert.ok(Array.isArray(wb.grown));
  assert.deepEqual(wb.players.map((p) => p.name), ['Ana']);
  await a.wait((m) => m.t === 'joined' && m.player.name === 'Beto');

  a.send({ t: 'state', s: { x: 1.5, y: 2.5, facing: 'left', moving: true } });
  const st = await b.wait((m) => m.t === 'state');
  assert.equal(st.id, wa.you);

  // Ação fora da cidade, num lugar onde o mundo da sala deixa colocar: aplicada para os dois.
  const room = s.rooms.get(wa.room).room;
  const [gx, gy] = room.world.outsideGate();
  let spot = [gx, gy];
  for (let k = 1; k < 200 && !room.world.canPlace(spot[0], spot[1], 25); k++) spot = [gx + (k % 15) - 7, gy + 2 + Math.floor(k / 15)];
  const block = 25; // Pedra (Block.STONE)
  assert.equal(room.world.canPlace(spot[0], spot[1], block), true);
  a.send({ t: 'action', seq: 1, a: { kind: 'place', x: spot[0], y: spot[1], block } });
  await a.wait((m) => m.t === 'applied');
  const ab = await b.wait((m) => m.t === 'applied');
  assert.deepEqual(ab.action, { kind: 'place', x: spot[0], y: spot[1], block });

  // Cidade protegida: recusada só para quem tentou.
  const [sx, sy] = room.world.town.start;
  b.send({ t: 'action', seq: 7, a: { kind: 'break', x: sx, y: sy, tool: 'pickaxe' } });
  assert.deepEqual(await b.wait((m) => m.t === 'rejected'), { t: 'rejected', seq: 7 });

  a.ws.close();
  await b.wait((m) => m.t === 'left' && m.id === wa.you);
  b.ws.close();
  await new Promise((r) => setTimeout(r, 50));
  assert.equal(s.rooms.size, 0); // sala vazia acaba
  await s.close();
});

test('erros: sala inexistente, nome e versão inválidos, origem não permitida', async () => {
  const { s, url } = await boot();
  const c = client(url); await c.open;
  c.send({ t: 'hello', v: net.PROTOCOL_VERSION, name: 'Ana', room: 'ZZZZZZ' });
  assert.equal((await c.wait((m) => m.t === 'error')).code, 'room');
  const d = client(url); await d.open;
  d.send({ t: 'hello', v: net.PROTOCOL_VERSION + 1, name: 'Ana' });
  assert.equal((await d.wait((m) => m.t === 'error')).code, 'version');
  const e = client(url); await e.open;
  e.send({ t: 'hello', v: net.PROTOCOL_VERSION, name: '?' });
  assert.equal((await e.wait((m) => m.t === 'error')).code, 'name');
  const bad = client(url, 'https://site-estranho.example');
  await assert.rejects(bad.open);
  for (const x of [c, d, e]) x.ws.close();
  await s.close();
});
