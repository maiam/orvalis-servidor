// Gerado por mundoblocos-2d v0.191.0 (c5e1fa3) — npm run build:net. NÃO EDITE: atualize pelo jogo.
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/net/titan/index.ts
var index_exports = {};
__export(index_exports, {
  TITAN_MAX_PLAYERS: () => TITAN_MAX_PLAYERS,
  TITAN_PROTOCOL_VERSION: () => TITAN_PROTOCOL_VERSION,
  TITAN_ROOMS: () => TITAN_ROOMS,
  TITAN_SNAPSHOT_VERSION: () => TITAN_SNAPSHOT_VERSION,
  TitanRoom: () => TitanRoom,
  parseTitanClientMessage: () => parseTitanClientMessage,
  titanRoomById: () => titanRoomById
});
module.exports = __toCommonJS(index_exports);

// src/titan/tiles.json
var tiles_default = {
  tile: 16,
  pad: 2,
  cols: 8,
  iso: {
    tile: 8,
    pad: 1
  },
  tiles: [
    "01-areia-ocre/topo",
    "01-areia-ocre/lateral",
    "01-areia-ocre/base",
    "02-areia-umida/topo",
    "02-areia-umida/lateral",
    "02-areia-umida/base",
    "03-rocha-escura/topo",
    "03-rocha-escura/lateral",
    "03-rocha-escura/base",
    "04-gelo-fosco/topo",
    "04-gelo-fosco/lateral",
    "04-gelo-fosco/base",
    "05-rocha-mae/topo",
    "05-rocha-mae/lateral",
    "05-rocha-mae/base",
    "06-rocha-com-veio/topo",
    "06-rocha-com-veio/lateral",
    "06-rocha-com-veio/base",
    "07-gelo-com-veio/topo",
    "07-gelo-com-veio/lateral",
    "07-gelo-com-veio/base",
    "08-veio-de-cobre-de-duna/topo",
    "08-veio-de-cobre-de-duna/lateral",
    "08-veio-de-cobre-de-duna/base",
    "09-deposito-de-brasa/topo",
    "09-deposito-de-brasa/lateral",
    "09-deposito-de-brasa/base",
    "11-laje-de-rocha/topo",
    "11-laje-de-rocha/lateral",
    "12-revestimento-de-carapaca/topo",
    "12-revestimento-de-carapaca/lateral",
    "12-revestimento-de-carapaca/base",
    "17-braseiro-de-rocha/lateral-comum",
    "17-braseiro-de-rocha/topo-aceso",
    "17-braseiro-de-rocha/topo-apagado",
    "18-veio-de-ambar/topo",
    "18-veio-de-ambar/lateral",
    "18-veio-de-ambar/base",
    "19-bloco-de-ambar-compactado/topo",
    "19-bloco-de-ambar-compactado/lateral",
    "19-bloco-de-ambar-compactado/base",
    "20-esteira-de-junco/topo",
    "20-esteira-de-junco/lateral",
    "21-bloco-de-junco/topo",
    "21-bloco-de-junco/lateral",
    "21-bloco-de-junco/base",
    "22-laje-de-junco/topo",
    "22-laje-de-junco/lateral",
    "orvalis/grama-topo",
    "orvalis/grama-lateral",
    "orvalis/terra",
    "orvalis/pedra-topo",
    "orvalis/pedra-lateral",
    "orvalis/areia",
    "orvalis/tora-carvalho-topo",
    "orvalis/tora-carvalho-lateral",
    "orvalis/folhas-carvalho",
    "orvalis/tora-cerejeira-topo",
    "orvalis/tora-cerejeira-lateral",
    "orvalis/folhas-cerejeira",
    "orvalis/tora-betula-topo",
    "orvalis/tora-betula-lateral",
    "orvalis/folhas-betula",
    "orvalis/tabua-carvalho",
    "orvalis/tabua-cerejeira",
    "orvalis/tabua-betula",
    "orvalis/mesa-topo",
    "orvalis/mesa-frente",
    "orvalis/mesa-lateral",
    "orvalis/pedra-lisa",
    "orvalis/tijolo-pedra",
    "orvalis/laje-topo",
    "orvalis/laje-face",
    "orvalis/terra-arada-seca-topo",
    "orvalis/terra-arada-seca-lateral",
    "orvalis/terra-arada-umida-topo",
    "orvalis/terra-arada-umida-lateral",
    "orvalis/caminho-topo",
    "orvalis/caminho-lateral",
    "orvalis/terra-infertil",
    "orvalis/bloco-argila",
    "orvalis/bloco-tijolos",
    "orvalis/fornalha-topo",
    "orvalis/fornalha-lateral",
    "orvalis/fornalha-frente-apagada",
    "orvalis/fornalha-frente-acesa",
    "orvalis/minerio-carvao",
    "orvalis/bloco-carvao"
  ]
};

// src/titan/voxel.ts
var Y_MIN = -64;
var Y_MAX = 319;
var SECTION = 16;
var SECTIONS = (Y_MAX - Y_MIN + 1) / SECTION;
var LAKE_LAST_Y = 63;
var REGION_LEGACY = { min: -32, max: 32 };
var REGION_V6 = { min: -64, max: 64 };
var regionFor = (generatorVersion) => generatorVersion >= 6 ? REGION_V6 : REGION_LEGACY;
var REGION_MIN = REGION_LEGACY.min;
var REGION_MAX = REGION_LEGACY.max;
var T = { AIR: 0, SAND: 1, DAMP_SAND: 2, DARK_ROCK: 3, FROST: 4, LAKE: 5, BEDROCK: 6, LANTERN: 7, VEIN_ROCK: 8, VEIN_FROST: 9, WORKBENCH: 10, EMBER: 11, SLAB: 12, WORKBENCH_90: 13, WORKBENCH_180: 14, WORKBENCH_270: 15, SLAB_TOP: 16, SLAB_DOUBLE: 17, MARCO: 18, MARCO_90: 19, MARCO_180: 20, MARCO_270: 21, PAINEL: 22, PAINEL_Z: 23, VEIN_COPPER: 24, BRAZIER: 25, BRAZIER_LIT: 26, CARAPACE: 27, EMBER_VEIN: 28, EMBER_BLOCK: 29, MAT: 30, LADDER: 31, LADDER_90: 32, LADDER_180: 33, LADDER_270: 34, CHEST: 35, CHEST_90: 36, CHEST_180: 37, CHEST_270: 38, BED: 39, BED_90: 40, BED_180: 41, BED_270: 42, BED_HEAD: 43, BED_HEAD_90: 44, BED_HEAD_180: 45, BED_HEAD_270: 46, REED_BLOCK: 47, REED_SLAB: 48, REED_SLAB_TOP: 49, REED_STAIR: 50, REED_STAIR_90: 51, REED_STAIR_180: 52, REED_STAIR_270: 53, REED_CHAIR: 54, REED_CHAIR_90: 55, REED_CHAIR_180: 56, REED_CHAIR_270: 57, DOOR: 58, DOOR_LAST: 89, GRASS: 90, DIRT: 91, STONE: 92, BEACH: 93, LOG_OAK: 94, LEAVES_OAK: 95, LOG_CHERRY: 96, LEAVES_CHERRY: 97, LOG_BIRCH: 98, LEAVES_BIRCH: 99, PLANKS_OAK: 100, PLANKS_CHERRY: 101, PLANKS_BIRCH: 102, CARPENTRY: 103, CARPENTRY_90: 104, CARPENTRY_180: 105, CARPENTRY_270: 106, STONE_SMOOTH: 107, STONE_BRICK: 108, STONE_SLAB: 109, STONE_SLAB_TOP: 110, STONE_STAIR: 111, STONE_STAIR_90: 112, STONE_STAIR_180: 113, STONE_STAIR_270: 114, STONE_WALL: 115, STONE_WALL_LAST: 130, FARMLAND_DRY: 131, FARMLAND_WET: 132, PATH: 133, DIRT_INFERTILE: 134, CLAY_BLOCK: 135, BRICK_BLOCK: 136, FURNACE: 137, FURNACE_90: 138, FURNACE_180: 139, FURNACE_270: 140, FURNACE_LIT: 141, FURNACE_LIT_90: 142, FURNACE_LIT_180: 143, FURNACE_LIT_270: 144, TORCH: 145, TORCH_WALL: 146, TORCH_WALL_90: 147, TORCH_WALL_180: 148, TORCH_WALL_270: 149, COAL_ORE: 150, COAL_BLOCK: 151 };
var T_MAX = T.COAL_BLOCK;
var BLOCK_NAMES = { 1: "Areia ocre", 2: "Areia \xFAmida", 3: "Rocha escura", 4: "Gelo fosco", 5: "Lago escuro", 6: "Rocha-m\xE3e", 7: "Lanterna da margem", 8: "Rocha com veio", 9: "Gelo com veio", 10: "Mesa de Trabalho", 11: "Brasa de \xE2mbar", 12: "Laje de rocha", 13: "Mesa de Trabalho", 14: "Mesa de Trabalho", 15: "Mesa de Trabalho", 16: "Laje de rocha", 17: "Laje dupla de rocha", 18: "Marco de Margem", 19: "Marco de Margem", 20: "Marco de Margem", 21: "Marco de Margem", 22: "Painel de Junco", 23: "Painel de Junco", 24: "Veio de Cobre de Duna", 25: "Braseiro de Rocha", 26: "Braseiro de Rocha (aceso)", 27: "Revestimento de Carapa\xE7a", 28: "Veio de \xC2mbar", 29: "Bloco de \xC2mbar Compactado", 30: "Esteira de Junco", 31: "Escada de Junco", 32: "Escada de Junco", 33: "Escada de Junco", 34: "Escada de Junco", 35: "Ba\xFA de Rocha e Junco", 36: "Ba\xFA de Rocha e Junco", 37: "Ba\xFA de Rocha e Junco", 38: "Ba\xFA de Rocha e Junco", 39: "Cama de Junco", 40: "Cama de Junco", 41: "Cama de Junco", 42: "Cama de Junco", 43: "Cama de Junco", 44: "Cama de Junco", 45: "Cama de Junco", 46: "Cama de Junco", 47: "Bloco de Junco", 48: "Laje de Junco", 49: "Laje de Junco", 50: "Degrau de Junco", 51: "Degrau de Junco", 52: "Degrau de Junco", 53: "Degrau de Junco", 54: "Cadeira de Junco", 55: "Cadeira de Junco", 56: "Cadeira de Junco", 57: "Cadeira de Junco" };
for (let id = T.DOOR; id <= T.DOOR_LAST; id++) BLOCK_NAMES[id] = "Porta de Junco";
for (let t = 0; t < 4; t++) {
  BLOCK_NAMES[T.FURNACE + t] = "Fornalha";
  BLOCK_NAMES[T.FURNACE_LIT + t] = "Fornalha acesa";
}
for (let id = T.TORCH; id <= T.TORCH_WALL_270; id++) BLOCK_NAMES[id] = "Tocha";
BLOCK_NAMES[T.COAL_ORE] = "Min\xE9rio de Carv\xE3o";
BLOCK_NAMES[T.COAL_BLOCK] = "Bloco de Carv\xE3o";
Object.assign(BLOCK_NAMES, { 90: "Terra com Grama", 91: "Terra", 92: "Pedra", 93: "Areia da Praia", 94: "Tora de Carvalho", 95: "Folhas de Carvalho", 96: "Tora de Cerejeira", 97: "Folhas de Cerejeira", 98: "Tora de B\xE9tula", 99: "Folhas de B\xE9tula" });
Object.assign(BLOCK_NAMES, { 100: "T\xE1buas de Carvalho", 101: "T\xE1buas de Cerejeira", 102: "T\xE1buas de B\xE9tula", 103: "Mesa de Carpintaria", 104: "Mesa de Carpintaria", 105: "Mesa de Carpintaria", 106: "Mesa de Carpintaria" });
var isCarpentry = (id) => id >= T.CARPENTRY && id <= T.CARPENTRY_270;
var isFurnace = (id) => id >= T.FURNACE && id <= T.FURNACE_LIT_270;
var isFurnaceLit = (id) => id >= T.FURNACE_LIT && id <= T.FURNACE_LIT_270;
var furnaceTurn = (id) => isFurnace(id) ? (id - T.FURNACE) % 4 : 0;
var furnaceId = (turn, lit) => (lit ? T.FURNACE_LIT : T.FURNACE) + (turn % 4 + 4) % 4;
var isTorch = (id) => id >= T.TORCH && id <= T.TORCH_WALL_270;
var isWallTorch = (id) => id >= T.TORCH_WALL && id <= T.TORCH_WALL_270;
var wallTorchTurn = (id) => isWallTorch(id) ? id - T.TORCH_WALL : 0;
var wallTorchId = (turn) => T.TORCH_WALL + (turn % 4 + 4) % 4;
var TORCH_LIGHT = 14;
var carpentryId = (turn) => T.CARPENTRY + (turn % 4 + 4) % 4;
var carpentryTurnFacing = (yaw) => (Math.round(yaw / (Math.PI / 2)) % 4 + 4) % 4;
Object.assign(BLOCK_NAMES, { 107: "Pedra Lisa", 108: "Tijolo de Pedra", 109: "Laje de Pedra", 110: "Laje de Pedra", 111: "Degrau de Pedra", 112: "Degrau de Pedra", 113: "Degrau de Pedra", 114: "Degrau de Pedra" });
for (let m = 0; m < 16; m++) BLOCK_NAMES[115 + m] = "Mureta de Pedra";
Object.assign(BLOCK_NAMES, { 131: "Terra Arada Seca", 132: "Terra Arada \xDAmida", 133: "Caminho de Terra", 134: "Terra Inf\xE9rtil", 135: "Bloco de Argila", 136: "Bloco de Tijolos" });
var isLeaves = (id) => id === T.LEAVES_OAK || id === T.LEAVES_CHERRY || id === T.LEAVES_BIRCH;
var isSolid = (id) => id !== T.AIR && id !== T.LAKE && id !== T.LANTERN && !isMarco(id) && id !== T.MAT && !isLadder(id) && !isTorch(id);
var isTarget = (id) => isSolid(id) || id === T.LANTERN || isMarco(id) || id === T.MAT || isLadder(id) || isTorch(id);
var blocksLight = (id) => isFull(id) && !isLeaves(id);
var isOccupied = isTarget;
var blockHeight = (id) => blockSpan(id)[1];
var isSlab = (id) => id === T.SLAB || id === T.SLAB_TOP || id === T.REED_SLAB || id === T.REED_SLAB_TOP || id === T.STONE_SLAB || id === T.STONE_SLAB_TOP;
var isSlabBottom = (id) => id === T.SLAB || id === T.REED_SLAB || id === T.STONE_SLAB;
function blockSpan(id) {
  if (isWall(id)) return [0, WALL_HEIGHT];
  if (isStair(id) || isChair(id) || isDoor(id)) return [0, 1];
  if (isBrazier(id)) return [0, BRAZIER_HEIGHT];
  if (isChest(id)) return [0, CHEST_HEIGHT];
  if (isBed(id)) return [0, BED_HEIGHT];
  if (isPanel(id)) return [0, PANEL_HEIGHT];
  if (isSlab(id)) return isSlabBottom(id) ? [0, 0.5] : [0.5, 1];
  return isSolid(id) ? [0, 1] : [0, 0];
}
var isFull = (id) => isSolid(id) && !isSlab(id) && !isPanel(id) && !isChest(id) && !isBed(id) && !isBrazier(id) && !isStair(id) && !isChair(id) && !isDoor(id) && !isWall(id);
var isVein = (id) => id === T.VEIN_ROCK || id === T.VEIN_FROST;
var isReedStair = (id) => id >= T.REED_STAIR && id <= T.REED_STAIR_270;
var isStoneStair = (id) => id >= T.STONE_STAIR && id <= T.STONE_STAIR_270;
var isStair = (id) => isReedStair(id) || isStoneStair(id);
var isChair = (id) => id >= T.REED_CHAIR && id <= T.REED_CHAIR_270;
var stairTurn = (id) => isReedStair(id) ? id - T.REED_STAIR : isStoneStair(id) ? id - T.STONE_STAIR : 0;
var chairTurn = (id) => isChair(id) ? id - T.REED_CHAIR : 0;
var stairId = (turn, stone = false) => (stone ? T.STONE_STAIR : T.REED_STAIR) + (turn % 4 + 4) % 4;
var chairId = (turn) => T.REED_CHAIR + (turn % 4 + 4) % 4;
var WALL_N = 1;
var WALL_E = 2;
var WALL_S = 4;
var WALL_W = 8;
var WALL_HEIGHT = 0.75;
var isWall = (id) => id >= T.STONE_WALL && id <= T.STONE_WALL_LAST;
var wallMask = (id) => isWall(id) ? id - T.STONE_WALL : 0;
var wallId = (mask) => T.STONE_WALL + (mask & 15);
var wallConnects = (id) => isWall(id) || isFull(id);
function wallMaskFor(get, x, y, z) {
  return (wallConnects(get(x, y, z - 1)) ? WALL_N : 0) | (wallConnects(get(x + 1, y, z)) ? WALL_E : 0) | (wallConnects(get(x, y, z + 1)) ? WALL_S : 0) | (wallConnects(get(x - 1, y, z)) ? WALL_W : 0);
}
function wallBoxes(mask) {
  const h = WALL_HEIGHT, out = [[0.25, 0, 0.25, 0.75, h, 0.75]];
  if (mask & WALL_N) out.push([0.25, 0, 0, 0.75, h, 0.25]);
  if (mask & WALL_E) out.push([0.75, 0, 0.25, 1, h, 0.75]);
  if (mask & WALL_S) out.push([0.25, 0, 0.75, 0.75, h, 1]);
  if (mask & WALL_W) out.push([0, 0, 0.25, 0.25, h, 0.75]);
  return out;
}
var STAIR_BASE = [[0, 0, 0, 1, 0.5, 1], [0, 0.5, 0, 1, 1, 0.5]];
var CHAIR_BASE = [[0.1, 0, 0.1, 0.9, 0.5, 0.9], [0.1, 0.5, 0.1, 0.9, 1, 0.22]];
function rotateBox(b, turn) {
  let [x0, y0, z0, x1, y1, z1] = b;
  for (let i = 0; i < (turn % 4 + 4) % 4; i++) {
    const nx0 = z0, nx1 = z1, nz0 = 1 - x1, nz1 = 1 - x0;
    x0 = Math.min(nx0, nx1);
    x1 = Math.max(nx0, nx1);
    z0 = nz0;
    z1 = nz1;
  }
  return [x0, y0, z0, x1, y1, z1];
}
var DOOR_THICK = 0.1875;
var isDoor = (id) => id >= T.DOOR && id <= T.DOOR_LAST;
var isDoorUpper = (id) => isDoor(id) && (id - T.DOOR & 16) !== 0;
var doorTurn = (id) => isDoor(id) ? id - T.DOOR & 3 : 0;
var isDoorOpen = (id) => isDoor(id) && (id - T.DOOR & 4) !== 0;
var isDoorHingeRight = (id) => isDoor(id) && (id - T.DOOR & 8) !== 0;
var doorId = (turn, hingeRight, open, upper) => T.DOOR + (turn % 4 + 4) % 4 + (open ? 4 : 0) + (hingeRight ? 8 : 0) + (upper ? 16 : 0);
var doorToggled = (id) => isDoor(id) ? isDoorOpen(id) ? id - 4 : id + 4 : id;
var doorRight = (turn) => {
  const [fx, fz] = ladderFacing(turn);
  return [fz === 0 ? 0 : fz, fx === 0 ? 0 : -fx];
};
function doorBox(hingeRight, open) {
  if (!open) return [0, 0, 1 - DOOR_THICK, 1, 1, 1];
  return hingeRight ? [1 - DOOR_THICK, 0, 0, 1, 1, 1] : [0, 0, 0, DOOR_THICK, 1, 1];
}
var BOXES = /* @__PURE__ */ new Map();
for (let t = 0; t < 4; t++) for (const hr of [false, true]) for (const op of [false, true]) for (const up of [false, true]) BOXES.set(doorId(t, hr, op, up), [rotateBox(doorBox(hr, op), t)]);
for (let m = 0; m < 16; m++) BOXES.set(T.STONE_WALL + m, wallBoxes(m));
for (let t = 0; t < 4; t++) {
  BOXES.set(T.REED_STAIR + t, STAIR_BASE.map((b) => rotateBox(b, t)));
  BOXES.set(T.STONE_STAIR + t, STAIR_BASE.map((b) => rotateBox(b, t)));
  BOXES.set(T.REED_CHAIR + t, CHAIR_BASE.map((b) => rotateBox(b, t)));
}
var blockBoxes = (id) => BOXES.get(id) ?? null;
var isBrazier = (id) => id === T.BRAZIER || id === T.BRAZIER_LIT;
var BRAZIER_HEIGHT = 0.774;
var BRAZIER_LIGHT = 13;
var lightLevelOf = (id) => id === T.LANTERN ? 15 : isTorch(id) ? TORCH_LIGHT : id === T.BRAZIER_LIT || isFurnaceLit(id) ? BRAZIER_LIGHT : 0;
var isCopperVein = (id) => id === T.VEIN_COPPER;
var isAmberVein = (id) => id === T.EMBER_VEIN;
var WORKBENCH_IDS = [T.WORKBENCH, T.WORKBENCH_90, T.WORKBENCH_180, T.WORKBENCH_270];
var isWorkbench = (id) => id === T.WORKBENCH || id >= T.WORKBENCH_90 && id <= T.WORKBENCH_270;
var workbenchTurn = (id) => id === T.WORKBENCH ? 0 : id >= T.WORKBENCH_90 && id <= T.WORKBENCH_270 ? id - T.WORKBENCH_90 + 1 : 0;
var workbenchId = (turn) => WORKBENCH_IDS[(turn % 4 + 4) % 4];
var workbenchTurnFacing = (yaw) => (Math.round((yaw + Math.PI) / (Math.PI / 2)) % 4 + 4) % 4;
var MARCO_IDS = [T.MARCO, T.MARCO_90, T.MARCO_180, T.MARCO_270];
var isMarco = (id) => id >= T.MARCO && id <= T.MARCO_270;
var marcoTurn = (id) => isMarco(id) ? id - T.MARCO : 0;
var marcoId = (turn) => MARCO_IDS[(turn % 4 + 4) % 4];
var marcoTurnFacing = (yaw) => (Math.round(yaw / (Math.PI / 2)) % 4 + 4) % 4;
var isPanel = (id) => id === T.PAINEL || id === T.PAINEL_Z;
var PANEL_HEIGHT = 0.944;
var panelIdFacing = (yaw) => Math.abs(Math.cos(yaw)) >= Math.abs(Math.sin(yaw)) ? T.PAINEL : T.PAINEL_Z;
var isCollectBlock = (id) => id === T.LANTERN || isMarco(id) || isPanel(id) || id === T.MAT || isLadder(id);
var isMat = (id) => id === T.MAT;
var isLadder = (id) => id >= T.LADDER && id <= T.LADDER_270;
var ladderTurn = (id) => isLadder(id) ? id - T.LADDER : 0;
var ladderId = (turn) => T.LADDER + (turn % 4 + 4) % 4;
var ladderFacing = (turn) => [[0, 1], [1, 0], [0, -1], [-1, 0]][(turn % 4 + 4) % 4];
var ladderTurnOf = (nx, nz) => nz > 0 ? 0 : nx > 0 ? 1 : nz < 0 ? 2 : nx < 0 ? 3 : 0;
var CHEST_HEIGHT = 0.7305;
var isChest = (id) => id >= T.CHEST && id <= T.CHEST_270;
var chestTurn = (id) => isChest(id) ? id - T.CHEST : 0;
var chestId = (turn) => T.CHEST + (turn % 4 + 4) % 4;
var chestTurnFacing = (yaw) => (Math.round(yaw / (Math.PI / 2)) % 4 + 4) % 4;
var BED_HEIGHT = 0.4527;
var isBedFoot = (id) => id >= T.BED && id <= T.BED_270;
var isBedHead = (id) => id >= T.BED_HEAD && id <= T.BED_HEAD_270;
var isBed = (id) => id >= T.BED && id <= T.BED_HEAD_270;
var bedTurn = (id) => isBedFoot(id) ? id - T.BED : isBedHead(id) ? id - T.BED_HEAD : 0;
var bedFootId = (turn) => T.BED + (turn % 4 + 4) % 4;
var bedHeadId = (turn) => T.BED_HEAD + (turn % 4 + 4) % 4;
var bedTurnFacing = (yaw) => ((Math.round(yaw / (Math.PI / 2)) + 2) % 4 + 4) % 4;
function bedPartnerOffset(id) {
  const [fx, fz] = ladderFacing(bedTurn(id));
  return isBedFoot(id) ? [fx, fz] : [fx === 0 ? 0 : -fx, fz === 0 ? 0 : -fz];
}
var MURETA_KINDS = ["mureta0", "mureta1", "mureta2", "mureta3", "mureta4", "mureta5", "mureta6", "mureta7", "mureta8", "mureta9", "mureta10", "mureta11", "mureta12", "mureta13", "mureta14", "mureta15"];
function modelOf(id) {
  if (isWorkbench(id)) return { kind: "workbench", turn: workbenchTurn(id) };
  if (isMarco(id)) return { kind: "marco", turn: marcoTurn(id) };
  if (isPanel(id)) return { kind: "painel", turn: id === T.PAINEL ? 0 : 1 };
  if (isLadder(id)) return { kind: "escada", turn: ladderTurn(id) };
  if (isTorch(id)) return id === T.TORCH ? { kind: "tocha", turn: 0 } : { kind: "tochaParede", turn: wallTorchTurn(id) };
  if (isChest(id)) return { kind: "bau", turn: chestTurn(id) };
  if (isBedFoot(id)) return { kind: "cama", turn: bedTurn(id) };
  if (isReedStair(id)) return { kind: "degrau", turn: stairTurn(id) };
  if (isWall(id)) return { kind: MURETA_KINDS[wallMask(id)], turn: 0 };
  if (isStoneStair(id)) return { kind: "degrauPedra", turn: stairTurn(id) };
  if (isChair(id)) return { kind: "cadeira", turn: chairTurn(id) };
  if (isDoor(id) && !isDoorUpper(id)) return { kind: "porta", turn: id - T.DOOR & 15 };
  if (id === T.BRAZIER) return { kind: "braseiro", turn: 0 };
  if (id === T.BRAZIER_LIT) return { kind: "braseiroAceso", turn: 0 };
  return null;
}
var TILE_NAMES = tiles_default.tiles;
var TILE_INDEX = new Map(TILE_NAMES.map((n, i) => [n, i]));
function tileIndex(name) {
  const i = TILE_INDEX.get(name);
  if (i === void 0) throw new Error(`tile desconhecido: ${name}`);
  return i;
}
var faces3 = (prefix) => [tileIndex(`${prefix}/topo`), tileIndex(`${prefix}/lateral`), tileIndex(`${prefix}/base`)];
var ROCK = faces3("03-rocha-escura");
var BLOCK_TILES = {
  [T.SAND]: faces3("01-areia-ocre"),
  [T.DAMP_SAND]: faces3("02-areia-umida"),
  [T.DARK_ROCK]: ROCK,
  [T.FROST]: faces3("04-gelo-fosco"),
  [T.BEDROCK]: faces3("05-rocha-mae"),
  [T.LAKE]: ROCK,
  // o líquido tem atlas próprio (ADR 0057); este tile só preenche o índice
  [T.VEIN_ROCK]: faces3("06-rocha-com-veio"),
  [T.VEIN_FROST]: faces3("07-gelo-com-veio"),
  [T.VEIN_COPPER]: faces3("08-veio-de-cobre-de-duna"),
  [T.EMBER]: faces3("09-deposito-de-brasa"),
  [T.SLAB]: [tileIndex("11-laje-de-rocha/topo"), tileIndex("11-laje-de-rocha/lateral"), tileIndex("11-laje-de-rocha/topo")],
  // a lateral tem 32 × 16 e usa a metade de cima do tile
  [T.MAT]: [tileIndex("20-esteira-de-junco/topo"), tileIndex("20-esteira-de-junco/lateral"), tileIndex("20-esteira-de-junco/lateral")],
  [T.CARAPACE]: faces3("12-revestimento-de-carapaca"),
  [T.EMBER_VEIN]: faces3("18-veio-de-ambar"),
  [T.EMBER_BLOCK]: faces3("19-bloco-de-ambar-compactado"),
  [T.BRAZIER]: [tileIndex("17-braseiro-de-rocha/topo-apagado"), tileIndex("17-braseiro-de-rocha/lateral-comum"), tileIndex("17-braseiro-de-rocha/lateral-comum")],
  [T.BRAZIER_LIT]: [tileIndex("17-braseiro-de-rocha/topo-aceso"), tileIndex("17-braseiro-de-rocha/lateral-comum"), tileIndex("17-braseiro-de-rocha/lateral-comum")]
};
BLOCK_TILES[T.SLAB_TOP] = BLOCK_TILES[T.SLAB];
var ot = (a, b = a, c = b) => [tileIndex(`orvalis/${a}`), tileIndex(`orvalis/${b}`), tileIndex(`orvalis/${c}`)];
BLOCK_TILES[T.GRASS] = ot("grama-topo", "grama-lateral", "terra");
BLOCK_TILES[T.DIRT] = ot("terra");
BLOCK_TILES[T.STONE] = ot("pedra-topo", "pedra-lateral", "pedra-topo");
BLOCK_TILES[T.BEACH] = ot("areia");
BLOCK_TILES[T.LOG_OAK] = ot("tora-carvalho-topo", "tora-carvalho-lateral", "tora-carvalho-topo");
BLOCK_TILES[T.LEAVES_OAK] = ot("folhas-carvalho");
BLOCK_TILES[T.LOG_CHERRY] = ot("tora-cerejeira-topo", "tora-cerejeira-lateral", "tora-cerejeira-topo");
BLOCK_TILES[T.LEAVES_CHERRY] = ot("folhas-cerejeira");
BLOCK_TILES[T.LOG_BIRCH] = ot("tora-betula-topo", "tora-betula-lateral", "tora-betula-topo");
BLOCK_TILES[T.LEAVES_BIRCH] = ot("folhas-betula");
BLOCK_TILES[T.PLANKS_OAK] = ot("tabua-carvalho");
BLOCK_TILES[T.PLANKS_CHERRY] = ot("tabua-cerejeira");
BLOCK_TILES[T.PLANKS_BIRCH] = ot("tabua-betula");
BLOCK_TILES[T.STONE_SMOOTH] = ot("pedra-lisa");
BLOCK_TILES[T.STONE_BRICK] = ot("tijolo-pedra");
BLOCK_TILES[T.STONE_SLAB] = ot("laje-topo", "laje-face", "laje-topo");
BLOCK_TILES[T.STONE_SLAB_TOP] = BLOCK_TILES[T.STONE_SLAB];
BLOCK_TILES[T.FARMLAND_DRY] = ot("terra-arada-seca-topo", "terra-arada-seca-lateral", "terra");
BLOCK_TILES[T.FARMLAND_WET] = ot("terra-arada-umida-topo", "terra-arada-umida-lateral", "terra");
BLOCK_TILES[T.PATH] = ot("caminho-topo", "caminho-lateral", "terra");
BLOCK_TILES[T.DIRT_INFERTILE] = ot("terra-infertil");
BLOCK_TILES[T.CLAY_BLOCK] = ot("bloco-argila");
BLOCK_TILES[T.BRICK_BLOCK] = ot("bloco-tijolos");
BLOCK_TILES[T.COAL_ORE] = ot("minerio-carvao");
BLOCK_TILES[T.COAL_BLOCK] = ot("bloco-carvao");
for (let t = 0; t < 8; t++) BLOCK_TILES[T.FURNACE + t] = ot("fornalha-topo", "fornalha-lateral", "fornalha-topo");
for (let t = 0; t < 4; t++) BLOCK_TILES[T.CARPENTRY + t] = [tileIndex("orvalis/mesa-topo"), tileIndex("orvalis/mesa-lateral"), tileIndex("orvalis/tabua-carvalho")];
BLOCK_TILES[T.REED_BLOCK] = faces3("21-bloco-de-junco");
BLOCK_TILES[T.REED_SLAB] = [tileIndex("22-laje-de-junco/topo"), tileIndex("22-laje-de-junco/lateral"), tileIndex("22-laje-de-junco/topo")];
BLOCK_TILES[T.REED_SLAB_TOP] = BLOCK_TILES[T.REED_SLAB];
var FRONT_FURNACE = tileIndex("orvalis/fornalha-frente-apagada");
var FRONT_FURNACE_LIT = tileIndex("orvalis/fornalha-frente-acesa");
var FRONT_CARPENTRY = tileIndex("orvalis/mesa-frente");
var inRegion = (x, z, r = REGION_LEGACY) => x >= r.min && x < r.max && z >= r.min && z < r.max;
var chunkOf = (v) => Math.floor(v / 16);
var localOf = (v) => v - chunkOf(v) * 16;
var sectionOf = (y) => Math.floor((y - Y_MIN) / SECTION);
var columnIndex = (lx, y, lz) => ((y - Y_MIN) * 16 + lz) * 16 + lx;
var unpackIndex = (i) => ({ lx: i & 15, lz: i >> 4 & 15, y: (i >> 8) + Y_MIN });
var chunkKey = (cx, cz) => `${cx},${cz}`;

// src/titan/soil.ts
var HYDRATION_RADIUS = 4;
function isHydrated(v, x, y, z) {
  for (let dy = 0; dy <= 1; dy++)
    for (let dx = -HYDRATION_RADIUS; dx <= HYDRATION_RADIUS; dx++)
      for (let dz = -HYDRATION_RADIUS; dz <= HYDRATION_RADIUS; dz++) if (v.get(x + dx, y + dy, z + dz) === T.LAKE) return true;
  return false;
}
function hoeResult(v, block, x, y, z) {
  if (block === T.GRASS || block === T.DIRT || block === T.PATH) return isHydrated(v, x, y, z) ? T.FARMLAND_WET : T.FARMLAND_DRY;
  if (block === T.DIRT_INFERTILE) return T.DIRT;
  return null;
}
var shovelResult = (block) => block === T.GRASS || block === T.DIRT ? T.PATH : null;

