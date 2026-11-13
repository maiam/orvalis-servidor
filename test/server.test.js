const { test } = require('node:test');
const assert = require('node:assert/strict');
const WebSocket = require('ws');
const { startServer } = require('../src/app');
const net = require('../vendor/orvalis-net.cjs');
const { mkdtempSync, readdirSync, readFileSync, writeFileSync } = require('node:fs');
const { createStore } = require('../src/store');
const { tmpdir } = require('node:os');
const { join } = require('node:path');

const tempDir = () => mkdtempSync(join(tmpdir(), 'orvalis-'));

async function boot(dataDir = tempDir()) {
  const s = startServer(0, { dataDir, noSignals: true });
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
  a.send({ t: 'hello', v: net.PROTOCOL_VERSION, name: 'Ana', room: 1 });
  const wa = await a.wait((m) => m.t === 'welcome');
  assert.equal(wa.room, 1);
  assert.equal(wa.roomName, 'Sala 1');
  const b = client(url); await b.open;
  b.send({ t: 'hello', v: net.PROTOCOL_VERSION, name: 'Beto', room: 1 });
  const wb = await b.wait((m) => m.t === 'welcome');
  assert.equal(wb.seed, wa.seed);
  // A sala tem hora própria (a mesma para todos) e o mundo vem nos chunks editados.
  assert.equal(typeof wa.time, 'number');
  assert.ok(wb.time >= wa.time);
  assert.ok(Array.isArray(wb.chunks));
  assert.deepEqual(wb.players.map((p) => p.name), ['Ana']);
  await a.wait((m) => m.t === 'joined' && m.player.name === 'Beto');

  a.send({ t: 'state', s: { x: 1.5, y: 2.5, facing: 'left', moving: true } });
  const st = await b.wait((m) => m.t === 'state');
  assert.equal(st.id, wa.you);

  // Ação fora da cidade, num lugar onde o mundo da sala deixa colocar: aplicada para os dois.
  const room = s.rooms.get(1).room;
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
  assert.equal(s.rooms.size, 1); // sala fixa: continua aberta, vazia
  await s.close();
});

test('erros: sala inexistente, nome e versão inválidos, origem não permitida', async () => {
  const { s, url } = await boot();
  const c = client(url); await c.open;
  c.send({ t: 'hello', v: net.PROTOCOL_VERSION, name: 'Ana', room: 99 });
  assert.equal((await c.wait((m) => m.t === 'error')).code, 'room');
  const d = client(url); await d.open;
  d.send({ t: 'hello', v: net.PROTOCOL_VERSION + 1, name: 'Ana', room: 1 });
  assert.equal((await d.wait((m) => m.t === 'error')).code, 'version');
  const e = client(url); await e.open;
  e.send({ t: 'hello', v: net.PROTOCOL_VERSION, name: '?', room: 1 });
  assert.equal((await e.wait((m) => m.t === 'error')).code, 'name');
  const bad = client(url, 'https://site-estranho.example');
  await assert.rejects(bad.open);
  for (const x of [c, d, e]) x.ws.close();
  await s.close();
});

test('sala fixa salva em disco: mundo e bolsa voltam depois de reiniciar; /salas lista quem está', async () => {
  const dir = tempDir();
  let { s, url, port } = await boot(dir);
  const lista = await (await fetch(`http://127.0.0.1:${port}/salas`)).json();
  assert.deepEqual(lista, [{ numero: 1, nome: 'Sala 1', jogadores: 0, maximo: net.MAX_PLAYERS }]);
  const a = client(url); await a.open;
  a.send({ t: 'hello', v: net.PROTOCOL_VERSION, name: 'Ana', room: 1 });
  await a.wait((m) => m.t === 'welcome');
  const room = s.rooms.get(1).room;
  const [gx, gy] = room.world.outsideGate();
  let spot = [gx, gy];
  for (let k = 1; k < 200 && !room.world.canPlace(spot[0], spot[1], 25); k++) spot = [gx + (k % 15) - 7, gy + 2 + Math.floor(k / 15)];
  a.send({ t: 'action', seq: 1, a: { kind: 'place', x: spot[0], y: spot[1], block: 25 } });
  await a.wait((m) => m.t === 'applied');
  a.send({ t: 'bag', bag: { inventory: { wheat: 4 }, hotbar: null, x: 3.5, y: 4.5 } });
  await new Promise((r) => setTimeout(r, 50));
  a.ws.close();
  await new Promise((r) => setTimeout(r, 50));
  await s.close(); // grava ao desligar

  ({ s, url } = await boot(dir));
  assert.equal(s.rooms.get(1).room.world.getObject(spot[0], spot[1]), 25);
  const b = client(url); await b.open;
  b.send({ t: 'hello', v: net.PROTOCOL_VERSION, name: 'ana', room: 1 });
  const w = await b.wait((m) => m.t === 'welcome');
  assert.deepEqual(w.bag, { inventory: { wheat: 4 }, hotbar: null, x: 3.5, y: 4.5 });
  assert.ok(w.chunks.length > 0);
  b.ws.close();
  await s.close();
});

