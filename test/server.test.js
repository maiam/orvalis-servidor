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
  assert.equal(saude.protocolo, net.TITAN_PROTOCOL_VERSION);
  assert.match(saude.pacote, /mundoblocos-2d v/);
  await s.close();
});

test('erros: sala inexistente, nome e versão inválidos, origem não permitida', async () => {
  const { s, url } = await boot();
  const c = client(url); await c.open;
  c.send({ t: 'hello', v: net.TITAN_PROTOCOL_VERSION, name: 'Ana', room: 99 });
  assert.equal((await c.wait((m) => m.t === 'error')).code, 'room');
  const d = client(url); await d.open;
  d.send({ t: 'hello', v: net.TITAN_PROTOCOL_VERSION + 1, name: 'Ana', room: 101 });
  assert.equal((await d.wait((m) => m.t === 'error')).code, 'version');
  const e = client(url); await e.open;
  e.send({ t: 'hello', v: net.TITAN_PROTOCOL_VERSION, name: '?', room: 101 });
  assert.equal((await e.wait((m) => m.t === 'error')).code, 'bad'); // o protocolo do Titã recusa o nome inválido na leitura
  const bad = client(url, 'https://site-estranho.example');
  await assert.rejects(bad.open);
  for (const x of [c, d, e]) x.ws.close();
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

// ---- Salas do Titã (ADR 0104 do jogo): outro motor e outro protocolo, mesmas regras de rede e disco ----
const TITAN_Y = 150;
const titanHello = (name, v = net.TITAN_PROTOCOL_VERSION) => ({ t: 'hello', v, name, room: 101 });

test('/salas e /saude listam as salas do Titã (e só elas)', async () => {
  const { s, port } = await boot();
  const salas = await (await fetch(`http://127.0.0.1:${port}/salas`)).json();
  assert.deepEqual(salas.map((x) => x.numero), net.TITAN_ROOMS.map((r) => r.id));
  const tita = salas.find((x) => x.numero === 101);
  assert.equal(tita.nome, 'Titã 1'); assert.equal(tita.jogadores, 0); assert.equal(tita.maximo, net.TITAN_MAX_PLAYERS);
  const saude = await (await fetch(`http://127.0.0.1:${port}/saude`)).json();
  assert.ok(101 in saude.dados.salas);
  await s.close();
});

test('Titã: o hello abre o mundo da sala, o segundo jogador entra e a versão errada é recusada', async () => {
  const { s, url } = await boot();
  const a = client(url); await a.open;
  a.send(titanHello('Ana'));
  const w = await a.wait((m) => m.t === 'welcome');
  assert.equal(w.header.world, 'titan'); assert.equal(w.header.seed, net.TITAN_ROOMS[0].seed);
  const b = client(url); await b.open;
  b.send(titanHello('Beto'));
  const wb = await b.wait((m) => m.t === 'welcome');
  assert.deepEqual(wb.players.map((p) => p.name), ['Ana']);
  await a.wait((m) => m.t === 'joined' && m.p.name === 'Beto');
  assert.equal(s.rooms.get(101).room.size, 2);
  const c = client(url); await c.open;
  c.send(titanHello('Carla', 99));
  const err = await c.wait((m) => m.t === 'error');
  assert.equal(err.code, 'version');
  a.ws.close(); b.ws.close();
  await s.close();
});

test('Titã: colocar um bloco vale na sala (applied) e chega ao outro jogador como edição', async () => {
  const { s, url } = await boot();
  const room = s.rooms.get(101).room;
  const arr = room.world.volume.gen.arrival, x = Math.floor(arr.x) + 6, z = Math.floor(arr.z) + 6;
  for (let dx = -3; dx <= 3; dx++) for (let dz = -3; dz <= 3; dz++) { room.world.volume.set(x + dx, TITAN_Y - 1, z + dz, 3); for (let yy = TITAN_Y; yy < TITAN_Y + 4; yy++) room.world.volume.set(x + dx, yy, z + dz, 0); }
  const a = client(url), b = client(url); await Promise.all([a.open, b.open]);
  a.send(titanHello('Ana')); const wa = await a.wait((m) => m.t === 'welcome');
  b.send(titanHello('Beto')); await b.wait((m) => m.t === 'welcome');
  const view = room.viewOf(wa.id);
  view.inventory.add(3, 4); view.inventory.move([...Array(36).keys()].find((i) => view.inventory.get(i) && view.inventory.get(i).item === 3), 0);
  a.send({ t: 'state', s: { x: x + 0.5, y: TITAN_Y, z: z + 2.5, yaw: 0, pitch: 0, sel: 0 } });
  await new Promise((r) => setTimeout(r, 150)); // o `state` chega antes da ação
  a.send({ t: 'act', seq: 1, a: { k: 'place', hit: { x, y: TITAN_Y - 1, z, nx: 0, ny: 1, nz: 0 }, slot: 0 } });
  const ap = await a.wait((m) => m.t === 'applied');
  assert.equal(ap.ok, true);
  const ed = await b.wait((m) => m.t === 'edits' && m.cells.some((c) => c[0] === x && c[1] === TITAN_Y && c[2] === z && c[3] === 3));
  assert.ok(ed);
  assert.equal(room.world.volume.get(x, TITAN_Y, z), 3);
  a.ws.close(); b.ws.close();
  await s.close();
});

test('Titã: a sala é gravada em disco e volta ao reiniciar (mundo e bolsa por nome)', async () => {
  const dir = tempDir();
  let { s, url } = await boot(dir);
  const room = s.rooms.get(101).room;
  const arr = room.world.volume.gen.arrival, x = Math.floor(arr.x) + 6, z = Math.floor(arr.z) + 6;
  room.world.volume.set(x, TITAN_Y - 1, z, 3); room.world.volume.set(x, TITAN_Y, z, 3);
  const a = client(url); await a.open;
  a.send(titanHello('Ana')); await a.wait((m) => m.t === 'welcome');
  a.ws.close();
  await new Promise((r) => setTimeout(r, 200)); // a saída marca a sala como alterada
  assert.equal(room.dirty, true);
  s.saveAll();
  assert.ok(readdirSync(dir).includes('sala-101.json'));
  await s.close();
  ({ s, url } = await boot(dir));
  assert.equal(s.rooms.get(101).room.world.volume.get(x, TITAN_Y, z), 3);
  const saude = await (await fetch(`http://127.0.0.1:${s.http.address().port}/saude`)).json();
  assert.equal(saude.dados.salas[101].carregadaDoDisco, true);
  await s.close();
});

test('Titã: mensagem do protocolo do 2.5D (removido) é recusada e a sala 1 antiga não existe mais', async () => {
  const { s, url } = await boot();
  const a = client(url); await a.open;
  a.send(titanHello('Ana')); await a.wait((m) => m.t === 'welcome');
  a.send({ t: 'action', seq: 1, a: { kind: 'place', x: 1, y: 1, block: 25 } });
  const err = await a.wait((m) => m.t === 'error');
  assert.equal(err.code, 'bad');
  const b = client(url); await b.open;
  b.send({ t: 'hello', v: 29, sub: 2, name: 'Beto', room: 1 });
  assert.equal((await b.wait((m) => m.t === 'error')).code, 'room'); // as salas 1 e 2 do 2.5D saíram
  assert.equal(s.rooms.size, net.TITAN_ROOMS.length);
  a.ws.close(); b.ws.close();
  await s.close();
});