// src/titan/items.ts
var Item = { SAND: 1, DAMP_SAND: 2, DARK_ROCK: 3, FROST: 4, ROCK_SHARD: 5, FROST_SHARD: 6, CAPSULE: 7, LANTERN: 8, WORKBENCH: 9, ICE_LENS: 10, EMBER: 11, GLASS_REED: 12, SLAB: 13, MARCO: 14, PAINEL: 15, NOZ: 16, COPPER_SHARD: 17, COPPER_INGOT: 18, DRY_REED: 19, STONE_PICK: 20, BRAZIER: 21, STONE_DAGGER: 22, COPPER_PICK: 23, COPPER_DAGGER: 24, PLATE: 25, CARAPACE: 26, RAW_MEAT: 27, COOKED_MEAT: 28, EMBER_BLOCK: 29, NOZ_TORRADA: 30, ESTEIRA: 31, ESCADA: 32, BAU: 33, CAMA: 34, BALDE: 35, BALDE_CHEIO: 36, BLOCO_JUNCO: 37, LAJE_JUNCO: 38, DEGRAU_JUNCO: 39, CADEIRA_JUNCO: 40, PORTA_JUNCO: 41, GRASS: 42, DIRT: 43, STONE: 44, BEACH: 45, LOG_OAK: 46, LEAVES_OAK: 47, LOG_CHERRY: 48, LEAVES_CHERRY: 49, LOG_BIRCH: 50, LEAVES_BIRCH: 51, TABUA_CARVALHO: 52, TABUA_CEREJEIRA: 53, TABUA_BETULA: 54, HASTE: 55, MESA_CARPINTARIA: 56, PEDRA_LISA: 57, TIJOLO_PEDRA: 58, LAJE_PEDRA: 59, DEGRAU_PEDRA: 60, MURETA_PEDRA: 61, TERRA_ARADA_SECA: 62, TERRA_ARADA_UMIDA: 63, CAMINHO_TERRA: 64, TERRA_INFERTIL: 65, BLOCO_ARGILA: 66, BLOCO_TIJOLOS: 67, BOLA_ARGILA: 68, TIJOLO: 69, PICARETA_MADEIRA: 70, PICARETA_PEDRA: 71, MACHADO_MADEIRA: 72, MACHADO_PEDRA: 73, PA_MADEIRA: 74, PA_PEDRA: 75, ENXADA_MADEIRA: 76, ENXADA_PEDRA: 77, SEMENTE_TRIGO: 78, TRIGO: 79, CENOURA: 80, BATATA: 81, TOMATE: 82, FORNALHA: 83, CARVAO_VEGETAL: 84, TOCHA: 85, CARVAO: 87, BLOCO_CARVAO: 88 };
var ITEM_NAMES = {
  1: "Areia ocre",
  2: "Areia \xFAmida",
  3: "Rocha escura",
  4: "Gelo fosco",
  5: "Fragmento de rocha",
  6: "Fragmento de gelo",
  7: "C\xE1psula de luz",
  8: "Lanterna da margem",
  9: "Mesa de Trabalho",
  10: "Lente de Gelo",
  11: "Brasa de \xE2mbar",
  12: "Junco de vidro",
  13: "Laje de rocha",
  14: "Marco de Margem",
  15: "Painel de Junco",
  16: "Noz de Duna",
  17: "Fragmento de Cobre de Duna",
  18: "Lingote de Cobre de Duna",
  19: "Haste Seca de Junco",
  20: "Picareta de Rocha",
  21: "Braseiro de Rocha",
  22: "Adaga de Rocha",
  23: "Picareta de Cobre",
  24: "Adaga de Cobre",
  25: "Placa de Carapa\xE7a",
  26: "Revestimento de Carapa\xE7a",
  27: "Carne Crua de Farejador",
  28: "Carne Assada de Farejador",
  29: "Bloco de \xC2mbar Compactado",
  30: "Noz Torrada",
  31: "Esteira de Junco",
  32: "Escada de Junco",
  33: "Ba\xFA de Rocha e Junco",
  34: "Cama de Junco",
  35: "Balde de Cobre",
  36: "Balde de Cobre (cheio)",
  37: "Bloco de Junco",
  38: "Laje de Junco",
  39: "Degrau de Junco",
  40: "Cadeira de Junco",
  41: "Porta de Junco"
};
var ORVALIS_ITEM_BLOCKS = { [Item.GRASS]: T.GRASS, [Item.DIRT]: T.DIRT, [Item.STONE]: T.STONE, [Item.BEACH]: T.BEACH, [Item.LOG_OAK]: T.LOG_OAK, [Item.LEAVES_OAK]: T.LEAVES_OAK, [Item.LOG_CHERRY]: T.LOG_CHERRY, [Item.LEAVES_CHERRY]: T.LEAVES_CHERRY, [Item.LOG_BIRCH]: T.LOG_BIRCH, [Item.LEAVES_BIRCH]: T.LEAVES_BIRCH, [Item.TABUA_CARVALHO]: T.PLANKS_OAK, [Item.TABUA_CEREJEIRA]: T.PLANKS_CHERRY, [Item.TABUA_BETULA]: T.PLANKS_BIRCH, [Item.MESA_CARPINTARIA]: T.CARPENTRY, [Item.PEDRA_LISA]: T.STONE_SMOOTH, [Item.TIJOLO_PEDRA]: T.STONE_BRICK, [Item.LAJE_PEDRA]: T.STONE_SLAB, [Item.TERRA_ARADA_SECA]: T.FARMLAND_DRY, [Item.TERRA_ARADA_UMIDA]: T.FARMLAND_WET, [Item.CAMINHO_TERRA]: T.PATH, [Item.TERRA_INFERTIL]: T.DIRT_INFERTILE, [Item.BLOCO_ARGILA]: T.CLAY_BLOCK, [Item.BLOCO_TIJOLOS]: T.BRICK_BLOCK, [Item.FORNALHA]: T.FURNACE, [Item.TOCHA]: T.TORCH, [Item.BLOCO_CARVAO]: T.COAL_BLOCK };
var ORVALIS_BLOCK_ITEMS = { ...Object.fromEntries(Object.entries(ORVALIS_ITEM_BLOCKS).map(([item, block]) => [block, Number(item)])), ...Object.fromEntries(Array.from({ length: 8 }, (_, t) => [T.FURNACE + t, Item.FORNALHA])), ...Object.fromEntries(Array.from({ length: 5 }, (_, t) => [T.TORCH + t, Item.TOCHA])), [T.COAL_ORE]: Item.CARVAO };
for (const [item, block] of Object.entries(ORVALIS_ITEM_BLOCKS)) ITEM_NAMES[Number(item)] = BLOCK_NAMES[block];
Object.assign(ITEM_NAMES, { 70: "Picareta de Madeira", 71: "Picareta de Pedra", 72: "Machado de Madeira", 73: "Machado de Pedra", 74: "P\xE1 de Madeira", 75: "P\xE1 de Pedra", 76: "Enxada de Madeira", 77: "Enxada de Pedra" });
Object.assign(ITEM_NAMES, { 78: "Semente de Trigo", 79: "Trigo", 80: "Cenoura", 81: "Batata", 82: "Tomate" });
ITEM_NAMES[Item.CARVAO_VEGETAL] = "Carv\xE3o Vegetal";
ITEM_NAMES[Item.CARVAO] = "Carv\xE3o";
ITEM_NAMES[Item.BOLA_ARGILA] = "Bola de Argila";
ITEM_NAMES[Item.TIJOLO] = "Tijolo";
ITEM_NAMES[Item.MURETA_PEDRA] = "Mureta de Pedra";
ITEM_NAMES[Item.DEGRAU_PEDRA] = "Degrau de Pedra";
ITEM_NAMES[Item.HASTE] = "Haste de Madeira";
var maxStack = (item) => item === Item.CAPSULE || item === Item.LANTERN || item === Item.WORKBENCH || isBucket(item) || isTool(item) ? 1 : 64;
var isItem = (n) => Number.isInteger(n) && n >= 1 && n <= 88 && n !== 86;
var isBucket = (item) => item === Item.BALDE || item === Item.BALDE_CHEIO;
function blockOfItem(item) {
  if (item >= Item.SAND && item <= Item.FROST) return item;
  if (ORVALIS_ITEM_BLOCKS[item]) return ORVALIS_ITEM_BLOCKS[item];
  if (item === Item.MURETA_PEDRA) return T.STONE_WALL;
  if (item === Item.DEGRAU_PEDRA) return T.STONE_STAIR;
  if (item === Item.LANTERN) return T.LANTERN;
  if (item === Item.WORKBENCH) return T.WORKBENCH;
  if (item === Item.SLAB) return T.SLAB;
  if (item === Item.BLOCO_JUNCO) return T.REED_BLOCK;
  if (item === Item.LAJE_JUNCO) return T.REED_SLAB;
  if (item === Item.DEGRAU_JUNCO) return T.REED_STAIR;
  if (item === Item.CADEIRA_JUNCO) return T.REED_CHAIR;
  if (item === Item.PORTA_JUNCO) return T.DOOR;
  if (item === Item.MARCO) return T.MARCO;
  if (item === Item.PAINEL) return T.PAINEL;
  if (item === Item.CARAPACE) return T.CARAPACE;
  if (item === Item.EMBER_BLOCK) return T.EMBER_BLOCK;
  if (item === Item.CAMA) return T.BED;
  if (item === Item.BAU) return T.CHEST;
  if (item === Item.ESCADA) return T.LADDER;
  if (item === Item.ESTEIRA) return T.MAT;
  if (item === Item.BRAZIER) return T.BRAZIER;
  return null;
}
function itemOfBlock(block) {
  if (block >= T.SAND && block <= T.FROST) return block;
  if (block === T.FARMLAND_DRY || block === T.FARMLAND_WET || block === T.PATH) return Item.DIRT;
  if (ORVALIS_BLOCK_ITEMS[block]) return ORVALIS_BLOCK_ITEMS[block];
  if (block === T.STONE_SLAB_TOP) return Item.LAJE_PEDRA;
  if (block >= T.STONE_STAIR && block <= T.STONE_STAIR_270) return Item.DEGRAU_PEDRA;
  if (block >= T.STONE_WALL && block <= T.STONE_WALL_LAST) return Item.MURETA_PEDRA;
  if (isCarpentry(block)) return Item.MESA_CARPINTARIA;
  if (block === T.VEIN_ROCK) return Item.DARK_ROCK;
  if (block === T.VEIN_FROST) return Item.FROST;
  if (block === T.LANTERN) return Item.LANTERN;
  if (isWorkbench(block)) return Item.WORKBENCH;
  if (isMarco(block)) return Item.MARCO;
  if (isPanel(block)) return Item.PAINEL;
  if (block === T.CARAPACE) return Item.CARAPACE;
  if (block === T.EMBER_BLOCK) return Item.EMBER_BLOCK;
  if (block === T.MAT) return Item.ESTEIRA;
  if (block >= T.LADDER && block <= T.LADDER_270) return Item.ESCADA;
  if (block >= T.CHEST && block <= T.CHEST_270) return Item.BAU;
  if (block >= T.BED && block <= T.BED_HEAD_270) return Item.CAMA;
  if (block === T.BRAZIER || block === T.BRAZIER_LIT) return Item.BRAZIER;
  if (block >= T.REED_STAIR && block <= T.REED_STAIR_270) return Item.DEGRAU_JUNCO;
  if (block >= T.REED_CHAIR && block <= T.REED_CHAIR_270) return Item.CADEIRA_JUNCO;
  if (block >= T.DOOR && block <= T.DOOR_LAST) return Item.PORTA_JUNCO;
  if (block === T.REED_BLOCK) return Item.BLOCO_JUNCO;
  if (block === T.REED_SLAB || block === T.REED_SLAB_TOP) return Item.LAJE_JUNCO;
  if (block === T.SLAB || block === T.SLAB_TOP || block === T.SLAB_DOUBLE) return Item.SLAB;
  return null;
}
var dropCountOf = (block) => block === T.SLAB_DOUBLE ? 2 : 1;
var FOOD = { [Item.NOZ]: { hunger: 4, saturation: 2.4 }, [Item.NOZ_TORRADA]: { hunger: 7, saturation: 5.6 }, [Item.RAW_MEAT]: { hunger: 2, saturation: 1.2 }, [Item.COOKED_MEAT]: { hunger: 8, saturation: 12.8 }, [Item.CENOURA]: { hunger: 3, saturation: 3.6 }, [Item.BATATA]: { hunger: 1, saturation: 0.6 }, [Item.TOMATE]: { hunger: 2, saturation: 2.4 } };
var foodOf = (item) => FOOD[item] ?? null;
var TOOLS = {
  [Item.STONE_PICK]: { kind: "pick", tier: "rock" },
  [Item.COPPER_PICK]: { kind: "pick", tier: "copper" },
  [Item.STONE_DAGGER]: { kind: "dagger", tier: "rock" },
  [Item.COPPER_DAGGER]: { kind: "dagger", tier: "copper" },
  // Orvalis em voxel (ADR 0112): madeira e pedra (a pedra usa o nível `rock`, o mesmo da picareta de rocha do Titã)
  [Item.PICARETA_MADEIRA]: { kind: "pick", tier: "wood" },
  [Item.PICARETA_PEDRA]: { kind: "pick", tier: "rock" },
  [Item.MACHADO_MADEIRA]: { kind: "axe", tier: "wood" },
  [Item.MACHADO_PEDRA]: { kind: "axe", tier: "rock" },
  [Item.PA_MADEIRA]: { kind: "shovel", tier: "wood" },
  [Item.PA_PEDRA]: { kind: "shovel", tier: "rock" },
  [Item.ENXADA_MADEIRA]: { kind: "hoe", tier: "wood" },
  [Item.ENXADA_PEDRA]: { kind: "hoe", tier: "rock" }
};
var toolOf = (item) => item ? TOOLS[item] ?? null : null;
var isTool = (item) => item in TOOLS;
var isPick = (item) => toolOf(item)?.kind === "pick";
var isShovel = (item) => toolOf(item)?.kind === "shovel";
var isHoe = (item) => toolOf(item)?.kind === "hoe";

// src/world/random.ts
function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a = a + 1831565813 >>> 0;
    let t = a;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
function hash2(seed, x, y) {
  let h = (seed ^ Math.imul(x | 0, 668265261) ^ Math.imul(y | 0, 374761393)) >>> 0;
  h = Math.imul(h ^ h >>> 15, 2246822507);
  h = Math.imul(h ^ h >>> 13, 3266489909);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}

// src/titan/nuts.ts
var NUT_YIELD = 4;
var NUT_REGROW_S = 300;
var nutId = (x, y, z) => `nut:${x},${y},${z}`;
var NUT_RE = /^nut:(-?\d+),(-?\d+),(-?\d+)$/;
function parseNutId(id) {
  const m = NUT_RE.exec(id);
  return m ? { x: Number(m[1]), y: Number(m[2]), z: Number(m[3]) } : null;
}

// src/titan/slabs.ts
var FAMILY = {
  rock: { bottom: T.SLAB, top: T.SLAB_TOP, whole: T.SLAB_DOUBLE },
  reed: { bottom: T.REED_SLAB, top: T.REED_SLAB_TOP, whole: T.REED_BLOCK },
  stone: { bottom: T.STONE_SLAB, top: T.STONE_SLAB_TOP, whole: T.STONE_SMOOTH }
  // a Laje de Pedra funde na Pedra Lisa (ADR 0108)
};
function resolveSlabPlacement(targetId, ny, hy, held = T.SLAB) {
  const f = held === T.REED_SLAB || held === T.REED_SLAB_TOP ? FAMILY.reed : held === T.STONE_SLAB || held === T.STONE_SLAB_TOP ? FAMILY.stone : FAMILY.rock;
  if (targetId === f.bottom && ny === 1) return { merge: true, block: f.whole };
  if (targetId === f.top && ny === -1) return { merge: true, block: f.whole };
  const top = ny === -1 || ny === 0 && (hy ?? 0) >= 0.5;
  return { merge: false, block: top ? f.top : f.bottom };
}

// src/titan/recipes.ts
var RECIPES = [
  { id: "mesa", name: "Mesa de Trabalho", group: "utilidades", result: { item: Item.WORKBENCH, count: 1 }, ingredients: [{ item: Item.DARK_ROCK, count: 4 }], station: "personal" },
  { id: "lente", name: "Lente de Gelo", group: "materiais", result: { item: Item.ICE_LENS, count: 1 }, ingredients: [{ item: Item.FROST_SHARD, count: 1 }], station: "workbench" },
  { id: "lanterna", name: "Lanterna da Margem", group: "utilidades", result: { item: Item.LANTERN, count: 1 }, ingredients: [{ item: Item.ROCK_SHARD, count: 2 }, { item: Item.ICE_LENS, count: 1 }, { item: Item.EMBER, count: 1 }], station: "workbench" },
  { id: "marco", name: "Marco de Margem", group: "construcao", result: { item: Item.MARCO, count: 1 }, ingredients: [{ item: Item.ROCK_SHARD, count: 1 }, { item: Item.GLASS_REED, count: 1 }], station: "workbench" },
  { id: "painel", name: "Painel de Junco", group: "construcao", result: { item: Item.PAINEL, count: 2 }, ingredients: [{ item: Item.GLASS_REED, count: 2 }, { item: Item.DARK_ROCK, count: 1 }], station: "workbench" },
  { id: "laje", name: "Laje de Rocha", group: "construcao", result: { item: Item.SLAB, count: 6 }, ingredients: [{ item: Item.DARK_ROCK, count: 3 }], station: "workbench" },
  { id: "picareta-rocha", name: "Picareta de Rocha", group: "ferramentas", result: { item: Item.STONE_PICK, count: 1 }, ingredients: [{ item: Item.ROCK_SHARD, count: 3 }, { item: Item.DRY_REED, count: 2 }], station: "workbench" },
  { id: "braseiro", name: "Braseiro de Rocha", group: "utilidades", result: { item: Item.BRAZIER, count: 1 }, ingredients: [{ item: Item.DARK_ROCK, count: 4 }], station: "workbench" },
  { id: "revestimento", name: "Revestimento de Carapa\xE7a", group: "construcao", result: { item: Item.CARAPACE, count: 2 }, ingredients: [{ item: Item.PLATE, count: 1 }, { item: Item.DARK_ROCK, count: 1 }], station: "workbench" },
  { id: "lingote-cobre", name: "Lingote de Cobre de Duna", group: "materiais", result: { item: Item.COPPER_INGOT, count: 1 }, ingredients: [{ item: Item.COPPER_SHARD, count: 2 }], station: "brazier" },
  { id: "bloco-junco", name: "Bloco de Junco", group: "construcao", result: { item: Item.BLOCO_JUNCO, count: 1 }, ingredients: [{ item: Item.DRY_REED, count: 6 }], station: "workbench" },
  { id: "laje-junco", name: "Laje de Junco", group: "construcao", result: { item: Item.LAJE_JUNCO, count: 6 }, ingredients: [{ item: Item.BLOCO_JUNCO, count: 3 }], station: "workbench" },
  { id: "degrau-junco", name: "Degrau de Junco", group: "construcao", result: { item: Item.DEGRAU_JUNCO, count: 4 }, ingredients: [{ item: Item.BLOCO_JUNCO, count: 3 }], station: "workbench" },
  { id: "cadeira-junco", name: "Cadeira de Junco", group: "construcao", result: { item: Item.CADEIRA_JUNCO, count: 1 }, ingredients: [{ item: Item.DRY_REED, count: 3 }, { item: Item.ESTEIRA, count: 1 }], station: "workbench" },
  { id: "porta-junco", name: "Porta de Junco", group: "construcao", result: { item: Item.PORTA_JUNCO, count: 1 }, ingredients: [{ item: Item.BLOCO_JUNCO, count: 3 }], station: "workbench" },
  // provisória (ADR 0102): pede calibragem em jogo
  { id: "balde", name: "Balde de Cobre", group: "ferramentas", result: { item: Item.BALDE, count: 1 }, ingredients: [{ item: Item.COPPER_INGOT, count: 3 }], station: "workbench" },
  { id: "cama", name: "Cama de Junco", group: "construcao", result: { item: Item.CAMA, count: 1 }, ingredients: [{ item: Item.DARK_ROCK, count: 3 }, { item: Item.ESTEIRA, count: 2 }], station: "workbench" },
  { id: "bau", name: "Ba\xFA de Rocha e Junco", group: "construcao", result: { item: Item.BAU, count: 1 }, ingredients: [{ item: Item.DARK_ROCK, count: 4 }, { item: Item.ESTEIRA, count: 1 }], station: "workbench" },
  { id: "escada", name: "Escada de Junco", group: "construcao", result: { item: Item.ESCADA, count: 3 }, ingredients: [{ item: Item.DRY_REED, count: 4 }], station: "workbench" },
  { id: "esteira", name: "Esteira de Junco", group: "construcao", result: { item: Item.ESTEIRA, count: 1 }, ingredients: [{ item: Item.DRY_REED, count: 3 }], station: "workbench" },
  { id: "noz-torrada", name: "Noz Torrada", group: "materiais", result: { item: Item.NOZ_TORRADA, count: 1 }, ingredients: [{ item: Item.NOZ, count: 1 }], station: "brazier" },
  { id: "carne-assada", name: "Carne Assada de Farejador", group: "materiais", result: { item: Item.COOKED_MEAT, count: 1 }, ingredients: [{ item: Item.RAW_MEAT, count: 1 }], station: "brazier" },
  { id: "picareta-cobre", name: "Picareta de Cobre", group: "ferramentas", result: { item: Item.COPPER_PICK, count: 1 }, ingredients: [{ item: Item.COPPER_INGOT, count: 3 }, { item: Item.DRY_REED, count: 2 }], station: "workbench" },
  { id: "adaga-rocha", name: "Adaga de Rocha", group: "ferramentas", result: { item: Item.STONE_DAGGER, count: 1 }, ingredients: [{ item: Item.ROCK_SHARD, count: 1 }, { item: Item.DRY_REED, count: 1 }], station: "workbench" },
  { id: "adaga-cobre", name: "Adaga de Cobre", group: "ferramentas", result: { item: Item.COPPER_DAGGER, count: 1 }, ingredients: [{ item: Item.COPPER_INGOT, count: 1 }, { item: Item.DRY_REED, count: 1 }], station: "workbench" },
  { id: "ambar-compactado", name: "Bloco de \xC2mbar Compactado", group: "construcao", result: { item: Item.EMBER_BLOCK, count: 1 }, ingredients: [{ item: Item.EMBER, count: 9 }], station: "workbench" },
  { id: "ambar-desmontar", name: "Desmontar Bloco de \xC2mbar", group: "materiais", result: { item: Item.EMBER, count: 9 }, ingredients: [{ item: Item.EMBER_BLOCK, count: 1 }], station: "workbench" },
  // Madeira básica do Orvalis em voxel (ADR 0107): regras do Minecraft (1 tora → 4 tábuas; 2 tábuas → 4 hastes; 4 tábuas → mesa), uma receita por madeira (o catálogo não tem "qualquer tábua")
  { id: "tabuas-carvalho", name: "T\xE1buas de Carvalho", group: "construcao", result: { item: Item.TABUA_CARVALHO, count: 4 }, ingredients: [{ item: Item.LOG_OAK, count: 1 }], station: "personal", world: "orvalis" },
  { id: "tabuas-cerejeira", name: "T\xE1buas de Cerejeira", group: "construcao", result: { item: Item.TABUA_CEREJEIRA, count: 4 }, ingredients: [{ item: Item.LOG_CHERRY, count: 1 }], station: "personal", world: "orvalis" },
  { id: "tabuas-betula", name: "T\xE1buas de B\xE9tula", group: "construcao", result: { item: Item.TABUA_BETULA, count: 4 }, ingredients: [{ item: Item.LOG_BIRCH, count: 1 }], station: "personal", world: "orvalis" },
  { id: "hastes-carvalho", name: "Hastes de Madeira (t\xE1buas de carvalho)", group: "materiais", result: { item: Item.HASTE, count: 4 }, ingredients: [{ item: Item.TABUA_CARVALHO, count: 2 }], station: "personal", world: "orvalis" },
  { id: "hastes-cerejeira", name: "Hastes de Madeira (t\xE1buas de cerejeira)", group: "materiais", result: { item: Item.HASTE, count: 4 }, ingredients: [{ item: Item.TABUA_CEREJEIRA, count: 2 }], station: "personal", world: "orvalis" },
  { id: "hastes-betula", name: "Hastes de Madeira (t\xE1buas de b\xE9tula)", group: "materiais", result: { item: Item.HASTE, count: 4 }, ingredients: [{ item: Item.TABUA_BETULA, count: 2 }], station: "personal", world: "orvalis" },
  { id: "mesa-carpintaria-carvalho", name: "Mesa de Carpintaria (t\xE1buas de carvalho)", group: "utilidades", result: { item: Item.MESA_CARPINTARIA, count: 1 }, ingredients: [{ item: Item.TABUA_CARVALHO, count: 4 }], station: "personal", world: "orvalis" },
  { id: "mesa-carpintaria-cerejeira", name: "Mesa de Carpintaria (t\xE1buas de cerejeira)", group: "utilidades", result: { item: Item.MESA_CARPINTARIA, count: 1 }, ingredients: [{ item: Item.TABUA_CEREJEIRA, count: 4 }], station: "personal", world: "orvalis" },
  { id: "mesa-carpintaria-betula", name: "Mesa de Carpintaria (t\xE1buas de b\xE9tula)", group: "utilidades", result: { item: Item.MESA_CARPINTARIA, count: 1 }, ingredients: [{ item: Item.TABUA_BETULA, count: 4 }], station: "personal", world: "orvalis" },
  // Pedra de obra do Orvalis em voxel (ADR 0108), na Mesa de Carpintaria (a fundição em Braseiro ainda não existe no Orvalis: o polimento é provisório)
  { id: "pedra-lisa", name: "Pedra Lisa", group: "construcao", result: { item: Item.PEDRA_LISA, count: 1 }, ingredients: [{ item: Item.STONE, count: 1 }], station: "furnace", world: "orvalis" },
  { id: "tijolo-pedra", name: "Tijolo de Pedra", group: "construcao", result: { item: Item.TIJOLO_PEDRA, count: 4 }, ingredients: [{ item: Item.STONE, count: 4 }], station: "workbench", world: "orvalis" },
  { id: "degrau-pedra", name: "Degrau de Pedra", group: "construcao", result: { item: Item.DEGRAU_PEDRA, count: 4 }, ingredients: [{ item: Item.PEDRA_LISA, count: 3 }], station: "workbench", world: "orvalis" },
  { id: "mureta-pedra", name: "Mureta de Pedra", group: "construcao", result: { item: Item.MURETA_PEDRA, count: 6 }, ingredients: [{ item: Item.PEDRA_LISA, count: 6 }], station: "workbench", world: "orvalis" },
  // Solo e cerâmica do Orvalis em voxel (ADR 0111): receitas PROVISÓRIAS até existirem a água do cultivo (E5), a argila no terreno e a fundição; terra arada e caminho agora vêm da enxada e da pá (ADR 0112)
  { id: "terra-infertil", name: "Terra Inf\xE9rtil", group: "construcao", result: { item: Item.TERRA_INFERTIL, count: 2 }, ingredients: [{ item: Item.DIRT, count: 1 }, { item: Item.BEACH, count: 1 }], station: "workbench", world: "orvalis" },
  { id: "bola-argila", name: "Bola de Argila", group: "materiais", result: { item: Item.BOLA_ARGILA, count: 2 }, ingredients: [{ item: Item.DIRT, count: 2 }, { item: Item.BEACH, count: 1 }], station: "workbench", world: "orvalis" },
  { id: "tijolo", name: "Tijolo", group: "materiais", result: { item: Item.TIJOLO, count: 1 }, ingredients: [{ item: Item.BOLA_ARGILA, count: 1 }], station: "furnace", world: "orvalis" },
  { id: "bloco-argila", name: "Bloco de Argila", group: "construcao", result: { item: Item.BLOCO_ARGILA, count: 1 }, ingredients: [{ item: Item.BOLA_ARGILA, count: 4 }], station: "workbench", world: "orvalis" },
  { id: "bloco-tijolos", name: "Bloco de Tijolos", group: "construcao", result: { item: Item.BLOCO_TIJOLOS, count: 1 }, ingredients: [{ item: Item.TIJOLO, count: 4 }], station: "workbench", world: "orvalis" },
  // Ferramentas do Orvalis em voxel (ADR 0112), na Mesa de Carpintaria; a de madeira só de tábuas de carvalho por ora (pendência: "qualquer tábua")
  { id: "picareta-madeira", name: "Picareta de Madeira", group: "ferramentas", result: { item: Item.PICARETA_MADEIRA, count: 1 }, ingredients: [{ item: Item.TABUA_CARVALHO, count: 3 }, { item: Item.HASTE, count: 2 }], station: "workbench", world: "orvalis" },
  { id: "picareta-pedra", name: "Picareta de Pedra", group: "ferramentas", result: { item: Item.PICARETA_PEDRA, count: 1 }, ingredients: [{ item: Item.STONE, count: 3 }, { item: Item.HASTE, count: 2 }], station: "workbench", world: "orvalis" },
  { id: "machado-madeira", name: "Machado de Madeira", group: "ferramentas", result: { item: Item.MACHADO_MADEIRA, count: 1 }, ingredients: [{ item: Item.TABUA_CARVALHO, count: 3 }, { item: Item.HASTE, count: 2 }], station: "workbench", world: "orvalis" },
  { id: "machado-pedra", name: "Machado de Pedra", group: "ferramentas", result: { item: Item.MACHADO_PEDRA, count: 1 }, ingredients: [{ item: Item.STONE, count: 3 }, { item: Item.HASTE, count: 2 }], station: "workbench", world: "orvalis" },
  { id: "pa-madeira", name: "P\xE1 de Madeira", group: "ferramentas", result: { item: Item.PA_MADEIRA, count: 1 }, ingredients: [{ item: Item.TABUA_CARVALHO, count: 1 }, { item: Item.HASTE, count: 2 }], station: "workbench", world: "orvalis" },
  { id: "pa-pedra", name: "P\xE1 de Pedra", group: "ferramentas", result: { item: Item.PA_PEDRA, count: 1 }, ingredients: [{ item: Item.STONE, count: 1 }, { item: Item.HASTE, count: 2 }], station: "workbench", world: "orvalis" },
  { id: "enxada-madeira", name: "Enxada de Madeira", group: "ferramentas", result: { item: Item.ENXADA_MADEIRA, count: 1 }, ingredients: [{ item: Item.TABUA_CARVALHO, count: 2 }, { item: Item.HASTE, count: 2 }], station: "workbench", world: "orvalis" },
  { id: "enxada-pedra", name: "Enxada de Pedra", group: "ferramentas", result: { item: Item.ENXADA_PEDRA, count: 1 }, ingredients: [{ item: Item.STONE, count: 2 }, { item: Item.HASTE, count: 2 }], station: "workbench", world: "orvalis" },
  // Horta (ADR 0113): o trigo fecha o ciclo (a cenoura, a batata e o tomate se plantam com o próprio produto)
  { id: "semente-trigo", name: "Semente de Trigo", group: "materiais", result: { item: Item.SEMENTE_TRIGO, count: 1 }, ingredients: [{ item: Item.TRIGO, count: 1 }], station: "personal", world: "orvalis" },
  { id: "fornalha", name: "Fornalha", group: "utilidades", result: { item: Item.FORNALHA, count: 1 }, ingredients: [{ item: Item.STONE, count: 8 }], station: "workbench", world: "orvalis" },
  // Wiki: 8 pedras em anel (ADR 0120)
  { id: "carvao-carvalho", name: "Carv\xE3o Vegetal (tora de carvalho)", group: "materiais", result: { item: Item.CARVAO_VEGETAL, count: 1 }, ingredients: [{ item: Item.LOG_OAK, count: 1 }], station: "furnace", world: "orvalis" },
  { id: "carvao-cerejeira", name: "Carv\xE3o Vegetal (tora de cerejeira)", group: "materiais", result: { item: Item.CARVAO_VEGETAL, count: 1 }, ingredients: [{ item: Item.LOG_CHERRY, count: 1 }], station: "furnace", world: "orvalis" },
  { id: "carvao-betula", name: "Carv\xE3o Vegetal (tora de b\xE9tula)", group: "materiais", result: { item: Item.CARVAO_VEGETAL, count: 1 }, ingredients: [{ item: Item.LOG_BIRCH, count: 1 }], station: "furnace", world: "orvalis" },
  { id: "tocha", name: "Tocha", group: "utilidades", result: { item: Item.TOCHA, count: 4 }, ingredients: [{ item: Item.CARVAO_VEGETAL, count: 1 }, { item: Item.HASTE, count: 1 }], station: "personal", world: "orvalis" },
  // Wiki: carvão (vegetal) + graveto → 4 (ADR 0121)
  { id: "tocha-carvao", name: "Tocha (carv\xE3o)", group: "utilidades", result: { item: Item.TOCHA, count: 4 }, ingredients: [{ item: Item.CARVAO, count: 1 }, { item: Item.HASTE, count: 1 }], station: "personal", world: "orvalis" },
  // Wiki: carvão ou carvão vegetal (ADR 0122)
  { id: "bloco-carvao", name: "Bloco de Carv\xE3o", group: "construcao", result: { item: Item.BLOCO_CARVAO, count: 1 }, ingredients: [{ item: Item.CARVAO, count: 9 }], station: "workbench", world: "orvalis" },
  { id: "carvao-do-bloco", name: "Carv\xE3o (do bloco)", group: "materiais", result: { item: Item.CARVAO, count: 9 }, ingredients: [{ item: Item.BLOCO_CARVAO, count: 1 }], station: "personal", world: "orvalis" },
  { id: "laje-pedra", name: "Laje de Pedra", group: "construcao", result: { item: Item.LAJE_PEDRA, count: 6 }, ingredients: [{ item: Item.PEDRA_LISA, count: 3 }], station: "workbench", world: "orvalis" }
];
var stationMet = (r, at) => r.station === "personal" || r.station === at;
function matchBench(totals) {
  for (const r of RECIPES) {
    if (r.ingredients.length === totals.size && r.ingredients.every((g) => totals.get(g.item) === g.count)) return r;
  }
  return null;
}

// src/titan/furnace.ts
var COOK_TIME_S = 10;
var FUEL_TIME_S = {
  [Item.EMBER]: 40,
  [Item.EMBER_BLOCK]: 360,
  // Titã (braseiro)
  // Orvalis (Fornalha, ADR 0120): segundos de queima da Minecraft Wiki — carvão vegetal 80, tora/tábuas/Mesa de Carpintaria 15, haste 5 (os itens dos dois mundos nunca se misturam, ADR 0114)
  [Item.CARVAO_VEGETAL]: 80,
  [Item.CARVAO]: 80,
  [Item.BLOCO_CARVAO]: 800,
  [Item.LOG_OAK]: 15,
  [Item.LOG_CHERRY]: 15,
  [Item.LOG_BIRCH]: 15,
  [Item.TABUA_CARVALHO]: 15,
  [Item.TABUA_CEREJEIRA]: 15,
  [Item.TABUA_BETULA]: 15,
  [Item.MESA_CARPINTARIA]: 15,
  [Item.HASTE]: 5
};
var newFurnace = () => ({ input: null, fuel: null, output: null, burnLeft: 0, burnTotal: 0, cook: 0 });
var furnaceKey = (x, y, z) => `${x},${y},${z}`;
var BRAZIER_RULES = { station: "brazier", continuous: false };
var FURNACE_RULES = { station: "furnace", continuous: true };
var rulesOf = (block) => isFurnace(block) ? FURNACE_RULES : isBrazier(block) ? BRAZIER_RULES : null;
function smeltRecipe(item, station = "brazier") {
  return RECIPES.find((r) => r.station === station && r.ingredients.length === 1 && r.ingredients[0].item === item) ?? null;
}
var isFuel = (item) => item in FUEL_TIME_S;
var accepts = (slot, item, station = "brazier") => slot === "input" ? smeltRecipe(item, station) !== null : slot === "fuel" ? isFuel(item) : false;
function canSmelt(f, rules = BRAZIER_RULES) {
  const r = f.input ? smeltRecipe(f.input.item, rules.station) : null;
  if (!f.input || !r || f.input.count < r.ingredients[0].count) return false;
  if (!f.output) return true;
  return f.output.item === r.result.item && f.output.count + r.result.count <= maxStack(r.result.item);
}
var isWorking = (f, rules = BRAZIER_RULES) => f.burnLeft > 0 && canSmelt(f, rules);
var showsLit = (f, rules = BRAZIER_RULES) => rules.continuous ? f.burnLeft > 0 : isWorking(f, rules);
function finishItem(f, rules) {
  const r = smeltRecipe(f.input.item, rules.station);
  f.cook = 0;
  if ((f.input.count -= r.ingredients[0].count) <= 0) f.input = null;
  f.output = f.output ? { item: f.output.item, count: f.output.count + r.result.count } : { item: r.result.item, count: r.result.count };
}
function tickFurnace(f, dt, rules = BRAZIER_RULES) {
  let changed = false;
  const was = showsLit(f, rules);
  let rest = dt;
  for (let guard = 0; rest > EPS && guard < 64; guard++) {
    const can = canSmelt(f, rules);
    if (f.burnLeft <= EPS && can && f.fuel && isFuel(f.fuel.item)) {
      f.burnTotal = f.burnLeft = FUEL_TIME_S[f.fuel.item];
      if (--f.fuel.count <= 0) f.fuel = null;
      changed = true;
    }
    if (rules.continuous && f.burnLeft > EPS) {
      const step2 = Math.min(rest, f.burnLeft, can ? COOK_TIME_S - f.cook : Infinity);
      f.burnLeft -= step2;
      rest -= step2;
      if (can) f.cook += step2;
      else if (f.cook > 0) f.cook = Math.max(0, f.cook - step2 * 2);
      if (f.burnLeft <= EPS) f.burnLeft = 0;
      if (can && f.cook >= COOK_TIME_S - EPS) {
        finishItem(f, rules);
        changed = true;
      }
      continue;
    }
    if (!(f.burnLeft > EPS && can)) {
      if (f.cook > 0) f.cook = Math.max(0, f.cook - rest * 2);
      f.burnLeft = f.burnLeft > EPS ? f.burnLeft : 0;
      break;
    }
    const step = Math.min(rest, f.burnLeft, COOK_TIME_S - f.cook);
    f.burnLeft -= step;
    f.cook += step;
    rest -= step;
    if (f.burnLeft <= EPS) f.burnLeft = 0;
    if (f.cook >= COOK_TIME_S - EPS) {
      finishItem(f, rules);
      changed = true;
    }
  }
  if (was !== showsLit(f, rules)) changed = true;
  return { changed };
}
var EPS = 1e-6;
var pack = (s) => s ? [s.item, s.count] : void 0;
function furnaceToData(f) {
  const d = { b: Math.round(f.burnLeft * 10) / 10, t: f.burnTotal, c: Math.round(f.cook * 10) / 10 };
  const i = pack(f.input), fu = pack(f.fuel), o = pack(f.output);
  if (i) d.i = i;
  if (fu) d.f = fu;
  if (o) d.o = o;
  return d;
}
var unpack = (e) => Array.isArray(e) && isItem(e[0]) && Number.isInteger(e[1]) && e[1] >= 1 && e[1] <= maxStack(e[0]) ? { item: e[0], count: e[1] } : null;
var num = (v, lo, hi) => typeof v === "number" && Number.isFinite(v) ? Math.min(hi, Math.max(lo, v)) : 0;
function furnaceFromData(d, rules = BRAZIER_RULES) {
  const o = d && typeof d === "object" ? d : {};
  const f = newFurnace();
  const i = unpack(o.i), fu = unpack(o.f);
  f.input = i && accepts("input", i.item, rules.station) ? i : null;
  f.fuel = fu && accepts("fuel", fu.item) ? fu : null;
  f.output = unpack(o.o);
  f.burnTotal = num(o.t, 0, 800);
  f.burnLeft = Math.min(num(o.b, 0, 800), f.burnTotal);
  f.cook = num(o.c, 0, COOK_TIME_S);
  return f;
}

