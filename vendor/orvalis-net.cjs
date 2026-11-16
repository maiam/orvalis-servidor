// Gerado por mundoblocos-2d v0.93.122 (4f229d6) — npm run build:net. NÃO EDITE: atualize pelo jogo.
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

// src/net/index.ts
var index_exports = {};
__export(index_exports, {
  MAX_PLAYERS: () => MAX_PLAYERS,
  PROTOCOL_VERSION: () => PROTOCOL_VERSION,
  ROOMS: () => ROOMS,
  ROOM_SNAPSHOT_VERSION: () => ROOM_SNAPSHOT_VERSION,
  Room: () => Room,
  parseClientMessage: () => parseClientMessage,
  roomById: () => roomById,
  sanitizeName: () => sanitizeName
});
module.exports = __toCommonJS(index_exports);

// src/config.ts
var import_meta = {};
var DAY_LENGTH_S = 480;
var DEFAULT_SUBDIV = 2;
function sanctuaryPage() {
  const fixed = import_meta.env?.VITE_WORLD;
  if (fixed) return fixed === "santuario";
  const parts = window.location.hostname.split(".");
  if (parts.length > 2 && parts[0].toLowerCase() === "santuario") return true;
  return new URLSearchParams(window.location.search).get("mundo")?.toLowerCase() === "santuario";
}
function gridSubdiv() {
  if (typeof window === "undefined") {
    const env = globalThis.process?.env?.ORVALIS_SUBDIV;
    return env === "1" ? 1 : env === "2" ? 2 : DEFAULT_SUBDIV;
  }
  if (sanctuaryPage()) return 1;
  const dev = !!import_meta.env?.DEV;
  if (!dev) return DEFAULT_SUBDIV;
  const g = new URLSearchParams(window.location.search).get("grade");
  return g === "1" ? 1 : g === "2" ? 2 : DEFAULT_SUBDIV;
}
var SUBDIV = gridSubdiv();
var TILE = 32;
var CUBE_FRONT = 18;
var CUBE_LEVELS = 4;
var MAX_STACK = CUBE_LEVELS;
var SANCTUARY_MAX_STACK = 5;
var STEP_HEIGHT = 1;
var CHUNK_SIZE = 16;
var UNLOAD_MARGIN = 3;

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

// src/world/blocks.ts
var Block = {
  AIR: 0,
  // --- só chão ---
  WATER: 6,
  /** Chão quebrado: ninguém pisa; só aceita um bloco novo (que vira piso). */
  HOLE: 8,
  /** Fora dos limites de um mundo limitado: céu aberto, intransponível. */
  VOID: 9,
  // --- materiais (prancha de blocos): cubos colocáveis que também formam o chão ---
  DIRT: 20,
  GRASS: 21,
  TILLED: 22,
  PATH: 23,
  SAND: 24,
  /** Pedra Bruta (pedra padrão do mundo). */
  STONE: 25,
  OAK_LOG: 26,
  OAK_PLANKS: 27,
  /** Madeira de cerejeira (v0.88.0): tora (da Cerejeira derrubada) e tábuas (da tora). */
  CHERRY_LOG: 230,
  CHERRY_PLANKS: 231,
  /** Madeira de bétula (v0.89.0): tora (da Bétula derrubada) e tábuas (da tora). */
  BIRCH_LOG: 232,
  BIRCH_PLANKS: 233,
  // --- paredes (ADR 0027, v0.93.15): bloco de nível único, sólido, altura de `WORLD_SCALE.wall`; forma por autotile (`world/walls.ts`) ---
  /** Parede de Tábuas (madeira; o machado quebra). Sem receita nem perfil ainda (arte e render vêm na W1/W3). */
  WALL_PLANKS: 240,
  /** Parede de Pedra (a picareta quebra). */
  WALL_STONE: 241,
  /** Porta de parede (v0.93.25): bloco dentro de uma fileira leste–oeste, entre duas paredes; o id guarda o estado (fechada sólida, aberta passável). */
  WALL_DOOR_PLANKS: 242,
  WALL_DOOR_PLANKS_OPEN: 243,
  // --- porta (objeto de 3 níveis de altura; o id guarda o estado) ---
  OAK_DOOR: 28,
  /** Porta aberta: mesma porta, passável. Só existe no mundo (a hotbar coloca a fechada). */
  OAK_DOOR_OPEN: 29,
  /** Tenda: ponto de renascer (criada por receita). */
  TENT: 30,
  /** Parte da tenda 2×2 (as 3 células além do canto inferior esquerdo, onde fica `TENT`): bloqueia, sem arte. */
  TENT_PART: 32,
  /** Baú de Carvalho: guarda 27 pilhas (conteúdo no World). */
  CHEST: 33,
  CACTUS: 31,
  // --- objetos de cozinha (por receita; cozinhar vem com a comida, Fase P entrega 4) ---
  /** Fogueira (3 Toras). */
  CAMPFIRE: 43,
  /** Caldeirão de Pedra (3 Pedras + 1 Fogueira). */
  CAULDRON: 44,
  /** Forno de Pedra (6 Pedras). */
  OVEN: 45,
  // --- móveis (por receita) ---
  /** Cadeira de Madeira (4 Tábuas). */
  CHAIR: 46,
  /** Pedregulho solto no mundo (arte da prancha de pedras, variante por célula); minerado solta Pedra Bruta. */
  ROCK_BOULDER: 47,
  // --- cerca de tábuas (por receita; o render emenda cada célula com as cercas/portões vizinhos) ---
  /** Cerca de Madeira: bloqueia a passagem (cercados para animais). */
  FENCE: 48,
  /** Portão da cerca, fechado (o id guarda o estado, como a porta). */
  FENCE_GATE: 49,
  /** Portão aberto: passável. Só existe no mundo (a bolsa coloca o fechado). */
  FENCE_GATE_OPEN: 76,
  /** Portões de Bétula e de Cerejeira (v0.93.99), fechado e aberto: o mesmo portão do Carvalho (`FENCE_GATE`) com a madeira da cerca. */
  FENCE_GATE_BIRCH: 77,
  FENCE_GATE_BIRCH_OPEN: 78,
  FENCE_GATE_CHERRY: 79,
  FENCE_GATE_CHERRY_OPEN: 99,
  // --- variações de pedra (prancha de pedras; por receita ou, no futuro, em construções prontas) ---
  STONE_COBBLE: 34,
  STONE_BRICK: 35,
  STONE_FLOOR: 36,
  STONE_SMOOTH: 37,
  STONE_POLISHED: 38,
  STONE_CRACKED: 39,
  STONE_BRICK_CRACKED: 42,
  // --- árvores (objeto alto) ---
  OAK_TREE: 40,
  SAKURA_TREE: 41,
  /** Bétula (v0.89.0): mistura-se aos carvalhos dos Campos. */
  BIRCH_TREE: 59,
  // --- estágios de crescimento APOSENTADOS (v0.88.0: as árvores só aparecem adultas): ids reservados, ver `GROWTH_STAGE_ADULT` ---
  OAK_SAPLING: 52,
  OAK_YOUNG: 53,
  OAK_GROWING: 54,
  APPLE_SAPLING: 55,
  APPLE_YOUNG: 56,
  /** Macieira adulta com maçãs (tocar colhe). */
  APPLE_TREE: 57,
  /** Macieira adulta já colhida: florida, as maçãs voltam com o tempo. */
  APPLE_TREE_BARE: 58,
  // --- enfeites (não bloqueiam passagem) ---
  TALL_GRASS: 50,
  FLOWER: 51,
  // --- dungeon (área protegida: nada quebra nem é colocado) ---
  DUNGEON_DIRT: 100,
  DUNGEON_WEB: 101,
  DUNGEON_BONES: 102,
  DUNGEON_MOSS: 103,
  /** Montanha da muralha (sprite grande; bloqueia). */
  DUNGEON_MOUNTAIN: 104,
  DUNGEON_ROCK: 105,
  DUNGEON_EGGS: 106,
  DUNGEON_MUSHROOM: 107,
  DUNGEON_SPIKES: 108,
  DUNGEON_ROOTS: 109,
  /** Parede do labirinto: cubo de pedra escura (variantes por célula). */
  DUNGEON_WALL: 110,
  /** Entrada do Covil das Aranhas no mundo (arte da caverna; base 5 × 3, as outras células são `TOWN_PART`). */
  DUNGEON_CAVE: 111,
  // --- Cidade do Despertar (área protegida: construções fixas, nada quebra nem é colocado) ---
  /** Célula ocupada por uma construção além do canto inferior esquerdo (onde fica o id dela): bloqueia, sem arte. */
  TOWN_PART: 120,
  CASTLE: 121,
  GUILD: 122,
  /** Floricultura (v0.93.110): 9×5, a oeste da Praça Central, abaixo da Guilda; o cômodo é `FLORIST_INTERIOR`. */
  FLORIST: 130,
  INN: 123,
  SMITHY: 124,
  SHOP_POTION: 125,
  SHOP_GOODS: 126,
  SHOP_TOOLS: 127,
  /** Casa térrea 5×5 (a última fileira fica livre: quintal atrás do telhado). */
  HOUSE: 128,
  /** Casa de 2 andares 5×5. */
  HOUSE_TALL: 129,
  WATCHTOWER: 132,
  WELL: 133,
  FOUNTAIN: 134,
  LAMP: 135,
  /** Banco de madeira 2×1 e 3×1. */
  BENCH: 136,
  BENCH_LONG: 142,
  BARREL: 137,
  CRATES: 138,
  SIGNPOST: 139,
  HEDGE: 140,
  STALL: 141,
  // --- Vila Camponesa (v0.93.89, `docs/domains/village.md`; só no Mundo principal, área protegida). Todos `building`: o id fica na célula do
  //     canto inferior esquerdo da peça e o resto do lote é `TOWN_PART` (`world/village.ts`, `VILLAGE_SIZES`). ---
  V_HOUSE_STRAW: 112,
  V_HOUSE_TILE: 113,
  V_BARN: 114,
  V_COOP: 115,
  V_WELL: 116,
  V_BENCH: 117,
  V_BED_WHEAT: 118,
  V_BED_VEG: 119,
  V_OAK: 143,
  V_TREE: 144,
  /** Estaca alta do muro da vila: 1 célula de largura (4 estacas) × 1,5 de altura (16 × 24 px); só o gerador a põe. */
  V_STAKE: 145,
  /** Portão aberto (duas colunas com lampião; o vão entre elas fica livre). */
  V_GATE: 209,
  V_BARREL: 226,
  V_ROCKS: 227,
  V_BUSH: 228,
  V_LOGS: 229,
  V_HAY: 234,
  V_CART: 235,
  V_SACKS: 236,
  /** Capim e flores (enfeite que não bloqueia). */
  V_FLOWERS: 237,
  /** Portão da vila fechado (os dois postes e as folhas). Abre e fecha com um toque; os 8 blocos da peça mudam juntos (`World.toggleDoor`). */
  V_GATE_CLOSED: 238,
  /** Os 6 blocos do vão entre os postes: livres com o portão aberto, sólidos com ele fechado (sem arte própria: o desenho é do portão). */
  V_GATE_GAP: 239,
  V_GATE_GAP_CLOSED: 254,
  /** Cerca de Bétula e de Cerejeira (v0.93.96): a mesma cerca de estacas do Carvalho (`FENCE`), com outra madeira; emendam entre si e com o portão. */
  FENCE_BIRCH: 245,
  FENCE_CHERRY: 248,
  /**
   * As 15 Flores Fofas (v0.93.110): enfeites que a Floricultura vende e o jogador coloca no chão — só visual, sem efeito. Ids soltos em faixas livres
   * (10–19, 146–149 e 249); a ordem é a da lista do dono do produto (`FLOWER_BLOCKS`), a mesma dos 15 quadros de `flowers.webp`.
   */
  FLOWER_HONEY: 10,
  FLOWER_BELL: 11,
  FLOWER_PEACH: 12,
  FLOWER_SNOW: 13,
  FLOWER_POM: 14,
  FLOWER_TULIP: 15,
  FLOWER_LANTERN: 16,
  FLOWER_SHELL: 17,
  FLOWER_BOW: 18,
  FLOWER_ROSE: 19,
  FLOWER_MOON: 146,
  FLOWER_STRAWBERRY: 147,
  FLOWER_CORAL: 148,
  FLOWER_SAPPHIRE: 149,
  FLOWER_VANILLA: 249,
  /** Cerca de Estacas (v0.93.90): 1 célula × 1 de altura (16 × 16 px), 4 estacas; o jogador fabrica (1 Tora → 4) e coloca. */
  FENCE_STAKE: 244,
  /** Vitória-régia comum (folha ou flor; 4 variantes): enfeite sobre a água rasa de rios e lagos, não bloqueia (a água não se pisa). */
  WATER_LILY: 246,
  /** Vitória-régia gigante de borda levantada (4 variantes): idem, maior. */
  VICTORIA: 247,
  // --- plantação de trigo: 16 estágios consecutivos (60 = semente ... 75 = maduro) ---
  WHEAT_0: 60,
  WHEAT_15: 75,
  // --- hortaliças: 16 estágios consecutivos cada (plantadas pelo próprio legume; ver CROPS) ---
  POTATO_0: 150,
  TOMATO_0: 170,
  CARROT_0: 190,
  // --- Santuário Celestial (prancha "Blocos do Mundo Celestial") ---
  CLOUD_SOLID: 80,
  CLOUD_ETHEREAL: 81,
  MARBLE_CELESTIAL: 82,
  MARBLE_ORNATE: 83,
  STONE_CELESTIAL: 84,
  STONE_GOLDEN: 85,
  GRASS_CELESTIAL: 86,
  GRASS_FLOWERY: 87,
  MOSS_LUMINOUS: 88,
  EARTH_SACRED: 89,
  EARTH_FLORAL: 90,
  EARTH_CULTIVATED: 91,
  WATER_SACRED: 92,
  WATER_CRYSTAL: 93,
  /** Água Pura: bloco 3D azul com textura aquática em todas as faces; exclusivo do Santuário. */
  WATER_PURE: 98,
  CRYSTAL_LIFE: 94,
  LIGHT_BLOCK: 95,
  WOOD_CELESTIAL: 96,
  FOLIAGE_GOLDEN: 97
};
var WHEAT_STAGES = 16;
var WHEAT_FIRST = 60;
function isWheat(id) {
  return id >= WHEAT_FIRST && id < WHEAT_FIRST + WHEAT_STAGES;
}
function wheatStage(id) {
  return id - WHEAT_FIRST;
}
var CROP_STAGES = 16;
var CROPS = {
  wheat: { first: WHEAT_FIRST, name: "Trigo", ripe: "Trigo Maduro" },
  potato: { first: Block.POTATO_0, name: "Batata", ripe: "Batata Madura" },
  tomato: { first: Block.TOMATO_0, name: "Tomate", ripe: "Tomate Maduro" },
  carrot: { first: Block.CARROT_0, name: "Cenoura", ripe: "Cenoura Madura" }
};
var CROP_KINDS = Object.keys(CROPS);
function cropKind(id) {
  for (const k of CROP_KINDS) if (id >= CROPS[k].first && id < CROPS[k].first + CROP_STAGES) return k;
  return null;
}
function isCrop(id) {
  return cropKind(id) !== null;
}
function cropStage(id) {
  return id - CROPS[cropKind(id)].first;
}
function cropId(kind, stage) {
  return CROPS[kind].first + Math.max(0, Math.min(CROP_STAGES - 1, stage));
}
function isCropSeedling(id) {
  return CROP_KINDS.some((k) => CROPS[k].first === id);
}
var ground = (id, name, extra = {}) => ({
  id,
  name,
  layer: "ground",
  shape: "flat",
  solid: false,
  standable: true,
  liquid: false,
  breakable: true,
  placeable: false,
  glow: false,
  organic: null,
  soft: false,
  stone: false,
  ...extra
});
var FLOWER_NAMES = [
  [Block.FLOWER_HONEY, "Margarida de Mel"],
  [Block.FLOWER_BELL, "Sininho de Orvalho"],
  [Block.FLOWER_PEACH, "Cora\xE7\xE3o de P\xEAssego"],
  [Block.FLOWER_SNOW, "Estrelinha de Neve"],
  [Block.FLOWER_POM, "Pom-pom de Amora"],
  [Block.FLOWER_TULIP, "Tulipa de Suspiro"],
  [Block.FLOWER_LANTERN, "Lanterninha de Sol"],
  [Block.FLOWER_SHELL, "Conchinha do Lago"],
  [Block.FLOWER_BOW, "La\xE7o de Lavanda"],
  [Block.FLOWER_ROSE, "Rosinha de Nuvem"],
  [Block.FLOWER_MOON, "L\xEDrio de Lua"],
  [Block.FLOWER_STRAWBERRY, "Bot\xE3o de Morango"],
  [Block.FLOWER_CORAL, "Dan\xE7arina de Coral"],
  [Block.FLOWER_SAPPHIRE, "Chuvinha de Safira"],
  [Block.FLOWER_VANILLA, "Coroa de Baunilha"]
];
var FLOWER_BLOCKS = FLOWER_NAMES.map(([id]) => id);
function wildFlowerIndex(seed, x, y) {
  return Math.floor(hash2(seed, x * 7 + 3, y * 13 - 1) * FLOWER_BLOCKS.length);
}
var object = (id, name, extra = {}) => ({
  id,
  name,
  layer: "object",
  shape: "cube",
  solid: true,
  standable: false,
  liquid: false,
  breakable: true,
  placeable: true,
  glow: false,
  organic: null,
  soft: false,
  stone: false,
  ...extra
});
var REMOVED_BLOCK_FIRST = 210;
var REMOVED_BLOCK_LAST = 225;
function isRemovedBlock(id) {
  return id >= REMOVED_BLOCK_FIRST && id <= REMOVED_BLOCK_LAST || id >= PILOT_SLAB_FIRST && id <= PILOT_SLAB_LAST;
}
var PILOT_SLAB_FIRST = 250;
var PILOT_SLAB_LAST = 252;
function isStackBlock(id) {
  const d = blockDef(id);
  return d.layer === "object" && d.shape === "cube" && d.placeable;
}
function isRemovedStack(stack) {
  if (RETIRED_ITEMS.has(stack)) return true;
  const m = /^block:(\d+)$/.exec(stack);
  return m !== null && isRemovedBlock(Number(m[1]));
}
var defs = [
  { ...object(Block.AIR, "Vazio"), shape: "flat", solid: false, breakable: false, placeable: false },
  ground(Block.WATER, "\xC1gua", { liquid: true, standable: false, breakable: false }),
  ground(Block.HOLE, "Buraco", { standable: false, breakable: false }),
  ground(Block.VOID, "C\xE9u Aberto", { standable: false, breakable: false }),
  // Materiais: um único id serve de cubo (camada de objeto) e de chão (camada de chão).
  object(Block.DIRT, "Terra", { soft: true }),
  object(Block.GRASS, "Terra com Grama", { soft: true }),
  object(Block.TILLED, "Terra Arada", { soft: true }),
  object(Block.PATH, "Caminho de Terra", { soft: true }),
  object(Block.SAND, "Areia", { soft: true }),
  object(Block.STONE, "Pedra Bruta", { stone: true }),
  object(Block.STONE_COBBLE, "Pedra Irregular", { stone: true }),
  object(Block.STONE_BRICK, "Tijolo de Pedra", { stone: true }),
  object(Block.STONE_FLOOR, "Ch\xE3o de Pedra", { stone: true }),
  object(Block.STONE_SMOOTH, "Pedra Lisa", { stone: true }),
  object(Block.STONE_POLISHED, "Pedra Polida", { stone: true }),
  object(Block.STONE_CRACKED, "Pedra Rachada", { stone: true }),
  object(Block.STONE_BRICK_CRACKED, "Tijolo de Pedra Rachado", { stone: true }),
  object(Block.OAK_LOG, "Tora de Carvalho", { organic: "wood" }),
  object(Block.OAK_PLANKS, "T\xE1bua de Carvalho", { organic: "wood" }),
  object(Block.CHERRY_LOG, "Tora de Cerejeira", { organic: "wood" }),
  object(Block.CHERRY_PLANKS, "T\xE1bua de Cerejeira", { organic: "wood" }),
  object(Block.BIRCH_LOG, "Tora de B\xE9tula", { organic: "wood" }),
  object(Block.BIRCH_PLANKS, "T\xE1bua de B\xE9tula", { organic: "wood" }),
  // Porta: ocupa a célula inteira (nada empilha em cima); fechada bloqueia, aberta deixa passar.
  object(Block.WALL_PLANKS, "Parede de T\xE1buas", { shape: "wall", organic: "wood" }),
  object(Block.WALL_STONE, "Parede de Pedra", { shape: "wall", stone: true }),
  object(Block.WALL_DOOR_PLANKS, "Porta de Parede (T\xE1buas)", { shape: "wall-door", organic: "wood" }),
  object(Block.WALL_DOOR_PLANKS_OPEN, "Porta de Parede (T\xE1buas, aberta)", { shape: "wall-door", solid: false, placeable: false, organic: "wood" }),
  object(Block.OAK_DOOR, "Porta de Carvalho", { shape: "door", organic: "wood" }),
  object(Block.TENT, "Tenda", { shape: "rock", organic: "wood" }),
  // madeira: o machado quebra
  object(Block.TENT_PART, "Tenda", { shape: "rock", placeable: false, organic: "wood" }),
  object(Block.CHEST, "Ba\xFA de Carvalho", { shape: "rock", organic: "wood" }),
  object(Block.ROCK_BOULDER, "Pedregulho", { shape: "rock", placeable: false }),
  object(Block.CHAIR, "Cadeira de Madeira", { shape: "rock", organic: "wood", seat: true }),
  // madeira: o machado desmonta
  object(Block.CAMPFIRE, "Fogueira", { shape: "rock", organic: "wood", glow: true }),
  // madeira: o machado desmonta
  object(Block.CAULDRON, "Caldeir\xE3o de Pedra", { shape: "rock", stone: true, glow: true }),
  object(Block.OVEN, "Forno de Pedra", { shape: "rock", stone: true, glow: true }),
  object(Block.OAK_DOOR_OPEN, "Porta de Carvalho (aberta)", { shape: "door", solid: false, placeable: false, organic: "wood" }),
  // Cerca e portão: ocupam a célula (nada empilha em cima); madeira: o machado desmonta.
  object(Block.FENCE, "Cerca de Madeira", { shape: "fence", organic: "wood" }),
  object(Block.FENCE_BIRCH, "Cerca de B\xE9tula", { shape: "fence", organic: "wood" }),
  object(Block.FENCE_CHERRY, "Cerca de Cerejeira", { shape: "fence", organic: "wood" }),
  object(Block.FENCE_STAKE, "Cerca de Estacas", { shape: "building", organic: "wood" }),
  object(Block.FENCE_GATE, "Port\xE3o de Madeira", { shape: "fence", organic: "wood" }),
  object(Block.FENCE_GATE_OPEN, "Port\xE3o de Madeira (aberto)", { shape: "fence", solid: false, placeable: false, organic: "wood" }),
  object(Block.FENCE_GATE_BIRCH, "Port\xE3o de B\xE9tula", { shape: "fence", organic: "wood" }),
  object(Block.FENCE_GATE_BIRCH_OPEN, "Port\xE3o de B\xE9tula (aberto)", { shape: "fence", solid: false, placeable: false, organic: "wood" }),
  object(Block.FENCE_GATE_CHERRY, "Port\xE3o de Cerejeira", { shape: "fence", organic: "wood" }),
  object(Block.FENCE_GATE_CHERRY_OPEN, "Port\xE3o de Cerejeira (aberto)", { shape: "fence", solid: false, placeable: false, organic: "wood" }),
  object(Block.CACTUS, "Cacto", { placeable: false, organic: "plant" }),
  object(Block.OAK_TREE, "Carvalho", { shape: "tree", placeable: false, organic: "wood" }),
  object(Block.SAKURA_TREE, "Cerejeira", { shape: "tree", placeable: false, organic: "wood" }),
  object(Block.BIRCH_TREE, "B\xE9tula", { shape: "tree", placeable: false, organic: "wood" }),
  // Mudas são plantas (a enxada arranca); dali em diante, madeira.
  object(Block.OAK_SAPLING, "Muda de Carvalho", { shape: "tree", placeable: false, organic: "plant" }),
  object(Block.OAK_YOUNG, "Carvalho Jovem", { shape: "tree", placeable: false, organic: "wood" }),
  object(Block.OAK_GROWING, "Carvalho Jovem", { shape: "tree", placeable: false, organic: "wood" }),
  object(Block.APPLE_SAPLING, "Muda de Macieira", { shape: "tree", placeable: false, organic: "plant" }),
  object(Block.APPLE_YOUNG, "Macieira Jovem", { shape: "tree", placeable: false, organic: "wood" }),
  object(Block.APPLE_TREE, "Macieira", { shape: "tree", placeable: false, organic: "wood" }),
  object(Block.APPLE_TREE_BARE, "Macieira", { shape: "tree", placeable: false, organic: "wood" }),
  object(Block.TALL_GRASS, "Capim", { shape: "decoration", solid: false, placeable: false, organic: "plant" }),
  // As 15 Flores Fofas (v0.93.110): enfeite colocável e quebrável (volta como item), sem colisão e sem efeito algum além do visual.
  ...FLOWER_NAMES.map(([id, name]) => object(id, name, { shape: "decoration", solid: false, placeable: true, organic: "plant" })),
  object(Block.FLOWER, "Flor", { shape: "decoration", solid: false, placeable: false, organic: "plant" }),
  // Dungeon: chão e cenário fixos (inquebráveis; o World também protege a área inteira).
  ground(Block.DUNGEON_DIRT, "Ch\xE3o da Caverna", { breakable: false }),
  ground(Block.DUNGEON_WEB, "Ch\xE3o com Teia", { breakable: false }),
  ground(Block.DUNGEON_BONES, "Ch\xE3o com Ossos", { breakable: false }),
  ground(Block.DUNGEON_MOSS, "Ch\xE3o com Musgo", { breakable: false }),
  ...[
    [Block.DUNGEON_MOUNTAIN, "Montanha"],
    [Block.DUNGEON_ROCK, "Rocha"],
    [Block.DUNGEON_EGGS, "Ninho de Ovos"],
    [Block.DUNGEON_MUSHROOM, "Cogumelos"],
    [Block.DUNGEON_SPIKES, "Espinhos de Pedra"],
    [Block.DUNGEON_ROOTS, "Ra\xEDzes"],
    [Block.DUNGEON_WALL, "Parede da Caverna"]
  ].map(([id, name]) => object(id, name, { shape: "rock", breakable: false, placeable: false })),
  object(Block.DUNGEON_CAVE, "Covil das Aranhas", { shape: "building", breakable: false, placeable: false }),
  // Cidade do Despertar: construções (várias células) e enfeites fixos; o World protege a área inteira.
  object(Block.TOWN_PART, "Constru\xE7\xE3o", { shape: "building", breakable: false, placeable: false }),
  ...[
    [Block.CASTLE, "Castelo"],
    [Block.GUILD, "Guilda dos Aventureiros"],
    [Block.INN, "Hospedaria"],
    [Block.SMITHY, "Ferreiro"],
    [Block.FLORIST, "Floricultura"],
    [Block.SHOP_POTION, "Loja de Po\xE7\xF5es"],
    [Block.SHOP_GOODS, "Armaz\xE9m"],
    [Block.SHOP_TOOLS, "Loja de Ferramentas"],
    [Block.HOUSE, "Casa"],
    [Block.HOUSE_TALL, "Casa"],
    [Block.WATCHTOWER, "Guarita"],
    [Block.WELL, "Po\xE7o"],
    [Block.FOUNTAIN, "Fonte"],
    [Block.STALL, "Barraca"],
    [Block.BENCH, "Banco"],
    [Block.BENCH_LONG, "Banco"]
  ].map(([id, name]) => object(id, name, {
    shape: "building",
    breakable: false,
    placeable: false,
    seat: id === Block.BENCH || id === Block.BENCH_LONG
  })),
  ...[
    [Block.LAMP, "Poste de Luz"],
    [Block.BARREL, "Barril"],
    [Block.CRATES, "Caixotes"],
    [Block.SIGNPOST, "Placa"],
    [Block.HEDGE, "Cerca Viva"]
  ].map(([id, name]) => object(id, name, { shape: "building", breakable: false, placeable: false })),
  // Vila Camponesa: peças de várias células (como a cidade) e enfeites fixos; o World protege a área inteira.
  ...[
    [Block.V_HOUSE_STRAW, "Casa de Palha"],
    [Block.V_HOUSE_TILE, "Casa de Telhas"],
    [Block.V_BARN, "Celeiro"],
    [Block.V_COOP, "Galinheiro"],
    [Block.V_WELL, "Po\xE7o"],
    [Block.V_BENCH, "Banco"],
    [Block.V_BED_WHEAT, "Canteiro de Trigo"],
    [Block.V_BED_VEG, "Horta"],
    [Block.V_OAK, "Carvalho"],
    [Block.V_TREE, "\xC1rvore"],
    [Block.V_STAKE, "Pali\xE7ada"],
    [Block.V_GATE, "Port\xE3o da Vila"],
    [Block.V_BARREL, "Barril"],
    [Block.V_ROCKS, "Rochas"],
    [Block.V_BUSH, "Arbusto Florido"],
    [Block.V_LOGS, "Toras"],
    [Block.V_HAY, "Feno"],
    [Block.V_CART, "Carro\xE7a"],
    [Block.V_SACKS, "Sacos"]
  ].map(([id, name]) => object(id, name, { shape: "building", breakable: false, placeable: false, seat: id === Block.V_BENCH })),
  object(Block.V_GATE_CLOSED, "Port\xE3o da Vila (fechado)", { shape: "building", breakable: false, placeable: false }),
  object(Block.V_GATE_GAP, "Port\xE3o da Vila", { shape: "building", solid: false, breakable: false, placeable: false }),
  object(Block.V_GATE_GAP_CLOSED, "Port\xE3o da Vila (fechado)", { shape: "building", breakable: false, placeable: false }),
  object(Block.WATER_LILY, "Vit\xF3ria-r\xE9gia", { shape: "building", solid: false, breakable: false, placeable: false }),
  object(Block.VICTORIA, "Vit\xF3ria-r\xE9gia Gigante", { shape: "building", solid: false, breakable: false, placeable: false }),
  object(Block.V_FLOWERS, "Capim e Flores", { shape: "building", solid: false, breakable: false, placeable: false }),
  // Santuário Celestial: todos são cubos de construção (as águas são blocos sólidos decorativos).
  object(Block.CLOUD_SOLID, "Nuvem S\xF3lida"),
  object(Block.CLOUD_ETHEREAL, "Nuvem Et\xE9rea"),
  object(Block.MARBLE_CELESTIAL, "M\xE1rmore Celestial"),
  object(Block.MARBLE_ORNATE, "M\xE1rmore Ornamentado"),
  object(Block.STONE_CELESTIAL, "Pedra Celestial"),
  object(Block.STONE_GOLDEN, "Pedra Dourada"),
  object(Block.GRASS_CELESTIAL, "Grama Celestial"),
  object(Block.GRASS_FLOWERY, "Grama Florida"),
  object(Block.MOSS_LUMINOUS, "Musgo Luminoso", { glow: true }),
  object(Block.EARTH_SACRED, "Terra Sagrada"),
  object(Block.EARTH_FLORAL, "Terra Floral"),
  object(Block.EARTH_CULTIVATED, "Terra Cultivada"),
  object(Block.WATER_SACRED, "\xC1gua Sagrada"),
  object(Block.WATER_CRYSTAL, "\xC1gua Cristalina"),
  object(Block.WATER_PURE, "\xC1gua Pura"),
  object(Block.CRYSTAL_LIFE, "Cristal da Vida", { glow: true }),
  object(Block.LIGHT_BLOCK, "Bloco de Luz", { glow: true }),
  object(Block.WOOD_CELESTIAL, "Madeira Celestial"),
  object(Block.FOLIAGE_GOLDEN, "Folhagem Dourada"),
  // Plantações (trigo, batata, tomate, cenoura): não bloqueiam passagem, não aceitam nada por cima, só entram plantando.
  ...CROP_KINDS.flatMap((k) => Array.from({ length: CROP_STAGES }, (_, s) => object(CROPS[k].first + s, s === CROP_STAGES - 1 ? CROPS[k].ripe : `${CROPS[k].name} em crescimento`, {
    shape: "crop",
    solid: false,
    placeable: false,
    organic: "plant"
  })))
];
var BLOCKS = (() => {
  const table = [];
  for (const d of defs) table[d.id] = d;
  return table;
})();
function blockDef(id) {
  return BLOCKS[id] ?? BLOCKS[Block.AIR];
}
var ALL_BLOCK_IDS = defs.map((d) => d.id);
var RETIRED_STONES = [Block.STONE_COBBLE, Block.STONE_CRACKED, Block.STONE_BRICK_CRACKED];
var MATERIALS = [
  Block.DIRT,
  Block.GRASS,
  Block.TILLED,
  Block.PATH,
  Block.SAND,
  Block.STONE,
  Block.OAK_LOG,
  Block.OAK_PLANKS,
  // Variações de pedra (colunas 8+ do atlas, scripts/extract-stones.py).
  Block.STONE_COBBLE,
  Block.STONE_BRICK,
  Block.STONE_FLOOR,
  Block.STONE_SMOOTH,
  Block.STONE_POLISHED,
  Block.STONE_CRACKED,
  Block.STONE_BRICK_CRACKED,
  // Madeira de cerejeira (v0.88.0) e de bétula (v0.89.0): só no V2 (não há coluna no atlas antigo, que termina nas pedras).
  Block.CHERRY_LOG,
  Block.CHERRY_PLANKS,
  Block.BIRCH_LOG,
  Block.BIRCH_PLANKS
];
var CELESTIAL_BLOCKS = [
  Block.CLOUD_SOLID,
  Block.CLOUD_ETHEREAL,
  Block.MARBLE_CELESTIAL,
  Block.MARBLE_ORNATE,
  Block.STONE_CELESTIAL,
  Block.STONE_GOLDEN,
  Block.GRASS_CELESTIAL,
  Block.GRASS_FLOWERY,
  Block.MOSS_LUMINOUS,
  Block.EARTH_SACRED,
  Block.EARTH_FLORAL,
  Block.EARTH_CULTIVATED,
  Block.WATER_SACRED,
  Block.WATER_CRYSTAL,
  Block.CRYSTAL_LIFE,
  Block.LIGHT_BLOCK,
  Block.WOOD_CELESTIAL,
  Block.FOLIAGE_GOLDEN
];
var HOTBAR_BLOCKS = [
  ...MATERIALS,
  Block.OAK_DOOR,
  Block.TENT,
  Block.CHEST,
  Block.CAMPFIRE,
  Block.CAULDRON,
  Block.OVEN,
  Block.CHAIR,
  Block.FENCE,
  Block.FENCE_BIRCH,
  Block.FENCE_CHERRY,
  Block.FENCE_GATE,
  Block.FENCE_GATE_BIRCH,
  Block.FENCE_GATE_CHERRY,
  Block.FENCE_STAKE,
  ...FLOWER_BLOCKS
];
var GROWTH_STAGE_ADULT = {
  [Block.OAK_SAPLING]: Block.OAK_TREE,
  [Block.OAK_YOUNG]: Block.OAK_TREE,
  [Block.OAK_GROWING]: Block.OAK_TREE,
  [Block.APPLE_SAPLING]: Block.APPLE_TREE,
  [Block.APPLE_YOUNG]: Block.APPLE_TREE
};
function adultOfStage(id) {
  return GROWTH_STAGE_ADULT[id] ?? id;
}
var RETIRED_ITEMS = /* @__PURE__ */ new Set(["oak_sapling", "apple_sapling"]);
var TREE_NEXT = {
  [Block.APPLE_TREE_BARE]: Block.APPLE_TREE
};
function isGrowingTree(id) {
  return TREE_NEXT[id] !== void 0;
}
var WALL_BLOCKS = [Block.WALL_PLANKS, Block.WALL_STONE];
function isWall(id) {
  return blockDef(id).shape === "wall";
}
var WALL_DOOR_BLOCKS = [Block.WALL_DOOR_PLANKS];
function isWallDoor(id) {
  return blockDef(id).shape === "wall-door";
}
function isWallLike(id) {
  const s = blockDef(id).shape;
  return s === "wall" || s === "wall-door";
}
function isWaterPlant(id) {
  return id === Block.WATER_LILY || id === Block.VICTORIA;
}
function isDoor(id) {
  return id === Block.OAK_DOOR || id === Block.OAK_DOOR_OPEN;
}
function gateClosed(id) {
  switch (id) {
    case Block.FENCE_GATE:
    case Block.FENCE_GATE_OPEN:
      return Block.FENCE_GATE;
    case Block.FENCE_GATE_BIRCH:
    case Block.FENCE_GATE_BIRCH_OPEN:
      return Block.FENCE_GATE_BIRCH;
    case Block.FENCE_GATE_CHERRY:
    case Block.FENCE_GATE_CHERRY_OPEN:
      return Block.FENCE_GATE_CHERRY;
    default:
      return null;
  }
}
function isGateOpen(id) {
  return id === Block.FENCE_GATE_OPEN || id === Block.FENCE_GATE_BIRCH_OPEN || id === Block.FENCE_GATE_CHERRY_OPEN;
}
var TOGGLES = {
  [Block.OAK_DOOR]: Block.OAK_DOOR_OPEN,
  [Block.OAK_DOOR_OPEN]: Block.OAK_DOOR,
  [Block.WALL_DOOR_PLANKS]: Block.WALL_DOOR_PLANKS_OPEN,
  [Block.WALL_DOOR_PLANKS_OPEN]: Block.WALL_DOOR_PLANKS,
  [Block.FENCE_GATE]: Block.FENCE_GATE_OPEN,
  [Block.FENCE_GATE_OPEN]: Block.FENCE_GATE,
  [Block.FENCE_GATE_BIRCH]: Block.FENCE_GATE_BIRCH_OPEN,
  [Block.FENCE_GATE_BIRCH_OPEN]: Block.FENCE_GATE_BIRCH,
  [Block.FENCE_GATE_CHERRY]: Block.FENCE_GATE_CHERRY_OPEN,
  [Block.FENCE_GATE_CHERRY_OPEN]: Block.FENCE_GATE_CHERRY,
  [Block.V_GATE]: Block.V_GATE_CLOSED,
  [Block.V_GATE_CLOSED]: Block.V_GATE,
  [Block.V_GATE_GAP]: Block.V_GATE_GAP_CLOSED,
  [Block.V_GATE_GAP_CLOSED]: Block.V_GATE_GAP
};
function isOpenable(id) {
  return TOGGLES[id] !== void 0;
}
function toggled(id) {
  return TOGGLES[id] ?? null;
}
function isOpen(id) {
  return id === Block.OAK_DOOR_OPEN || isGateOpen(id) || id === Block.WALL_DOOR_PLANKS_OPEN || id === Block.V_GATE || id === Block.V_GATE_GAP;
}

// src/world/dungeon.ts
var WOLF_KINDS = ["wolf-brown", "wolf-gray", "wolf-white"];
function isWolf(kind) {
  return WOLF_KINDS.includes(kind);
}
var PERIMETER = 2;
var NODE = 6;
var BOSS_NODES = 3;
function inRect(r, x, y) {
  return x >= r.x0 && x <= r.x1 && y >= r.y0 && y <= r.y1;
}
var shift = (r, dx, dy) => ({ x0: r.x0 + dx, y0: r.y0 + dy, x1: r.x1 + dx, y1: r.y1 + dy });
function dungeonSize(seed) {
  return [96 + Math.floor(hash2(seed, 811, 3) * 13), 66 + Math.floor(hash2(seed, 812, 5) * 13)];
}
function buildMaze(seed, w, h, side) {
  const rand = mulberry32((seed ^ 1597463007) >>> 0);
  const ri = (n) => Math.floor(rand() * n);
  const gw = Math.floor((w - 2 * PERIMETER) / NODE);
  const gh = Math.floor((h - 2 * PERIMETER) / NODE);
  const node = (i, j) => j * gw + i;
  const floor = new Uint8Array(w * h);
  const carve = (x0, y0, x1, y1) => {
    for (let y = Math.max(0, Math.min(y0, y1)); y <= Math.min(h - 1, Math.max(y0, y1)); y++) {
      for (let x = Math.max(0, Math.min(x0, x1)); x <= Math.min(w - 1, Math.max(x0, x1)); x++) floor[y * w + x] = 1;
    }
  };
  const cellX = (i) => PERIMETER + i * NODE;
  const cellY = (j) => PERIMETER + j * NODE;
  const cx = new Int16Array(gw * gh);
  const cy = new Int16Array(gw * gh);
  const width = new Uint8Array(gw * gh);
  for (let j = 0; j < gh; j++) {
    for (let i = 0; i < gw; i++) {
      cx[node(i, j)] = cellX(i) + 3 + ri(3) - 1;
      cy[node(i, j)] = cellY(j) + 3 + ri(3) - 1;
      width[node(i, j)] = rand() < 0.4 ? 3 : 2;
    }
  }
  const horizontal = side === "west" || side === "east";
  const along = horizontal ? gh : gw;
  const entryK = 1 + ri(along - 2);
  const entry = side === "west" ? node(0, entryK) : side === "east" ? node(gw - 1, entryK) : side === "north" ? node(entryK, 0) : node(entryK, gh - 1);
  const bk = ri(along - BOSS_NODES + 1);
  const bi0 = side === "west" ? gw - BOSS_NODES : side === "east" ? 0 : bk;
  const bj0 = side === "north" ? gh - BOSS_NODES : side === "south" ? 0 : bk;
  const isBoss = (i, j) => i >= bi0 && i < bi0 + BOSS_NODES && j >= bj0 && j < bj0 + BOSS_NODES;
  const open3 = /* @__PURE__ */ new Map();
  const link = (a, b) => {
    if (!open3.has(a)) open3.set(a, /* @__PURE__ */ new Set());
    if (!open3.has(b)) open3.set(b, /* @__PURE__ */ new Set());
    open3.get(a).add(b);
    open3.get(b).add(a);
  };
  const neighbors = (n) => {
    const i = n % gw;
    const j = Math.floor(n / gw);
    const out = [];
    for (const [di, dj] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const ni = i + di;
      const nj = j + dj;
      if (ni >= 0 && nj >= 0 && ni < gw && nj < gh && !isBoss(ni, nj)) out.push(node(ni, nj));
    }
    return out;
  };
  const visited = new Uint8Array(gw * gh);
  const active = [entry];
  visited[entry] = 1;
  while (active.length) {
    const k = rand() < 0.75 ? active.length - 1 : ri(active.length);
    const cur = active[k];
    const next = neighbors(cur).filter((n2) => !visited[n2]);
    if (!next.length) {
      active.splice(k, 1);
      continue;
    }
    const n = next[ri(next.length)];
    visited[n] = 1;
    link(cur, n);
    active.push(n);
  }
  for (let n = 0; n < gw * gh; n++) {
    if (!visited[n]) continue;
    for (const m of neighbors(n)) if (m > n && !open3.get(n)?.has(m) && rand() < 0.09) link(n, m);
  }
  const chambersN = [];
  const target = Math.max(3, Math.round(gw * gh / 30));
  for (let t = 0; t < 200 && chambersN.length < target; t++) {
    const cw = 2 + ri(2);
    const ch = 2 + ri(2) * (cw === 2 ? 1 : 0);
    const i0 = ri(gw - cw + 1);
    const j0 = ri(gh - ch + 1);
    let ok = true;
    for (let j = j0 - 1; j <= j0 + ch && ok; j++) {
      for (let i = i0 - 1; i <= i0 + cw && ok; i++) {
        if (isBoss(i, j) || i >= 0 && j >= 0 && i < gw && j < gh && node(i, j) === entry) ok = false;
      }
    }
    for (const [a0, b0, a1, b1] of chambersN) if (i0 <= a1 + 1 && i0 + cw - 1 >= a0 - 1 && j0 <= b1 + 1 && j0 + ch - 1 >= b0 - 1) ok = false;
    if (!ok) continue;
    chambersN.push([i0, j0, i0 + cw - 1, j0 + ch - 1]);
    for (let j = j0; j < j0 + ch; j++) for (let i = i0; i < i0 + cw; i++) {
      if (i + 1 < i0 + cw) link(node(i, j), node(i + 1, j));
      if (j + 1 < j0 + ch) link(node(i, j), node(i, j + 1));
    }
  }
  const dist = new Int32Array(gw * gh).fill(-1);
  dist[entry] = 0;
  const q = [entry];
  for (let h0 = 0; h0 < q.length; h0++) {
    for (const m of open3.get(q[h0]) ?? []) if (dist[m] < 0) {
      dist[m] = dist[q[h0]] + 1;
      q.push(m);
    }
  }
  let best = null;
  for (let j = bj0; j < bj0 + BOSS_NODES; j++) {
    for (let i = bi0; i < bi0 + BOSS_NODES; i++) {
      for (const [di, dj] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const ni = i + di;
        const nj = j + dj;
        if (ni < 0 || nj < 0 || ni >= gw || nj >= gh || isBoss(ni, nj)) continue;
        const m = node(ni, nj);
        if (!best || dist[m] > dist[best[0]]) best = [m, node(i, j)];
      }
    }
  }
  const chambers = [];
  for (const [i0, j0, i1, j1] of chambersN) {
    const r = { x0: cellX(i0) + 1, y0: cellY(j0) + 1, x1: cellX(i1) + NODE - 1, y1: cellY(j1) + NODE - 1 };
    chambers.push(r);
  }
  for (let n = 0; n < gw * gh; n++) {
    const i = n % gw;
    const j = Math.floor(n / gw);
    if (isBoss(i, j) || !visited[n]) continue;
    const wd = width[n];
    carve(cx[n] - 1, cy[n] - 1, cx[n] - 2 + wd, cy[n] - 2 + wd);
    for (const m of open3.get(n) ?? []) {
      if (m < n) continue;
      const ww = Math.min(wd, width[m]);
      carve(cx[n] - 1, cy[n] - 1, cx[m] - 2 + ww, cy[n] - 2 + ww);
      carve(cx[m] - 1, cy[n] - 1, cx[m] - 2 + ww, cy[m] - 2 + ww);
    }
  }
  const notches = [];
  for (const r of chambers) {
    carve(r.x0, r.y0, r.x1, r.y1);
    for (let x = r.x0; x <= r.x1; x++) {
      for (const [y, out] of [[r.y0, r.y0 - 1], [r.y1, r.y1 + 1]]) {
        if (rand() < 0.22 && !floor[out * w + x] && !floor[out * w + x - 1] && !floor[out * w + x + 1]) notches.push([x, y]);
      }
    }
    for (let y = r.y0; y <= r.y1; y++) {
      for (const [x, out] of [[r.x0, r.x0 - 1], [r.x1, r.x1 + 1]]) {
        if (rand() < 0.22 && !floor[y * w + out] && !floor[(y - 1) * w + out] && !floor[(y + 1) * w + out]) notches.push([x, y]);
      }
    }
  }
  for (const [x, y] of notches) floor[y * w + x] = 0;
  const bossRoom = { x0: cellX(bi0) + 1, y0: cellY(bj0) + 1, x1: cellX(bi0 + BOSS_NODES - 1) + NODE - 1, y1: cellY(bj0 + BOSS_NODES - 1) + NODE - 1 };
  carve(bossRoom.x0, bossRoom.y0, bossRoom.x1, bossRoom.y1);
  const [mn, bn] = best;
  const bxn = bn % gw;
  const byn = Math.floor(bn / gw);
  const mxn = mn % gw;
  const myn = Math.floor(mn / gw);
  let bossDoor;
  if (mxn !== bxn) {
    const y = cy[mn] - 1;
    const xa = mxn < bxn ? cx[mn] : bossRoom.x1;
    const xb = mxn < bxn ? bossRoom.x0 : cx[mn];
    carve(xa, y, xb, y + 1);
    bossDoor = [mxn < bxn ? bossRoom.x0 - 1 : bossRoom.x1 + 1, y];
  } else {
    const x = cx[mn] - 1;
    const ya = myn < byn ? cy[mn] : bossRoom.y1;
    const yb = myn < byn ? bossRoom.y0 : cy[mn];
    carve(x, ya, x + 1, yb);
    bossDoor = [x, myn < byn ? bossRoom.y0 - 1 : bossRoom.y1 + 1];
  }
  const gate = [];
  const ex = cx[entry];
  const ey = cy[entry];
  if (horizontal) {
    const [xa, xb] = side === "west" ? [0, ex] : [ex, w - 1];
    carve(xa, ey - 1, xb, ey + 1);
    for (let d = 0; d < PERIMETER; d++) for (let k = -1; k <= 1; k++) gate.push([side === "west" ? d : w - 1 - d, ey + k]);
  } else {
    const [ya, yb] = side === "north" ? [0, ey] : [ey, h - 1];
    carve(ex - 1, ya, ex + 1, yb);
    for (let d = 0; d < PERIMETER; d++) for (let k = -1; k <= 1; k++) gate.push([ex + k, side === "north" ? d : h - 1 - d]);
  }
  const gateSet = new Set(gate.map(([x, y]) => y * w + x));
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const edge = x < PERIMETER || y < PERIMETER || x >= w - PERIMETER || y >= h - PERIMETER;
      if (edge && !gateSet.has(y * w + x)) floor[y * w + x] = 0;
    }
  }
  const inside = [ex, ey];
  const maze = { w, h, floor, side, gate, inside, chambers, bossRoom, bossDoor };
  const reach = floorDistances(maze, ex, ey);
  for (let i = 0; i < w * h; i++) if (floor[i] && reach[i] < 0) floor[i] = 0;
  return maze;
}
var PROPS = [
  Block.DUNGEON_ROCK,
  Block.DUNGEON_ROCK,
  Block.DUNGEON_ROCK,
  Block.DUNGEON_EGGS,
  Block.DUNGEON_MUSHROOM,
  Block.DUNGEON_SPIKES,
  Block.DUNGEON_ROOTS
];
var FLOOR_PER_SMALL = 110;
var FLOOR_PER_BIG = 320;
function floorDistances(m, sx, sy) {
  const d = new Int32Array(m.w * m.h).fill(-1);
  d[sy * m.w + sx] = 0;
  const q = [sy * m.w + sx];
  for (let h = 0; h < q.length; h++) {
    const i = q[h];
    const x = i % m.w;
    const y = Math.floor(i / m.w);
    for (const [nx, ny] of [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]]) {
      if (nx < 0 || ny < 0 || nx >= m.w || ny >= m.h) continue;
      const k = ny * m.w + nx;
      if (m.floor[k] && d[k] < 0) {
        d[k] = d[i] + 1;
        q.push(k);
      }
    }
  }
  return d;
}
function decorateDungeon(seed, m, x0, y0) {
  const { w, h } = m;
  const ground2 = new Uint8Array(w * h);
  const objects = new Uint8Array(w * h);
  const idx = (x, y) => y * w + x;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = idx(x, y);
      const r = hash2(seed, x * 3 + 101, y * 5 - 77);
      ground2[i] = r < 0.84 ? Block.DUNGEON_DIRT : r < 0.92 ? Block.DUNGEON_MOSS : r < 0.97 ? Block.DUNGEON_WEB : Block.DUNGEON_BONES;
      if (m.floor[i]) continue;
      const outer = x === 0 || y === 0 || x === w - 1 || y === h - 1;
      ground2[i] = Block.DUNGEON_DIRT;
      objects[i] = outer ? Block.DUNGEON_MOUNTAIN : Block.DUNGEON_WALL;
    }
  }
  const [bhx, bhy] = [m.bossRoom.x0 + m.bossRoom.x1 >> 1, m.bossRoom.y0 + m.bossRoom.y1 >> 1];
  for (const r of [...m.chambers, m.bossRoom]) {
    for (let y = r.y0 + 2; y <= r.y1 - 2; y++) {
      for (let x = r.x0 + 2; x <= r.x1 - 2; x++) {
        if (!m.floor[idx(x, y)] || hash2(seed, x + 913, y - 211) > 0.12) continue;
        if (r === m.bossRoom && Math.hypot(x - bhx, y - bhy) < 5) continue;
        let lonely = true;
        for (let dy = -1; dy <= 1 && lonely; dy++) for (let dx = -1; dx <= 1; dx++) {
          if (!m.floor[idx(x + dx, y + dy)] || objects[idx(x + dx, y + dy)] !== Block.AIR) lonely = false;
        }
        if (lonely) objects[idx(x, y)] = PROPS[Math.floor(hash2(seed, x - 57, y + 389) * PROPS.length)];
      }
    }
  }
  const dist = floorDistances(m, m.inside[0], m.inside[1]);
  const free = [];
  for (let i = 0; i < w * h; i++) {
    const x = i % w;
    const y = Math.floor(i / w);
    if (m.floor[i] && objects[i] === Block.AIR && dist[i] >= 14 && !inRect(m.bossRoom, x, y)) free.push(i);
  }
  const want = [
    ...Array(Math.round(free.length / FLOOR_PER_BIG)).fill("spider-big"),
    ...Array(Math.round(free.length / FLOOR_PER_SMALL)).fill("spider-small")
  ];
  const spawns = [{ kind: "spider-boss", x: x0 + bhx + 0.5, y: y0 + bhy + 0.5 }];
  const taken = [];
  for (let n = 0; n < 2e4 && want.length && free.length; n++) {
    const i = free[Math.floor(hash2(seed, n, 4441) * free.length)];
    const x = i % w;
    const y = Math.floor(i / w);
    if (taken.some(([tx, ty]) => Math.abs(tx - x) + Math.abs(ty - y) < 4)) continue;
    taken.push([x, y]);
    spawns.push({ kind: want.shift(), x: x0 + x + 0.5, y: y0 + y + 0.5 });
  }
  const out = { north: [0, -1], south: [0, 1], west: [-1, 0], east: [1, 0] }[m.side];
  const c = m.gate[1];
  return {
    w,
    h,
    area: { x0, y0, x1: x0 + w - 1, y1: y0 + h - 1 },
    interior: { x0: x0 + PERIMETER, y0: y0 + PERIMETER, x1: x0 + w - 1 - PERIMETER, y1: y0 + h - 1 - PERIMETER },
    side: m.side,
    gate: m.gate.map(([x, y]) => [x0 + x, y0 + y]),
    doorstep: [x0 + c[0] + out[0], y0 + c[1] + out[1]],
    chambers: m.chambers.map((r) => shift(r, x0, y0)),
    bossRoom: shift(m.bossRoom, x0, y0),
    bossHome: [x0 + bhx, y0 + bhy],
    spawns,
    ground: ground2,
    objects
  };
}
function buildDungeon(seed, x0, y0, side, size = dungeonSize(seed)) {
  return decorateDungeon(seed, buildMaze(seed, size[0], size[1], side), x0, y0);
}
var DUNGEON_ORIGIN = [-1e5, -1e5];
var DUNGEON_RIM = 6 * SUBDIV;
var CAVE_MIN_CASTLE_DIST = 10 * CHUNK_SIZE * SUBDIV;
var CAVE_W = 5 * SUBDIV;
var CAVE_D = 3 * SUBDIV;
function upsampleDungeon(l, s) {
  if (s === 1) return l;
  const W = l.w * s;
  const H = l.h * s;
  const ground2 = new Uint8Array(W * H);
  const objects = new Uint8Array(W * H);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const j = Math.floor(y / s) * l.w + Math.floor(x / s);
      const i = y * W + x;
      ground2[i] = l.ground[j];
      const o = l.objects[j];
      if (o === Block.AIR) continue;
      if (o === Block.DUNGEON_MOUNTAIN || o === Block.DUNGEON_WALL || blockDef(o).shape === "cube") objects[i] = o;
      else if (x % s === 0 && y % s === s - 1) objects[i] = o;
    }
  }
  const sc = (r) => ({ x0: r.x0 * s, y0: r.y0 * s, x1: (r.x1 + 1) * s - 1, y1: (r.y1 + 1) * s - 1 });
  const pt = ([x, y]) => [x * s, y * s];
  return {
    w: W,
    h: H,
    area: sc(l.area),
    interior: sc(l.interior),
    side: l.side,
    gate: l.gate.map(pt),
    doorstep: pt(l.doorstep),
    chambers: l.chambers.map(sc),
    bossRoom: sc(l.bossRoom),
    bossHome: [l.bossHome[0] * s + (s >> 1), l.bossHome[1] * s + (s >> 1)],
    spawns: l.spawns.map((m) => ({ ...m, x: m.x * s, y: m.y * s })),
    ground: ground2,
    objects,
    scale: s
  };
}
function isolatedDungeon(seed) {
  return upsampleDungeon(buildDungeon(seed, DUNGEON_ORIGIN[0], DUNGEON_ORIGIN[1], "south"), SUBDIV);
}
function dungeonGuard(l) {
  return { x0: l.area.x0 - DUNGEON_RIM, y0: l.area.y0 - DUNGEON_RIM, x1: l.area.x1 + DUNGEON_RIM, y1: l.area.y1 + DUNGEON_RIM };
}
function dungeonEntry(l) {
  const c = l.gate[l.gate.length - 2];
  const inward = { north: [0, 1], south: [0, -1], west: [1, 0], east: [-1, 0] }[l.side];
  const s = l.scale ?? 1;
  return [c[0] + inward[0] * s, c[1] + inward[1] * s];
}
function isDungeonExit(l, x, y) {
  const s = l.scale ?? 1;
  return l.gate.slice(0, 3).some(([gx, gy]) => x >= gx && x < gx + s && y >= gy && y < gy + s);
}
function caveAt(x, y) {
  const footprint = { x0: x, y0: y - CAVE_D + 1, x1: x + CAVE_W - 1, y1: y };
  const outside = [x + (CAVE_W / SUBDIV >> 1) * SUBDIV, y + 1];
  return {
    x,
    y,
    footprint,
    outside,
    guard: { x0: footprint.x0 - SUBDIV, y0: footprint.y0 - SUBDIV, x1: footprint.x1 + SUBDIV, y1: footprint.y1 },
    front: { x0: outside[0] - 2 * SUBDIV, y0: outside[1], x1: outside[0] + 3 * SUBDIV - 1, y1: outside[1] + 3 * SUBDIV - 1 }
  };
}
function planCave(base, castle, avoid) {
  const seed = base.seed;
  const a0 = hash2(seed, 7001, 3) * Math.PI * 2;
  const overlaps = (r) => !!avoid && r.x0 <= avoid.x1 && r.x1 >= avoid.x0 && r.y0 <= avoid.y1 && r.y1 >= avoid.y0;
  let fallback = null;
  for (let t = 0; t < 96; t++) {
    const a = a0 + t * 0.7;
    const dist = CAVE_MIN_CASTLE_DIST + (8 + hash2(seed, 7002, t) * 80 + Math.floor(t / 9) * 24) * SUBDIV;
    const ox = Math.round(castle[0] + Math.cos(a) * dist);
    const oy = Math.round(castle[1] + Math.sin(a) * dist);
    const cave = caveAt(ox - (CAVE_W >> 1), oy);
    if (Math.hypot(cave.outside[0] - castle[0], cave.outside[1] - castle[1]) < CAVE_MIN_CASTLE_DIST) continue;
    if (overlaps(cave.guard) || overlaps(cave.front)) continue;
    fallback ??= cave;
    let dry = true;
    for (const r of [cave.footprint, cave.front]) {
      for (let y = r.y0; y <= r.y1 && dry; y++) for (let x = r.x0; x <= r.x1 && dry; x++) if (base.groundAt(x, y) === Block.WATER) dry = false;
    }
    if (dry) return cave;
  }
  return fallback;
}
var DungeonTerrain = class {
  constructor(base, layout, cave = null) {
    this.base = base;
    this.layout = layout;
    this.cave = cave;
    this.guard = dungeonGuard(layout);
    const [dx, dy] = layout.doorstep;
    const s = layout.scale ?? 1;
    this.landing = layout.side === "north" || layout.side === "south" ? { x0: dx - s, y0: dy, x1: dx + 2 * s - 1, y1: dy + s - 1 } : { x0: dx, y0: dy - s, x1: dx + s - 1, y1: dy + 2 * s - 1 };
  }
  base;
  layout;
  cave;
  guard;
  landing;
  clearFront(c) {
    return { ground: blockDef(c.ground).liquid || c.ground === Block.HOLE ? Block.GRASS : c.ground, object: Block.AIR, upper: Block.AIR };
  }
  get seed() {
    return this.base.seed;
  }
  /** Célula sobreposta, ou null se for terreno base puro. `baseCell` só é calculada quando precisa. */
  overlay(x, y, baseCell) {
    const l = this.layout;
    if (inRect(l.area, x, y)) {
      const i = (y - l.area.y0) * l.w + (x - l.area.x0);
      return { ground: l.ground[i], object: l.objects[i], upper: Block.AIR };
    }
    if (inRect(this.guard, x, y)) {
      const floor = inRect(this.landing, x, y);
      return { ground: Block.DUNGEON_DIRT, object: floor ? Block.AIR : Block.DUNGEON_MOUNTAIN, upper: Block.AIR };
    }
    const cave = this.cave;
    if (cave && inRect(cave.footprint, x, y)) {
      const g = baseCell().ground;
      const ground2 = blockDef(g).liquid || g === Block.HOLE ? Block.GRASS : g;
      return { ground: ground2, object: x === cave.x && y === cave.y ? Block.DUNGEON_CAVE : Block.TOWN_PART, upper: Block.AIR };
    }
    if (cave && inRect(cave.front, x, y)) return this.clearFront(baseCell());
    return null;
  }
  cellAt(x, y) {
    return this.overlay(x, y, () => this.base.cellAt(x, y)) ?? this.base.cellAt(x, y);
  }
  groundAt(x, y) {
    return this.cellAt(x, y).ground;
  }
  objectAt(x, y) {
    return this.cellAt(x, y).object;
  }
  upperAt(x, y) {
    return this.cellAt(x, y).upper;
  }
  biomeAt(x, y) {
    return this.base.biomeAt(x, y);
  }
  /** Cada chunk copia a sua parte do mapa lógico (corredores seguem sem interrupção entre chunks). */
  generateChunk(cx, cy, ground2, objects, upper) {
    this.base.generateChunk(cx, cy, ground2, objects, upper);
    const S = Math.round(Math.sqrt(ground2.length));
    const x0 = cx * S;
    const y0 = cy * S;
    const misses = (r) => x0 > r.x1 || x0 + S - 1 < r.x0 || y0 > r.y1 || y0 + S - 1 < r.y0;
    const c = this.cave;
    if (misses(this.guard) && (!c || misses(c.footprint) && misses(c.front))) return;
    for (let ly = 0; ly < S; ly++) {
      for (let lx = 0; lx < S; lx++) {
        const i = ly * S + lx;
        const cell = this.overlay(x0 + lx, y0 + ly, () => ({ ground: ground2[i], object: objects[i], upper: upper[i] }));
        if (!cell) continue;
        ground2[i] = cell.ground;
        objects[i] = cell.object;
        upper[i] = cell.upper;
      }
    }
  }
};

// src/world/items.ts
var Item = {
  WHEAT_SEED: "wheat_seed",
  WHEAT: "wheat",
  /** Espólios das aranhas (sem uso ainda — futuras receitas). */
  SILK: "silk",
  FANG: "fang",
  QUEEN_HEART: "queen_heart",
  /** Espólios dos lobos (v0.91.0; sem uso ainda — futuras receitas). */
  WOLF_FANG: "wolf_fang",
  WOLF_PELT: "wolf_pelt",
  /** Moeda de cobre (v0.93.7): espólio do goblin; sem uso ainda (futuras lojas e trocas). */
  COPPER_COIN: "copper_coin",
  /** Fruta da macieira (comer vem com a comida, Fase P). As mudas saíram do jogo na v0.88.0 (`RETIRED_ITEMS`). */
  APPLE: "apple",
  /** Hortaliças: o próprio legume é o que se planta (e o que se colhe). */
  POTATO: "potato",
  TOMATO: "tomato",
  CARROT: "carrot",
  /** Pano de Seda (10 sedas): ingrediente da tenda. */
  SILK_CLOTH: "silk_cloth",
  /** Pratos do Cozinheiro (feitos no caldeirão; quanto enchem a fome: `FOOD` em progression). */
  BREAD: "bread",
  PASTA_TOMATO: "pasta_tomato",
  /** Produtos dos animais (soltos ao serem alimentados: `ANIMAL_PRODUCE`). */
  MILK: "milk",
  EGG: "egg",
  /** Pratos com os produtos dos animais. */
  CHEESE: "cheese",
  APPLE_PIE: "apple_pie"
};
var ITEMS = {
  // Alimento de cada animal (dono do produto, 2026-11-06): ovelha e vaca = trigo; galinha = semente; cavalo = cenoura.
  wheat_seed: { id: Item.WHEAT_SEED, name: "Semente de Trigo", plants: Block.WHEAT_0, feeds: ["chicken"] },
  wheat: { id: Item.WHEAT, name: "Trigo", feeds: ["sheep", "cow"] },
  silk: { id: Item.SILK, name: "Seda de Aranha", loot: true },
  fang: { id: Item.FANG, name: "Presa de Aranha", loot: true },
  queen_heart: { id: Item.QUEEN_HEART, name: "Cora\xE7\xE3o da Rainha", loot: true },
  wolf_fang: { id: Item.WOLF_FANG, name: "Presa de Lobo", loot: true },
  wolf_pelt: { id: Item.WOLF_PELT, name: "Pelagem de Lobo", loot: true },
  copper_coin: { id: Item.COPPER_COIN, name: "Moeda de Cobre", loot: true },
  apple: { id: Item.APPLE, name: "Ma\xE7\xE3" },
  potato: { id: Item.POTATO, name: "Batata", plants: Block.POTATO_0 },
  tomato: { id: Item.TOMATO, name: "Tomate", plants: Block.TOMATO_0 },
  carrot: { id: Item.CARROT, name: "Cenoura", plants: Block.CARROT_0, feeds: ["horse"] },
  silk_cloth: { id: Item.SILK_CLOTH, name: "Pano de Seda" },
  bread: { id: Item.BREAD, name: "P\xE3o" },
  pasta_tomato: { id: Item.PASTA_TOMATO, name: "Macarr\xE3o ao Molho" },
  milk: { id: Item.MILK, name: "Leite" },
  egg: { id: Item.EGG, name: "Ovo" },
  cheese: { id: Item.CHEESE, name: "Queijo" },
  apple_pie: { id: Item.APPLE_PIE, name: "Torta de Ma\xE7\xE3" }
};
var ANIMAL_PRODUCE = { cow: Item.MILK, chicken: Item.EGG };
var VEGETABLES = [Item.POTATO, Item.TOMATO, Item.CARROT];
var GRASS_VEGETABLE_CHANCE = 0.12;
var LOOT_ITEMS = [Item.SILK, Item.FANG, Item.QUEEN_HEART, Item.WOLF_FANG, Item.WOLF_PELT, Item.COPPER_COIN];
var WOLF_PELT_CHANCE = 0.55;
var WOLF_FANG_CHANCE = 0.4;
var GOBLIN_COIN_DROP = 2;
var LIZARD_COIN_DROP = 2;
function monsterDrops(kind, rand = Math.random) {
  if (kind === "goblin") return [{ item: Item.COPPER_COIN, count: GOBLIN_COIN_DROP }];
  if (kind === "lizard") return [{ item: Item.COPPER_COIN, count: LIZARD_COIN_DROP }];
  if (isWolf(kind)) {
    const out = [];
    if (rand() < WOLF_PELT_CHANCE) out.push({ item: Item.WOLF_PELT, count: 1 });
    if (rand() < WOLF_FANG_CHANCE) out.push({ item: Item.WOLF_FANG, count: 1 });
    return out;
  }
  if (kind === "spider-small") return rand() < 0.6 ? [{ item: Item.SILK, count: 1 }] : [];
  if (kind === "spider-big") {
    const out = [{ item: Item.SILK, count: 1 + (rand() < 0.5 ? 1 : 0) }];
    if (rand() < 0.35) out.push({ item: Item.FANG, count: 1 });
    return out;
  }
  return [
    { item: Item.SILK, count: 5 + Math.floor(rand() * 3) },
    { item: Item.FANG, count: 2 + (rand() < 0.5 ? 1 : 0) },
    { item: Item.QUEEN_HEART, count: 1 }
  ];
}
var blockStack = (id) => `block:${id}`;
function dropsFor(id, rand = Math.random) {
  const tree = treeDrops(id, rand);
  if (tree) return tree;
  if (id === Block.TALL_GRASS) {
    if (rand() >= GRASS_VEGETABLE_CHANCE) return [];
    return [{ item: VEGETABLES[Math.min(VEGETABLES.length - 1, Math.floor(rand() * VEGETABLES.length))], count: 1 }];
  }
  const kind = cropKind(id);
  if (kind && kind !== "wheat") {
    const item = kind;
    return [{ item, count: cropStage(id) === CROP_STAGES - 1 ? 2 + (rand() < 0.5 ? 1 : 0) : 1 }];
  }
  if (!isWheat(id)) return [];
  if (wheatStage(id) === WHEAT_STAGES - 1) {
    return [
      { item: Item.WHEAT, count: 1 },
      { item: Item.WHEAT_SEED, count: 1 + (rand() < 0.5 ? 1 : 0) }
    ];
  }
  return [{ item: Item.WHEAT_SEED, count: 1 }];
}
function treeDrops(id, rand) {
  switch (id) {
    case Block.APPLE_TREE:
      return pickDrops(rand);
    case Block.OAK_TREE:
    case Block.SAKURA_TREE:
    case Block.BIRCH_TREE:
    case Block.APPLE_TREE_BARE:
      return [];
    default:
      return null;
  }
}
function pickDrops(rand = Math.random) {
  return [{ item: Item.APPLE, count: 2 + (rand() < 0.5 ? 1 : 0) }];
}
var Tool = {
  SWORD: "sword",
  HOE: "hoe",
  PICKAXE: "pickaxe",
  SHOVEL: "shovel",
  AXE: "axe"
};
var TOOLS = {
  sword: {
    id: Tool.SWORD,
    name: "Espada",
    plannedUse: "golpe em animais/monstros; n\xE3o quebra nada",
    breaks: "none",
    destroysPlants: false,
    groundUse: null,
    swings: true,
    strikes: true
  },
  hoe: {
    id: Tool.HOE,
    name: "Enxada",
    plannedUse: "ara Terra/Terra com Grama \u2192 Terra Arada; quebra s\xF3 plantas; n\xE3o ataca",
    breaks: "plant",
    destroysPlants: false,
    groundUse: "till",
    swings: true,
    strikes: false
  },
  pickaxe: {
    id: Tool.PICKAXE,
    name: "Picareta",
    plannedUse: "minera qualquer bloco menos madeira/\xE1rvore; plantas sem drop; n\xE3o ataca",
    breaks: "nonWood",
    alsoBreaks: [Block.TENT, Block.TENT_PART],
    destroysPlants: true,
    groundUse: null,
    swings: true,
    strikes: false
  },
  shovel: {
    id: Tool.SHOVEL,
    name: "P\xE1",
    plannedUse: "Terra/Grama/Arada \u2192 Caminho de Terra; cava s\xF3 macios e plantas (sem drop); n\xE3o ataca",
    breaks: "soft",
    destroysPlants: true,
    groundUse: "flatten",
    swings: true,
    strikes: false
  },
  axe: {
    id: Tool.AXE,
    name: "Machado",
    plannedUse: "golpe em animais/monstros; corta s\xF3 madeira/\xE1rvore/planta",
    breaks: "organic",
    destroysPlants: false,
    groundUse: null,
    swings: true,
    strikes: true
  }
};
function toolCanBreak(tool, id) {
  if (!tool) return true;
  const rule = TOOLS[tool].breaks;
  if (TOOLS[tool].alsoBreaks?.includes(id)) return true;
  const { organic, soft } = blockDef(id);
  if (rule === "any") return true;
  if (rule === "organic") return organic !== null;
  if (rule === "plant") return organic === "plant";
  if (rule === "soft") return soft || organic === "plant";
  if (rule === "nonWood") return organic !== "wood";
  return false;
}
function toolDrops(tool, id, rand = Math.random) {
  if (tool && TOOLS[tool].destroysPlants && blockDef(id).organic === "plant") return [];
  return dropsFor(id, rand);
}
var TOOL_ORDER = [Tool.SWORD, Tool.HOE, Tool.PICKAXE, Tool.SHOVEL, Tool.AXE];
var COLLECTABLE = /* @__PURE__ */ new Set([...MATERIALS, Block.OAK_DOOR, Block.TENT, Block.CHEST, Block.CAMPFIRE, Block.CAULDRON, Block.OVEN, Block.CHAIR, ...FLOWER_BLOCKS, Block.FENCE, Block.FENCE_BIRCH, Block.FENCE_CHERRY, Block.FENCE_STAKE, Block.WALL_PLANKS, Block.WALL_STONE, Block.WALL_DOOR_PLANKS]);
var ADULT_TREES = /* @__PURE__ */ new Set([Block.OAK_TREE, Block.APPLE_TREE, Block.APPLE_TREE_BARE]);
function blockDrops(id, rand = Math.random) {
  if (ADULT_TREES.has(id)) return [{ item: blockStack(Block.OAK_LOG), count: 2 + (rand() < 0.5 ? 1 : 0) }];
  if (id === Block.SAKURA_TREE) return [{ item: blockStack(Block.CHERRY_LOG), count: 2 + (rand() < 0.5 ? 1 : 0) }];
  if (id === Block.BIRCH_TREE) return [{ item: blockStack(Block.BIRCH_LOG), count: 2 + (rand() < 0.5 ? 1 : 0) }];
  if (isDoor(id)) return [{ item: blockStack(Block.OAK_DOOR), count: 1 }];
  const gate = gateClosed(id);
  if (gate !== null) return [{ item: blockStack(gate), count: 1 }];
  if (isWallDoor(id)) return [{ item: blockStack(Block.WALL_DOOR_PLANKS), count: 1 }];
  if (id === Block.ROCK_BOULDER) return [{ item: blockStack(Block.STONE), count: 1 + Math.floor(rand() * 3) }];
  return COLLECTABLE.has(id) ? [{ item: blockStack(id), count: 1 }] : [];
}
function breakDrops(tool, id, collect, rand = Math.random, at) {
  if (collect && id === Block.FLOWER && at) return [{ item: blockStack(FLOWER_BLOCKS[wildFlowerIndex(at.seed, at.x, at.y)]), count: 1 }];
  return [...toolDrops(tool, id, rand), ...collect ? blockDrops(id, rand) : []];
}
var RECIPES = [
  {
    id: "oak-planks",
    name: "T\xE1bua de Carvalho",
    profession: "builder",
    inputs: [{ item: blockStack(Block.OAK_LOG), count: 1 }],
    output: { item: blockStack(Block.OAK_PLANKS), count: 2 }
  },
  {
    id: "birch-planks",
    name: "T\xE1bua de B\xE9tula",
    profession: "builder",
    inputs: [{ item: blockStack(Block.BIRCH_LOG), count: 1 }],
    output: { item: blockStack(Block.BIRCH_PLANKS), count: 2 }
  },
  {
    id: "cherry-planks",
    name: "T\xE1bua de Cerejeira",
    profession: "builder",
    inputs: [{ item: blockStack(Block.CHERRY_LOG), count: 1 }],
    output: { item: blockStack(Block.CHERRY_PLANKS), count: 2 }
  },
  {
    id: "oak-door",
    name: "Porta de Carvalho",
    profession: "builder",
    inputs: [{ item: blockStack(Block.OAK_PLANKS), count: 4 }],
    output: { item: blockStack(Block.OAK_DOOR), count: 1 }
  },
  // Paredes autotile (W5, dono do produto 13/11): custos provisórios, ajustáveis olhando o ritmo do jogo.
  {
    id: "plank-wall",
    name: "Parede de T\xE1buas",
    profession: "builder",
    inputs: [{ item: blockStack(Block.OAK_PLANKS), count: 2 }],
    output: { item: blockStack(Block.WALL_PLANKS), count: 2 }
  },
  {
    id: "stone-wall",
    name: "Parede de Pedra",
    profession: "builder",
    inputs: [{ item: blockStack(Block.STONE), count: 2 }],
    output: { item: blockStack(Block.WALL_STONE), count: 2 }
  },
  {
    id: "plank-wall-door",
    name: "Porta de Parede (T\xE1buas)",
    profession: "builder",
    inputs: [{ item: blockStack(Block.OAK_PLANKS), count: 4 }],
    output: { item: blockStack(Block.WALL_DOOR_PLANKS), count: 1 }
  },
  ...[
    ["stone-brick", "Tijolo de Pedra", Block.STONE_BRICK],
    ["stone-floor", "Ch\xE3o de Pedra", Block.STONE_FLOOR]
  ].map(([id, name, out]) => ({
    id,
    name,
    profession: "builder",
    inputs: [{ item: blockStack(Block.STONE), count: 1 }],
    output: { item: blockStack(out), count: 1 }
  })),
  {
    id: "oak-chest",
    name: "Ba\xFA de Carvalho",
    profession: "builder",
    inputs: [{ item: blockStack(Block.OAK_PLANKS), count: 8 }],
    output: { item: blockStack(Block.CHEST), count: 1 }
  },
  // Móveis (dono do produto, 2026-11-06).
  {
    id: "wooden-chair",
    name: "Cadeira de Madeira",
    profession: "builder",
    inputs: [{ item: blockStack(Block.OAK_PLANKS), count: 4 }],
    output: { item: blockStack(Block.CHAIR), count: 1 }
  },
  // Cerca de tábuas (dono do produto, 2026-11-06): as células se emendam sozinhas; o portão abre e fecha.
  {
    id: "wooden-fence",
    name: "Cerca de Madeira",
    profession: "builder",
    inputs: [{ item: blockStack(Block.OAK_PLANKS), count: 2 }],
    output: { item: blockStack(Block.FENCE), count: 4 }
  },
  // Cercas de Bétula e de Cerejeira (v0.93.96): a mesma receita da de Carvalho, com a tábua da madeira.
  {
    id: "birch-fence",
    name: "Cerca de B\xE9tula",
    profession: "builder",
    inputs: [{ item: blockStack(Block.BIRCH_PLANKS), count: 2 }],
    output: { item: blockStack(Block.FENCE_BIRCH), count: 4 }
  },
  {
    id: "cherry-fence",
    name: "Cerca de Cerejeira",
    profession: "builder",
    inputs: [{ item: blockStack(Block.CHERRY_PLANKS), count: 2 }],
    output: { item: blockStack(Block.FENCE_CHERRY), count: 4 }
  },
  // Cerca de Estacas (v0.93.90, teste do dono do produto): 4 estacas por bloco; 1 Tora de Carvalho rende 4 blocos (custo provisório).
  {
    id: "stake-fence",
    name: "Cerca de Estacas",
    profession: "builder",
    inputs: [{ item: blockStack(Block.OAK_LOG), count: 1 }],
    output: { item: blockStack(Block.FENCE_STAKE), count: 4 }
  },
  {
    id: "fence-gate",
    name: "Port\xE3o de Madeira",
    profession: "builder",
    inputs: [{ item: blockStack(Block.OAK_PLANKS), count: 4 }],
    output: { item: blockStack(Block.FENCE_GATE), count: 1 }
  },
  // Portões de Bétula e de Cerejeira (v0.93.99): a mesma receita do de Carvalho, com a tábua da madeira.
  {
    id: "birch-gate",
    name: "Port\xE3o de B\xE9tula",
    profession: "builder",
    inputs: [{ item: blockStack(Block.BIRCH_PLANKS), count: 4 }],
    output: { item: blockStack(Block.FENCE_GATE_BIRCH), count: 1 }
  },
  {
    id: "cherry-gate",
    name: "Port\xE3o de Cerejeira",
    profession: "builder",
    inputs: [{ item: blockStack(Block.CHERRY_PLANKS), count: 4 }],
    output: { item: blockStack(Block.FENCE_GATE_CHERRY), count: 1 }
  },
  // Cozinha (dono do produto, 2026-11-05): por enquanto só se fabricam e se colocam; cozinhar vem com a comida.
  {
    id: "campfire",
    name: "Fogueira",
    profession: "builder",
    inputs: [{ item: blockStack(Block.OAK_LOG), count: 3 }],
    output: { item: blockStack(Block.CAMPFIRE), count: 1 }
  },
  {
    id: "stone-cauldron",
    name: "Caldeir\xE3o de Pedra",
    profession: "builder",
    inputs: [{ item: blockStack(Block.STONE), count: 3 }, { item: blockStack(Block.CAMPFIRE), count: 1 }],
    output: { item: blockStack(Block.CAULDRON), count: 1 }
  },
  {
    id: "stone-oven",
    name: "Forno de Pedra",
    profession: "builder",
    inputs: [{ item: blockStack(Block.STONE), count: 6 }],
    output: { item: blockStack(Block.OVEN), count: 1 }
  },
  // Pano de Seda (dono do produto, 2026-11-06): 10 sedas viram 1 pano; a tenda passou a pedir o pano.
  {
    id: "silk-cloth",
    name: "Pano de Seda",
    profession: "builder",
    inputs: [{ item: Item.SILK, count: 10 }],
    output: { item: Item.SILK_CLOTH, count: 1 }
  },
  {
    id: "tent",
    name: "Tenda",
    profession: "builder",
    inputs: [{ item: Item.SILK_CLOTH, count: 1 }, { item: blockStack(Block.OAK_PLANKS), count: 10 }, { item: Item.FANG, count: 4 }],
    output: { item: blockStack(Block.TENT), count: 1 }
  },
  // Cozinheiro (dono do produto, 2026-11-06): cozinhar só perto de um Caldeirão de Pedra colocado no mundo.
  {
    id: "bread",
    name: "P\xE3o",
    profession: "cook",
    station: Block.CAULDRON,
    inputs: [{ item: Item.WHEAT, count: 2 }],
    output: { item: Item.BREAD, count: 1 }
  },
  {
    id: "pasta-tomato",
    name: "Macarr\xE3o ao Molho",
    profession: "cook",
    station: Block.CAULDRON,
    inputs: [{ item: Item.WHEAT, count: 4 }, { item: Item.TOMATO, count: 2 }],
    output: { item: Item.PASTA_TOMATO, count: 1 }
  },
  // Com os produtos dos animais (dono do produto, 2026-11-07): queijo no Caldeirão; a torta assa no Forno de Pedra.
  {
    id: "cheese",
    name: "Queijo",
    profession: "cook",
    station: Block.CAULDRON,
    inputs: [{ item: Item.MILK, count: 1 }],
    output: { item: Item.CHEESE, count: 1 }
  },
  {
    id: "apple-pie",
    name: "Torta de Ma\xE7\xE3",
    profession: "cook",
    station: Block.OVEN,
    inputs: [{ item: Item.WHEAT, count: 2 }, { item: Item.MILK, count: 1 }, { item: Item.APPLE, count: 2 }, { item: Item.EGG, count: 1 }],
    output: { item: Item.APPLE_PIE, count: 1 }
  }
];

// src/world/actions.ts
var KINDS = /* @__PURE__ */ new Set(["break", "place", "till", "flatten", "plant", "pick", "door"]);
var isInt = (v) => typeof v === "number" && Number.isInteger(v) && Math.abs(v) < 2 ** 30;
function parseAction(v) {
  if (!v || typeof v !== "object") return null;
  const a = v;
  if (!KINDS.has(a.kind) || !isInt(a.x) || !isInt(a.y)) return null;
  const { x, y } = a;
  switch (a.kind) {
    case "break":
      if (a.tool !== null && !(typeof a.tool === "string" && a.tool in TOOLS)) return null;
      return { kind: "break", x, y, tool: a.tool };
    case "place":
      if (!isInt(a.block) || !blockDef(a.block).placeable) return null;
      return { kind: "place", x, y, block: a.block };
    case "plant":
      if (a.block === void 0) return { kind: "plant", x, y };
      return isInt(a.block) ? { kind: "plant", x, y, block: a.block } : null;
    default:
      return { kind: a.kind, x, y };
  }
}
function applyAction(world, a) {
  switch (a.kind) {
    case "break": {
      const id = world.breakTargetId(a.x, a.y);
      if (id === null || !toolCanBreak(a.tool, id)) return false;
      return world.breakBlock(a.x, a.y) !== null;
    }
    case "place":
      return world.placeBlock(a.x, a.y, a.block);
    case "till":
      return world.till(a.x, a.y);
    case "flatten":
      return world.flatten(a.x, a.y);
    case "plant":
      return world.plant(a.x, a.y, a.block);
    case "pick":
      return world.pick(a.x, a.y);
    case "door":
      return world.toggleDoor(a.x, a.y);
  }
}

// src/net/protocol.ts
var PROTOCOL_VERSION = 28;
var MAX_PLAYERS = 10;
var ROOMS = [
  { id: 1, name: "Sala 1", seed: 20261106 }
];
function roomById(id) {
  return ROOMS.find((r) => r.id === id);
}
var NAME_MIN = 2;
var NAME_MAX = 16;
function sanitizeName(text) {
  const n = text.normalize("NFC").replace(/\s+/g, " ").trim();
  if (n.length < NAME_MIN || n.length > NAME_MAX) return null;
  return /^[\p{L}\p{N} _-]+$/u.test(n) ? n : null;
}
var APPEARANCE_BODIES = ["heroine", "hero", "hood", "gino", "mila", "grewn"];
var DEFAULT_APPEARANCE = { body: "heroine" };
var FACING_ORDER = ["down", "left", "right", "up"];
var FACINGS = /* @__PURE__ */ new Set(["down", "left", "right", "up"]);
var finite = (v) => typeof v === "number" && Number.isFinite(v) && Math.abs(v) < 2 ** 30;
function parseState(v) {
  if (!v || typeof v !== "object") return null;
  const s = v;
  if (!finite(s.x) || !finite(s.y) || !FACINGS.has(s.facing) || typeof s.moving !== "boolean") return null;
  const out = { x: s.x, y: s.y, facing: s.facing, moving: s.moving };
  if (typeof s.tool === "string" && s.tool in TOOLS) out.tool = s.tool;
  if (Number.isInteger(s.swing) && s.swing >= 0 && s.swing < 2 ** 31) out.swing = s.swing;
  if (Number.isInteger(s.sit) && s.sit >= 0 && s.sit < 16) out.sit = s.sit;
  return out;
}
function parseClientMessage(text) {
  let m;
  try {
    m = JSON.parse(text);
  } catch {
    return null;
  }
  if (!m || typeof m !== "object") return null;
  const o = m;
  switch (o.t) {
    case "hello":
      if (!Number.isInteger(o.v) || typeof o.name !== "string" || !Number.isInteger(o.room)) return null;
      return { t: "hello", v: o.v, sub: Number.isInteger(o.sub) && o.sub >= 1 ? o.sub : 1, name: o.name, room: o.room, appearance: parseAppearance(o.appearance) };
    case "bag": {
      const bag = parseBag(o.bag);
      return bag ? { t: "bag", bag } : null;
    }
    case "take":
      return Number.isInteger(o.id) ? { t: "take", id: o.id } : null;
    case "chest": {
      const slots = parseChestSlots(o.slots);
      return slots && Number.isInteger(o.x) && Number.isInteger(o.y) ? { t: "chest", x: o.x, y: o.y, slots } : null;
    }
    case "state": {
      const s = parseState(o.s);
      return s ? { t: "state", s } : null;
    }
    case "strike":
      if (!FACINGS.has(o.facing) || !finite(o.attack) || o.attack < 0 || o.attack > 1e3) return null;
      return { t: "strike", facing: o.facing, attack: o.attack };
    case "feed":
      return Number.isInteger(o.id) && typeof o.item === "string" && /^[a-z_]{1,32}$/.test(o.item) ? { t: "feed", id: o.id, item: o.item } : null;
    case "talk":
      return Number.isInteger(o.id) && typeof o.on === "boolean" ? { t: "talk", id: o.id, on: o.on } : null;
    case "escort":
      return Number.isInteger(o.id) && typeof o.on === "boolean" ? { t: "escort", id: o.id, on: o.on } : null;
    case "action": {
      const a = parseAction(o.a);
      return a && Number.isInteger(o.seq) ? { t: "action", seq: o.seq, a } : null;
    }
    default:
      return null;
  }
}
var MAX_BAG_ENTRIES = 128;
var STACK_RE = /^(block:\d{1,4}|tool:[a-z_]{1,24}|[a-z_]{1,32})$/;
function parseBag(v) {
  if (!v || typeof v !== "object") return null;
  const o = v;
  if (!o.inventory || typeof o.inventory !== "object" || !finite(o.x) || !finite(o.y)) return null;
  const inventory = {};
  const entries = Object.entries(o.inventory);
  if (entries.length > MAX_BAG_ENTRIES) return null;
  for (const [k, n] of entries) {
    if (!STACK_RE.test(k) || !Number.isInteger(n) || n < 0 || n > 99999) return null;
    if (isRemovedStack(k)) continue;
    inventory[k] = n;
  }
  let hotbar = null;
  if (o.hotbar !== null && o.hotbar !== void 0) {
    if (!Array.isArray(o.hotbar) || o.hotbar.length > 64) return null;
    if (!o.hotbar.every((s) => s === null || typeof s === "string" && STACK_RE.test(s))) return null;
    hotbar = o.hotbar.map((s) => s !== null && isRemovedStack(s) ? null : s);
  }
  const coins = Number.isInteger(o.coins) && o.coins >= 0 && o.coins <= 999999999 ? o.coins : void 0;
  return { inventory, ...coins !== void 0 ? { coins } : {}, hotbar, x: o.x, y: o.y };
}
function parseAppearance(v) {
  if (!v || typeof v !== "object") return DEFAULT_APPEARANCE;
  const o = v;
  const body = APPEARANCE_BODIES.includes(o.body) ? o.body : "heroine";
  return { body };
}
function parseChestSlots(v, size = 27) {
  if (!Array.isArray(v) || v.length !== size) return null;
  const out = [];
  for (const s of v) {
    if (s === null) {
      out.push(null);
      continue;
    }
    if (!s || typeof s !== "object") return null;
    const o = s;
    if (typeof o.item !== "string" || !STACK_RE.test(o.item) || !Number.isInteger(o.count) || o.count < 1 || o.count > 99999) return null;
    out.push(isRemovedStack(o.item) ? null : { item: o.item, count: o.count });
  }
  return out;
}

// src/world/progression.ts
var BASE_STATS = { maxHp: 100, attack: 5, defense: 2 };
function playerStats(_level = 1) {
  return { ...BASE_STATS };
}
var WEAPON_POWER = { sword: 12, axe: 7 };
function weaponPower(tool) {
  return (tool && WEAPON_POWER[tool]) ?? 0;
}
var MONSTER_STATS = {
  "spider-small": { hp: 20, attack: 8, defense: 0 },
  "spider-big": { hp: 45, attack: 14, defense: 2 },
  "spider-boss": { hp: 180, attack: 36, defense: 6 },
  // Lobos (v0.91.0): mais fortes quanto mais claros; bando de 1 a 3.
  "wolf-brown": { hp: 35, attack: 11, defense: 1 },
  "wolf-gray": { hp: 45, attack: 13, defense: 2 },
  "wolf-white": { hp: 55, attack: 15, defense: 3 },
  /** Goblin comum: vida 60, ataque nominal 15, mesma fórmula dos lobos. */
  goblin: { hp: 60, attack: 15, defense: 2 },
  /** Homem-lagarto (v0.93.60): vida 100, ataque nominal 15 (dono do produto, 14/11/2026); defesa como a do goblin. */
  lizard: { hp: 100, attack: 15, defense: 2 }
};
var DAMAGE_SPREAD = 0.1;
var CRIT_CHANCE = 0.05;
var CRIT_MULTIPLIER = 1.5;
function rollDamage(attack, defense, rand) {
  const base = Math.max(1, attack - defense);
  const varied = base * (1 + (rand() * 2 - 1) * DAMAGE_SPREAD);
  const crit = rand() < CRIT_CHANCE;
  return { amount: Math.max(1, Math.round(varied * (crit ? CRIT_MULTIPLIER : 1))), crit };
}
var REGEN = { delay: 6, every: 1.5, fraction: 0.05 };
var HUNGER = { max: 100, perSecond: 100 / 720, regenMin: 30, starveEvery: 4, starveDamage: 2 };

// src/game/walker.ts
function scaleSpec(spec) {
  return scaleSpecBy(spec, SUBDIV);
}
function scaleSpecBy(spec, s) {
  if (s === 1) return spec;
  return { ...spec, speed: spec.speed * s, halfW: Math.min(spec.halfW * s, spec.maxHalfW ?? Infinity), halfD: spec.halfD * s };
}
var Z_SMOOTH = 14;
var Walker = class {
  constructor(x, y, spec) {
    this.x = x;
    this.y = y;
    this.spec = scaleSpec(spec);
  }
  x;
  y;
  facing = "down";
  moving = false;
  /** Tempo acumulado de caminhada (dirige o quadro da animação). */
  walkTime = 0;
  /** Nível lógico (inteiro) e exibido (suavizado). */
  z = 0;
  visualZ = 0;
  /** Especificação física (mutável: o filhote cresce), já em células da grade atual. */
  spec;
  /**
   * Anda na direção (ix, iy) em coordenadas de tela, magnitude 0..1.
   * Retorna a distância efetivamente percorrida.
   */
  move(dt, ix, iy, world, blocked) {
    this.visualZ += (this.z / world.cubeLevels - this.visualZ) * (1 - Math.exp(-Z_SMOOTH * dt));
    let len = Math.hypot(ix, iy);
    if (len > 1) {
      ix /= len;
      iy /= len;
      len = 1;
    }
    this.moving = len > 0.08;
    if (!this.moving) {
      this.walkTime = 0;
      return 0;
    }
    const horizontal = this.facing === "left" || this.facing === "right";
    const bias = horizontal ? 0.8 : 1.25;
    if (Math.abs(ix) > Math.abs(iy) * bias) this.facing = ix < 0 ? "left" : "right";
    else this.facing = iy < 0 ? "up" : "down";
    const x0 = this.x;
    const y0 = this.y;
    const step = this.spec.speed * dt;
    this.tryMove(this.x + ix * step, this.y, world, blocked);
    this.tryMove(this.x, this.y + iy * step, world, blocked);
    const moved = Math.hypot(this.x - x0, this.y - y0);
    this.walkTime += dt * (0.55 + 0.45 * len);
    return moved;
  }
  /** Move se todas as células sob os pés forem alcançáveis; ajusta `z` à mais alta. */
  tryMove(x, y, world, blocked) {
    const h = this.supportHeight(x, y, world);
    if (h === null || blocked?.(this, x, y)) return;
    this.x = x;
    this.y = y;
    this.z = h;
  }
  /** Altura de apoio na posição, ou null se bloqueado (degrau alto, água, buraco, árvore). */
  supportHeight(x, y, world) {
    const { halfW, halfD } = this.spec;
    const stepHeight = world.stepLevels(this.spec.stepHeight);
    const x0 = Math.floor(x - halfW);
    const x1 = Math.floor(x + halfW);
    const y0 = Math.floor(y - halfD);
    const y1 = Math.floor(y + halfD);
    let top = 0;
    for (let cy = y0; cy <= y1; cy++) {
      for (let cx = x0; cx <= x1; cx++) {
        const h = world.standHeight(cx, cy);
        if (h === null || h > this.z + stepHeight) return null;
        if (h > top) top = h;
      }
    }
    return top;
  }
  /** A posição atual está bloqueada pelo mapa (ex.: um objeto foi parar sob os pés)? */
  isStuck(world) {
    return this.supportHeight(this.x, this.y, world) === null;
  }
  /** Recalcula o apoio no lugar (ex.: o bloco sob os pés foi quebrado). */
  settle(world) {
    const h = this.supportHeight(this.x, this.y, world);
    if (h !== null) this.z = h;
  }
  /** A caixa dos pés ocupa a célula? */
  occupies(cx, cy) {
    const { halfW, halfD } = this.spec;
    return this.x + halfW > cx && this.x - halfW < cx + 1 && this.y + halfD > cy && this.y - halfD < cy + 1;
  }
  /** A caixa dos pés, posicionada em (x, y), sobrepõe a de `other`? */
  overlapsAt(x, y, other) {
    const a = this.spec;
    const b = other.spec;
    return Math.abs(x - other.x) < a.halfW + b.halfW && Math.abs(y - other.y) < a.halfD + b.halfD;
  }
  get cellX() {
    return Math.floor(this.x);
  }
  get cellY() {
    return Math.floor(this.y);
  }
};

// src/game/wanderer.ts
var DEFAULT_PACE = { idle: [1.5, 5], walk: [1, 3.5], leash: 7 * SUBDIV };
var Wanderer = class extends Walker {
  constructor(x, y, spec, homeX, homeY, rand, pace = DEFAULT_PACE) {
    super(x, y, spec);
    this.homeX = homeX;
    this.homeY = homeY;
    this.rand = rand;
    this.pace = pace;
    this.state = { kind: "idle", timer: 0.5 + rand() * 3 };
    this.facing = ["down", "left", "right", "up"][Math.floor(rand() * 4)];
  }
  homeX;
  homeY;
  rand;
  pace;
  state;
  wander(dt, world, blocked) {
    const s = this.state;
    s.timer -= dt;
    if (s.kind === "idle") {
      this.move(dt, 0, 0, world, blocked);
      if (s.timer <= 0) this.startWalk();
      return;
    }
    const ease = Math.min(1, 0.25 + s.timer * 2);
    const moved = this.move(dt, s.dx * ease, s.dy * ease, world, blocked);
    s.stuck = moved < 2e-3 ? s.stuck + dt : 0;
    if (s.timer <= 0 || s.stuck > 0.3) {
      const [a, b] = this.pace.idle;
      this.state = { kind: "idle", timer: a + this.rand() * (b - a) };
    }
  }
  startWalk() {
    let angle = this.rand() * Math.PI * 2;
    const hx = this.homeX - this.x;
    const hy = this.homeY - this.y;
    if (Math.hypot(hx, hy) > this.pace.leash) angle = Math.atan2(hy, hx) + (this.rand() - 0.5) * 0.8;
    const pace = 0.6 + this.rand() * 0.4;
    const [a, b] = this.pace.walk;
    this.state = {
      kind: "walk",
      timer: a + this.rand() * (b - a),
      dx: Math.cos(angle) * pace,
      dy: Math.sin(angle) * pace,
      stuck: 0
    };
  }
};

// src/game/breeder.ts
var LOVE_SECONDS = 25;
var BREED_COOLDOWN = 45;
var COURTSHIP_SECONDS = 2.6;
var FOLLOW_DISTANCE = 1.6 * SUBDIV;
var Breeder = class extends Wanderer {
  constructor(species, breed, x, y, homeX, homeY, rand, baby, pace) {
    super(x, y, { ...baby ? breed.baby : breed.adult }, homeX, homeY, rand, pace);
    this.species = species;
    this.breed = breed;
    this.baby = baby;
  }
  species;
  breed;
  baby;
  age = 0;
  love = 0;
  cooldown = 0;
  partner = null;
  /** Tempo restante do namoro (> 0 = namorando, parado). */
  courtship = 0;
  /** Quem deu a comida: o animal o segue enquanto está apaixonado (sem par). */
  leader = null;
  chaseStuck = 0;
  /** Desvio lateral temporário ao contornar obstáculo a caminho do par (−1, 0, 1). */
  sidestep = 0;
  sidestepTimer = 0;
  get inLove() {
    return this.love > 0;
  }
  /** Pode comer agora? (adulto, sem estar apaixonado nem em espera). */
  get canEat() {
    return !this.baby && this.love <= 0 && this.cooldown <= 0 && this.courtship <= 0;
  }
  /** Este item é o alimento da espécie? */
  eats(item) {
    return ITEMS[item].feeds?.includes(this.species) ?? false;
  }
  /** Come: fica apaixonado e passa a seguir quem deu (`by`). Retorna false se não puder comer. */
  feed(by = null) {
    if (!this.canEat) return false;
    this.love = LOVE_SECONDS;
    this.leader = by;
    return true;
  }
  update(dt, world, blocked) {
    this.cooldown = Math.max(0, this.cooldown - dt);
    if (this.baby) {
      this.age += dt;
      if (this.age >= this.breed.growUpSeconds) {
        this.baby = false;
        Object.assign(this.spec, scaleSpec(this.breed.adult));
      }
    }
    if (this.courtship > 0) {
      this.courtship = Math.max(0, this.courtship - dt);
      this.move(dt, 0, 0, world, blocked);
      return;
    }
    if (this.love > 0) {
      this.love = Math.max(0, this.love - dt);
      if (this.love === 0) this.partner = null;
    }
    if (this.partner) {
      this.approachPartner(dt, world, blocked);
      return;
    }
    if (this.leader) {
      if (this.love > 0) {
        this.followLeader(dt, world, blocked);
        return;
      }
      this.leader = null;
      this.homeX = this.x;
      this.homeY = this.y;
    }
    this.wander(dt, world, blocked);
  }
  /** Segue quem deu a comida, parando perto dele (sem empurrar). */
  followLeader(dt, world, blocked) {
    const l = this.leader;
    if (Math.hypot(l.x - this.x, l.y - this.y) < FOLLOW_DISTANCE) {
      this.move(dt, 0, 0, world, blocked);
      return;
    }
    this.steerTo(dt, l.x, l.y, world, blocked);
  }
  /**
   * Anda até o par. Se travar, desvia para um lado por um instante (contorna
   * obstáculos simples); se continuar travado por muito tempo, desiste do par.
   */
  approachPartner(dt, world, blocked) {
    const p = this.partner;
    if (Math.hypot(p.x - this.x, p.y - this.y) < 0.9 * SUBDIV) {
      this.move(dt, 0, 0, world, blocked);
      return;
    }
    this.steerTo(dt, p.x, p.y, world, blocked);
    if (this.chaseStuck > 4) {
      this.chaseStuck = 0;
      if (p.partner === this) p.partner = null;
      this.partner = null;
    }
  }
  /** Anda na direção de (tx, ty); travado, desvia para um lado por um instante (contorna obstáculos simples). */
  steerTo(dt, tx, ty, world, blocked) {
    let dx = tx - this.x;
    let dy = ty - this.y;
    const dist = Math.hypot(dx, dy) || 1;
    dx /= dist;
    dy /= dist;
    this.sidestepTimer -= dt;
    if (this.sidestepTimer <= 0) this.sidestep = 0;
    if (this.sidestep !== 0) {
      const a = this.sidestep * 1.2;
      [dx, dy] = [dx * Math.cos(a) - dy * Math.sin(a), dx * Math.sin(a) + dy * Math.cos(a)];
    }
    const moved = this.move(dt, dx * 0.9, dy * 0.9, world, blocked);
    this.chaseStuck = moved < 2e-3 ? this.chaseStuck + dt : Math.max(0, this.chaseStuck - dt * 0.5);
    if (moved < 2e-3 && this.sidestep === 0 && this.chaseStuck > 0.35) {
      this.sidestep = this.rand() < 0.5 ? -1 : 1;
      this.sidestepTimer = 0.8;
    }
  }
};

// src/game/sheep.ts
var GROW_UP_SECONDS = 120;
var SHEEP = {
  adult: { speed: 1.3, halfW: 0.3, halfD: 0.17, stepHeight: 0 },
  baby: { speed: 1.6, halfW: 0.22, halfD: 0.13, stepHeight: 0 },
  growUpSeconds: GROW_UP_SECONDS
};
var Sheep = class extends Breeder {
  constructor(x, y, homeX = x, homeY = y, rand = Math.random, baby = false) {
    super("sheep", SHEEP, x, y, homeX, homeY, rand, baby);
  }
};

// src/game/horse.ts
var FARM_GROW_UP_SECONDS = 3 * DAY_LENGTH_S;
var BABY_KIND = { horse: "foal", cow: "calf", chicken: "chick", capybara: "capybara" };
var FARM = {
  horse: {
    adult: { speed: 1.8, halfW: 0.4, halfD: 0.2, stepHeight: 0 },
    baby: { speed: 1.9, halfW: 0.28, halfD: 0.15, stepHeight: 0 },
    idle: [2, 6],
    walk: [1.5, 4],
    leash: 10
  },
  cow: {
    adult: { speed: 0.9, halfW: 0.38, halfD: 0.2, stepHeight: 0 },
    baby: { speed: 1.1, halfW: 0.27, halfD: 0.15, stepHeight: 0 },
    idle: [3, 8],
    walk: [1.5, 3.5],
    leash: 8
  },
  capybara: {
    adult: { speed: 0.8, halfW: 0.34, halfD: 0.2, stepHeight: 0 },
    baby: { speed: 0.8, halfW: 0.34, halfD: 0.2, stepHeight: 0 },
    idle: [3, 9],
    walk: [1.2, 3],
    leash: 7
  },
  chicken: {
    adult: { speed: 1.3, halfW: 0.22, halfD: 0.14, stepHeight: 0 },
    baby: { speed: 1.4, halfW: 0.16, halfD: 0.1, stepHeight: 0 },
    idle: [1, 4],
    walk: [0.6, 2],
    leash: 6
  }
};
var FarmAnimal = class extends Breeder {
  constructor(kind, x, y, rand = Math.random, baby = false, homeX = x, homeY = y) {
    const f = FARM[kind];
    super(
      kind,
      { adult: f.adult, baby: f.baby, growUpSeconds: FARM_GROW_UP_SECONDS },
      x,
      y,
      homeX,
      homeY,
      rand,
      baby,
      { idle: f.idle, walk: f.walk, leash: f.leash * SUBDIV }
    );
    this.kind = kind;
  }
  kind;
};

// src/game/npcBrain/memory.ts
var KNOWN = {
  acquaintance: ["Ah, \xE9 voc\xEA de novo!", "Ol\xE1 outra vez!"],
  friend: ["Que bom ver voc\xEA de novo!", "Voc\xEA j\xE1 \xE9 de casa por aqui!"],
  close: ["Minha visita preferida chegou!", "Voc\xEA nunca deixa de passar, e eu adoro isso."]
};
function knownLine(tier, n = 0) {
  if (tier === "stranger") return "";
  const l = KNOWN[tier];
  return l[Math.abs(n) % l.length];
}

// src/game/npcBrain/schedule.ts
var BENTO_SCHEDULE = { wakeAt: 6, openAt: 7, closeAt: 19.5, sleepAt: 21 };
var SCHEDULES = { bento: BENTO_SCHEDULE };
function scheduleOf(npc) {
  return SCHEDULES[npc] ?? null;
}
function hourOf(time) {
  return (time % 1 + 1) % 1 * 24;
}
function phaseAt(s, time) {
  const h = hourOf(time);
  if (h >= s.wakeAt && h < s.openAt) return "opening";
  if (h >= s.openAt && h < s.closeAt) return "open";
  if (h >= s.closeAt && h < s.sleepAt) return "closing";
  return "asleep";
}
function closedLine(phase) {
  return phase === "opening" ? "Ainda estou arrumando as prateleiras! Abro a loja daqui a pouco, volte logo mais." : "J\xE1 fechei por hoje! Estou guardando as mercadorias. Volte amanh\xE3 cedo.";
}

// src/game/npcs.ts
var NPCS = [
  {
    id: "black",
    name: "Black",
    who: "Ferreiro (mora na Ferraria)",
    role: "smith",
    lines: [
      "Bem-vinda \xE0 Ferraria! Logo vou forjar ferramentas e armas para voc\xEA. Por enquanto, traga o que tiver de bom e vamos conversando.",
      "Ferro, pedra e bastante paci\xEAncia: \xE9 assim que nasce uma boa l\xE2mina. Volte quando as aranhas e os lobos derem trabalho."
    ]
  },
  {
    id: "dante",
    name: "Dante",
    who: "Arquivista da cidade (cabelo preto e branco)",
    lines: [
      "Guardo os registros da cidade. Dizem que aqui dentro da muralha nada se quebra e nada se constr\xF3i \u2014 e o ch\xE3o ao redor do muro tamb\xE9m \xE9 protegido.",
      "Anotei uma coisa curiosa: ch\xE3o que voc\xEA quebra e deixa aberto por um dia inteiro volta a ser ch\xE3o sozinho, igual ao dos vizinhos."
    ]
  },
  {
    id: "silvano",
    name: "Silvano",
    who: "Herbalista (cabelo verde, bolsa de couro)",
    lines: [
      "Semente s\xF3 pega em terra arada. Use a enxada, vire a terra e plante: trigo, batata, tomate e cenoura.",
      "Capim arrancado \xE0s vezes solta uma hortali\xE7a. Mexa nele antes de passar adiante!"
    ]
  },
  {
    id: "morgan",
    name: "Morgan",
    who: "Estudioso do castelo (casaco roxo)",
    lines: [
      "O castelo ao norte guarda a hist\xF3ria de Orvalis. Ainda n\xE3o recebo visitas, mas um dia a porta vai se abrir.",
      "Cada mundo tem a sua cidade. O nosso \xE9 o Mundo da Cidade 1: s\xF3 florestas, rios, mar e praias."
    ]
  },
  {
    id: "aurelio",
    name: "Aur\xE9lio",
    who: "Cortes\xE3o sempre sorridente (casaco azul-marinho)",
    lines: [
      "Que dia lindo para um passeio! Veja s\xF3: a macieira d\xE1 ma\xE7\xE3s, e depois de colhidas elas voltam com o tempo.",
      "Ma\xE7\xE3 se come para matar a fome. Fome vazia tira vida, ent\xE3o n\xE3o esque\xE7a de se alimentar!"
    ]
  },
  {
    id: "rubem",
    name: "Rubem",
    who: "Aventureiro (cabelo vermelho, jaqueta marrom)",
    lines: [
      "Os lobos andam em bandos de uma cor s\xF3, marrom, cinza ou branco. Eles s\xF3 atacam se voc\xEA chegar a tr\xEAs passos, ent\xE3o passe longe!",
      "Se um lobo vier atr\xE1s de voc\xEA, corra: voc\xEA \xE9 mais r\xE1pida que ele. Espada e machado d\xE3o conta, mas leve vida cheia."
    ]
  },
  {
    id: "rosendo",
    name: "Rosendo",
    who: "Jardineiro e florista (cabelo rosa, colete verde) \u2014 mora na Floricultura",
    role: "florist",
    lines: [
      "Gosto de flor e de \xE1rvore. Carvalho, b\xE9tula, cerejeira e macieira crescem todas por aqui, misturadas.",
      "Tora de cerejeira, de b\xE9tula ou de carvalho: cada \xE1rvore derrubada d\xE1 a sua madeira. D\xE1 para fazer t\xE1buas com elas!"
    ]
  },
  {
    id: "teodoro",
    name: "Teodoro",
    who: "Pescador alegre (camisa azul)",
    lines: [
      "Os rios e o mar t\xEAm margem de areia. A \xE1gua n\xE3o deixa ningu\xE9m quebr\xE1-la, mas buraco aberto perto dela se enche sozinho!",
      "Quer atravessar um rio? Jogue terra, pedra ou madeira na \xE1gua: ela vira ch\xE3o firme."
    ]
  },
  {
    id: "bento",
    name: "Bento",
    who: "Padeiro e mercador (colete marrom) \u2014 mora no Mercado",
    role: "merchant",
    lines: [
      "Trigo, ovos, leite e ma\xE7\xE3s: com isso se faz muita coisa boa no caldeir\xE3o e no forno. P\xE3o alimenta bem!",
      "Ovelha e vaca gostam de trigo, galinha prefere semente e o cavalo adora cenoura. Alimente e veja os cora\xE7\xF5es!"
    ]
  },
  {
    id: "solano",
    name: "Solano",
    who: "Construtor (camisa laranja)",
    lines: [
      "Quer construir? Madeira de qualquer \xE1rvore, pedra, terra e areia servem de bloco. A porta vai entre dois batentes de madeira ou pedra.",
      "Ba\xFA, porta, cadeira e cerca por enquanto s\xF3 saem de t\xE1bua de carvalho. Quem sabe um dia haja de outras madeiras!"
    ]
  },
  {
    id: "nilo",
    name: "Nilo",
    who: "Tratador de cavalos (cabelo castanho-escuro, olhos fechados)",
    lines: [
      "Os animais do campo ficam ao sul do port\xE3o: ovelhas, vacas, galinhas e um cavalo. Cuide bem deles.",
      "D\xEA a comida certa e eles se apaixonam. Da\xED nasce um filhote, que cresce em alguns dias."
    ]
  },
  {
    id: "marlon",
    name: "Marlon",
    who: "Marinheiro (cabelo azul-petr\xF3leo, colete marinho)",
    lines: [
      "O mar \xE9 grande e cheio de segredos. Por enquanto s\xF3 d\xE1 para andar pela praia, mas quem sabe um dia haja barcos.",
      "Nas margens a espuma \xE9 branquinha. Bonito de ver ao entardecer, n\xE3o acha?"
    ]
  },
  {
    id: "lavinio",
    name: "Lav\xEDnio",
    who: "Sonhador (cabelo lavanda)",
    lines: [
      "\xC0 noite o mundo fica silencioso. Uma tenda armada l\xE1 fora vira o seu ponto de renascer: durma tranquila!",
      "Fico imaginando o que existe al\xE9m do mapa. Dizem que h\xE1 outros mundos ligados por portais."
    ]
  },
  {
    id: "caio",
    name: "Caio",
    who: "Ca\xE7ador (cabelo preto, t\xFAnica verde)",
    lines: [
      "H\xE1 uma caverna l\xE1 fora, cheia de aranhas, com uma Rainha l\xE1 no fundo. A espada \xE9 a sua melhor amiga.",
      "Das aranhas saem seda e presas; dos lobos, pelagem e presas. Ainda n\xE3o sei fazer nada com isso, mas guarde!"
    ]
  },
  {
    id: "noel",
    name: "Noel",
    who: "Guarda da muralha (cabelo azul-marinho, colete vinho)",
    lines: [
      "Eu vigio a muralha. N\xE3o se constr\xF3i nem se quebra nada nela, nem no peda\xE7o de terra colado a ela.",
      "O port\xE3o fica ao sul. L\xE1 fora a vida \xE9 mais selvagem: leve ferramentas e olhe os arredores antes de se afastar."
    ]
  },
  {
    id: "leandro",
    name: "Leandro",
    who: "Viajante (cabelo loiro, camisa azul)",
    lines: [
      "J\xE1 andei por muitos lugares! Cada pessoa que chega \xE0 cidade traz um jeito novo de explorar.",
      "Dica de viajante: arme uma tenda antes de se aventurar. Se algo der errado, \xE9 l\xE1 que voc\xEA volta a si."
    ]
  }
];
var NPC_IDS = NPCS.map((n) => n.id);
var BY_ID = new Map(NPCS.map((n) => [n.id, n]));
function npcDef(id) {
  return BY_ID.get(id);
}
var SMITH = "black";
var FLORIST_KEEPER = "rosendo";
var MERCHANT = "bento";

// src/game/villager.ts
var Villager = class extends Wanderer {
  constructor(x, y, npc, onStreet, rand = Math.random, resident = null) {
    super(x, y, { speed: 1.4, halfW: 0.26, halfD: 0.14, stepHeight: 0 }, x, y, rand, { idle: [2, 7], walk: [1, 3], leash: (npcDef(npc).role ? 3 : 6) * SUBDIV });
    this.npc = npc;
    this.onStreet = onStreet;
    this.resident = resident;
    this.role = resident?.role ?? npcDef(npc).role ?? null;
    this.schedule = scheduleOf(npc);
    this.cruise = this.spec.speed;
  }
  npc;
  onStreet;
  resident;
  /** Ofício (fala e lugar próprios); sem ofício = morador comum. */
  role;
  /** Falando com alguém agora: parado, virado para a personagem (a caixa de conversa o segura). */
  hold = false;
  said = 0;
  /** Agenda do dia (ADR 0034, nível 1): só o Bento tem hoje; sem agenda, passeia como sempre. */
  schedule;
  /** Fase do dia pela agenda (sem agenda, sempre `open`). */
  phase = "open";
  /** 0 = à vista … 1 = sumiu pela porta dos fundos (o desenho desbota). */
  fade = 0;
  mode = "post";
  home = null;
  seeded = false;
  stuckFor = 0;
  /** Acompanhando a jogadora numa missão (ADR 0034): `follow` anda atrás dela por onde for; `home` volta ao posto ao terminar. */
  companion = "off";
  /** Quem ele acompanha na sala (um avatar; no jogo sozinho vale a jogadora): o `Entities` passa este alvo ao `update`. */
  leader = null;
  /** No aparelho dentro da sala: id do jogador que a sala diz estar sendo acompanhado por ele (0/null = ninguém). Só o espelho usa. */
  escortedBy = null;
  /** No aparelho dentro da sala: avisa a sala quando a conversa começa/termina (ela segura o morador parado para todos). */
  talkHook = null;
  cruise;
  /** Está acompanhando a jogadora (ou voltando ao posto depois)? */
  get escorting() {
    return this.companion !== "off";
  }
  /** Começa (`true`) ou termina (`false`: volta ao posto andando) o acompanhamento. */
  setCompanion(on) {
    if (on) this.companion = "follow";
    else if (this.companion === "follow") this.companion = "home";
  }
  /** Põe o acompanhante ao lado de (x, y) (carregar o jogo no meio da missão). */
  teleportTo(x, y) {
    this.x = x;
    this.y = y;
  }
  /** A porta dos fundos (centro da célula): por onde ele vai dormir e aparece de manhã. */
  setHome(x, y) {
    this.home = [x, y];
  }
  /** Dormindo (fora do mapa: não aparece, não bloqueia nem atende)? */
  get hidden() {
    return this.mode === "asleep";
  }
  /** A loja deste atendente está aberta? */
  get shopIsOpen() {
    return !this.schedule || this.phase === "open";
  }
  /** Conversa de loja fechada (ele ainda está à vista, arrumando): fica parado até `release()`. */
  closedConversation(phase = this.phase) {
    this.setHold(true);
    return { npc: this.npc, name: this.name, text: closedLine(phase) };
  }
  /** A sala segura (ou solta) o morador parado enquanto alguém conversa com ele. */
  freeze(on) {
    this.hold = on;
  }
  setHold(on) {
    if (this.hold === on) return;
    this.hold = on;
    this.talkHook?.(on);
  }
  /** Chave da memória: o id do sorteado (`rt3`…) ou o do NPC nomeado. */
  get memoryKey() {
    return this.resident?.id ?? this.npc;
  }
  get name() {
    return this.resident?.name ?? npcDef(this.npc).name;
  }
  /** Troca de cores do desenho (só os sorteados; os 16 NPCs nomeados usam a arte como ela é). */
  get look() {
    return this.resident?.look ?? null;
  }
  /** A próxima fala (em roda) como conversa; o NPC fica parado até `release()`. */
  conversation(tier = "stranger") {
    const lines = this.resident?.lines ?? npcDef(this.npc).lines;
    const hello = this.said === 0 ? knownLine(tier, this.said) : "";
    const text = `${hello ? hello + " " : ""}${lines[this.said++ % lines.length]}`;
    this.setHold(true);
    return { npc: this.npc, name: this.name, text };
  }
  /** Terminou a conversa: volta a passear. */
  release() {
    this.setHold(false);
  }
  get talking() {
    return this.hold;
  }
  /** Vira-se para (x, y). */
  faceTo(x, y) {
    const dx = x - this.x;
    const dy = y - this.y;
    const f = Math.abs(dx) > Math.abs(dy) ? dx < 0 ? "left" : "right" : dy < 0 ? "up" : "down";
    this.facing = f;
  }
  /** A caixa dos pés inteira fica em rua/praça? */
  allowedAt(x, y) {
    const { halfW, halfD } = this.spec;
    for (let cy = Math.floor(y - halfD); cy <= Math.floor(y + halfD); cy++) {
      for (let cx = Math.floor(x - halfW); cx <= Math.floor(x + halfW); cx++) if (!this.onStreet(cx, cy)) return false;
    }
    return true;
  }
  update(dt, world, blocked, time = -1, target) {
    if (this.companion !== "off") {
      this.escort(dt, world, blocked, target);
      return;
    }
    if (this.schedule && time >= 0 && this.home) {
      this.routine(dt, world, blocked, time);
      return;
    }
    this.post(dt, world, blocked);
  }
  /**
   * Acompanhante: anda atrás da jogadora (parando a ~2 células, de frente para ela), corre para alcançá-la quando fica para trás e, se a perde de
   * vista (longe demais), aparece ao lado dela. Ao terminar volta sozinho ao posto e retoma o passeio.
   */
  escort(dt, world, blocked, target) {
    if (this.hold) {
      this.move(dt, 0, 0, world, blocked);
      return;
    }
    const free = (self, x, y) => !!blocked?.(self, x, y);
    if (this.companion === "home") {
      this.spec.speed = this.cruise;
      if (this.steer(dt, world, free, this.homeX, this.homeY, true)) {
        this.companion = "off";
        this.moving = false;
      }
      return;
    }
    if (!target) {
      this.move(dt, 0, 0, world, blocked);
      return;
    }
    const dx = target.x - this.x, dy = target.y - this.y;
    const d = Math.hypot(dx, dy);
    if (d > 18 * SUBDIV) {
      this.x = target.x - 1.5;
      this.y = target.y;
      return;
    }
    if (d <= 2.2 * SUBDIV) {
      this.spec.speed = this.cruise;
      this.faceTo(target.x, target.y);
      this.move(dt, 0, 0, world, blocked);
      return;
    }
    this.spec.speed = d > 5 * SUBDIV ? this.cruise * 2.4 : this.cruise * 1.3;
    this.move(dt, dx / d, dy / d, world, free);
  }
  /** No posto: passeia pela área dele (ou fica parado, se está conversando). */
  post(dt, world, blocked) {
    if (this.hold) {
      this.move(dt, 0, 0, world, blocked);
      return;
    }
    this.wander(dt, world, (self, x, y) => !this.allowedAt(x, y) || !!blocked?.(self, x, y));
  }
  /**
   * Rotina do dia (nível 1): no posto durante o dia; ao anoitecer anda até a porta dos fundos, desbota e dorme (fora do mapa); de manhã aparece
   * nela e volta ao posto. A primeira chamada já nasce no estado certo para a hora (mundo aberto à noite: ele já está dormindo).
   */
  routine(dt, world, blocked, time) {
    const phase = phaseAt(this.schedule, time);
    this.phase = phase;
    const wantAsleep = phase === "asleep";
    const [hx, hy] = this.home;
    if (!this.seeded) {
      this.seeded = true;
      if (wantAsleep) {
        this.mode = "asleep";
        this.fade = 1;
        this.x = hx;
        this.y = hy;
        return;
      }
    }
    switch (this.mode) {
      case "asleep":
        if (wantAsleep) return;
        this.mode = "arriving";
        this.x = hx;
        this.y = hy;
        this.facing = "down";
        return;
      case "arriving":
        this.fade = Math.max(0, this.fade - dt / 1.2);
        this.move(dt, 0, 0, world, blocked);
        if (this.fade <= 0) this.mode = "post";
        return;
      case "goHome":
        if (!wantAsleep) {
          this.mode = "post";
          break;
        }
        if (this.steer(dt, world, blocked, hx, hy)) this.mode = "leaving";
        return;
      case "leaving":
        this.fade = Math.min(1, this.fade + dt / 1.2);
        this.move(dt, 0, 0, world, blocked);
        if (this.fade >= 1) this.mode = "asleep";
        return;
      default:
        break;
    }
    if (this.mode === "post" && wantAsleep && !this.hold) {
      this.mode = "goHome";
      this.stuckFor = 0;
      return;
    }
    this.post(dt, world, blocked);
  }
  /** Anda em linha reta até (tx, ty) respeitando a área do morador; travado por 2 s, chega de uma vez. Devolve se chegou. */
  steer(dt, world, blocked, tx, ty, anywhere = false) {
    const dx = tx - this.x, dy = ty - this.y;
    const d = Math.hypot(dx, dy);
    if (d < 0.3) return true;
    const moved = this.move(dt, dx / d, dy / d, world, (self, x, y) => !anywhere && !this.allowedAt(x, y) || !!blocked?.(self, x, y));
    this.stuckFor = moved < 2e-3 ? this.stuckFor + dt : 0;
    if (this.stuckFor > 2) {
      this.x = tx;
      this.y = ty;
      return true;
    }
    return false;
  }
};

// src/game/npcBrain/missions.ts
var talk = (npc) => (e) => e.type === "talk" && e.npc === npc;
var kills = (kinds) => (e) => e.type === "kill" && kinds.includes(e.monster);
var MISSIONS = [
  {
    id: "m01",
    chapter: 1,
    title: "Um nome na guilda",
    kind: "Introdu\xE7\xE3o",
    turnIn: "guild",
    goals: [
      { id: "guild", text: "Registrar-se na guilda", count: 1, kind: "event", match: talk("guild") },
      { id: "black", text: "Conhecer o ferreiro Black", count: 1, kind: "event", match: talk("black") },
      { id: "bento", text: "Conhecer o mercador Bento", count: 1, kind: "event", match: talk("bento") }
    ],
    reward: { coins: 8 },
    offer: "Mais um aventureiro chegando \xE0 Cidade do Despertar, e ningu\xE9m sabe de onde veio. Por aqui, quem quer trabalho come\xE7a registrando o nome na guilda. \xC9 r\xE1pido: assino o seu registro agora, e voc\xEA ainda conhece o ferreiro e o mercador, que v\xE3o ser os seus parceiros por aqui.",
    prompt: "Quer se registrar como aventureira da guilda?",
    accepted: "Registrado! Agora v\xE1 conhecer o ferreiro Black, na Ferraria, e o mercador Bento, no Mercado. Depois volte aqui, que eu pago o seu primeiro contrato.",
    progress: "Ainda falta conhecer o ferreiro Black e o mercador Bento. Converse com os dois e volte aqui.",
    complete: "Agora voc\xEA \xE9 de casa! Aqui est\xE3o as suas primeiras moedas. A partir de hoje a guilda tem contratos para voc\xEA. Pode me procurar sempre que quiser trabalho."
  },
  {
    id: "m02",
    chapter: 1,
    title: "O pedido do ferreiro",
    kind: "Coleta",
    turnIn: "black",
    goals: [
      { id: "logs", text: "Juntar toras de carvalho", count: 6, kind: "have", items: [blockStack(Block.OAK_LOG)] },
      { id: "stone", text: "Juntar pedras brutas", count: 8, kind: "have", items: [blockStack(Block.STONE)] }
    ],
    reward: { coins: 12 },
    offer: "O Black, o ferreiro, est\xE1 sem material para continuar trabalhando. Ele precisa de 6 toras de carvalho e 8 pedras brutas. Corte \xE1rvores com o machado e quebre pedra com a picareta, e leve tudo a ele. Eu cuido do pagamento.",
    prompt: "Aceita ajudar o ferreiro?",
    accepted: "Boa! Corte 6 toras de carvalho e junte 8 pedras brutas. Quando tiver tudo, entregue ao Black na Ferraria.",
    progress: "Ainda estamos juntando o material do Black: 6 toras de carvalho e 8 pedras brutas. Quando tiver, \xE9 s\xF3 entregar a ele.",
    complete: "Ah, \xE9 disso que eu precisava! Com isso volto \xE0 forja. Aqui est\xE1 o seu pagamento, e diga \xE0 guilda que o Black ficou satisfeito."
  },
  {
    id: "m03",
    chapter: 1,
    title: "Lobos na estrada",
    kind: "Combate",
    turnIn: "guild",
    goals: [
      { id: "wolves", text: "Abater lobos", count: 3, kind: "event", match: kills(WOLF_KINDS) }
    ],
    reward: { coins: 15 },
    offer: "Comerciantes contam que lobos andam atacando as estradas perto da cidade. A guilda abriu um contrato: 3 lobos abatidos. Leve vida cheia, use a espada ou o machado, e n\xE3o deixe que cheguem perto demais.",
    prompt: "Aceita o contrato dos lobos?",
    accepted: "Contrato aceito. Abata 3 lobos fora da muralha e volte aqui para receber o pagamento.",
    progress: "Os lobos ainda est\xE3o soltos. O contrato pede 3 abatidos; cuide da sua vida e volte quando terminar.",
    complete: "Tr\xEAs lobos a menos! As estradas ficam mais seguras gra\xE7as a voc\xEA. Aqui est\xE1 o seu pagamento."
  }
];
var EMPTY_LOG = () => ({ done: [], active: null, progress: {} });
var COIN = Item.COPPER_COIN;

// src/game/residents.ts
var RESIDENT_NAMES = [
  "Adalto",
  "Beatriz",
  "Cec\xEDlia",
  "Davi",
  "Elisa",
  "Fausto",
  "Gael",
  "Helo\xEDsa",
  "Ivo",
  "J\xFAlia",
  "Lara",
  "Mateus",
  "Nina",
  "Osvaldo",
  "Paulina",
  "Quit\xE9ria",
  "Rui",
  "S\xF4nia",
  "Tom\xE1s",
  "Ulisses",
  "Vera",
  "Yara",
  "Zeca",
  "Am\xE9lia",
  "Bruno",
  "Clara",
  "Dora",
  "Estev\xE3o",
  "Fl\xE1via",
  "Geraldo",
  "Helena",
  "In\xEAs",
  "Jonas",
  "L\xFAcia",
  "Murilo",
  "Nair",
  "Ot\xE1vio",
  "Pietra",
  "Renato",
  "Sara",
  "Tiago",
  "Vit\xF3ria",
  "Abel",
  "Berta",
  "C\xEDntia",
  "Dario",
  "Eug\xEAnia",
  "Fabr\xEDcio"
];
var TOWN_PROFESSIONS = [
  { name: "guarda de rua", lines: ["Fa\xE7o a ronda das ruas. A muralha protege a cidade, e eu protejo o caminho at\xE9 a porta de casa.", "Dizem que quem acende a lamparina cedo dorme tranquilo. Eu s\xF3 confiro se todas est\xE3o acesas."] },
  { name: "escriba", lines: ["Copio cartas e registros para a Guilda. Tinta, pena e muita paci\xEAncia: \xE9 s\xF3 disso que preciso.", "Anoto tudo o que acontece na cidade. Se algo importante te acontecer, eu escrevo!"] },
  { name: "alfaiate", lines: ["Costuro capas e coletes para o povo da cidade. Cor boa n\xE3o sai de moda, sabia?", "Um bom tecido dura anos. Cuide do que veste e ele cuida de voc\xEA."] },
  { name: "cozinheiro", lines: ["Cozinho para a Hospedaria. P\xE3o quentinho e sopa de legumes sempre d\xE3o \xE2nimo a quem viaja.", "O segredo de um bom caldo? Trigo fresco, hortali\xE7a da horta e tempo no fogo."] },
  { name: "mensageiro", lines: ["Levo recados de uma ponta \xE0 outra da cidade. Quem anda muito conhece cada pedra da rua!", "J\xE1 entreguei carta at\xE9 no castelo. A porta n\xE3o abriu, mas o guarda leu o envelope."] },
  { name: "pedreiro", lines: ["Assentei muita pedra nestas ruas. Repare: nenhuma est\xE1 torta.", "Pedra, areia e terra: com isso se faz casa, muro e cal\xE7ada. Bloco bem posto n\xE3o cai."] },
  { name: "lampadeiro", lines: ["Cuido dos postes de luz da cidade. De noite a rua fica bonita, toda acesa.", "Limpo o vidro de cada lanterna toda semana. Luz suja n\xE3o ilumina direito."] },
  { name: "aprendiz de ferreiro", lines: ["Quero aprender com o Black a forjar espada. Por enquanto s\xF3 varro a Ferraria.", "Ferro quente \xE9 coisa s\xE9ria. J\xE1 queimei a ponta do cabelo duas vezes!"] }
];
var VILLAGE_PROFESSIONS = [
  { name: "agricultor", lines: ["Planto trigo e hortali\xE7a na vila. Terra arada, semente e \xE1gua: o resto \xE9 esperar.", "Colheita boa \xE9 a que se divide. Leve um pouco de trigo para os bichos!"] },
  { name: "pastor", lines: ["Cuido das ovelhas da vila. Elas gostam de trigo e de sombra, nessa ordem.", "Ovelha tosquiada d\xE1 l\xE3 de novo, sabia? A paci\xEAncia \xE9 toda a ci\xEAncia do pastor."] },
  { name: "lenhador", lines: ["Derrubo \xE1rvores e racho lenha para o inverno. Cada tora serve a uma casa.", "\xC1rvore derrubada pede \xE1rvore plantada. Sempre deixo uma muda no lugar."] },
  { name: "tecel\xE3o", lines: ["Tenho um tear na casa de palha. Fio por fio sai uma manta quentinha.", "A l\xE3 das ovelhas daqui \xE9 macia. D\xE1 pano bom para qualquer esta\xE7\xE3o."] },
  { name: "ordenhador", lines: ["Tiro o leite das vacas toda manh\xE3, bem cedo, antes de o sol esquentar.", "Vaca calma d\xE1 leite bom. Falo baixinho com elas, e elas gostam."] },
  { name: "cuidador de galinhas", lines: ["Recolho os ovos do galinheiro. Cada galinha tem o seu jeitinho de botar.", "Semente de trigo para elas, e ovo fresco para a gente. Troca justa!"] }
];
var PERSONALITIES = ["alegre", "timido", "curioso", "ranzinza", "sonhador"];
var OPENER = {
  alegre: "Que alegria te ver por aqui!",
  timido: "Ah... oi. Desculpe, n\xE3o vi voc\xEA chegar.",
  curioso: "Ei, voc\xEA! De onde veio? Conta tudo!",
  ranzinza: "Humpf. O que voc\xEA quer?",
  sonhador: "Hmm... ah, ol\xE1. Estava longe daqui."
};
var CLOSER = {
  alegre: "Passe sempre por aqui, vai ser um prazer!",
  timido: "Bem... \xE9 s\xF3 isso. Obrigado por ouvir.",
  curioso: "E voc\xEA, o que anda fazendo de interessante?",
  ranzinza: "Agora, com licen\xE7a, tenho o que fazer.",
  sonhador: "\xC0s vezes penso em como seria viver al\xE9m do mapa..."
};
var HUES = [0.09, 0.17, 0.25, 0.33, 0.42, 0.5, 0.58, 0.67, 0.75, 0.83, 0.92];
var SATS = [0.9, 1, 1.1];
var VALS = [0.86, 0.95, 1.04];
var RESIDENT_BASES = NPC_IDS.filter((id) => id !== SMITH && id !== MERCHANT && id !== FLORIST_KEEPER);
var GUILD_MASTER = {
  id: "guild",
  base: "noel",
  name: "Mestre Aldric",
  profession: "Mestre da Guilda",
  personality: "ranzinza",
  role: "guild",
  look: { hue: 0.93, sat: 1.05, val: 1 },
  lines: [
    "Bem-vindo \xE0 Guilda dos Aventureiros! Aqui os contratos da cidade passam por mim. Quem prova ser \xFAtil tem trabalho e moedas de sobra.",
    "N\xE3o importa de onde veio. Na guilda, o que vale \xE9 o nome que voc\xEA faz com o que entrega."
  ]
};
var NO_LOOK = { hue: 0, sat: 1, val: 1 };
function makeResidents(seed, place, count, avoidNames = []) {
  const salt = place === "town" ? 32337 : 20905;
  const professions = place === "town" ? TOWN_PROFESSIONS : VILLAGE_PROFESSIONS;
  const pick = (n, i, k) => Math.floor(hash2(seed ^ salt, i * 131 + k, 977 + k) * n);
  const usedNames = new Set(avoidNames);
  const usedLooks = /* @__PURE__ */ new Set();
  const out = [];
  for (let i = 0; i < count; i++) {
    let name = "";
    for (let t = 0; t < RESIDENT_NAMES.length; t++) {
      const cand = RESIDENT_NAMES[(pick(RESIDENT_NAMES.length, i, 1) + t) % RESIDENT_NAMES.length];
      if (!usedNames.has(cand)) {
        name = cand;
        break;
      }
    }
    usedNames.add(name);
    let base = RESIDENT_BASES[0], look = NO_LOOK;
    for (let t = 0; t < RESIDENT_BASES.length * HUES.length; t++) {
      const b = RESIDENT_BASES[(pick(RESIDENT_BASES.length, i, 2) + t) % RESIDENT_BASES.length];
      const h = HUES[(pick(HUES.length, i, 3) + Math.floor(t / RESIDENT_BASES.length)) % HUES.length];
      if (usedLooks.has(`${b}|${h}`)) continue;
      usedLooks.add(`${b}|${h}`);
      base = b;
      look = { hue: h, sat: SATS[pick(SATS.length, i, 4)], val: VALS[pick(VALS.length, i, 5)] };
      break;
    }
    const prof = professions[pick(professions.length, i, 6)];
    const personality = PERSONALITIES[pick(PERSONALITIES.length, i, 7)];
    out.push({
      id: `r${place === "town" ? "t" : "v"}${i}`,
      base,
      name,
      profession: prof.name,
      personality,
      look,
      lines: [`${OPENER[personality]} ${prof.lines[0]}`, `${prof.lines[1]} ${CLOSER[personality]}`]
    });
  }
  return out;
}
var NAMED_NPC_NAMES = new Set(NPCS.map((n) => n.name));

// src/world/interiors.ts
var SMITHY_INTERIOR = {
  id: "smithy",
  name: "Ferraria",
  building: Block.SMITHY,
  map: [
    "#########",
    // 0  moldura
    "#########",
    // 1  parede do fundo
    "#########",
    // 2
    "#########",
    // 3
    "#########",
    // 4  estante, bigorna, forja
    "#########",
    // 5  barris, base da forja
    "####.####",
    // 6  mesa de projetos | armeiro
    "####.####",
    // 7
    "####.####",
    // 8  banquinho
    "##....###",
    // 9  barril | tapete | planta, caixotes
    "###...###",
    // 10 estante de armaduras
    "###.....#",
    // 11 atrás do balcão (passagem pelo lado dos caixotes)
    "#######.#",
    // 12 balcão
    "#######.#",
    // 13
    "#.......#",
    // 14
    "#.......#",
    // 15
    "#.......#",
    // 16
    "####E####"
    // 17 capacho
  ],
  keeper: { at: [4, 11], rows: [9, 11] }
};
var TENT_INTERIOR = {
  id: "tent",
  name: "Tenda",
  map: [
    "#######",
    // 0  parede do fundo (cortina)
    "#######",
    // 1  pé da cortina do fundo, lampião, cabeceira do colchão
    "##..###",
    // 2  lampião | colchão
    "#...###",
    // 3
    "#...###",
    // 4
    "#...###",
    // 5  pé do colchão
    "###E###"
    // 6  capacho entre os postes
  ]
};
var MARKET_INTERIOR = {
  id: "market",
  name: "Mercado",
  buildings: [Block.SHOP_POTION, Block.SHOP_GOODS, Block.SHOP_TOOLS],
  map: [
    "########################",
    // 0  parede do fundo
    "########################",
    // 1  janelas, cortinas e prateleiras
    "########################",
    // 2
    "########################",
    // 3  prateleiras
    "##....................##",
    // 4  corredor atrás dos balcões (o mercador anda aqui)
    "##..####..####..####..##",
    // 5  balcões
    "##..####..####..####..##",
    // 6
    "##....................##",
    // 7
    "##.#####..####..#####.##",
    // 8  caixotes de legumes, queijos, leite e pães
    "##.#####..####..#####.##",
    // 9
    "##....................##",
    // 10
    "####..#####..#####..####",
    // 11 muro da frente: as três entradas
    "####EE#####EE#####EE####"
    // 12 capachos de saída
  ],
  keeper: { at: [11, 4], rows: [4, 4] }
};
var FLORIST_INTERIOR = {
  id: "florist",
  name: "Floricultura",
  building: Block.FLORIST,
  map: [
    "########################",
    // 0  parede do fundo, janelas e cortinas
    "########################",
    // 1
    "########################",
    // 2  prateleiras e vasos
    "########################",
    // 3
    "########........########",
    // 4  atrás do balcão (a florista anda aqui)
    "##.......######.......##",
    // 5  balcão
    "##.......######.......##",
    // 6
    "##.#####........#####.##",
    // 7  canteiros (esquerdo e direito)
    "##.#####........#####.##",
    // 8
    "##.#####........#####.##",
    // 9
    "###########..###########",
    // 10 entre os pilares (o muro de pedra da frente fecha o resto)
    "###########..###########",
    // 11 entrada (2 células)
    "###########EE###########"
    // 12 capacho de saída
  ],
  keeper: { at: [11, 4], rows: [4, 4] }
};
var GUILD_INTERIOR = {
  id: "guild",
  name: "Guilda dos Aventureiros",
  building: Block.GUILD,
  map: [
    "########################",
    // 0  parede do fundo, janelas, estandartes
    "########################",
    // 1
    "########################",
    // 2
    "########################",
    // 3  estantes, mapa, armas
    "########################",
    // 4  lareira à direita
    "#####..............#####",
    // 5  atrás do balcão (o Mestre anda aqui); quadro e lareira
    "####.##############.####",
    // 6  balcão
    "####.##############.####",
    // 7
    "####................####",
    // 8
    "####.####......####.####",
    // 9  mesas de cima
    "#....####......####....#",
    // 10
    "###..####......####...##",
    // 11 barris | caixotes
    "###.#####......#####..##",
    // 12 mesas de baixo
    "#...#####......#####...#",
    // 13
    "#...#####......#####...#",
    // 14
    "###...................##",
    // 15 plantas nos cantos
    "#########......#########",
    // 16 entrada entre os pilares
    "#########EEEEEE#########"
    // 17 capacho
  ],
  keeper: { at: [11, 5], rows: [5, 5] }
};
var INTERIOR_DEFS = [SMITHY_INTERIOR, MARKET_INTERIOR, FLORIST_INTERIOR, GUILD_INTERIOR];
var INTERIOR_ORIGIN = [0, -1e5];
var INTERIOR_SPACING = 64 * SUBDIV;
var INTERIOR_MARGIN = 2 * SUBDIV;
function scaleInteriorDef(def, s) {
  if (s === 1) return def;
  const map = def.map.flatMap((row) => {
    const wide = [...row].map((c) => c.repeat(s)).join("");
    return Array.from({ length: s }, () => wide);
  });
  const keeper = def.keeper ? { at: [def.keeper.at[0] * s, def.keeper.at[1] * s], rows: [def.keeper.rows[0] * s, (def.keeper.rows[1] + 1) * s - 1] } : void 0;
  return { ...def, map, keeper };
}
function matsOf(map) {
  const seen = /* @__PURE__ */ new Set();
  const out = [];
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] !== "E" || seen.has(`${x},${y}`)) continue;
      const rect = { x0: x, y0: y, x1: x, y1: y };
      const stack = [[x, y]];
      seen.add(`${x},${y}`);
      while (stack.length) {
        const [cx, cy] = stack.pop();
        rect.x0 = Math.min(rect.x0, cx);
        rect.x1 = Math.max(rect.x1, cx);
        rect.y0 = Math.min(rect.y0, cy);
        rect.y1 = Math.max(rect.y1, cy);
        for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
          const nx = cx + dx, ny = cy + dy;
          if (map[ny]?.[nx] === "E" && !seen.has(`${nx},${ny}`)) {
            seen.add(`${nx},${ny}`);
            stack.push([nx, ny]);
          }
        }
      }
      out.push({ at: [rect.x0, rect.y0], rect });
    }
  }
  return out.sort((a, b) => a.at[0] - b.at[0]);
}
function layoutFor(base, k, outsides) {
  const def = scaleInteriorDef(base, SUBDIV);
  const w = def.map[0].length;
  const h = def.map.length;
  const x0 = INTERIOR_ORIGIN[0] + k * INTERIOR_SPACING;
  const y0 = INTERIOR_ORIGIN[1];
  const area = { x0, y0, x1: x0 + w - 1, y1: y0 + h - 1 };
  const doors = matsOf(def.map).map((m, i) => ({
    // capacho sem porta própria (a construção não existe): sai pela primeira porta que existir
    outside: outsides[i] ?? outsides.find((o) => o) ?? null,
    entry: [x0 + m.at[0], y0 + m.at[1] - 1],
    exit: [x0 + m.at[0], y0 + m.at[1]],
    mat: { x0: x0 + m.rect.x0, y0: y0 + m.rect.y0, x1: x0 + m.rect.x1, y1: y0 + m.rect.y1 }
  }));
  return {
    def,
    w,
    h,
    area,
    guard: { x0: x0 - INTERIOR_MARGIN, y0: y0 - INTERIOR_MARGIN, x1: area.x1 + INTERIOR_MARGIN, y1: area.y1 + INTERIOR_MARGIN },
    doors,
    entry: doors[0].entry,
    exit: doors[0].exit,
    outside: doors[0].outside,
    keeper: def.keeper ? { at: [x0 + def.keeper.at[0], y0 + def.keeper.at[1]], rows: [y0 + def.keeper.rows[0], y0 + def.keeper.rows[1]] } : null
  };
}
function interiorLayouts(town) {
  const out = [];
  INTERIOR_DEFS.forEach((def, k) => {
    const ids = def.buildings ?? (def.building !== void 0 ? [def.building] : []);
    const outsides = ids.map((id) => town.buildings.find((x) => x.id === id && x.door)?.door ?? null);
    if (outsides.some((o) => o)) out.push(layoutFor(def, k, outsides));
  });
  return out;
}
function tentLayout() {
  return layoutFor(TENT_INTERIOR, INTERIOR_DEFS.length, [null]);
}
function interiorFloor(l, x, y) {
  if (!inRect(l.area, x, y)) return false;
  return l.def.map[y - l.area.y0][x - l.area.x0] !== "#";
}
var InteriorTerrain = class {
  constructor(base, layouts) {
    this.base = base;
    this.layouts = layouts;
  }
  base;
  layouts;
  get seed() {
    return this.base.seed;
  }
  at(x, y) {
    return this.layouts.find((l) => inRect(l.guard, x, y));
  }
  cellAt(x, y) {
    const l = this.at(x, y);
    if (!l) return this.base.cellAt(x, y);
    return interiorFloor(l, x, y) ? { ground: Block.STONE_SMOOTH, object: Block.AIR, upper: Block.AIR } : { ground: Block.STONE_SMOOTH, object: Block.TOWN_PART, upper: Block.AIR };
  }
  groundAt(x, y) {
    return this.cellAt(x, y).ground;
  }
  objectAt(x, y) {
    return this.cellAt(x, y).object;
  }
  upperAt(x, y) {
    return this.cellAt(x, y).upper;
  }
  biomeAt(x, y) {
    return this.base.biomeAt(x, y);
  }
  generateChunk(cx, cy, ground2, objects, upper) {
    this.base.generateChunk(cx, cy, ground2, objects, upper);
    const S = Math.round(Math.sqrt(ground2.length));
    const x0 = cx * S;
    const y0 = cy * S;
    for (const l of this.layouts) {
      const g = l.guard;
      if (x0 > g.x1 || x0 + S - 1 < g.x0 || y0 > g.y1 || y0 + S - 1 < g.y0) continue;
      for (let ly = 0; ly < S; ly++) {
        for (let lx = 0; lx < S; lx++) {
          const x = x0 + lx;
          const y = y0 + ly;
          if (!inRect(g, x, y)) continue;
          const c = this.cellAt(x, y);
          const i = ly * S + lx;
          ground2[i] = c.ground;
          objects[i] = c.object;
          upper[i] = c.upper;
        }
      }
    }
  }
};

// src/game/monster.ts
var WOLF_SIGHT = 3;
var GOBLIN_SIGHT = WOLF_SIGHT * SUBDIV;
var GOBLIN_ATTACK_SECONDS = 0.55;
var GOBLIN_WINDUP = 0.4;
var WOLF_WINDUP = 0.3;
var GOBLIN_ALERT_SECONDS = 0.48;
function hasPoses(kind) {
  return kind === "goblin" || kind === "lizard" || isWolf(kind);
}
var GOBLIN_VISUALS = ["idle", "walk", "run", "alert", "attack", "hurt"];
var MONSTERS = {
  "spider-small": { spec: { speed: 2.1, halfW: 0.3, halfD: 0.18, stepHeight: 0 }, sight: 6, leash: 5, biteEvery: 1, respawn: 40, deathSeconds: 0.7 },
  "spider-big": { spec: { speed: 1.6, halfW: 0.42, halfD: 0.24, stepHeight: 0 }, sight: 7, leash: 5, biteEvery: 1.2, respawn: 60, deathSeconds: 0.9 },
  "spider-boss": { spec: { speed: 1.15, halfW: 0.9, halfD: 0.45, stepHeight: 0 }, sight: 9, leash: 4, biteEvery: 1.6, respawn: 300, deathSeconds: 1.6 },
  // Lobos (v0.91.0): só atacam a personagem a até 3 células (regra do dono do produto: `sight` = 3, em linha reta);
  // mais lentos que ela (4,2) para dar para fugir; o bando passeia junto, perto da toca.
  "wolf-brown": { spec: { speed: 3, halfW: 0.36, halfD: 0.2, stepHeight: 1 }, sight: WOLF_SIGHT, leash: 5, biteEvery: 1.1, respawn: 120, deathSeconds: 0.8, open: true, windup: WOLF_WINDUP },
  "wolf-gray": { spec: { speed: 3, halfW: 0.36, halfD: 0.2, stepHeight: 1 }, sight: WOLF_SIGHT, leash: 5, biteEvery: 1.1, respawn: 120, deathSeconds: 0.8, open: true, windup: WOLF_WINDUP },
  "wolf-white": { spec: { speed: 3, halfW: 0.36, halfD: 0.2, stepHeight: 1 }, sight: WOLF_SIGHT, leash: 5, biteEvery: 1.1, respawn: 120, deathSeconds: 0.8, open: true, windup: WOLF_WINDUP },
  // Goblins guard a campfire in groups of seven; aggression only within 3 cells.
  goblin: {
    spec: { speed: 2.75, halfW: 0.34, halfD: 0.21, stepHeight: 1 },
    sight: WOLF_SIGHT,
    leash: 4,
    biteEvery: 1.2,
    respawn: 150,
    deathSeconds: 0.95,
    open: true,
    windup: GOBLIN_WINDUP
  },
  // Homem-lagarto (v0.93.60): vive junto de rios e anda em grupos de três; mesma visão, coleira e ritmo do goblin.
  lizard: {
    spec: { speed: 2.9, halfW: 0.34, halfD: 0.21, stepHeight: 1 },
    sight: WOLF_SIGHT,
    leash: 4,
    biteEvery: 1.2,
    respawn: 150,
    deathSeconds: 0.95,
    open: true,
    windup: GOBLIN_WINDUP
  }
};
if (SUBDIV !== 1) for (const d of Object.values(MONSTERS)) {
  d.sight *= SUBDIV;
  d.leash *= SUBDIV;
}
var HURT_SECONDS = 0.35;
var Monster = class extends Walker {
  constructor(kind, x, y, bounds, rand = Math.random, homeX = x, homeY = y) {
    super(x, y, { ...MONSTERS[kind].spec });
    this.kind = kind;
    this.bounds = bounds;
    this.rand = rand;
    this.homeX = homeX;
    this.homeY = homeY;
    this.hp = this.maxHp = MONSTER_STATS[kind].hp;
    this.state = { kind: "idle", timer: 0.5 + rand() * 2 };
  }
  kind;
  bounds;
  rand;
  homeX;
  homeY;
  hp;
  maxHp;
  hurt = 0;
  /** Espera até poder morder de novo (s). */
  biteCd = 0;
  /** Ataque armado: tempo restante até o dano (> 0) e se o dano está pendente (ao zerar, o próximo `tryBite` o aplica). */
  windupLeft = 0;
  strikePending = false;
  state;
  attackAnim = 0;
  alertAnim = 0;
  chasing = false;
  /** Network mirror visual override (not part of monster combat simulation). */
  presentationState = null;
  presentationFrame = null;
  get visualState() {
    if (this.presentationState) return this.presentationState;
    if (this.hurt > 0) return "hurt";
    if (this.attackAnim > 0) return "attack";
    if (this.alertAnim > 0) return "alert";
    if (this.chasing && this.moving) return "run";
    return this.moving ? "walk" : "idle";
  }
  get visualFrame() {
    if (this.presentationFrame !== null) return this.presentationFrame;
    if (this.visualState === "attack") return Math.min(3, Math.floor((1 - this.attackAnim / GOBLIN_ATTACK_SECONDS) * 4));
    if (this.visualState === "alert") return Math.min(3, Math.floor((1 - this.alertAnim / GOBLIN_ALERT_SECONDS) * 4));
    if (this.visualState === "hurt") return Math.min(3, Math.floor((1 - this.hurt / HURT_SECONDS) * 4));
    return 0;
  }
  get dead() {
    return this.hp <= 0;
  }
  /** A caixa dos pés em (x, y) fica toda dentro do interior? */
  insideAt(x, y) {
    const { halfW, halfD } = this.spec;
    const b = this.bounds;
    return x - halfW >= b.x0 && x + halfW <= b.x1 + 1 && y - halfD >= b.y0 && y + halfD <= b.y1 + 1;
  }
  /**
   * Leva um golpe de `damage` pontos: perde vida, pisca e é empurrado para longe de (fromX, fromY). `knock` (1 = o recuo de
   * sempre) escala o empurrão: golpe forte ou crítico recua mais. Um ataque armado é interrompido.
   */
  takeHit(damage, fromX, fromY, world, blocked, knock = 1) {
    this.hp -= damage;
    this.hurt = HURT_SECONDS;
    this.windupLeft = 0;
    this.strikePending = false;
    this.attackAnim = 0;
    const d = Math.hypot(this.x - fromX, this.y - fromY) || 1;
    const facing = this.facing;
    this.move(0.25 * knock, (this.x - fromX) / d, (this.y - fromY) / d, world, this.confine(blocked));
    this.facing = facing;
  }
  /** Bloqueio entre entidades + limite do interior. */
  confine(blocked) {
    return (self, x, y) => !this.insideAt(x, y) || !!blocked?.(self, x, y);
  }
  /** Distância de mordida (centro a centro). */
  get reach() {
    return 0.7 * SUBDIV + this.spec.halfW;
  }
  /**
   * Encostado na personagem e pronto para morder? Devolve true no instante em que o dano deve sair.
   * Monstros com `windup` (goblin, lagarto, lobos) **armam** o ataque: ao chegar ao alcance tocam a pose de ataque e só
   * causam dano `windup` segundos depois — e só se a personagem ainda estiver ao alcance (dá para esquivar); um golpe
   * recebido nesse meio-tempo cancela o ataque. Sem `windup` (aranhas) o dano é imediato, como antes.
   */
  tryBite(target) {
    if (this.dead || this.hurt > 0) return false;
    const inReach = Math.hypot(target.x - this.x, target.y - this.y) <= this.reach + 0.15;
    if (this.strikePending) {
      if (this.windupLeft > 0) return false;
      this.strikePending = false;
      this.biteCd = MONSTERS[this.kind].biteEvery;
      return inReach;
    }
    if (this.biteCd > 0 || !inReach) return false;
    const w = MONSTERS[this.kind].windup ?? 0;
    if (hasPoses(this.kind)) this.attackAnim = GOBLIN_ATTACK_SECONDS;
    if (w <= 0) {
      this.biteCd = MONSTERS[this.kind].biteEvery;
      return true;
    }
    this.windupLeft = w;
    this.strikePending = true;
    return false;
  }
  /**
   * Passeia; com a personagem dentro do seu limite e perto (pelo caminho, se houver `flow`), persegue.
   * Com `flow` (mapa de distâncias da dungeon) segue os corredores: anda para a célula vizinha mais próxima
   * da personagem; encostado, vai direto e pára a `reach`.
   */
  update(dt, world, target, blocked, flow) {
    this.hurt = Math.max(0, this.hurt - dt);
    this.biteCd = Math.max(0, this.biteCd - dt);
    this.attackAnim = Math.max(0, this.attackAnim - dt);
    this.windupLeft = Math.max(0, this.windupLeft - dt);
    this.alertAnim = Math.max(0, this.alertAnim - dt);
    const def = MONSTERS[this.kind];
    const fence = this.confine(blocked);
    const tx = target.x - this.x;
    const ty = target.y - this.y;
    const dist = Math.hypot(tx, ty);
    const targetInside = inRect(this.bounds, Math.floor(target.x), Math.floor(target.y));
    const cx = Math.floor(this.x);
    const cy = Math.floor(this.y);
    const steps = flow ? flow(cx, cy) : -1;
    const chasing = targetInside && (def.open ? dist <= def.sight : flow ? steps >= 0 && steps <= def.sight * 1.6 : dist < def.sight);
    if (chasing) {
      if (hasPoses(this.kind) && !this.chasing) this.alertAnim = GOBLIN_ALERT_SECONDS;
      this.chasing = true;
      const reach = this.reach;
      if (this.windupLeft > 0 || dist <= reach) {
        this.move(dt, 0, 0, world, fence);
        this.facing = Math.abs(tx) > Math.abs(ty) ? tx < 0 ? "left" : "right" : ty < 0 ? "up" : "down";
        return;
      }
      let dx = tx / dist;
      let dy = ty / dist;
      if (flow && !def.open && steps > 1) {
        let best = steps;
        let nx = cx;
        let ny = cy;
        for (const [ox, oy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
          const d = flow(cx + ox, cy + oy);
          if (d >= 0 && d < best) {
            best = d;
            nx = cx + ox;
            ny = cy + oy;
          }
        }
        const gx = nx + 0.5 - this.x;
        const gy = ny + 0.5 - this.y;
        const gl = Math.hypot(gx, gy) || 1;
        dx = gx / gl;
        dy = gy / gl;
      }
      this.move(dt, dx, dy, world, fence);
      return;
    }
    this.chasing = false;
    const s = this.state;
    s.timer -= dt;
    if (s.kind === "idle") {
      this.move(dt, 0, 0, world, fence);
      if (s.timer <= 0) {
        const hx = this.homeX - this.x;
        const hy = this.homeY - this.y;
        const far = Math.hypot(hx, hy) > def.leash;
        const a = far ? Math.atan2(hy, hx) : this.rand() * Math.PI * 2;
        this.state = { kind: "walk", timer: 0.8 + this.rand() * 1.8, dx: Math.cos(a), dy: Math.sin(a) };
      }
      return;
    }
    const moved = this.move(dt, s.dx * 0.6, s.dy * 0.6, world, fence);
    if (s.timer <= 0 || moved < 1e-4) this.state = { kind: "idle", timer: 0.6 + this.rand() * 2.2 };
  }
};

// src/world/town.ts
var TOWN_W = 164;
var TOWN_H = 132;
var TOWN_X0 = -TOWN_W / 2;
var TOWN_Y0 = -TOWN_H;
var TOWN_SEED = 233152122;
var TOWN_MARGIN = 8 * SUBDIV;
var TOWN_CLEAR = 3 * SUBDIV;
var ROAD_LEN = 14 * SUBDIV;
var TOWN_SOUTH_FIELD = 28 * SUBDIV;
var WALL = 2;
var TOWN_WALL = WALL * SUBDIV;
var TOWN_SIZES = {
  [Block.CASTLE]: [26, 17, 17],
  [Block.GUILD]: [9, 9, 9],
  [Block.INN]: [9, 5, 5],
  [Block.FLORIST]: [9, 5, 5],
  [Block.SMITHY]: [8, 5, 5],
  [Block.SHOP_POTION]: [5, 5, 4],
  [Block.SHOP_GOODS]: [5, 5, 5],
  [Block.SHOP_TOOLS]: [5, 5, 4],
  [Block.HOUSE]: [5, 5, 4],
  [Block.HOUSE_TALL]: [5, 5, 5],
  [Block.WATCHTOWER]: [4, 6, 6],
  [Block.WELL]: [2, 2, 2],
  [Block.FOUNTAIN]: [5, 5, 5],
  [Block.STALL]: [2, 1, 1],
  [Block.BENCH]: [2, 1, 1],
  [Block.BENCH_LONG]: [3, 1, 1]
};
function townSize(id) {
  const s = TOWN_SIZES[id];
  return s ? [s[0], s[1]] : [1, 1];
}
function townSolid(id) {
  return TOWN_SIZES[id]?.[2] ?? 1;
}
var SIGNS = [
  "Cidade do Despertar \u2014 o Castelo fica ao norte; o port\xE3o, ao sul",
  "Pra\xE7a Central: Guilda a oeste, Hospedaria a leste",
  "Ferreiro e Lojas: siga as ruas a partir da Pra\xE7a Central"
];
var FREE = 0;
var STREET = 1;
var PLAZA = 2;
var WALLED = 3;
var BUILT = 4;
var RESERVED = 5;
var WALKWAY = 6;
var DECOR = 7;
var YARD = 8;
var cached = null;
function townLayout() {
  return cached ??= SUBDIV > 1 ? upsampleTown(buildTown(), SUBDIV) : buildTown();
}
function upsampleTown(l, s) {
  if (s === 1) return l;
  const W = l.w * s;
  const H = l.h * s;
  const ground2 = new Uint8Array(W * H);
  const objects = new Uint8Array(W * H);
  const upper = new Uint8Array(W * H);
  const street = new Uint8Array(W * H);
  const buildingAt = new Int16Array(W * H).fill(-1);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const cx = Math.floor(x / s);
      const cy = Math.floor(y / s);
      const j = cy * l.w + cx;
      const i = y * W + x;
      ground2[i] = l.ground[j];
      upper[i] = l.upper[j];
      street[i] = l.street[j];
      buildingAt[i] = l.buildingAt[j];
      const o = l.objects[j];
      if (o === Block.AIR) continue;
      const corner = x % s === 0 && y % s === s - 1;
      if (o === Block.TOWN_PART || o === Block.HEDGE || blockDef(o).shape === "cube") objects[i] = o;
      else if (l.buildingAt[j] >= 0) objects[i] = corner ? o : Block.TOWN_PART;
      else if (corner) objects[i] = o;
    }
  }
  const a = l.area;
  const sc = (r) => ({ x0: r.x0 * s, y0: r.y0 * s, x1: (r.x1 + 1) * s - 1, y1: (r.y1 + 1) * s - 1 });
  const pt = ([x, y]) => [x * s, y * s];
  return {
    w: W,
    h: H,
    area: sc(a),
    gate: sc(l.gate),
    start: pt(l.start),
    doorstep: pt(l.doorstep),
    castleDoor: pt(l.castleDoor),
    buildings: l.buildings.map((b) => ({
      ...b,
      x: b.x * s,
      y: (b.y + 1) * s - 1,
      w: b.w * s,
      d: b.d * s,
      door: b.door ? pt(b.door) : null
    })),
    ground: ground2,
    objects,
    upper,
    buildingAt,
    street
  };
}
function buildTown() {
  const W = TOWN_W;
  const H = TOWN_H;
  const rand = mulberry32(TOWN_SEED);
  const ri = (n) => Math.floor(rand() * n);
  const idx = (x, y) => y * W + x;
  const inside = (x, y) => x >= 0 && y >= 0 && x < W && y < H;
  const ground2 = new Uint8Array(W * H).fill(Block.GRASS);
  const FLOOR = Block.STONE_BRICK;
  const objects = new Uint8Array(W * H);
  const upper = new Uint8Array(W * H);
  const use = new Uint8Array(W * H);
  const keepOff = new Uint8Array(W * H);
  const main = new Uint8Array(W * H);
  const buildingAt = new Int16Array(W * H).fill(-1);
  const buildings = [];
  const h = (x, y, salt) => hash2(TOWN_SEED, x * 31 + salt, y * 17 - salt);
  const GX0 = W / 2 - 2;
  const GX1 = W / 2 + 1;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (x >= WALL && y >= WALL && x < W - WALL && y < H - WALL) continue;
      const i = idx(x, y);
      ground2[i] = FLOOR;
      if (y >= H - WALL && x >= GX0 && x <= GX1) {
        use[i] = STREET;
        continue;
      }
      use[i] = WALLED;
      objects[i] = Block.STONE_BRICK;
      upper[i] = Block.STONE_BRICK;
    }
  }
  const place = (id, x, y, name, door) => {
    const [w, lot] = townSize(id);
    const d = townSolid(id);
    const b = {
      id,
      name,
      x: TOWN_X0 + x,
      y: TOWN_Y0 + y + lot - 1,
      w,
      d,
      door: door ? [TOWN_X0 + x + Math.floor(w / 2), TOWN_Y0 + y + lot] : null
    };
    const k = buildings.push(b) - 1;
    for (let yy = y; yy < y + lot - d; yy++) {
      for (let xx = x; xx < x + w; xx++) if (use[idx(xx, yy)] === FREE || use[idx(xx, yy)] === RESERVED) use[idx(xx, yy)] = YARD;
    }
    y += lot - d;
    for (let yy = y; yy < y + d; yy++) {
      for (let xx = x; xx < x + w; xx++) {
        const i = idx(xx, yy);
        if (use[i] !== WALLED && use[i] !== PLAZA && use[i] !== STREET) ground2[i] = Block.GRASS;
        use[i] = BUILT;
        objects[i] = Block.TOWN_PART;
        upper[i] = Block.AIR;
        buildingAt[i] = k;
      }
    }
    objects[idx(x, y + d - 1)] = id;
    return b;
  };
  const rect = (x0, y0, x1, y1, fn) => {
    for (let y = Math.max(0, y0); y <= Math.min(H - 1, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(W - 1, x1); x++) fn(x, y, idx(x, y));
  };
  const TW = 4;
  const TD = 6;
  place(Block.WATCHTOWER, 0, 0, "Guarita", false);
  place(Block.WATCHTOWER, W - TW, 0, "Guarita", false);
  place(Block.WATCHTOWER, 0, H - TD, "Guarita", false);
  place(Block.WATCHTOWER, W - TW, H - TD, "Guarita", false);
  place(Block.WATCHTOWER, GX0 - TW, H - TD, "Guarita", false);
  place(Block.WATCHTOWER, GX1 + 1, H - TD, "Guarita", false);
  const CX0 = W / 2 - 13;
  const CY1 = 3 + 17;
  const COURT_Y1 = CY1 + 7;
  rect(CX0 - 2, WALL, CX0 + 27, COURT_Y1, (_x, _y, i) => {
    if (use[i] === FREE) use[i] = RESERVED;
  });
  const castle = place(Block.CASTLE, CX0, 3, "Castelo", true);
  const plaza = (x0, y0, x1, y1, floor) => rect(x0, y0, x1, y1, (_x, _y, i) => {
    use[i] = PLAZA;
    ground2[i] = floor;
  });
  const MID = 70;
  const START_Y = H - 12;
  plaza(CX0 + 2, CY1, CX0 + 23, COURT_Y1, FLOOR);
  plaza(W / 2 - 9, MID - 6, W / 2 + 9, MID + 6, FLOOR);
  plaza(W / 2 - 9, H - 17, W / 2 + 8, H - TD - 1, FLOOR);
  rect(GX0, H - TD, GX1, H - 1, (_x, _y, i) => {
    use[i] = STREET;
    ground2[i] = FLOOR;
  });
  const required = [
    place(Block.GUILD, W / 2 - 28, MID - 8, "Guilda dos Aventureiros", true),
    place(Block.INN, W / 2 + 20, MID - 4, "Hospedaria", true),
    // Floricultura (v0.93.110): a oeste da Praça Central, logo abaixo da Guilda (que vai de MID-8 a MID); a rua chega pela porta, ao sul.
    place(Block.FLORIST, W / 2 - 28, MID + 6, "Floricultura", true),
    place(Block.SMITHY, 30, MID + 18, "Ferreiro", true),
    place(Block.SHOP_POTION, W / 2 + 22, MID + 18, "Mercado", true),
    place(Block.SHOP_GOODS, W / 2 + 27, MID + 18, "Mercado", true),
    place(Block.SHOP_TOOLS, W / 2 + 32, MID + 18, "Mercado", true)
  ];
  for (const b of required) {
    const x0 = b.x - TOWN_X0;
    const y1 = b.y - TOWN_Y0;
    rect(x0 - 1, y1 - townSize(b.id)[1], x0 + b.w, y1 + 1, (_x, _y, i) => {
      keepOff[i] = 1;
    });
    const [dx, dy] = b.door;
    rect(dx - TOWN_X0 - 1, dy - TOWN_Y0, dx - TOWN_X0 + 1, dy - TOWN_Y0, (_x, _y, i) => {
      if (use[i] === FREE) use[i] = RESERVED;
    });
  }
  const carvable = (x, y) => inside(x, y) && (use[idx(x, y)] === FREE || use[idx(x, y)] === STREET || use[idx(x, y)] === PLAZA || use[idx(x, y)] === RESERVED && y > COURT_Y1);
  const segment = (ax, ay, bx, by, width, jog) => {
    const out = [];
    const lo = -Math.floor((width - 1) / 2);
    const hi = lo + width - 1;
    const line = (x0, y0, x1, y1) => {
      for (let y = Math.min(y0, y1) + lo; y <= Math.max(y0, y1) + hi; y++) {
        for (let x = Math.min(x0, x1) + lo; x <= Math.max(x0, x1) + hi; x++) out.push([x, y]);
      }
    };
    if (Math.abs(bx - ax) >= Math.abs(by - ay)) {
      const mx = Math.round((ax + bx) / 2) + jog;
      line(ax, ay, mx, ay);
      line(mx, ay, mx, by);
      line(mx, by, bx, by);
    } else {
      const my = Math.round((ay + by) / 2) + jog;
      line(ax, ay, ax, my);
      line(ax, my, bx, my);
      line(bx, my, bx, by);
    }
    return out;
  };
  const SX = 15;
  const SY = 13;
  const GW = Math.floor((W - 16) / SX) + 1;
  const GH = Math.floor((H - 28) / SY) + 1;
  const nodes = [];
  for (let j = 0; j < GH; j++) {
    for (let i = 0; i < GW; i++) {
      const x = 8 + SX * i + ri(5) - 2;
      const y = 8 + SY * j + ri(5) - 2;
      nodes.push({ x, y, ok: carvable(x, y) && carvable(x + 1, y + 1) && use[idx(x, y)] !== RESERVED });
    }
  }
  const COURT = nodes.push({ x: W / 2, y: COURT_Y1, ok: true }) - 1;
  const edges = [];
  const tryEdge = (a, b, width) => {
    const A = nodes[a];
    const B = nodes[b];
    if (!A.ok || !B.ok) return;
    const jog = ri(3) - 1;
    const cells = segment(A.x, A.y, B.x, B.y, width, jog);
    if (cells.every(([x, y]) => carvable(x, y))) edges.push({ a, b, cells, narrow: segment(A.x, A.y, B.x, B.y, 2, jog) });
  };
  for (let j = 0; j < GH; j++) {
    for (let i = 0; i < GW; i++) {
      const n = j * GW + i;
      if (i + 1 < GW) tryEdge(n, n + 1, 3);
      if (j + 1 < GH) tryEdge(n, n + GW, 3);
    }
  }
  for (let n = 0; n < GW * GH; n++) {
    if (nodes[n].ok && nodes[n].y > COURT_Y1 && nodes[n].y < COURT_Y1 + 10 && Math.abs(nodes[n].x - W / 2) <= 14) tryEdge(COURT, n, 3);
  }
  const adj = /* @__PURE__ */ new Map();
  for (const e of edges) {
    adj.set(e.a, [...adj.get(e.a) ?? [], e]);
    adj.set(e.b, [...adj.get(e.b) ?? [], e]);
  }
  const other = (e, n) => e.a === n ? e.b : e.a;
  const nearestNode = (x, y) => {
    let best = -1;
    let bd = Infinity;
    nodes.forEach((n, k) => {
      if (!n.ok || !adj.has(k)) return;
      const d = Math.hypot(n.x - x, n.y - y);
      if (d < bd) {
        bd = d;
        best = k;
      }
    });
    return best;
  };
  const weight = new Map(edges.map((e) => [e, 1 + rand() * 5]));
  const route = (from, to) => {
    const dist = /* @__PURE__ */ new Map([[from, 0]]);
    const prev = /* @__PURE__ */ new Map();
    const open3 = /* @__PURE__ */ new Set([from]);
    while (open3.size) {
      let cur = -1;
      let cd = Infinity;
      for (const n of open3) {
        const d = dist.get(n);
        if (d < cd) {
          cd = d;
          cur = n;
        }
      }
      open3.delete(cur);
      if (cur === to) break;
      for (const e of adj.get(cur) ?? []) {
        const n = other(e, cur);
        const nd = cd + weight.get(e);
        if (nd < (dist.get(n) ?? Infinity)) {
          dist.set(n, nd);
          prev.set(n, e);
          open3.add(n);
        }
      }
    }
    const out = [];
    for (let n = to; n !== from; ) {
      const e = prev.get(n);
      if (!e) break;
      out.push(e);
      n = other(e, n);
    }
    return out.reverse();
  };
  const startNode = nearestNode(W / 2, H - 18);
  const plazaNode = nearestNode(W / 2, MID);
  const mainEdges = [...route(startNode, plazaNode), ...route(plazaNode, COURT)];
  const inTree = /* @__PURE__ */ new Set();
  const chosen = new Set(mainEdges);
  for (const e of mainEdges) {
    inTree.add(e.a);
    inTree.add(e.b);
  }
  for (let guard = 0; guard < 1e4; guard++) {
    const frontier = edges.filter((e2) => inTree.has(e2.a) !== inTree.has(e2.b));
    if (!frontier.length) break;
    const e = frontier[ri(frontier.length)];
    chosen.add(e);
    inTree.add(e.a);
    inTree.add(e.b);
  }
  for (const e of edges) if (!chosen.has(e) && rand() < 0.16) chosen.add(e);
  const carve = (cells, isMain) => {
    for (const [x, y] of cells) {
      if (!carvable(x, y)) continue;
      const i = idx(x, y);
      if (use[i] !== PLAZA) use[i] = STREET;
      if (isMain) main[i] = 1;
    }
  };
  for (const e of chosen) {
    const isMain = mainEdges.includes(e);
    carve(isMain ? e.cells : e.narrow, isMain);
  }
  const connect = (x, y) => {
    const sx = x - TOWN_X0;
    const sy = y - TOWN_Y0;
    const prev = new Int32Array(W * H).fill(-1);
    const q = [idx(sx, sy)];
    prev[q[0]] = q[0];
    let found = -1;
    for (let k = 0; k < q.length && found < 0; k++) {
      const c = q[k];
      const cx = c % W;
      const cy = Math.floor(c / W);
      for (const [ox, oy] of [[0, 1], [1, 0], [-1, 0], [0, -1]]) {
        const nx = cx + ox;
        const ny = cy + oy;
        if (!inside(nx, ny)) continue;
        const n = idx(nx, ny);
        if (prev[n] >= 0) continue;
        if (use[n] === STREET || use[n] === PLAZA) {
          prev[n] = c;
          found = n;
          break;
        }
        if (use[n] !== FREE && use[n] !== RESERVED) continue;
        prev[n] = c;
        q.push(n);
      }
    }
    for (let c = found; c >= 0 && prev[c] !== c; c = prev[c]) {
      const p = prev[c];
      for (const k of [p, p + 1]) if (use[k] === FREE || use[k] === RESERVED) use[k] = STREET;
    }
    if (use[idx(sx, sy)] !== PLAZA) use[idx(sx, sy)] = STREET;
  };
  for (const b of required) connect(b.door[0], b.door[1]);
  connect(castle.door[0], castle.door[1]);
  const alleyEnds = [];
  for (let n = 0; n < 400 && alleyEnds.length < 10; n++) {
    const x = 4 + ri(W - 8);
    const y = COURT_Y1 + 2 + ri(H - COURT_Y1 - 22);
    if (use[idx(x, y)] !== STREET || main[idx(x, y)]) continue;
    const [ox, oy] = [[1, 0], [-1, 0], [0, 1], [0, -1]][ri(4)];
    const len = 3 + ri(3);
    const cells = [];
    let ok = true;
    for (let k = 1; k <= len + 1 && ok; k++) {
      const cx = x + ox * k;
      const cy = y + oy * k;
      for (const s of [-1, 0, 1]) {
        const tx = cx + (oy !== 0 ? s : 0);
        const ty = cy + (ox !== 0 ? s : 0);
        if (!inside(tx, ty) || use[idx(tx, ty)] !== FREE || keepOff[idx(tx, ty)]) ok = false;
      }
      if (k <= len) cells.push([cx, cy]);
    }
    if (!ok) continue;
    for (const [cx, cy] of cells) use[idx(cx, cy)] = STREET;
    alleyEnds.push(cells[cells.length - 1]);
  }
  rect(0, 0, W - 1, H - 1, (_x, _y, i) => {
    if (use[i] === RESERVED && i > idx(0, COURT_Y1)) use[i] = FREE;
  });
  rect(0, 0, W - 1, H - 1, (_x, _y, i) => {
    if (use[i] === STREET) ground2[i] = FLOOR;
  });
  const isFree = (x, y) => inside(x, y) && use[idx(x, y)] === FREE && !keepOff[idx(x, y)];
  const isWalk = (x, y) => inside(x, y) && (use[idx(x, y)] === STREET || use[idx(x, y)] === PLAZA);
  const setDecor = (x, y, id) => {
    const i = idx(x, y);
    objects[i] = id;
    use[i] = DECOR;
  };
  const nearStreet = (x, y) => [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([ox, oy]) => isWalk(x + ox, y + oy));
  const fx = W / 2 - 1;
  place(Block.FOUNTAIN, W / 2 - 2, MID - 2, "Fonte", false);
  place(Block.WELL, W / 2 + 4, H - 15, "Po\xE7o", false);
  place(Block.STALL, W / 2 - 7, MID - 4, "Barraca", false);
  place(Block.STALL, W / 2 + 5, MID + 4, "Barraca", false);
  place(Block.BENCH, fx - 4, MID + 1, "Banco", false);
  place(Block.BENCH, fx + 5, MID + 1, "Banco", false);
  place(Block.BENCH_LONG, W / 2 - 8, H - 11, "Banco", false);
  place(Block.BENCH_LONG, W / 2 + 5, H - 9, "Banco", false);
  place(Block.BENCH_LONG, CX0 + 5, CY1 + 4, "Banco", false);
  place(Block.BENCH_LONG, CX0 + 18, CY1 + 4, "Banco", false);
  for (const [x, y] of [
    [W / 2 - 9, MID - 6],
    [W / 2 + 9, MID - 6],
    [W / 2 - 9, MID + 6],
    [W / 2 + 9, MID + 6],
    [W / 2 - 9, H - 17],
    [W / 2 + 8, H - 17],
    [CX0 + 2, CY1],
    [CX0 + 23, CY1],
    [CX0 + 2, COURT_Y1],
    [CX0 + 23, COURT_Y1],
    [GX0 - 1, H - TD - 1],
    [GX1 + 1, H - TD - 1]
  ]) setDecor(x, y, Block.LAMP);
  for (const x of [CX0 + 3, CX0 + 4, CX0 + 21, CX0 + 22]) for (const y of [CY1 + 1, CY1 + 2]) setDecor(x, y, Block.HEDGE);
  for (const x of [CX0 + 7, CX0 + 9, CX0 + 16, CX0 + 18]) setDecor(x, CY1 + 1, Block.FLOWER);
  const signs = [[W / 2 - 5, H - 15, SIGNS[0]], [W / 2 - 9, MID + 2, SIGNS[1]], [W / 2 + 8, MID + 7, SIGNS[2]]];
  for (const [x, y, text] of signs) {
    const k = buildings.push({ id: Block.SIGNPOST, name: text, x: TOWN_X0 + x, y: TOWN_Y0 + y, w: 1, d: 1, door: null }) - 1;
    setDecor(x, y, Block.SIGNPOST);
    buildingAt[idx(x, y)] = k;
  }
  const order = [];
  for (let y = WALL + 1; y < H - WALL - 1; y++) for (let x = WALL + 1; x < W - WALL - 1; x++) order.push(idx(x, y));
  for (let k = order.length - 1; k > 0; k--) {
    const j = ri(k + 1);
    [order[k], order[j]] = [order[j], order[k]];
  }
  {
    const [w, d] = townSize(Block.HOUSE);
    for (const c of order) {
      const x = c % W;
      const y = Math.floor(c / W);
      const id = h(x, y, 11) < 0.5 ? Block.HOUSE : Block.HOUSE_TALL;
      let ok = true;
      for (let yy = y - 1; yy <= y + d && ok; yy++) {
        for (let xx = x - 1; xx <= x + w && ok; xx++) {
          const inner = xx >= x && xx < x + w && yy >= y && yy < y + d;
          if (inner ? !isFree(xx, yy) : inside(xx, yy) && (use[idx(xx, yy)] === BUILT || use[idx(xx, yy)] === YARD)) ok = false;
        }
      }
      if (!ok) continue;
      const dx = x + Math.floor(w / 2);
      let path = 0;
      while (path < 4 && !isWalk(dx, y + d + path)) {
        if (!isFree(dx, y + d + path)) {
          path = 99;
          break;
        }
        path++;
      }
      if (path >= 4 || rand() < 0.12) continue;
      for (let k = 0; k < path; k++) {
        const i = idx(dx, y + d + k);
        use[i] = WALKWAY;
        ground2[i] = FLOOR;
      }
      place(id, x, y, "Casa", true);
    }
  }
  const lamps = [];
  rect(0, 0, W - 1, H - 1, (x, y, i) => {
    if (use[i] !== FREE || keepOff[i] || !nearStreet(x, y)) return;
    if (![[1, 0], [-1, 0], [0, 1], [0, -1]].some(([ox, oy]) => inside(x + ox, y + oy) && main[idx(x + ox, y + oy)])) return;
    if (lamps.some(([lx, ly]) => Math.abs(lx - x) + Math.abs(ly - y) < 7)) return;
    lamps.push([x, y]);
    setDecor(x, y, Block.LAMP);
  });
  alleyEnds.forEach(([x, y], k) => setDecor(x, y, k % 2 ? Block.BARREL : Block.CRATES));
  for (const b of required.filter((r) => r.id === Block.SMITHY || r.id === Block.SHOP_TOOLS || r.id === Block.SHOP_POTION)) {
    const x0 = b.x - TOWN_X0;
    const y1 = b.y - TOWN_Y0;
    for (const [x, y] of [[x0 - 1, y1], [x0 + b.w, y1], [x0 - 1, y1 - 1], [x0 + b.w, y1 - 1]]) {
      if (inside(x, y) && use[idx(x, y)] === FREE) setDecor(x, y, h(x, y, 9) < 0.5 ? Block.BARREL : Block.CRATES);
    }
  }
  rect(WALL, WALL, W - WALL - 1, H - WALL - 1, (x, y, i) => {
    if (use[i] !== FREE) return;
    const r = h(x, y, 5);
    if (nearStreet(x, y)) {
      if (r < 0.62) setDecor(x, y, Block.HEDGE);
      else if (r < 0.75) setDecor(x, y, Block.FLOWER);
      return;
    }
    const roomy = [-1, 0, 1].every((oy) => [-1, 0, 1].every((ox) => inside(x + ox, y + oy) && use[idx(x + ox, y + oy)] === FREE));
    if (roomy && r < 0.2 && y > 3) {
      objects[i] = h(x, y, 6) < 0.3 ? Block.SAKURA_TREE : h(x, y, 7) < 0.4 ? Block.BIRCH_TREE : Block.OAK_TREE;
      use[i] = DECOR;
      rect(x - 1, y - 1, x + 1, y + 1, (_x, _y, j) => {
        if (use[j] === FREE) use[j] = RESERVED;
      });
    } else if (r < 0.34) objects[i] = Block.FLOWER;
    else if (r < 0.42) objects[i] = Block.TALL_GRASS;
  });
  rect(0, 0, W - 1, H - 1, (_x, _y, i) => {
    if (use[i] === RESERVED) use[i] = FREE;
  });
  rect(0, 0, W - 1, H - 1, (x, y, i) => {
    if (use[i] !== YARD) return;
    const r = h(x, y, 12);
    objects[i] = r < 0.2 ? Block.FLOWER : r < 0.32 ? Block.TALL_GRASS : Block.AIR;
  });
  const street = new Uint8Array(W * H);
  for (let i = 0; i < W * H; i++) street[i] = use[i] === STREET || use[i] === PLAZA || use[i] === WALKWAY ? 1 : 0;
  return {
    w: W,
    h: H,
    area: { x0: TOWN_X0, y0: TOWN_Y0, x1: TOWN_X0 + W - 1, y1: TOWN_Y0 + H - 1 },
    gate: { x0: TOWN_X0 + GX0, y0: TOWN_Y0 + H - WALL, x1: TOWN_X0 + GX1, y1: TOWN_Y0 + H - 1 },
    start: [TOWN_X0 + W / 2, TOWN_Y0 + START_Y],
    doorstep: [TOWN_X0 + W / 2, TOWN_Y0 + H + 4],
    castleDoor: castle.door,
    buildings,
    ground: ground2,
    objects,
    upper,
    buildingAt,
    street
  };
}
function grow(r, m) {
  return { x0: r.x0 - m, y0: r.y0 - m, x1: r.x1 + m, y1: r.y1 + m };
}
var TownTerrain = class {
  constructor(base, layout) {
    this.base = base;
    this.layout = layout;
    const a = grow(layout.area, TOWN_MARGIN);
    this.touched = { ...a, y1: Math.max(a.y1, layout.area.y1 + ROAD_LEN) };
  }
  base;
  layout;
  /** Tudo o que a cidade altera (área + anel + estrada). */
  touched;
  get seed() {
    return this.base.seed;
  }
  surround(x, y, c) {
    const l = this.layout;
    const a = l.area;
    if (x >= l.gate.x0 && x <= l.gate.x1 && y > a.y1 && y <= a.y1 + ROAD_LEN) return { ground: Block.PATH, object: Block.AIR, upper: Block.AIR };
    const d = Math.max(a.x0 - x, x - a.x1, a.y0 - y, y - a.y1);
    if (d > TOWN_MARGIN) return c;
    const g = blockDef(c.ground);
    const ground2 = g.liquid || c.ground === Block.HOLE ? Block.GRASS : c.ground;
    if (isWaterPlant(c.object)) return { ground: ground2, object: Block.AIR, upper: c.upper };
    if (d <= TOWN_CLEAR) return { ground: ground2, object: Block.AIR, upper: Block.AIR };
    return { ground: ground2, object: c.object, upper: c.upper };
  }
  cellAt(x, y) {
    const l = this.layout;
    if (inRect(l.area, x, y)) {
      const i = (y - l.area.y0) * l.w + (x - l.area.x0);
      return { ground: l.ground[i], object: l.objects[i], upper: l.upper[i] };
    }
    const c = this.base.cellAt(x, y);
    return inRect(this.touched, x, y) ? this.surround(x, y, c) : c;
  }
  groundAt(x, y) {
    return this.cellAt(x, y).ground;
  }
  objectAt(x, y) {
    return this.cellAt(x, y).object;
  }
  upperAt(x, y) {
    return this.cellAt(x, y).upper;
  }
  biomeAt(x, y) {
    return this.base.biomeAt(x, y);
  }
  generateChunk(cx, cy, ground2, objects, upper) {
    this.base.generateChunk(cx, cy, ground2, objects, upper);
    const t = this.touched;
    const S = Math.round(Math.sqrt(ground2.length));
    const x0 = cx * S;
    const y0 = cy * S;
    if (x0 > t.x1 || x0 + S - 1 < t.x0 || y0 > t.y1 || y0 + S - 1 < t.y0) return;
    const l = this.layout;
    for (let ly = 0; ly < S; ly++) {
      for (let lx = 0; lx < S; lx++) {
        const x = x0 + lx;
        const y = y0 + ly;
        if (!inRect(t, x, y)) continue;
        const i = ly * S + lx;
        let c;
        if (inRect(l.area, x, y)) {
          const k = (y - l.area.y0) * l.w + (x - l.area.x0);
          c = { ground: l.ground[k], object: l.objects[k], upper: l.upper[k] };
        } else {
          c = this.surround(x, y, { ground: ground2[i], object: objects[i], upper: upper[i] });
        }
        ground2[i] = c.ground;
        objects[i] = c.object;
        upper[i] = c.upper;
      }
    }
  }
};

// src/world/wolves.ts
var WOLF_REGION = 40 * SUBDIV;
var WOLF_REGIONS = 3;
var WOLF_DEN_CHANCE = 0.5;
var WOLF_TOWN_CLEARANCE = 28 * SUBDIV;
var WOLF_ROAM = 12 * SUBDIV;
var SLOTS = [[0, 0], [2 * SUBDIV, SUBDIV], [-SUBDIV, 2 * SUBDIV]];
function open(world, x, y) {
  const g = world.generator.groundAt(x, y);
  if (g === Block.WATER || g === Block.HOLE || g === Block.VOID || blockDef(g).liquid) return false;
  const o = world.generator.objectAt(x, y);
  return (o === Block.AIR || blockDef(o).shape === "decoration") && world.generator.upperAt(x, y) === Block.AIR && !world.isProtected(x, y);
}
function wolfRoam(homeX, homeY) {
  return { x0: homeX - WOLF_ROAM, y0: homeY - WOLF_ROAM, x1: homeX + WOLF_ROAM, y1: homeY + WOLF_ROAM };
}
function wolfPacks(world) {
  const town = world.town;
  if (!world.profile.wolves || !town) return [];
  const seed = world.seed;
  const keepOut = grow({ ...town.area, y1: town.area.y1 + TOWN_SOUTH_FIELD }, WOLF_TOWN_CLEARANCE);
  const cx = Math.floor((town.area.x0 + town.area.x1) / 2 / WOLF_REGION);
  const cy = Math.floor((town.area.y0 + town.area.y1) / 2 / WOLF_REGION);
  const out = [];
  for (let ry = cy - WOLF_REGIONS; ry <= cy + WOLF_REGIONS; ry++) {
    for (let rx = cx - WOLF_REGIONS; rx <= cx + WOLF_REGIONS; rx++) {
      if (hash2(seed, rx * 7 + 101, ry * 13 + 211) >= WOLF_DEN_CHANCE) continue;
      const kind = WOLF_KINDS[Math.floor(hash2(seed, rx * 31 + 5, ry * 17 + 9) * WOLF_KINDS.length)];
      const count = 1 + Math.floor(hash2(seed, rx * 5 + 3, ry * 11 + 7) * 3);
      for (let k = 0; k < 12; k++) {
        const m = 4 * SUBDIV;
        const hx = rx * WOLF_REGION + m + Math.floor(hash2(seed, rx * 3 + k, ry * 19 + 1) * (WOLF_REGION - 2 * m));
        const hy = ry * WOLF_REGION + m + Math.floor(hash2(seed, rx * 23 + 2, ry * 3 + k) * (WOLF_REGION - 2 * m));
        if (hx >= keepOut.x0 && hx <= keepOut.x1 && hy >= keepOut.y0 && hy <= keepOut.y1) continue;
        const cells = SLOTS.slice(0, count).map(([dx, dy]) => [hx + dx, hy + dy]);
        if (!cells.every(([x, y]) => open(world, x, y))) continue;
        for (const [x, y] of cells) out.push({ kind, x: x + 0.5, y: y + 0.5, homeX: hx + 0.5, homeY: hy + 0.5 });
        break;
      }
    }
  }
  return out;
}

// src/world/goblins.ts
var GOBLIN_PACK_SIZE = 7;
var GOBLIN_CAMP_ROAM = 11 * SUBDIV;
var GOBLIN_CAMP_SLOTS = [
  [0, -3],
  [2, -2],
  [3, 0],
  [2, 2],
  [0, 3],
  [-2, 2],
  [-3, 0]
].map(([dx, dy]) => [dx * SUBDIV, dy * SUBDIV]);
function goblinRoam(x, y) {
  return {
    x0: x - GOBLIN_CAMP_ROAM,
    y0: y - GOBLIN_CAMP_ROAM,
    x1: x + GOBLIN_CAMP_ROAM,
    y1: y + GOBLIN_CAMP_ROAM
  };
}
function open2(world, x, y) {
  if (world.isProtected(x, y)) return false;
  const cell = world.generator.cellAt(x, y);
  const ground2 = cell.ground;
  const def = blockDef(ground2);
  const standable = def.layer === "object" ? def.shape === "cube" : def.standable;
  if (ground2 === Block.VOID || ground2 === Block.HOLE || ground2 === Block.WATER || def.liquid || !standable) return false;
  return cell.upper === Block.AIR;
}
var PACK_REGION = 32 * SUBDIV;
var PACK_REGION_RADIUS = 10;
function regionPoint(seed, rx, ry, salt, tries) {
  const out = [];
  for (let i = 0; i < tries; i++) {
    const x = rx * PACK_REGION + Math.floor(hash2(seed, rx * 131 + i + salt, ry * 977 + salt) * PACK_REGION);
    const y = ry * PACK_REGION + Math.floor(hash2(seed, rx * 577 + salt, ry * 313 + i + salt * 3) * PACK_REGION);
    out.push([x, y]);
  }
  return out;
}
function planGoblinCamps(world) {
  if (world.profile.id !== "principal" || !world.town) return [];
  const town = world.town;
  const mx = Math.floor((town.area.x0 + town.area.x1) / 2);
  const my = Math.floor((town.area.y0 + town.area.y1) / 2);
  const r0x = Math.floor(mx / PACK_REGION), r0y = Math.floor(my / PACK_REGION);
  const camps = [];
  for (let ry = r0y - PACK_REGION_RADIUS; ry <= r0y + PACK_REGION_RADIUS; ry++) {
    for (let rx = r0x - PACK_REGION_RADIUS; rx <= r0x + PACK_REGION_RADIUS; rx++) {
      for (const [x, y] of regionPoint(world.seed, rx, ry, 113, 8)) {
        if (x >= town.area.x0 - 36 * SUBDIV && x <= town.area.x1 + 36 * SUBDIV && y >= town.area.y0 - 36 * SUBDIV && y <= town.area.y1 + 36 * SUBDIV) continue;
        if (nearVillage(world, x, y, 16 * SUBDIV)) continue;
        if (camps.some((c) => Math.hypot(c.x - x, c.y - y) < 24 * SUBDIV)) continue;
        if (!open2(world, x, y)) continue;
        const slots = GOBLIN_CAMP_SLOTS.map(([dx, dy]) => [x + dx, y + dy]);
        if (!slots.every(([sx, sy]) => open2(world, sx, sy))) continue;
        camps.push({ x, y, slots });
        break;
      }
    }
  }
  return camps;
}
function nearVillage(world, x, y, m) {
  const t = world.village?.touched;
  return !!t && x >= t.x0 - m && x <= t.x1 + m && y >= t.y0 - m && y <= t.y1 + m;
}
var LIZARD_PACK_SIZE = 3;
var LIZARD_ROAM = 9 * SUBDIV;
var LIZARD_SLOTS = [[0, 0], [2, 1], [-2, 1]].map(([dx, dy]) => [dx * SUBDIV, dy * SUBDIV]);
function lizardRoam(x, y) {
  return { x0: x - LIZARD_ROAM, y0: y - LIZARD_ROAM, x1: x + LIZARD_ROAM, y1: y + LIZARD_ROAM };
}
function freeLand(world, x, y) {
  return open2(world, x, y) && world.generator.cellAt(x, y).object === Block.AIR;
}
function planLizardPacks(world, riverAt, avoid = []) {
  if (world.profile.id !== "principal" || !world.town) return [];
  const town = world.town;
  const mx = Math.floor((town.area.x0 + town.area.x1) / 2);
  const my = Math.floor((town.area.y0 + town.area.y1) / 2);
  const r0x = Math.floor(mx / PACK_REGION), r0y = Math.floor(my / PACK_REGION);
  const packs = [];
  for (let ry = r0y - PACK_REGION_RADIUS; ry <= r0y + PACK_REGION_RADIUS; ry++) {
    for (let rx = r0x - PACK_REGION_RADIUS; rx <= r0x + PACK_REGION_RADIUS; rx++) {
      for (const [x, y] of regionPoint(world.seed, rx, ry, 271, 40)) {
        if (x >= town.area.x0 - 24 * SUBDIV && x <= town.area.x1 + 24 * SUBDIV && y >= town.area.y0 - 24 * SUBDIV && y <= town.area.y1 + 24 * SUBDIV) continue;
        if (!riverAt(x, y)) continue;
        if (nearVillage(world, x, y, 12 * SUBDIV)) continue;
        let spot = null;
        for (let d = 1; d <= 4 * SUBDIV && !spot; d++) {
          for (const [ox, oy] of [[d, 0], [-d, 0], [0, d], [0, -d], [d, d], [-d, d], [d, -d], [-d, -d]]) {
            const sx = x + ox, sy = y + oy;
            if (freeLand(world, sx, sy) && LIZARD_SLOTS.every(([dx, dy]) => freeLand(world, sx + dx, sy + dy))) {
              spot = [sx, sy];
              break;
            }
          }
        }
        if (!spot) continue;
        if (avoid.some((c) => Math.hypot(c.x - spot[0], c.y - spot[1]) < 12 * SUBDIV)) continue;
        packs.push({ x: spot[0], y: spot[1], slots: LIZARD_SLOTS.map(([dx, dy]) => [spot[0] + dx, spot[1] + dy]) });
        break;
      }
    }
  }
  return packs;
}
var GoblinCampTerrain = class {
  constructor(source, camps) {
    this.source = source;
    this.camps = camps;
    this.seed = source.seed;
    this.fires = new Set(camps.map((c) => `${c.x},${c.y}`));
    this.cleared = new Set(camps.flatMap((c) => c.slots.map(([x, y]) => `${x},${y}`)));
    for (const c of camps) {
      const cx = Math.floor(c.x / CHUNK_SIZE), cy = Math.floor(c.y / CHUNK_SIZE);
      const k = `${cx},${cy}`;
      const list = this.inChunk.get(k) ?? [];
      list.push(c);
      this.inChunk.set(k, list);
    }
  }
  source;
  camps;
  seed;
  fires;
  cleared;
  inChunk = /* @__PURE__ */ new Map();
  cellAt(x, y) {
    const c = this.source.cellAt(x, y);
    return this.fires.has(`${x},${y}`) ? { ...c, object: Block.CAMPFIRE } : this.cleared.has(`${x},${y}`) ? { ...c, object: Block.AIR } : c;
  }
  groundAt(x, y) {
    return this.source.groundAt(x, y);
  }
  objectAt(x, y) {
    return this.fires.has(`${x},${y}`) ? Block.CAMPFIRE : this.cleared.has(`${x},${y}`) ? Block.AIR : this.source.objectAt(x, y);
  }
  upperAt(x, y) {
    return this.source.upperAt(x, y);
  }
  biomeAt(x, y) {
    return this.source.biomeAt(x, y);
  }
  generateChunk(cx, cy, ground2, objects, upper) {
    this.source.generateChunk(cx, cy, ground2, objects, upper);
    for (const c of this.inChunk.get(`${cx},${cy}`) ?? []) {
      const lx = c.x - cx * CHUNK_SIZE, ly = c.y - cy * CHUNK_SIZE;
      objects[ly * CHUNK_SIZE + lx] = Block.CAMPFIRE;
      for (const [x, y] of c.slots) {
        if (Math.floor(x / CHUNK_SIZE) === cx && Math.floor(y / CHUNK_SIZE) === cy)
          objects[(y - cy * CHUNK_SIZE) * CHUNK_SIZE + (x - cx * CHUNK_SIZE)] = Block.AIR;
      }
    }
    for (const xy of this.cleared) {
      const [x, y] = xy.split(",").map(Number);
      if (Math.floor(x / CHUNK_SIZE) === cx && Math.floor(y / CHUNK_SIZE) === cy)
        objects[(y - cy * CHUNK_SIZE) * CHUNK_SIZE + (x - cx * CHUNK_SIZE)] = Block.AIR;
    }
  }
};

// src/game/entities.ts
var SIT_BODIES = ["heroine", "hero", "hood", "gino", "mila", "grewn"];
function canSit(body) {
  return SIT_BODIES.includes(body);
}
var FLOW_EVERY = 0.25;
var RESPAWN_CLEARANCE = 10 * SUBDIV;
var ACTIVE_RADIUS = 48 * SUBDIV;
var PACK_SPAWN_RADIUS = 56 * SUBDIV;
var PACK_DROP_RADIUS = 80 * SUBDIV;
var FLOCK_SIZE = 4;
var VILLAGE_ANIMALS_EACH = 3;
var VILLAGE_PENS = [
  { kind: "chicken", count: VILLAGE_ANIMALS_EACH, salt: 97, x0: 33, y0: 9, x1: 45, y1: 15 },
  { kind: "cow", count: VILLAGE_ANIMALS_EACH, salt: 91, x0: 3, y0: 30, x1: 12, y1: 35 },
  { kind: "sheep", count: VILLAGE_ANIMALS_EACH, salt: 71, x0: 33, y0: 29, x1: 44, y1: 34 },
  { kind: "capybara", count: VILLAGE_ANIMALS_EACH, salt: 103, x0: 8, y0: 6, x1: 16, y1: 9 },
  { kind: "horse", count: VILLAGE_ANIMALS_EACH, salt: 81, x0: 30, y0: 40, x1: 44, y1: 42 }
];
var SWORD_REACH = 1.45 * SUBDIV;
var SWORD_ARC_COS = 0.3;
var FACING_VEC = { down: [0, 1], up: [0, -1], left: [-1, 0], right: [1, 0] };
var PICK_BOX = {
  sheep: [[1.15, 0.45], [0.85, 0.35]],
  horse: [[1.5, 0.55], [1.05, 0.4]],
  cow: [[1.25, 0.5], [0.95, 0.4]],
  chicken: [[0.8, 0.3], [0.65, 0.26]],
  capybara: [[0.95, 0.45], [0.95, 0.45]]
};
var LOVE_FRAMES = 16;
var LOVE_SCALE = { sheep: 1, cow: 1.05, chicken: 0.7, horse: 1.25, capybara: 1 };
var PAIR_RANGE = 6 * SUBDIV;
var COURT_DISTANCE = 1.5 * SUBDIV;
var NOTICE_RANGE = 3 * SUBDIV;
var RESIDENTS_TOWN = 8;
var RESIDENTS_VILLAGE = 5;
var MAX_SHEEP = 16;
var MAX_PER_SPECIES = { sheep: MAX_SHEEP, horse: 6, cow: 10, chicken: 12, capybara: 6 };
function heroActorKind(body, equipped, attackTool, attacking) {
  if (attacking && attackTool && TOOLS[attackTool].swings) return `${body}-${attackTool}-attack`;
  return equipped ? `${body}-${equipped}` : body;
}
var ANIMAL_KINDS = /* @__PURE__ */ new Set(["sheep", "horse", "cow", "chicken", "capybara"]);
var finiteNum = (v) => typeof v === "number" && Number.isFinite(v) && Math.abs(v) < 2 ** 30;
var NOBODY = { x: 1e9, y: 1e9 };
var Entities = class {
  constructor(player, rand = Math.random, character = "heroine") {
    this.player = player;
    this.rand = rand;
    this.character = character;
  }
  player;
  rand;
  character;
  npcs = [];
  /** Cavalos do campo (passeiam; golpe os tira do mundo, como as ovelhas). */
  /** Cavalo, vacas e galinhas (passeiam pelo campo). */
  horses = [];
  /** Moradores da cidade (só andam por ruas e praças; o golpe não os atinge). */
  villagers = [];
  /** O que os moradores lembram da jogadora (ADR 0034, nível 3): vai no salvamento do jogador; a sala não guarda. */
  memory = {};
  /** Missões (ADR 0034): estado salvo no jogador; o `Game` o muda ao aceitar/entregar. */
  quests = {};
  /** Sinal sobre a cabeça dos NPCs com missão (o `Game` o recalcula todo quadro a partir do estado e do inventário). */
  marks = {};
  /** Corrente de missões do Capítulo 1 (estado salvo no jogador; o `Game` a muda). */
  missions = EMPTY_LOG();
  /** Hora do mundo (0..1) para a agenda dos moradores (o `Game` a atualiza todo quadro; -1 = sem relógio: sem rotina, como na sala). */
  time = -1;
  /** Monstros da dungeon (presos no interior dela). */
  monsters = [];
  /** Monstros derrotados tocando a animação de morte. */
  dying = [];
  /** Renascimentos agendados (todos os tipos, inclusive a Rainha, cada um no seu tempo). */
  respawns = [];
  /** Chamado quando um monstro é derrotado (o Game solta os espólios). */
  onMonsterKilled = null;
  /** Dano que entrou (para os números na tela): onde, quanto, se foi crítico e em quem ('enemy' ou 'player'). */
  onDamage = null;
  /** Mapa de distâncias (passos) até a personagem dentro da dungeon; null fora dela. */
  flow = null;
  flowArea = null;
  flowTimer = 0;
  /** Jogadores da sala (servidor): alvos dos monstros e origem dos golpes; bloqueiam como a personagem. */
  avatars = [];
  /** Mordida num jogador da sala (servidor): quem decide é a sala, o dano é calculado no aparelho dele. */
  onBite = null;
  /** Aparelho na sala: animais e monstros vêm da sala (sem simulação local deles). */
  remote = false;
  /** Atores extras desenhados com os demais (espelho da sala: coraçõezinhos do namoro). */
  extra = [];
  /** Personagem pronto quando não há `look`: Heroína ou Herói (escolhido na tela de personagem; salvo). */
  body = "heroine";
  /** Rebanho inicial perto de (x, y): posições pela seed, em grama andável a 2–8 células. */
  spawnFlock(world, x, y) {
    const grass = /* @__PURE__ */ new Set([Block.GRASS]);
    for (let i = 0; i < 400 && this.npcs.length < FLOCK_SIZE; i++) {
      const a = hash2(world.seed, i, 71) * Math.PI * 2;
      const r = (2 + hash2(world.seed, i, 72) * 6) * SUBDIV;
      const cx = Math.floor(x + Math.cos(a) * r);
      const cy = Math.floor(y + Math.sin(a) * r);
      if (!world.isWalkable(cx, cy) || !grass.has(world.getGround(cx, cy))) continue;
      const sheep = new Sheep(cx + 0.5, cy + 0.5);
      if (this.all().some((w) => sheep.overlapsAt(sheep.x, sheep.y, w))) continue;
      this.npcs.push(sheep);
    }
  }
  /** Um cavalo perto de (x, y): posição pela seed, em grama andável a 3–9 células. */
  spawnHorse(world, x, y) {
    this.spawnAnimals(world, "horse", x, y, 1, 81);
  }
  /** `count` animais de um tipo perto de (x, y): posições pela seed (`salt` separa os tipos), em grama andável. */
  spawnAnimals(world, kind, x, y, count, salt) {
    let placed = 0;
    for (let i = 0; i < 400 && placed < count; i++) {
      const a = hash2(world.seed, i, salt) * Math.PI * 2;
      const r = (3 + hash2(world.seed, i, salt + 1) * 6) * SUBDIV;
      const cx = Math.floor(x + Math.cos(a) * r);
      const cy = Math.floor(y + Math.sin(a) * r);
      if (!world.isWalkable(cx, cy) || world.getGround(cx, cy) !== Block.GRASS) continue;
      const animal = new FarmAnimal(kind, cx + 0.5, cy + 0.5, this.rand);
      if (this.all().some((w) => animal.overlapsAt(animal.x, animal.y, w))) continue;
      this.horses.push(animal);
      placed++;
    }
  }
  /**
   * Animais domésticos na Vila Camponesa (`world/village.ts`, v0.93.91; v0.93.106: 3 de cada, cavalos incluídos): ovelhas, vacas, galinhas, capivaras e cavalos nascem DENTRO da vila, cada
   * espécie numa faixa de grama da planta dela (`VILLAGE_PENS`, em células da vila); a posição sai da seed, só em grama andável e livre.
   * Devolve quantos de cada espécie nasceram.
   */
  spawnVillageAnimals(world, have = {}) {
    const v = world.village;
    const placed = { sheep: have.sheep ?? 0, cow: have.cow ?? 0, chicken: have.chicken ?? 0, capybara: have.capybara ?? 0, horse: have.horse ?? 0 };
    if (!v) return placed;
    for (const pen of VILLAGE_PENS) {
      for (let i = 0; i < 400 && placed[pen.kind] < pen.count; i++) {
        const lx = pen.x0 + Math.floor(hash2(world.seed, i, pen.salt) * (pen.x1 - pen.x0 + 1));
        const ly = pen.y0 + Math.floor(hash2(world.seed, i, pen.salt + 1) * (pen.y1 - pen.y0 + 1));
        const cx = v.area.x0 + lx, cy = v.area.y0 + ly;
        if (!world.isWalkable(cx, cy) || world.getGround(cx, cy) !== Block.GRASS || world.getObject(cx, cy) !== Block.AIR) continue;
        const animal = pen.kind === "sheep" ? new Sheep(cx + 0.5, cy + 0.5) : new FarmAnimal(pen.kind, cx + 0.5, cy + 0.5, this.rand);
        if (this.all().some((w) => animal.overlapsAt(animal.x, animal.y, w))) continue;
        if (animal instanceof Sheep) this.npcs.push(animal);
        else this.horses.push(animal);
        placed[pen.kind]++;
      }
    }
    return placed;
  }
  /**
   * Ajusta os animais da vila de uma sala GRAVADA ANTES da v0.93.106 (snapshot < 7) para 3 de cada espécie: o que está dentro da vila passa a ser,
   * no máximo, `VILLAGE_ANIMALS_EACH` por espécie (sobram os filhotes e os mais longe do centro da faixa), o cavalo que nascia no campo diante
   * do portão some (os cavalos moram na vila agora) e o que falta nasce nas faixas (`VILLAGE_PENS`). Bichos fora da vila (soltos, comprados,
   * crias que saíram) não são tocados, a não ser o cavalo do campo. Devolve quantos foram tirados e quantos nasceram.
   */
  reconcileVillageAnimals(world) {
    const v = world.village;
    if (!v) return { removed: 0, spawned: 0 };
    const inVillage = (a) => inRect(v.area, Math.floor(a.x), Math.floor(a.y));
    let removed = 0;
    const kindOf = (a) => a.species;
    const outside = this.horses.filter((h) => h.kind === "horse" && !inVillage(h));
    for (const h of outside) {
      this.horses.splice(this.horses.indexOf(h), 1);
      removed++;
    }
    const have = { sheep: 0, cow: 0, chicken: 0, capybara: 0, horse: 0 };
    for (const kind of Object.keys(have)) {
      const inside = this.breeders().filter((a) => kindOf(a) === kind && inVillage(a));
      inside.sort((a, b) => Number(a.baby) - Number(b.baby));
      for (const extra of inside.slice(VILLAGE_ANIMALS_EACH)) {
        if (extra instanceof Sheep) this.npcs.splice(this.npcs.indexOf(extra), 1);
        else this.horses.splice(this.horses.indexOf(extra), 1);
        this.courting.delete(extra);
        removed++;
      }
      have[kind] = Math.min(inside.length, VILLAGE_ANIMALS_EACH);
    }
    const before = this.breeders().length;
    this.spawnVillageAnimals(world, have);
    return { removed, spawned: this.breeders().length - before };
  }
  /**
   * Moradores da cidade (`game/npcs.ts`): o **ferreiro Black** dentro da Ferraria e os 15 NPCs comuns, cada um perto de um
   * ponto fixo das ruas — os dois primeiros na praça inicial, um no caminho até o castelo, um no pátio do castelo e os
   * outros espalhados (`homesFor`: células de rua sorteadas pela posição, a pelo menos 16 células umas das outras; a
   * cidade é igual em toda seed, então os pontos também). Os comuns só andam por ruas/praças dentro da muralha.
   */
  spawnVillagers(world) {
    const t = world.town;
    if (!t) return;
    const a = t.area;
    const onStreet = (cx, cy) => cx > a.x0 && cx < a.x1 && cy > a.y0 && cy < t.gate.y0 && t.street[(cy - a.y0) * t.w + (cx - a.x0)] === 1;
    const market = world.interiors.find((l) => l.def.id === "market");
    const florist = world.interiors.find((l) => l.def.id === "florist");
    const common = NPC_IDS.filter((id) => id !== SMITH && !(id === MERCHANT && market?.keeper) && !(id === FLORIST_KEEPER && florist?.keeper));
    const homes = homesFor(world, common.length, onStreet);
    const people = common.map((npc, i) => ({ at: homes[i], npc, walk: onStreet }));
    const forge = world.interiors.find((l) => l.def.building === Block.SMITHY);
    const smithy = t.buildings.find((b) => b.id === Block.SMITHY);
    if (forge?.keeper) {
      const k = forge.keeper;
      const walk = (cx, cy) => cy >= k.rows[0] && cy <= k.rows[1] && interiorFloor(forge, cx, cy);
      people.push({ at: k.at, npc: SMITH, walk });
    } else if (smithy?.door) {
      people.push({ at: smithy.door, npc: SMITH, walk: onStreet });
    }
    if (market?.keeper) {
      const k = market.keeper;
      const walk = (cx, cy) => cy >= k.rows[0] && cy <= k.rows[1] && interiorFloor(market, cx, cy);
      people.push({ at: k.at, npc: MERCHANT, walk });
    }
    if (florist?.keeper) {
      const k = florist.keeper;
      const walk = (cx, cy) => cy >= k.rows[0] && cy <= k.rows[1] && interiorFloor(florist, cx, cy);
      people.push({ at: k.at, npc: FLORIST_KEEPER, walk });
    }
    const guild = world.interiors.find((l) => l.def.id === "guild");
    if (guild?.keeper) {
      const k = guild.keeper;
      this.placeVillager(world, k.at[0], k.at[1], GUILD_MASTER.base, (cx, cy) => cy >= k.rows[0] && cy <= k.rows[1] && interiorFloor(guild, cx, cy), GUILD_MASTER);
    }
    people.forEach(({ at: [hx, hy], npc, walk }) => {
      const v = this.placeVillager(world, hx, hy, npc, walk);
      if (v && npc === MERCHANT) v.setHome(hx + 0.5, hy + 0.5);
    });
  }
  /** Posta um morador na célula andável e livre mais perto de (hx, hy) (até 12 células); devolve-o, ou null se não coube. */
  placeVillager(world, hx, hy, npc, walk, resident = null) {
    for (let r = 0; r <= 12; r++) {
      for (let dy = -r; dy <= r; dy++) {
        for (let dx = -r; dx <= r; dx++) {
          if (Math.max(Math.abs(dx), Math.abs(dy)) !== r) continue;
          const cx = hx + dx;
          const cy = hy + dy;
          if (!walk(cx, cy) || !world.isWalkable(cx, cy)) continue;
          const v = new Villager(cx + 0.5, cy + 0.5, npc, walk, this.rand, resident);
          if (this.all().some((w) => v.overlapsAt(v.x, v.y, w))) continue;
          this.villagers.push(v);
          return v;
        }
      }
    }
    return null;
  }
  /**
   * Moradores sorteados (ADR 0034, `game/residents.ts`): `RESIDENTS_TOWN` nas ruas da cidade e `RESIDENTS_VILLAGE` pelos caminhos da vila, cada um
   * "primo" de um morador comum (cores trocadas no shader), com nome, profissão e falas próprias — sempre os mesmos para a mesma seed. Chamar
   * depois de `spawnVillagers` (eles se espalham longe dos 16 nomeados). Só no aparelho (a sala não simula moradores).
   */
  spawnResidents(world, townCount = RESIDENTS_TOWN, villageCount = RESIDENTS_VILLAGE) {
    const t = world.town;
    let townNames = [];
    if (t) {
      const a = t.area;
      const onStreet = (cx, cy) => cx > a.x0 && cx < a.x1 && cy > a.y0 && cy < t.gate.y0 && t.street[(cy - a.y0) * t.w + (cx - a.x0)] === 1;
      const taken = this.villagers.map((v) => [v.cellX, v.cellY]);
      const homes = homesFor(world, townCount, onStreet, taken, HOME_SPACING / 2);
      townNames = makeResidents(world.seed, "town", townCount);
      townNames.forEach((r, i) => this.placeVillager(world, homes[i][0], homes[i][1], r.base, onStreet, r));
    }
    const vl = world.village;
    if (vl && villageCount > 0) {
      const { x0, y0, x1, y1 } = vl.area;
      const inside = (cx, cy) => cx > x0 && cx < x1 && cy > y0 && cy < y1;
      const cells = [];
      for (let cy = y0 + 1; cy < y1; cy++) for (let cx = x0 + 1; cx < x1; cx++) if (vl.ground[(cy - y0) * vl.w + (cx - x0)] === Block.PATH) cells.push([cx, cy, hash2(world.seed ^ 20905, cx, cy)]);
      cells.sort((p, q) => p[2] - q[2]);
      const homes = [];
      for (const [cx, cy] of cells) {
        if (homes.length >= villageCount) break;
        if (homes.every(([hx, hy]) => Math.hypot(hx - cx, hy - cy) >= 4 * SUBDIV)) homes.push([cx, cy]);
      }
      makeResidents(world.seed, "village", villageCount, townNames.map((r) => r.name)).forEach((r, i) => {
        if (homes[i]) this.placeVillager(world, homes[i][0], homes[i][1], r.base, inside, r);
      });
    }
  }
  /**
   * Bichos do mundo (os mesmos em qualquer aparelho e na sala, pela seed): rebanho, cavalo, vacas e galinhas no campo
   * diante do portão (mundos com animais) e os monstros da dungeon.
   */
  spawnWildlife(world, stream = false) {
    if (world.profile.sheep) {
      const [gx, gy] = world.outsideGate();
      const inVillage = !!world.village;
      const town = !!world.town;
      const s = SUBDIV;
      if (inVillage) this.spawnVillageAnimals(world);
      else this.spawnFlock(world, gx, gy + (town ? 8 : 0) * s);
      if (!inVillage) {
        this.spawnHorse(world, gx + 9 * s, gy + (town ? 10 : 2) * s);
        this.spawnAnimals(world, "cow", gx - 9 * s, gy + (town ? 10 : 2) * s, 2, 91);
        this.spawnAnimals(world, "chicken", gx - 6 * s, gy + (town ? 6 : 1) * s, 4, 97);
        this.spawnAnimals(world, "capybara", gx - 8 * s, gy + (town ? 4 : 1) * s, 3, 103);
      }
    }
    this.spawnMonsters(world);
    this.spawnWolves(world);
    if (!stream) {
      this.spawnGoblins(world);
      this.spawnLizards(world);
    }
  }
  /** Monstros nos pontos da dungeon (posições pela seed; o sorteio do passeio usa `rand`). */
  spawnMonsters(world) {
    const d = world.dungeon;
    if (!d) return;
    for (const s of d.spawns) this.monsters.push(new Monster(s.kind, s.x, s.y, s.kind === "spider-boss" ? d.bossRoom : d.interior, this.rand));
  }
  /** Bandos de lobos pelo mapa (`world/wolves.ts`; posições pela seed): cada lobo passeia perto da toca do bando. */
  spawnWolves(world) {
    for (const w of wolfPacks(world)) this.monsters.push(new Monster(w.kind, w.x, w.y, wolfRoam(w.homeX, w.homeY), this.rand, w.homeX, w.homeY));
  }
  /**
   * Exactly seven goblins around each deterministic campfire in the open world. Sem `wake`, todos os acampamentos (testes e
   * mundos pequenos); com `wake`, só os que passam no teste (o streaming de `updatePacks`).
   */
  spawnGoblins(world, wake) {
    for (const camp of world.goblinCamps) {
      if (wake && !wake(camp.x + 0.5, camp.y + 0.5)) continue;
      if (world.getObject(camp.x, camp.y) !== Block.CAMPFIRE) continue;
      const bounds = goblinRoam(camp.x, camp.y);
      const existing = this.monsters.filter((m) => m.kind === "goblin" && Math.abs(m.homeX - (camp.x + 0.5)) <= 5 * SUBDIV && Math.abs(m.homeY - (camp.y + 0.5)) <= 5 * SUBDIV);
      if (existing.length >= GOBLIN_PACK_SIZE) continue;
      for (const [x, y] of camp.slots) {
        if (!world.isWalkable(x, y)) continue;
        const px = x + 0.5, py = y + 0.5;
        if (existing.some((m) => Math.hypot(m.homeX - px, m.homeY - py) < 0.2)) continue;
        this.monsters.push(new Monster("goblin", px, py, bounds, this.rand, px, py));
      }
      this.livePacks.add(`g:${camp.x},${camp.y}`);
    }
  }
  /** Bandos de três homens-lagarto na margem dos rios (mesma regra de `wake`). */
  spawnLizards(world, wake) {
    for (const pack of world.lizardPacks) {
      if (wake && !wake(pack.x + 0.5, pack.y + 0.5)) continue;
      const bounds = lizardRoam(pack.x, pack.y);
      const existing = this.monsters.filter((m) => m.kind === "lizard" && Math.abs(m.homeX - (pack.x + 0.5)) <= 5 * SUBDIV && Math.abs(m.homeY - (pack.y + 0.5)) <= 5 * SUBDIV);
      if (existing.length >= LIZARD_PACK_SIZE) continue;
      for (const [x, y] of pack.slots) {
        if (!world.isWalkable(x, y)) continue;
        const px = x + 0.5, py = y + 0.5;
        if (existing.some((m) => Math.hypot(m.homeX - px, m.homeY - py) < 0.2)) continue;
        this.monsters.push(new Monster("lizard", px, py, bounds, this.rand, px, py));
      }
      this.livePacks.add(`l:${pack.x},${pack.y}`);
    }
  }
  /** Bandos que estão no jogo agora (chave `g:x,y` / `l:x,y`): o resto do mundo só existe no plano da seed. */
  livePacks = /* @__PURE__ */ new Set();
  packTimer = 0;
  /**
   * Streaming dos bandos (v0.93.60): com ~170 acampamentos e bandos de rio no mundo, só vivem os que têm um jogador a até
   * `PACK_SPAWN_RADIUS`; quando todos se afastam além de `PACK_DROP_RADIUS` o bando sai (com os renascimentos pendentes) e
   * volta completo na próxima aproximação. Roda a cada 0,5 s.
   */
  updatePacks(dt, world) {
    this.packTimer -= dt;
    if (this.packTimer > 0) return;
    this.packTimer = 0.5;
    const hs = this.hunters();
    if (!hs.length) return;
    const near = (x, y, r) => hs.some((h) => Math.abs(h.x - x) <= r && Math.abs(h.y - y) <= r);
    this.spawnGoblins(world, (x, y) => near(x, y, PACK_SPAWN_RADIUS) && !this.livePacks.has(`g:${Math.floor(x)},${Math.floor(y)}`));
    this.spawnLizards(world, (x, y) => near(x, y, PACK_SPAWN_RADIUS) && !this.livePacks.has(`l:${Math.floor(x)},${Math.floor(y)}`));
    for (const key of [...this.livePacks]) {
      const [kind, xy] = key.split(":");
      const [x, y] = xy.split(",").map(Number);
      if (near(x + 0.5, y + 0.5, PACK_DROP_RADIUS)) continue;
      const mk = kind === "g" ? "goblin" : "lizard";
      const mine = (hx, hy) => Math.abs(hx - (x + 0.5)) <= 5 * SUBDIV && Math.abs(hy - (y + 0.5)) <= 5 * SUBDIV;
      for (let i = this.monsters.length - 1; i >= 0; i--) {
        const m = this.monsters[i];
        if (m.kind === mk && mine(m.homeX, m.homeY)) this.monsters.splice(i, 1);
      }
      for (let i = this.respawns.length - 1; i >= 0; i--) {
        const r = this.respawns[i];
        if (r.kind === mk && mine(r.x, r.y)) this.respawns.splice(i, 1);
      }
      this.livePacks.delete(key);
    }
  }
  /** When old saves replace the generated campfire tile with a player edit,
   * keep the goblins and respawns consistent with the actual world object.
   */
  reconcileGoblinCamps(world) {
    const allowed = new Set(world.goblinCamps.filter((c) => world.getObject(c.x, c.y) === Block.CAMPFIRE).map((c) => c.x + "," + c.y));
    const known = (x, y) => world.goblinCamps.some((c) => Math.hypot(c.x + 0.5 - x, c.y + 0.5 - y) <= 5 * SUBDIV && allowed.has(c.x + "," + c.y));
    for (let i = this.monsters.length - 1; i >= 0; i--) {
      const m = this.monsters[i];
      if (m.kind === "goblin" && !known(m.homeX, m.homeY)) this.monsters.splice(i, 1);
    }
    for (let i = this.respawns.length - 1; i >= 0; i--) {
      const r = this.respawns[i];
      if (r.kind === "goblin" && !known(r.x, r.y)) this.respawns.splice(i, 1);
    }
  }
  /** Quem os monstros perseguem e mordem: a personagem (aparelho) ou os jogadores da sala (servidor). */
  hunters() {
    return this.player ? [this.player, ...this.avatars] : this.avatars;
  }
  all() {
    return [...this.hunters(), ...this.npcs, ...this.horses, ...this.villagers.filter((v) => !v.hidden), ...this.monsters];
  }
  /** Alvo de um monstro: o jogador mais perto dentro do limite dele (senão o mais perto de todos). */
  targetOf(m) {
    let best = null;
    let bestD = Infinity;
    let bestInside = false;
    for (const h of this.hunters()) {
      if (h.dead) continue;
      const inside = inRect(m.bounds, Math.floor(h.x), Math.floor(h.y));
      const d = Math.hypot(h.x - m.x, h.y - m.y);
      if (inside && !bestInside || inside === bestInside && d < bestD) {
        best = h;
        bestD = d;
        bestInside = inside;
      }
    }
    return best ?? NOBODY;
  }
  /** Bloqueio entre entidades; se já estavam sobrepostas, deixa se afastar. */
  blocker = (self, x, y) => {
    for (const other of this.all()) {
      if (other === self) continue;
      if (self instanceof Breeder && self.partner === other) continue;
      if (self.overlapsAt(x, y, other) && !self.overlapsAt(self.x, self.y, other)) return true;
    }
    return false;
  };
  update(dt, world) {
    if (!this.remote) {
      for (const v of this.villagers) {
        v.update(dt, world, this.blocker, this.time, v.leader ?? this.player ?? void 0);
        if (v.hidden || v.moving || v.talking) continue;
        let near = null, nd = NOTICE_RANGE;
        for (const h of this.hunters()) {
          const d = Math.hypot(h.x - v.x, h.y - v.y);
          if (d <= nd) {
            near = h;
            nd = d;
          }
        }
        if (near) v.faceTo(near.x, near.y);
      }
    }
    if (!this.remote) this.updateCreatures(dt, world);
    for (let i = this.dying.length - 1; i >= 0; i--) {
      this.dying[i].t += dt / MONSTERS[this.dying[i].kind].deathSeconds;
      if (this.dying[i].t >= 1) this.dying.splice(i, 1);
    }
    if (this.remote) return;
    this.updateRespawns(dt);
    this.updatePacks(dt, world);
    this.finishCourtships(world);
    this.formPairs();
    this.startCourtships();
  }
  /** Animais passeiam; monstros perseguem o jogador mais perto e mordem quem estiver encostado. */
  updateCreatures(dt, world) {
    for (const s of this.npcs) s.update(dt, world, this.blocker);
    for (const h of this.horses) h.update(dt, world, this.blocker);
    this.updateFlow(dt, world);
    const flow = this.flow ? this.flowAt : void 0;
    const awake = (m) => this.hunters().some((h) => Math.abs(h.x - m.x) <= ACTIVE_RADIUS && Math.abs(h.y - m.y) <= ACTIVE_RADIUS);
    for (const m of this.monsters) if (awake(m)) m.update(dt, world, this.targetOf(m), this.blocker, flow);
    for (const m of this.monsters) {
      if (!awake(m)) continue;
      for (const h of this.hunters()) {
        if (h.dead || !m.tryBite(h)) continue;
        if (h === this.player) this.biteFrom(m.kind, m.x, m.y, world);
        else this.onBite?.(h, m);
        break;
      }
    }
  }
  /**
   * Mordida de um monstro `kind` vindo de (x, y) na personagem deste aparelho: dano pela fórmula (ataque do monstro −
   * defesa dela). No jogo sozinho vem do `update`; na sala, da mensagem `bite` (a sala decide quando morde).
   */
  biteFrom(kind, x, y, world) {
    const p = this.player;
    if (!p || p.dead) return;
    const hit = rollDamage(MONSTER_STATS[kind].attack, p.stats.defense, this.rand);
    if (p.hurt(hit.amount, x, y, world, this.blocker)) this.onDamage?.(p.x, p.y, hit, "player");
  }
  /** Animais que se reproduzem (ovelhas + animais do campo). */
  breeders() {
    return [...this.npcs, ...this.horses];
  }
  /** Animais que comem e se reproduzem (para alimentar à frente da personagem). */
  get animals() {
    return this.breeders();
  }
  /** Animais como estão (para guardar): os filhotes nascidos e quem já cresceu continuam ao voltar. */
  saveAnimals() {
    return this.breeders().map((a) => ({
      k: a.species,
      x: Math.round(a.x * 100) / 100,
      y: Math.round(a.y * 100) / 100,
      baby: a.baby,
      age: Math.round(a.age),
      hx: Math.round(a.homeX * 100) / 100,
      hy: Math.round(a.homeY * 100) / 100
    }));
  }
  /**
   * Troca os animais pelos guardados (lista malformada é ignorada item a item; o limite por espécie vale). Quem cai
   * em célula onde não se anda (o mundo mudou) vai para a andável mais perto. Retorna quantos voltaram.
   */
  restoreAnimals(list, world) {
    if (!Array.isArray(list)) return 0;
    this.npcs.length = 0;
    this.horses.length = 0;
    this.courting.clear();
    for (const a of list) {
      if (!a || !ANIMAL_KINDS.has(a.k) || !finiteNum(a.x) || !finiteNum(a.y) || !finiteNum(a.hx) || !finiteNum(a.hy)) continue;
      const k = a.k;
      if (this.count(k) >= MAX_PER_SPECIES[k]) continue;
      let [x, y] = [a.x, a.y];
      if (!world.isWalkable(Math.floor(x), Math.floor(y))) [x, y] = world.nearestWalkable(Math.floor(x), Math.floor(y)).map((v) => v + 0.5);
      const baby = a.baby === true;
      const animal = k === "sheep" ? new Sheep(x, y, a.hx, a.hy, this.rand, baby) : new FarmAnimal(k, x, y, this.rand, baby, a.hx, a.hy);
      animal.age = finiteNum(a.age) ? Math.max(0, a.age) : 0;
      if (animal instanceof Sheep) this.npcs.push(animal);
      else this.horses.push(animal);
    }
    return this.breeders().length;
  }
  /** Quantos animais da espécie existem (filhotes contam). */
  count(species) {
    return this.breeders().filter((b) => b.species === species).length;
  }
  /** Apaixonados e livres procuram o mais próximo da mesma espécie na mesma situação. */
  formPairs() {
    const all = this.breeders();
    for (const a of all) {
      if (!a.inLove || a.partner || a.baby || a.courtship > 0) continue;
      if (this.count(a.species) >= MAX_PER_SPECIES[a.species]) continue;
      let best = null;
      let bestD = PAIR_RANGE;
      for (const b of all) {
        if (b === a || b.species !== a.species || !b.inLove || b.partner || b.baby || b.courtship > 0) continue;
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < bestD) {
          best = b;
          bestD = d;
        }
      }
      if (best) {
        a.partner = best;
        best.partner = a;
      }
    }
  }
  /** Par próximo o bastante: param, se viram um para o outro e namoram. */
  startCourtships() {
    for (const a of this.breeders()) {
      const b = a.partner;
      if (!b || a.courtship > 0 || b.partner !== a || this.courting.has(a) || this.courting.has(b)) continue;
      if (Math.hypot(a.x - b.x, a.y - b.y) > COURT_DISTANCE) continue;
      a.courtship = b.courtship = COURTSHIP_SECONDS;
      this.courting.add(a);
      const aLeft = a.x <= b.x;
      a.facing = aLeft ? "right" : "left";
      b.facing = aLeft ? "left" : "right";
    }
  }
  /** Pares que começaram a namorar (o filhote nasce quando o namoro termina). */
  courting = /* @__PURE__ */ new Set();
  /** Fim do namoro: nasce um filhote entre os dois; ambos entram em espera. */
  finishCourtships(world) {
    for (const a of [...this.courting]) {
      const b = a.partner;
      if (!b || b.partner !== a) {
        this.courting.delete(a);
        continue;
      }
      if (a.courtship > 0 || b.courtship > 0) continue;
      this.courting.delete(a);
      this.spawnBaby(world, (a.x + b.x) / 2, (a.y + b.y) / 2, a);
      for (const s of [a, b]) {
        s.love = 0;
        s.cooldown = BREED_COOLDOWN;
        s.partner = null;
      }
    }
  }
  /** Filhote da espécie do pai/mãe na célula andável mais perto do casal (até 2 células). */
  spawnBaby(world, x, y, parent) {
    const cx = Math.floor(x);
    const cy = Math.floor(y);
    for (let r = 0; r <= 2; r++) {
      for (let dy = -r; dy <= r; dy++) {
        for (let dx = -r; dx <= r; dx++) {
          if (!world.isWalkable(cx + dx, cy + dy)) continue;
          const bx = cx + dx + 0.5;
          const by = cy + dy + 0.5;
          if (parent instanceof FarmAnimal) this.horses.push(new FarmAnimal(parent.kind, bx, by, this.rand, true, parent.homeX, parent.homeY));
          else this.npcs.push(new Sheep(bx, by, parent.homeX, parent.homeY, this.rand, true));
          return;
        }
      }
    }
  }
  /**
   * Entidades (exceto a personagem) dentro do arco do golpe (espada ou machado): à frente, até SWORD_REACH
   * da borda do corpo (monstro grande é atingido de mais longe).
   */
  strikeTargets(facing, from = this.player) {
    const [fx, fy] = FACING_VEC[facing];
    const p = from;
    if (!p) return [];
    return [...this.npcs, ...this.horses, ...this.monsters].filter((s) => {
      const dx = s.x - p.x;
      const dy = s.y - p.y;
      const d = Math.hypot(dx, dy);
      const body = s instanceof Monster ? s.spec.halfW : 0;
      if (d - body > SWORD_REACH) return false;
      return d < 0.35 + body || (dx * fx + dy * fy) / d >= SWORD_ARC_COS;
    });
  }
  /**
   * Golpe (espada ou machado): aplica o acerto a cada alvo no arco e retorna quantos foram atingidos.
   * Animais somem (sem animação de morte ainda). Monstros levam o dano da fórmula (ataque + poder da arma − defesa,
   * com variação e crítico — `world/progression.ts`), piscam e recuam; sem vida, somem.
   */
  strike(facing, world, tool = this.player?.attackTool ?? this.player?.equipped ?? null) {
    const p = this.player;
    if (!p) return 0;
    return this.strikeFrom(p, facing, p.stats.attack + weaponPower(tool), world);
  }
  /** Golpe de quem está em `from` com força `attack` (ataque + poder da arma): a personagem ou um jogador da sala. */
  strikeFrom(from, facing, attack, world) {
    const hit = this.strikeTargets(facing, from);
    for (const s of hit) {
      if (!(s instanceof Monster)) {
        this.removeAnimal(s);
        continue;
      }
      const dmg = rollDamage(attack, MONSTER_STATS[s.kind].defense, this.rand);
      const knock = Math.min(2, 0.8 + Math.min(0.7, dmg.amount / s.maxHp) + (dmg.crit ? 0.5 : 0));
      if (world) s.takeHit(dmg.amount, from.x, from.y, world, this.blocker, knock);
      else s.hp -= dmg.amount;
      this.onDamage?.(s.x, s.y, dmg, "enemy");
      if (s.dead) this.killMonster(s);
    }
    return hit.length;
  }
  /** Monstro derrotado: sai do jogo, toca a animação de morte, solta espólios e agenda o renascimento. */
  killMonster(m) {
    const i = this.monsters.indexOf(m);
    if (i < 0) return;
    this.monsters.splice(i, 1);
    this.dying.push({ kind: m.kind, x: m.x, y: m.y, facing: m.facing, t: 0 });
    this.respawns.push({ kind: m.kind, x: m.homeX, y: m.homeY, bounds: m.bounds, timer: MONSTERS[m.kind].respawn });
    this.onMonsterKilled?.(m);
  }
  /** Renasce quando o tempo passou e a personagem está longe do ponto (senão tenta de novo em 5 s). */
  updateRespawns(dt) {
    for (let i = this.respawns.length - 1; i >= 0; i--) {
      const r = this.respawns[i];
      r.timer -= dt;
      if (r.timer > 0) continue;
      const m = new Monster(r.kind, r.x, r.y, r.bounds, this.rand);
      const near = this.hunters().some((p) => Math.hypot(p.x - r.x, p.y - r.y) < RESPAWN_CLEARANCE);
      if (near || this.all().some((w) => m.overlapsAt(m.x, m.y, w))) {
        r.timer = 5;
        continue;
      }
      this.respawns.splice(i, 1);
      this.monsters.push(m);
    }
  }
  /** Mapa de distâncias pelo chão da dungeon até o jogador mais perto (BFS a partir de todos lá dentro). */
  updateFlow(dt, world) {
    const d = world.dungeon;
    const inside = d ? this.hunters().filter((p) => !p.dead && inRect(d.area, Math.floor(p.x), Math.floor(p.y))) : [];
    if (!d || inside.length === 0) {
      this.flow = null;
      return;
    }
    this.flowTimer -= dt;
    if (this.flow && this.flowTimer > 0) return;
    this.flowTimer = FLOW_EVERY;
    const a = d.area;
    const w = a.x1 - a.x0 + 1;
    const h = a.y1 - a.y0 + 1;
    const dist = this.flow && this.flow.length === w * h ? this.flow.fill(-1) : new Int32Array(w * h).fill(-1);
    const q = new Int32Array(w * h);
    let head = 0;
    let tail = 0;
    for (const p of inside) {
      const start = (Math.floor(p.y) - a.y0) * w + (Math.floor(p.x) - a.x0);
      if (dist[start] === 0) continue;
      dist[start] = 0;
      q[tail++] = start;
    }
    while (head < tail) {
      const i = q[head++];
      const x = i % w;
      const y = (i - x) / w;
      for (let k = 0; k < 4; k++) {
        const nx = x + (k === 0 ? 1 : k === 1 ? -1 : 0);
        const ny = y + (k === 2 ? 1 : k === 3 ? -1 : 0);
        if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
        const j = ny * w + nx;
        if (dist[j] >= 0 || world.standHeight(a.x0 + nx, a.y0 + ny) !== 0) continue;
        dist[j] = dist[i] + 1;
        q[tail++] = j;
      }
    }
    this.flow = dist;
    this.flowArea = a;
  }
  flowAt = (x, y) => {
    const a = this.flowArea;
    if (!this.flow || !a || x < a.x0 || y < a.y0 || x > a.x1 || y > a.y1) return -1;
    return this.flow[(y - a.y0) * (a.x1 - a.x0 + 1) + (x - a.x0)];
  };
  /** Remove um animal e desfaz vínculos (par, namoro) de quem dependia dele. */
  removeAnimal(s) {
    const list = s instanceof FarmAnimal ? this.horses : this.npcs;
    const i = list.indexOf(s);
    if (i < 0) return;
    list.splice(i, 1);
    this.courting.delete(s);
    for (const o of this.breeders()) {
      if (o.partner === s) {
        o.partner = null;
        o.courtship = 0;
        this.courting.delete(o);
      }
    }
  }
  /** Animal sob o ponto (em células), considerando a altura do sprite; o mais à frente vence. */
  animalAt(wx, wy) {
    let hit = null;
    for (const s of this.breeders()) {
      const [h0, half0] = PICK_BOX[s.species][s.baby ? 1 : 0];
      const h = h0 * SUBDIV, half = half0 * SUBDIV;
      const lift = s.visualZ * CUBE_FRONT / TILE;
      if (Math.abs(wx - s.x) < half && wy > s.y - lift - h && wy < s.y - lift + 0.2) {
        if (!hit || s.y > hit.y) hit = s;
      }
    }
    return hit;
  }
  /** Morador sob o ponto (em células), pela altura do sprite; o mais à frente vence. */
  villagerAt(wx, wy) {
    let hit = null;
    for (const v of this.villagers) {
      if (v.hidden) continue;
      const lift = v.visualZ * CUBE_FRONT / TILE;
      if (Math.abs(wx - v.x) < 0.45 && wy > v.y - lift - 2.1 && wy < v.y - lift + 0.2 && (!hit || v.y > hit.y)) hit = v;
    }
    return hit;
  }
  /**
   * Morador logo à frente da personagem (no arco para onde ela olha), para conversar: até 1,8 célula; quem tem ofício
   * atende do outro lado do balcão (até 3,2).
   */
  villagerInFront() {
    const p = this.player;
    if (!p) return null;
    const [fx, fy] = FACING_VEC[p.facing];
    let best = null;
    let bestD = Infinity;
    for (const v of this.villagers) {
      if (v.hidden) continue;
      const dx = v.x - p.x;
      const dy = v.y - p.y;
      const d = Math.hypot(dx, dy);
      if (d > (v.role ? 3.2 : 1.8) * SUBDIV || d >= bestD) continue;
      if (d < 0.4 * SUBDIV || (dx * fx + dy * fy) / d >= 0.3) {
        best = v;
        bestD = d;
      }
    }
    return best;
  }
  /** Outra entidade (não a personagem deste aparelho) ocupa a célula? (assento já tomado). */
  occupiesOther(cx, cy) {
    return this.all().some((w) => w !== this.player && w.occupies(cx, cy));
  }
  /** Alguma entidade ocupa a célula? (não se coloca bloco nem se cava sob elas). */
  occupies(cx, cy) {
    return this.all().some((w) => w.occupies(cx, cy));
  }
  settleAll(world) {
    for (const w of this.all()) w.settle(world);
  }
  get actors() {
    const out = [...this.extra];
    const p = this.player;
    if (p) {
      const b = this.body;
      const sitting = p.sitting && canSit(b);
      const kind = this.character === "goddess" ? "goddess" : sitting ? `${b}-sit` : heroActorKind(b, p.equipped, p.attackTool, p.attacking);
      out.unshift({
        kind,
        x: p.x,
        y: p.y,
        visualZ: p.visualZ,
        facing: p.facing,
        moving: p.moving,
        walkTime: p.walkTime,
        frame: sitting ? p.sitFrame : p.attacking ? p.attackFrame : void 0,
        phase: !sitting && p.attacking ? p.attackPhase : void 0,
        hurt: p.invuln > 0
      });
    }
    for (const s of this.npcs) {
      out.push({
        kind: s.baby ? "lamb" : "sheep",
        x: s.x,
        y: s.y,
        visualZ: s.visualZ,
        facing: s.facing,
        moving: s.moving,
        walkTime: s.walkTime,
        inLove: s.inLove && s.courtship <= 0
      });
    }
    for (const h of this.horses) {
      out.push({
        kind: h.baby ? BABY_KIND[h.kind] : h.kind === "capybara" && !h.moving ? "capybara-idle" : h.kind,
        x: h.x,
        y: h.y,
        visualZ: h.visualZ,
        facing: h.facing,
        moving: h.moving,
        walkTime: h.walkTime,
        inLove: h.inLove && h.courtship <= 0
      });
    }
    for (const a of this.courting) {
      const b = a.partner;
      if (!b || a.courtship <= 0) continue;
      const progress = 1 - a.courtship / COURTSHIP_SECONDS;
      out.push({
        kind: "love-hearts",
        x: (a.x + b.x) / 2,
        y: Math.max(a.y, b.y) + 0.05,
        // à frente do casal
        visualZ: Math.max(a.visualZ, b.visualZ),
        facing: "down",
        moving: false,
        walkTime: 0,
        frame: Math.min(LOVE_FRAMES - 1, Math.floor(progress * LOVE_FRAMES)),
        scale: LOVE_SCALE[a.species]
      });
    }
    for (const v of this.villagers) {
      if (v.hidden) continue;
      out.push({
        kind: `npc-${v.npc}`,
        x: v.x,
        y: v.y,
        visualZ: v.visualZ,
        facing: v.facing,
        moving: v.moving,
        walkTime: v.walkTime,
        fade: v.fade > 0 ? v.fade : void 0,
        look: v.look ?? void 0,
        mark: this.marks[v.resident?.id ?? v.npc]
      });
    }
    for (const m of this.monsters) {
      const state = hasPoses(m.kind) ? m.visualState : null;
      const kind = state ? state === "walk" ? m.kind : `${m.kind}-${state}` : m.kind;
      out.push({
        kind,
        x: m.x,
        y: m.y,
        visualZ: m.visualZ,
        facing: m.facing,
        moving: m.moving,
        walkTime: m.walkTime,
        frame: state === "attack" || state === "alert" || state === "hurt" ? m.visualFrame : void 0,
        hurt: state === "hurt" ? false : m.hurt > 0,
        hp: m.hp < m.maxHp ? m.hp / m.maxHp : void 0
      });
    }
    for (const d of this.dying) {
      out.push({ kind: d.kind, x: d.x, y: d.y, visualZ: 0, facing: d.facing, moving: false, walkTime: 0, dying: d.t });
    }
    return out;
  }
};
var HOME_SPACING = 16 * SUBDIV;
function homesFor(world, n, onStreet, taken = [], spacing = HOME_SPACING) {
  const t = world.town;
  const [sx, sy] = t.start;
  const [kx, ky] = t.castleDoor;
  const homes = taken.length ? [] : [[sx - 5, sy - 1], [sx + 5, sy - 3], [Math.round((sx + kx) / 2), Math.round((sy + ky) / 2)], [kx + 3, ky + 2]].slice(0, n);
  const a = t.area;
  const cells = [];
  for (let cy = a.y0; cy < t.gate.y0; cy++) for (let cx = a.x0; cx <= a.x1; cx++) if (onStreet(cx, cy)) cells.push([cx, cy, hash2(7919, cx, cy)]);
  cells.sort((p, q) => p[2] - q[2]);
  for (const [cx, cy] of cells) {
    if (homes.length >= n) break;
    if (homes.every(([hx, hy]) => Math.hypot(hx - cx, hy - cy) >= spacing) && taken.every(([hx, hy]) => Math.hypot(hx - cx, hy - cy) >= spacing)) homes.push([cx, cy]);
  }
  while (homes.length < n) homes.push(taken.length ? cells[homes.length % cells.length].slice(0, 2) : homes[homes.length % 4]);
  return homes;
}

// src/game/attackTiming.ts
var DEFAULT_ATTACK_TIMING = { seconds: 0.36, hitAt: 0.45 };

// src/game/feel.ts
var INPUT_ACCEL = 18;
var INPUT_DECEL = 25;

// src/game/player.ts
var ATTACK_SECONDS = DEFAULT_ATTACK_TIMING.seconds;
var ATTACK_HIT_AT = DEFAULT_ATTACK_TIMING.hitAt;
var ATTACK_CHAIN_AT = 0.7;
var ATTACK_BUFFER_S = 0.18;
var ATTACK_FRAMES = 4;
var HURT_INVULN_S = 0.9;
var RESPAWN_INVULN_S = 2;
var SIT_SECONDS = 0.5;
var SEATED_FRAME = 3;
var SEAT_FEET = 1.05;
var SEAT_WALK = 3;
var Player = class extends Walker {
  /** Ferramenta em mãos (muda o sprite); null = mãos livres. */
  equipped = null;
  /** Tempo restante do golpe em andamento (0 = sem golpe). */
  attackTime = 0;
  /** Ferramenta do golpe em andamento (define a folha de animação). */
  attackTool = null;
  /** Golpes começados (a sala repassa aos outros, que tocam a animação ao ver o número mudar). */
  swings = 0;
  /** Quantos golpes já chegaram ao ponto de acerto (`consumeHit`): o render usa a mudança para tocar o efeito no instante da pancada. */
  impacts = 0;
  /** Tempo do golpe em andamento (do personagem e da ferramenta, `attackTimingFor`); o `Game` liga `timingFor`. */
  timingFor = null;
  timing = DEFAULT_ATTACK_TIMING;
  hitDone = true;
  /**
   * Sensação de movimento (v0.93.69): com `smooth` ligado a entrada tem inércia curta (arranca e para em ~50 ms, sem corte seco) e o passo
   * da animação anda pela distância percorrida (o pé não desliza). Desligado = o movimento de antes. O `Game` liga; os testes de física antigos ficam como eram.
   */
  smooth = false;
  /** Entrada suavizada (0..1 por eixo): o que de fato move o personagem quando `smooth`. */
  vx = 0;
  vy = 0;
  /** Golpe pedido durante o anterior (fila curta): ferramenta e tempo restante da fila. */
  queuedTool = void 0;
  queueLeft = 0;
  /** Atributos atuais (vida máxima, ataque, defesa — `world/progression.ts`). */
  stats = playerStats(1);
  /** Vida em pontos (0 = derrotada; o Game a faz renascer). */
  hp = this.stats.maxHp;
  /** Invencibilidade restante (pisca na tela). */
  invuln = 0;
  /** Tempo desde o último dano (regeneração). */
  sinceHurt = Infinity;
  regen = 0;
  /** Fome ligada neste mundo (perfil com cultivo); desligada, a barra fica cheia e nada muda. */
  hungerOn = false;
  /** Barra de fome (cheia = satisfeita), `HUNGER` em world/progression. */
  hunger = HUNGER.max;
  starve = 0;
  /** Sentado num assento (cadeira, banco); null = de pé. */
  seat = null;
  constructor(x, y) {
    super(x, y, { speed: 4.2, halfW: 0.27, halfD: 0.15, stepHeight: STEP_HEIGHT, maxHalfW: 0.45 });
  }
  get attacking() {
    return this.attackTime > 0;
  }
  /** Quadro atual do golpe (0..ATTACK_FRAMES-1). */
  get attackFrame() {
    return Math.min(ATTACK_FRAMES - 1, Math.floor(this.attackPhase * ATTACK_FRAMES));
  }
  /** Quanto do golpe já passou (0..1): as folhas com mais de 4 quadros escolhem o quadro por aqui. */
  get attackPhase() {
    return this.attacking ? 1 - this.attackTime / this.timing.seconds : 0;
  }
  /** Já passou do acerto e do ponto de cancelar: dá para começar outro golpe por cima do que termina. */
  get canChain() {
    return this.attacking && this.hitDone && this.attackPhase >= ATTACK_CHAIN_AT;
  }
  /**
   * Começa um golpe. Com outro em andamento: se já dá para encadear, começa o novo; senão, se faltam até `ATTACK_BUFFER_S`
   * para poder encadear, o pedido entra na fila (sai sozinho quando der) e devolve false; pedido mais cedo que isso é
   * ignorado (apertar sem parar não empilha golpes).
   */
  startAttack(tool = this.equipped) {
    if (this.attacking && !this.canChain) {
      const toChain = this.timing.seconds * ATTACK_CHAIN_AT - (this.timing.seconds - this.attackTime);
      if (toChain <= ATTACK_BUFFER_S) {
        this.queuedTool = tool;
        this.queueLeft = ATTACK_BUFFER_S;
      }
      return false;
    }
    this.queuedTool = void 0;
    this.attackTool = tool;
    this.timing = this.timingFor?.(tool) ?? DEFAULT_ATTACK_TIMING;
    this.attackTime = this.timing.seconds;
    this.swings++;
    this.hitDone = false;
    return true;
  }
  /** true uma única vez por golpe, quando a lâmina chega ao ponto de acerto. */
  consumeHit() {
    if (this.hitDone || !this.attacking) return false;
    if (this.attackPhase < this.timing.hitAt) return false;
    this.hitDone = true;
    this.impacts++;
    return true;
  }
  get dead() {
    return this.hp <= 0;
  }
  get maxHp() {
    return this.stats.maxHp;
  }
  /**
   * Leva dano de (fromX, fromY): perde `damage` pontos de vida, fica invencível por um instante e recua.
   * Ignorado se invencível ou já derrotada. Retorna true se o dano entrou.
   */
  hurt(damage, fromX, fromY, world, blocked) {
    if (this.invuln > 0 || this.dead) return false;
    if (this.seat) {
      this.x = this.seat.fromX;
      this.y = this.seat.fromY;
      this.seat = null;
    }
    this.hp = Math.max(0, this.hp - damage);
    this.invuln = HURT_INVULN_S;
    this.sinceHurt = 0;
    this.regen = 0;
    const d = Math.hypot(this.x - fromX, this.y - fromY) || 1;
    const facing = this.facing;
    this.move(0.12, (this.x - fromX) / d, (this.y - fromY) / d, world, blocked);
    this.facing = facing;
    return true;
  }
  /** Renasce em (x, y) com vida cheia (itens ficam com ela). */
  respawn(x, y) {
    this.seat = null;
    this.vx = this.vy = 0;
    this.x = x;
    this.y = y;
    this.z = this.visualZ = 0;
    this.hp = this.maxHp;
    this.hunger = HUNGER.max;
    this.invuln = RESPAWN_INVULN_S;
    this.sinceHurt = Infinity;
    this.attackTime = 0;
    this.hitDone = true;
    this.queuedTool = void 0;
  }
  /** Come: a fome sobe `points` (até cheia). false = sem fome (barra cheia) ou fome desligada. */
  eat(points) {
    if (!this.hungerOn || points <= 0 || this.hunger >= HUNGER.max - 0.5) return false;
    this.hunger = Math.min(HUNGER.max, this.hunger + points);
    this.starve = 0;
    return true;
  }
  /** Fome esvaziando; vazia, tira vida aos poucos (para em 1 — a fome sozinha não derruba). */
  tickHunger(dt) {
    if (!this.hungerOn || this.hp <= 0) return;
    this.hunger = Math.max(0, this.hunger - dt * HUNGER.perSecond);
    if (this.hunger > 0) {
      this.starve = 0;
      return;
    }
    this.starve += dt;
    if (this.starve < HUNGER.starveEvery) return;
    this.starve = 0;
    if (this.hp > 1) this.hp = Math.max(1, this.hp - HUNGER.starveDamage);
  }
  /** Invencibilidade e regeneração fora de combate (com fome abaixo de `HUNGER.regenMin`, não regenera). */
  tickHealth(dt) {
    this.invuln = Math.max(0, this.invuln - dt);
    this.sinceHurt += dt;
    this.tickHunger(dt);
    if (this.hungerOn && this.hunger < HUNGER.regenMin) return;
    if (this.hp <= 0 || this.hp >= this.maxHp || this.sinceHurt < REGEN.delay) return;
    this.regen += dt;
    if (this.regen >= REGEN.every) {
      this.regen = 0;
      this.hp = Math.min(this.maxHp, this.hp + Math.max(1, Math.round(this.maxHp * REGEN.fraction)));
    }
  }
  /**
   * Senta no assento da célula (x, y): vai para o meio dele, de frente, e toca a animação de sentar. Ao levantar
   * (andar ou tocar de novo — `standUp`), volta para onde estava.
   */
  sitOn(x, y) {
    if (this.seat || this.dead || this.attacking) return false;
    this.seat = { x: x + 0.5, y: y + SEAT_FEET, fromX: this.x, fromY: this.y, phase: "go", t: 0 };
    return true;
  }
  /** Começa a levantar (se estiver sentado ou sentando). */
  standUp() {
    const s = this.seat;
    if (s && (s.phase === "seated" || s.phase === "down")) {
      s.phase = "up";
      s.t = 0;
    }
  }
  /** Na pose de sentar (sentando, sentado ou levantando) — andando até o assento ou de volta não conta. */
  get sitting() {
    const p = this.seat?.phase;
    return p === "down" || p === "seated" || p === "up";
  }
  /** Quadro da folha de sentar: 0–3 sentando, `SEATED_FRAME` parado, 3→0 levantando. */
  get sitFrame() {
    const s = this.seat;
    if (!s) return 0;
    if (s.phase === "seated") return SEATED_FRAME;
    const k = Math.min(3, Math.floor(s.t / SIT_SECONDS * 4));
    return s.phase === "up" ? 3 - k : k;
  }
  /** Anda (desenho de caminhada) em linha reta até (tx, ty), atravessando o assento; true = chegou. */
  walkTo(dt, tx, ty) {
    const dx = tx - this.x;
    const dy = ty - this.y;
    const d = Math.hypot(dx, dy);
    const step = SEAT_WALK * dt;
    if (Math.abs(dx) > Math.abs(dy)) this.facing = dx < 0 ? "left" : "right";
    else if (d > 0.01) this.facing = dy < 0 ? "up" : "down";
    if (d <= step) {
      this.x = tx;
      this.y = ty;
      this.moving = false;
      this.walkTime = 0;
      return true;
    }
    this.x += dx / d * step;
    this.y += dy / d * step;
    this.moving = true;
    this.walkTime += dt;
    return false;
  }
  /**
   * Sentado: anda até o assento, vira de frente e senta no lugar (o corpo desce); fica parado; mexer o controle (ou
   * tocar) levanta no lugar e ele anda de volta para onde estava.
   */
  updateSeat(dt, ix, iy) {
    const s = this.seat;
    s.t += dt;
    if (s.phase === "go") {
      if (this.walkTo(dt, s.x, s.y)) {
        s.phase = "down";
        s.t = 0;
        this.facing = "down";
      }
      return;
    }
    if (s.phase === "back") {
      if (this.walkTo(dt, s.fromX, s.fromY)) this.seat = null;
      return;
    }
    this.moving = false;
    this.walkTime = 0;
    this.facing = "down";
    if (s.phase === "down" && s.t >= SIT_SECONDS) {
      s.phase = "seated";
      s.t = 0;
    }
    if (s.phase === "seated" && Math.hypot(ix, iy) > 0.3) this.standUp();
    if (s.phase === "up" && s.t >= SIT_SECONDS) {
      s.phase = "back";
      s.t = 0;
    }
  }
  update(dt, ix, iy, world, blocked) {
    this.tickHealth(dt);
    if (this.seat) {
      this.vx = this.vy = 0;
      this.updateSeat(dt, ix, iy);
      return;
    }
    const facing = this.facing;
    if (this.smooth) {
      const want = Math.hypot(ix, iy);
      const have = Math.hypot(this.vx, this.vy);
      const k = 1 - Math.exp(-(want >= have ? INPUT_ACCEL : INPUT_DECEL) * dt);
      this.vx += (ix - this.vx) * k;
      this.vy += (iy - this.vy) * k;
      const w0 = this.walkTime;
      const moved = this.move(dt, this.vx, this.vy, world, blocked);
      if (this.moving) this.walkTime = w0 + Math.max(moved / this.spec.speed, 0.25 * dt);
    } else {
      this.move(dt, ix, iy, world, blocked);
    }
    if (this.attacking) {
      this.facing = facing;
      this.attackTime = Math.max(0, this.attackTime - dt);
    }
    if (this.queuedTool !== void 0) {
      this.queueLeft -= dt;
      if (this.queueLeft <= 0) this.queuedTool = void 0;
      else if (!this.attacking || this.canChain) this.startAttack(this.queuedTool);
    }
  }
};

// src/world/coords.ts
function toChunk(v) {
  return Math.floor(v / CHUNK_SIZE);
}
function toLocal(v) {
  return (v % CHUNK_SIZE + CHUNK_SIZE) % CHUNK_SIZE;
}
function chunkKey(cx, cy) {
  return `${cx},${cy}`;
}

// src/net/b64.ts
function toB64(a) {
  let s = "";
  for (let i = 0; i < a.length; i++) s += String.fromCharCode(a[i]);
  return btoa(s);
}
function fromB64(s) {
  return Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
}

// src/world/subdiv.ts
function rescaleFactor(from, to) {
  if (!Number.isInteger(from) || !Number.isInteger(to) || from < 1 || to < from || to % from !== 0) {
    throw new Error(`grade ${from} \u2192 ${to} n\xE3o suportada`);
  }
  return to / from;
}
function repeatsWhenRescaled(id) {
  if (id === Block.AIR || id === Block.TENT || id === Block.TENT_PART || id === Block.TOWN_PART) return true;
  const shape = blockDef(id).shape;
  return shape === "cube" || shape === "wall" || shape === "wall-door" || shape === "door" || shape === "fence" || shape === "crop";
}
function rescaleChunk(c, f) {
  if (f === 1) return [c];
  const out = /* @__PURE__ */ new Map();
  const target = (gx, gy) => {
    const tcx = Math.floor(gx / CHUNK_SIZE);
    const tcy = Math.floor(gy / CHUNK_SIZE);
    const k = `${tcx},${tcy}`;
    let t = out.get(k);
    if (!t) {
      t = { cx: tcx, cy: tcy, ground: new Uint8Array(CHUNK_SIZE * CHUNK_SIZE), levels: c.levels.map(() => new Uint8Array(CHUNK_SIZE * CHUNK_SIZE)) };
      out.set(k, t);
    }
    return { t, i: (gy - tcy * CHUNK_SIZE) * CHUNK_SIZE + (gx - tcx * CHUNK_SIZE) };
  };
  for (let ly = 0; ly < CHUNK_SIZE; ly++) {
    for (let lx = 0; lx < CHUNK_SIZE; lx++) {
      const src = ly * CHUNK_SIZE + lx;
      for (let dy = 0; dy < f; dy++) {
        for (let dx = 0; dx < f; dx++) {
          const { t, i } = target((c.cx * CHUNK_SIZE + lx) * f + dx, (c.cy * CHUNK_SIZE + ly) * f + dy);
          t.ground[i] = c.ground[src];
          const corner = dx === 0 && dy === f - 1;
          c.levels.forEach((l, k) => {
            t.levels[k][i] = repeatsWhenRescaled(l[src]) || corner ? l[src] : Block.AIR;
          });
        }
      }
    }
  }
  return [...out.values()];
}
function rescaleChunkRecords(list, f) {
  if (f === 1) return [...list];
  return list.flatMap((r) => rescaleChunk({ cx: r.cx, cy: r.cy, ground: fromB64(r.ground), levels: r.levels.map(fromB64) }, f)).map((c) => ({ cx: c.cx, cy: c.cy, ground: toB64(c.ground), levels: c.levels.map(toB64) }));
}
function rescaleXY(x, y, f) {
  return [x * f, y * f];
}
function rescaleCell(x, y, f) {
  return [x * f, y * f + f - 1];
}
function rescaleCellKey(key, f) {
  const [x, y] = key.split(",").map(Number);
  const [nx, ny] = rescaleCell(x, y, f);
  return `${nx},${ny}`;
}
function rescaleHoles(holes, f) {
  if (f === 1) return holes.map((h) => [...h]);
  return holes.flatMap(([x, y, s]) => {
    const out = [];
    for (let dy = 0; dy < f; dy++) for (let dx = 0; dx < f; dx++) out.push([x * f + dx, y * f + dy, s]);
    return out;
  });
}

// src/world/quarters.ts
function quarterLevel(obj, upper, level) {
  if (!isStackBlock(obj)) return level === 0 ? obj : level === 1 ? upper : Block.AIR;
  if (level < 0 || level >= 4) return Block.AIR;
  if (!isStackBlock(upper)) return obj;
  return level < 2 ? obj : upper;
}

// src/world/walls.ts
function wallNeighbors(isWall2, x, y) {
  return {
    n: isWall2(x, y - 1),
    e: isWall2(x + 1, y),
    s: isWall2(x, y + 1),
    w: isWall2(x - 1, y),
    ne: isWall2(x + 1, y - 1),
    se: isWall2(x + 1, y + 1),
    sw: isWall2(x - 1, y + 1),
    nw: isWall2(x - 1, y - 1)
  };
}
function wallFront(nb) {
  if (nb.s && !nb.e && !nb.w) return null;
  if (nb.w && nb.e) return "mid";
  if (nb.e) return "left";
  if (nb.w) return "right";
  return nb.n ? "end" : "single";
}
var CAP_N = 1;
var CAP_E = 2;
var CAP_S = 4;
var CAP_W = 8;
function wallCapMask(nb) {
  return (nb.n ? CAP_N : 0) | (nb.e ? CAP_E : 0) | (nb.s ? CAP_S : 0) | (nb.w ? CAP_W : 0);
}
var INNER_NE = 1;
var INNER_SE = 2;
var INNER_SW = 4;
var INNER_NW = 8;
function wallInnerCorners(nb) {
  return (nb.n && nb.e && !nb.ne ? INNER_NE : 0) | (nb.s && nb.e && !nb.se ? INNER_SE : 0) | (nb.s && nb.w && !nb.sw ? INNER_SW : 0) | (nb.n && nb.w && !nb.nw ? INNER_NW : 0);
}
function wallPiece(nb) {
  return { front: wallFront(nb), cap: wallCapMask(nb), inner: wallInnerCorners(nb) };
}

// src/world/chunk.ts
var Chunk = class {
  constructor(cx, cy, maxStack = MAX_STACK) {
    this.cx = cx;
    this.cy = cy;
    this.maxStack = maxStack;
    this.levels = Array.from({ length: maxStack }, () => new Uint8Array(CHUNK_SIZE * CHUNK_SIZE));
  }
  cx;
  cy;
  maxStack;
  ground = new Uint8Array(CHUNK_SIZE * CHUNK_SIZE);
  /** Um array por nível de pilha. */
  levels;
  /** True se o jogador alterou algo (chunk não pode ser descartado). */
  modified = false;
  /** Incrementado a cada mudança visível (inclusive vizinhos na borda); invalida caches. */
  version = 0;
  /** Nível 0 (preenchido pelo gerador). */
  get objects() {
    return this.levels[0];
  }
  /** Nível 1 (preenchido pelo gerador: montanhas altas). */
  get upper() {
    return this.levels[1];
  }
  getGround(lx, ly) {
    return this.ground[ly * CHUNK_SIZE + lx];
  }
  getObject(lx, ly) {
    return this.levels[0][ly * CHUNK_SIZE + lx];
  }
  getLevel(lx, ly, level) {
    return this.levels[level][ly * CHUNK_SIZE + lx];
  }
  /** Quantos níveis ocupados há na célula (contínuos a partir do 0). */
  filledLevels(lx, ly) {
    let n = 0;
    while (n < this.levels.length && this.levels[n][ly * CHUNK_SIZE + lx] !== 0) n++;
    return n;
  }
  /** Define o chão (buraco ao quebrar, ou cubo usado como piso). */
  setGround(lx, ly, id) {
    this.ground[ly * CHUNK_SIZE + lx] = id;
    this.modified = true;
    this.version++;
  }
  /** Define o bloco de um nível da célula. */
  setLevel(lx, ly, level, id) {
    this.levels[level][ly * CHUNK_SIZE + lx] = id;
    this.modified = true;
    this.version++;
  }
};

// src/world/biomes.ts
var BIOMES = {
  meadow: {
    key: "meadow",
    name: "Campos Verdejantes",
    ground: Block.GRASS,
    tree: Block.OAK_TREE,
    treeDensity: 0.22,
    altTrees: [{ id: Block.APPLE_TREE, share: 1 / 6 }, { id: Block.BIRCH_TREE, share: 1 / 5 }, { id: Block.SAKURA_TREE, share: 1 / 4 }],
    decorations: [Block.TALL_GRASS, Block.TALL_GRASS, Block.FLOWER],
    decoChance: 0.12
  },
  sakura: {
    key: "sakura",
    name: "Bosque de Sakura",
    ground: Block.GRASS,
    tree: Block.SAKURA_TREE,
    treeDensity: 0.3,
    altTrees: [{ id: Block.APPLE_TREE, share: 1 / 6 }, { id: Block.BIRCH_TREE, share: 1 / 5 }, { id: Block.OAK_TREE, share: 1 / 4 }],
    decorations: [Block.FLOWER, Block.FLOWER, Block.TALL_GRASS],
    decoChance: 0.12
  },
  desert: {
    key: "desert",
    name: "Dunas Douradas",
    ground: Block.SAND,
    tree: Block.CACTUS,
    treeDensity: 0.06,
    decorations: [],
    decoChance: 0
  },
  celestial: {
    key: "celestial",
    name: "Santu\xE1rio Celestial",
    ground: Block.CLOUD_SOLID,
    tree: Block.AIR,
    treeDensity: 0,
    decorations: [],
    decoChance: 0
  }
};
function pickBiome(_temperature, moisture) {
  if (moisture < -0.18) return BIOMES.sakura;
  return BIOMES.meadow;
}

// src/world/flatGenerator.ts
var FlatGenerator = class {
  constructor(seed, ground2, biome = BIOMES.celestial) {
    this.biome = biome;
    this.seed = seed >>> 0;
    this.cell = { ground: ground2, object: Block.AIR, upper: Block.AIR };
  }
  biome;
  seed;
  cell;
  cellAt() {
    return this.cell;
  }
  groundAt() {
    return this.cell.ground;
  }
  objectAt() {
    return Block.AIR;
  }
  upperAt() {
    return Block.AIR;
  }
  biomeAt() {
    return this.biome;
  }
  generateChunk(_cx, _cy, ground2, objects, upper) {
    ground2.fill(this.cell.ground, 0, CHUNK_SIZE * CHUNK_SIZE);
    objects.fill(Block.AIR);
    upper.fill(Block.AIR);
  }
};

// src/world/sanctuarySeedGenerator.ts
var SANCTUARY_LEVEL_COVERAGE = [1, 0.5, 0.3, 0.1, 0.05];
var SanctuarySeedGenerator = class {
  seed;
  x0;
  y0;
  width;
  height;
  heights;
  constructor(seed, bounds) {
    this.seed = seed >>> 0;
    this.x0 = bounds.cx0 * CHUNK_SIZE;
    this.y0 = bounds.cy0 * CHUNK_SIZE;
    this.width = (bounds.cx1 - bounds.cx0 + 1) * CHUNK_SIZE;
    this.height = (bounds.cy1 - bounds.cy0 + 1) * CHUNK_SIZE;
    const count = this.width * this.height;
    this.heights = new Uint8Array(count).fill(1);
    const centerX = this.x0 + Math.floor(this.width / 2);
    const centerY = this.y0 + Math.floor(this.height / 2);
    const eligible = [];
    for (let i = 0; i < count; i++) {
      const x = this.x0 + i % this.width;
      const y = this.y0 + Math.floor(i / this.width);
      if (Math.abs(x - centerX) <= 1 && Math.abs(y - centerY) <= 1) continue;
      eligible.push(i);
    }
    const random = mulberry32(this.seed ^ 1511507773);
    for (let i = eligible.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [eligible[i], eligible[j]] = [eligible[j], eligible[i]];
    }
    for (let level = 2; level <= 5; level++) {
      const required = Math.round(count * SANCTUARY_LEVEL_COVERAGE[level - 1]);
      if (required > eligible.length) throw new Error("\xC1rea insuficiente para a distribui\xE7\xE3o do Santu\xE1rio");
      for (let i = 0; i < required; i++) this.heights[eligible[i]] = level;
    }
  }
  heightAt(x, y) {
    const lx = x - this.x0, ly = y - this.y0;
    if (lx < 0 || ly < 0 || lx >= this.width || ly >= this.height) return 0;
    return this.heights[ly * this.width + lx];
  }
  /** Nível zero é a primeira camada de construção, sobre o chão de nuvens. */
  levelAt(x, y, level) {
    const height = this.heightAt(x, y);
    if (level < 0 || level >= height) return Block.AIR;
    return level === height - 1 ? Block.GRASS : Block.DIRT;
  }
  cellAt(x, y) {
    return { ground: this.groundAt(x, y), object: this.objectAt(x, y), upper: this.upperAt(x, y) };
  }
  groundAt(_x, _y) {
    return Block.CLOUD_SOLID;
  }
  objectAt(x, y) {
    return this.levelAt(x, y, 0);
  }
  upperAt(x, y) {
    return this.levelAt(x, y, 1);
  }
  biomeAt(_x, _y) {
    return BIOMES.celestial;
  }
  /** Não marca o chunk como editado; tudo pode ser recuperado a partir da seed. */
  generateChunk(cx, cy, ground2, objects, upper) {
    ground2.fill(Block.CLOUD_SOLID);
    for (let ly = 0; ly < CHUNK_SIZE; ly++) for (let lx = 0; lx < CHUNK_SIZE; lx++) {
      const i = ly * CHUNK_SIZE + lx;
      const x = cx * CHUNK_SIZE + lx, y = cy * CHUNK_SIZE + ly;
      objects[i] = this.levelAt(x, y, 0);
      upper[i] = this.levelAt(x, y, 1);
    }
  }
  /** Completa 3º, 4º e 5º níveis após o gerador padrão preencher os dois primeiros. */
  fillHighLevels(cx, cy, levels) {
    for (let level = 2; level < levels.length; level++) {
      const layer = levels[level];
      for (let ly = 0; ly < CHUNK_SIZE; ly++) for (let lx = 0; lx < CHUNK_SIZE; lx++) {
        layer[ly * CHUNK_SIZE + lx] = this.levelAt(cx * CHUNK_SIZE + lx, cy * CHUNK_SIZE + ly, level);
      }
    }
  }
};

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

// src/world/generator.ts
var WATER_LEVEL = -0.26;
var BEACH_LEVEL = -0.2;
var MOUNTAIN_LEVEL = 0.36;
var HIGH_MOUNTAIN = 0.43;
var SHALLOW_DEPTH = 0.07;
var LILY_CHANCE = 0.025;
var VICTORIA_CHANCE = 6e-3;
var WorldGenerator = class {
  seed;
  terrain;
  climate;
  detail;
  /** Deslocamento do mapa climático por seed (varia o bioma de origem entre mundos). */
  climateOx;
  climateOy;
  constructor(seed) {
    this.seed = seed >>> 0;
    this.terrain = new Noise(this.seed);
    this.climate = new Noise(this.seed ^ 2654435769);
    this.detail = new Noise(this.seed ^ 625341585);
    this.climateOx = Math.floor(hash2(this.seed, 1, 2) * 2e4) - 1e4;
    this.climateOy = Math.floor(hash2(this.seed, 3, 4) * 2e4) - 1e4;
  }
  elevation(x, y) {
    x /= SUBDIV;
    y /= SUBDIV;
    const continent = this.terrain.fbm2(x / 420 + 11.3, y / 420 - 7.1, 3) * 0.45;
    const local = this.terrain.fbm2(x / 70, y / 70, 5);
    return local * 0.8 + continent;
  }
  biomeAt(x, y) {
    x = x / SUBDIV + this.climateOx;
    y = y / SUBDIV + this.climateOy;
    const t = this.climate.fbm2(x / 480 + 31.7, y / 480 + 5.2, 3);
    const m = this.climate.fbm2(x / 300 - 913.1, y / 300 + 77.7, 3);
    return pickBiome(t * 1.9, m * 1.9);
  }
  /** Célula de rio (água de rio, não de lago nem de mar)? Usada para plantar os bandos de homem-lagarto. */
  riverAt(x, y) {
    const e = this.elevation(x, y);
    return e >= WATER_LEVEL && e < MOUNTAIN_LEVEL - 0.04 && this.isRiver(x, y);
  }
  isRiver(x, y) {
    x /= SUBDIV;
    y /= SUBDIV;
    return Math.abs(this.terrain.fbm2(x / 230 + 400, y / 230 - 400, 3)) < 0.022;
  }
  /** Célula de água (mar, lago ou rio)? */
  isWater(x, y) {
    const e = this.elevation(x, y);
    return e < WATER_LEVEL || e < MOUNTAIN_LEVEL - 0.04 && this.isRiver(x, y);
  }
  /**
   * Vitórias-régias (v0.93.92, arte do dono do produto): sorteadas na água RASA de rios e lagos (`e` logo abaixo da margem, ou rio), nunca no
   * mar aberto. A âncora é a célula do canto inferior esquerdo da planta: só nasce se toda a área dela (2 × 2 a comum, 4 × 3 a gigante) for água.
   * Função pura da seed, como o resto; o desenho (variante) sai da posição no render.
   */
  waterPlantAt(x, y, e) {
    if (e < WATER_LEVEL - SHALLOW_DEPTH && !this.isRiver(x, y)) return Block.AIR;
    const r = hash2(this.seed, x + 5521, y - 3301);
    const area = SUBDIV * SUBDIV;
    if (r < VICTORIA_CHANCE / area) return this.waterAreaFree(x, y, 4, 3) ? Block.VICTORIA : Block.AIR;
    if (r < (VICTORIA_CHANCE + LILY_CHANCE) / area) return this.waterAreaFree(x, y, 2, 2) ? Block.WATER_LILY : Block.AIR;
    return Block.AIR;
  }
  /** A área `w × h` com o canto inferior esquerdo em (x, y) (cresce para a direita e para cima) é toda água? */
  waterAreaFree(x, y, w, h) {
    for (let dy = 0; dy < h; dy++) for (let dx = 0; dx < w; dx++) if ((dx || dy) && !this.isWater(x + dx, y - dy)) return false;
    return true;
  }
  /**
   * Célula completa numa única avaliação de ruído (elevação, clima, rio, trilha).
   * `groundAt/objectAt/upperAt` derivam daqui — antes cada um recalculava o terreno
   * (até 5× por célula ao gerar um chunk).
   */
  cellAt(x, y) {
    const e = this.elevation(x, y);
    if (e < WATER_LEVEL || e < MOUNTAIN_LEVEL - 0.04 && this.isRiver(x, y)) {
      return { ground: Block.WATER, object: this.waterPlantAt(x, y, e), upper: Block.AIR };
    }
    const biome = this.biomeAt(x, y);
    if (e < BEACH_LEVEL) return { ground: Block.SAND, object: Block.AIR, upper: Block.AIR };
    let ground2 = biome.ground;
    if (e > MOUNTAIN_LEVEL - 0.05 && biome.key !== "desert") ground2 = Block.DIRT;
    else if (biome.key !== "desert" && Math.abs(this.detail.fbm2(x / SUBDIV / 90 - 300, y / SUBDIV / 90 + 300, 2)) < 0.012) {
      return { ground: Block.PATH, object: Block.AIR, upper: Block.AIR };
    }
    if (e > MOUNTAIN_LEVEL) {
      return { ground: ground2, object: Block.STONE, upper: e > HIGH_MOUNTAIN ? Block.STONE : Block.AIR };
    }
    const r = hash2(this.seed, x, y);
    const forest = this.detail.fbm2(x / SUBDIV / 38 + 50, y / SUBDIV / 38 - 50, 2);
    const area = SUBDIV * SUBDIV;
    const density = biome.treeDensity * (forest > 0.05 ? 1 : 0.12) / area;
    let object2 = Block.AIR;
    if (r < density) {
      object2 = biome.tree;
      const alts = biome.altTrees ?? [];
      for (let i = 0; i < alts.length; i++) {
        if (hash2(this.seed, x + 4409 + i * 1013, y - 2027 + i * 389) < alts[i].share) {
          object2 = alts[i].id;
          break;
        }
      }
    } else if (r > (area === 1 ? 0.994 : 1 - 6e-3 / area)) object2 = Block.ROCK_BOULDER;
    else if (hash2(this.seed, x, y + 7919) < biome.decoChance / area) {
      object2 = biome.decorations[Math.floor(hash2(this.seed, x - 31, y) * biome.decorations.length)];
    }
    return { ground: ground2, object: object2, upper: Block.AIR };
  }
  groundAt(x, y) {
    return this.cellAt(x, y).ground;
  }
  objectAt(x, y) {
    return this.cellAt(x, y).object;
  }
  /** Segundo cubo da pilha (nível 1): só em montanhas altas. */
  upperAt(x, y) {
    return this.cellAt(x, y).upper;
  }
  /** Preenche as camadas 16×16 (linha a linha) do chunk (cx, cy). */
  generateChunk(cx, cy, ground2, objects, upper) {
    const x0 = cx * CHUNK_SIZE;
    const y0 = cy * CHUNK_SIZE;
    for (let ly = 0; ly < CHUNK_SIZE; ly++) {
      for (let lx = 0; lx < CHUNK_SIZE; lx++) {
        const i = ly * CHUNK_SIZE + lx;
        const c = this.cellAt(x0 + lx, y0 + ly);
        ground2[i] = c.ground;
        objects[i] = c.object;
        upper[i] = c.upper;
      }
    }
  }
};

// src/world/flowerPatch.ts
var PATCH_FLOWERS = 10;
var SIDE = 6 * SUBDIV;
var NEAR = 20 * SUBDIV;
var BAND = 20 * SUBDIV;
var MAX_DIST = 140 * SUBDIV;
function patchSpecies(seed) {
  return FLOWER_BLOCKS[Math.floor(hash2(seed, 20979, 77) * FLOWER_BLOCKS.length)];
}
function planFlowerPatch(seed, base, gate, avoid) {
  const free = (x, y) => {
    if (avoid.some((r) => inRect(r, x, y))) return false;
    const c = base.cellAt(x, y);
    const g = blockDef(c.ground);
    if (g.liquid || c.ground === Block.HOLE || c.ground === Block.PATH) return false;
    return c.upper === Block.AIR && (c.object === Block.AIR || c.object === Block.TALL_GRASS || c.object === Block.FLOWER);
  };
  for (let t = 0; t < 1600; t++) {
    const band = Math.floor(t / 80);
    const lo = NEAR + band * BAND;
    if (lo > MAX_DIST) break;
    const angle = hash2(seed, 1697, t) * Math.PI * 2;
    const dist = lo + hash2(seed, 1698, t) * BAND;
    const cx = Math.round(gate[0] + Math.cos(angle) * dist), cy = Math.round(gate[1] + Math.sin(angle) * dist);
    const area = { x0: cx - SIDE / 2, y0: cy - SIDE / 2, x1: cx + SIDE / 2 - 1, y1: cy + SIDE / 2 - 1 };
    let ok = true;
    for (let y = area.y0 - 1; y <= area.y1 + 1 && ok; y++) for (let x = area.x0 - 1; x <= area.x1 + 1 && ok; x++) ok = free(x, y);
    if (!ok) continue;
    const cells = [];
    const taken = /* @__PURE__ */ new Set();
    for (let n = 0; cells.length < PATCH_FLOWERS && n < 200; n++) {
      const x = area.x0 + Math.floor(hash2(seed, 1713 + n, t) * SIDE), y = area.y0 + Math.floor(hash2(seed, 1714 + n, t) * SIDE);
      if (taken.has(`${x},${y}`)) continue;
      taken.add(`${x},${y}`);
      cells.push([x, y]);
    }
    if (cells.length === PATCH_FLOWERS) return { species: patchSpecies(seed), area, cells };
  }
  return null;
}
var FlowerPatchTerrain = class {
  constructor(source, patch) {
    this.source = source;
    this.patch = patch;
    this.seed = source.seed;
    this.at = new Set(patch.cells.map(([x, y]) => `${x},${y}`));
  }
  source;
  patch;
  seed;
  at;
  cellAt(x, y) {
    const c = this.source.cellAt(x, y);
    return this.at.has(`${x},${y}`) ? { ...c, object: this.patch.species } : c;
  }
  groundAt(x, y) {
    return this.source.groundAt(x, y);
  }
  objectAt(x, y) {
    return this.at.has(`${x},${y}`) ? this.patch.species : this.source.objectAt(x, y);
  }
  upperAt(x, y) {
    return this.source.upperAt(x, y);
  }
  biomeAt(x, y) {
    return this.source.biomeAt(x, y);
  }
  generateChunk(cx, cy, ground2, objects, upper) {
    this.source.generateChunk(cx, cy, ground2, objects, upper);
    for (const [x, y] of this.patch.cells) {
      if (Math.floor(x / CHUNK_SIZE) === cx && Math.floor(y / CHUNK_SIZE) === cy) objects[(y - cy * CHUNK_SIZE) * CHUNK_SIZE + (x - cx * CHUNK_SIZE)] = this.patch.species;
    }
  }
};

// src/world/profiles.ts
var WORLD_PROFILES = {
  principal: {
    id: "principal",
    name: "Orvalis",
    terrain: { kind: "procedural" },
    bounds: null,
    character: "heroine",
    // Paredes e porta de parede (W5): no Mundo desde a v0.93.56 (na grade fina: frente empilhada, `render/sanctuaryWallArt.ts`).
    blocks: [...HOTBAR_BLOCKS, ...WALL_BLOCKS, ...WALL_DOOR_BLOCKS],
    tools: true,
    farming: true,
    sheep: true,
    wolves: true,
    dungeon: true,
    town: true,
    collectBlocks: true,
    minimap: true,
    hunger: true,
    sky: ["#1b1838", "#1b1838"]
  },
  santuario: {
    id: "santuario",
    name: "Santu\xE1rio Celestial da Deusa da Vida",
    terrain: { kind: "flat", ground: Block.CLOUD_SOLID },
    // 10 chunks: 5 × 2 (80 × 32 blocos), centrados na origem.
    bounds: { cx0: -3, cy0: -1, cx1: 1, cy1: 0 },
    character: "goddess",
    // Laboratório de oito materiais do cubo (lista única e na ordem aprovada pelo usuário).
    // O piso Nuvem Sólida permanece como suporte do cenário, mas NÃO é selecionável na hotbar.
    blocks: [
      Block.DIRT,
      Block.TILLED,
      Block.GRASS,
      Block.WATER_PURE,
      Block.OAK_LOG,
      Block.OAK_PLANKS,
      Block.STONE,
      Block.STONE_SMOOTH
    ],
    tools: false,
    farming: false,
    sheep: false,
    wolves: false,
    dungeon: false,
    town: false,
    collectBlocks: false,
    minimap: false,
    hunger: false,
    sky: ["#8fb8ff", "#f6d9ff"]
  }
};

// src/world/village.ts
var VILLAGE_W = 48;
var VILLAGE_H = 48;
var VILLAGE_X0 = -24;
var VILLAGE_Y0 = TOWN_SOUTH_FIELD + 16;
var VILLAGE_MARGIN = 8;
var VILLAGE_CLEAR = 6;
var VILLAGE_SIZES = {
  [Block.V_HOUSE_STRAW]: [8, 4],
  [Block.V_HOUSE_TILE]: [8, 4],
  [Block.V_BARN]: [13, 5],
  [Block.V_COOP]: [4, 3],
  [Block.V_WELL]: [4, 3],
  [Block.V_BENCH]: [2, 1],
  [Block.V_BED_WHEAT]: [6, 7],
  [Block.V_BED_VEG]: [6, 6],
  [Block.V_OAK]: [1, 1],
  [Block.V_TREE]: [1, 1],
  [Block.V_STAKE]: [1, 1],
  [Block.V_GATE]: [5, 1],
  [Block.V_BARREL]: [1, 1],
  [Block.V_ROCKS]: [3, 1],
  [Block.V_BUSH]: [3, 1],
  [Block.V_LOGS]: [2, 1],
  [Block.V_HAY]: [2, 1],
  [Block.V_CART]: [3, 2],
  [Block.V_SACKS]: [2, 1],
  [Block.V_FLOWERS]: [2, 1],
  [Block.V_GATE_CLOSED]: [5, 1],
  [Block.V_GATE_GAP]: [1, 1],
  [Block.V_GATE_GAP_CLOSED]: [1, 1]
};
var cached2;
function villageLayout() {
  if (cached2 === void 0) cached2 = SUBDIV === 2 ? buildVillage() : null;
  return cached2;
}
function buildVillage() {
  const W = VILLAGE_W, H = VILLAGE_H;
  const ground2 = new Uint8Array(W * H).fill(Block.GRASS);
  const objects = new Uint8Array(W * H);
  const props = [];
  const idx = (x, y) => y * W + x;
  const inside = (x, y) => x >= 0 && y >= 0 && x < W && y < H;
  const at = (lx, ly) => ({ x: lx + VILLAGE_X0, y: ly + VILLAGE_Y0 });
  const free = (x, y) => inside(x, y) && objects[idx(x, y)] === Block.AIR && ground2[idx(x, y)] !== Block.PATH;
  const path = (x0, y0, x1, y1) => {
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if (inside(x, y)) ground2[idx(x, y)] = Block.PATH;
  };
  path(22, 11, 25, 47);
  for (let y = 19; y <= 31; y++) for (let x = 17; x <= 31; x++) if ((x - 24) ** 2 + ((y - 25) * 1.1) ** 2 <= 36) path(x, y, x, y);
  path(13, 18, 22, 19);
  path(25, 19, 34, 20);
  path(11, 28, 21, 29);
  path(26, 28, 36, 29);
  path(15, 38, 21, 39);
  path(26, 38, 33, 39);
  const put = (id, x, y, cells, force = false) => {
    const [w, d] = VILLAGE_SIZES[id];
    const lot = cells ?? [];
    if (!cells) for (let dy = 0; dy < d; dy++) for (let dx = 0; dx < w; dx++) lot.push([x + dx, y - dy]);
    const solid = id !== Block.V_FLOWERS;
    const body = solid ? lot : [[x, y]];
    if (!force && body.some(([cx, cy]) => !free(cx, cy))) return false;
    for (const [cx, cy] of body) if (inside(cx, cy)) objects[idx(cx, cy)] = Block.TOWN_PART;
    objects[idx(x, y)] = id;
    props.push({ id, ...at(x, y) });
    return true;
  };
  const must = (id, x, y, cells) => put(id, x, y, cells, true);
  const stake = (x, y) => {
    objects[idx(x, y)] = Block.V_STAKE;
  };
  for (let x = 1; x <= 46; x++) {
    stake(x, 4);
    if (x < 22 || x > 26) stake(x, 43);
  }
  for (let y = 5; y <= 42; y++) {
    stake(1, y);
    stake(46, y);
  }
  must(Block.V_GATE, 22, 43, [[22, 43], [26, 43]]);
  for (let x = 23; x <= 25; x++) objects[idx(x, 43)] = Block.V_GATE_GAP;
  must(Block.V_BARN, 18, 10);
  must(Block.V_COOP, 40, 8);
  must(Block.V_BED_WHEAT, 3, 17);
  must(Block.V_BED_VEG, 39, 22);
  must(Block.V_WELL, 22, 27);
  for (const [id, x, y] of [
    [Block.V_HOUSE_STRAW, 9, 17],
    [Block.V_HOUSE_TILE, 30, 18],
    [Block.V_HOUSE_TILE, 7, 27],
    [Block.V_HOUSE_STRAW, 32, 27],
    [Block.V_HOUSE_STRAW, 11, 37],
    [Block.V_HOUSE_TILE, 29, 37]
  ]) must(id, x, y);
  for (const [x, y] of [[7, 9], [27, 20], [6, 36], [42, 38]]) must(Block.V_OAK, x, y);
  for (const [x, y] of [[5, 22], [43, 28]]) must(Block.V_TREE, x, y);
  for (const [x, y] of [[22, 20], [18, 24], [28, 23], [19, 30], [27, 30]]) put(Block.V_BENCH, x, y);
  for (const [x, y] of [[15, 9], [16, 7]]) put(Block.V_HAY, x, y);
  for (const [x, y] of [[17, 10], [28, 11], [19, 22], [10, 36], [26, 36]]) put(Block.V_BARREL, x, y);
  put(Block.V_CART, 29, 12);
  for (const [x, y] of [[5, 27], [27, 36]]) put(Block.V_LOGS, x, y);
  for (const [x, y] of [[39, 28], [17, 18], [34, 31]]) put(Block.V_SACKS, x, y);
  for (const [x, y] of [[33, 7], [40, 15], [4, 38], [38, 39], [15, 46], [37, 46]]) put(Block.V_ROCKS, x, y);
  for (const [x, y] of [[18, 22], [43, 14], [13, 5], [19, 16], [37, 32], [4, 46], [30, 46], [34, 22], [13, 33]]) put(Block.V_BUSH, x, y);
  for (let ly = 5; ly <= 47; ly++) {
    for (let lx = 0; lx < W; lx++) {
      if (hash2(465566, lx * 7 + 1, ly * 13 + 5) < 0.026 && free(lx, ly)) put(Block.V_FLOWERS, lx, ly);
    }
  }
  const area = { x0: VILLAGE_X0, y0: VILLAGE_Y0, x1: VILLAGE_X0 + W - 1, y1: VILLAGE_Y0 + H - 1 };
  const gx = VILLAGE_X0 + 22;
  const trailTop = VILLAGE_Y0 - 44;
  const trail = [
    { x0: gx, y0: trailTop, x1: gx + 3, y1: VILLAGE_Y0 - 3 },
    { x0: VILLAGE_X0 - 3, y0: VILLAGE_Y0 - 4, x1: gx + 3, y1: VILLAGE_Y0 - 3 },
    { x0: VILLAGE_X0 - 3, y0: VILLAGE_Y0 - 4, x1: VILLAGE_X0 - 2, y1: VILLAGE_Y0 + 49 },
    { x0: VILLAGE_X0 - 3, y0: VILLAGE_Y0 + 48, x1: gx + 3, y1: VILLAGE_Y0 + 49 },
    { x0: gx, y0: VILLAGE_Y0 + 44, x1: gx + 3, y1: VILLAGE_Y0 + 49 }
  ];
  const touched = { x0: area.x0 - VILLAGE_MARGIN, y0: trailTop, x1: area.x1 + VILLAGE_MARGIN, y1: area.y1 + VILLAGE_MARGIN };
  return { w: W, h: H, area, gate: { x0: VILLAGE_X0 + 23, y0: VILLAGE_Y0 + 43, x1: VILLAGE_X0 + 25, y1: VILLAGE_Y0 + 43 }, trail, touched, ground: ground2, objects, props };
}
var VillageTerrain = class {
  constructor(base, layout) {
    this.base = base;
    this.layout = layout;
  }
  base;
  layout;
  get seed() {
    return this.base.seed;
  }
  onTrail(x, y) {
    return this.layout.trail.some((r) => inRect(r, x, y));
  }
  surround(x, y, c) {
    const a = this.layout.area;
    if (this.onTrail(x, y)) return { ground: Block.PATH, object: Block.AIR, upper: Block.AIR };
    const d = Math.max(a.x0 - x, x - a.x1, a.y0 - y, y - a.y1);
    if (d > VILLAGE_MARGIN) return c;
    const g = blockDef(c.ground);
    const ground2 = g.liquid || c.ground === Block.HOLE ? Block.GRASS : c.ground;
    if (isWaterPlant(c.object)) return { ground: ground2, object: Block.AIR, upper: c.upper };
    if (d <= VILLAGE_CLEAR) return { ground: ground2, object: Block.AIR, upper: Block.AIR };
    return { ground: ground2, object: c.object, upper: c.upper };
  }
  cellAt(x, y) {
    const l = this.layout;
    if (inRect(l.area, x, y)) {
      const i = (y - l.area.y0) * l.w + (x - l.area.x0);
      return { ground: l.ground[i], object: l.objects[i], upper: Block.AIR };
    }
    const c = this.base.cellAt(x, y);
    return inRect(l.touched, x, y) ? this.surround(x, y, c) : c;
  }
  groundAt(x, y) {
    return this.cellAt(x, y).ground;
  }
  objectAt(x, y) {
    return this.cellAt(x, y).object;
  }
  upperAt(x, y) {
    return this.cellAt(x, y).upper;
  }
  biomeAt(x, y) {
    return this.base.biomeAt(x, y);
  }
  generateChunk(cx, cy, ground2, objects, upper) {
    this.base.generateChunk(cx, cy, ground2, objects, upper);
    const t = this.layout.touched;
    const S = Math.round(Math.sqrt(ground2.length));
    const x0 = cx * S, y0 = cy * S;
    if (x0 > t.x1 || x0 + S - 1 < t.x0 || y0 > t.y1 || y0 + S - 1 < t.y0) return;
    for (let ly = 0; ly < S; ly++) {
      for (let lx = 0; lx < S; lx++) {
        const x = x0 + lx, y = y0 + ly;
        if (!inRect(t, x, y)) continue;
        const i = ly * S + lx;
        const c = inRect(this.layout.area, x, y) ? this.cellAt(x, y) : this.surround(x, y, { ground: ground2[i], object: objects[i], upper: upper[i] });
        ground2[i] = c.ground;
        objects[i] = c.object;
        upper[i] = c.upper;
      }
    }
  }
};

// src/world/world.ts
var WHEAT_STAGE_SECONDS = 6;
var CROP_STAGE_SECONDS = { wheat: WHEAT_STAGE_SECONDS, potato: 8, carrot: 8, tomato: 10 };
var FRUIT_REGROW_SECONDS = 150;
var PLANTABLE_GROUND = Block.TILLED;
var TILLABLE = /* @__PURE__ */ new Set([Block.DIRT, Block.GRASS]);
var FLATTENABLE = /* @__PURE__ */ new Set([Block.DIRT, Block.GRASS, Block.TILLED]);
function tentCells(x, y) {
  return [[x, y], [x + 1, y], [x, y - 1], [x + 1, y - 1]];
}
var CHEST_SLOTS = 27;
var REPLACES_WATER = /* @__PURE__ */ new Set([Block.DIRT, Block.GRASS, Block.TILLED, Block.PATH, Block.STONE, Block.OAK_LOG, Block.OAK_PLANKS, Block.CHERRY_LOG, Block.CHERRY_PLANKS, Block.BIRCH_LOG, Block.BIRCH_PLANKS]);
var FLOW_SECONDS = 0.6;
var FLOW_DIRS = [["west", -1, 0], ["east", 1, 0], ["north", 0, -1], ["south", 0, 1]];
function numKey(cx, cy) {
  return cx * 2097152 + cy;
}
var World = class {
  generator;
  profile;
  /** Profundidade de pilha específica do perfil: Mundo 2, Santuário 5. */
  /** Níveis de pilha por célula: 4 blocos de 1/4 no Mundo (ADR 0033) e 5 cubos cheios no Santuário. */
  maxStack;
  /**
   * Quantos níveis valem 1 célula de altura (o cubo antigo): 4 no Mundo (cada bloco tem 1/4 de célula), 1 no Santuário. É a escala entre o
   * apoio lógico `z`/`standHeight` (em níveis) e o visual (`visualZ`, em células).
   */
  cubeLevels;
  /** Limites em células (inclusivos) quando o perfil limita o mundo. */
  cellBounds;
  /** Chunks por chave numérica (`numKey`): evita criar strings a cada leitura de célula. */
  chunks = /* @__PURE__ */ new Map();
  /** Último chunk acessado (leituras vizinhas costumam cair no mesmo). */
  last = null;
  /** Células com trigo plantado (crescem com o tempo). Só existem em chunks modificados, que não descarregam. */
  crops = /* @__PURE__ */ new Set();
  /** Árvores plantadas crescendo e macieiras colhidas (avançam em `tick`). */
  trees = /* @__PURE__ */ new Set();
  /**
   * Covil deste mundo (perfil com `dungeon`), ou null: labirinto isolado do mapa (ADR 0019), protegido; só se luta lá
   * dentro. No mundo fica só a entrada, a caverna (`cave`).
   */
  dungeon = null;
  /** Entrada do covil no mundo (a pelo menos 10 chunks do castelo), ou null. */
  cave = null;
  /** Cidade do Despertar (perfil com `town`), ou null. Área protegida; início e renascer sem tenda. */
  town = null;
  /** Vila Camponesa (ao sul da cidade, só na grade fina; `domains/village.md`), ou null. Área protegida. */
  village = null;
  /** Camps with seven goblins around the existing Campfire block (seed based). */
  goblinCamps = [];
  /** Bandos de três homens-lagarto na margem dos rios (seed based, v0.93.60). */
  lizardPacks = [];
  /** Interiores das construções da cidade (ADR 0014): cômodos isolados e protegidos. Vazio sem cidade. */
  interiors = [];
  /** Buracos enchendo de água (estado de execução; ao carregar, `settleWater` reagenda). */
  flows = /* @__PURE__ */ new Map();
  /**
   * Chão quebrado sem bloco: buraco ("x,y" → segundos que está assim). Quando faz um dia inteiro (`DAY_LENGTH_S`) o buraco
   * ganha um chão igual ao de um vizinho (dono do produto, 2026-11-08). Ao carregar, as idades voltam do salvamento
   * (`loadHoleAges`); buraco sem idade guardada começa a contar do zero.
   */
  holeAge = /* @__PURE__ */ new Map();
  /** Canteiro de flores da missão do Silvano (null fora do Mundo da Cidade). */
  flowerPatch = null;
  /** Spawn calculado no terreno base (a dungeon é posta longe dele e não o altera). */
  spawn = null;
  constructor(seed, profile = WORLD_PROFILES.principal) {
    this.profile = profile;
    this.maxStack = profile.id === "santuario" ? SANCTUARY_MAX_STACK : MAX_STACK;
    this.cubeLevels = profile.id === "santuario" ? 1 : CUBE_LEVELS;
    this.generator = profile.id === "santuario" && profile.bounds ? new SanctuarySeedGenerator(seed, profile.bounds) : profile.terrain.kind === "flat" ? new FlatGenerator(seed, profile.terrain.ground) : new WorldGenerator(seed);
    const baseTerrain = this.generator;
    const b = profile.bounds;
    this.cellBounds = b ? { x0: b.cx0 * CHUNK_SIZE, y0: b.cy0 * CHUNK_SIZE, x1: (b.cx1 + 1) * CHUNK_SIZE - 1, y1: (b.cy1 + 1) * CHUNK_SIZE - 1 } : null;
    if (profile.town) {
      this.town = townLayout();
      this.generator = new TownTerrain(this.generator, this.town);
      this.spawn = this.town.start;
      const village = villageLayout();
      if (village) {
        this.village = village;
        this.generator = new VillageTerrain(this.generator, village);
      }
    }
    if (profile.dungeon) {
      const base = this.generator;
      const spawn = this.spawn = this.findSpawn();
      const keep = this.town ? grow(this.town.area, TOWN_MARGIN + 4) : null;
      if (keep) keep.y1 = this.town.area.y1 + TOWN_SOUTH_FIELD;
      if (keep && this.village) {
        const t = this.village.touched;
        keep.x0 = Math.min(keep.x0, t.x0);
        keep.x1 = Math.max(keep.x1, t.x1);
        keep.y1 = Math.max(keep.y1, t.y1);
      }
      const castle = this.town?.buildings.find((b2) => b2.id === Block.CASTLE);
      const center = castle ? [castle.x + castle.w / 2, castle.y - castle.d / 2] : spawn;
      this.dungeon = isolatedDungeon(seed);
      this.cave = planCave(base, center, keep);
      this.generator = new DungeonTerrain(base, this.dungeon, this.cave);
    }
    if (this.town) this.interiors = interiorLayouts(this.town);
    if (this.profile.blocks.includes(Block.TENT)) this.interiors = [...this.interiors, tentLayout()];
    if (this.interiors.length) this.generator = new InteriorTerrain(this.generator, this.interiors);
    this.goblinCamps.push(...planGoblinCamps(this));
    if (this.goblinCamps.length) this.generator = new GoblinCampTerrain(this.generator, this.goblinCamps);
    if (this.town && profile.dungeon) {
      const avoid = [grow(this.town.area, TOWN_MARGIN + 6)];
      if (this.village) avoid.push(grow(this.village.touched, 6));
      if (this.cave) avoid.push(grow(this.cave.guard, 6));
      if (this.dungeon) avoid.push(grow(dungeonGuard(this.dungeon), 6));
      for (const c of this.goblinCamps) avoid.push(grow({ x0: c.x, y0: c.y, x1: c.x, y1: c.y }, 10 * SUBDIV));
      this.flowerPatch = planFlowerPatch(seed, this.generator, this.outsideGate(), avoid);
      if (this.flowerPatch) this.generator = new FlowerPatchTerrain(this.generator, this.flowerPatch);
    }
    if (baseTerrain instanceof WorldGenerator) this.lizardPacks.push(...planLizardPacks(this, (x, y) => baseTerrain.riverAt(x, y), this.goblinCamps));
  }
  /**
   * Célula dentro da dungeon, da cidade (muralhas incluídas) ou de um interior — ou num chunk que tem pedaço da muralha
   * da cidade (regra do dono do produto, 2026-11-08: não se constrói no chunk do muro, mesmo fora dos limites da
   * cidade)? Lá nada é quebrado, colocado, arado nem plantado.
   */
  isProtected(x, y) {
    return this.inGuardedArea(x, y) || !!this.town && this.inWallChunk(this.town.area, x, y);
  }
  /**
   * Áreas fixas do mapa (dungeon, covil, cidade, interiores): voltam sempre do gerador ao carregar. A regra do chunk do
   * muro NÃO entra aqui: o que já foi construído fora da cidade, nesses chunks, continua lá (só não se constrói mais).
   */
  inGuardedArea(x, y) {
    return !!this.dungeon && inRect(dungeonGuard(this.dungeon), x, y) || !!this.cave && inRect(this.cave.guard, x, y) || !!this.town && inRect(this.town.area, x, y) || !!this.village && inRect(this.village.area, x, y) || this.interiors.some((l) => inRect(l.guard, x, y));
  }
  /** O chunk da célula contém alguma célula da muralha (o anel de `TOWN_WALL` na borda da área da cidade)? */
  inWallChunk(area, x, y) {
    const x0 = Math.floor(x / CHUNK_SIZE) * CHUNK_SIZE;
    const y0 = Math.floor(y / CHUNK_SIZE) * CHUNK_SIZE;
    const x1 = x0 + CHUNK_SIZE - 1;
    const y1 = y0 + CHUNK_SIZE - 1;
    if (x1 < area.x0 || x0 > area.x1 || y1 < area.y0 || y0 > area.y1) return false;
    const inside = x0 >= area.x0 + TOWN_WALL && x1 <= area.x1 - TOWN_WALL && y0 >= area.y0 + TOWN_WALL && y1 <= area.y1 - TOWN_WALL;
    return !inside;
  }
  /** Interior (cômodo) que contém a célula, ou null. */
  interiorAt(x, y) {
    return this.interiors.find((l) => inRect(l.area, x, y)) ?? null;
  }
  /** Porta (e cômodo) cuja entrada fica diante desta célula da rua (andar para cima nela = entrar), ou null. */
  interiorDoorAt(x, y) {
    for (const room of this.interiors) {
      for (const door of room.doors) {
        if (door.outside && y === door.outside[1] && x >= door.outside[0] && x < door.outside[0] + SUBDIV) return { room, door };
      }
    }
    return null;
  }
  /** Interior cuja porta fica diante desta célula da rua, ou null. */
  interiorEntrance(x, y) {
    return this.interiorDoorAt(x, y)?.room ?? null;
  }
  /** Cômodo da tenda (mundos com tenda), ou null. */
  get tentRoom() {
    return this.interiors.find((l) => l.def.id === "tent") ?? null;
  }
  /**
   * Diante da frente de uma tenda (a célula logo abaixo de uma das duas da fileira de baixo)? Devolve o canto da tenda
   * (andar para cima aqui = entrar nela), ou null.
   */
  tentDoorAt(x, y) {
    if (!this.tentRoom) return null;
    const a = this.tentAnchor(x, y - 1);
    return a && a[1] === y - 1 ? a : null;
  }
  /** Diante da boca da caverna (andar para cima aqui = entrar no covil)? */
  isCaveDoor(x, y) {
    return !!this.cave && y === this.cave.outside[1] && x >= this.cave.outside[0] && x < this.cave.outside[0] + SUBDIV;
  }
  /** Dentro do covil (labirinto), sem o anel em volta? */
  inDungeon(x, y) {
    return !!this.dungeon && inRect(this.dungeon.area, x, y);
  }
  /** Pisar nesta célula sai do covil (anel externo do vão da entrada)? */
  isDungeonExit(x, y) {
    return !!this.dungeon && isDungeonExit(this.dungeon, x, y);
  }
  /** Onde se chega ao entrar no covil (logo para dentro do vão), ou null sem covil. */
  dungeonEntry() {
    return this.dungeon ? dungeonEntry(this.dungeon) : null;
  }
  /** Construção (ou placa) da cidade que ocupa a célula, ou null. */
  townBuildingAt(x, y) {
    const t = this.town;
    if (!t || !inRect(t.area, x, y)) return null;
    const k = t.buildingAt[(y - t.area.y0) * t.w + (x - t.area.x0)];
    return k >= 0 ? t.buildings[k] : null;
  }
  /** Do lado de fora do portão da cidade (na estrada); sem cidade, o início. */
  outsideGate() {
    if (!this.town) return this.findSpawn();
    let [x, y] = this.town.doorstep;
    while (this.isProtected(x, y)) y++;
    return [x, y];
  }
  /** A célula está dentro dos limites do mundo? (sempre true em mundo ilimitado) */
  inBounds(x, y) {
    const b = this.cellBounds;
    return !b || x >= b.x0 && x <= b.x1 && y >= b.y0 && y <= b.y1;
  }
  /** Retângulo de chunks recortado aos limites do mundo (null se não sobra nada). */
  clampRect(rect) {
    const b = this.profile.bounds;
    if (!b) return rect;
    const r = { cx0: Math.max(rect.cx0, b.cx0), cy0: Math.max(rect.cy0, b.cy0), cx1: Math.min(rect.cx1, b.cx1), cy1: Math.min(rect.cy1, b.cy1) };
    return r.cx0 > r.cx1 || r.cy0 > r.cy1 ? null : r;
  }
  get seed() {
    return this.generator.seed;
  }
  get loadedCount() {
    return this.chunks.size;
  }
  getChunk(cx, cy) {
    const l = this.last;
    if (l && l.cx === cx && l.cy === cy) return l;
    const c = this.chunks.get(numKey(cx, cy));
    if (c) this.last = c;
    return c;
  }
  /** Chunk que contém a célula (x, y), se carregado. */
  chunkAt(x, y) {
    return this.getChunk(toChunk(x), toChunk(y));
  }
  /** Retorna o chunk, gerando-o de forma síncrona se necessário. */
  loadChunk(cx, cy) {
    const key = numKey(cx, cy);
    let chunk = this.chunks.get(key);
    if (!chunk) {
      chunk = new Chunk(cx, cy, this.maxStack);
      this.generator.generateChunk(cx, cy, chunk.ground, chunk.objects, chunk.upper);
      if (this.generator instanceof SanctuarySeedGenerator)
        this.generator.fillHighLevels(cx, cy, chunk.levels);
      else if (this.cubeLevels > 1) this.expandQuarters(chunk);
      this.chunks.set(key, chunk);
    }
    return chunk;
  }
  /**
   * Terreno gerado → blocos de 1/4 (ADR 0033): onde o gerador pôs um cubo de construção (pedra da montanha, tijolo da muralha), a
   * célula vira 4 blocos empilhados (`quarterLevel`), com a mesma altura de antes.
   */
  expandQuarters(chunk) {
    const n = chunk.ground.length;
    for (let i = 0; i < n; i++) {
      const obj = chunk.levels[0][i];
      if (!isStackBlock(obj)) continue;
      const up = chunk.levels[1][i];
      for (let l = 1; l < chunk.levels.length; l++) chunk.levels[l][i] = quarterLevel(obj, up, l);
    }
  }
  /** Chão da célula. Fora de chunk carregado consulta o gerador (puro); fora dos limites, céu. */
  getGround(x, y) {
    if (!this.inBounds(x, y)) return Block.VOID;
    const chunk = this.chunkAt(x, y);
    return chunk ? chunk.getGround(toLocal(x), toLocal(y)) : this.generator.groundAt(x, y);
  }
  /** Objeto do nível 0 (chunk carregado ou gerador). */
  getObject(x, y) {
    if (!this.inBounds(x, y)) return Block.AIR;
    const chunk = this.chunkAt(x, y);
    return chunk ? chunk.getObject(toLocal(x), toLocal(y)) : this.generator.objectAt(x, y);
  }
  /** Nível superior (1). */
  getUpper(x, y) {
    return this.getLevel(x, y, 1);
  }
  /** Bloco de um nível da pilha (0 = objeto no chão). O gerador só preenche os níveis 0 e 1. */
  getLevel(x, y, level) {
    if (!Number.isInteger(level) || level < 0 || level >= this.maxStack) return Block.AIR;
    if (level === 0) return this.getObject(x, y);
    if (!this.inBounds(x, y)) return Block.AIR;
    const chunk = this.chunkAt(x, y);
    if (chunk) return chunk.getLevel(toLocal(x), toLocal(y), level);
    if (this.generator instanceof SanctuarySeedGenerator) return this.generator.levelAt(x, y, level);
    if (this.cubeLevels > 1) return quarterLevel(this.generator.objectAt(x, y), this.generator.upperAt(x, y), level);
    return level === 1 ? this.generator.upperAt(x, y) : Block.AIR;
  }
  /** Bloco visível no topo da célula e seu nível (null se vazia). */
  topBlock(x, y) {
    for (let level = this.maxStack - 1; level >= 0; level--) {
      const id = this.getLevel(x, y, level);
      if (id !== Block.AIR) return { id, level };
    }
    return null;
  }
  /**
   * Altura da pilha da célula em níveis (0..`maxStack`): no Mundo, quantos blocos de 1/4 há empilhados (4 = 1 célula cheia); no
   * Santuário, quantos cubos. O cacto (planta que o gerador põe como "cubo") não é bloco de construção: conta como célula cheia.
   */
  stackHeight(x, y) {
    const base = this.getObject(x, y);
    if (blockDef(base).shape !== "cube") return 0;
    if (!isStackBlock(base)) return this.cubeLevels;
    let n = 1;
    while (n < this.maxStack && this.getLevel(x, y, n) !== Block.AIR) n++;
    return n;
  }
  /**
   * Quantos níveis um corpo com `stepHeight` (em cubos cheios, como na `WalkerSpec`) sobe de uma vez. No Mundo um cubo cheio são 4
   * blocos de 1/4 e **a pilha de 4 bloqueia**: quem sobe 1 cubo sobe no máximo 3 blocos (piso e degraus, nunca a célula cheia).
   */
  stepLevels(stepHeight) {
    return this.cubeLevels === 1 ? stepHeight : Math.round(stepHeight * (this.cubeLevels - 1));
  }
  /**
   * Altura em que se fica de pé na célula, ou null se não dá para ficar
   * (água, árvore, cacto, porta fechada). Cubos são superfícies: altura = nº de cubos.
   * Porta aberta é passável no nível do chão.
   */
  standHeight(x, y) {
    if (!this.isGroundStandable(x, y)) return null;
    const base = blockDef(this.getObject(x, y));
    if (base.shape === "cube") return this.stackHeight(x, y);
    return base.solid ? null : 0;
  }
  /** Mantido para o objeto do nível 0 (testes/ferramentas). */
  setObject(x, y, id) {
    this.setLevel(x, y, 0, id);
  }
  setLevel(x, y, level, id) {
    const cx = toChunk(x);
    const cy = toChunk(y);
    const lx = toLocal(x);
    const ly = toLocal(y);
    const chunk = this.loadChunk(cx, cy);
    if (isRemovedBlock(id)) id = Block.AIR;
    id = adultOfStage(id);
    if (level === "ground") {
      if (id === Block.HOLE) this.holeAge.set(chunkKey(x, y), 0);
      else this.holeAge.delete(chunkKey(x, y));
      chunk.setGround(lx, ly, id);
    } else chunk.setLevel(lx, ly, level, id);
    if (level === 0) {
      if (isCrop(id)) this.crops.add(chunkKey(x, y));
      else this.crops.delete(chunkKey(x, y));
      if (isGrowingTree(id)) this.trees.add(chunkKey(x, y));
      else this.trees.delete(chunkKey(x, y));
    }
    if (lx === 0) this.touch(cx - 1, cy);
    if (lx === CHUNK_SIZE - 1) this.touch(cx + 1, cy);
    if (ly === 0) this.touch(cx, cy - 1);
    if (ly === CHUNK_SIZE - 1) this.touch(cx, cy + 1);
    const dx = lx === 0 ? -1 : lx === CHUNK_SIZE - 1 ? 1 : 0;
    const dy = ly === 0 ? -1 : ly === CHUNK_SIZE - 1 ? 1 : 0;
    if (dx !== 0 && dy !== 0) this.touch(cx + dx, cy + dy);
  }
  touch(cx, cy) {
    const c = this.getChunk(cx, cy);
    if (c) c.version++;
  }
  biomeAt(x, y) {
    return this.generator.biomeAt(x, y);
  }
  /**
   * O chão aguenta personagens/animais? Falso para água e buraco. Um cubo
   * colocado num buraco vira piso e volta a ser pisável.
   */
  isGroundStandable(x, y) {
    const g = blockDef(this.getGround(x, y));
    return g.layer === "object" ? g.shape === "cube" : g.standable;
  }
  /** Célula livre no nível do chão (sem cubos, água ou árvore)? */
  isWalkable(x, y) {
    return this.standHeight(x, y) === 0;
  }
  // ---- Regras de interação (domínio) ----
  /**
   * O que um golpe na célula quebraria: o objeto do topo ou, com a célula vazia,
   * o próprio chão (que vira buraco). null se nada pode ser quebrado.
   */
  breakTarget(x, y) {
    if (this.isProtected(x, y)) return null;
    const top = this.topBlock(x, y);
    if (top) return blockDef(top.id).breakable ? "object" : null;
    return blockDef(this.getGround(x, y)).breakable ? "ground" : null;
  }
  canBreak(x, y) {
    return this.breakTarget(x, y) !== null;
  }
  /** Bloco que um golpe de quebra atingiria (topo do objeto ou o chão), ou null. */
  breakTargetId(x, y) {
    const t = this.breakTarget(x, y);
    if (t === "object") {
      const id = this.topBlock(x, y).id;
      return id === Block.TENT_PART ? Block.TENT : id;
    }
    if (t === "ground") return this.getGround(x, y);
    return null;
  }
  /** Quebra o topo da célula (empilhado → objeto → chão). Retorna o id removido ou null. */
  breakBlock(x, y) {
    const target = this.breakTarget(x, y);
    if (target === "object") {
      const top = this.topBlock(x, y);
      if (top.id === Block.CHEST) this.chests.delete(chunkKey(x, y));
      if (top.id === Block.TENT || top.id === Block.TENT_PART) {
        const a = this.tentAnchor(x, y);
        if (a && this.tent && a[0] === this.tent[0] && a[1] === this.tent[1]) this.tent = null;
        if (a) for (const [cx, cy] of tentCells(a[0], a[1])) this.setLevel(cx, cy, 0, Block.AIR);
        else this.setLevel(x, y, 0, Block.AIR);
        return Block.TENT;
      }
      this.setLevel(x, y, top.level, Block.AIR);
      return top.id;
    }
    if (target === "ground") {
      const id = this.getGround(x, y);
      this.setLevel(x, y, "ground", Block.HOLE);
      this.scheduleFlow(x, y);
      return id;
    }
    return null;
  }
  /**
   * Onde o bloco seria colocado, ou null se não pode.
   * 'ground': preenche um buraco — só cubos, que viram piso nivelado.
   * Nível 0: chão firme, célula vazia ou com enfeite (substituído).
   * Níveis 1..MAX_STACK-1: cubo sobre cubo. Enfeites, árvores e portas só no chão; nada empilha sobre porta.
   */
  placementLevel(x, y, id) {
    const def = blockDef(id);
    if (!def.placeable || def.layer !== "object") return null;
    if (!this.profile.blocks.includes(id) || this.isProtected(x, y)) return null;
    if (this.getGround(x, y) === Block.HOLE) return def.shape === "cube" ? "ground" : null;
    if (this.getGround(x, y) === Block.WATER) return REPLACES_WATER.has(id) ? "ground" : null;
    if (!this.isGroundStandable(x, y)) return null;
    const base = blockDef(this.getObject(x, y));
    if (base.id === Block.AIR || base.shape === "decoration") {
      if (def.shape === "door" && !this.hasDoorFrame(x, y)) return null;
      if (def.shape === "wall-door" && !this.canPlaceWallDoor(x, y)) return null;
      if (id === Block.TENT && !tentCells(x, y).every(([cx, cy]) => this.isFootprintFree(cx, cy))) return null;
      return 0;
    }
    if (def.shape === "cube" && base.shape === "cube") {
      const h = this.stackHeight(x, y);
      return h < this.maxStack ? h : null;
    }
    return null;
  }
  // ---- Água ----
  /**
   * Agenda o enchimento de um buraco vizinho de água (ou de outro buraco já enchendo não conta: só água pronta).
   * O lado de onde a água vem segue uma ordem fixa (oeste, leste, norte, sul) — determinístico.
   */
  scheduleFlow(x, y) {
    if (this.getGround(x, y) !== Block.HOLE || this.flows.has(chunkKey(x, y))) return;
    for (const [from, dx, dy] of FLOW_DIRS) {
      if (this.getGround(x + dx, y + dy) === Block.WATER) {
        this.flows.set(chunkKey(x, y), { x, y, from, t: 0 });
        return;
      }
    }
  }
  /** Avança o enchimento: buraco cheio vira água e passa a encher os buracos vizinhos (em cadeia). */
  tickWater(dt) {
    if (!this.flows.size) return;
    const done = [];
    for (const [key, f] of this.flows) {
      if (this.getGround(f.x, f.y) !== Block.HOLE) {
        this.flows.delete(key);
        continue;
      }
      f.t += dt / FLOW_SECONDS;
      if (f.t >= 1) done.push(f);
    }
    for (const f of done) {
      this.flows.delete(chunkKey(f.x, f.y));
      this.setLevel(f.x, f.y, "ground", Block.WATER);
      for (const [, dx, dy] of FLOW_DIRS) this.scheduleFlow(f.x + dx, f.y + dy);
    }
  }
  /** Células enchendo agora (para a animação do render). */
  waterFlows() {
    return this.flows.values();
  }
  /** Reagenda buracos vizinhos de água nos chunks editados (depois de carregar um salvamento). */
  settleWater() {
    for (const c of this.chunks.values()) {
      if (!c.modified) continue;
      for (let ly = 0; ly < CHUNK_SIZE; ly++) {
        for (let lx = 0; lx < CHUNK_SIZE; lx++) {
          if (c.getGround(lx, ly) === Block.HOLE) this.scheduleFlow(c.cx * CHUNK_SIZE + lx, c.cy * CHUNK_SIZE + ly);
        }
      }
    }
  }
  // ---- Portas ----
  /**
   * Batente da porta: qualquer bloco (cubo) de madeira ou de pedra no nível 0 (dono do produto, 07/11: a porta vai entre
   * quaisquer blocos de madeira ou pedra).
   */
  isDoorJamb(x, y) {
    const d = blockDef(this.getObject(x, y));
    return d.shape === "cube" && (d.organic === "wood" || d.stone);
  }
  // ---- Assentos ----
  /**
   * Assento em (x, y) para quem está em (px, py): a cadeira, ou a célula do banco da cidade mais perto de quem senta.
   * Retorna a célula onde se senta, ou null se ali não há assento.
   */
  seatAt(x, y, px, py) {
    const b = this.townBuildingAt(x, y);
    if (b) return blockDef(b.id).seat ? [Math.max(b.x, Math.min(b.x + b.w - 1, Math.floor(px))), b.y] : null;
    void py;
    return blockDef(this.getObject(x, y)).seat ? [x, y] : null;
  }
  /** A porta só vai entre dois batentes (qualquer bloco de madeira — tora ou tábuas, de qualquer árvore — ou de pedra, podem misturar): células da esquerda e da direita. */
  hasDoorFrame(x, y) {
    return this.isDoorJamb(x - 1, y) && this.isDoorJamb(x + 1, y);
  }
  /**
   * Porta de parede (ADR 0027): só dentro de uma fileira leste–oeste, entre duas paredes comuns (não porta) e sem parede ao norte nem ao sul
   * (a frente da porta precisa aparecer e a tampa é a da fileira).
   */
  canPlaceWallDoor(x, y) {
    return isWall(this.getObject(x - 1, y)) && isWall(this.getObject(x + 1, y)) && !this.isWallAt(x, y - 1) && !this.isWallAt(x, y + 1);
  }
  /** Porta ou portão da cerca (abre e fecha com um toque)? */
  isDoor(x, y) {
    return isOpenable(this.getObject(x, y));
  }
  /** Porta ou portão aberto? */
  isDoorOpen(x, y) {
    return isOpen(this.getObject(x, y));
  }
  /**
   * Abre/fecha a porta ou o portão da célula (o id guarda o estado: fechado bloqueia, aberto deixa passar).
   * Quem chama garante que ninguém está na célula ao fechar. Retorna false se não há porta nem portão.
   */
  toggleDoor(x, y) {
    const group = this.gateCells(x, y);
    if (group) {
      const open3 = this.getObject(group[0][0], group[0][1]) === Block.V_GATE;
      for (const [cx, cy] of group) {
        const id = this.getObject(cx, cy);
        if (id === Block.TOWN_PART) continue;
        const next2 = open3 ? id === Block.V_GATE ? Block.V_GATE_CLOSED : Block.V_GATE_GAP_CLOSED : id === Block.V_GATE_CLOSED ? Block.V_GATE : Block.V_GATE_GAP;
        this.setLevel(cx, cy, 0, next2);
      }
      return true;
    }
    const next = toggled(this.getObject(x, y));
    if (next === null) return false;
    this.setLevel(x, y, 0, next);
    return true;
  }
  /** Blocos do portão da vila (2 postes e o vão) a que a célula pertence (poste esquerdo primeiro), ou null se não é um. */
  gateCells(x, y) {
    const id = this.getObject(x, y);
    if (id !== Block.V_GATE && id !== Block.V_GATE_CLOSED && id !== Block.V_GATE_GAP && id !== Block.V_GATE_GAP_CLOSED) return null;
    const v = this.village;
    if (!v) return null;
    const x0 = v.gate.x0 - 1;
    const n = v.gate.x1 - v.gate.x0 + 3;
    if (y !== v.gate.y0 || x < x0 || x > x0 + n - 1) return null;
    return Array.from({ length: n }, (_, i) => [x0 + i, y]);
  }
  canPlace(x, y, id) {
    return this.placementLevel(x, y, id) !== null;
  }
  placeBlock(x, y, id) {
    const level = this.placementLevel(x, y, id);
    if (level === null) return false;
    this.setLevel(x, y, level, id);
    if (level === "ground") this.clearWaterPlantsCovering(x, y);
    if (id === Block.TENT) {
      for (const [cx, cy] of tentCells(x, y).slice(1)) this.setLevel(cx, cy, 0, Block.TENT_PART);
      this.tent = [x, y];
    }
    return true;
  }
  /**
   * Remove as vitórias-régias cujo desenho cobre a célula (x, y): a âncora fica no canto inferior esquerdo e o desenho cresce para a direita
   * (até 4 células) e para cima (até 3). Chamado quando a água da célula vira chão (Terra, Pedra ou Tora sobre a água).
   */
  clearWaterPlantsCovering(x, y) {
    for (let dy = 0; dy < 3; dy++) {
      for (let dx = 0; dx < 4; dx++) {
        const ax = x - dx, ay = y + dy;
        const id = this.getObject(ax, ay);
        if (!isWaterPlant(id)) continue;
        const [w, h] = id === Block.VICTORIA ? [4, 3] : [2, 2];
        if (dx < w && dy < h) this.setLevel(ax, ay, 0, Block.AIR);
      }
    }
  }
  /** A célula tem uma parede (bloco de forma `wall` no nível 0)? */
  isWallAt(x, y) {
    return isWallLike(this.getObject(x, y));
  }
  /** Peça de autotile da parede em (x, y) (ADR 0027), ou null se a célula não é parede. */
  wallPieceAt(x, y) {
    if (!this.isWallAt(x, y)) return null;
    return wallPiece(wallNeighbors((cx, cy) => this.isWallAt(cx, cy), x, y));
  }
  /** Célula livre (vazia ou com enfeite) em chão firme, fora da dungeon — para objetos de várias células. */
  isFootprintFree(x, y) {
    if (this.isProtected(x, y) || !this.isGroundStandable(x, y) || this.getGround(x, y) === Block.HOLE) return false;
    const b = blockDef(this.getObject(x, y));
    return b.id === Block.AIR || b.shape === "decoration";
  }
  /** Células que um bloco ocupa ao ser colocado em (x, y) (tenda 2×2; os demais, 1). */
  footprint(id, x, y) {
    return id === Block.TENT ? tentCells(x, y) : [[x, y]];
  }
  /**
   * Cantos possíveis para um objeto de várias células cobrir a célula (x, y) (tenda: 4 opções).
   * Quem coloca escolhe o que não pega ninguém; blocos de 1 célula têm só (x, y).
   */
  footprintAnchors(id, x, y) {
    return id === Block.TENT ? [[x, y], [x - 1, y], [x, y + 1], [x - 1, y + 1]] : [[x, y]];
  }
  /** Canto (TENT) da tenda que contém a célula, ou null. */
  tentAnchor(x, y) {
    for (const [dx, dy] of [[0, 0], [-1, 0], [0, 1], [-1, 1]]) {
      if (this.getObject(x + dx, y + dy) === Block.TENT) return [x + dx, y + dy];
    }
    return null;
  }
  /** Última tenda colocada (ponto de renascer), se ainda estiver de pé. */
  tent = null;
  /** Conteúdo dos baús, por célula ("x,y"): 27 espaços (pilha ou null). Parte do estado do mundo (salvo). */
  chests = /* @__PURE__ */ new Map();
  /** Espaços do baú da célula (null se não há baú). */
  chestAt(x, y) {
    return this.getObject(x, y) === Block.CHEST ? this.chests.get(chunkKey(x, y)) ?? this.newChest(x, y) : null;
  }
  newChest(x, y) {
    const c = Array(CHEST_SLOTS).fill(null);
    this.chests.set(chunkKey(x, y), c);
    return c;
  }
  /** Onde renascer: ao lado da última tenda (se ainda existir), senão o início. */
  respawnPoint() {
    const t = this.tent;
    if (t && this.getObject(t[0], t[1]) === Block.TENT) {
      for (const [dx, dy] of [[0, 1], [1, 1], [-1, 0], [2, 0], [-1, 1], [2, 1], [0, -2], [1, -2]]) {
        if (this.isWalkable(t[0] + dx, t[1] + dy)) return [t[0] + dx, t[1] + dy];
      }
    }
    this.tent = null;
    return this.findSpawn();
  }
  /**
   * Ponto inicial: procura (em anéis de 24 células) um bioma acolhedor perto da
   * origem e devolve a célula andável mais próxima dele.
   */
  findSpawn() {
    if (this.spawn) return this.spawn;
    const b = this.profile.bounds;
    if (b) {
      const cx = Math.floor((b.cx0 + b.cx1 + 1) * CHUNK_SIZE / 2);
      const cy = Math.floor((b.cy0 + b.cy1 + 1) * CHUNK_SIZE / 2);
      if (this.generator instanceof SanctuarySeedGenerator) return [cx, cy];
      return this.nearestWalkable(cx, cy, 64);
    }
    const welcoming = /* @__PURE__ */ new Set(["meadow", "sakura", "enchanted"]);
    for (let r = 0; r <= 60; r++) {
      for (let dy = -r; dy <= r; dy++) {
        for (let dx = -r; dx <= r; dx++) {
          if (Math.max(Math.abs(dx), Math.abs(dy)) !== r) continue;
          const x = dx * 24;
          const y = dy * 24;
          if (welcoming.has(this.biomeAt(x, y).key)) return this.nearestWalkable(x, y);
        }
      }
    }
    return this.nearestWalkable(0, 0);
  }
  // ---- Plantação ----
  /**
   * Dá para plantar `id` aqui? Plantação (trigo, batata, tomate, cenoura): só em Terra Arada. Não há mais mudas de árvore
   * (v0.88.0: as árvores só aparecem adultas).
   * Sempre com a célula livre (ou só com enfeite).
   */
  canPlant(x, y, id = Block.WHEAT_0) {
    if (this.isProtected(x, y)) return false;
    if (!isCropSeedling(id) || this.getGround(x, y) !== PLANTABLE_GROUND) return false;
    const base = blockDef(this.getObject(x, y));
    return base.id === Block.AIR || base.shape === "decoration";
  }
  /**
   * A enxada pode arar aqui? Chão de Terra ou Terra com Grama, sem nada em cima
   * (enfeites como capim/flor são removidos ao arar).
   */
  canTill(x, y) {
    if (this.isProtected(x, y)) return false;
    if (!TILLABLE.has(this.getGround(x, y))) return false;
    const base = blockDef(this.getObject(x, y));
    return base.id === Block.AIR || base.shape === "decoration";
  }
  /** Ara o chão: Terra/Terra com Grama → Terra Arada. */
  till(x, y) {
    if (!this.canTill(x, y)) return false;
    if (this.getObject(x, y) !== Block.AIR) this.setLevel(x, y, 0, Block.AIR);
    this.setLevel(x, y, "ground", Block.TILLED);
    return true;
  }
  /**
   * A pá pode amassar aqui? Chão de Terra, Terra com Grama ou Terra Arada, sem nada em cima
   * (enfeites são removidos; trigo plantado impede).
   */
  canFlatten(x, y) {
    if (this.isProtected(x, y)) return false;
    if (!FLATTENABLE.has(this.getGround(x, y))) return false;
    const base = blockDef(this.getObject(x, y));
    return base.id === Block.AIR || base.shape === "decoration";
  }
  /** Amassa o chão: Terra/Terra com Grama/Terra Arada → Caminho de Terra. */
  flatten(x, y) {
    if (!this.canFlatten(x, y)) return false;
    if (this.getObject(x, y) !== Block.AIR) this.setLevel(x, y, 0, Block.AIR);
    this.setLevel(x, y, "ground", Block.PATH);
    return true;
  }
  plant(x, y, id = Block.WHEAT_0) {
    if (!this.canPlant(x, y, id)) return false;
    this.setLevel(x, y, 0, id);
    return true;
  }
  /** Macieira carregada aqui (tocar colhe)? */
  canPick(x, y) {
    return this.getObject(x, y) === Block.APPLE_TREE && !this.isProtected(x, y);
  }
  /** Colhe as maçãs: a macieira fica florida e as frutas voltam com o tempo (as maçãs em si: `pickDrops`). */
  pick(x, y) {
    if (!this.canPick(x, y)) return false;
    this.setLevel(x, y, 0, Block.APPLE_TREE_BARE);
    return true;
  }
  /** Árvores plantadas crescendo (testes e depuração). */
  get growingTreeCount() {
    return this.trees.size;
  }
  get cropCount() {
    return this.crops.size;
  }
  /**
   * Avança o tempo: cada plantação não madura sobe um estágio com probabilidade dt / CROP_STAGE_SECONDS[cultura]
   * (crescimento natural, não sincronizado); depois as árvores.
   */
  /**
   * Avança o tempo do mundo: água sempre; crescimento de plantas/árvores só com `grow` (no multiplayer quem faz crescer
   * é a sala do servidor, que avisa cada célula pelo `onGrow`).
   */
  tick(dt, rand = Math.random, grow2 = true, onGrow) {
    this.tickWater(dt);
    if (grow2) {
      this.tickGrowth(dt, rand, onGrow);
      this.tickHoles(dt, onGrow);
    }
  }
  /**
   * Chão quebrado: cada buraco sem bloco envelhece; ao completar um dia inteiro ganha um chão igual ao de um vizinho
   * (`healedGround`). Quem decide é quem faz crescer (o jogo sozinho ou a sala), que avisa a célula pelo `onGrow`.
   */
  tickHoles(dt, onFill) {
    if (!this.holeAge.size) return;
    for (const [key, age] of [...this.holeAge]) {
      const next = age + dt;
      if (next < DAY_LENGTH_S) {
        this.holeAge.set(key, next);
        continue;
      }
      const [x, y] = key.split(",").map(Number);
      const id = this.getGround(x, y) === Block.HOLE ? this.healedGround(x, y) : null;
      if (id === null) {
        this.holeAge.set(key, Math.min(next, DAY_LENGTH_S));
        continue;
      }
      this.setLevel(x, y, "ground", id);
      onFill?.(x, y, id);
    }
  }
  /**
   * Chão que um buraco antigo ganha: o de um vizinho (primeiro os de lado, depois as diagonais), escolhido pela seed e
   * pela posição — o mesmo buraco sempre ganha o mesmo chão. Só chão de bloco (não água, não outro buraco). Null se
   * nenhum vizinho serve.
   */
  healedGround(x, y) {
    const usable = (nx, ny) => {
      const g = this.getGround(nx, ny);
      const d = blockDef(g);
      return g !== Block.HOLE && g !== Block.AIR && d.shape === "cube" && !d.liquid ? g : null;
    };
    for (const ring of [[[0, -1], [1, 0], [0, 1], [-1, 0]], [[1, -1], [1, 1], [-1, 1], [-1, -1]]]) {
      const found = ring.map(([dx, dy]) => usable(x + dx, y + dy)).filter((g) => g !== null);
      if (found.length) return found[Math.floor(hash2(this.seed, x * 7 + 1, y * 13 + 3) * found.length)];
    }
    return null;
  }
  /** Idades (s) dos buracos para o salvamento: `[x, y, segundos]`. */
  holeAges() {
    return [...this.holeAge].map(([key, age]) => {
      const [x, y] = key.split(",").map(Number);
      return [x, y, Math.round(age)];
    });
  }
  /** Devolve as idades salvas (só vale para célula que ainda é buraco; idade fora do razoável é ignorada). */
  loadHoleAges(list) {
    for (const e of list ?? []) {
      if (!Array.isArray(e) || e.length !== 3 || !e.every(Number.isFinite)) continue;
      const [x, y, age] = e;
      if (Math.abs(x) + Math.abs(y) > 2 ** 30 || age < 0 || age > DAY_LENGTH_S) continue;
      if (this.getGround(x, y) === Block.HOLE && this.holeAge.has(chunkKey(x, y))) this.holeAge.set(chunkKey(x, y), age);
    }
  }
  /** Buracos esperando virar chão (testes e depuração). */
  get holeCount() {
    return this.holeAge.size;
  }
  /** Plantas e árvores: cada estágio avança com probabilidade dt / tempo do estágio. */
  tickGrowth(dt, rand, onGrow) {
    const set = (x, y, id) => {
      this.setLevel(x, y, 0, id);
      onGrow?.(x, y, id);
    };
    for (const key of [...this.crops]) {
      const [x, y] = key.split(",").map(Number);
      const id = this.getObject(x, y);
      const kind = cropKind(id);
      if (!kind) {
        this.crops.delete(key);
        continue;
      }
      const stage = cropStage(id);
      if (stage < CROP_STAGES - 1 && rand() < dt / CROP_STAGE_SECONDS[kind]) set(x, y, cropId(kind, stage + 1));
    }
    for (const key of [...this.trees]) {
      const [x, y] = key.split(",").map(Number);
      const id = this.getObject(x, y);
      const next = TREE_NEXT[id];
      if (next === void 0) {
        this.trees.delete(key);
        continue;
      }
      if (rand() < dt / FRUIT_REGROW_SECONDS) set(x, y, next);
    }
  }
  /**
   * Multiplayer: aplica o crescimento que a sala decidiu (só se a célula ainda tem planta ou árvore que cresce — uma
   * ação que chegou antes vale). Retorna se aplicou.
   */
  applyGrowth(x, y, id) {
    if (this.getGround(x, y) === Block.HOLE && this.getObject(x, y) === Block.AIR && blockDef(id).shape === "cube" && !blockDef(id).liquid) {
      this.setLevel(x, y, "ground", id);
      return true;
    }
    const cur = this.getObject(x, y);
    if (!isCrop(cur) && TREE_NEXT[cur] === void 0) return false;
    this.setLevel(x, y, 0, id);
    return true;
  }
  /** Célula andável (com vizinhos andáveis) mais próxima de (x0, y0), em espiral. */
  nearestWalkable(x0, y0, maxRadius = 200) {
    const ok = (x, y) => this.isWalkable(x, y) && this.isWalkable(x + 1, y) && this.isWalkable(x - 1, y) && this.isWalkable(x, y + 1) && this.isWalkable(x, y - 1);
    for (let r = 0; r <= maxRadius; r++) {
      for (let dy = -r; dy <= r; dy++) {
        for (let dx = -r; dx <= r; dx++) {
          if (Math.max(Math.abs(dx), Math.abs(dy)) !== r) continue;
          if (ok(x0 + dx, y0 + dy)) return [x0 + dx, y0 + dy];
        }
      }
    }
    return [x0, y0];
  }
  // ---- Ciclo de vida de chunks ----
  /** Gera até `budget` chunks faltantes no retângulo, do centro para fora. Retorna quantos. */
  ensureChunks(area, budget) {
    const rect = this.clampRect(area);
    if (!rect) return 0;
    const ccx = (rect.cx0 + rect.cx1) / 2;
    const ccy = (rect.cy0 + rect.cy1) / 2;
    const missing = [];
    for (let cy = rect.cy0; cy <= rect.cy1; cy++) {
      for (let cx = rect.cx0; cx <= rect.cx1; cx++) {
        if (!this.chunks.has(numKey(cx, cy))) missing.push([cx, cy, (cx - ccx) ** 2 + (cy - ccy) ** 2]);
      }
    }
    missing.sort((a, b) => a[2] - b[2]);
    const n = Math.min(budget, missing.length);
    for (let i = 0; i < n; i++) this.loadChunk(missing[i][0], missing[i][1]);
    return n;
  }
  /** Descarta chunks não modificados longe da área ativa. Retorna as chaves removidas. */
  unloadFar(rect) {
    const removed = [];
    for (const [key, c] of this.chunks) {
      if (c.modified) continue;
      if (c.cx < rect.cx0 - UNLOAD_MARGIN || c.cx > rect.cx1 + UNLOAD_MARGIN || c.cy < rect.cy0 - UNLOAD_MARGIN || c.cy > rect.cy1 + UNLOAD_MARGIN) {
        this.chunks.delete(key);
        if (this.last === c) this.last = null;
        removed.push(chunkKey(c.cx, c.cy));
      }
    }
    return removed;
  }
  forEachChunk(fn) {
    for (const c of this.chunks.values()) fn(c);
  }
  // ---- Persistência (o salvamento em si fica em game/save.ts) ----
  /** Chunks editados pelo jogador: o único estado do mapa que precisa ser salvo (o resto vem da seed). */
  modifiedChunks() {
    return [...this.chunks.values()].filter((c) => c.modified);
  }
  /**
   * Restaura um chunk salvo (substitui o gerado pela seed) e reconstrói as plantações dele.
   * Camadas a mais que o motor atual (o 3º nível, aposentado com `MAX_STACK = 2`) são descartadas; a menos ficam
   * vazias. Devolve quantos blocos foram descartados, para quem restaura avisar (jogo) ou registrar (servidor).
   */
  restoreChunk(cx, cy, ground2, levels) {
    const c = new Chunk(cx, cy, this.maxStack);
    c.ground.set(ground2.subarray(0, c.ground.length));
    let dropped = 0;
    for (let i = c.levels.length; i < levels.length; i++) for (const b of levels[i]) if (b !== Block.AIR) dropped++;
    levels.forEach((l, i) => {
      if (i < c.levels.length) c.levels[i].set(l.subarray(0, c.levels[i].length));
    });
    if (this.cubeLevels > 1 && levels.length <= 2) {
      const n = c.ground.length;
      for (let i = 0; i < n; i++) {
        const obj = c.levels[0][i], up = c.levels[1][i];
        if (!isStackBlock(obj)) continue;
        for (let l = 1; l < c.levels.length; l++) c.levels[l][i] = quarterLevel(obj, up, l);
      }
    }
    for (const l of c.levels) for (let i = 0; i < l.length; i++) l[i] = isRemovedBlock(l[i]) ? Block.AIR : adultOfStage(l[i]);
    for (let ly = 0; ly < CHUNK_SIZE; ly++) {
      for (let lx = 0; lx < CHUNK_SIZE; lx++) {
        const x = cx * CHUNK_SIZE + lx;
        const y = cy * CHUNK_SIZE + ly;
        if (!this.inGuardedArea(x, y)) continue;
        const cell = this.generator.cellAt(x, y);
        c.setGround(lx, ly, cell.ground);
        c.levels.forEach((l, i) => {
          l[ly * CHUNK_SIZE + lx] = this.cubeLevels > 1 ? quarterLevel(cell.object, cell.upper, i) : i === 0 ? cell.object : i === 1 ? cell.upper : Block.AIR;
        });
      }
    }
    c.modified = true;
    c.version++;
    this.chunks.set(numKey(cx, cy), c);
    this.last = null;
    for (let ly = 0; ly < CHUNK_SIZE; ly++) {
      for (let lx = 0; lx < CHUNK_SIZE; lx++) {
        const id = c.getObject(lx, ly);
        const key = chunkKey(cx * CHUNK_SIZE + lx, cy * CHUNK_SIZE + ly);
        if (isCrop(id)) this.crops.add(key);
        if (isGrowingTree(id)) this.trees.add(key);
        if (c.getGround(lx, ly) === Block.HOLE) this.holeAge.set(key, 0);
        else this.holeAge.delete(key);
      }
    }
    return dropped;
  }
};

// src/net/room.ts
var ROOM_START_TIME = 0.31;
var TIME_SYNC_SECONDS = 30;
var ROOM_SNAPSHOT_VERSION = 7;
var DROP_LIFETIME = 300;
var TAKE_REACH = 3;
var MOBS_EVERY = 0.1;
var MOBS_RADIUS = 22;
var CREATURE_STEP = 0.1;
var LOAD_RADIUS = 28;
var FEED_REACH = 3;
var TALK_REACH = 8;
var TALK_MAX_SECONDS = 120;
var round2 = (v) => Math.round(v * 100) / 100;
function rescaleRoomSnapshot(s, to) {
  const f = rescaleFactor(s.sub ?? 1, to);
  if (f === 1) return s;
  return {
    ...s,
    sub: to,
    chunks: rescaleChunkRecords(s.chunks ?? [], f),
    chests: Object.fromEntries(Object.entries(s.chests ?? {}).map(([k, v]) => [rescaleCellKey(k, f), v])),
    animals: s.animals?.map((a) => {
      const [x, y] = rescaleXY(a.x, a.y, f);
      const [hx, hy] = rescaleXY(a.hx, a.hy, f);
      return { ...a, x, y, hx, hy };
    }),
    holes: s.holes && rescaleHoles(s.holes, f)
  };
}
var bagKey = (name) => name.toLocaleLowerCase("pt-BR");
var Room = class {
  constructor(id, name, seed, rand = Math.random) {
    this.id = id;
    this.name = name;
    this.seed = seed;
    this.rand = rand;
    this.world = new World(seed);
    this.entities = new Entities(null, rand);
    const e = this.entities;
    e.onMonsterKilled = (m) => {
      if (this.striker !== null) this.pending.push({ to: this.striker, msg: { t: "killed", k: m.kind } });
      const list = this.spawnDrops(m.x, m.y + 0.2, monsterDrops(m.kind, rand));
      if (list.length) this.pending.push({ to: "all", msg: { t: "drops", list } });
    };
    e.onDamage = (x, y, hit, target) => {
      if (target === "enemy") this.hits.push([round2(x), round2(y), hit.amount, hit.crit ? 1 : 0]);
    };
    e.onBite = (target, m) => {
      for (const [pid, av] of this.avatars) {
        if (av === target) this.pending.push({ to: pid, msg: { t: "bite", k: m.kind, x: round2(m.x), y: round2(m.y) } });
      }
    };
    const [gx, gy] = this.world.outsideGate();
    this.loadAround(gx, gy + 6, 24);
    const d = this.world.dungeon;
    if (d) this.loadRect(d.area.x0, d.area.y0, d.area.x1, d.area.y1);
    e.spawnWildlife(this.world, true);
    this.loadPeopleAreas();
    e.spawnVillagers(this.world);
    e.spawnResidents(this.world);
  }
  id;
  name;
  seed;
  rand;
  world;
  players = /* @__PURE__ */ new Map();
  nextId = 1;
  /** Hora do dia da sala (0..1): a mesma para todos os jogadores. */
  time = ROOM_START_TIME;
  /** Bolsas guardadas por nome (minúsculas). */
  bags = /* @__PURE__ */ new Map();
  syncTimer = TIME_SYNC_SECONDS;
  /** Itens no chão da sala (com a hora em que caíram, em segundos de sala). */
  drops = /* @__PURE__ */ new Map();
  nextDropId = 1;
  clock = 0;
  /** Algo mudou desde o último `snapshot` (o servidor só grava quando há o que gravar). */
  dirty = false;
  /** Blocos do 3º nível (aposentado) descartados no último `restore`; o servidor registra no log. */
  droppedOnRestore = 0;
  /**
   * Bichos da sala (Etapa 3): as mesmas `Entities` do jogo, sem personagem; cada jogador é um avatar na posição que
   * manda. Os animais e monstros nascem pela seed; não vão para o disco (renascem se o servidor reiniciar).
   */
  entities;
  avatars = /* @__PURE__ */ new Map();
  /** Quem está golpeando agora (para dar a morte a quem abateu). */
  striker = null;
  mobIds = /* @__PURE__ */ new WeakMap();
  nextMobId = 1;
  mobTimer = 0;
  growTimer = 0;
  /** Mensagens geradas pela simulação dos bichos (mordidas, números de dano, espólios), entregues no próximo retorno. */
  pending = [];
  hits = [];
  /** Gera os chunks onde os moradores nascem e andam: a cidade, os cômodos (balcões) e a vila. */
  loadPeopleAreas() {
    const w = this.world;
    if (w.town) this.loadRect(w.town.area.x0, w.town.area.y0, w.town.area.x1, w.town.area.y1);
    for (const l of w.interiors) this.loadRect(l.area.x0, l.area.y0, l.area.x1, l.area.y1);
    if (w.village) this.loadRect(w.village.area.x0, w.village.area.y0, w.village.area.x1, w.village.area.y1);
  }
  /** Carrega (gera) os chunks em volta de (x, y). */
  loadAround(x, y, r) {
    this.loadRect(x - r, y - r, x + r, y + r);
  }
  loadRect(x0, y0, x1, y1) {
    for (let cy = toChunk(Math.floor(y0)); cy <= toChunk(Math.floor(y1)); cy++) {
      for (let cx = toChunk(Math.floor(x0)); cx <= toChunk(Math.floor(x1)); cx++) if (!this.world.getChunk(cx, cy)) this.world.loadChunk(cx, cy);
    }
  }
  get size() {
    return this.players.size;
  }
  /** Pedido de entrada. Retorna o id do novo jogador e o que enviar (ou só um erro, para quem pediu). */
  join(hello) {
    const fail = (code, message) => ({ id: null, out: [{ to: 0, msg: { t: "error", code, message } }] });
    if (hello.v !== PROTOCOL_VERSION || (hello.sub ?? 1) !== SUBDIV) return fail("version", "Vers\xE3o do jogo diferente da do servidor: recarregue a p\xE1gina.");
    const name = sanitizeName(hello.name);
    if (!name) return fail("name", "Nome inv\xE1lido: use de 2 a 16 letras ou n\xFAmeros.");
    if (this.players.size >= MAX_PLAYERS) return fail("full", `${this.name} cheia (m\xE1ximo ${MAX_PLAYERS} jogadores). Tente daqui a pouco.`);
    if ([...this.players.values()].some((p) => bagKey(p.name) === bagKey(name))) return fail("name", `J\xE1 tem algu\xE9m com o nome ${name} na sala: escolha outro.`);
    const id = this.nextId++;
    const player = { id, name, state: null, appearance: hello.appearance ?? DEFAULT_APPEARANCE };
    const others = [...this.players.values()];
    this.players.set(id, player);
    return {
      id,
      out: [
        {
          to: id,
          msg: {
            t: "welcome",
            you: id,
            room: this.id,
            roomName: this.name,
            seed: this.seed,
            players: others,
            chunks: this.chunks(),
            time: this.time,
            bag: this.bags.get(bagKey(name)) ?? null,
            drops: [...this.drops.values()].map(({ id: id2, item, x, y }) => ({ id: id2, item, x, y })),
            chests: this.chestList()
          }
        },
        { to: { except: id }, msg: { t: "joined", player } }
      ]
    };
  }
  leave(id) {
    if (!this.players.delete(id)) return [];
    this.releasePlayerVillagers(id);
    const av = this.avatars.get(id);
    if (av) {
      this.avatars.delete(id);
      this.entities.avatars.splice(this.entities.avatars.indexOf(av), 1);
    }
    return [{ to: "all", msg: { t: "left", id } }];
  }
  /** Moradores presos numa conversa (jogador → morador, quando começou) e quem tem uma conversa aberta há tempo demais é solto. */
  talks = /* @__PURE__ */ new Map();
  releaseTalk(id) {
    const t = this.talks.get(id);
    if (!t) return;
    this.talks.delete(id);
    if (![...this.talks.values()].some((o) => o.v === t.v)) t.v.freeze(false);
  }
  releaseStaleTalks() {
    for (const [pid, t] of this.talks) if (this.clock - t.since > TALK_MAX_SECONDS) this.releaseTalk(pid);
  }
  /** O jogador saiu: solta a conversa dele e os moradores que o acompanhavam voltam ao posto. */
  releasePlayerVillagers(id) {
    this.releaseTalk(id);
    const av = this.avatars.get(id);
    for (const v of this.entities.villagers) {
      if (av && v.leader === av) {
        v.setCompanion(false);
        v.leader = null;
      }
    }
  }
  villagerById(id) {
    return this.entities.villagers.find((v) => this.mobIds.get(v) === id) ?? null;
  }
  playerIdOf(av) {
    if (av) {
      for (const [pid, a] of this.avatars) if (a === av) return pid;
    }
    return 0;
  }
  /** Mensagem de um jogador já na sala. Ações passam pelas regras do `World`; recusadas voltam só para quem mandou. */
  handle(id, m) {
    const p = this.players.get(id);
    if (!p) return [];
    if (m.t === "state") {
      p.state = m.s;
      let av = this.avatars.get(id);
      if (!av) {
        av = new Player(m.s.x, m.s.y);
        this.avatars.set(id, av);
        this.entities.avatars.push(av);
      }
      av.x = m.s.x;
      av.y = m.s.y;
      av.facing = m.s.facing;
      av.moving = m.s.moving;
      return [{ to: { except: id }, msg: { t: "state", id, s: m.s } }];
    }
    if (m.t === "strike") {
      const av = this.avatars.get(id);
      if (!av) return [];
      av.facing = m.facing;
      this.striker = id;
      try {
        this.entities.strikeFrom(av, m.facing, m.attack, this.world);
      } finally {
        this.striker = null;
      }
      return this.flush();
    }
    if (m.t === "talk" || m.t === "escort") {
      const av = this.avatars.get(id);
      const v = av ? this.villagerById(m.id) : null;
      if (!av || !v) return [];
      const close = Math.hypot(v.x - av.x, v.y - av.y) <= TALK_REACH;
      if (m.t === "talk") {
        this.releaseTalk(id);
        if (m.on && close) {
          v.freeze(true);
          v.faceTo(av.x, av.y);
          this.talks.set(id, { v, since: this.clock });
        }
        return [];
      }
      if (!m.on) {
        if (v.leader === av) {
          v.setCompanion(false);
          v.leader = null;
        }
        return [];
      }
      if (v.escorting && v.leader !== av) return [{ to: id, msg: { t: "escort", id: m.id, ok: false } }];
      if (!close && v.leader !== av) return [{ to: id, msg: { t: "escort", id: m.id, ok: false } }];
      v.leader = av;
      v.setCompanion(true);
      return [{ to: id, msg: { t: "escort", id: m.id, ok: true } }];
    }
    if (m.t === "feed") {
      const av = this.avatars.get(id);
      if (!av || !(m.item in ITEMS)) return [];
      const item = m.item;
      const animal = this.entities.animals.find((a) => this.mobIds.get(a) === m.id);
      if (!animal || Math.hypot(animal.x - av.x, animal.y - av.y) > FEED_REACH || !animal.eats(item) || !animal.feed(av)) return [];
      const out = [{ to: id, msg: { t: "fed", id: m.id, item } }];
      const product = ANIMAL_PRODUCE[animal.species];
      const list = product ? this.spawnDrops(animal.x, animal.y + 0.3, [{ item: product, count: 1 }]) : [];
      if (list.length) out.push({ to: "all", msg: { t: "drops", list } });
      return out;
    }
    if (m.t === "bag") {
      this.bags.set(bagKey(p.name), m.bag);
      this.dirty = true;
      return [];
    }
    if (m.t === "action") {
      const a = m.a;
      const breaking = a.kind === "break" ? this.world.breakTargetId(a.x, a.y) : null;
      const chestLoot = a.kind === "break" ? (this.world.chestAt(a.x, a.y) ?? []).filter((c) => c !== null).map((c) => ({ item: c.item, count: c.count })) : [];
      const wasChest = a.kind === "break" && this.world.getObject(a.x, a.y) === Block.CHEST;
      if (!applyAction(this.world, a)) return [{ to: id, msg: { t: "rejected", seq: m.seq } }];
      this.dirty = true;
      const applied = { by: id, action: a };
      const out = [{ to: "all", msg: { t: "applied", ...applied } }];
      let loot = [];
      if (a.kind === "break" && breaking !== null) {
        loot = [...wasChest ? chestLoot : [], ...breakDrops(a.tool, breaking, this.world.profile.collectBlocks, this.rand, { seed: this.world.seed, x: a.x, y: a.y })];
      }
      if (a.kind === "pick") loot = pickDrops(this.rand);
      const list = this.spawnDrops(a.x + 0.5, a.y + 0.7, loot);
      if (list.length) out.push({ to: "all", msg: { t: "drops", list } });
      return out;
    }
    if (m.t === "take") {
      const d = this.drops.get(m.id);
      const s = p.state;
      if (!d || !s || Math.hypot(s.x - d.x, s.y - d.y) > TAKE_REACH) return [];
      this.drops.delete(m.id);
      return [{ to: "all", msg: { t: "taken", id: m.id, by: id } }];
    }
    if (m.t === "chest") {
      if (this.world.getObject(m.x, m.y) !== Block.CHEST || m.slots.length !== CHEST_SLOTS) return [];
      this.world.chests.set(`${m.x},${m.y}`, m.slots.map((s) => s ? { ...s } : null));
      this.dirty = true;
      return [{ to: { except: id }, msg: { t: "chest", x: m.x, y: m.y, slots: m.slots } }];
    }
    return [];
  }
  /**
   * Passa o tempo da sala (o servidor chama ~1×/s, com gente ou sem): avança a hora e faz plantas e árvores crescerem
   * (a sala decide; os aparelhos só aplicam). Com jogadores, manda o crescimento e, de tempos em tempos, a hora.
   */
  tick(dt) {
    this.time = (this.time + dt / DAY_LENGTH_S) % 1;
    this.clock += dt;
    for (const [k, d] of this.drops) if (this.clock - d.born > DROP_LIFETIME) this.drops.delete(k);
    const out = [];
    this.growTimer += dt;
    if (this.growTimer >= 1) {
      const cells = [];
      this.world.tick(this.growTimer, this.rand, true, (x, y, id) => cells.push([x, y, id]));
      this.growTimer = 0;
      if (cells.length) {
        this.dirty = true;
        out.push({ to: "all", msg: { t: "grow", cells } });
      }
    }
    if (this.players.size) {
      this.dirty = true;
      for (const av of this.avatars.values()) this.loadAround(av.x, av.y, LOAD_RADIUS);
      this.entities.time = this.time;
      this.releaseStaleTalks();
      for (let left = dt; left > 1e-6; left -= CREATURE_STEP) this.entities.update(Math.min(CREATURE_STEP, left), this.world);
      out.push(...this.flush());
      this.mobTimer -= dt;
      if (this.mobTimer <= 0) {
        this.mobTimer = MOBS_EVERY;
        for (const [pid, av] of this.avatars) out.push({ to: pid, msg: { t: "mobs", list: this.mobsNear(av.x, av.y) } });
      }
    }
    this.syncTimer -= dt;
    if (this.syncTimer <= 0) {
      this.syncTimer = TIME_SYNC_SECONDS;
      out.push({ to: "all", msg: { t: "time", time: this.time } });
    }
    return this.players.size ? out : [];
  }
  /** Mensagens que a simulação dos bichos gerou (mordidas, espólios e números de dano). */
  flush() {
    const out = this.pending;
    this.pending = [];
    if (this.hits.length) {
      out.push({ to: "all", msg: { t: "hits", list: this.hits } });
      this.hits = [];
    }
    return out;
  }
  mobId(o) {
    let id = this.mobIds.get(o);
    if (id === void 0) {
      id = this.nextMobId++;
      this.mobIds.set(o, id);
    }
    return id;
  }
  /** Bichos (e efeitos: mortes e coraçõezinhos) a até `MOBS_RADIUS` de (x, y), no formato curto da rede. */
  mobsNear(x, y) {
    const near = (o) => Math.abs(o.x - x) <= MOBS_RADIUS && Math.abs(o.y - y) <= MOBS_RADIUS;
    const list = [];
    const e = this.entities;
    for (const a of e.animals) {
      if (!near(a)) continue;
      const s = { i: this.mobId(a), k: a instanceof Sheep ? "sheep" : a.species, x: round2(a.x), y: round2(a.y), f: FACING_ORDER.indexOf(a.facing) };
      if (a.moving) s.m = 1;
      if (a.baby) s.b = 1;
      if (a.inLove && a.courtship <= 0) s.l = 1;
      if (a.canEat) s.e = 1;
      list.push(s);
    }
    for (const v of e.villagers) {
      if (v.hidden || !near(v)) continue;
      const s = { i: this.mobId(v), k: `npc-${v.npc}`, x: round2(v.x), y: round2(v.y), f: FACING_ORDER.indexOf(v.facing) };
      if (v.moving) s.m = 1;
      if (v.resident) s.u = v.resident.id;
      if (v.fade > 0) s.a = round2(v.fade);
      const g = this.playerIdOf(v.leader);
      if (g) s.g = g;
      list.push(s);
    }
    for (const m of e.monsters) {
      if (!near(m)) continue;
      const s = { i: this.mobId(m), k: m.kind, x: round2(m.x), y: round2(m.y), f: FACING_ORDER.indexOf(m.facing) };
      if (m.moving) s.m = 1;
      if (m.hp < m.maxHp) s.p = round2(Math.max(0, m.hp / m.maxHp));
      if (m.hurt > 0) s.h = 1;
      if (hasPoses(m.kind)) {
        s.v = GOBLIN_VISUALS.indexOf(m.visualState);
        s.r = m.visualFrame;
      }
      list.push(s);
    }
    for (const d of e.dying) {
      if (near(d)) list.push({ i: 0, k: d.kind, x: round2(d.x), y: round2(d.y), f: FACING_ORDER.indexOf(d.facing), d: round2(d.t) });
    }
    for (const a of e.actors) {
      if (a.kind === "love-hearts" && near(a)) list.push({ i: 0, k: a.kind, x: round2(a.x), y: round2(a.y), f: 0, r: a.frame, s: a.scale });
    }
    return list;
  }
  /** Itens no chão: um por unidade, espalhados um pouco em volta de (x, y) (como `Drops.spawn` no jogo). */
  spawnDrops(x, y, loot) {
    const list = [];
    for (const d of loot) {
      for (let i = 0; i < d.count; i++) {
        const drop = { id: this.nextDropId++, item: d.item, x: x + (this.rand() - 0.5) * 0.6, y: y + (this.rand() - 0.5) * 0.4 };
        this.drops.set(drop.id, { ...drop, born: this.clock });
        list.push(drop);
      }
    }
    return list;
  }
  /** Baús da sala com conteúdo (os vazios nascem vazios em qualquer aparelho). */
  chestList() {
    return [...this.world.chests.entries()].map(([k, slots]) => {
      const [x, y] = k.split(",").map(Number);
      return { x, y, slots };
    });
  }
  /** Mundo da sala como está: os chunks editados (o resto vem da seed). */
  chunks() {
    return this.world.modifiedChunks().map((c) => ({ cx: c.cx, cy: c.cy, ground: toB64(c.ground), levels: c.levels.map(toB64) }));
  }
  /** Fotografia para o disco (o servidor grava quando `dirty`). */
  snapshot() {
    this.dirty = false;
    return {
      v: ROOM_SNAPSHOT_VERSION,
      room: this.id,
      seed: this.seed,
      time: this.time,
      savedAt: Date.now(),
      chunks: this.chunks(),
      bags: Object.fromEntries(this.bags),
      chests: Object.fromEntries(this.world.chests),
      animals: this.entities.saveAnimals(),
      holes: this.world.holeAges(),
      sub: SUBDIV
    };
  }
  /** Recarrega o que o servidor gravou (só se for desta sala e desta seed; senão, a sala começa do zero). */
  restore(snap) {
    if (!snap || ![1, 2, 3, 4, 5, 6, ROOM_SNAPSHOT_VERSION].includes(snap.v) || snap.room !== this.id || snap.seed !== this.seed) return false;
    if ((snap.sub ?? 1) > SUBDIV) return false;
    const s = rescaleRoomSnapshot(snap, SUBDIV);
    let dropped = 0;
    for (const c of s.chunks) dropped += this.world.restoreChunk(c.cx, c.cy, fromB64(c.ground), c.levels.map(fromB64));
    this.droppedOnRestore = dropped;
    this.world.settleWater();
    this.world.loadHoleAges(s.holes);
    if (Number.isFinite(s.time)) this.time = (s.time % 1 + 1) % 1;
    for (const [k, bag] of Object.entries(s.bags ?? {})) this.bags.set(k, bag);
    for (const [k, slots] of Object.entries(s.chests ?? {})) {
      const [x, y] = k.split(",").map(Number);
      if (this.world.getObject(x, y) === Block.CHEST && Array.isArray(slots) && slots.length === CHEST_SLOTS) this.world.chests.set(k, slots);
    }
    if (Array.isArray(s.animals)) {
      for (const a of s.animals) if (Number.isFinite(a?.x) && Number.isFinite(a?.y) && Math.abs(a.x) + Math.abs(a.y) < 2 ** 30) this.loadAround(a.x, a.y, 4);
      this.entities.restoreAnimals(s.animals, this.world);
      if (snap.v < 7) {
        const fix = this.entities.reconcileVillageAnimals(this.world);
        if (fix.removed > 0 || fix.spawned > 0) this.dirty = true;
      }
    }
    this.entities.reconcileGoblinCamps(this.world);
    this.dirty = this.dirty || dropped > 0;
    return true;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MAX_PLAYERS,
  PROTOCOL_VERSION,
  ROOMS,
  ROOM_SNAPSHOT_VERSION,
  Room,
  parseClientMessage,
  roomById,
  sanitizeName
});