test('grade: o hello com outra subdivisão é recusado como versão', async () => {
  const { s, url } = await boot();
  const c = client(url); await c.open;
  c.send({ t: 'hello', v: net.PROTOCOL_VERSION, sub: 2, name: 'Ana', room: 1 });
  assert.equal((await c.wait((m) => m.t === 'error')).code, 'version');
  const d = client(url); await d.open;
  d.send({ t: 'hello', v: net.PROTOCOL_VERSION, sub: 1, name: 'Bia', room: 1 });
  await d.wait((m) => m.t === 'welcome');
  for (const x of [c, d]) x.ws.close();
  await s.close();
});

test('cópia de segurança: a primeira regravação de cada pacote guarda o arquivo antigo e nunca o sobrescreve', () => {
  const dir = tempDir();
  const store = createStore(dir);
  store.save(1, { v: 4, marca: 'antiga' }, '0.93.7-aaaaaaa');
  assert.deepEqual(readdirSync(dir).filter((f) => f.endsWith('.bak')), []); // não havia o que guardar
  store.save(1, { v: 5, marca: 'nova' }, '0.93.58-c6c2569');
  store.save(1, { v: 5, marca: 'mais nova' }, '0.93.58-c6c2569');
  const baks = readdirSync(dir).filter((f) => f.endsWith('.bak'));
  assert.deepEqual(baks, ['sala-1.json.antes-0.93.58-c6c2569.bak']);
  assert.equal(JSON.parse(readFileSync(join(dir, baks[0]), 'utf8')).marca, 'antiga'); // o de antes do pacote novo, intacto
  assert.equal(store.load(1).marca, 'mais nova');
});

test('arquivo de sala de grade mais fina não é aberto nem perdido: a sala começa limpa e o arquivo vira .bak', async () => {
  const dir = tempDir();
  const snap = { v: net.ROOM_SNAPSHOT_VERSION ?? 5, room: 1, seed: net.ROOMS[0].seed, time: 0.2, savedAt: 1, chunks: [], bags: {}, chests: {}, sub: 2 };
  writeFileSync(join(dir, 'sala-1.json'), JSON.stringify(snap));
  const { s } = await boot(dir);
  // sala limpa (nada restaurado): enquanto ninguém mexe, o arquivo fino fica como está (nem regravado)
  assert.equal(readdirSync(dir).filter((f) => f.endsWith('.bak')).length, 0);
  s.rooms.get(1).room.dirty = true; // alguém mexeu: a próxima gravação guarda a cópia antes de regravar
  s.saveAll();
  await s.close();
  const baks = readdirSync(dir).filter((f) => f.endsWith('.bak'));
  assert.equal(baks.length, 1);
  assert.equal(JSON.parse(readFileSync(join(dir, baks[0]), 'utf8')).sub, 2);
});

test('arquivo antigo (protocolo 20, sem sub) ainda abre: vale como grade 1', async () => {
  const dir = tempDir();
  const room = new net.Room(1, 'Sala 1', net.ROOMS[0].seed);
  const old = JSON.parse(JSON.stringify(room.snapshot()));
  delete old.sub;
  old.v = 4;
  old.time = 0.77;
  writeFileSync(join(dir, 'sala-1.json'), JSON.stringify(old));
  const { s } = await boot(dir);
  assert.ok(Math.abs(s.rooms.get(1).room.time - 0.77) < 0.01);
  await s.close();
});