// src/titan/weather.ts
var TICKS_PER_SECOND = 20;
var RAIN_ON_S = [12e3 / TICKS_PER_SECOND, 24e3 / TICKS_PER_SECOND];
var RAIN_OFF_S = [12e3 / TICKS_PER_SECOND, 18e4 / TICKS_PER_SECOND];
var RAIN_SKY_FACTOR = 12 / 15;
var hasWeather = (world) => world === "orvalis";
var roll = (range, rng) => range[0] + rng() * (range[1] - range[0]);
var newWeather = (rng) => ({ raining: false, timer: roll(RAIN_OFF_S, rng) });
function stepWeather(w, dt, rng) {
  w.timer -= dt;
  if (w.timer > 0) return false;
  w.raining = !w.raining;
  w.timer = roll(w.raining ? RAIN_ON_S : RAIN_OFF_S, rng);
  return true;
}
function clearWeather(w) {
  const was = w.raining;
  w.raining = false;
  return was;
}
var weatherToData = (w) => ({ raining: w.raining, timer: Math.round(w.timer * 10) / 10 });
function weatherFromData(d, rng) {
  const o = d;
  if (o && typeof o.raining === "boolean" && typeof o.timer === "number" && Number.isFinite(o.timer) && o.timer > 0) return { raining: o.raining, timer: Math.min(o.timer, (o.raining ? RAIN_ON_S : RAIN_OFF_S)[1]) };
  return newWeather(rng);
}

// src/titan/sky.ts
var DAY_TICKS = 24e3;
var TICKS_PER_SECOND2 = 20;
var DAY_SECONDS = DAY_TICKS / TICKS_PER_SECOND2;
var PHASE_TICKS = { sunsetStart: 12e3, nightStart: 13800, sunriseStart: 22200 };
var tickFrac = (ticks) => ticks / DAY_TICKS;
var AFTERNOON = tickFrac(9e3);
var WAKE_TICKS = 600;
var START_FRAC = 0;
var SLEEP_WINDOW = { clear: [12542, 23460], rain: [12010, 23992] };
function canSleep(frac, raining) {
  const [from, to] = raining ? SLEEP_WINDOW.rain : SLEEP_WINDOW.clear;
  const t = (frac % 1 + 1) % 1 * DAY_TICKS;
  return t >= from && t < to;
}
var FIXED_HOURS = { manha: tickFrac(720), tarde: tickFrac(9e3), crepusculo: tickFrac(12900), noite: tickFrac(18e3) };
function advanceDay(frac, dtSeconds) {
  const f = (frac + dtSeconds / DAY_SECONDS) % 1;
  return f < 0 ? f + 1 : f;
}
function validDay(f) {
  return typeof f === "number" && Number.isFinite(f) && f >= 0 && f < 1 ? f : START_FRAC;
}
var hex = (n) => [(n >> 16 & 255) / 255, (n >> 8 & 255) / 255, (n & 255) / 255];
var MANHA = { zenith: hex(11565650), mid: hex(14259804), horizon: hex(16040090), fog: hex(14725256), ambient: 0.85, tint: [1, 0.97, 0.92] };
var TARDE = { zenith: hex(12152371), mid: hex(14259010), horizon: hex(15912083), fog: hex(13803622), ambient: 1, tint: [1, 1, 1] };
var NOITE = { zenith: hex(328714), mid: hex(722962), horizon: hex(2364440), fog: hex(1116944), ambient: 0.22, tint: [0.84, 0.95, 1.22] };
var MANHA_O = { zenith: hex(7316710), mid: hex(10275056), horizon: hex(16177592), fog: hex(12375790), ambient: 0.85, tint: [1, 0.98, 0.94] };
var TARDE_O = { zenith: hex(5215720), mid: hex(8830962), horizon: hex(13625079), fog: hex(11850992), ambient: 1, tint: [1, 1, 1] };
var NOITE_O = { zenith: hex(329752), mid: hex(659504), horizon: hex(1582150), fog: hex(791592), ambient: 0.22, tint: [0.84, 0.95, 1.22] };
var looksOf = (m, t, n) => [
  { t: 0, ...m },
  { t: tickFrac(6e3), ...t },
  { t: tickFrac(PHASE_TICKS.sunsetStart), ...t },
  { t: tickFrac(PHASE_TICKS.nightStart), ...n },
  { t: tickFrac(PHASE_TICKS.sunriseStart), ...n }
];
var LOOKS_BY = { titan: looksOf(MANHA, TARDE, NOITE), orvalis: looksOf(MANHA_O, TARDE_O, NOITE_O) };
var mix = (a, b, k) => [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k];
var ease = (k) => k * k * (3 - 2 * k);
var moonPhaseOf = (days) => Number.isInteger(days) && days >= 0 ? days % 8 : 0;
function arcDir(frac) {
  const u = frac / tickFrac(PHASE_TICKS.sunsetStart), up = u >= 0 && u <= 1;
  const elev = up ? Math.sin(Math.PI * u) : -0.2, az = Math.PI * Math.min(1, Math.max(0, u));
  const d = [Math.cos(az), Math.max(elev, -0.2) + 0.05, -0.35], m = Math.hypot(d[0], d[1], d[2]);
  return { dir: [d[0] / m, d[1] / m, d[2] / m], up, elev };
}
var unit = (x, y, z) => {
  const m = Math.hypot(x, y, z);
  return [x / m, y / m, z / m];
};
var clamp01 = (v) => Math.min(1, Math.max(0, v));
var smooth = (a, b, v) => ease(clamp01((v - a) / (b - a)));
var PEACH = hex(15768168);
var AMBER = hex(14715452);
var COPPER = hex(12739114);
var COOL = [0.86, 0.93, 1.06];
var SUNSET = PHASE_TICKS.sunsetStart;
var NIGHT = PHASE_TICKS.nightStart;
var SUNRISE = PHASE_TICKS.sunriseStart;
function skyAt(frac, palette = "titan", rain = 0, days = 0) {
  const LOOKS = LOOKS_BY[palette];
  const f = (frac % 1 + 1) % 1;
  let i = LOOKS.length - 1;
  for (let k2 = 0; k2 < LOOKS.length; k2++) if (f >= LOOKS[k2].t) i = k2;
  const a = LOOKS[i], b = LOOKS[(i + 1) % LOOKS.length];
  const span = (b.t - a.t + 1) % 1 || 1;
  const k = ease((f - a.t + 1) % 1 / span);
  const u = f / tickFrac(PHASE_TICKS.sunsetStart);
  const up = u >= 0 && u <= 1;
  const elev = up ? Math.sin(Math.PI * u) : -0.2;
  const az = Math.PI * Math.min(1, Math.max(0, u));
  const d = [Math.cos(az), Math.max(elev, -0.2) + 0.05, -0.35];
  const m = Math.hypot(d[0], d[1], d[2]);
  const T2 = f * DAY_TICKS;
  let glowK, glowDir, glow;
  if (T2 < SUNSET) {
    glowK = 0.55 + 0.45 * (1 - elev);
    glowDir = unit(d[0] / m, d[1] / m, d[2] / m);
    glow = mix(PEACH, AMBER, smooth(0, 3e3, T2));
  } else if (T2 < NIGHT) {
    glowK = 1 - 0.7 * smooth(SUNSET, NIGHT, T2);
    glowDir = unit(-1, -0.05, -0.35);
    glow = mix(AMBER, COPPER, smooth(SUNSET, NIGHT, T2));
  } else if (T2 < SUNRISE) {
    glowK = 0.3 - 0.26 * smooth(NIGHT, 16500, T2);
    glowDir = unit(-1, -0.05, -0.35);
    glow = COPPER;
  } else {
    glowK = 0.04 + 0.96 * smooth(SUNRISE, DAY_TICKS, T2);
    glowDir = unit(1, -0.05, -0.35);
    glow = mix(COPPER, PEACH, smooth(SUNRISE, DAY_TICKS, T2));
  }
  const dayK = T2 < SUNSET ? 1 : T2 < NIGHT ? 1 - smooth(SUNSET, NIGHT, T2) * 0.7 : T2 < SUNRISE ? 0.3 - 0.2 * smooth(NIGHT, 16500, T2) : 0.1 + 0.9 * smooth(SUNRISE, DAY_TICKS, T2);
  const stars = T2 < NIGHT ? 0 : T2 < 15600 ? smooth(NIGHT, 15600, T2) : T2 < 21e3 ? 1 : T2 < 22600 ? 1 - smooth(21e3, 22600, T2) : 0;
  const r = clamp01(rain), moon = arcDir((f + 0.5) % 1);
  const grey = (c, kk) => {
    const l = 0.3 * c[0] + 0.59 * c[1] + 0.11 * c[2];
    return mix(c, [l * 0.85, l * 0.88, l * 0.92], kk * r);
  };
  return {
    tint: mix(a.tint, b.tint, k),
    glowDir,
    glow: grey(glow, 0.4),
    glowK: glowK * (1 - 0.4 * r),
    cool: COOL,
    coolK: 0.65 * dayK,
    haze: 0.45 + 0.55 * dayK,
    stars: stars * (1 - r),
    zenith: grey(mix(a.zenith, b.zenith, k), 0.8),
    mid: grey(mix(a.mid, b.mid, k), 0.8),
    horizon: grey(mix(a.horizon, b.horizon, k), 0.75),
    fog: grey(mix(a.fog, b.fog, k), 0.8),
    ambient: (a.ambient + (b.ambient - a.ambient) * k) * (1 - (1 - RAIN_SKY_FACTOR) * r),
    sun: { dir: [d[0] / m, d[1] / m, d[2] / m], alpha: (up ? Math.min(1, Math.max(0, (elev - 0.55) / 0.2)) : 0) * (1 - r) },
    moon: { dir: moon.dir, alpha: (moon.up ? Math.min(1, Math.max(0, (moon.elev - 0.35) / 0.2)) : 0) * (1 - r), phase: moonPhaseOf(days) },
    rain: r
  };
}

// src/titan/physics.ts
var BODY_HALF = 0.3;
var BODY_HEIGHT = 1.8;
var EYE_HEIGHT = 1.62;
var GRAVITY = 28;
var JUMP_SPEED = Math.sqrt(2 * GRAVITY * 1.25);
var WALK_SPEED = 4.3;
var SPRINT_FACTOR = 1.3;
var TERMINAL = 20;
var CLIMB_UP = 2.3;
var CLIMB_SLIDE = 1.2;
var LADDER_WALK = 0.6;
var EPS2 = 1e-4;
var newBody = (x, y, z) => ({ x, y, z, vx: 0, vy: 0, vz: 0, onGround: false, inLiquid: false });
function collides(v, x, y, z) {
  const x0 = Math.floor(x - BODY_HALF + EPS2), x1 = Math.floor(x + BODY_HALF - EPS2);
  const y0 = Math.floor(y + EPS2), y1 = Math.floor(y + BODY_HEIGHT - EPS2);
  const z0 = Math.floor(z - BODY_HALF + EPS2), z1 = Math.floor(z + BODY_HALF - EPS2);
  for (let yy = y0; yy <= y1; yy++) for (let zz = z0; zz <= z1; zz++) for (let xx = x0; xx <= x1; xx++) {
    const boxes = v.bodyBoxes(xx, yy, zz);
    if (boxes) {
      for (const b of boxes) if (x - BODY_HALF < xx + b[3] - EPS2 && x + BODY_HALF > xx + b[0] + EPS2 && y < yy + b[4] - EPS2 && y + BODY_HEIGHT > yy + b[1] + EPS2 && z - BODY_HALF < zz + b[5] - EPS2 && z + BODY_HALF > zz + b[2] + EPS2) return true;
      continue;
    }
    const [lo, hi] = v.bodySpan(xx, yy, zz);
    if (hi <= lo) continue;
    if (lo === 0 && hi === 1) return true;
    if (y < yy + hi - EPS2 && y + BODY_HEIGHT > yy + lo + EPS2) return true;
  }
  return false;
}
var STEP_HEIGHT = 0.6;
var STEP_SMOOTH_RATE = 22;
var AUTO_JUMP_PROBE = 0.35;
var AUTO_JUMP_MIN_INPUT = 0.35;
function landingY(v, x, z, ny, oldY) {
  const x0 = Math.floor(x - BODY_HALF + EPS2), x1 = Math.floor(x + BODY_HALF - EPS2);
  const z0 = Math.floor(z - BODY_HALF + EPS2), z1 = Math.floor(z + BODY_HALF - EPS2);
  let best = -Infinity;
  for (let yy = Math.floor(ny + EPS2); yy <= Math.floor(oldY + EPS2); yy++) for (let zz = z0; zz <= z1; zz++) for (let xx = x0; xx <= x1; xx++) {
    const boxes = v.bodyBoxes(xx, yy, zz);
    if (boxes) {
      for (const b of boxes) {
        if (!(x - BODY_HALF < xx + b[3] - EPS2 && x + BODY_HALF > xx + b[0] + EPS2 && z - BODY_HALF < zz + b[5] - EPS2 && z + BODY_HALF > zz + b[2] + EPS2)) continue;
        const top = yy + b[4];
        if (top > ny + EPS2 && top <= oldY + 2 * EPS2) best = Math.max(best, top);
      }
      continue;
    }
    const h = v.bodyHeight(xx, yy, zz);
    if (h > 0 && yy + h > ny + EPS2 && yy + h <= oldY + 2 * EPS2) best = Math.max(best, yy + h);
  }
  return best === -Infinity ? Math.floor(ny + EPS2) + 1 : best;
}
function ceilingY(v, x, z, ny, oldY) {
  const x0 = Math.floor(x - BODY_HALF + EPS2), x1 = Math.floor(x + BODY_HALF - EPS2);
  const z0 = Math.floor(z - BODY_HALF + EPS2), z1 = Math.floor(z + BODY_HALF - EPS2);
  const oldHead = oldY + BODY_HEIGHT;
  let best = Infinity;
  for (let yy = Math.floor(oldHead - 1 + EPS2); yy <= Math.floor(ny + BODY_HEIGHT - EPS2); yy++) for (let zz = z0; zz <= z1; zz++) for (let xx = x0; xx <= x1; xx++) {
    const boxes = v.bodyBoxes(xx, yy, zz);
    if (boxes) {
      for (const b of boxes) {
        if (!(x - BODY_HALF < xx + b[3] - EPS2 && x + BODY_HALF > xx + b[0] + EPS2 && z - BODY_HALF < zz + b[5] - EPS2 && z + BODY_HALF > zz + b[2] + EPS2)) continue;
        const cand2 = yy + b[1];
        if (cand2 >= oldHead - 2 * EPS2 && ny + BODY_HEIGHT > cand2 + EPS2 && ny < yy + b[4] - EPS2) best = Math.min(best, cand2);
      }
      continue;
    }
    const [lo, hi] = v.bodySpan(xx, yy, zz);
    if (hi <= lo) continue;
    const cand = yy + lo;
    if (cand >= oldHead - 2 * EPS2 && ny + BODY_HEIGHT > cand + EPS2 && ny < yy + hi - EPS2) best = Math.min(best, cand);
  }
  return best === Infinity ? Math.floor(ny + BODY_HEIGHT - EPS2) : best;
}
var LEDGE_REACH = 1;
var HOP_TIME = 0.7;
var HOP_PUSH = 1.8;
function waterLedge(v, b, dirX, dirZ) {
  if (!b.inLiquid) return null;
  const ax = Math.abs(dirX), az = Math.abs(dirZ), sx = Math.sign(dirX), sz = Math.sign(dirZ);
  const order = ax > 0.2 || az > 0.2 ? ax >= az ? [[sx, 0], [0, sz]] : [[0, sz], [sx, 0]] : [[1, 0], [-1, 0], [0, 1], [0, -1]];
  const reach = BODY_HALF + 0.15;
  for (const [dx, dz] of order) {
    if (!dx && !dz) continue;
    const cx = Math.floor(b.x + dx * reach), cz = Math.floor(b.z + dz * reach);
    if (cx === Math.floor(b.x) && cz === Math.floor(b.z)) continue;
    let best = null;
    const cellTop = Math.floor(b.y + 0.2) + 1;
    for (let yy = Math.floor(b.y + EPS2); yy <= cellTop + LEDGE_REACH; yy++) {
      const id = v.get(cx, yy, cz), h = v.bodyHeight(cx, yy, cz);
      if (h <= 0 || id === T.LAKE) continue;
      const top = yy + h;
      if (top - cellTop > LEDGE_REACH + EPS2 || top - b.y < 0.05) continue;
      if (collides(v, cx + 0.5, top, cz + 0.5)) continue;
      if (best === null || top > best) best = top;
    }
    if (best !== null) return { dx, dz, ledge: best };
  }
  return null;
}
function stepBody(v, b, input, dt) {
  let left = Math.min(dt, 0.25);
  while (left > 0) {
    const h = Math.min(left, 1 / 40);
    stepOnce(v, b, input, h);
    left -= h;
  }
  if (b.stepSmooth) {
    b.stepSmooth *= Math.exp(-STEP_SMOOTH_RATE * dt);
    if (Math.abs(b.stepSmooth) < 1e-3) b.stepSmooth = 0;
  }
}
function ladderUnder(v, b) {
  const cx = Math.floor(b.x), cz = Math.floor(b.z);
  for (const dy of [0.2, 1, 1.7]) {
    const id = v.get(cx, Math.floor(b.y + dy), cz);
    if (isLadder(id)) return ladderFacing(ladderTurn(id));
  }
  return null;
}
function stepOnce(v, b, input, dt) {
  const feetCell = v.get(Math.floor(b.x), Math.floor(b.y + 0.2), Math.floor(b.z));
  b.inLiquid = feetCell === T.LAKE;
  const ladder = b.inLiquid ? null : ladderUnder(v, b);
  b.onLadder = !!ladder;
  const speed = WALK_SPEED * (b.inLiquid ? 0.6 : ladder ? LADDER_WALK : input.sprint ? SPRINT_FACTOR : 1);
  b.vx = input.dirX * speed;
  b.vz = input.dirZ * speed;
  if (b.hop) {
    b.hop.t -= dt;
    if (b.hop.t <= 0 || b.onGround && !b.inLiquid) b.hop = void 0;
    else if (input.dirX * b.hop.dx + input.dirZ * b.hop.dz < 0.3) {
      b.vx = b.hop.dx * HOP_PUSH;
      b.vz = b.hop.dz * HOP_PUSH;
    }
  }
  if (ladder) {
    const into = -(input.dirX * ladder[0] + input.dirZ * ladder[1]);
    b.vy = input.jump || into > 0.3 ? CLIMB_UP : -CLIMB_SLIDE;
  } else if (b.inLiquid) {
    b.vy = Math.max(b.vy - GRAVITY * 0.25 * dt, b.hop ? -TERMINAL : -2.5);
    if (input.jump && !b.hop) {
      const l = waterLedge(v, b, input.dirX, input.dirZ);
      if (l) {
        b.vy = Math.sqrt(2 * GRAVITY * (l.ledge - b.y + 0.3));
        b.hop = { dx: l.dx, dz: l.dz, ledge: l.ledge, t: HOP_TIME };
      } else b.vy = 3;
    }
  } else {
    const grounded = b.onGround;
    b.vy = Math.max(b.vy - GRAVITY * dt, -TERMINAL);
    if (input.jump && grounded) b.vy = JUMP_SPEED;
  }
  const wasGrounded = b.onGround && !b.inLiquid;
  const blockedX = moveAxis(v, b, "x", b.vx * dt);
  const blockedZ = moveAxis(v, b, "z", b.vz * dt);
  if (wasGrounded && !input.jump && (blockedX && Math.abs(input.dirX) >= AUTO_JUMP_MIN_INPUT || blockedZ && Math.abs(input.dirZ) >= AUTO_JUMP_MIN_INPUT)) {
    const m = Math.hypot(input.dirX, input.dirZ) || 1;
    if (!collides(v, b.x + input.dirX / m * AUTO_JUMP_PROBE, b.y + 1, b.z + input.dirZ / m * AUTO_JUMP_PROBE)) b.vy = JUMP_SPEED;
  }
  b.onGround = false;
  moveAxis(v, b, "y", b.vy * dt);
}
function autoStepUp(v, b, nx, nz) {
  if (collides(v, b.x, b.y + STEP_HEIGHT, b.z) || collides(v, nx, b.y + STEP_HEIGHT, nz)) return 0;
  const top = landingY(v, nx, nz, b.y, b.y + STEP_HEIGHT);
  const up = top - b.y;
  if (up <= 0.01 || up > STEP_HEIGHT + 1e-4 || collides(v, nx, top, nz)) return 0;
  return up;
}
function moveAxis(v, b, axis, d) {
  if (d === 0) return false;
  const nx = axis === "x" ? b.x + d : b.x, ny = axis === "y" ? b.y + d : b.y, nz = axis === "z" ? b.z + d : b.z;
  if (!collides(v, nx, ny, nz)) {
    b.x = nx;
    b.y = ny;
    b.z = nz;
    return false;
  }
  if (axis !== "y" && b.onGround) {
    const up = autoStepUp(v, b, nx, nz);
    if (up > 0) {
      b.x = nx;
      b.z = nz;
      b.y += up;
      b.stepSmooth = (b.stepSmooth ?? 0) - up;
      return false;
    }
  }
  if (axis === "x") {
    b.x = d > 0 ? Math.floor(nx + BODY_HALF - EPS2) - BODY_HALF - EPS2 : Math.floor(nx - BODY_HALF + EPS2) + 1 + BODY_HALF + EPS2;
    b.vx = 0;
  } else if (axis === "z") {
    b.z = d > 0 ? Math.floor(nz + BODY_HALF - EPS2) - BODY_HALF - EPS2 : Math.floor(nz - BODY_HALF + EPS2) + 1 + BODY_HALF + EPS2;
    b.vz = 0;
  } else if (d > 0) {
    b.y = ceilingY(v, b.x, b.z, ny, b.y) - BODY_HEIGHT - EPS2;
    b.vy = 0;
  } else {
    b.y = landingY(v, b.x, b.z, ny, b.y);
    b.vy = 0;
    b.onGround = true;
  }
  return true;
}
function canPlaceAt(v, b, x, y, z, items, span = [0, 1]) {
  if (!v.editable(x, y, z) || isOccupied(v.get(x, y, z)) || items?.at(x, y, z)) return false;
  const overlap = x + 1 > b.x - BODY_HALF && x < b.x + BODY_HALF && z + 1 > b.z - BODY_HALF && z < b.z + BODY_HALF && y + span[1] > b.y + EPS2 && y + span[0] < b.y + BODY_HEIGHT;
  return !overlap;
}
function safePosition(v, p, fallback) {
  if (![p.x, p.y, p.z].every(Number.isFinite) || p.y < Y_MIN || p.y > Y_MAX - 3) return { x: fallback.x, y: fallback.y, z: fallback.z };
  if (!collides(v, p.x, p.y, p.z)) return p;
  for (let y = Math.ceil(p.y); y <= Y_MAX - 3; y++) if (!collides(v, p.x, y, p.z)) return { x: p.x, y, z: p.z };
  return { x: fallback.x, y: fallback.y, z: fallback.z };
}

// src/titan/vitals.ts
var MAX_HEALTH = 20;
var MAX_HUNGER = 20;
var MAX_AIR = 15;
var AIR_RECOVERY_PER_S = MAX_AIR / 2;
var newVitals = () => ({ health: MAX_HEALTH, maxHealth: MAX_HEALTH, hunger: MAX_HUNGER, maxHunger: MAX_HUNGER, saturation: 5, exhaustion: 0, air: MAX_AIR, maxAir: MAX_AIR, regenTimer: 0, starveTimer: 0, drownTimer: 0 });
var isDead = (v) => v.health <= 0;
function eat(v, food) {
  if (v.hunger >= v.maxHunger) return false;
  v.hunger = Math.min(v.maxHunger, v.hunger + food.hunger);
  v.saturation = Math.min(v.hunger, v.saturation + food.saturation);
  return true;
}
function revive(v) {
  Object.assign(v, newVitals());
}
var vitalsToData = (v) => ({ health: v.health, hunger: v.hunger, saturation: v.saturation, air: v.air });
function vitalsFromData(d) {
  const v = newVitals();
  if (!d || typeof d !== "object") return v;
  const o = d;
  const num3 = (x, max, min = 0) => typeof x === "number" && Number.isFinite(x) ? Math.min(max, Math.max(min, x)) : null;
  v.health = num3(o.health, MAX_HEALTH, 1) ?? v.health;
  v.hunger = num3(o.hunger, MAX_HUNGER) ?? v.hunger;
  v.saturation = Math.min(v.hunger, num3(o.saturation, MAX_HUNGER) ?? v.saturation);
  v.air = num3(o.air, MAX_AIR) ?? v.air;
  return v;
}

// src/titan/wear.ts
var MAX_DURABILITY = {
  [Item.STONE_PICK]: 131,
  [Item.STONE_DAGGER]: 131,
  [Item.COPPER_PICK]: 190,
  [Item.COPPER_DAGGER]: 190,
  // Orvalis (ADR 0112), como o Minecraft: madeira 59, pedra 131
  [Item.PICARETA_MADEIRA]: 59,
  [Item.MACHADO_MADEIRA]: 59,
  [Item.PA_MADEIRA]: 59,
  [Item.ENXADA_MADEIRA]: 59,
  [Item.PICARETA_PEDRA]: 131,
  [Item.MACHADO_PEDRA]: 131,
  [Item.PA_PEDRA]: 131,
  [Item.ENXADA_PEDRA]: 131
};
var maxDurability = (item) => MAX_DURABILITY[item] ?? null;
function wearCost(tool, action) {
  const t = toolOf(tool);
  if (!t) return 0;
  if (action.type === "use") return 1;
  if (action.type === "break_block") return isCollectBlock(action.block) ? 0 : t.kind === "dagger" ? 2 : 1;
  return t.kind === "dagger" ? 1 : 2;
}

// src/titan/inventory.ts
var HOTBAR = 9;
var BAG = 27;
var SLOTS = HOTBAR + BAG;
var OLD_HOTBAR = 7;
var OLD_BAG = 24;
var CRAFT_SLOTS = 4;
var CRAFT_START = SLOTS;
var OUTPUT = CRAFT_START + CRAFT_SLOTS;
var BENCH_SLOTS = 9;
var BENCH_START = OUTPUT + 1;
var BENCH_OUT = BENCH_START + BENCH_SLOTS;
var isGrid = (i) => i >= CRAFT_START && i < OUTPUT || i >= BENCH_START && i < BENCH_OUT;
var Inventory = class _Inventory {
  /** hotbar + mochila + grade 2 × 2 + (40 sem uso) + grade 3 × 3 da mesa (índices 0–49). */
  s = new Array(BENCH_OUT).fill(null);
  /** Sobe a cada mudança (o save compara com a revisão gravada). */
  rev = 0;
  /** Inventário inicial: **vazio** (ADR 0045: o jogador chega de mãos vazias; a cápsula saiu, o id 7 fica reservado). */
  static starting() {
    return new _Inventory();
  }
  get(slot) {
    return this.s[slot] ? { ...this.s[slot] } : null;
  }
  /** Quantidade total de um item na hotbar e na mochila (a grade não conta). */
  total(item) {
    let n = 0;
    for (let i = 0; i < SLOTS; i++) if (this.s[i]?.item === item) n += this.s[i].count;
    return n;
  }
  /** Quanto de `item` ainda cabe (pilhas parciais + espaços vazios). */
  room(item) {
    const m = maxStack(item);
    let r = 0;
    for (let i = 0; i < SLOTS; i++) {
      const c = this.s[i];
      r += c ? c.item === item ? m - c.count : 0 : m;
    }
    return r;
  }
  canAdd(item, count = 1) {
    return this.room(item) >= count;
  }
  /** Põe `count` de `item` (completa pilhas da hotbar e da mochila, depois espaços vazios). Tudo ou nada: sem espaço, não muda nada e devolve false. */
  add(item, count = 1, wear = 0) {
    if (!isItem(item) || count < 1 || !this.canAdd(item, count)) return false;
    const m = maxStack(item);
    let left = count;
    for (let i = 0; i < SLOTS && left > 0; i++) {
      const c = this.s[i];
      if (c && c.item === item && c.count < m) {
        const t = Math.min(m - c.count, left);
        c.count += t;
        left -= t;
      }
    }
    for (let i = 0; i < SLOTS && left > 0; i++) {
      if (!this.s[i]) {
        const t = Math.min(m, left);
        this.s[i] = { item, count: t, ...wear > 0 && maxDurability(item) !== null ? { wear } : {} };
        left -= t;
      }
    }
    this.rev++;
    return true;
  }
  /** Tira a pilha inteira de um espaço da hotbar ou da mochila e a devolve (`null` se vazio ou fora delas): usado ao guardar no baú (ADR 0089). */
  take(slot) {
    if (!Number.isInteger(slot) || slot < 0 || slot >= SLOTS || !this.s[slot]) return null;
    const c = { ...this.s[slot] };
    this.s[slot] = null;
    this.rev++;
    return c;
  }
  /** Esvazia tudo (hotbar, mochila e as grades) e devolve as pilhas: usado ao morrer, quando os itens caem no chão (ADR 0059). */
  takeAll() {
    const out = [];
    for (let i = 0; i < BENCH_OUT; i++) {
      const c = this.s[i];
      if (i === OUTPUT || !c) continue;
      out.push({ ...c });
      this.s[i] = null;
    }
    if (out.length) this.rev++;
    return out;
  }
  /**
   * Desgasta a ferramenta do espaço (ADR 0067): soma `points` ao contador; ao chegar em `maxDurability` o item **quebra** e o espaço fica vazio. Devolve se quebrou e quanto resta
   * (`null` se o espaço não tem ferramenta desgastável ou `points` ≤ 0: nada muda).
   */
  damage(slot, points) {
    const c = this.s[slot], max = c ? maxDurability(c.item) : null;
    if (!c || max === null || points <= 0) return null;
    const wear = Math.min(max, (c.wear ?? 0) + points);
    this.rev++;
    if (wear >= max) {
      this.s[slot] = null;
      return { broken: true, left: 0 };
    }
    c.wear = wear;
    return { broken: false, left: max - wear };
  }
  /** Troca o item de uma pilha de 1 (balde vazio ↔ cheio, ADR 0091); o espaço continua o mesmo. */
  replace(slot, item) {
    const c = this.s[slot];
    if (!c || c.count !== 1) return false;
    this.s[slot] = { item, count: 1 };
    this.rev++;
    return true;
  }
  /** Gasta 1 do espaço (colocar bloco/lanterna). */
  consume(slot) {
    const c = this.s[slot];
    if (!c) return false;
    if (--c.count <= 0) this.s[slot] = null;
    this.rev++;
    return true;
  }
  /**
   * Move/une/troca entre dois espaços (0–39 e 41–49; as saídas 40 e 50 são virtuais; para as grades de fabricação vai 1 de cada vez). Vazio → move; mesmo item empilhável → une até o limite (o resto fica na origem);
   * item diferente → troca. Devolve se algo mudou.
   */
  move(from, to) {
    if (from === to || from < 0 || from >= BENCH_OUT || from === OUTPUT || to < 0 || to >= BENCH_OUT || to === OUTPUT) return false;
    const a = this.s[from], b = this.s[to];
    if (!a) return false;
    if (isGrid(to) && a.count > 1) {
      if (b && (b.item !== a.item || b.count >= maxStack(a.item))) return false;
      if (b) b.count++;
      else this.s[to] = { item: a.item, count: 1 };
      a.count--;
    } else if (!b) {
      this.s[to] = a;
      this.s[from] = null;
    } else if (a.item === b.item) {
      const m = maxStack(a.item), t = Math.min(m - b.count, a.count);
      if (t <= 0) return false;
      b.count += t;
      a.count -= t;
      if (a.count <= 0) this.s[from] = null;
    } else {
      this.s[to] = a;
      this.s[from] = b;
    }
    this.rev++;
    return true;
  }
  // ---- Fabricação ----
  /** Débito simulado: copia dos espaços (hotbar + mochila) depois de tirar os ingredientes, ou `null` se faltar algum. Tira da mochila antes da hotbar, das pilhas menores primeiro. */
  debited(ingredients) {
    const copy = this.s.map((c) => c ? { ...c } : null);
    for (const g of ingredients) {
      let left = g.count;
      const order = [...Array(SLOTS).keys()].filter((i) => copy[i]?.item === g.item).sort((a, b) => (a >= HOTBAR ? 0 : 1) - (b >= HOTBAR ? 0 : 1) || copy[a].count - copy[b].count || b - a);
      for (const i of order) {
        const c = copy[i], t = Math.min(c.count, left);
        c.count -= t;
        left -= t;
        if (c.count <= 0) copy[i] = null;
        if (left === 0) break;
      }
      if (left > 0) return null;
    }
    return copy;
  }
  /** Quanto de `item` cabe numa cópia dos espaços (mesma regra de `room`). */
  static roomIn(copy, item) {
    const m = maxStack(item);
    let r = 0;
    for (let i = 0; i < SLOTS; i++) {
      const c = copy[i];
      r += c ? c.item === item ? m - c.count : 0 : m;
    }
    return r;
  }
  /** Dá para fabricar? Tem os ingredientes e, **depois dos débitos**, o resultado cabe. Não muda nada. */
  canCraft(ingredients, result) {
    const d = this.debited(ingredients);
    return !!d && _Inventory.roomIn(d, result.item) >= result.count;
  }
  /** Fabrica de forma atômica: consumo e resultado numa operação só. Falhou → as pilhas ficam como estavam e devolve o motivo. */
  tryCraft(ingredients, result) {
    const d = this.debited(ingredients);
    if (!d) return "missing";
    if (_Inventory.roomIn(d, result.item) < result.count) return "full";
    for (let i = 0; i < SLOTS; i++) this.s[i] = d[i];
    this.add(result.item, result.count);
    return "ok";
  }
  /** Troca todas as pilhas de `from` por `to` (hotbar, mochila e grade), uma a uma e com a mesma quantidade. Devolve quantas unidades trocou. Usado na migração da cápsula (ADR 0045). */
  convertItem(from, to) {
    let n = 0;
    for (let i = 0; i < this.s.length; i++) {
      const c = this.s[i];
      if (c && c.item === from) {
        n += c.count;
        this.s[i] = { item: to, count: Math.min(c.count, maxStack(to)) };
      }
    }
    if (n) this.rev++;
    return n;
  }
  /** Legado (grade 2 × 2 removida, ADR 0050): devolve à hotbar/mochila o que um save antigo deixou nas posições 36–39 (cabe sempre: os itens vieram de lá). Devolve se tudo voltou. */
  returnCraft() {
    let ok = true;
    for (let i = 0; i < CRAFT_SLOTS; i++) {
      const c = this.s[CRAFT_START + i];
      if (!c) continue;
      this.s[CRAFT_START + i] = null;
      if (!this.add(c.item, c.count)) {
        this.s[CRAFT_START + i] = c;
        ok = false;
      }
    }
    return ok;
  }
  // ---- Grade 3 × 3 da de montagem (ADR 0049/0050) ----
  /** Quantidade por item na grade da mesa (somando as células). */
  benchTotals() {
    const m = /* @__PURE__ */ new Map();
    for (let i = 0; i < BENCH_SLOTS; i++) {
      const c = this.s[BENCH_START + i];
      if (c) m.set(c.item, (m.get(c.item) ?? 0) + c.count);
    }
    return m;
  }
  /** Receita formada pela grade: ingredientes **exatos** (qualquer disposição); extra, errado ou faltando = `null` (a saída fica vazia). Mesmo catálogo da fabricação direta. */
  benchRecipe() {
    const t = this.benchTotals();
    return t.size ? matchBench(t) : null;
  }
  benchResult() {
    const r = this.benchRecipe();
    return r ? { ...r.result } : null;
  }
  /**
   * Recolhe a saída: consome **todos** os ingredientes da grade e entrega o resultado numa operação só. `at` = estação em uso (`null` = só a bolsa): receita da Mesa sem a Mesa → `station`. Sem receita completa → `none`; sem espaço para o resultado na hotbar/mochila → `full`
   * (nada muda: os ingredientes continuam na grade). A validação da mesa e do alcance é da interface, a cada toque.
   */
  takeBenchResult(at) {
    const rec = this.benchRecipe();
    if (!rec) return "none";
    if (!stationMet(rec, at)) return "station";
    const r = rec.result;
    if (!this.canAdd(r.item, r.count)) return "full";
    for (let i = 0; i < BENCH_SLOTS; i++) this.s[BENCH_START + i] = null;
    this.add(r.item, r.count);
    return "ok";
  }
  /**
   * Devolve a grade da mesa à hotbar/mochila (ao fechar o painel, perder a mesa ou abrir o save). O que não couber **fica na grade** (e no save). Devolve quantas unidades ficaram.
   */
  returnBench() {
    let left = 0;
    for (let i = 0; i < BENCH_SLOTS; i++) {
      const c = this.s[BENCH_START + i];
      if (!c) continue;
      this.s[BENCH_START + i] = null;
      if (this.add(c.item, c.count)) continue;
      let rest = c.count;
      while (rest > 0 && this.add(c.item, 1)) rest--;
      if (rest > 0) {
        this.s[BENCH_START + i] = { item: c.item, count: rest };
        left += rest;
        this.rev++;
      }
    }
    return left;
  }
  // ---- Save ----
  toData() {
    const pack2 = (c) => c ? c.wear ? [c.item, c.count, c.wear] : [c.item, c.count] : null;
    const bench = this.s.slice(BENCH_START, BENCH_OUT).map(pack2);
    return { v: 3, slots: this.s.slice(0, SLOTS).map(pack2), craft: this.s.slice(SLOTS, SLOTS + CRAFT_SLOTS).map(pack2), ...bench.some(Boolean) ? { bench } : {} };
  }
  /** Lê um registro gravado, descartando o que não for válido (item desconhecido, contagem fora do limite). */
  static fromData(d) {
    const inv = new _Inventory();
    const o = d;
    const read = (arr, n, off) => {
      if (!Array.isArray(arr)) return;
      for (let i = 0; i < n && i < arr.length; i++) {
        const e = arr[i];
        if (Array.isArray(e) && isItem(e[0]) && Number.isInteger(e[1]) && e[1] >= 1 && e[1] <= maxStack(e[0])) {
          const max = maxDurability(e[0]), w = e[2];
          inv.s[off + i] = { item: e[0], count: e[1], ...max !== null && Number.isInteger(w) && w >= 1 && w < max ? { wear: w } : {} };
        }
      }
    };
    if (o?.v === 1) {
      read(Array.isArray(o.slots) ? o.slots.slice(0, OLD_HOTBAR) : [], OLD_HOTBAR, 0);
      read(Array.isArray(o.slots) ? o.slots.slice(OLD_HOTBAR, OLD_HOTBAR + OLD_BAG) : [], OLD_BAG, HOTBAR);
    } else read(o?.slots, SLOTS, 0);
    read(o?.craft, CRAFT_SLOTS, SLOTS);
    read(o?.bench, BENCH_SLOTS, BENCH_START);
    return inv;
  }
};

// src/titan/drops.ts
var DROP_GRAVITY = 22;
var DROP_TERMINAL = 38;
var LIQUID_GRAVITY = 4;
var LIQUID_TERMINAL = 2.2;
var SUBSTEP = 0.05;
var EPS3 = 1e-6;
function restY(s, x, y, z) {
  let yy = y;
  while (yy > Y_MIN + 1 && !isSolid(s.volume.get(x, yy - 1, z))) yy--;
  return yy;
}
function stepDrops(s, dt) {
  let active = false, left = Math.min(Math.max(dt, 0), 1);
  while (left > EPS3) {
    const h = Math.min(SUBSTEP, left);
    left -= h;
    for (const d of [...s.drops.values()]) {
      const ry = restY(s, d.x, d.y, d.z), fx = s.dropFx.get(d.id);
      let fy = fx?.fy ?? d.y;
      if (fy <= ry + EPS3 && d.y <= ry) {
        if (fx && fx.fy !== void 0) {
          delete fx.fy;
          delete fx.vy;
          active = true;
        }
        continue;
      }
      const state = fx ?? { delay: 0, age: 0 };
      if (!fx) s.dropFx.set(d.id, state);
      const wet = s.volume.get(d.x, Math.floor(fy + EPS3), d.z) === T.LAKE;
      const vy = Math.min(wet ? LIQUID_TERMINAL : DROP_TERMINAL, (state.vy ?? 0) + (wet ? LIQUID_GRAVITY : DROP_GRAVITY) * h);
      fy -= vy * h;
      if (fy <= ry + EPS3) {
        fy = ry;
        delete state.fy;
        delete state.vy;
      } else {
        state.fy = fy;
        state.vy = vy;
      }
      const cell = Math.max(ry, Math.floor(fy + EPS3));
      if (cell !== d.y) {
        s.drops.set(d.id, { ...d, y: cell });
        s.dropsRev++;
      }
      active = true;
    }
  }
  return active;
}
function settleDrops(s) {
  let moved = false;
  for (const d of [...s.drops.values()]) {
    const ry = restY(s, d.x, d.y, d.z), fx = s.dropFx.get(d.id);
    if (fx) {
      delete fx.fy;
      delete fx.vy;
    }
    if (ry !== d.y) {
      s.drops.set(d.id, { ...d, y: ry });
      s.dropsRev++;
      moved = true;
    }
  }
  return moved;
}
var DIRS = [[1, 0], [0, 1], [-1, 0], [0, -1]];
var hashId = (id) => {
  let h = 2166136261;
  for (let i = 0; i < id.length; i++) h = Math.imul(h ^ id.charCodeAt(i), 16777619);
  return h >>> 0;
};
function planDisplace(s, cells) {
  const taken = new Set(cells.map(([x, y, z]) => `${x},${y},${z}`)), plan = /* @__PURE__ */ new Map();
  const free = (x, y, z) => y > Y_MIN && s.volume.gen.inRegion(x, z) && !taken.has(`${x},${y},${z}`) && !isSolid(s.volume.get(x, y, z));
  for (const [x, y, z] of cells) {
    for (const d of s.drops.values()) {
      if (d.x !== x || d.y !== y || d.z !== z) continue;
      const r = hashId(d.id) % 4;
      let spot = null;
      for (let i = 0; i < 4 && !spot; i++) {
        const [dx, dz] = DIRS[(i + r) % 4];
        if (free(x + dx, y, z + dz)) spot = { x: x + dx, y, z: z + dz };
      }
      for (let up = 1; up <= 2 && !spot; up++) if (free(x, y + up, z)) spot = { x, y: y + up, z };
      if (!spot) return null;
      plan.set(d.id, spot);
    }
  }
  return plan;
}
function applyDisplace(s, plan) {
  for (const [id, to] of plan) {
    const d = s.drops.get(id);
    if (!d) continue;
    s.drops.set(id, { ...d, x: to.x, y: to.y, z: to.z });
    const fx = s.dropFx.get(id);
    if (fx) {
      delete fx.fy;
      delete fx.vy;
    }
  }
  if (plan.size) s.dropsRev++;
}

// src/titan/chest.ts
var CHEST_SLOTS = 18;
var newChest = () => new Array(CHEST_SLOTS).fill(null);
function chestRoom(c, item) {
  const m = maxStack(item);
  return c.reduce((r, s) => r + (s ? s.item === item && !s.wear ? m - s.count : 0 : m), 0);
}
function chestPut(c, st) {
  if (st.count < 1 || chestRoom(c, st.item) < st.count) return false;
  let left = st.count;
  const m = maxStack(st.item);
  if (!st.wear) {
    for (const s of c) if (s && s.item === st.item && !s.wear && s.count < m && left > 0) {
      const t = Math.min(m - s.count, left);
      s.count += t;
      left -= t;
    }
  }
  for (let i = 0; i < c.length && left > 0; i++) if (!c[i]) {
    const t = Math.min(m, left);
    c[i] = { item: st.item, count: t, ...st.wear ? { wear: st.wear } : {} };
    left -= t;
  }
  return left === 0;
}
var chestToData = (c) => c.map((s) => s ? s.wear ? [s.item, s.count, s.wear] : [s.item, s.count] : null);
function chestFromData(d) {
  const c = newChest();
  if (!Array.isArray(d)) return c;
  for (let i = 0; i < CHEST_SLOTS && i < d.length; i++) {
    const e = d[i];
    if (!Array.isArray(e) || !isItem(e[0]) || !Number.isInteger(e[1]) || e[1] < 1 || e[1] > maxStack(e[0])) continue;
    const max = maxDurability(e[0]), wear = max !== null && Number.isInteger(e[2]) && e[2] >= 1 && e[2] < max ? e[2] : 0;
    c[i] = { item: e[0], count: e[1], ...wear ? { wear } : {} };
  }
  return c;
}
var chestIsEmpty = (c) => c.every((s) => !s);

// src/titan/crops.ts
var GARDEN_SPECIES = ["trigo", "cenoura", "batata", "tomate"];
var isGarden = (species) => GARDEN_SPECIES.includes(species);
var CROP_TICK_MEAN_S = 30;
var CROP_SIM_RADIUS = 56;
var CROP_MIN_LIGHT = 9;
var CROP_YIELD = 2;
var cropKey = (x, y, z) => `${x},${y},${z}`;
var cropId = (x, y, z) => `crop:${x},${y},${z}`;
function parseCropId(id) {
  const m = /^crop:(-?\d+),(-?\d+),(-?\d+)$/.exec(id);
  return m ? [Number(m[1]), Number(m[2]), Number(m[3])] : null;
}
var soilKind = (block) => block === T.DAMP_SAND ? "umido" : block === T.SAND ? "seco" : null;
var maxAge = (kind) => kind === "umido" ? 2 : 1;
var maxAgeOf = (species, soil) => species === "noz" || isGarden(species) ? 2 : maxAge(soil);
var isRipe = (species, soil, age) => age >= maxAgeOf(species, soil);
function harvestOf(species, soil) {
  if (isGarden(species)) {
    const g = GARDEN_HARVEST[species];
    return { item: g.item, count: GARDEN_YIELD, backTo: 0, label: g.label };
  }
  if (species === "noz") return { item: Item.NOZ, count: NUT_YIELD, backTo: 1, label: "nozes" };
  return soil === "umido" ? { item: Item.GLASS_REED, count: CROP_YIELD, backTo: 1, label: "mudas de junco" } : { item: Item.DRY_REED, count: CROP_YIELD, backTo: 0, label: "hastes secas" };
}
var seedOf = (species) => isGarden(species) ? GARDEN_SEED[species] : species === "noz" ? Item.NOZ : Item.GLASS_REED;
var GARDEN_SEED = { trigo: Item.SEMENTE_TRIGO, cenoura: Item.CENOURA, batata: Item.BATATA, tomate: Item.TOMATE };
var GARDEN_HARVEST = { trigo: { item: Item.TRIGO, label: "trigo" }, cenoura: { item: Item.CENOURA, label: "cenouras" }, batata: { item: Item.BATATA, label: "batatas" }, tomate: { item: Item.TOMATE, label: "tomates" } };
var GARDEN_YIELD = 2;
function wildSeedAt(x, y, z) {
  const h = (Math.imul(x, 73856093) ^ Math.imul(y, 19349663) ^ Math.imul(z, 83492791)) >>> 0, r = h % 24;
  return r < 4 ? Item.SEMENTE_TRIGO : r === 4 ? Item.CENOURA : r === 5 ? Item.BATATA : r === 6 ? Item.TOMATE : null;
}
var gardenSpeciesOf = (item) => GARDEN_SPECIES.find((sp) => GARDEN_SEED[sp] === item) ?? null;
var plantableSoil = (species, block) => isGarden(species) ? isFarmland(block) : species === "noz" ? block === T.SAND : block === T.SAND || block === T.DAMP_SAND;
var isFarmland = (block) => block === T.FARMLAND_DRY || block === T.FARMLAND_WET;
var soilKindFor = (species, block) => isGarden(species) ? block === T.FARMLAND_WET ? "umido" : block === T.FARMLAND_DRY ? "seco" : null : soilKind(block);
function growthPoints(soilAt) {
  const c = soilAt(0, 0);
  if (!c) return 0;
  let p = c === "umido" ? 4 : 2;
  for (let dx = -1; dx <= 1; dx++) for (let dz = -1; dz <= 1; dz++) {
    if (!dx && !dz) continue;
    const k = soilAt(dx, dz);
    if (k) p += k === "umido" ? 0.75 : 0.25;
  }
  return p;
}
function crowded(sameAt) {
  const ns = sameAt(0, -1) || sameAt(0, 1), ew = sameAt(-1, 0) || sameAt(1, 0);
  const diag = sameAt(-1, -1) || sameAt(1, -1) || sameAt(-1, 1) || sameAt(1, 1);
  return diag || ns && ew;
}
var growChance = (points) => points > 0 ? 1 / (Math.floor(25 / points) + 1) : 0;
function randomTick(crop, ctx, rng) {
  const kind = ctx.soilAt(0, 0);
  if (!kind || crop.species === "noz" && kind !== "seco" || crop.age >= maxAgeOf(crop.species, kind) || ctx.light < CROP_MIN_LIGHT) return false;
  let points = growthPoints(ctx.soilAt);
  if (crowded(ctx.sameAt)) points *= 0.5;
  if (rng() < growChance(points)) {
    crop.age++;
    return true;
  }
  return false;
}

// src/titan/actions.ts
var FULL = { ok: false, msg: "Mochila cheia" };
var COPPER_YIELD = 2;
var amberYield = (x, y, z) => hash2(41906, x * 31 + z, y) < 0.5 ? 1 : 2;
function collectItem(s, id) {
  if (id.startsWith("reed:")) return collectReed(s, id);
  if (id.startsWith("nut:")) return collectNut(s, id);
  if (id.startsWith("crop:")) return collectCrop(s, id);
  const it = s.volume.gen.surfaceItems.find((i) => i.id === id) ?? s.volume.gen.dryReeds.find((i) => i.id === id) ?? s.volume.gen.plates.find((i) => i.id === id);
  if (!it || s.collected.has(id)) return { ok: false };
  const item = it.item;
  if (!s.inventory.canAdd(item)) return FULL;
  s.inventory.add(item);
  s.collected.add(id);
  s.collectedRev++;
  return { ok: true };
}
function collectCrop(s, id) {
  const p = parseCropId(id), crop = p ? s.crops.get(cropKey(p[0], p[1], p[2])) : void 0;
  const kind = crop ? soilKindFor(crop.species, s.volume.get(crop.x, crop.y - 1, crop.z)) : null;
  if (!crop || !kind) return { ok: false };
  if (!isRipe(crop.species, kind, crop.age)) return { ok: false, msg: "Ainda est\xE1 crescendo" };
  const h = harvestOf(crop.species, kind);
  if (!s.inventory.canAdd(h.item, h.count)) return FULL;
  s.inventory.add(h.item, h.count);
  crop.age = h.backTo;
  s.metaRev++;
  return { ok: true, msg: `${h.count} ${h.label}` };
}
function plantSpotFree(s, hit) {
  const x = hit.x, y = hit.y + 1, z = hit.z;
  const busy = s.items.at(x, y, z) || [...s.drops.values()].some((d) => d.x === x && d.y === y && d.z === z);
  return s.volume.get(x, y, z) === T.AIR && !busy && !s.crops.has(cropKey(x, y, z));
}
var canPlantNut = (s, hit) => hit.ny === 1 && !hit.item && plantableSoil("noz", s.volume.get(hit.x, hit.y, hit.z)) && plantSpotFree(s, hit);
function plantCrop(s, hit, slot, species) {
  if (hit.ny !== 1 || !plantableSoil(species, s.volume.get(hit.x, hit.y, hit.z))) return { ok: false, msg: gardenSpeciesOf(seedOf(species)) ? "Isto se planta no topo da terra arada" : "A muda se planta no topo da areia" };
  if (!plantSpotFree(s, hit)) return { ok: false };
  const x = hit.x, y = hit.y + 1, z = hit.z;
  s.crops.set(cropKey(x, y, z), { x, y, z, age: 0, species });
  s.inventory.consume(slot);
  s.metaRev++;
  return { ok: true };
}
var matSupported = (s, x, y, z) => isSolid(s.volume.get(x, y - 1, z)) && blockSpan(s.volume.get(x, y - 1, z))[1] >= 1;
function releaseLadders(s, x, y, z) {
  for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
    const id = s.volume.get(x + dx, y, z + dz), [fx, fz] = isLadder(id) ? ladderFacing(ladderTurn(id)) : [0, 0];
    if (isLadder(id) && fx === dx && fz === dz && s.volume.remove(x + dx, y, z + dz)) spillBlock(s, Item.ESCADA, 1, x + dx, y, z + dz);
  }
}
var torchTopSupport = (id) => isSolid(id) && !isLeaves(id) && blockSpan(id)[1] >= 1;
var torchSideSupport = (id) => isFull(id) && !isLeaves(id);
function releaseTorches(s, x, y, z) {
  const drop = (tx, ty, tz) => {
    if (s.volume.remove(tx, ty, tz)) spillBlock(s, Item.TOCHA, 1, tx, ty, tz);
  };
  if (s.volume.get(x, y + 1, z) === T.TORCH) drop(x, y + 1, z);
  for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
    const id = s.volume.get(x + dx, y, z + dz);
    if (isWallTorch(id)) {
      const [fx, fz] = ladderFacing(wallTorchTurn(id));
      if (fx === dx && fz === dz) drop(x + dx, y, z + dz);
    }
  }
}
function releaseMat(s, x, y, z) {
  if (!isMat(s.volume.get(x, y, z)) || !s.volume.remove(x, y, z)) return;
  spillBlock(s, Item.ESTEIRA, 1, x, y, z);
}
function placeBed(s, hit, slot) {
  const x = hit.x + hit.nx, y = hit.y + hit.ny, z = hit.z + hit.nz, turn = bedTurnFacing(s.yaw), [fx, fz] = ladderFacing(turn), hx = x + fx, hz = z + fz;
  const occupied = s.items;
  for (const [cx, cz] of [[x, z], [hx, hz]]) {
    if (!matSupported(s, cx, y, cz)) return { ok: false, msg: "A cama precisa de piso firme nas duas c\xE9lulas" };
    if (!canPlaceAt(s.volume, s.body, cx, y, cz, occupied, [0, BED_HEIGHT])) return { ok: false };
  }
  const plan = planDisplace(s, [[x, y, z], [hx, y, hz]]);
  if (!plan) return { ok: false, msg: "H\xE1 um item no local e n\xE3o h\xE1 espa\xE7o ao lado para ele" };
  if (!s.volume.place(x, y, z, bedFootId(turn))) return { ok: false };
  if (!s.volume.place(hx, y, hz, bedHeadId(turn))) {
    s.volume.remove(x, y, z);
    return { ok: false };
  }
  applyDisplace(s, plan);
  s.inventory.consume(slot);
  return { ok: true };
}
function breakBed(s, x, y, z) {
  const id = s.volume.get(x, y, z);
  if (!isBed(id) || !s.volume.breakable(x, y, z)) return { ok: false };
  const [dx, dz] = bedPartnerOffset(id), px = x + dx, pz = z + dz;
  s.volume.remove(x, y, z);
  if (isBed(s.volume.get(px, y, pz)) && bedTurn(s.volume.get(px, y, pz)) === bedTurn(id)) s.volume.remove(px, y, pz);
  const fx = isBedFoot(id) ? x : px, fz = isBedFoot(id) ? z : pz;
  spillBlock(s, Item.CAMA, 1, fx, y, fz);
  return { ok: true };
}
function doorHingeFor(v, x, y, z, turn) {
  const [rx, rz] = doorRight(turn), left = v.get(x - rx, y, z - rz);
  return isDoor(left) && !isDoorUpper(left) && doorTurn(left) === turn && !isDoorHingeRight(left);
}
function placeDoor(s, hit, slot) {
  const x = hit.x + hit.nx, y = hit.y + hit.ny, z = hit.z + hit.nz, turn = marcoTurnFacing(s.yaw);
  if (!matSupported(s, x, y, z)) return { ok: false, msg: "A porta precisa de piso firme" };
  if (!canPlaceAt(s.volume, s.body, x, y, z, s.items, [0, 1])) return { ok: false };
  if (!canPlaceAt(s.volume, s.body, x, y + 1, z, s.items, [0, 1])) return { ok: false, msg: "Falta espa\xE7o em cima para a porta" };
  const plan = planDisplace(s, [[x, y, z], [x, y + 1, z]]);
  if (!plan) return { ok: false, msg: "H\xE1 um item no local e n\xE3o h\xE1 espa\xE7o ao lado para ele" };
  const hinge = doorHingeFor(s.volume, x, y, z, turn);
  if (!s.volume.place(x, y, z, doorId(turn, hinge, false, false))) return { ok: false };
  if (!s.volume.place(x, y + 1, z, doorId(turn, hinge, false, true))) {
    s.volume.remove(x, y, z);
    return { ok: false };
  }
  applyDisplace(s, plan);
  s.inventory.consume(slot);
  return { ok: true };
}
function breakDoor(s, x, y, z) {
  const id = s.volume.get(x, y, z);
  if (!isDoor(id) || !s.volume.breakable(x, y, z)) return { ok: false };
  const ly = isDoorUpper(id) ? y - 1 : y;
  for (const yy of [ly, ly + 1]) if (isDoor(s.volume.get(x, yy, z))) s.volume.remove(x, yy, z);
  spillBlock(s, Item.PORTA_JUNCO, 1, x, ly, z);
  return { ok: true };
}
function useDoor(s, x, y, z) {
  const id = s.volume.get(x, y, z);
  if (!isDoor(id)) return { ok: false };
  const ly = isDoorUpper(id) ? y - 1 : y, lo = s.volume.get(x, ly, z);
  if (!isDoor(lo) || isDoorUpper(lo) || !isDoor(s.volume.get(x, ly + 1, z))) return { ok: false };
  const closing = isDoorOpen(lo);
  if (closing) {
    const cb = blockBoxes(doorToggled(lo))?.[0], b = s.body;
    if (cb && b.x + BODY_HALF > x + cb[0] && b.x - BODY_HALF < x + cb[3] && b.z + BODY_HALF > z + cb[2] && b.z - BODY_HALF < z + cb[5] && b.y < ly + 2 && b.y + BODY_HEIGHT > ly) return { ok: false, msg: "Tem algu\xE9m no caminho da porta" };
  }
  const flip = (cx, cz) => {
    for (const yy of [ly, ly + 1]) {
      const d = s.volume.get(cx, yy, cz);
      if (isDoor(d) && isDoorOpen(d) === closing) s.volume.set(cx, yy, cz, doorToggled(d));
    }
  };
  flip(x, z);
  const [rx, rz] = doorRight(doorTurn(lo)), sgn = isDoorHingeRight(lo) ? -1 : 1, px = x + sgn * rx, pz = z + sgn * rz, pd = s.volume.get(px, ly, pz);
  if (isDoor(pd) && !isDoorUpper(pd) && doorTurn(pd) === doorTurn(lo) && isDoorHingeRight(pd) !== isDoorHingeRight(lo)) flip(px, pz);
  return { ok: true, open: !closing };
}
function useBed(s, x, y, z, sleep = true) {
  const id = s.volume.get(x, y, z);
  if (!isBed(id)) return { ok: false };
  const [dx, dz] = bedPartnerOffset(id), footX = isBedFoot(id) ? x : x + dx, footZ = isBedFoot(id) ? z : z + dz;
  s.spawn = { x: footX, y, z: footZ };
  s.metaRev++;
  if (!canSleep(s.time, s.weather.raining && hasWeather(s.volume.gen.world))) return { ok: true, msg: "Ponto de retorno marcado. S\xF3 se dorme \xE0 noite." };
  if (!sleep) return { ok: true, msg: "Ponto de retorno marcado." };
  const wake = tickFrac(WAKE_TICKS);
  if (s.time > wake) s.days++;
  s.time = wake;
  clearWeather(s.weather);
  return { ok: true, msg: "Voc\xEA dormiu at\xE9 o amanhecer. Ponto de retorno marcado." };
}
function bedSpawn(s) {
  const p = s.spawn;
  if (!p || !isBedFoot(s.volume.get(p.x, p.y, p.z))) return null;
  const [fx, fz] = ladderFacing(bedTurn(s.volume.get(p.x, p.y, p.z))), cells = [[p.x, p.z], [p.x + fx, p.z + fz]];
  const isBedCell = (cx, cz) => cells.some(([a, b]) => a === cx && b === cz);
  for (const [cx, cz] of cells) for (const [dx, dz] of [[fz, fx], [-fz, -fx], [-fx, -fz], [fx, fz]]) {
    const nx = cx + dx, nz = cz + dz;
    if (isBedCell(nx, nz) || s.volume.get(nx, p.y, nz) !== T.AIR || s.volume.get(nx, p.y + 1, nz) !== T.AIR || !matSupported(s, nx, p.y, nz)) continue;
    return { x: nx + 0.5, y: p.y, z: nz + 0.5, yaw: Math.atan2(-(cx - nx), -(cz - nz)) };
  }
  return null;
}
function releaseCrop(s, x, y, z) {
  const crop = s.crops.get(cropKey(x, y, z));
  if (!crop) return;
  s.crops.delete(cropKey(x, y, z));
  s.metaRev++;
  dropShard(s, seedOf(crop.species), x, y, z);
}
function collectReed(s, id) {
  const m = /^reed:(-?\d+),(-?\d+),(-?\d+)$/.exec(id);
  if (!m || s.items.at(Number(m[1]), Number(m[2]), Number(m[3])) !== id) return { ok: false };
  if (!s.inventory.canAdd(Item.GLASS_REED)) return FULL;
  s.inventory.add(Item.GLASS_REED);
  s.collected.add(id);
  s.collectedRev++;
  return { ok: true };
}
function collectNut(s, id) {
  if (s.regrow.has(id) || !/^nut:(-?\d+),(-?\d+),(-?\d+)$/.test(id)) return { ok: false };
  const m = /^nut:(-?\d+),(-?\d+),(-?\d+)$/.exec(id);
  if (s.items.at(Number(m[1]), Number(m[2]), Number(m[3])) !== id) return { ok: false };
  if (!s.inventory.canAdd(Item.NOZ, NUT_YIELD)) return FULL;
  s.inventory.add(Item.NOZ, NUT_YIELD);
  s.regrow.set(id, NUT_REGROW_S);
  s.collectedRev++;
  return { ok: true, msg: `${NUT_YIELD} nozes colhidas` };
}
function eatFromSlot(s, slot) {
  const stack = s.inventory.get(slot);
  const food = stack ? foodOf(stack.item) : null;
  if (!stack || !food) return { ok: false };
  if (!eat(s.vitals, food)) return { ok: false, msg: "Sem fome agora" };
  s.inventory.consume(slot);
  return { ok: true };
}
function furnaceAt(s, x, y, z) {
  const id = s.volume.get(x, y, z);
  if (!rulesOf(id)) return null;
  const k = furnaceKey(x, y, z);
  let f = s.furnaces.get(k);
  if (!f) {
    f = newFurnace();
    s.furnaces.set(k, f);
    s.metaRev++;
  }
  return f;
}
function furnaceMoveIn(s, x, y, z, slot, invSlot) {
  const f = furnaceAt(s, x, y, z), st = s.inventory.get(invSlot);
  if (!f || !st) return { ok: false };
  const rules = rulesOf(s.volume.get(x, y, z));
  if (!accepts(slot, st.item, rules.station)) return { ok: false, msg: slot === "fuel" ? "Isso n\xE3o queima" : rules.station === "furnace" ? "A fornalha n\xE3o cozinha isso" : "O braseiro n\xE3o cozinha isso" };
  const cur = f[slot];
  if (cur && cur.item !== st.item) return { ok: false, msg: "O espa\xE7o j\xE1 tem outro item" };
  const room = maxStack(st.item) - (cur?.count ?? 0), n = Math.min(room, st.count);
  if (n <= 0) return { ok: false, msg: "O espa\xE7o est\xE1 cheio" };
  f[slot] = { item: st.item, count: (cur?.count ?? 0) + n };
  for (let i = 0; i < n; i++) s.inventory.consume(invSlot);
  s.metaRev++;
  return { ok: true };
}
function furnaceTakeOut(s, x, y, z, slot) {
  const f = furnaceAt(s, x, y, z), st = f?.[slot];
  if (!f || !st) return { ok: false };
  if (!s.inventory.canAdd(st.item, st.count)) return FULL;
  s.inventory.add(st.item, st.count);
  f[slot] = null;
  s.metaRev++;
  return { ok: true };
}
function chestAt(s, x, y, z) {
  if (!isChest(s.volume.get(x, y, z))) return null;
  const k = furnaceKey(x, y, z);
  let c = s.chests.get(k);
  if (!c) {
    c = newChest();
    s.chests.set(k, c);
  }
  return c;
}
function chestMoveIn(s, x, y, z, invSlot) {
  const c = chestAt(s, x, y, z), st = s.inventory.get(invSlot);
  if (!c || !st || invSlot >= SLOTS) return { ok: false };
  if (chestRoom(c, st.item) < st.count) return { ok: false, msg: "Ba\xFA cheio" };
  const taken = s.inventory.take(invSlot);
  chestPut(c, taken);
  s.metaRev++;
  return { ok: true };
}
function chestTakeOut(s, x, y, z, slot) {
  const c = chestAt(s, x, y, z), st = c && Number.isInteger(slot) && slot >= 0 && slot < CHEST_SLOTS ? c[slot] : null;
  if (!c || !st) return { ok: false };
  if (!s.inventory.canAdd(st.item, st.count)) return FULL;
  s.inventory.add(st.item, st.count, st.wear ?? 0);
  c[slot] = null;
  s.metaRev++;
  return { ok: true };
}
function spillChest(s, x, y, z) {
  const k = furnaceKey(x, y, z), c = s.chests.get(k);
  if (!c) return;
  const ry = y;
  c.forEach((st, n) => {
    if (!st) return;
    const id = `k:${x},${y},${z}:${n}`;
    s.drops.set(id, { id, item: st.item, ...st.count > 1 ? { count: st.count } : {}, ...st.wear ? { wear: st.wear } : {}, x, y: ry, z });
    s.dropsRev++;
  });
  s.chests.delete(k);
  s.metaRev++;
}
function spillFurnace(s, x, y, z) {
  const k = furnaceKey(x, y, z), f = s.furnaces.get(k);
  if (!f) return;
  const ry = y;
  ["input", "fuel", "output"].forEach((slot, n) => {
    const st = f[slot];
    if (!st) return;
    const id = `f:${x},${y},${z}:${n}`;
    s.drops.set(id, { id, item: st.item, ...st.count > 1 ? { count: st.count } : {}, x, y: ry, z });
    s.dropsRev++;
  });
  s.furnaces.delete(k);
  s.metaRev++;
}
function wearHeldTool(s, action) {
  const held = s.inventory.get(s.selected);
  if (!held) return { broken: false };
  const cost = wearCost(held.item, action);
  const r = cost > 0 ? s.inventory.damage(s.selected, cost) : null;
  return r?.broken ? { broken: true, name: ITEM_NAMES[held.item] } : { broken: false };
}
function breakOrCollect(s, hit) {
  if (hit.item) return collectItem(s, hit.item);
  const block = s.volume.get(hit.x, hit.y, hit.z);
  const r = breakOrCollectBlock(s, hit);
  if (!r.ok) return r;
  const w = wearHeldTool(s, { type: "break_block", block });
  return w.broken ? { ...r, broken: true, msg: `${w.name} quebrou` } : r;
}
function breakOrCollectBlock(s, hit) {
  if (hit.item) return collectItem(s, hit.item);
  const { x, y, z } = hit;
  if (!s.volume.breakable(x, y, z)) return { ok: false };
  if (isBed(s.volume.get(x, y, z))) return breakBed(s, x, y, z);
  if (isDoor(s.volume.get(x, y, z))) return breakDoor(s, x, y, z);
  if (isCopperVein(s.volume.get(x, y, z))) {
    if (!isPick(s.inventory.get(s.selected)?.item)) return { ok: false, msg: "S\xF3 p\xF3 nos dedos. Falta uma picareta." };
    const reed0 = s.items.at(x, y + 1, z);
    if (!s.volume.remove(x, y, z)) return { ok: false };
    dropShard(s, Item.COPPER_SHARD, x, y, z, COPPER_YIELD);
    releaseReed(s, reed0, x, y + 1, z);
    return { ok: true };
  }
  if (isAmberVein(s.volume.get(x, y, z))) {
    if (!isPick(s.inventory.get(s.selected)?.item)) return { ok: false, msg: "S\xF3 p\xF3 nos dedos. Falta uma picareta." };
    const reed0 = s.items.at(x, y + 1, z);
    if (!s.volume.remove(x, y, z)) return { ok: false };
    dropShard(s, Item.EMBER, x, y, z, amberYield(x, y, z));
    releaseReed(s, reed0, x, y + 1, z);
    return { ok: true };
  }
  const reed = s.items.at(x, y + 1, z);
  if (s.volume.get(x, y, z) === T.EMBER) {
    if (!s.volume.remove(x, y, z)) return { ok: false };
    dropShard(s, Item.EMBER, x, y, z);
    releaseReed(s, reed, x, y + 1, z);
    return { ok: true };
  }
  const item = itemOfBlock(s.volume.get(x, y, z));
  if (item === null) return { ok: false };
  const count = dropCountOf(s.volume.get(x, y, z));
  const block = s.volume.get(x, y, z);
  const direct = item === Item.LANTERN;
  if (direct && !s.inventory.canAdd(item, count)) return FULL;
  if (!s.volume.remove(x, y, z)) return { ok: false };
  if (direct) s.inventory.add(item, count);
  else if (block === T.COAL_ORE && !isPick(s.inventory.get(s.selected)?.item)) {
  } else spillBlock(s, item, count, x, y, z);
  if (block === T.GRASS) {
    const seed = wildSeedAt(x, y, z);
    if (seed !== null) spillBlock(s, seed, 1, x, y, z);
  }
  if (isBrazier(block) || isFurnace(block)) spillFurnace(s, x, y, z);
  if (isChest(block)) spillChest(s, x, y, z);
  if (isVein(block)) dropShard(s, block === T.VEIN_ROCK ? 5 : 6, x, y, z);
  releaseReed(s, reed, x, y + 1, z);
  releaseCrop(s, x, y + 1, z);
  releaseMat(s, x, y + 1, z);
  releaseLadders(s, x, y, z);
  releaseTorches(s, x, y, z);
  if (isBed(s.volume.get(x, y + 1, z))) breakBed(s, x, y + 1, z);
  if (isDoor(s.volume.get(x, y + 1, z))) breakDoor(s, x, y + 1, z);
  return { ok: true };
}
function releaseReed(s, id, x, y, z) {
  if (!id || !id.startsWith("reed:") || s.collected.has(id)) return;
  s.collected.add(id);
  s.collectedRev++;
  dropShard(s, Item.GLASS_REED, x, y, z);
}
function restDrop(s, id, item, x, y, z, count) {
  if (count < 1 || s.drops.has(id)) return;
  const cx = Math.floor(x), cy = Math.floor(y), cz = Math.floor(z);
  s.drops.set(
    id,
    { id, item, ...count > 1 ? { count } : {}, x: cx, y: cy, z: cz }
    /* cai por gravidade (ADR 0098) */
  );
  s.dropsRev++;
}
function dropShard(s, item, x, y, z, count = 1) {
  const id = `v:${x},${y},${z}`;
  if (s.drops.has(id)) return;
  s.drops.set(id, { id, item, ...count > 1 ? { count } : {}, x, y, z });
  s.dropsRev++;
}
var PICKUP_DELAY_S = 0.45;
var DROP_LIFE_S = 300;
function spillBlock(s, item, count, x, y, z) {
  let n = 0;
  while (s.drops.has(`b:${x},${y},${z}:${n}`)) n++;
  const id = `b:${x},${y},${z}:${n}`;
  s.drops.set(id, { id, item, ...count > 1 ? { count } : {}, x, y, z });
  s.dropFx.set(id, { delay: PICKUP_DELAY_S, age: 0 });
  s.dropsRev++;
}
var PICKUP_RADIUS = 1.45;
function collectNearby(s, px, py, pz, dt = 0) {
  let collected = 0, full = false, moved = dt > 0 ? stepDrops(s, dt) : settleDrops(s);
  for (const d of [...s.drops.values()]) {
    let fx = s.dropFx.get(d.id);
    if (!fx && d.id.startsWith("b:")) {
      fx = { delay: 0, age: 0 };
      s.dropFx.set(d.id, fx);
    }
    if (fx) {
      fx.delay = Math.max(0, fx.delay - dt);
      fx.age += dt;
      if (d.id.startsWith("b:") && fx.age >= DROP_LIFE_S) {
        s.drops.delete(d.id);
        s.dropFx.delete(d.id);
        s.dropsRev++;
        moved = true;
        continue;
      }
      if (fx.delay > 0) continue;
    }
    const dd = s.drops.get(d.id);
    if (Math.hypot(dd.x + 0.5 - px, dd.z + 0.5 - pz) > PICKUP_RADIUS || py > dd.y + 1.5 || py + 1.8 < dd.y) continue;
    const item = dd.item, count = dd.count ?? 1;
    if (!s.inventory.canAdd(item, count)) {
      full = true;
      continue;
    }
    s.inventory.add(item, count, dd.wear ?? 0);
    s.drops.delete(dd.id);
    s.dropFx.delete(dd.id);
    s.dropsRev++;
    collected++;
  }
  return { collected, full, moved };
}
function useBucket(s, hit, slot) {
  const stack = s.inventory.get(slot);
  if (!stack) return { ok: false };
  const v = s.volume;
  if (stack.item === Item.BALDE) {
    if (v.get(hit.x, hit.y, hit.z) !== T.LAKE) return { ok: false, msg: "Aponte o balde para o lago" };
    if (v.get(hit.x, hit.y + 1, hit.z) === T.LAKE) return { ok: false, msg: "O balde s\xF3 recolhe a superf\xEDcie do lago" };
    if (!v.set(hit.x, hit.y, hit.z, T.AIR)) return { ok: false };
    s.inventory.replace(slot, Item.BALDE_CHEIO);
    return { ok: true, msg: "Balde cheio" };
  }
  const x = hit.x + hit.nx, y = hit.y + hit.ny, z = hit.z + hit.nz;
  if (hit.item || !v.editable(x, y, z) || v.get(x, y, z) !== T.AIR) return { ok: false, msg: "Aqui n\xE3o d\xE1 para despejar" };
  if (y > LAKE_LAST_Y) return { ok: false, msg: "O l\xEDquido s\xF3 se despeja em cavidade abaixo da superf\xEDcie do lago" };
  const occupied = s.items.at(x, y, z) ?? [...s.drops.values()].find((d) => d.x === x && d.y === y && d.z === z)?.id ?? null;
  if (occupied || !v.set(x, y, z, T.LAKE)) return { ok: false, msg: "Aqui n\xE3o d\xE1 para despejar" };
  s.inventory.replace(slot, Item.BALDE);
  return { ok: true, msg: "L\xEDquido despejado" };
}
function useSoilTool(s, hit, hoe) {
  const { x, y, z } = hit;
  if (hit.item || hit.ny !== 1 || !s.volume.editable(x, y, z)) return { ok: false, msg: hoe ? "A enxada ara a face de cima da terra" : "A p\xE1 abre caminho na face de cima da grama" };
  const block = s.volume.get(x, y, z), to = hoe ? hoeResult(s.volume, block, x, y, z) : shovelResult(block);
  if (to === null) return { ok: false, msg: hoe ? "Aqui n\xE3o d\xE1 para arar" : "Aqui n\xE3o d\xE1 para abrir caminho" };
  if (s.volume.get(x, y + 1, z) !== T.AIR) return { ok: false, msg: "Falta espa\xE7o livre em cima" };
  if (!s.volume.set(x, y, z, to)) return { ok: false };
  const w = wearHeldTool(s, { type: "use" });
  return w.broken ? { ok: true, broken: true, msg: `${w.name} quebrou` } : { ok: true };
}
function placeFromSlot(s, hit, slot) {
  const stack = s.inventory.get(slot);
  if (!stack) return { ok: false };
  if (isHoe(stack.item) || isShovel(stack.item)) return useSoilTool(s, hit, isHoe(stack.item));
  if (isBucket(stack.item)) return useBucket(s, hit, slot);
  if (stack.item === Item.NOZ && canPlantNut(s, hit)) return plantCrop(s, hit, slot, "noz");
  const garden = gardenSpeciesOf(stack.item);
  if (garden && hit.ny === 1 && !hit.item && plantableSoil(garden, s.volume.get(hit.x, hit.y, hit.z)) && plantSpotFree(s, hit)) return plantCrop(s, hit, slot, garden);
  if (garden && !foodOf(stack.item)) return { ok: false, msg: "A semente se planta no topo da terra arada" };
  if (foodOf(stack.item)) return eatFromSlot(s, slot);
  if (stack.item === Item.GLASS_REED) return plantCrop(s, hit, slot, "junco");
  let block = blockOfItem(stack.item);
  if (block === null) return { ok: false, msg: "Este item n\xE3o se coloca" };
  if (block === T.DOOR) return placeDoor(s, hit, slot);
  if (block === T.BED) return placeBed(s, hit, slot);
  if (block === T.LADDER) {
    if (hit.ny !== 0 || hit.item) return { ok: false, msg: "A escada se prende \xE0 lateral de um bloco" };
    if (!isFull(s.volume.get(hit.x, hit.y, hit.z))) return { ok: false, msg: "A escada precisa de um bloco inteiro atr\xE1s" };
    block = ladderId(ladderTurnOf(hit.nx, hit.nz));
  } else if (block === T.TORCH) {
    const base = s.volume.get(hit.x, hit.y, hit.z);
    if (hit.item || hit.ny < 0) return { ok: false, msg: "A tocha n\xE3o se prende por baixo" };
    if (hit.ny > 0) {
      if (!torchTopSupport(base)) return { ok: false, msg: "A tocha precisa de um apoio firme" };
    } else if (!torchSideSupport(base)) return { ok: false, msg: "A tocha precisa de um bloco inteiro para se prender" };
    else block = wallTorchId(ladderTurnOf(hit.nx, hit.nz));
  } else if (block === T.WORKBENCH) block = workbenchId(workbenchTurnFacing(s.yaw));
  else if (block === T.MARCO) block = marcoId(marcoTurnFacing(s.yaw));
  else if (block === T.PAINEL) block = panelIdFacing(s.yaw);
  else if (block === T.REED_STAIR) block = stairId(marcoTurnFacing(s.yaw));
  else if (block === T.STONE_STAIR) block = stairId(marcoTurnFacing(s.yaw), true);
  else if (block === T.REED_CHAIR) block = chairId(marcoTurnFacing(s.yaw));
  else if (block === T.FURNACE) block = furnaceId(carpentryTurnFacing(s.yaw), false);
  else if (block === T.CARPENTRY) block = carpentryId(carpentryTurnFacing(s.yaw));
  else if (block === T.CHEST) block = chestId(chestTurnFacing(s.yaw));
  if (isSlabBottom(block)) {
    const r = resolveSlabPlacement(s.volume.get(hit.x, hit.y, hit.z), hit.ny, hit.hy, block);
    if (r.merge) {
      const target = s.volume.get(hit.x, hit.y, hit.z);
      const added = isSlabBottom(target) ? [0.5, 1] : [0, 0.5];
      const b = s.body;
      const overlap = hit.x + 1 > b.x - BODY_HALF && hit.x < b.x + BODY_HALF && hit.z + 1 > b.z - BODY_HALF && hit.z < b.z + BODY_HALF && hit.y + added[1] > b.y + 1e-4 && hit.y + added[0] < b.y + BODY_HEIGHT;
      if (overlap || !s.volume.editable(hit.x, hit.y, hit.z) || !s.volume.set(hit.x, hit.y, hit.z, r.block)) return { ok: false };
      s.inventory.consume(slot);
      return { ok: true };
    }
    block = r.block;
  }
  const x = hit.x + hit.nx, y = hit.y + hit.ny, z = hit.z + hit.nz;
  if (block === T.MAT && !matSupported(s, x, y, z)) return { ok: false, msg: "A esteira precisa de piso firme" };
  const occupied = s.items;
  if (!canPlaceAt(s.volume, s.body, x, y, z, occupied, blockSpan(block))) return { ok: false };
  const plan = planDisplace(s, [[x, y, z]]);
  if (!plan) return { ok: false, msg: "H\xE1 um item no local e n\xE3o h\xE1 espa\xE7o ao lado para ele" };
  if (!s.volume.place(x, y, z, block)) return { ok: false };
  applyDisplace(s, plan);
  s.inventory.consume(slot);
  return { ok: true };
}
function dieAndRespawn(s) {
  const x = Math.floor(s.body.x), y = Math.max(Y_MIN + 2, Math.floor(s.body.y)), z = Math.floor(s.body.z);
  const stacks = s.inventory.takeAll();
  const ry = y;
  stacks.forEach((st, n) => {
    const id = `d:${x},${ry},${z}:${n}`;
    s.drops.set(id, { id, item: st.item, ...st.count > 1 ? { count: st.count } : {}, ...st.wear ? { wear: st.wear } : {}, x, y: ry, z });
  });
  if (stacks.length) s.dropsRev++;
  s.selected = Math.min(s.selected, 8);
  const a = bedSpawn(s) ?? s.volume.gen.arrival;
  s.body = newBody(a.x, a.y, a.z);
  s.yaw = a.yaw;
  s.pitch = -0.12;
  revive(s.vitals);
  return stacks.length;
}

// src/titan/biomes.ts
var MARGEM_SILENCIOSA = { id: "margem", name: "Margem Silenciosa", nutRate: 0.01, nutSpacing: 4, pequenoPerPlant: 1, plantsPerGrande: 5 };
var biomeAt = (_x, _z) => MARGEM_SILENCIOSA;

// src/titan/creature.ts
var KINDS = {
  pequeno: { scale: 0.5, damage: 2, sight: 8, walk: 0.2, charge: 1.15, hitRadius: 0.8, hp: 10, name: "Farejador pequeno" },
  grande: { scale: 1.3, damage: 4, sight: 11, walk: 0.14, charge: 0.95, hitRadius: 1.5, hp: 30, name: "Farejador grande" }
};
var FAREJADOR = {
  /** Passeio em volta da toca (m). */
  wanderRadius: 8,
  /** Não persegue o viajante que está além disto da toca; a investida aborta se o animal passa disto. */
  chaseRadius: 20,
  returnSpeed: 0.4,
  /** A investida dura no máximo isto (s). */
  chargeMaxS: 1.7,
  /** Parado, estonteado, depois de bater (s). */
  stunS: 2,
  /** Tempo de virar de costas e de se levantar dentro do atordoamento (s). */
  flipS: 0.35,
  /** Pausa depois de uma investida que errou (s). */
  missPauseS: 1.5
};
function newFarejador(kind, den, seed, id = kind) {
  const hx = den.x + 0.5, hz = den.z + 0.5, idSalt = id === kind ? 0 : [...id].reduce((a, ch) => Math.imul(a, 31) + ch.charCodeAt(0) >>> 0, 7), s = (seed >>> 0) + (kind === "grande" ? 7919 : 104729) + idSalt >>> 0;
  return { id, kind, body: newBody(hx, den.y, hz), yaw: Math.PI / 2, phase: "wander", t: 0, home: { x: hx, z: hz }, goal: { x: hx, z: hz }, pause: kind === "grande" ? 1.5 : 0.4, cooldown: 0, stuck: 0, hp: KINDS[kind].hp, aggro: 0, hurt: 99, clock: 0, seed: s };
}
function creatureSpecs(g) {
  if (g.version < 12) return g.den ? [{ id: "grande", kind: "grande", ...g.den }, { id: "pequeno", kind: "pequeno", ...g.den }] : [];
  const biome = biomeAt(g.arrival.x, g.arrival.z), out = [];
  const near = (p, id, kind, r) => {
    const k = [...id].reduce((a, ch) => Math.imul(a, 31) + ch.charCodeAt(0) >>> 0, 11);
    for (let i = 0; i < 8; i++) {
      const ang = (Math.floor(hash2(g.seed, k, 3) * 8) + i) % 8 * (Math.PI / 4), x = Math.round(p.x + Math.cos(ang) * r), z = Math.round(p.z + Math.sin(ang) * r), top = g.column(x, z).top;
      if (Math.abs(top - (p.y - 1)) <= 1 && top >= 64) return { id, kind, x, y: top + 1, z };
    }
    return { id, kind, x: p.x, y: p.y, z: p.z };
  };
  let free = -1;
  if (g.version >= 13) g.nutPlants.forEach((p, i) => {
    if (free < 0 || Math.hypot(p.x - g.arrival.x, p.z - g.arrival.z) < Math.hypot(g.nutPlants[free].x - g.arrival.x, g.nutPlants[free].z - g.arrival.z)) free = i;
  });
  const wanted = Math.max(1, Math.floor(g.nutPlants.length / biome.plantsPerGrande));
  if (g.den) out.push({ id: "g0", kind: "grande", ...g.den });
  const bigs = g.den ? [g.den] : [];
  for (const [minArrival, apart] of [[24, 20], [20, 14], [18, 10]]) {
    for (let i = 0; i < g.nutPlants.length && bigs.length < wanted; i++) {
      if (i === free) continue;
      const p = g.nutPlants[i];
      if (Math.hypot(p.x - g.arrival.x, p.z - g.arrival.z) < minArrival || bigs.some((o) => Math.hypot(o.x - p.x, o.z - p.z) < apart)) continue;
      bigs.push(p);
      out.push(near(p, `g${bigs.length - 1}`, "grande", 3));
    }
  }
  g.nutPlants.forEach((p, i) => {
    if (i === free) return;
    for (let k = 0; k < biome.pequenoPerPlant; k++) out.push(near(p, k ? `p${i}_${k}` : `p${i}`, "pequeno", 2));
  });
  return out;
}
var newFromSpec = (sp, seed) => newFarejador(sp.kind, sp, seed, sp.id);
var dist = (ax, az, bx, bz) => Math.hypot(ax - bx, az - bz);
var facingYaw = (dx, dz) => Math.atan2(dz, -dx);
function pickGoal(f, vol) {
  const k0 = Math.floor(f.clock * 0.37) + 1, y = Math.floor(f.body.y + 0.01);
  for (let i = 0; i < 8; i++) {
    const a = hash2(f.seed, k0 + i * 31, 11) * Math.PI * 2, r = FAREJADOR.wanderRadius * (0.3 + 0.7 * hash2(f.seed, k0 + i * 31, 23));
    const x = f.home.x + Math.cos(a) * r, z = f.home.z + Math.sin(a) * r, cx = Math.floor(x), cz = Math.floor(z);
    if (isSolid(vol.get(cx, y - 1, cz)) && vol.get(cx, y - 1, cz) !== T.LAKE && vol.get(cx, y, cz) === T.AIR && vol.get(cx, y + 1, cz) === T.AIR) return { x, z };
  }
  return { x: f.body.x, z: f.body.z };
}
function setPhase(f, p, ev) {
  f.phase = p;
  f.t = 0;
  ev.phase = p;
}
function stepFarejador(f, vol, player, dt) {
  const ev = { hit: false, damage: 0, phase: null, moving: false };
  const K = KINDS[f.kind];
  f.clock += dt;
  f.t += dt;
  if (f.cooldown > 0) f.cooldown = Math.max(0, f.cooldown - dt);
  if (f.aggro > 0) f.aggro = Math.max(0, f.aggro - dt);
  f.hurt += dt;
  const b = f.body;
  const pd = player ? dist(b.x, b.z, player.x, player.z) : Infinity;
  const playerHome = player ? dist(f.home.x, f.home.z, player.x, player.z) : Infinity;
  const sees = !!player && f.cooldown === 0 && Math.abs(player.y - b.y) < 3 && (pd <= K.sight || f.aggro > 0 && pd <= FAREJADOR.chaseRadius) && playerHome <= FAREJADOR.chaseRadius;
  let dirX = 0, dirZ = 0, speed = 0;
  const walkTo = (tx, tz, s) => {
    const dx = tx - b.x, dz = tz - b.z, d = Math.hypot(dx, dz);
    if (d < 1e-6) return;
    dirX = dx / d;
    dirZ = dz / d;
    speed = s;
    f.yaw = facingYaw(dirX, dirZ);
  };
  if (f.phase === "wander" || f.phase === "return") {
    if (sees) setPhase(f, "charge", ev);
    else if (f.phase === "return") {
      if (dist(b.x, b.z, f.home.x, f.home.z) < 1.2) {
        f.pause = 0.6;
        setPhase(f, "wander", ev);
      } else walkTo(f.home.x, f.home.z, FAREJADOR.returnSpeed);
    } else if (f.pause > 0) {
      f.pause -= dt;
      f.stuck = 0;
    } else if (dist(b.x, b.z, f.goal.x, f.goal.z) < 0.4 || f.stuck > 5) {
      f.pause = 1 + 2 * hash2(f.seed, Math.floor(f.clock), 5);
      f.goal = pickGoal(f, vol);
      f.stuck = 0;
    } else {
      walkTo(f.goal.x, f.goal.z, K.walk);
      f.stuck += dt;
    }
  } else if (f.phase === "charge") {
    const away = dist(f.home.x, f.home.z, b.x, b.z) > FAREJADOR.chaseRadius;
    if (!player || away || f.t >= FAREJADOR.chargeMaxS) {
      f.cooldown = FAREJADOR.missPauseS;
      setPhase(f, "return", ev);
    } else {
      walkTo(player.x, player.z, K.charge);
      if (pd <= K.hitRadius && Math.abs(player.y - b.y) < 1.4) {
        ev.hit = true;
        ev.damage = K.damage;
        setPhase(f, "stunned", ev);
      }
    }
  } else {
    if (f.t >= FAREJADOR.stunS) setPhase(f, "wander", ev);
  }
  stepBody(vol, b, { dirX: dirX * speed, dirZ: dirZ * speed, jump: false }, dt);
  ev.moving = speed > 0 && Math.hypot(b.vx, b.vz) > 0.05;
  return ev;
}
function hurtFarejador(f, damage) {
  f.hp = Math.max(0, f.hp - Math.max(0, damage));
  f.hurt = 0;
  f.aggro = 8;
  f.cooldown = 0;
  return { dead: f.hp <= 0 };
}

// src/titan/combat.ts
var ATTACK_REACH = 3;
var ATTACK_COOLDOWN_S = 0.6;
var FIST_DAMAGE = 1;
var WEAPON_DAMAGE = {
  [Item.STONE_DAGGER]: 4,
  [Item.COPPER_DAGGER]: 6,
  [Item.STONE_PICK]: 2,
  [Item.COPPER_PICK]: 3,
  [Item.PICARETA_MADEIRA]: 1,
  [Item.PICARETA_PEDRA]: 2,
  [Item.MACHADO_MADEIRA]: 2,
  [Item.MACHADO_PEDRA]: 3,
  [Item.PA_MADEIRA]: 1,
  [Item.PA_PEDRA]: 2,
  [Item.ENXADA_MADEIRA]: 1,
  [Item.ENXADA_PEDRA]: 1
};
var damageOf = (item) => item ? WEAPON_DAMAGE[item] ?? FIST_DAMAGE : FIST_DAMAGE;
var LOOT = { pequeno: { meat: 1, plate: 1 }, grande: { meat: 2, plate: 1 } };
var RESPAWN_S = 600;
function attackCreature(s, index) {
  const f = s.creatures[index];
  if (!f) return { ok: false, damage: 0, dead: false, broken: false };
  const damage = damageOf(s.inventory.get(s.selected)?.item);
  const w = wearHeldTool(s, { type: "attack" });
  const r = hurtFarejador(f, damage);
  if (!r.dead) return { ok: true, damage, dead: false, broken: w.broken, toolName: w.name, msg: w.broken ? `${w.name} quebrou` : void 0 };
  const loot = LOOT[f.kind];
  s.creatures.splice(index, 1);
  s.respawn.set(f.id, RESPAWN_S);
  s.metaRev++;
  const base = `m:${f.id}:${Math.floor(f.clock * 10)}`;
  let n = 0;
  while (s.drops.has(`${base}:${n}:0`) || s.drops.has(`${base}:${n}:1`)) n++;
  restDrop(s, `${base}:${n}:0`, Item.RAW_MEAT, f.body.x, f.body.y, f.body.z, loot.meat);
  restDrop(s, `${base}:${n}:1`, Item.PLATE, f.body.x, f.body.y, f.body.z, loot.plate);
  return { ok: true, damage, dead: true, broken: w.broken, toolName: w.name, loot, msg: `${KINDS[f.kind].name} abatido: ${loot.meat} ${loot.meat > 1 ? "por\xE7\xF5es" : "por\xE7\xE3o"} de carne e ${loot.plate} placa${w.broken ? `; ${w.name} quebrou` : ""}` };
}
function tickRespawn(s, dt) {
  const back = [];
  const gen = s.volume.gen;
  for (const [id, left] of [...s.respawn]) {
    const rest = left - dt;
    if (rest > 0) {
      s.respawn.set(id, rest);
      continue;
    }
    s.respawn.delete(id);
    const sp = creatureSpecs(gen).find((c) => c.id === id);
    if (sp && !s.creatures.some((c) => c.id === id)) {
      const f = newFromSpec(sp, gen.seed);
      s.creatures.push(f);
      back.push(f);
    }
    s.metaRev++;
  }
  return back;
}

// src/world/noise.ts
var Noise = class {
  perm;
  grad1;
  constructor(seed) {
    const rand = mulberry32(seed);
    const p = new Uint8Array(256);
    for (let i = 0; i < 256; i++) p[i] = i;
    for (let i = 255; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      const t = p[i];
      p[i] = p[j];
      p[j] = t;
    }
    this.perm = new Uint8Array(512);
    for (let i = 0; i < 512; i++) this.perm[i] = p[i & 255];
    this.grad1 = new Float32Array(256);
    for (let i = 0; i < 256; i++) this.grad1[i] = rand() * 2 - 1;
  }
  /** Perlin 1D em ~[-0.5, 0.5]. */
  noise1(x) {
    const xi = Math.floor(x);
    const xf = x - xi;
    const g0 = this.grad1[this.perm[xi & 255]];
    const g1 = this.grad1[this.perm[xi + 1 & 255]];
    const u = fade(xf);
    return lerp(g0 * xf, g1 * (xf - 1), u);
  }
  /** Perlin 2D em ~[-1, 1]. */
  noise2(x, y) {
    const xi = Math.floor(x);
    const yi = Math.floor(y);
    const xf = x - xi;
    const yf = y - yi;
    const X = xi & 255;
    const Y = yi & 255;
    const p = this.perm;
    const aa = p[p[X] + Y];
    const ab = p[p[X] + Y + 1];
    const ba = p[p[X + 1] + Y];
    const bb = p[p[X + 1] + Y + 1];
    const u = fade(xf);
    const v = fade(yf);
    const x1 = lerp(grad2(aa, xf, yf), grad2(ba, xf - 1, yf), u);
    const x2 = lerp(grad2(ab, xf, yf - 1), grad2(bb, xf - 1, yf - 1), u);
    return lerp(x1, x2, v);
  }
  /** Ruído fractal (fBm) 1D normalizado para ~[-1, 1]. */
  fbm1(x, octaves = 4, lacunarity = 2, gain = 0.5) {
    let amp = 1, freq = 1, sum = 0, norm = 0;
    for (let i = 0; i < octaves; i++) {
      sum += this.noise1(x * freq) * 2 * amp;
      norm += amp;
      amp *= gain;
      freq *= lacunarity;
    }
    return sum / norm;
  }
  /** Ruído fractal (fBm) 2D normalizado para ~[-1, 1]. */
  fbm2(x, y, octaves = 4, lacunarity = 2, gain = 0.5) {
    let amp = 1, freq = 1, sum = 0, norm = 0;
    for (let i = 0; i < octaves; i++) {
      sum += this.noise2(x * freq, y * freq) * amp;
      norm += amp;
      amp *= gain;
      freq *= lacunarity;
    }
    return sum / norm;
  }
};
function fade(t) {
  return t * t * t * (t * (t * 6 - 15) + 10);
}
function lerp(a, b, t) {
  return a + (b - a) * t;
}
function grad2(hash, x, y) {
  switch (hash & 7) {
    case 0:
      return x + y;
    case 1:
      return -x + y;
    case 2:
      return x - y;
    case 3:
      return -x - y;
    case 4:
      return x;
    case 5:
      return -x;
    case 6:
      return y;
    default:
      return -y;
  }
}

// src/titan/ores.ts
function sampleTriangleY(rng, minY, maxY, peakY) {
  const u = rng(), c = (peakY - minY) / (maxY - minY);
  const v = u < c ? minY + Math.sqrt(u * (maxY - minY) * (peakY - minY)) : maxY - Math.sqrt((1 - u) * (maxY - minY) * (maxY - peakY));
  return Math.round(v);
}
function sampleOreY(rng, rule) {
  return rule.peakY === void 0 ? rule.minY + Math.floor(rng() * (rule.maxY - rule.minY + 1)) : sampleTriangleY(rng, rule.minY, rule.maxY, rule.peakY);
}
function veinCells(rng, x, y, z, rule, replaceable, exposed) {
  const out = [];
  const size = rule.veinSizeMax !== void 0 ? rule.veinSize + Math.floor(rng() * (rule.veinSizeMax - rule.veinSize + 1)) : rule.veinSize;
  for (let i = 0; i < size; i++) {
    if (replaceable(x, y, z) && !(exposed(x, y, z) && rng() < rule.airDiscardChance)) out.push([x, y, z]);
    const axis = Math.floor(rng() * 3), dir = rng() < 0.5 ? -1 : 1;
    if (axis === 0) x += dir;
    else if (axis === 1) y += dir;
    else z += dir;
  }
  return out;
}
var attemptsFor = (rng, perChunk) => Math.floor(perChunk) + (rng() < perChunk - Math.floor(perChunk) ? 1 : 0);

// src/titan/generator.ts
var GENERATOR_VERSION = 13;
function derive(seed, purpose) {
  return (Math.imul(hash2(seed >>> 0, purpose, 40503) * 4294967296 >>> 0, 1) ^ purpose * 2246822507) >>> 0;
}
var PURPOSE = { relevo: 1, dunas: 2, lago: 3, rocha: 4, gelo: 5, chegada: 6, formacao: 7, veios: 8, seixos: 9, veioSuperficie: 10, brasa: 11, junco: 12, noz: 13, cobre: 14, haste: 15, abrigo: 16, mina: 17, fragmentos: 18, ambar: 19 };
var ORE_RULES = [
  { blockId: T.VEIN_COPPER, veinsPerChunk: 3, veinSize: 6, minY: -48, maxY: 48, peakY: 8, airDiscardChance: 0.5 },
  { blockId: T.VEIN_ROCK, veinsPerChunk: 5, veinSize: 5, minY: -60, maxY: 56, airDiscardChance: 0.5 },
  { blockId: T.VEIN_FROST, veinsPerChunk: 3, veinSize: 5, minY: -44, maxY: 8, peakY: -24, airDiscardChance: 0 },
  // v11 (ADR 0073): veio de âmbar de 3 a 8 blocos, mais fundo que a rocha e o cobre (pico em Y −10)
  { blockId: T.EMBER_VEIN, veinsPerChunk: 2, veinSize: 3, veinSizeMax: 8, minY: -48, maxY: 30, peakY: -10, airDiscardChance: 0.3 }
];
var oreRulesFor = (version) => version >= 11 ? ORE_RULES : ORE_RULES.slice(0, 3);
var CLEARING = 6;
var clamp = (v, a, b) => Math.max(a, Math.min(b, v));
var TitanGenerator = class {
  constructor(seed, version = GENERATOR_VERSION) {
    this.seed = seed;
    this.version = version;
    this.region = regionFor(version);
    this.nDunas = new Noise(derive(seed, PURPOSE.dunas));
    this.nLago = new Noise(derive(seed, PURPOSE.lago));
    this.nRocha = new Noise(derive(seed, PURPOSE.rocha));
    this.nGelo = new Noise(derive(seed, PURPOSE.gelo));
    const theta = hash2(derive(seed, PURPOSE.lago), 1, 1) * Math.PI * 2;
    this.lake = { x: Math.round(Math.cos(theta) * 21), z: Math.round(Math.sin(theta) * 21), r: 17 };
    this.arrival = this.findArrival();
    const reach = version >= 3 ? this.walkableFromArrival() : null;
    this.formations = this.placeFormations(reach);
    this.surfaceItems = version >= 3 ? [] : this.placeSurfaceItems();
    if (version >= 7) this.placeCopper();
    if (version >= 8) this.placeShelters();
    if (version >= 3) this.placeVeins();
    if (version >= 4) {
      const site = this.planEmber()[0] ?? this.planEmber(false)[0] ?? null;
      this.emberSite = site ? { x: site.x, y: this.column(site.x, site.z).top, z: site.z } : null;
      this.emberSites = version >= 11 ? this.emberSitesFor(site) : this.emberSite ? [this.emberSite] : [];
      if (version >= 11) this.emberSite = this.emberSites[0] ?? null;
      for (const e of this.emberSites) this.emberKeys.add((e.x + 4096) * 8192 + (e.z + 4096));
      this.reeds = version >= 11 ? this.reedsForSites() : site ? this.reedsFor(site.x, site.z) : [];
    }
    if (version >= 5) {
      const n = this.nutsFor();
      this.nutPlants = n.plants;
      this.den = n.den;
    }
    if (version >= 7) this.dryReeds = this.dryReedsFor();
    if (version >= 11) this.placeAmberGuaranteed();
  }
  seed;
  world = "titan";
  version;
  nDunas;
  nLago;
  nRocha;
  nGelo;
  cols = /* @__PURE__ */ new Map();
  /** Veios subterrâneos (v9): célula → minério e prioridade (menor vence: o resultado não depende da ordem de carga). */
  ores = /* @__PURE__ */ new Map();
  oreReady = /* @__PURE__ */ new Set();
  oreDone = /* @__PURE__ */ new Set();
  /** Centro do lago (derivado da seed): a bacia fica de um lado da região. */
  lake;
  arrival;
  /** Formações de superfície reservadas (rocha e gelo recolhíveis na entrega 2), em área seca e alcançável. */
  formations;
  /** Fragmentos de superfície (lascas) sobre as formações: 3 de cada, com **id determinístico** (`rock:0`…), recolhidos à mão. Item 5 = rocha, 6 = gelo (`titan/items.ts`). */
  surfaceItems;
  /** v3: veios naturais (3 de rocha e 3 de gelo), por coluna (x, z); o voxel é o topo da coluna. Vazio na v1 e na v2. */
  veins = /* @__PURE__ */ new Map();
  /** v7: colunas (chave x/z) cujo topo é veio de cobre. */
  copper = /* @__PURE__ */ new Set();
  /** v4: o depósito de brasa (célula do topo da coluna, `blockAt` devolve `T.EMBER` ali) e os juncos de vidro (decoração sem colisão, célula de ar sobre areia úmida). Nulo/vazio antes da v4. */
  emberSite = null;
  /** v11 (ADR 0073): os 4 depósitos de brasa acessíveis a pé (o primeiro é `emberSite`). Antes da v11 só há o primeiro; antes da v4, nenhum. */
  emberSites = [];
  /** v11: células do veio de âmbar garantido perto da chegada (a menos de 20 blocos, sob a superfície; alcançável cavando). */
  amberGuaranteed = [];
  amberKeys = /* @__PURE__ */ new Map();
  emberKeys = /* @__PURE__ */ new Set();
  reeds = [];
  /** v5: plantas de Noz de Duna (célula de ar sobre areia, seca ou úmida — hoje ~86 % em seca —, sem colisão como o junco). Vazio antes da v5. */
  nutPlants = [];
  /** v7: afloramentos de rocha com veios de cobre (ADR 0063): montes como as formações, longe da toca; os veios (3 por afloramento) ficam no topo. */
  /** Só `placeCopper` (no construtor) escreve; nunca mude depois. */
  copperSites = [];
  copperCells = [];
  /** v8: abrigos (ADR 0066): centro do vão, os dois pilares de rocha (montes estreitos) e a placa de carapaça no chão entre eles. */
  shelterSites = [];
  plates = [];
  pillars = [];
  /** v7: hastes secas de junco, no chão perto dos juncos (id `dry:x,y,z`, item 19), recolhidas à mão (ADR 0063). */
  dryReeds = [];
  /** v5: a toca do Farejador de Duna (ADR 0061), no centro da enseada de plantas; null se a região não teve enseada. */
  den = null;
  reachMemo = null;
  /** A coluna (x, z) está dentro da região jogável desta versão? */
  inRegion(x, z) {
    return inRegion(x, z, this.region);
  }
  /** v3: a busca natural não achou as duas formações e o afloramento de reserva entrou (diagnóstico e testes). */
  outcropFallback = false;
  /** Região jogável desta versão (v1–v5: 64 × 64; v6: 128 × 128). */
  region;
  // ---- v4: brasa de âmbar e junco de vidro ----
  /** Colunas alcançáveis a pé (memoizado; o mesmo cálculo da v3, para qualquer versão). */
  walkable() {
    return this.reachMemo ??= this.walkableFromArrival();
  }
  /**
   * Candidatos ao depósito de brasa, em ordem fixa por seed: coluna de **areia úmida** alcançável a pé, perto da chegada, fora da clareira e das formações, com os 4 vizinhos também
   * alcançáveis (a brasa fica acessível por qualquer lado). Serve a v4 (usa o primeiro) e a migração de partidas antigas (usa o primeiro que ainda estiver intacto).
   */
  planEmber(strict = true) {
    const a = this.arrival, base = derive(this.seed, PURPOSE.brasa), reach = this.walkable();
    const key = (x, z) => (x + 4096) * 8192 + (z + 4096);
    const out = [];
    for (const k of reach) {
      const x = Math.floor(k / 8192) - 4096, z = k % 8192 - 4096;
      if (x < this.region.min + 4 || x >= this.region.max - 4 || z < this.region.min + 4 || z >= this.region.max - 4) continue;
      if (Math.hypot(x - a.x, z - a.z) > 30 || this.inClearing(x, z, 3)) continue;
      const c = this.column(x, z);
      if (strict && (c.surface !== T.DAMP_SAND || c.top < 63 || c.top > 65)) continue;
      if (c.surface !== T.DAMP_SAND && c.surface !== T.SAND) continue;
      if (this.formations.some((f) => Math.hypot(f.x - x, f.z - z) < 5)) continue;
      if (![[1, 0], [-1, 0], [0, 1], [0, -1]].every(([dx, dz]) => reach.has(key(x + dx, z + dz)))) continue;
      out.push({ x, z, h: hash2(base, x * 131 + z, 3) });
    }
    out.sort((p, q) => p.h - q.h || p.x - q.x || p.z - q.z);
    return out.map(({ x, z }) => ({ x, z }));
  }
  /**
   * v11 (ADR 0073): até 4 depósitos acessíveis a pé nos 4 × 4 chunks iniciais (|x|, |z| ≤ 30), afastados ≥ 12 entre si. O primeiro é o da v4 (`first`); os outros, na ordem fixa de `planEmber`
   * (areia úmida rasa primeiro, depois qualquer coluna livre), sem repetir a região da planta de noz (que sai depois e já se afasta dos depósitos).
   */
  emberSitesFor(first) {
    const out = [];
    const take = (c, apart) => {
      if (out.length >= 4 || out.some((o) => Math.hypot(o.x - c.x, o.z - c.z) < apart)) return;
      out.push({ x: c.x, y: this.column(c.x, c.z).top, z: c.z });
    };
    const inStart = (c) => Math.abs(c.x) <= 30 && Math.abs(c.z) <= 30;
    if (first && inStart(first)) take(first, 0);
    for (const apart of [12, 8, 5]) for (const c of [...this.planEmber(), ...this.planEmber(false)]) if (inStart(c)) take(c, apart);
    return out;
  }
  /** Juncos de todos os depósitos (v11): a união dos grupos, sem repetir célula e sem tocar nos 8 vizinhos de nenhum depósito. */
  reedsForSites() {
    const seen = /* @__PURE__ */ new Set(), out = [];
    for (const e of this.emberSites) for (const r of this.reedsFor(e.x, e.z)) {
      const k = (r.x + 4096) * 8192 + (r.z + 4096);
      if (seen.has(k) || this.emberSites.some((o) => Math.abs(r.x - o.x) <= 1 && Math.abs(r.z - o.z) <= 1)) continue;
      seen.add(k);
      out.push(r);
    }
    const reach = this.walkable(), base = derive(this.seed, PURPOSE.junco);
    for (const e of this.emberSites) {
      if (out.some((r) => Math.hypot(r.x - e.x, r.z - e.z) <= 5)) continue;
      const ring = [];
      for (let dz = -3; dz <= 3; dz++) for (let dx = -3; dx <= 3; dx++) {
        const x = e.x + dx, z = e.z + dz, k = (x + 4096) * 8192 + (z + 4096), c = Math.max(Math.abs(dx), Math.abs(dz));
        if (c < 2 || seen.has(k) || !reach.has(k) || !this.inRegion(x, z)) continue;
        const col = this.column(x, z);
        if (col.surface !== T.SAND && col.surface !== T.DAMP_SAND || this.emberKeys.has(k) || this.copper.has(k)) continue;
        ring.push({ x, z, h: hash2(base, x * 131 + z, 9) });
      }
      ring.sort((p, q) => p.h - q.h || p.x - q.x || p.z - q.z);
      for (const c of ring.slice(0, 3)) {
        seen.add((c.x + 4096) * 8192 + (c.z + 4096));
        out.push({ x: c.x, y: this.column(c.x, c.z).top + 1, z: c.z });
      }
    }
    return out;
  }
  /**
   * Veio de âmbar garantido (v11, ADR 0073): o Titã ainda não tem cavernas, então a "primeira caverna acessível" é um veio de 5 a 8 blocos entre 6 e 20 blocos da chegada, 6 a 9 blocos sob a superfície
   * (alcançável cavando). Escolhe, em ordem fixa por seed, a primeira coluna que dá pelo menos 4 células de rocha profunda.
   */
  placeAmberGuaranteed() {
    const a = this.arrival, base = derive(this.seed, PURPOSE.ambar), cands = [];
    for (let dz = -20; dz <= 20; dz++) for (let dx = -20; dx <= 20; dx++) {
      const x = Math.floor(a.x) + dx, z = Math.floor(a.z) + dz, d = Math.hypot(dx, dz);
      if (d < 6 || d > 20 || !this.inRegion(x, z) || this.inClearing(x, z, 2)) continue;
      cands.push({ x, z, h: hash2(base, x * 131 + z, 1) });
    }
    cands.sort((p, q) => p.h - q.h || p.x - q.x || p.z - q.z);
    const replaceable = (x, y, z) => y > Y_MIN && this.inRegion(x, z) && y < this.column(x, z).top - 3;
    for (const c of cands) {
      const top = this.column(c.x, c.z).top, rng = mulberry32((base ^ Math.imul(c.x * 131 + c.z + 1, 2654435761)) >>> 0);
      const cells = veinCells(rng, c.x, top - 6 - Math.floor(rng() * 4), c.z, { blockId: T.EMBER_VEIN, veinsPerChunk: 1, veinSize: 8, minY: 0, maxY: 0, airDiscardChance: 0 }, replaceable, () => false);
      const uniq = [...new Map(cells.map(([x, y, z]) => [`${x},${y},${z}`, { x, y, z }])).values()];
      if (uniq.length < 4) continue;
      this.amberGuaranteed = uniq;
      for (const u of uniq) this.amberKeys.set(((u.x + 4096) * 8192 + (u.z + 4096)) * 512 + (u.y + 64), true);
      return;
    }
  }
  /** Grupos de junco de vidro: um em volta do depósito (sem os 8 vizinhos, para a passagem e a brasa ficarem livres) e outro afastado, só em areia úmida alcançável. Puro por seed e posição. */
  reedsFor(ex, ez) {
    const reach = this.walkable(), base = derive(this.seed, PURPOSE.junco);
    const key = (x, z) => (x + 4096) * 8192 + (z + 4096);
    const centers = [{ x: ex, z: ez }];
    const far = this.planEmber().find((c) => Math.hypot(c.x - ex, c.z - ez) >= 9);
    if (far) centers.push(far);
    const seen = /* @__PURE__ */ new Set(), out = [];
    for (const c of centers) {
      for (let dz = -3; dz <= 3; dz++) for (let dx = -3; dx <= 3; dx++) {
        const x = c.x + dx, z = c.z + dz, k = key(x, z);
        if (seen.has(k) || Math.abs(x - ex) <= 1 && Math.abs(z - ez) <= 1 || !reach.has(k) || !this.inRegion(x, z)) continue;
        const col = this.column(x, z);
        if (col.surface !== T.DAMP_SAND || col.top < 63 || col.top > 65) continue;
        if (hash2(base, x * 131 + z, 5) > 0.5) continue;
        seen.add(k);
        out.push({ x, y: col.top + 1, z });
      }
    }
    return out;
  }
  /**
   * Plantas de Noz de Duna (v5): candidatas = coluna de areia, **seca ou úmida** (topo 64–66, fora d'água) alcançável a pé com os 4 vizinhos também alcançáveis, fora da clareira (3), das formações (4),
   * da brasa (2) e dos juncos. Em ordem de hash por seed: até 2 plantas "seguras" entre 7 e 16 blocos da chegada (afastadas entre si ≥ 3) e uma enseada de até 4 plantas (afastadas ≥ 2, no raio
   * de 4 do centro) a 26 blocos ou mais da chegada (18 se a região não tiver lugar mais longe). Puro por seed.
   */
  nutsFor() {
    const a = this.arrival, reach = this.walkable(), base = derive(this.seed, PURPOSE.noz);
    const key = (x, z) => (x + 4096) * 8192 + (z + 4096);
    const reeds = new Set(this.reeds.map((r) => key(r.x, r.z)));
    const cands = [];
    for (const k of reach) {
      const x = Math.floor(k / 8192) - 4096, z = k % 8192 - 4096;
      if (x < this.region.min + 4 || x >= this.region.max - 4 || z < this.region.min + 4 || z >= this.region.max - 4) continue;
      if (this.inClearing(x, z, 3) || reeds.has(key(x, z))) continue;
      const c = this.column(x, z);
      if (c.surface !== T.SAND && c.surface !== T.DAMP_SAND || c.top < 64 || c.top > 66) continue;
      if (this.version >= 12 && c.surface !== T.SAND) continue;
      if (this.formations.some((f) => Math.hypot(f.x - x, f.z - z) < 4)) continue;
      if (this.emberSites.some((e) => Math.hypot(e.x - x, e.z - z) < 3)) continue;
      if (this.copperSites.some((s) => Math.hypot(s.x - x, s.z - z) < 6) || this.shelterSites.some((s) => Math.hypot(s.x - x, s.z - z) < 6)) continue;
      if (![[1, 0], [-1, 0], [0, 1], [0, -1]].every(([dx, dz]) => reach.has(key(x + dx, z + dz)))) continue;
      cands.push({ x, z, top: c.top, h: hash2(base, x * 131 + z, 7), d: Math.hypot(x - a.x, z - a.z) });
    }
    cands.sort((p, q) => p.h - q.h || p.x - q.x || p.z - q.z);
    const out = [];
    const take = (c, spacing) => {
      if (out.some((o) => Math.hypot(o.x - c.x, o.z - c.z) < spacing)) return false;
      out.push({ x: c.x, y: c.top + 1, z: c.z });
      return true;
    };
    let near = 0;
    for (const c of cands) {
      if (near >= 2) break;
      if (c.d >= 7 && c.d <= 16 && take(c, 3)) near++;
    }
    const apart = (c) => this.copperSites.every((s) => Math.hypot(s.x - c.x, s.z - c.z) >= 28) && this.shelterSites.every((s) => Math.hypot(s.x - c.x, s.z - c.z) >= 24);
    const far = cands.find((c) => c.d >= 26 && apart(c)) ?? cands.find((c) => c.d >= 18 && apart(c)) ?? cands.find((c) => c.d >= 26) ?? cands.find((c) => c.d >= 18);
    let den = null;
    if (far) {
      den = { x: far.x, y: far.top + 1, z: far.z };
      let n = 0;
      for (const c of cands) {
        if (n >= 4) break;
        if (Math.hypot(c.x - far.x, c.z - far.z) <= 4 && take(c, 2)) n++;
      }
    }
    if (this.version >= 12) {
      const b = biomeAt(a.x, a.z), target = Math.round(b.nutRate * cands.length);
      for (const c of cands) {
        if (out.length >= target) break;
        if (c.d < 18 || this.copperSites.some((s) => Math.hypot(s.x - c.x, s.z - c.z) < 22) || this.shelterSites.some((s) => Math.hypot(s.x - c.x, s.z - c.z) < 18)) continue;
        take(c, b.nutSpacing);
      }
    }
    return { plants: out, den };
  }
  // ---- v3: alcance a pé e veios ----
  /** Topo da coluna sem formações (relevo bruto com a clareira nivelada). Usado só para o alcance a pé. */
  baseTop(x, z) {
    const raw = this.rawTop(x, z);
    if (this.inClearing(x, z)) return 64;
    if (this.inClearing(x, z, 2)) return clamp(raw, 63, 65);
    return raw;
  }
  /** Colunas alcançáveis a pé desde a chegada: vizinhas por degraus de até 1 bloco, fora d'água funda (topo ≥ 63) e dentro da região. */
  walkableFromArrival() {
    const key = (x, z) => (x + 4096) * 8192 + (z + 4096);
    const seen = /* @__PURE__ */ new Set();
    const a = this.arrival;
    const queue = [[Math.floor(a.x), Math.floor(a.z)]];
    seen.add(key(queue[0][0], queue[0][1]));
    for (let i = 0; i < queue.length; i++) {
      const [x, z] = queue[i];
      const t = this.baseTop(x, z);
      for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nx = x + dx, nz = z + dz;
        if (nx < this.region.min + 1 || nx >= this.region.max - 1 || nz < this.region.min + 1 || nz >= this.region.max - 1) continue;
        const k = key(nx, nz);
        if (seen.has(k)) continue;
        const nt = this.baseTop(nx, nz);
        if (nt < 63 || Math.abs(nt - t) > 1) continue;
        seen.add(k);
        queue.push([nx, nz]);
      }
    }
    return seen;
  }
  /** Afloramento de reserva: a célula alcançável mais perto da chegada, seca, baixa e livre de outras formações (varredura em ordem fixa). */
  outcropSpot(reach, others, strict) {
    const a = this.arrival;
    const cells = [];
    for (const k of reach) {
      const x = Math.floor(k / 8192) - 4096, z = k % 8192 - 4096;
      cells.push({ x, z, d: Math.hypot(x - a.x, z - a.z) });
    }
    cells.sort((p, q) => p.d - q.d || p.x - q.x || p.z - q.z);
    for (const c of cells) {
      if (this.inClearing(c.x, c.z, strict ? 4 : 3)) continue;
      if (c.x < this.region.min + 4 || c.x >= this.region.max - 4 || c.z < this.region.min + 4 || c.z >= this.region.max - 4) continue;
      if (strict && (this.lakeField(c.x, c.z) > -3 || this.rawTop(c.x, c.z) > 68)) continue;
      if (others.some((o) => Math.hypot(o.x - c.x, o.z - c.z) < (strict ? 8 : 6))) continue;
      return { x: c.x, z: c.z };
    }
    return null;
  }
  /** 3 veios por formação: o centro e os dois vizinhos de menor sorteio, no topo da coluna (superfície de rocha escura ou gelo fosco). */
  placeVeins() {
    const base = derive(this.seed, PURPOSE.veioSuperficie);
    const key = (x, z) => (x + 4096) * 8192 + (z + 4096);
    for (const f of this.formations) {
      const want = f.kind === "rock" ? T.DARK_ROCK : T.FROST;
      const ring = [];
      for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) {
        if (!dx && !dz) continue;
        const x = f.x + dx, z = f.z + dz;
        if (this.column(x, z).surface === want) ring.push({ x, z, h: hash2(base, x * 131 + z, f.kind === "rock" ? 1 : 2) });
      }
      ring.sort((p, q) => p.h - q.h || p.x - q.x || p.z - q.z);
      this.veins.set(key(f.x, f.z), f.kind);
      for (const c of ring.slice(0, 2)) this.veins.set(key(c.x, c.z), f.kind);
    }
  }
  /** Posições (x, y, z) dos veios naturais (v3), com o tipo. Vazio nas versões anteriores. */
  veinCells() {
    const out = [];
    for (const [k, kind] of this.veins) {
      const x = Math.floor(k / 8192) - 4096, z = k % 8192 - 4096;
      out.push({ kind, x, y: this.column(x, z).top, z });
    }
    return out;
  }
  /**
   * Afloramentos de cobre (v7, ADR 0063): 2 montes de rocha escura em terra seca alcançável a pé (18–55 blocos da chegada, ≥ 10 da costa, relevo plano em volta, longe das formações),
   * afastados ≥ 20 entre si; cada um com 3 veios de cobre no topo (centro + 2 vizinhas). Ordem de hash por seed; usa só o relevo bruto (as colunas ainda não foram memoizadas).
   */
  placeCopper() {
    const a = this.arrival, base = derive(this.seed, PURPOSE.cobre), reach = this.walkable();
    const cands = [];
    for (const k of reach) {
      const x = Math.floor(k / 8192) - 4096, z = k % 8192 - 4096;
      if (x < this.region.min + 8 || x >= this.region.max - 8 || z < this.region.min + 8 || z >= this.region.max - 8) continue;
      const d = Math.hypot(x - a.x, z - a.z), t = this.rawTop(x, z);
      if (d < 18 || d > 55 || this.lakeField(x, z) > -10 || t < 64 || t > 72) continue;
      if (this.formations.some((f) => Math.hypot(f.x - x, f.z - z) < 8) || !this.flatAround(x, z)) continue;
      cands.push({ x, z, h: hash2(base, x * 131 + z, 3) });
    }
    cands.sort((p, q) => p.h - q.h || p.x - q.x || p.z - q.z);
    const sites = [];
    for (const c of cands) {
      if (sites.length >= 2) break;
      if (sites.every((s) => Math.hypot(s.x - c.x, s.z - c.z) >= 20)) sites.push({ x: c.x, z: c.z });
    }
    this.copperSites = sites;
    this.cols.clear();
    const cells = [];
    const key = (x, z) => (x + 4096) * 8192 + (z + 4096);
    for (const s of sites) {
      const ring = [];
      for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) if (dx || dz) ring.push({ x: s.x + dx, z: s.z + dz, h: hash2(base, (s.x + dx) * 131 + s.z + dz, 9) });
      ring.sort((p, q) => p.h - q.h || p.x - q.x || p.z - q.z);
      for (const c of [{ x: s.x, z: s.z }, ...ring.slice(0, 2)]) {
        this.copper.add(key(c.x, c.z));
        cells.push({ x: c.x, y: this.column(c.x, c.z).top, z: c.z });
      }
    }
    this.copperCells = cells;
  }
  /**
   * Abrigos (v8, ADR 0066): 2 vãos estreitos entre dois pilares de rocha escura (a ±2 blocos do centro, ao longo de X), em terra seca alcançável a pé, 16–55 blocos da chegada, ≥ 10 da costa, em relevo plano,
   * afastados ≥ 14 dos afloramentos de cobre e ≥ 20 entre si; uma **placa de carapaça** no chão do vão. Usa só o relevo bruto (as colunas ainda não foram memoizadas) e roda logo depois do cobre.
   */
  placeShelters() {
    const a = this.arrival, base = derive(this.seed, PURPOSE.abrigo), reach = this.walkable();
    const cands = [];
    for (const k of reach) {
      const x = Math.floor(k / 8192) - 4096, z = k % 8192 - 4096;
      if (x < this.region.min + 8 || x >= this.region.max - 8 || z < this.region.min + 8 || z >= this.region.max - 8) continue;
      const d = Math.hypot(x - a.x, z - a.z), t = this.rawTop(x, z);
      if (d < 16 || d > 55 || this.lakeField(x, z) > -10 || t < 64 || t > 70) continue;
      if (this.formations.some((f) => Math.hypot(f.x - x, f.z - z) < 8) || this.copperSites.some((c) => Math.hypot(c.x - x, c.z - z) < 14) || !this.flatAround(x, z)) continue;
      cands.push({ x, z, h: hash2(base, x * 131 + z, 3) });
    }
    cands.sort((p, q) => p.h - q.h || p.x - q.x || p.z - q.z);
    const sites = [];
    for (const c of cands) {
      if (sites.length >= 2) break;
      if (sites.every((s) => Math.hypot(s.x - c.x, s.z - c.z) >= 20)) sites.push({ x: c.x, z: c.z });
    }
    this.shelterSites = sites;
    this.pillars = sites.flatMap((s) => [{ x: s.x - 2, z: s.z }, { x: s.x + 2, z: s.z }]);
    this.cols.clear();
    this.plates = sites.map((s) => ({ id: `plate:${s.x},${this.column(s.x, s.z).top + 1},${s.z}`, item: 25, x: s.x, y: this.column(s.x, s.z).top + 1, z: s.z }));
  }
  /** Hastes secas (v7): até 8 em colunas de areia perto dos grupos de junco (≤ 7 blocos de um junco), fora das células de junco e de planta, alcançáveis a pé, afastadas ≥ 2 entre si. */
  dryReedsFor() {
    const reach = this.walkable(), base = derive(this.seed, PURPOSE.haste);
    const key = (x, z) => (x + 4096) * 8192 + (z + 4096);
    const taken = new Set([...this.reeds, ...this.nutPlants].map((r) => key(r.x, r.z)));
    const cands = [];
    const seen = /* @__PURE__ */ new Set();
    for (const r of this.reeds) for (let dz = -7; dz <= 7; dz++) for (let dx = -7; dx <= 7; dx++) {
      const x = r.x + dx, z = r.z + dz, k = key(x, z);
      if (seen.has(k) || taken.has(k) || !reach.has(k) || !this.inRegion(x, z)) continue;
      seen.add(k);
      const c = this.column(x, z);
      if (c.surface !== T.SAND && c.surface !== T.DAMP_SAND || c.top < 63 || c.top > 66) continue;
      if (this.copper.has(k) || this.emberKeys.has(k)) continue;
      cands.push({ x, z, top: c.top, h: hash2(base, x * 131 + z, 5) });
    }
    cands.sort((p, q) => p.h - q.h || p.x - q.x || p.z - q.z);
    const out = [];
    for (const c of cands) {
      if (out.length >= 8) break;
      if (out.some((o) => Math.hypot(o.x - c.x, o.z - c.z) < 2)) continue;
      out.push({ id: `dry:${c.x},${c.top + 1},${c.z}`, item: 19, x: c.x, y: c.top + 1, z: c.z });
    }
    if (this.version < 13) return out;
    const a = this.arrival;
    return out.sort((p, q) => Math.hypot(p.x - a.x, p.z - a.z) - Math.hypot(q.x - a.x, q.z - a.z) || p.x - q.x || p.z - q.z).slice(0, 2);
  }
  // ---- Campos 2D (relevo bruto; ignoram clareira e formações) ----
  /** Campo do lago: > 0 dentro da bacia; ≈ distância (em blocos) da margem. */
  lakeField(x, z) {
    const warp = 1 + 0.28 * this.nLago.noise2(x / 13 + 7.3, z / 13 + 1.9) + 0.1 * this.nLago.noise2(x / 5 + 3.1, z / 5 + 8.7);
    const dx = x - this.lake.x;
    const dz = z - this.lake.z;
    return this.lake.r - Math.hypot(dx, dz) * warp;
  }
  /** Altura do voxel sólido mais alto no relevo bruto (sem clareira nem formações). */
  rawTop(x, z) {
    const s = -this.lakeField(x, z);
    if (s < 0) {
      const d = -s;
      if (d < 1) return LAKE_LAST_Y - 0;
      return LAKE_LAST_Y - 1 - Math.min(9, Math.floor((d - 1) * 0.9));
    }
    const dunes = Math.max(0, this.nDunas.noise2(x / 9 + 2.2, z / 9 + 5.4)) * 2.6;
    if (this.version >= 6) {
      const gentle = Math.min(6, Math.max(0, s - 3) * 0.16), slope = s > 24 ? Math.min(14, Math.floor((s - 24) * 0.22)) : 0;
      return 64 + Math.floor(gentle + dunes) + slope;
    }
    const rise = Math.max(0, s - 3) * 0.16;
    const scarp = s > 24 ? 5 + Math.floor((s - 24) * 0.45) : 0;
    return 64 + Math.floor(rise + dunes) + scarp;
  }
  // ---- Chegada ----
  /** Raspa de rugosidade da caixa da clareira no relevo bruto; Infinity = não serve (lago, fora da região ou desnivelada demais). */
  clearingScore(x0, z0) {
    if (x0 - 2 < this.region.min + 2 || z0 - 2 < this.region.min + 2 || x0 + CLEARING + 2 > this.region.max - 2 || z0 + CLEARING + 2 > this.region.max - 2) return Infinity;
    let rough = 0;
    for (let dx = -2; dx < CLEARING + 2; dx++) for (let dz = -2; dz < CLEARING + 2; dz++) {
      const x = x0 + dx, z = z0 + dz;
      if (this.lakeField(x, z) > -2) return Infinity;
      const t = this.rawTop(x, z);
      if (t < 63 || t > 66) return Infinity;
      rough += Math.abs(t - 64);
    }
    const cx = x0 + CLEARING / 2, cz = z0 + CLEARING / 2;
    const shore = -this.lakeField(cx, cz);
    if (shore < 3 || shore > 14) return Infinity;
    return rough;
  }
  findArrival() {
    const base = derive(this.seed, PURPOSE.chegada);
    let best = null;
    for (let k = 0; k < 600 && !best; k++) {
      const x0 = Math.floor(hash2(base, k, 11) * (this.region.max - this.region.min - 16)) + this.region.min + 8;
      const z0 = Math.floor(hash2(base, k, 23) * (this.region.max - this.region.min - 16)) + this.region.min + 8;
      if (this.clearingScore(x0, z0) <= 14) best = { x0, z0 };
    }
    if (!best) {
      let bestScore = Infinity;
      for (let z0 = this.region.min; z0 < this.region.max; z0++) for (let x0 = this.region.min; x0 < this.region.max; x0++) {
        const sc = this.clearingScore(x0, z0);
        if (sc < bestScore) {
          bestScore = sc;
          best = { x0, z0 };
        }
      }
    }
    if (!best) best = { x0: -3, z0: -3 };
    const cx = best.x0 + CLEARING / 2, cz = best.z0 + CLEARING / 2;
    const yaw = Math.atan2(-(this.lake.x - cx), -(this.lake.z - cz));
    return { x: cx, y: 65, z: cz, yaw, clearing: { x0: best.x0, z0: best.z0, size: CLEARING } };
  }
  inClearing(x, z, pad = 0) {
    const c = this.arrival.clearing;
    return x >= c.x0 - pad && x < c.x0 + c.size + pad && z >= c.z0 - pad && z < c.z0 + c.size + pad;
  }
  placeFormations(reach) {
    const out = [];
    const base = derive(this.seed, PURPOSE.formacao);
    const v1 = this.version < 2;
    const a = this.arrival;
    for (const [i, kind] of ["rock", "ice"].entries()) {
      const phi0 = hash2(base, i, 5) * Math.PI * 2;
      let found = false;
      for (let k = 0; k < (v1 ? 48 : 240); k++) {
        const phi = phi0 + k * 2.399963;
        const dist2 = v1 ? 9 + k % 4 * 2 : 8 + k % 6 * 2;
        const x = Math.round(a.x + Math.cos(phi) * dist2);
        const z = Math.round(a.z + Math.sin(phi) * dist2);
        const m = v1 ? 6 : 5;
        if (x < this.region.min + m || x >= this.region.max - m || z < this.region.min + m || z >= this.region.max - m) continue;
        if (this.lakeField(x, z) > -4) continue;
        if (this.rawTop(x, z) > 68) continue;
        if (!v1 && !this.flatAround(x, z)) continue;
        if (reach && !reach.has((x + 4096) * 8192 + (z + 4096))) continue;
        if (out.some((o) => Math.hypot(o.x - x, o.z - z) < 8)) continue;
        out.push({ kind, x, z });
        found = true;
        break;
      }
      if (!found && reach) {
        const spot = this.outcropSpot(reach, out, true) ?? this.outcropSpot(reach, out, false);
        if (spot) {
          out.push({ kind, x: spot.x, z: spot.z });
          this.outcropFallback = true;
        }
      }
    }
    return out;
  }
  /** Raio 3 seco e com diferença de altura ≤ 1 bloco em relação ao centro. */
  flatAround(x, z) {
    const t = this.rawTop(x, z);
    for (let dz = -3; dz <= 3; dz++) for (let dx = -3; dx <= 3; dx++) {
      if (this.lakeField(x + dx, z + dz) > -3 || Math.abs(this.rawTop(x + dx, z + dz) - t) > 1) return false;
    }
    return true;
  }
  placeSurfaceItems() {
    const out = [];
    const base = derive(this.seed, PURPOSE.seixos);
    for (const f of this.formations) {
      const want = f.kind === "rock" ? T.DARK_ROCK : T.FROST;
      const cells = [];
      for (let dz = -2; dz <= 2; dz++) for (let dx = -2; dx <= 2; dx++) {
        const x = f.x + dx, z = f.z + dz;
        if (this.column(x, z).surface === want) cells.push({ x, z, h: hash2(base, x * 131 + z, f.kind === "rock" ? 1 : 2) });
      }
      cells.sort((a, b) => a.h - b.h || a.x - b.x || a.z - b.z);
      cells.slice(0, 3).forEach((c, i) => out.push({ id: `${f.kind}:${i}`, item: f.kind === "rock" ? 5 : 6, x: c.x, y: this.column(c.x, c.z).top + 1, z: c.z }));
    }
    return out;
  }
  // ---- Colunas e voxels ----
  /** Coluna em (x, z): memoizada (as consultas de voxel e de malha repetem muito a mesma coluna). */
  column(x, z) {
    const key = (x + 4096) * 8192 + (z + 4096);
    const hit = this.cols.get(key);
    if (hit) return hit;
    const col = this.computeColumn(x, z);
    this.cols.set(key, col);
    return col;
  }
  computeColumn(x, z) {
    const raw = this.rawTop(x, z);
    const s = -this.lakeField(x, z);
    let top = raw;
    if (this.inClearing(x, z)) top = 64;
    else if (this.inClearing(x, z, 2)) top = clamp(raw, 63, 65);
    let formation = null;
    for (const f of this.formations) {
      const d = Math.hypot(x - f.x, z - f.z);
      if (d < 3.2) {
        const bump = Math.max(0, 3 - Math.floor(d));
        if (bump > 0) {
          top = Math.max(top, raw + bump);
          formation = f.kind;
        }
      }
    }
    for (const f of this.pillars) {
      const d = Math.hypot(x - f.x, z - f.z);
      if (d < 1.6) {
        top = Math.max(top, raw + 3 - Math.floor(d));
        formation = "rock";
      }
    }
    for (const f of this.copperSites) {
      const d = Math.hypot(x - f.x, z - f.z);
      if (d < 3.2) {
        const bump = Math.max(0, 3 - Math.floor(d));
        if (bump > 0) {
          top = Math.max(top, raw + bump);
          formation = "rock";
        }
      }
    }
    let surface = T.SAND;
    if (formation === "rock") surface = T.DARK_ROCK;
    else if (formation === "ice") surface = T.FROST;
    else if (s < 4 && top <= 65) surface = T.DAMP_SAND;
    else if (top >= 84 || s > 6 && this.nRocha.noise2(x / 6 + 0.5, z / 6 + 9.5) > 0.38) surface = T.DARK_ROCK;
    else if (s > 10 && this.nGelo.noise2(x / 5 + 4.5, z / 5 + 1.5) > 0.42) surface = T.FROST;
    if (this.inClearing(x, z)) surface = T.SAND;
    const sub = surface === T.DARK_ROCK || surface === T.FROST ? T.DARK_ROCK : surface === T.DAMP_SAND ? T.DAMP_SAND : T.SAND;
    return { top, surface, sub };
  }
  /** Voxel da base (sem edições) em coordenadas globais. */
  blockAt(x, y, z) {
    if (y <= Y_MIN) return T.BEDROCK;
    const c = this.column(x, z);
    if (y > c.top) return y <= LAKE_LAST_Y ? T.LAKE : T.AIR;
    if (y === c.top) {
      if (this.emberKeys.has((x + 4096) * 8192 + (z + 4096))) return T.EMBER;
      if (this.copper.size && this.copper.has((x + 4096) * 8192 + (z + 4096))) return T.VEIN_COPPER;
      if (this.veins.size) {
        const v = this.veins.get((x + 4096) * 8192 + (z + 4096));
        if (v) return v === "rock" ? T.VEIN_ROCK : T.VEIN_FROST;
      }
      if (this.version >= 10) {
        const f = this.fragmentAt(x, z, c);
        if (f) return f;
      }
      return c.surface;
    }
    if (y >= c.top - 3) return c.sub;
    if (this.version >= 9) {
      const o = this.oreAt(x, y, z);
      return o ?? T.DARK_ROCK;
    }
    if (y >= -32 && y < 0 && hash2(derive(this.seed, PURPOSE.veios), x * 31 + z, y) < 0.012) return T.FROST;
    return T.DARK_ROCK;
  }
  /** Veio de fragmento solto na superfície (v10): rocha na rocha escura (12 % nas camadas altas, Y ≥ 72; 6 % abaixo) e gelo nas manchas de gelo (6 %); nunca perto das formações, abrigos e afloramentos de cobre, que têm o seu desenho. */
  fragmentAt(x, z, c) {
    if (c.surface !== T.DARK_ROCK && c.surface !== T.FROST) return null;
    const near = (l) => l.some((f) => Math.hypot(f.x - x, f.z - z) < 5);
    if (near(this.formations) || near(this.copperSites) || near(this.shelterSites) || near(this.pillars)) return null;
    const rock = c.surface === T.DARK_ROCK, chance = rock ? c.top >= 72 ? 0.12 : 0.06 : 0.06;
    return hash2(derive(this.seed, PURPOSE.fragmentos), x, z) < chance ? rock ? T.VEIN_ROCK : T.VEIN_FROST : null;
  }
  /** Minério da célula (v9), ou `null`. Garante que os 3 × 3 chunks em volta já foram gerados, porque um veio passa de um chunk para o vizinho. */
  oreAt(x, y, z) {
    const cx = x >> 4, cz = z >> 4, rk = (cx + 512) * 1024 + (cz + 512);
    if (!this.oreReady.has(rk)) {
      for (let dx = -1; dx <= 1; dx++) for (let dz = -1; dz <= 1; dz++) this.genOreChunk(cx + dx, cz + dz);
      this.oreReady.add(rk);
    }
    const k = ((x + 4096) * 8192 + (z + 4096)) * 512 + (y + 64);
    if (this.amberKeys.has(k)) return T.EMBER_VEIN;
    return this.ores.get(k)?.id ?? null;
  }
  genOreChunk(cx, cz) {
    const ck = (cx + 512) * 1024 + (cz + 512);
    if (this.oreDone.has(ck)) return;
    this.oreDone.add(ck);
    if (!inRegion(cx * 16 + 8, cz * 16 + 8, this.region) && !inRegion(cx * 16, cz * 16, this.region) && !inRegion(cx * 16 + 15, cz * 16 + 15, this.region)) return;
    const replaceable = (x, y, z) => y > Y_MIN && inRegion(x, z, this.region) && y < this.column(x, z).top - 3;
    const exposed = (x, y, z) => [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]].some(([dx, dy, dz]) => y + dy > this.column(x + dx, z + dz).top && y + dy > LAKE_LAST_Y);
    oreRulesFor(this.version).forEach((rule, ri) => {
      const rng = mulberry32((derive(this.seed, PURPOSE.mina) ^ Math.imul(ck + 1, 2654435761) ^ Math.imul(ri + 1, 2246822507)) >>> 0);
      const n = attemptsFor(rng, rule.veinsPerChunk);
      for (let k = 0; k < n; k++) {
        const x = cx * 16 + Math.floor(rng() * 16), z = cz * 16 + Math.floor(rng() * 16), y = sampleOreY(rng, rule);
        const pri = ri * 1e10 + ck * 1e3 + k;
        for (const [vx, vy, vz] of veinCells(rng, x, y, z, rule, replaceable, exposed)) {
          const key = ((vx + 4096) * 8192 + (vz + 4096)) * 512 + (vy + 64), old = this.ores.get(key);
          if (!old || pri < old.pri) this.ores.set(key, { id: rule.blockId, pri });
        }
      }
    });
  }
};

// src/titan/save.ts
var TITAN_SAVE_VERSION = 5;

// src/titan/light.ts
var LIGHT_MAX = 15;
var lightKey = (x, y, z) => ((x + 2048) * 4096 + (z + 2048)) * 512 + (y - Y_MIN);
var DIRS2 = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]];
var LightStore = class _LightStore {
  sections = /* @__PURE__ */ new Map();
  static key(cx, cz, sy) {
    return ((cx + 2048) * 4096 + (cz + 2048)) * 32 + sy;
  }
  get(x, y, z) {
    const cx = x >> 4, cz = z >> 4, yy = y - Y_MIN, sy = yy >> 4;
    const a = this.sections.get(_LightStore.key(cx, cz, sy));
    if (!a) return 0;
    const i = ((yy & 15) << 4 | z & 15) << 4 | x & 15;
    const b = a[i >> 1];
    return i & 1 ? b >> 4 : b & 15;
  }
  set(x, y, z, v) {
    const cx = x >> 4, cz = z >> 4, yy = y - Y_MIN, sy = yy >> 4, k = _LightStore.key(cx, cz, sy);
    let a = this.sections.get(k);
    if (!a) {
      if (v === 0) return;
      a = new Uint8Array(2048);
      this.sections.set(k, a);
    }
    const i = ((yy & 15) << 4 | z & 15) << 4 | x & 15;
    a[i >> 1] = i & 1 ? a[i >> 1] & 15 | v << 4 : a[i >> 1] & 240 | v;
  }
  clear() {
    this.sections.clear();
  }
  /** Seções com alguma luz guardada (diagnóstico e testes). */
  get sectionCount() {
    return this.sections.size;
  }
};
var LightEngine = class {
  constructor(isOpaque, onChange = () => {
  }, inRegionXZ = (x, z) => inRegion(x, z)) {
    this.isOpaque = isOpaque;
    this.onChange = onChange;
    this.inRegionXZ = inRegionXZ;
  }
  isOpaque;
  onChange;
  inRegionXZ;
  store = new LightStore();
  ready = false;
  /** Durante o cálculo completo as mudanças não são avisadas. */
  silent = false;
  get(x, y, z) {
    return this.store.get(x, y, z);
  }
  inside(x, y, z) {
    return y >= Y_MIN && y <= Y_MAX && this.inRegionXZ(x, z);
  }
  put(x, y, z, v) {
    if (this.store.get(x, y, z) === v) return;
    this.store.set(x, y, z, v);
    if (!this.silent) this.onChange(x, y, z);
  }
  /** Fila de adição: espalha a luz das células da fila (cada uma com o nível que tinha ao entrar). */
  spread(q) {
    for (let h = 0; h < q.length; h += 4) {
      const x = q[h], y = q[h + 1], z = q[h + 2], l = q[h + 3];
      if (l <= 1) continue;
      for (const [dx, dy, dz] of DIRS2) {
        const nx = x + dx, ny = y + dy, nz = z + dz;
        if (!this.inside(nx, ny, nz) || this.isOpaque(nx, ny, nz) || this.store.get(nx, ny, nz) >= l - 1) continue;
        this.put(nx, ny, nz, l - 1);
        q.push(nx, ny, nz, l - 1);
      }
    }
  }
  /**
   * Fila de remoção: apaga a luz que dependia da célula (x, y, z) e, ao esbarrar em luz igual ou maior (outra lanterna!), a devolve à fila de
   * adição para preencher o que ficou escuro. Editar perto de 12 lanternas custa quase o mesmo que perto de 1.
   */
  removeFrom(x, y, z) {
    const old = this.store.get(x, y, z);
    if (old === 0) return;
    this.put(x, y, z, 0);
    const rq = [x, y, z, old], aq = [];
    for (let h = 0; h < rq.length; h += 4) {
      const cx = rq[h], cy = rq[h + 1], cz = rq[h + 2], lvl = rq[h + 3];
      for (const [dx, dy, dz] of DIRS2) {
        const nx = cx + dx, ny = cy + dy, nz = cz + dz;
        if (!this.inside(nx, ny, nz)) continue;
        const nl = this.store.get(nx, ny, nz);
        if (nl !== 0 && nl < lvl) {
          this.put(nx, ny, nz, 0);
          rq.push(nx, ny, nz, nl);
        } else if (nl >= lvl) aq.push(nx, ny, nz, nl);
      }
    }
    this.spread(aq);
  }
  /** Cálculo completo (abertura da partida): espalha a luz de todas as lanternas. Não avisa mudanças (nada foi desenhado ainda). */
  rebuild(lanterns) {
    this.store.clear();
    const q = [];
    for (const [x, y, z, lv = LIGHT_MAX] of lanterns) {
      this.store.set(x, y, z, Math.max(this.store.get(x, y, z), lv));
      q.push(x, y, z, lv);
    }
    this.silent = true;
    this.spread(q);
    this.silent = false;
    this.ready = true;
  }
  /** Um emissor (lanterna, nível 15; braseiro aceso, 13) foi colocado em (x, y, z). */
  sourceAdded(x, y, z, level = LIGHT_MAX) {
    if (!this.inside(x, y, z) || this.store.get(x, y, z) >= level) return;
    this.put(x, y, z, level);
    const q = [x, y, z, level];
    this.spread(q);
  }
  /** A lanterna de (x, y, z) foi retirada. */
  sourceRemoved(x, y, z) {
    this.removeFrom(x, y, z);
  }
  /** Um sólido passou a ocupar (x, y, z): a luz que passava por ali some e contorna. */
  blockPlaced(x, y, z) {
    this.removeFrom(x, y, z);
  }
  /** O sólido de (x, y, z) saiu: a luz das vizinhas entra na célula e segue. */
  blockRemoved(x, y, z) {
    const q = [];
    for (const [dx, dy, dz] of DIRS2) {
      const nx = x + dx, ny = y + dy, nz = z + dz;
      if (!this.inside(nx, ny, nz)) continue;
      const l = this.store.get(nx, ny, nz);
      if (l > 1) q.push(nx, ny, nz, l);
    }
    this.spread(q);
  }
};

// src/titan/skylight.ts
var SKY_MAX = 15;
var SCAN_MARGIN = 24;
var REACH = 16;
var SkyLight = class {
  constructor(w) {
    this.w = w;
    this.sx = w.x1 - w.x0;
    this.sz = w.z1 - w.z0;
    this.sy = w.yMax - w.yMin + 1;
    this.lv = new Uint8Array(this.sx * this.sz * this.sy);
    this.base = new Uint8Array(this.sx * this.sz * this.sy);
    this.scanTop = new Int16Array(this.sx * this.sz).fill(w.yMin);
  }
  w;
  sx;
  sz;
  sy;
  lv;
  /** O resultado só da varredura vertical de cada coluna (antes da inundação): `update` refaz só a coluna editada e copia o resto daqui, em vez de varrer ±16 colunas de novo. */
  base;
  /** Altura do primeiro nível implícito: acima de `scanTop[col]` vale 15. */
  scanTop;
  col(x, z) {
    return (z - this.w.z0) * this.sx + (x - this.w.x0);
  }
  cell(x, y, z) {
    return (y - this.w.yMin) * this.sx * this.sz + this.col(x, z);
  }
  inside(x, z) {
    return x >= this.w.x0 && x < this.w.x1 && z >= this.w.z0 && z < this.w.z1;
  }
  /** Nível do céu na célula (0–15). Fora da grade e acima do `scanTop` da coluna: 15. */
  at(x, y, z) {
    if (!this.inside(x, z) || y < this.w.yMin) return this.inside(x, z) ? 0 : SKY_MAX;
    if (y > this.w.yMax) return SKY_MAX;
    return y > this.scanTop[this.col(x, z)] ? SKY_MAX : this.lv[this.cell(x, y, z)];
  }
  /**
   * Conta inteira. `topHint(x, z)` = a altura do terreno na coluna (o topo da coluna gerada); `edited` = células editadas pelo jogador (só elas podem criar buracos abaixo do terreno, ou
   * blocos acima dele): cada uma sobe o `scanTop` da coluna até ela e entra como candidata de sombra.
   */
  compute(topHint, edited = []) {
    this.lv.fill(0);
    this.base.fill(0);
    for (let z = this.w.z0; z < this.w.z1; z++) for (let x = this.w.x0; x < this.w.x1; x++) this.scanTop[this.col(x, z)] = Math.min(this.w.yMax, Math.max(this.w.yMin, topHint(x, z)) + SCAN_MARGIN);
    for (const e of edited) {
      const [x, y, z] = e;
      if (!this.inside(x, z)) continue;
      const c = this.col(x, z);
      this.scanTop[c] = Math.min(this.w.yMax, Math.max(this.scanTop[c], y + SCAN_MARGIN));
    }
    const queue = [];
    for (let z = this.w.z0; z < this.w.z1; z++) for (let x = this.w.x0; x < this.w.x1; x++) this.sweep(x, z, this.w.yMin, queue);
    this.flood(queue, null);
  }
  /** Varre a coluna de cima para baixo até o primeiro bloco opaco, fixando níveis; empilha as células com nível ≥ 2 para a inundação. */
  sweep(x, z, yLow, queue) {
    let level = SKY_MAX;
    for (let y = this.scanTop[this.col(x, z)]; y >= this.w.yMin; y--) {
      const k = this.w.kind(x, y, z);
      if (k === 2) {
        this.lv[this.cell(x, y, z)] = 0;
        this.base[this.cell(x, y, z)] = 0;
        return;
      }
      if (k === 1 && level > 0) level--;
      if (y >= yLow) {
        const i = this.cell(x, y, z);
        this.lv[i] = level;
        this.base[i] = level;
        if (level >= 2) queue.push(x, y, z);
      }
    }
  }
  /** Inundação: cada célula passa `nível − 1` aos vizinhos não opacos (para baixo, o 15 desce inteiro); filtros tiram 1 a mais. `box` limita onde se escreve (a vizinhança refeita). */
  flood(queue, box) {
    const DIRS3 = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]];
    for (let head = 0; head < queue.length; head += 3) {
      const x = queue[head], y = queue[head + 1], z = queue[head + 2], v = this.lv[this.cell(x, y, z)];
      if (v < 2) continue;
      for (const [dx, dy, dz] of DIRS3) {
        const nx = x + dx, ny = y + dy, nz = z + dz;
        if (!this.inside(nx, nz) || ny < this.w.yMin || ny > this.w.yMax || ny > this.scanTop[this.col(nx, nz)]) continue;
        if (box && (nx < box.x0 || nx >= box.x1 || nz < box.z0 || nz >= box.z1 || ny < box.y0 || ny > box.y1)) continue;
        let nv = dy === -1 && v === SKY_MAX ? SKY_MAX : v - 1;
        const i = this.cell(nx, ny, nz);
        if (nv <= this.lv[i]) continue;
        const k = this.w.kind(nx, ny, nz);
        if (k === 2) continue;
        if (k === 1 && nv > 0) nv -= 1;
        if (nv > this.lv[i]) {
          this.lv[i] = nv;
          queue.push(nx, ny, nz);
        }
      }
    }
  }
  /**
   * Refaz a vizinhança depois que **uma** célula `(x, y, z)` mudou de classe (opaco, filtro ou transparente). Recalcula as colunas a ±16 em x e z, da primeira célula opaca abaixo de
   * `y` (menos 16) até o topo, e re-propaga a luz de fora da caixa para dentro.
   */
  update(x, y, z, onChange) {
    if (!this.inside(x, z) || y < this.w.yMin || y > this.w.yMax) return;
    const c = this.col(x, z);
    if (y + SCAN_MARGIN > this.scanTop[c]) this.scanTop[c] = Math.min(this.w.yMax, y + SCAN_MARGIN);
    let below = this.w.yMin;
    for (let yy = y - 1; yy >= this.w.yMin; yy--) if (this.w.kind(x, yy, z) === 2) {
      below = yy;
      break;
    }
    const box = { x0: Math.max(this.w.x0, x - REACH), x1: Math.min(this.w.x1, x + REACH + 1), z0: Math.max(this.w.z0, z - REACH), z1: Math.min(this.w.z1, z + REACH + 1), y0: Math.max(this.w.yMin, below - REACH), y1: this.w.yMax };
    const before = onChange ? this.snapshot(box) : null;
    for (let yy = this.w.yMin; yy <= this.scanTop[c]; yy++) this.base[this.cell(x, yy, z)] = 0;
    this.sweep(x, z, this.w.yMin, []);
    const queue = [];
    for (let zz = box.z0; zz < box.z1; zz++) for (let xx = box.x0; xx < box.x1; xx++) for (let yy = box.y0; yy <= Math.min(box.y1, this.scanTop[this.col(xx, zz)]); yy++) {
      const i = this.cell(xx, yy, zz), b = this.base[i];
      this.lv[i] = b;
      if (b >= 2) queue.push(xx, yy, zz);
    }
    for (let zz = box.z0 - 1; zz <= box.z1; zz++) for (let xx = box.x0 - 1; xx <= box.x1; xx++) {
      if (!this.inside(xx, zz)) continue;
      const edgeXZ = xx < box.x0 || xx >= box.x1 || zz < box.z0 || zz >= box.z1;
      for (let yy = box.y0 - 1; yy <= Math.min(box.y1, this.scanTop[this.col(xx, zz)]); yy++) {
        if (yy < this.w.yMin) continue;
        if ((edgeXZ || yy < box.y0) && this.lv[this.cell(xx, yy, zz)] >= 2) queue.push(xx, yy, zz);
      }
    }
    this.flood(queue, box);
    if (before && onChange) {
      let i = 0;
      for (let zz = box.z0; zz < box.z1; zz++) for (let xx = box.x0; xx < box.x1; xx++) for (let yy = box.y0; yy <= Math.min(box.y1, this.scanTop[this.col(xx, zz)]); yy++) if (before[i++] !== this.lv[this.cell(xx, yy, zz)]) onChange(xx, yy, zz);
    }
  }
  /** Cópia dos níveis da caixa (na ordem em que `update` varre), para comparar depois. */
  snapshot(box) {
    let n = 0;
    for (let zz = box.z0; zz < box.z1; zz++) for (let xx = box.x0; xx < box.x1; xx++) n += Math.max(0, Math.min(box.y1, this.scanTop[this.col(xx, zz)]) - box.y0 + 1);
    const out = new Uint8Array(n);
    let i = 0;
    for (let zz = box.z0; zz < box.z1; zz++) for (let xx = box.x0; xx < box.x1; xx++) for (let yy = box.y0; yy <= Math.min(box.y1, this.scanTop[this.col(xx, zz)]); yy++) out[i++] = this.lv[this.cell(xx, yy, zz)];
    return out;
  }
};

// src/titan/volume.ts
var TitanVolume = class _TitanVolume {
  constructor(gen) {
    this.gen = gen;
  }
  gen;
  /** Edições por chunk: índice da célula na coluna → id. */
  edits = /* @__PURE__ */ new Map();
  /** Chunks com edição ainda não gravada → revisão da última edição (sobe a cada `set` que muda o chunk). */
  dirty = /* @__PURE__ */ new Map();
  chunkRev = 0;
  /** Lanternas colocadas (as únicas fontes de luz) e o mapa de luz calculado sob demanda. */
  lanterns = /* @__PURE__ */ new Map();
  /** Todos os emissores de luz de bloco (lanterna e braseiro aceso, `lightLevelOf`): `[x, y, z, nível]`. As lanternas também ficam em `lanterns`, que desenha o modelo delas. */
  emitters = /* @__PURE__ */ new Map();
  /** Luz incremental em 4 bits por célula (ver `light.ts`); `ready` só depois da primeira consulta (cálculo completo sob demanda). */
  light$ = new LightEngine((x, y, z) => blocksLight(this.get(x, y, z)), (x, y, z) => this.markLightCell(x, y, z), (x, z) => this.gen.inRegion(x, z));
  /** Medição opcional do tempo de cada atualização do mapa de luz (ms): cálculo completo e cada edição. */
  onLightMs = null;
  /** Seções cuja luz mudou (só luz, sem edição de bloco), a refazer com orçamento por quadro. Chave numérica → `"cx,sy,cz"`. */
  lightTouched = /* @__PURE__ */ new Set();
  /** Chunks (e seções) tocados desde a última coleta pelo renderer. */
  touched = /* @__PURE__ */ new Set();
  /** Seções cuja luz mudou (refazer sem pressa, com orçamento). */
  lightOnly = /* @__PURE__ */ new Set();
  /** Revisão de cada seção: sobe a cada edição (descarta malhas antigas). */
  rev = /* @__PURE__ */ new Map();
  get seed() {
    return this.gen.seed;
  }
  /** Voxel efetivo (base + edições). Fora de Y: rocha-mãe abaixo, ar acima. */
  get(x, y, z) {
    if (y < Y_MIN) return T.BEDROCK;
    if (y > Y_MAX) return T.AIR;
    const e = this.edits.get(chunkKey(chunkOf(x), chunkOf(z)));
    if (e) {
      const v = e.get(columnIndex(localOf(x), y, localOf(z)));
      if (v !== void 0) return v;
    }
    return this.gen.blockAt(x, y, z);
  }
  /** Voxel da base, ignorando edições. */
  base(x, y, z) {
    return y < Y_MIN ? T.BEDROCK : y > Y_MAX ? T.AIR : this.gen.blockAt(x, y, z);
  }
  /** Colisão: sólido, mais uma parede invisível em volta da região de teste e a rocha-mãe. */
  solidForBody(x, y, z) {
    if (!this.gen.inRegion(x, z)) return true;
    return isSolid(this.get(x, y, z));
  }
  /** Altura sólida da célula para o corpo do jogador (0–1; a parede invisível em volta da região conta como cubo inteiro). */
  bodyHeight(x, y, z) {
    if (!this.gen.inRegion(x, z)) return 1;
    return blockHeight(this.get(x, y, z));
  }
  /** Caixas sólidas da célula (degrau e cadeira, ADR 0101) para o corpo, ou null (a parede invisível em volta da região é cubo inteiro). */
  bodyBoxes(x, y, z) {
    return this.gen.inRegion(x, z) ? blockBoxes(this.get(x, y, z)) : null;
  }
  /** Faixa `[baixo, topo]` ocupada na célula para o corpo (a parede invisível em volta da região conta como cubo inteiro). */
  bodySpan(x, y, z) {
    if (!this.gen.inRegion(x, z)) return [0, 1];
    return blockSpan(this.get(x, y, z));
  }
  /** Pode quebrar esta célula? Editável e alvo da mira (sólido ou lanterna); rocha-mãe e líquido não. */
  breakable(x, y, z) {
    return this.editable(x, y, z) && isTarget(this.get(x, y, z));
  }
  /** Pode editar esta célula? Dentro da região e do domínio Y, e nunca a rocha-mãe (Y = −64). */
  editable(x, y, z) {
    return this.gen.inRegion(x, z) && y > Y_MIN && y <= Y_MAX;
  }
  /** Gancho de edição (ADR 0104): a sala do servidor o usa para repassar cada célula mudada aos jogadores. Fora da sala fica nulo. */
  onSet = null;
  /** Grava `id` na célula respeitando a regra de edição. Devolve se algo mudou. */
  set(x, y, z, id) {
    if (!this.editable(x, y, z)) return false;
    if (isWall(id)) id = wallId(wallMaskFor((a, b, c) => this.get(a, b, c), x, y, z));
    const cx = chunkOf(x), cz = chunkOf(z);
    const key = chunkKey(cx, cz);
    const idx = columnIndex(localOf(x), y, localOf(z));
    const baseId = this.gen.blockAt(x, y, z);
    let e = this.edits.get(key);
    const current = e?.get(idx) ?? baseId;
    if (current === id) return false;
    if (id === baseId) {
      e?.delete(idx);
      if (e && e.size === 0) this.edits.delete(key);
    } else {
      if (!e) {
        e = /* @__PURE__ */ new Map();
        this.edits.set(key, e);
      }
      e.set(idx, id);
    }
    this.dirty.set(key, ++this.chunkRev);
    this.markSections(x, y, z);
    this.updateLight(x, y, z, current, id);
    this.onSet?.(x, y, z, id);
    this.refreshWalls(x, y, z);
    return true;
  }
  /** Mureta vizinha (ADR 0110): depois de qualquer mudança na célula, as muretas dos quatro lados refazem a máscara de conexão (a edição passa por `set`, então a sala também repassa). */
  refreshWalls(x, y, z) {
    for (const [dx, dz] of [[0, -1], [1, 0], [0, 1], [-1, 0]]) {
      const nx = x + dx, nz = z + dz, n = this.get(nx, y, nz);
      if (isWall(n) && n !== wallId(wallMaskFor((a, b, c) => this.get(a, b, c), nx, y, nz))) this.set(nx, y, nz, n);
    }
  }
  /**
   * Remove o sólido da célula: na bacia, a célula volta a ser líquida; fora dela, vira ar (remoção explícita se a base era sólida) — **salvo** se uma das quatro células vizinhas **do mesmo nível**
   * é líquido: então o espaço se enche de líquido (ADR 0099). Só vale para sólido removido (lanterna, escada e esteira não enchem).
   */
  remove(x, y, z) {
    const baseId = this.gen.blockAt(x, y, z), before = this.get(x, y, z);
    const floods = baseId !== T.LAKE && isSolid(before) && [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dz]) => this.get(x + dx, y, z + dz) === T.LAKE);
    return this.set(x, y, z, baseId === T.LAKE || floods ? T.LAKE : T.AIR);
  }
  /** Coloca um sólido na célula (ar ou líquido; o líquido é deslocado, mas continua na base para voltar depois). */
  place(x, y, z, id) {
    if (!isSolid(id) && id !== T.LANTERN && !isMarco(id) && id !== T.MAT && !isLadder(id) && !isTorch(id)) return false;
    if (isOccupied(this.get(x, y, z))) return false;
    return this.set(x, y, z, id);
  }
  /** A seção da célula e as vizinhas do outro lado da borda (a malha de uma depende da outra): `"cx,sy,cz"`. */
  sectionsAround(x, y, z) {
    const cx = chunkOf(x), cz = chunkOf(z), sy = sectionOf(y);
    const lx = localOf(x), lz = localOf(z), ly = y - Y_MIN - sy * 16;
    const out = [`${cx},${sy},${cz}`];
    const add = (dcx, dsy, dcz) => {
      const s = sy + dsy;
      if (s >= 0 && s < 24) out.push(`${cx + dcx},${s},${cz + dcz}`);
    };
    if (lx === 0) add(-1, 0, 0);
    if (lx === 15) add(1, 0, 0);
    if (lz === 0) add(0, 0, -1);
    if (lz === 15) add(0, 0, 1);
    if (ly === 0) add(0, -1, 0);
    if (ly === 15) add(0, 1, 0);
    return out;
  }
  markSections(x, y, z) {
    for (const k of this.sectionsAround(x, y, z)) {
      this.touched.add(k);
      this.rev.set(k, (this.rev.get(k) ?? 0) + 1);
    }
  }
  /** Seções com edição (e as vizinhas das bordas): entram na fila inicial do renderer, mesmo acima do relevo natural (ex.: construção em Y = 150 ao reabrir). */
  editedSections() {
    const out = /* @__PURE__ */ new Set();
    for (const [key, cells] of this.edits) {
      const [cx, cz] = key.split(",").map(Number);
      for (const idx of cells.keys()) {
        const u = unpackIndex(idx);
        for (const k of this.sectionsAround(cx * 16 + u.lx, u.y, cz * 16 + u.lz)) out.add(k);
      }
    }
    return [...out];
  }
  sectionRevision(cx, sy, cz) {
    return this.rev.get(`${cx},${sy},${cz}`) ?? 0;
  }
  /** Seções tocadas por edições desde a última chamada (`"cx,sy,cz"`). */
  takeTouched() {
    const out = [...this.touched];
    this.touched.clear();
    for (const k of out) this.lightOnly.delete(k);
    return out;
  }
  /** Seções em que **só a luz** mudou (sem edição de bloco): a malha pode esperar uns quadros. As já devolvidas por `takeTouched` não repetem. */
  takeLightTouched() {
    const out = [...this.lightOnly];
    this.lightOnly.clear();
    return out;
  }
  // ---- Persistência ----
  /**
   * Chunks sujos, cada um com a **revisão** do instante da cópia (as edições vão copiadas: edições posteriores não entram nesta gravação).
   * Depois da confirmação, `markClean` limpa só a revisão confirmada.
   */
  dirtyChunks() {
    return [...this.dirty].map(([key, rev]) => {
      const [cx, cz] = key.split(",").map(Number);
      return { cx, cz, rev, edits: [...this.edits.get(key) ?? []] };
    });
  }
  /** Marca como gravada a revisão confirmada; um chunk editado de novo durante a gravação (revisão maior) continua pendente. */
  markClean(saved) {
    for (const k of saved) {
      const key = chunkKey(k.cx, k.cz);
      if (this.dirty.get(key) === k.rev) this.dirty.delete(key);
    }
  }
  get hasDirty() {
    return this.dirty.size > 0;
  }
  /** Reaplica as edições gravadas sobre a base (na retomada). Entradas fora do domínio são descartadas. */
  load(chunks) {
    for (const c of chunks) {
      const m = /* @__PURE__ */ new Map();
      for (const [idx, id] of c.edits) if (Number.isInteger(idx) && idx >= 0 && idx < 384 * 256 && Number.isInteger(id) && id >= 0 && id <= T_MAX) m.set(idx, id);
      if (m.size) this.edits.set(chunkKey(c.cx, c.cz), m);
      for (const [idx, id] of m) {
        const md = modelOf(id);
        if (md) {
          const u = unpackIndex(idx);
          const x = c.cx * 16 + u.lx, z = c.cz * 16 + u.lz;
          this.models[md.kind].set(lightKey(x, u.y, z), [x, u.y, z, md.turn]);
        }
      }
      for (const [idx, id] of m) {
        const lv = lightLevelOf(id);
        if (!lv) continue;
        const u = unpackIndex(idx);
        const x = c.cx * 16 + u.lx, z = c.cz * 16 + u.lz;
        this.emitters.set(lightKey(x, u.y, z), [x, u.y, z, lv]);
        if (id === T.LANTERN) this.lanterns.set(lightKey(x, u.y, z), [x, u.y, z]);
      }
    }
    this.light$.ready = false;
    this.lanternVersion++;
    this.modelVersion++;
  }
  // ---- Luz de lanterna ----
  /** Modelos 3D colocados (mesa, Marco de Margem, Painel de Junco): o renderer desenha uma instância por célula; `modelVersion` muda a cada peça posta, retirada ou carregada. */
  models = { workbench: /* @__PURE__ */ new Map(), marco: /* @__PURE__ */ new Map(), painel: /* @__PURE__ */ new Map(), escada: /* @__PURE__ */ new Map(), bau: /* @__PURE__ */ new Map(), cama: /* @__PURE__ */ new Map(), braseiro: /* @__PURE__ */ new Map(), braseiroAceso: /* @__PURE__ */ new Map(), degrau: /* @__PURE__ */ new Map(), degrauPedra: /* @__PURE__ */ new Map(), cadeira: /* @__PURE__ */ new Map(), porta: /* @__PURE__ */ new Map(), tocha: /* @__PURE__ */ new Map(), tochaParede: /* @__PURE__ */ new Map(), ...Object.fromEntries(MURETA_KINDS.map((k) => [k, /* @__PURE__ */ new Map()])) };
  modelVersion = 0;
  /** Cada peça: `[x, y, z, giro]` (giro 0–3 em quartos de volta ao redor de Y; o painel usa 0 = ao longo de X e 1 = ao longo de Z). */
  modelCells(kind) {
    return [...this.models[kind].values()];
  }
  workbenchCells() {
    return this.modelCells("workbench");
  }
  /** Há uma Mesa de Trabalho nesta célula? */
  isWorkbench(x, y, z) {
    return isWorkbench(this.get(x, y, z));
  }
  /** Muda a cada lanterna posta ou retirada (o renderer refaz as instâncias só então). */
  lanternVersion = 0;
  /** Há algum emissor de luz de bloco (lanterna ou braseiro aceso)? Sem emissor a malha não calcula o brilho. */
  get hasLanterns() {
    return this.emitters.size > 0;
  }
  lanternCells() {
    return [...this.lanterns.values()];
  }
  /**
   * Luz do céu (ADR 0123): 0–15 por célula, nas regras da Wiki (céu aberto 15, filtros −1, lados e para cima −1 por célula). O primeiro uso faz a conta inteira da região (o céu das colunas; o mundo gerado
   * não tem cavernas) e cada edição que muda a classe da célula (opaco, filtro, transparente) refaz só a vizinhança (`SkyLight.update`). Fora da região vale 15.
   */
  skyLight(x, y, z) {
    return (this.sky ??= this.buildSky()).at(x, y, z);
  }
  sky = null;
  static skyKind(id) {
    return blocksLight(id) ? 2 : isLeaves(id) || id === T.LAKE ? 1 : 0;
  }
  buildSky() {
    const r = this.gen.region, sky = new SkyLight({ kind: (x, y, z) => _TitanVolume.skyKind(this.get(x, y, z)), x0: r.min, x1: r.max, z0: r.min, z1: r.max, yMin: Y_MIN, yMax: Y_MAX });
    const edited = [];
    for (const c of this.dirtyChunks()) for (const [idx] of c.edits) {
      const u = unpackIndex(idx);
      edited.push([c.cx * 16 + u.lx, u.y, c.cz * 16 + u.lz]);
    }
    sky.compute((x, z) => this.gen.column(x, z).top, edited);
    return sky;
  }
  /** Nível de luz (0–15) da célula. O primeiro uso faz o cálculo completo; depois a luz é mantida de forma incremental. */
  light(x, y, z) {
    if (!this.emitters.size) return 0;
    if (!this.light$.ready) {
      const t0 = this.onLightMs ? performance.now() : 0;
      this.light$.rebuild(this.emitters.values());
      this.onLightMs?.(performance.now() - t0);
    }
    return this.light$.get(x, y, z);
  }
  /**
   * Atualiza a luz depois de uma edição já aplicada (`before` → `after`): só propaga o que muda, e cada célula cuja luz mudou marca a sua seção
   * (e as vizinhas das bordas) para refazer a malha. Antes de o mapa existir (nada desenhado ainda) não há o que atualizar.
   */
  updateLight(x, y, z, before, after) {
    const key = lightKey(x, y, z);
    const mBefore = modelOf(before), mAfter = modelOf(after);
    if (mBefore) {
      this.models[mBefore.kind].delete(key);
      this.modelVersion++;
    }
    if (mAfter) {
      this.models[mAfter.kind].set(key, [x, y, z, mAfter.turn]);
      this.modelVersion++;
    }
    const wasLantern = before === T.LANTERN, isLantern = after === T.LANTERN;
    if (wasLantern && !isLantern) {
      this.lanterns.delete(key);
      this.lanternVersion++;
    }
    if (isLantern && !wasLantern) {
      this.lanterns.set(key, [x, y, z]);
      this.lanternVersion++;
    }
    if (this.sky && _TitanVolume.skyKind(before) !== _TitanVolume.skyKind(after)) {
      let moved = false;
      this.sky.update(x, y, z, (cx, cy, cz) => {
        moved = true;
        this.markLightCell(cx, cy, cz);
      });
      this.flushLightTouched();
      if (moved) this.modelVersion++;
    }
    const lvBefore = lightLevelOf(before), lvAfter = lightLevelOf(after);
    if (lvBefore !== lvAfter) {
      if (lvAfter) this.emitters.set(key, [x, y, z, lvAfter]);
      else this.emitters.delete(key);
    }
    if (!this.light$.ready) return;
    const t0 = this.onLightMs ? performance.now() : 0;
    if (lvBefore && !lvAfter) this.light$.sourceRemoved(x, y, z);
    const solidBefore = blocksLight(before), solidAfter = blocksLight(after);
    if (!solidBefore && solidAfter) this.light$.blockPlaced(x, y, z);
    else if (solidBefore && !solidAfter) this.light$.blockRemoved(x, y, z);
    if (lvAfter && lvAfter !== lvBefore) this.light$.sourceAdded(x, y, z, lvAfter);
    this.flushLightTouched();
    this.onLightMs?.(performance.now() - t0);
  }
  /** Uma célula mudou de nível de luz: as faces dos sólidos vizinhos leem esse valor, então a seção dela e as vizinhas da borda refazem a malha. */
  markLightCell(x, y, z) {
    const cx = x >> 4, cz = z >> 4, yy = y - Y_MIN, sy = yy >> 4, lx = x & 15, lz = z & 15, ly = yy & 15;
    const add = (dcx, dsy, dcz) => {
      const s = sy + dsy;
      if (s >= 0 && s < 24) this.lightTouched.add(((cx + dcx + 2048) * 4096 + (cz + dcz + 2048)) * 32 + s);
    };
    add(0, 0, 0);
    if (lx === 0) add(-1, 0, 0);
    if (lx === 15) add(1, 0, 0);
    if (lz === 0) add(0, 0, -1);
    if (lz === 15) add(0, 0, 1);
    if (ly === 0) add(0, -1, 0);
    if (ly === 15) add(0, 1, 0);
  }
  /** Passa as seções de luz alteradas para a revisão de malha (a revisão sobe; a lista de só-luz fica para o renderer pegar com orçamento). */
  flushLightTouched() {
    for (const n of this.lightTouched) {
      const s = n & 31, rest = Math.floor(n / 32), cz = rest % 4096 - 2048, cx = Math.floor(rest / 4096) - 2048;
      const k = `${cx},${s},${cz}`;
      this.rev.set(k, (this.rev.get(k) ?? 0) + 1);
      this.lightOnly.add(k);
    }
    this.lightTouched.clear();
  }
  /** Quantas edições o volume guarda (testes e diagnóstico). */
  get editCount() {
    let n = 0;
    for (const m of this.edits.values()) n += m.size;
    return n;
  }
};

// src/titan/session.ts
var stateRev = (s) => s.inventory.rev + s.collectedRev + s.dropsRev + s.metaRev;
var reedId = (x, y, z) => `reed:${x},${y},${z}`;
function makeItems(s) {
  const all = [...s.volume.gen.surfaceItems, ...s.volume.gen.dryReeds, ...s.volume.gen.plates];
  const key = (x, y, z) => `${x},${y},${z}`;
  const byCell = new Map(all.map((i) => [key(i.x, i.y, i.z), i.id]));
  let reeds = null;
  const reedAt = (x, y, z) => {
    if (!reeds) {
      const gen = s.volume.gen;
      const list = gen.version >= 4 ? gen.reeds : s.grants.ember ? gen.reedsFor(s.grants.ember[0], s.grants.ember[2]) : [];
      reeds = new Map(list.map((r) => [key(r.x, r.y, r.z), reedId(r.x, r.y, r.z)]));
    }
    const id = reeds.get(key(x, y, z));
    return id && !s.collected.has(id) && s.volume.get(x, y, z) === T.AIR && isSolid(s.volume.get(x, y - 1, z)) ? id : null;
  };
  let nuts = null;
  const nutAt = (x, y, z) => {
    if (!nuts) nuts = new Map(s.volume.gen.nutPlants.map((n) => [key(n.x, n.y, n.z), nutId(n.x, n.y, n.z)]));
    const id = nuts.get(key(x, y, z));
    return id && !s.regrow.has(id) && s.volume.get(x, y, z) === T.AIR && isSolid(s.volume.get(x, y - 1, z)) ? id : null;
  };
  return {
    at: (x, y, z) => {
      const id = byCell.get(key(x, y, z));
      return id && !s.collected.has(id) ? id : reedAt(x, y, z) ?? nutAt(x, y, z) ?? (s.crops.has(cropKey(x, y, z)) ? cropId(x, y, z) : null);
    },
    remaining: () => all.filter((i) => !s.collected.has(i.id))
  };
}
function validFurnaces(raw, vol) {
  const out = /* @__PURE__ */ new Map();
  if (!raw || typeof raw !== "object") return out;
  for (const [k, v] of Object.entries(raw)) {
    const m = /^(-?\d+),(-?\d+),(-?\d+)$/.exec(k);
    if (!m) continue;
    const b = vol.get(Number(m[1]), Number(m[2]), Number(m[3]));
    const rules = rulesOf(b);
    if (rules) out.set(k, furnaceFromData(v, rules));
  }
  return out;
}
function validSpawn(raw, vol) {
  const p = raw;
  if (!p || ![p.x, p.y, p.z].every((v) => Number.isInteger(v))) return null;
  const x = p.x, y = p.y, z = p.z;
  return isBedFoot(vol.get(x, y, z)) ? { x, y, z } : null;
}
function validChests(raw, vol) {
  const out = /* @__PURE__ */ new Map();
  if (!raw || typeof raw !== "object") return out;
  for (const [k, v] of Object.entries(raw)) {
    const m = /^(-?\d+),(-?\d+),(-?\d+)$/.exec(k);
    if (!m || !isChest(vol.get(Number(m[1]), Number(m[2]), Number(m[3])))) continue;
    const c = chestFromData(v);
    if (!chestIsEmpty(c)) out.set(k, c);
  }
  return out;
}
function tickFurnaces(s, dt) {
  let any = false;
  for (const [k, f] of s.furnaces) {
    const [x, y, z] = k.split(",").map(Number), cur = s.volume.get(x, y, z), rules = rulesOf(cur);
    if (!rules) continue;
    const r = tickFurnace(f, dt, rules);
    if (!r.changed) continue;
    any = true;
    s.metaRev++;
    const lit = showsLit(f, rules);
    const want = isFurnace(cur) ? furnaceId(furnaceTurn(cur), lit) : lit ? T.BRAZIER_LIT : T.BRAZIER;
    if (cur !== want) s.volume.set(x, y, z, want);
  }
  return any;
}
function validRespawn(raw, ids) {
  const out = /* @__PURE__ */ new Map();
  if (!raw || typeof raw !== "object") return out;
  for (const [k, v] of Object.entries(raw)) if (ids.has(k) && typeof v === "number" && Number.isFinite(v) && v > 0) out.set(k, Math.min(v, 3600));
  return out;
}
function validCrops(raw, vol) {
  const out = /* @__PURE__ */ new Map();
  if (!raw || typeof raw !== "object") return out;
  for (const [k, v] of Object.entries(raw)) {
    const m = /^(-?\d+),(-?\d+),(-?\d+)$/.exec(k);
    const tag = v && typeof v === "object" ? v.s : void 0, other = typeof tag === "string" && (tag === "noz" || GARDEN_SPECIES.includes(tag));
    const age = other ? v.a : v;
    if (!m || typeof age !== "number" || !Number.isInteger(age) || age < 0) continue;
    const [x, y, z] = [Number(m[1]), Number(m[2]), Number(m[3])], species = other ? tag : "junco", below = vol.get(x, y - 1, z), kind = soilKindFor(species, below);
    if (kind && plantableSoil(species, below) && vol.get(x, y, z) === T.AIR && vol.gen.inRegion(x, z) && age <= maxAgeOf(species, kind)) out.set(k, { x, y, z, age, species });
  }
  return out;
}
function validRegrow(raw) {
  const out = /* @__PURE__ */ new Map();
  if (!raw || typeof raw !== "object") return out;
  for (const [id, v] of Object.entries(raw)) if (parseNutId(id) && typeof v === "number" && Number.isFinite(v) && v > 0) out.set(id, Math.min(v, NUT_REGROW_S));
  return out;
}
function validDrops(raw, gen) {
  const out = /* @__PURE__ */ new Map();
  if (!Array.isArray(raw)) return out;
  for (const d of raw) {
    if (!d || typeof d.id !== "string" || !isItem(d.item) || ![d.x, d.y, d.z].every(Number.isInteger) || !(d.y > Y_MIN && d.y <= Y_MAX) || !gen.inRegion(d.x, d.z)) continue;
    const count = d.count === void 0 ? void 0 : Number.isInteger(d.count) && d.count >= 1 && d.count <= 64 ? d.count : null;
    if (count === null) continue;
    const max = maxDurability(d.item), wear = max !== null && Number.isInteger(d.wear) && d.wear >= 1 && d.wear < max ? d.wear : void 0;
    out.set(d.id, { id: d.id, item: d.item, ...count && count > 1 ? { count } : {}, ...wear ? { wear } : {}, x: d.x, y: d.y, z: d.z });
  }
  return out;
}
var generatorFor = (seed, version) => version >= 1 && version <= GENERATOR_VERSION && Number.isInteger(version) ? new TitanGenerator(seed, version) : null;
var creaturesFor = (gen) => creatureSpecs(gen).map((sp) => newFromSpec(sp, gen.seed));
function fresh(gen) {
  const volume = new TitanVolume(gen);
  const a = gen.arrival;
  const collected = /* @__PURE__ */ new Set();
  const regrow = /* @__PURE__ */ new Map();
  const crops = /* @__PURE__ */ new Map();
  const grants = {};
  const s = { seed: gen.seed, volume, body: newBody(a.x, a.y, a.z), yaw: a.yaw, pitch: -0.12, selected: 0, resumed: false, relocated: false, time: START_FRAC, days: 0, weather: newWeather(Math.random), inventory: Inventory.starting(), collected, collectedRev: 0, regrow, crops, furnaces: /* @__PURE__ */ new Map(), chests: /* @__PURE__ */ new Map(), spawn: null, respawn: /* @__PURE__ */ new Map(), creatures: creaturesFor(gen), savedStateRev: -1, drops: /* @__PURE__ */ new Map(), dropFx: /* @__PURE__ */ new Map(), dropsRev: 0, vitals: newVitals(), known: /* @__PURE__ */ new Set(), grants, metaRev: 0, items: makeItems({ volume, collected, grants, regrow, crops }) };
  return s;
}
function resume(gen, save) {
  const volume = new TitanVolume(gen);
  volume.load(save.chunks);
  const a = gen.arrival;
  const p = save.header.player;
  const safe = safePosition(volume, p, a);
  const moved = Math.abs(safe.x - p.x) > 1e-6 || Math.abs(safe.y - p.y) > 1e-6 || Math.abs(safe.z - p.z) > 1e-6;
  const inv = save.header.inventory ? Inventory.fromData(save.header.inventory.bag) : Inventory.starting();
  const revBefore = inv.rev;
  const converted = save.header.v < 4 ? inv.convertItem(Item.CAPSULE, Item.EMBER) : 0;
  inv.returnCraft();
  inv.returnBench();
  const collected = new Set((save.header.inventory?.collected ?? []).filter((x) => typeof x === "string"));
  const grants = {};
  const g = save.header.grants?.ember;
  if (Array.isArray(g) && g.length === 3 && g.every(Number.isInteger)) grants.ember = [g[0], g[1], g[2]];
  const regrow = validRegrow(save.header.regrow);
  const crops = validCrops(save.header.crops, volume);
  const respawn = validRespawn(save.header.respawn, new Set(creatureSpecs(gen).map((c) => c.id)));
  const known = new Set((save.header.recipes ?? []).filter((x) => typeof x === "string"));
  const s = { seed: gen.seed, volume, body: newBody(safe.x, safe.y, safe.z), yaw: p.yaw, pitch: p.pitch, selected: Math.max(0, Math.min(HOTBAR - 1, save.header.selected | 0)), resumed: true, relocated: moved, time: validDay(save.header.time), days: Number.isInteger(save.header.days) && save.header.days >= 0 ? save.header.days : 0, weather: weatherFromData(save.header.weather, Math.random), inventory: inv, collected, collectedRev: 0, regrow, crops, furnaces: validFurnaces(save.header.furnaces, volume), chests: validChests(save.header.chests, volume), spawn: validSpawn(save.header.spawn, volume), respawn, creatures: creaturesFor(gen).filter((c) => !respawn.has(c.id)), savedStateRev: -1, drops: validDrops(save.header.drops, gen), dropFx: /* @__PURE__ */ new Map(), dropsRev: 0, known, grants, metaRev: 0, vitals: vitalsFromData(save.header.vitals), items: makeItems({ volume, collected, grants, regrow, crops }) };
  const granted = gen.version < 4 && !grants.ember ? grantEmber(s) : false;
  discoverRecipes(s);
  const clean = save.header.inventory && inv.rev === revBefore && !converted && !granted && save.header.v >= TITAN_SAVE_VERSION;
  s.savedStateRev = clean ? stateRev(s) : -1;
  return s;
}
function grantEmber(s) {
  const gen = s.volume.gen, v = s.volume;
  for (const c of [...gen.planEmber(), ...gen.planEmber(false)]) {
    const y = gen.column(c.x, c.z).top;
    if (v.get(c.x, y, c.z) !== gen.blockAt(c.x, y, c.z) || v.get(c.x, y + 1, c.z) !== T.AIR || s.drops.has(`v:${c.x},${y},${c.z}`)) continue;
    if (!v.set(c.x, y, c.z, T.EMBER)) continue;
    s.grants.ember = [c.x, y, c.z];
    s.metaRev++;
    return true;
  }
  return false;
}
function discoverRecipes(s) {
  const out = [];
  const hasBench = s.inventory.total(Item.WORKBENCH) > 0 || s.volume.workbenchCells().length > 0;
  const add = (id, cond) => {
    if (cond && !s.known.has(id)) {
      s.known.add(id);
      out.push(id);
    }
  };
  const hasWood = [Item.LOG_OAK, Item.LOG_CHERRY, Item.LOG_BIRCH, Item.TABUA_CARVALHO, Item.TABUA_CEREJEIRA, Item.TABUA_BETULA, Item.HASTE].some((i) => s.inventory.total(i) > 0);
  add("bancada", hasBench || s.inventory.total(Item.MESA_CARPINTARIA) > 0);
  add("mesa", s.inventory.total(Item.DARK_ROCK) > 0 || hasBench || hasWood);
  add("braseiro", s.inventory.total(Item.COPPER_SHARD) > 0 || s.inventory.total(Item.COPPER_INGOT) > 0 || s.inventory.total(Item.BRAZIER) > 0 || s.furnaces.size > 0);
  if (out.length) s.metaRev++;
  return out;
}
function tickRegrow(s, dt) {
  let ripened = false;
  for (const [id, left] of [...s.regrow]) {
    const rest = left - dt;
    if (rest <= 0) {
      s.regrow.delete(id);
      ripened = true;
    } else s.regrow.set(id, rest);
  }
  return ripened;
}
var isRaining = (s) => s.weather.raining && hasWeather(s.volume.gen.world);
function tickWeather(s, dt, rng) {
  return hasWeather(s.volume.gen.world) && stepWeather(s.weather, dt, rng);
}
function skyOpenAbove(s, x, y, z) {
  for (let yy = y + 1; yy <= Y_MAX; yy++) if (isSolid(s.volume.get(x, yy, z))) return false;
  return true;
}
function cropLight(s, x, y, z) {
  return Math.max(skyOpenAbove(s, x, y, z) ? skyAt(s.time, "titan", isRaining(s) ? 1 : 0).ambient * 15 : 0, s.volume.light(x, y + 1, z));
}
function tickCrops(s, dt, rng, near) {
  let changed = false;
  const pTick = 1 - Math.exp(-dt / CROP_TICK_MEAN_S);
  for (const c of s.crops.values()) {
    if (Math.hypot(c.x + 0.5 - near.x, c.z + 0.5 - near.z) > CROP_SIM_RADIUS || rng() >= pTick) continue;
    const kindAt = (dx, dz) => soilKindFor(c.species, s.volume.get(c.x + dx, c.y - 1, c.z + dz));
    if (isGarden(c.species)) {
      const below = s.volume.get(c.x, c.y - 1, c.z), wet = isHydrated(s.volume, c.x, c.y - 1, c.z) || isRaining(s) && skyOpenAbove(s, c.x, c.y - 1, c.z);
      if (below === T.FARMLAND_DRY && wet) {
        s.volume.set(c.x, c.y - 1, c.z, T.FARMLAND_WET);
        changed = true;
      } else if (below === T.FARMLAND_WET && !wet) {
        s.volume.set(c.x, c.y - 1, c.z, T.FARMLAND_DRY);
        changed = true;
      }
    }
    const self = kindAt(0, 0);
    const sameAt = (dx, dz) => !!self && s.crops.get(cropKey(c.x + dx, c.y, c.z + dz))?.species === c.species && kindAt(dx, dz) === self;
    if (randomTick(c, { soilAt: kindAt, sameAt, light: cropLight(s, c.x, c.y, c.z) }, rng)) {
      changed = true;
      s.metaRev++;
    }
  }
  return changed;
}
function headerOf(s) {
  return { v: TITAN_SAVE_VERSION, world: s.volume.gen.world, seed: s.seed, generatorVersion: s.volume.gen.version, savedAt: Date.now(), player: { x: s.body.x, y: s.body.y, z: s.body.z, yaw: s.yaw, pitch: s.pitch }, selected: s.selected, time: s.time, days: s.days, ...hasWeather(s.volume.gen.world) ? { weather: weatherToData(s.weather) } : {}, inventory: { bag: s.inventory.toData(), collected: [...s.collected].sort() }, recipes: [...s.known].sort(), grants: s.grants.ember ? { ember: s.grants.ember } : void 0, drops: [...s.drops.values()].sort((a, b) => a.id < b.id ? -1 : 1), vitals: vitalsToData(s.vitals), ...s.respawn.size ? { respawn: Object.fromEntries(s.respawn) } : {}, ...s.spawn ? { spawn: s.spawn } : {}, ...s.chests.size ? { chests: Object.fromEntries([...s.chests].filter(([, c]) => !chestIsEmpty(c)).map(([k, c]) => [k, chestToData(c)])) } : {}, ...s.furnaces.size ? { furnaces: Object.fromEntries([...s.furnaces].map(([k, f]) => [k, furnaceToData(f)])) } : {}, ...s.regrow.size ? { regrow: Object.fromEntries([...s.regrow].map(([id, t]) => [id, Math.round(t * 10) / 10])) } : {}, ...s.crops.size ? { crops: Object.fromEntries([...s.crops.values()].map((c) => [cropKey(c.x, c.y, c.z), c.species === "junco" ? c.age : { s: c.species, a: c.age }])) } : {} };
}

// src/net/titan/protocol.ts
var TITAN_PROTOCOL_VERSION = 3;
var TITAN_MAX_PLAYERS = 10;
var TITAN_NAME_MIN = 2;
var TITAN_NAME_MAX = 16;
var TITAN_ROOMS = [{ id: 101, name: "Tit\xE3 1", seed: 20261122 }];
var titanRoomById = (id) => TITAN_ROOMS.find((r) => r.id === id);
var num2 = (v, lim = 1e6) => typeof v === "number" && Number.isFinite(v) && Math.abs(v) <= lim;
var int = (v, lim = 1e6) => num2(v, lim) && Number.isInteger(v);
function sanitizeTitanName(text) {
  if (typeof text !== "string") return null;
  const t = text.trim().replace(/\s+/g, " ");
  return t.length >= TITAN_NAME_MIN && t.length <= TITAN_NAME_MAX && /^[\p{L}\p{N} _.-]+$/u.test(t) ? t : null;
}
function parseTitanState(v) {
  const s = v;
  if (!s || !num2(s.x) || !num2(s.y) || !num2(s.z) || !num2(s.yaw, 1e4) || !num2(s.pitch, 10) || !int(s.sel, 8) || s.sel < 0) return null;
  return { x: s.x, y: s.y, z: s.z, yaw: s.yaw, pitch: s.pitch, sel: s.sel };
}
function parseHit(v) {
  const h = v;
  if (!h || !int(h.x) || !int(h.y, 1e3) || !int(h.z) || !int(h.nx, 1) || !int(h.ny, 1) || !int(h.nz, 1)) return null;
  if (h.hy !== void 0 && (!num2(h.hy, 1) || h.hy < 0)) return null;
  if (h.item !== void 0 && (typeof h.item !== "string" || h.item.length > 40)) return null;
  return { x: h.x, y: h.y, z: h.z, nx: h.nx, ny: h.ny, nz: h.nz, ...h.hy !== void 0 ? { hy: h.hy } : {}, ...h.item !== void 0 ? { item: h.item } : {} };
}
function parseVitals(v) {
  const d = v;
  return d && num2(d.health, 100) && num2(d.hunger, 100) && num2(d.saturation, 100) && num2(d.air, 100) ? { health: d.health, hunger: d.hunger, saturation: d.saturation, air: d.air } : null;
}
function parseTitanAction(v) {
  const a = v;
  if (!a) return null;
  if (a.k === "place") {
    const hit = parseHit(a.hit);
    return hit && int(a.slot, 35) && a.slot >= 0 ? { k: "place", hit, slot: a.slot } : null;
  }
  if (a.k === "break") {
    const hit = parseHit(a.hit);
    return hit ? { k: "break", hit } : null;
  }
  const cell = int(a.x) && int(a.y, 1e3) && int(a.z);
  if (a.k === "use") return cell ? { k: "use", x: a.x, y: a.y, z: a.z } : null;
  const o = a;
  const xyz = { x: a.x, y: a.y, z: a.z };
  if (a.k === "chest" && cell) {
    if (o.op === "in" && int(o.slot, 35) && o.slot >= 0) return { k: "chest", ...xyz, op: "in", slot: o.slot };
    if (o.op === "out" && int(o.i, 17) && o.i >= 0) return { k: "chest", ...xyz, op: "out", i: o.i };
    return null;
  }
  if (a.k === "furnace" && cell) {
    const kinds = ["input", "fuel", "output"];
    if (o.op === "in" && (o.kind === "input" || o.kind === "fuel") && int(o.slot, 35) && o.slot >= 0) return { k: "furnace", ...xyz, op: "in", kind: o.kind, slot: o.slot };
    if (o.op === "out" && typeof o.kind === "string" && kinds.includes(o.kind)) return { k: "furnace", ...xyz, op: "out", kind: o.kind };
    return null;
  }
  if (a.k === "strike") return typeof o.id === "string" && o.id.length > 0 && o.id.length <= 20 ? { k: "strike", id: o.id } : null;
  if (a.k === "die") return { k: "die" };
  return null;
}
function parseTitanClientMessage(text) {
  if (text.length > 2e5) return null;
  let m;
  try {
    m = JSON.parse(text);
  } catch {
    return null;
  }
  if (!m || typeof m !== "object") return null;
  switch (m.t) {
    case "hello": {
      const name = sanitizeTitanName(m.name);
      return name && int(m.v, 1e3) && int(m.room, 1e6) ? { t: "hello", v: m.v, name, room: m.room } : null;
    }
    case "state": {
      const s = parseTitanState(m.s), v = m.v === void 0 ? void 0 : parseVitals(m.v);
      return s && (m.v === void 0 || v) ? { t: "state", s, ...v ? { v } : {} } : null;
    }
    case "act": {
      const a = parseTitanAction(m.a);
      return a && int(m.seq, 1e9) ? { t: "act", seq: m.seq, a } : null;
    }
    case "bag":
      return m.bag && typeof m.bag === "object" ? { t: "bag", bag: m.bag } : null;
    default:
      return null;
  }
}

// src/net/titan/room.ts
var TITAN_ROOM_REACH = 8;
var TITAN_PLAYERS_EVERY = 0.1;
var TITAN_TIME_EVERY = 30;
var TITAN_SNAPSHOT_VERSION = 1;
var TITAN_SIM_RADIUS = 56;
var TITAN_SHOW_RADIUS = 64;
var TITAN_CREATURES_EVERY = 0.1;
var TITAN_FURNACES_EVERY = 1;
var TITAN_STRIKE_REACH = ATTACK_REACH + 2;
function playerView(world, own) {
  const v = Object.create(world);
  Object.assign(v, own);
  for (const k of ["time", "days", "dropsRev", "metaRev", "collectedRev"]) {
    Object.defineProperty(v, k, { get: () => world[k], set: (x) => {
      world[k] = x;
    }, enumerable: true, configurable: true });
  }
  return v;
}
var TitanRoom = class {
  constructor(id, name, seed, rand = Math.random) {
    this.id = id;
    this.name = name;
    this.seed = seed;
    this.rand = rand;
    this.world = fresh(new TitanGenerator(seed));
    this.hook();
  }
  id;
  name;
  seed;
  rand;
  world;
  players = /* @__PURE__ */ new Map();
  saved = /* @__PURE__ */ new Map();
  nextId = 1;
  pending = [];
  lastDropsRev = 0;
  sincePlayers = 0;
  sinceTime = 0;
  sinceCreatures = 0;
  sinceFurnaces = 0;
  clock = 0;
  timeDirty = false;
  hook() {
    this.world.volume.onSet = (x, y, z, id) => {
      this.pending.push([x, y, z, id]);
    };
    this.lastDropsRev = this.world.dropsRev;
  }
  get playerCount() {
    return this.players.size;
  }
  /** Quantos jogadores há (o servidor lê `room.size`, como na `Room` do mundo principal). */
  get size() {
    return this.players.size;
  }
  /** Há algo novo para gravar em disco (o servidor grava quando `dirty`; `snapshot()` limpa). */
  dirty = false;
  playerNames() {
    return [...this.players.values()].map((p) => p.name);
  }
  viewOf(id) {
    return this.players.get(id)?.view;
  }
  info(p) {
    const b = p.view.body;
    return { id: p.id, name: p.name, x: b.x, y: b.y, z: b.z, yaw: p.view.yaw, pitch: p.view.pitch, sel: p.view.selected };
  }
  join(hello) {
    const err = (code, message) => ({ id: null, out: [{ to: 0, msg: { t: "error", code, message } }] });
    if (hello.v !== TITAN_PROTOCOL_VERSION) return err("version", "Vers\xE3o do jogo diferente da do servidor.");
    const name = sanitizeTitanName(hello.name);
    if (!name) return err("name", "Nome inv\xE1lido.");
    if (this.players.size >= TITAN_MAX_PLAYERS) return err("full", "Sala cheia.");
    if ([...this.players.values()].some((p2) => p2.name.toLowerCase() === name.toLowerCase())) return err("name", "J\xE1 h\xE1 algu\xE9m com esse nome na sala.");
    const sv = this.saved.get(name.toLowerCase()), a = this.world.volume.gen.arrival;
    const inventory = sv ? Inventory.fromData(sv.bag) : Inventory.starting();
    const view = playerView(this.world, {
      body: newBody(sv?.x ?? a.x, sv?.y ?? a.y, sv?.z ?? a.z),
      yaw: sv?.yaw ?? a.yaw,
      pitch: sv?.pitch ?? -0.12,
      selected: sv?.sel ?? 0,
      inventory,
      vitals: sv ? vitalsFromData(sv.vitals) : newVitals(),
      spawn: sv?.spawn ?? null,
      known: new Set(sv?.known ?? [])
    });
    const p = { id: this.nextId++, name, view, moved: false, struckAt: -1e9, bed: null };
    this.players.set(p.id, p);
    const header = headerOf(this.world);
    const chunks = this.world.volume.dirtyChunks().map(({ cx, cz, edits }) => ({ cx, cz, edits }));
    const me = this.info(p);
    return { id: p.id, out: [
      { to: p.id, msg: { t: "welcome", id: p.id, header, chunks, players: [...this.players.values()].filter((o) => o !== p).map((o) => this.info(o)), you: { x: me.x, y: me.y, z: me.z, yaw: me.yaw, pitch: me.pitch, sel: me.sel, bag: inventory.toData(), vitals: vitalsToData(view.vitals), spawn: view.spawn } } },
      { to: { except: p.id }, msg: { t: "joined", p: me } }
    ] };
  }
  leave(id) {
    const p = this.players.get(id);
    if (!p) return [];
    this.keep(p);
    this.dirty = true;
    this.players.delete(id);
    const rest = [...this.players.values()];
    if (rest.length && rest.every((o) => o.bed) && canSleep(this.world.time, isRaining(this.world))) {
      const o = rest[0];
      useBed(o.view, o.bed.x, o.bed.y, o.bed.z, true);
      for (const q of rest) q.bed = null;
      this.timeDirty = true;
    }
    return [{ to: "all", msg: { t: "left", id } }];
  }
  keep(p) {
    const b = p.view.body;
    this.saved.set(p.name.toLowerCase(), { x: b.x, y: b.y, z: b.z, yaw: p.view.yaw, pitch: p.view.pitch, sel: p.view.selected, bag: p.view.inventory.toData(), vitals: vitalsToData(p.view.vitals), spawn: p.view.spawn, known: [...p.view.known] });
  }
  handle(id, m) {
    const p = this.players.get(id);
    if (!p) return [];
    switch (m.t) {
      case "state": {
        const b = p.view.body, s = m.s;
        if (!this.world.volume.gen.inRegion(Math.floor(s.x), Math.floor(s.z))) return [];
        b.x = s.x;
        b.y = s.y;
        b.z = s.z;
        p.view.yaw = s.yaw;
        p.view.pitch = s.pitch;
        p.view.selected = s.sel;
        p.moved = true;
        if (m.v) {
          const q = p.view.vitals, c = (x, max) => Math.min(max, Math.max(0, x));
          q.health = c(m.v.health, q.maxHealth);
          q.hunger = c(m.v.hunger, q.maxHunger);
          q.saturation = Math.min(q.hunger, c(m.v.saturation, q.maxHunger));
          q.air = c(m.v.air, q.maxAir);
        }
        if (p.bed && Math.hypot(b.x - (p.bed.x + 0.5), b.z - (p.bed.z + 0.5)) > 3) p.bed = null;
        return [];
      }
      case "bag": {
        p.view.inventory = Inventory.fromData(m.bag);
        this.dirty = true;
        return [];
      }
      case "act":
        return this.act(p, m.seq, m.a);
      default:
        return [];
    }
  }
  act(p, seq, a) {
    const v = p.view, b = v.body, out = [];
    const cell = "hit" in a ? a.hit : "x" in a ? a : null;
    let r = { ok: false, msg: "Longe demais" };
    const near = !cell || Math.hypot(cell.x + 0.5 - b.x, cell.y + 0.5 - (b.y + EYE_HEIGHT), cell.z + 0.5 - b.z) <= TITAN_ROOM_REACH;
    if (near) {
      r = { ok: false };
      switch (a.k) {
        case "place":
          r = placeFromSlot(v, a.hit, a.slot);
          break;
        case "break":
          r = breakOrCollect(v, a.hit);
          break;
        case "use":
          r = this.useCell(p, a.x, a.y, a.z);
          break;
        case "chest": {
          r = a.op === "in" ? chestMoveIn(v, a.x, a.y, a.z, a.slot) : chestTakeOut(v, a.x, a.y, a.z, a.i);
          const c = chestAt(v, a.x, a.y, a.z);
          if (c) out.push({ to: "all", msg: { t: "chest", key: `${a.x},${a.y},${a.z}`, data: chestToData(c) } });
          break;
        }
        case "furnace": {
          r = a.op === "in" ? furnaceMoveIn(v, a.x, a.y, a.z, a.kind, a.slot) : furnaceTakeOut(v, a.x, a.y, a.z, a.kind);
          out.push(this.furnacesMsg());
          break;
        }
        case "strike":
          r = this.strike(p, a.id);
          break;
        case "die":
          r = this.die(p, out);
          break;
      }
    }
    this.dirty = true;
    return [{ to: p.id, msg: { t: "applied", seq, ok: r.ok, ...r.msg ? { msg: r.msg } : {}, ...r.open !== void 0 ? { open: r.open } : {}, bag: v.inventory.toData() } }, ...out, ...this.flush()];
  }
  /** Porta abre/fecha; cama marca o ponto de retorno e, à noite, a noite só passa quando **todos** da sala estão na cama (o relógio é de todos). */
  useCell(p, x, y, z) {
    const id = this.world.volume.get(x, y, z);
    if (isDoor(id)) return useDoor(p.view, x, y, z);
    if (!isBed(id)) return { ok: false };
    const r = useBed(p.view, x, y, z, false);
    if (!canSleep(this.world.time, isRaining(this.world))) return r;
    p.bed = { x, y, z };
    const asleep = [...this.players.values()].filter((o) => o.bed).length, total = this.players.size;
    if (asleep < total) return { ok: true, msg: `Na cama: ${asleep} de ${total}. A noite passa quando todos dormirem.` };
    const w = useBed(p.view, x, y, z, true);
    for (const o of this.players.values()) o.bed = null;
    this.timeDirty = true;
    return { ok: true, msg: w.msg };
  }
  /** Golpe num Farejador pelo id: alcance, pausa entre golpes (0,6 s por jogador) e as regras de `titan/combat.ts`. */
  strike(p, id) {
    const idx = this.world.creatures.findIndex((c) => c.id === id), f = this.world.creatures[idx], b = p.view.body;
    if (!f) return { ok: false };
    if (Math.hypot(f.body.x - b.x, f.body.y - (b.y + EYE_HEIGHT), f.body.z - b.z) > TITAN_STRIKE_REACH) return { ok: false, msg: "Longe demais" };
    if (this.clock - p.struckAt < ATTACK_COOLDOWN_S - 0.05) return { ok: false };
    p.struckAt = this.clock;
    const r = attackCreature(p.view, idx);
    this.sinceCreatures = TITAN_CREATURES_EVERY;
    return { ok: r.ok, ...r.msg ? { msg: r.msg } : {} };
  }
  /** Morte: só vale com a vida zerada no último `state`; solta as pilhas, renasce e manda o renascer. */
  die(p, out) {
    if (!isDead(p.view.vitals)) return { ok: false, msg: "Ainda vivo" };
    dieAndRespawn(p.view);
    p.bed = null;
    const b = p.view.body;
    out.push({ to: p.id, msg: { t: "respawn", x: b.x, y: b.y, z: b.z, yaw: p.view.yaw, vitals: vitalsToData(p.view.vitals) } });
    return { ok: true };
  }
  furnacesMsg() {
    return { to: "all", msg: { t: "furnaces", data: Object.fromEntries([...this.world.furnaces].map(([k, f]) => [k, furnaceToData(f)])) } };
  }
  wire(f) {
    const r = (n) => Math.round(n * 1e3) / 1e3;
    return { id: f.id, kind: f.kind, x: r(f.body.x), y: r(f.body.y), z: r(f.body.z), vx: r(f.body.vx), vz: r(f.body.vz), yaw: r(f.yaw), phase: f.phase, t: r(f.t), hp: f.hp, hurt: r(f.hurt), clock: r(f.clock), aggro: r(f.aggro) };
  }
  /** Repassa o que mudou no mundo (células editadas e itens soltos) a todos os jogadores. */
  flush() {
    const out = [];
    if (this.pending.length) {
      out.push({ to: "all", msg: { t: "edits", cells: this.pending } });
      this.pending = [];
    }
    if (this.world.dropsRev !== this.lastDropsRev) {
      this.lastDropsRev = this.world.dropsRev;
      out.push({ to: "all", msg: { t: "drops", drops: [...this.world.drops.values()] } });
    }
    return out;
  }
  tick(dt) {
    const w = this.world, out = [];
    const before = w.time;
    w.time = advanceDay(w.time, dt);
    if (w.time < before) w.days++;
    if (tickWeather(w, dt, this.rand)) {
      this.timeDirty = true;
      this.dirty = true;
    }
    this.clock += dt;
    if (tickFurnaces(w, dt)) this.dirty = true;
    if (tickRegrow(w, dt)) this.dirty = true;
    stepDrops(w, dt);
    const n = Math.max(1, this.players.size);
    for (const p of this.players.values()) {
      const b = p.view.body;
      if (tickCrops(w, dt / n, this.rand, { x: b.x, z: b.z })) this.dirty = true;
      const c = collectNearby(p.view, b.x, b.y, b.z, dt);
      if (c.collected) this.dirty = true;
      if (c.collected) out.push({ to: p.id, msg: { t: "bag", bag: p.view.inventory.toData() } });
    }
    tickRespawn(w, dt);
    const list = [...this.players.values()];
    if (list.length) {
      for (const f of w.creatures) {
        let near = null, nd = Infinity;
        for (const p of list) {
          const d = Math.hypot(f.body.x - p.view.body.x, f.body.z - p.view.body.z);
          if (d < nd) {
            nd = d;
            near = p;
          }
        }
        if (!near || f.phase === "wander" && nd > TITAN_SIM_RADIUS) continue;
        const ev = stepFarejador(f, w.volume, { x: near.view.body.x, y: near.view.body.y, z: near.view.body.z }, dt);
        if (ev.hit) out.push({ to: near.id, msg: { t: "hurt", damage: ev.damage, kind: f.kind } });
      }
    }
    this.sinceCreatures += dt;
    this.sinceFurnaces += dt;
    if (this.sinceCreatures >= TITAN_CREATURES_EVERY && list.length) {
      this.sinceCreatures = 0;
      const shown = w.creatures.filter((f) => list.some((p) => Math.hypot(f.body.x - p.view.body.x, f.body.z - p.view.body.z) <= TITAN_SHOW_RADIUS));
      out.push({ to: "all", msg: { t: "creatures", list: shown.map((f) => this.wire(f)) } });
    }
    if (this.sinceFurnaces >= TITAN_FURNACES_EVERY && w.furnaces.size) {
      this.sinceFurnaces = 0;
      out.push(this.furnacesMsg());
    }
    if (this.timeDirty) {
      this.timeDirty = false;
      out.push({ to: "all", msg: { t: "time", time: w.time, days: w.days, rain: isRaining(w) } });
    }
    this.sincePlayers += dt;
    this.sinceTime += dt;
    if (this.sincePlayers >= TITAN_PLAYERS_EVERY && this.players.size) {
      this.sincePlayers = 0;
      const moved = [...this.players.values()].filter((p) => p.moved);
      for (const p of moved) p.moved = false;
      if (moved.length) out.push({ to: "all", msg: { t: "players", list: moved.map((p) => this.info(p)) } });
    }
    if (this.sinceTime >= TITAN_TIME_EVERY) {
      this.sinceTime = 0;
      out.push({ to: "all", msg: { t: "time", time: w.time, days: w.days, rain: isRaining(w) } });
    }
    return [...out, ...this.flush()];
  }
  /** Estado para gravar: cabeçalho do mundo (mesmo formato do save local), chunks editados e os jogadores por nome (quem está na sala entra com o estado atual). */
  snapshot() {
    this.dirty = false;
    for (const p of this.players.values()) this.keep(p);
    return { v: TITAN_SNAPSHOT_VERSION, header: headerOf(this.world), chunks: this.world.volume.dirtyChunks().map(({ cx, cz, edits }) => ({ cx, cz, edits })), players: Object.fromEntries(this.saved) };
  }
  /** Restaura uma sala vazia a partir de um `snapshot`; devolve `false` (sem mudar nada) se a seed ou o gerador não batem. */
  restore(snap) {
    if (!snap || snap.v !== TITAN_SNAPSHOT_VERSION || !snap.header || snap.header.seed !== this.seed || this.players.size) return false;
    const gen = generatorFor(snap.header.seed, snap.header.generatorVersion);
    if (!gen) return false;
    this.world = resume(gen, { header: snap.header, chunks: snap.chunks });
    this.saved.clear();
    for (const [k, v] of Object.entries(snap.players ?? {})) this.saved.set(k, v);
    this.pending = [];
    this.hook();
    this.dirty = false;
    return true;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TITAN_MAX_PLAYERS,
  TITAN_PROTOCOL_VERSION,
  TITAN_ROOMS,
  TITAN_SNAPSHOT_VERSION,
  TitanRoom,
  parseTitanClientMessage,
  titanRoomById
});
