// Gerado por mundoblocos-2d v0.168.0 (485f9be) — npm run build:net. NÃO EDITE: atualize pelo jogo.
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
  TITAN_MAX_PLAYERS: () => TITAN_MAX_PLAYERS,
  TITAN_PROTOCOL_VERSION: () => TITAN_PROTOCOL_VERSION,
  TITAN_ROOMS: () => TITAN_ROOMS,
  TITAN_SNAPSHOT_VERSION: () => TITAN_SNAPSHOT_VERSION,
  TitanRoom: () => TitanRoom,
  parseClientMessage: () => parseClientMessage,
  parseTitanClientMessage: () => parseTitanClientMessage,
  roomById: () => roomById,
  sanitizeName: () => sanitizeName,
  titanRoomById: () => titanRoomById
});
module.exports = __toCommonJS(index_exports);

// src/config.ts
var import_meta = {};
var DAY_LENGTH_S = 480;
var DEFAULT_SUBDIV = 2;
function gridSubdiv() {
  if (typeof window === "undefined") {
    const env = globalThis.process?.env?.ORVALIS_SUBDIV;
    return env === "1" ? 1 : env === "2" ? 2 : DEFAULT_SUBDIV;
  }
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
var SANCTUARY_MAX_STACK = 8;
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

// src/world/rio.ts
var RIO_CANAL = 253;
var RIO_LAGO = 166;
var RIO_BRUSHES = [RIO_CANAL, RIO_LAGO];
var P = (key, edges, kind, name, weight = 1) => ({ key, edges, kind, weight, name });
var DEFS = [
  P("poca", "DDDD", "canal", "Po\xE7a de fadas"),
  P("ninfeias", "DDDD", "lago", "Lago das ninfeias"),
  P("calma", "FFFF", "lago", "\xC1gua calma", 3),
  P("ondulada", "FFFF", "lago", "\xC1gua ondulada", 3),
  P("espuma", "FFFF", "lago", "\xC1gua com espuma", 2),
  P("canal_ns", "CDCD", "canal", "Canal norte\u2013sul"),
  P("canal_lo", "DCDC", "canal", "Canal leste\u2013oeste"),
  P("curva_nl", "CCDD", "canal", "Curva norte\u2013leste"),
  P("curva_no", "CDDC", "canal", "Curva norte\u2013oeste"),
  P("cruz", "CCCC", "canal", "Encontro em cruz"),
  P("t_nlo", "DCCC", "canal", "Encontro em T"),
  P("margem_l", "FDFF", "lago", "Margem leste"),
  P("margem_o", "FFFD", "lago", "Margem oeste"),
  P("foz_lago", "CDFD", "canal", "Foz para lago"),
  P("baia", "DDFD", "lago", "Ba\xEDa abrigada"),
  P("margem_rasa", "DDFF", "lago", "Margem rasa"),
  P("raso_espuma", "DFFD", "lago", "Raso com espuma"),
  P("rochedos", "FFFF", "lago", "\xC1gua com rochedos", 1),
  P("nascente_l", "DCDD", "canal", "Nascente (leste)"),
  P("foz", "DFDC", "canal", "Foz"),
  P("nascente_s", "DDCD", "canal", "Nascente (sul)"),
  P("nascente_n", "CDDD", "canal", "Nascente (norte)"),
  P("margem_n", "DFFF", "lago", "Margem norte"),
  P("raso_so", "DDFF", "lago", "Raso (sudoeste)"),
  P("raso_ne", "FFDD", "lago", "Raso (nordeste)"),
  P("raso_no", "FDDF", "lago", "Raso (noroeste)")
];
var RIO_PIECES = DEFS.map((d, i) => ({ ...d, index: i }));
function isRioBrush(id) {
  return id === RIO_CANAL || id === RIO_LAGO;
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
  // --- Conjunto isométrico do Santuário (ADR 0036, v0.93.140): 20 cubos (bloco de grama + 19 pisos) e 17 objetos (16 peças + a parte da casa) ---
  ISO_G_GRASS: 81,
  ISO_G_DIRT: 82,
  ISO_G_STONE: 83,
  ISO_TREE: 167,
  ISO_BUSH_L: 168,
  ISO_BUSH_M: 169,
  ISO_BUSH_S: 186,
  ISO_ROCK_L: 187,
  ISO_PEBBLES: 188,
  ISO_TUFT: 189,
  ISO_DAISIES: 206,
  ISO_LAVENDER: 207,
  ISO_LANTERN: 208,
  ISO_STALL: 131,
  ISO_PLANTER: 1,
  ISO_STONE_PLANTER: 2,
  ISO_BARREL: 3,
  ISO_CRATE: 4,
  ISO_HOUSE: 5,
  ISO_HOUSE_PART: 7,
  ISO_STALL_PART: 84,
  /** Árvores do Santuário (v0.93.156): 4 espécies × 3 tamanhos (pequena, média, grande), pranchas do dono do produto (`scripts/extract-iso-trees.py`). */
  ISO_BETULA_S: 86,
  ISO_BETULA_M: 87,
  ISO_BETULA_L: 88,
  ISO_CEREJEIRA_S: 89,
  ISO_CEREJEIRA_M: 90,
  ISO_CEREJEIRA_L: 91,
  ISO_MACIEIRA_S: 92,
  ISO_MACIEIRA_M: 93,
  ISO_MACIEIRA_L: 94,
  ISO_CARVALHO_S: 95,
  ISO_CARVALHO_M: 96,
  ISO_CARVALHO_L: 97,
  /** Bloco de Pedra isométrico (v0.93.143): a camada de baixo do terreno do Santuário. */
  ISO_STONE_BLOCK: 85,
  /** Pincéis do Rio das Fadas (v0.93.147, `world/rio.ts`): a peça de água certa é escolhida na hora de desenhar, pelos vizinhos. */
  ISO_RIO_CANAL: RIO_CANAL,
  ISO_RIO_LAGO: RIO_LAGO
};
var ISO_TREE_SET = [
  [Block.ISO_BETULA_S, "B\xE9tula Pequena"],
  [Block.ISO_BETULA_M, "B\xE9tula M\xE9dia"],
  [Block.ISO_BETULA_L, "B\xE9tula Grande"],
  [Block.ISO_CEREJEIRA_S, "Cerejeira Pequena"],
  [Block.ISO_CEREJEIRA_M, "Cerejeira M\xE9dia"],
  [Block.ISO_CEREJEIRA_L, "Cerejeira Grande"],
  [Block.ISO_MACIEIRA_S, "Macieira Pequena"],
  [Block.ISO_MACIEIRA_M, "Macieira M\xE9dia"],
  [Block.ISO_MACIEIRA_L, "Macieira Grande"],
  [Block.ISO_CARVALHO_S, "Carvalho Pequeno"],
  [Block.ISO_CARVALHO_M, "Carvalho M\xE9dio"],
  [Block.ISO_CARVALHO_L, "Carvalho Grande"]
];
var ISO_TREE_IDS = /* @__PURE__ */ new Set([Block.ISO_TREE, ...ISO_TREE_SET.map(([id]) => id)]);
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
  // Conjunto isométrico do Santuário (ADR 0036): cubos (topo = o piso da prancha) e objetos de sprite.
  object(Block.ISO_G_GRASS, "Piso de Grama"),
  object(Block.ISO_G_DIRT, "Piso de Terra"),
  object(Block.ISO_G_STONE, "Piso de Pedra"),
  object(Block.ISO_STONE_BLOCK, "Bloco de Pedra", { stone: true }),
  object(Block.ISO_RIO_CANAL, "Rio: Canal"),
  object(Block.ISO_RIO_LAGO, "Rio: Lago"),
  object(Block.ISO_TREE, "Carvalho", { shape: "rock" }),
  ...ISO_TREE_SET.map(([id, name]) => object(id, name, { shape: "rock" })),
  object(Block.ISO_BUSH_L, "Arbusto Grande", { shape: "rock" }),
  object(Block.ISO_BUSH_M, "Arbusto M\xE9dio", { shape: "rock" }),
  object(Block.ISO_BUSH_S, "Arbusto Pequeno", { shape: "decoration", solid: false }),
  object(Block.ISO_ROCK_L, "Rochedo", { shape: "rock" }),
  object(Block.ISO_PEBBLES, "Pedrinhas", { shape: "decoration", solid: false }),
  object(Block.ISO_TUFT, "Tufo de Capim", { shape: "decoration", solid: false }),
  object(Block.ISO_DAISIES, "Margaridas", { shape: "decoration", solid: false }),
  object(Block.ISO_LAVENDER, "Lavanda", { shape: "decoration", solid: false }),
  object(Block.ISO_LANTERN, "Lampi\xE3o de Parede", { shape: "rock" }),
  object(Block.ISO_STALL, "Barraca de Feira", { shape: "rock" }),
  object(Block.ISO_PLANTER, "Jardineira de Lavanda", { shape: "rock" }),
  object(Block.ISO_STONE_PLANTER, "Canteiro de Pedra", { shape: "rock" }),
  object(Block.ISO_BARREL, "Barril", { shape: "rock" }),
  object(Block.ISO_CRATE, "Caixote", { shape: "rock" }),
  object(Block.ISO_HOUSE, "Casa de Feira", { shape: "rock" }),
  object(Block.ISO_HOUSE_PART, "Casa de Feira", { shape: "rock", placeable: false }),
  object(Block.ISO_STALL_PART, "Barraca de Feira", { shape: "rock", placeable: false }),
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
var ISO_CUBES = [Block.ISO_G_GRASS, Block.ISO_G_DIRT, Block.ISO_G_STONE, Block.ISO_STONE_BLOCK];
var ISO_PROPS = [
  Block.ISO_TREE,
  ...ISO_TREE_SET.map(([id]) => id),
  Block.ISO_BUSH_L,
  Block.ISO_BUSH_M,
  Block.ISO_BUSH_S,
  Block.ISO_ROCK_L,
  Block.ISO_PEBBLES,
  Block.ISO_TUFT,
  Block.ISO_DAISIES,
  Block.ISO_LAVENDER,
  Block.ISO_LANTERN,
  Block.ISO_STALL,
  Block.ISO_PLANTER,
  Block.ISO_STONE_PLANTER,
  Block.ISO_BARREL,
  Block.ISO_CRATE,
  Block.ISO_HOUSE
];
var ISO_BIG = {
  [Block.ISO_HOUSE]: { size: 12, part: Block.ISO_HOUSE_PART },
  [Block.ISO_STALL]: { size: 3, part: Block.ISO_STALL_PART }
};
var ISO_SCALE = { [Block.ISO_TREE]: 2, ...Object.fromEntries(ISO_TREE_SET.map(([id]) => [id, 2])), [Block.ISO_HOUSE]: 4, [Block.ISO_STALL]: 3 };
var ISO_FENCES = [
  Block.FENCE,
  Block.FENCE_BIRCH,
  Block.FENCE_CHERRY,
  Block.FENCE_GATE,
  Block.FENCE_GATE_BIRCH,
  Block.FENCE_GATE_CHERRY
];
var ISO_BLOCKS = [...ISO_CUBES, ...ISO_PROPS, ...ISO_FENCES];
var WORLD_BLOCKS_IN_SANCTUARY = [
  ...MATERIALS,
  Block.OAK_DOOR,
  Block.TENT,
  Block.CHEST,
  Block.CAMPFIRE,
  Block.CAULDRON,
  Block.OVEN,
  Block.CHAIR,
  Block.FENCE_STAKE,
  ...FLOWER_BLOCKS
];
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
    let ok2 = true;
    for (let j = j0 - 1; j <= j0 + ch && ok2; j++) {
      for (let i = i0 - 1; i <= i0 + cw && ok2; i++) {
        if (isBoss(i, j) || i >= 0 && j >= 0 && i < gw && j < gh && node(i, j) === entry) ok2 = false;
      }
    }
    for (const [a0, b0, a1, b1] of chambersN) if (i0 <= a1 + 1 && i0 + cw - 1 >= a0 - 1 && j0 <= b1 + 1 && j0 + ch - 1 >= b0 - 1) ok2 = false;
    if (!ok2) continue;
    chambersN.push([i0, j0, i0 + cw - 1, j0 + ch - 1]);
    for (let j = j0; j < j0 + ch; j++) for (let i = i0; i < i0 + cw; i++) {
      if (i + 1 < i0 + cw) link(node(i, j), node(i + 1, j));
      if (j + 1 < j0 + ch) link(node(i, j), node(i, j + 1));
    }
  }
  const dist2 = new Int32Array(gw * gh).fill(-1);
  dist2[entry] = 0;
  const q = [entry];
  for (let h0 = 0; h0 < q.length; h0++) {
    for (const m of open3.get(q[h0]) ?? []) if (dist2[m] < 0) {
      dist2[m] = dist2[q[h0]] + 1;
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
        if (!best || dist2[m] > dist2[best[0]]) best = [m, node(i, j)];
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
  const inside2 = [ex, ey];
  const maze = { w, h, floor, side, gate, inside: inside2, chambers, bossRoom, bossDoor };
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
  const idx2 = (x, y) => y * w + x;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = idx2(x, y);
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
        if (!m.floor[idx2(x, y)] || hash2(seed, x + 913, y - 211) > 0.12) continue;
        if (r === m.bossRoom && Math.hypot(x - bhx, y - bhy) < 5) continue;
        let lonely = true;
        for (let dy = -1; dy <= 1 && lonely; dy++) for (let dx = -1; dx <= 1; dx++) {
          if (!m.floor[idx2(x + dx, y + dy)] || objects[idx2(x + dx, y + dy)] !== Block.AIR) lonely = false;
        }
        if (lonely) objects[idx2(x, y)] = PROPS[Math.floor(hash2(seed, x - 57, y + 389) * PROPS.length)];
      }
    }
  }
  const dist2 = floorDistances(m, m.inside[0], m.inside[1]);
  const free = [];
  for (let i = 0; i < w * h; i++) {
    const x = i % w;
    const y = Math.floor(i / w);
    if (m.floor[i] && objects[i] === Block.AIR && dist2[i] >= 14 && !inRect(m.bossRoom, x, y)) free.push(i);
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
    const dist2 = CAVE_MIN_CASTLE_DIST + (8 + hash2(seed, 7002, t) * 80 + Math.floor(t / 9) * 24) * SUBDIV;
    const ox = Math.round(castle[0] + Math.cos(a) * dist2);
    const oy = Math.round(castle[1] + Math.sin(a) * dist2);
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
function breakDrops(tool, id, collect, rand = Math.random, at3) {
  if (collect && id === Block.FLOWER && at3) return [{ item: blockStack(FLOWER_BLOCKS[wildFlowerIndex(at3.seed, at3.x, at3.y)]), count: 1 }];
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
var PROTOCOL_VERSION = 29;
var MAX_PLAYERS = 10;
var ROOM_RULES = {
  normal: { mode: "survival", infiniteBlocks: false, collectBlockDrops: true, allowCameraModes: false, protectTown: true, goddessOnly: false, maxBuildLevels: MAX_STACK },
  sanctuary: { mode: "creative", infiniteBlocks: true, collectBlockDrops: false, allowCameraModes: true, protectTown: true, goddessOnly: true, maxBuildLevels: MAX_STACK }
};
var ROOMS = [
  { id: 1, name: "Sala 1", seed: 20261106, kind: "normal" },
  { id: 2, name: "Santu\xE1rio", seed: 20261115, kind: "sanctuary" }
];
function roomRules(id) {
  return ROOM_RULES[roomById(id)?.kind ?? "normal"];
}
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
  return o.goddess === true ? { body, goddess: true } : { body };
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
    const ease2 = Math.min(1, 0.25 + s.timer * 2);
    const moved = this.move(dt, s.dx * ease2, s.dy * ease2, world, blocked);
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
    const dist2 = Math.hypot(dx, dy) || 1;
    dx /= dist2;
    dy /= dist2;
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

// src/world/shop.ts
var CURRENCY = Item.COPPER_COIN;
var SELL_PRICE = {
  [Item.SILK]: 1,
  [Item.FANG]: 2,
  [Item.WOLF_FANG]: 2,
  [Item.WOLF_PELT]: 3,
  [Item.QUEEN_HEART]: 25
};
var MARKET_STOCK = [
  { item: Item.POTATO, price: 1 },
  { item: Item.TOMATO, price: 1 },
  { item: Item.CARROT, price: 2 },
  { item: Item.APPLE, price: 2 },
  { item: Item.MILK, price: 2 },
  { item: Item.BREAD, price: 4 },
  { item: Item.CHEESE, price: 4 },
  { item: Item.PASTA_TOMATO, price: 6 },
  { item: Item.APPLE_PIE, price: 8 }
];
var FLORIST_PRICE = 2;
var FLORIST_STOCK = FLOWER_BLOCKS.map((id) => ({ item: blockStack(id), price: FLORIST_PRICE }));

// src/game/npcBrain/missions.ts
var LOOT_FOR_SALE = [Item.SILK, Item.FANG, Item.WOLF_FANG, Item.WOLF_PELT, Item.QUEEN_HEART];
var placed = (blocks) => (e) => e.type === "place" && blocks.includes(e.block);
var near = (spot) => (e) => e.type === "near" && e.spot === spot;
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
  },
  {
    id: "m04",
    chapter: 1,
    title: "O valor de uma aventura",
    kind: "Economia",
    turnIn: "guild",
    goals: [{ id: "loot", text: "Juntar esp\xF3lios de monstros", count: 5, kind: "have", items: LOOT_FOR_SALE }],
    reward: { coins: 10 },
    bonusPerItem: SELL_PRICE,
    offer: "A guilda compra o que os monstros deixam: seda de aranha, presas e pelagem de lobo. Isso tem valor, e voltar \xE0 cidade com a mochila cheia pode ser lucrativo. Traga 5 itens de criaturas derrotadas: eu pago 10 moedas pelo contrato e mais o valor de cada item entregue.",
    prompt: "Aceita levar esp\xF3lios para a guilda?",
    accepted: "Combinado. Derrote criaturas fora da muralha e junte 5 esp\xF3lios (seda, presas, pelagem\u2026). Quando tiver, volte aqui: pago o contrato e cada item.",
    progress: "Ainda faltam esp\xF3lios de monstros: o contrato pede 5 itens (seda, presas, pelagem de lobo). Traga quando tiver.",
    complete: "\xD3timos esp\xF3lios! Isso rende bom dinheiro. Aqui est\xE3o as moedas do contrato e o valor de cada item que voc\xEA trouxe."
  },
  {
    id: "m05",
    chapter: 1,
    title: "A floresta das teias",
    kind: "Ca\xE7ada",
    turnIn: "guild",
    goals: [
      { id: "small", text: "Derrotar aranhas pequenas", count: 4, kind: "event", match: kills(["spider-small"]) },
      { id: "big", text: "Derrotar uma aranha grande", count: 1, kind: "event", match: kills(["spider-big"]) }
    ],
    reward: { coins: 22 },
    offer: "As aranhas est\xE3o se multiplicando na floresta e nas cavernas. O contrato pede 4 aranhas pequenas e 1 grande. As grandes mordem forte e aguentam mais golpes: leve vida cheia e uma boa arma.",
    prompt: "Aceita ca\xE7ar as aranhas?",
    accepted: "Contrato aceito. Derrote 4 aranhas pequenas e 1 grande e volte aqui. Cuidado com as teias!",
    progress: "As aranhas ainda n\xE3o foram contidas: faltam as 4 pequenas e a grande do contrato. Volte quando terminar.",
    complete: "As teias v\xE3o dar uma tr\xE9gua \xE0 cidade. Excelente trabalho! Aqui est\xE1 o seu pagamento."
  },
  {
    id: "m06",
    chapter: 1,
    title: "Protegendo nossas terras",
    kind: "Constru\xE7\xE3o",
    turnIn: "guild",
    goals: [
      { id: "fence", text: "Construir trechos de cerca", count: 6, kind: "event", match: placed([Block.FENCE, Block.FENCE_BIRCH, Block.FENCE_CHERRY]) },
      { id: "gate", text: "Construir uma porteira", count: 1, kind: "event", match: placed([Block.FENCE_GATE, Block.FENCE_GATE_BIRCH, Block.FENCE_GATE_CHERRY]) }
    ],
    reward: { coins: 25 },
    offer: "Os moradores querem refor\xE7ar uma \xE1rea perto da cidade para proteger as planta\xE7\xF5es. Preciso de 6 trechos de cerca e 1 porteira de madeira, constru\xEDdos por voc\xEA. Fa\xE7a as t\xE1buas, monte as pe\xE7as fora da muralha e me avise.",
    prompt: "Aceita construir a cerca?",
    accepted: "\xD3timo. Construa 6 trechos de cerca e 1 porteira fora da muralha (cercas e porteiras se fazem com t\xE1buas). Depois volte aqui.",
    progress: "A cerca ainda n\xE3o est\xE1 pronta: faltam trechos e a porteira. Construa fora da muralha e volte.",
    complete: "Agora sim, as terras est\xE3o protegidas! A porteira ficou \xF3tima. Aqui est\xE1 o seu pagamento."
  },
  {
    id: "m07",
    chapter: 1,
    title: "Terra para o futuro",
    kind: "Prepara\xE7\xE3o do terreno",
    turnIn: "guild",
    goals: [{ id: "soil", text: "Arar terra no terreno marcado", count: 12, kind: "probe", probe: "plot-tilled" }],
    reward: { coins: 18 },
    offer: "A cidade precisa ampliar a \xE1rea de produ\xE7\xE3o. Marquei um terreno perto do port\xE3o, com um contorno dourado no ch\xE3o: preciso que voc\xEA prepare 12 blocos de terra arada ali. Use a enxada, que vira a grama em terra pronta para plantar.",
    prompt: "Aceita preparar o terreno?",
    accepted: "Combinado! O terreno est\xE1 marcado com um contorno dourado perto do port\xE3o. Ara 12 blocos ali com a enxada e volte.",
    progress: "O terreno marcado ainda n\xE3o tem 12 blocos de terra arada. Use a enxada dentro do contorno dourado.",
    complete: "Terra boa e pronta para o futuro! A cidade agradece. Aqui est\xE1 o seu pagamento."
  },
  {
    id: "m08",
    chapter: 1,
    title: "Movimento nas margens",
    kind: "Ca\xE7ada",
    turnIn: "guild",
    goals: [{ id: "lizard", text: "Derrotar homens-lagarto", count: 4, kind: "event", match: kills(["lizard"]) }],
    reward: { coins: 30 },
    offer: "Pescadores e viajantes veem vultos nas margens dos rios: homens-lagarto, em grupos de tr\xEAs ou mais. S\xE3o mais r\xE1pidos e resistentes que lobos. O contrato pede 4 deles. V\xE1 preparado: leve armadura, comida e uma boa arma.",
    prompt: "Aceita ca\xE7ar os homens-lagarto?",
    accepted: "Contrato aceito. Procure os homens-lagarto perto dos rios, derrote 4 e volte aqui. Eles andam em grupo: n\xE3o se arrisque sozinho com pouca vida.",
    progress: "Ainda restam homens-lagarto nas margens: o contrato pede 4. Eles ficam perto dos rios, em grupo.",
    complete: "Quatro a menos! As margens ficam mais tranquilas. Aqui est\xE1 o seu pagamento."
  },
  {
    id: "m09",
    chapter: 1,
    title: "A fogueira dos goblins",
    kind: "Explora\xE7\xE3o",
    turnIn: "guild",
    goals: [
      { id: "camp", text: "Encontrar um acampamento de goblins", count: 1, kind: "event", match: near("goblin-camp") },
      { id: "goblin", text: "Derrotar goblins do acampamento", count: 2, kind: "event", match: kills(["goblin"]) }
    ],
    reward: { coins: 35 },
    offer: "H\xE1 fuma\xE7a de fogueira fora da muralha: goblins acamparam por perto, e em n\xFAmero. Preciso que voc\xEA ache a fogueira, derrube 2 deles para medir a for\xE7a do bando e me conte o que viu. Sem hero\xEDsmos: s\xE3o sete em volta do fogo.",
    prompt: "Aceita investigar o acampamento?",
    accepted: "Procure a fogueira dos goblins fora da muralha, derrote 2 goblins e volte aqui para me contar.",
    progress: "Ainda falta investigar o acampamento: ache a fogueira dos goblins e derrote 2 deles. Depois me conte.",
    complete: "Ent\xE3o s\xE3o mesmo sete, e organizados. Bom relat\xF3rio e bom trabalho. Aqui est\xE1 o seu pagamento."
  },
  {
    id: "m10",
    chapter: 1,
    title: "A amea\xE7a \xE0 Cidade do Despertar",
    kind: "Miss\xE3o final",
    turnIn: "guild",
    goals: [{ id: "goblin", text: "Derrotar os goblins restantes", count: 5, kind: "event", match: kills(["goblin"]) }],
    reward: { coins: 60 },
    offer: "Agora que sabemos a for\xE7a deles, \xE9 hora de acabar com a amea\xE7a. Restam 5 goblins no acampamento. Leve tudo o que tiver: armas, comida, vida cheia. A cidade inteira confia em voc\xEA.",
    prompt: "Aceita enfrentar os goblins restantes?",
    accepted: "Que a sorte acompanhe voc\xEA. Derrote os 5 goblins restantes e volte aqui.",
    progress: "A amea\xE7a ainda n\xE3o acabou: faltam 5 goblins. Volte quando o acampamento estiver limpo.",
    complete: "Conseguiu! A Cidade do Despertar est\xE1 a salvo, e a guilda reconhece o seu nome: de desconhecida a hero\xEDna da cidade. Aqui est\xE1 o seu pagamento. Mas guarde as armas com carinho: dizem que isso era s\xF3 o come\xE7o, e h\xE1 um mist\xE9rio maior por tr\xE1s desses goblins\u2026"
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
    const dist2 = Math.hypot(tx, ty);
    const targetInside = inRect(this.bounds, Math.floor(target.x), Math.floor(target.y));
    const cx = Math.floor(this.x);
    const cy = Math.floor(this.y);
    const steps = flow ? flow(cx, cy) : -1;
    const chasing = targetInside && (def.open ? dist2 <= def.sight : flow ? steps >= 0 && steps <= def.sight * 1.6 : dist2 < def.sight);
    if (chasing) {
      if (hasPoses(this.kind) && !this.chasing) this.alertAnim = GOBLIN_ALERT_SECONDS;
      this.chasing = true;
      const reach = this.reach;
      if (this.windupLeft > 0 || dist2 <= reach) {
        this.move(dt, 0, 0, world, fence);
        this.facing = Math.abs(tx) > Math.abs(ty) ? tx < 0 ? "left" : "right" : ty < 0 ? "up" : "down";
        return;
      }
      let dx = tx / dist2;
      let dy = ty / dist2;
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
  const idx2 = (x, y) => y * W + x;
  const inside2 = (x, y) => x >= 0 && y >= 0 && x < W && y < H;
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
      const i = idx2(x, y);
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
      for (let xx = x; xx < x + w; xx++) if (use[idx2(xx, yy)] === FREE || use[idx2(xx, yy)] === RESERVED) use[idx2(xx, yy)] = YARD;
    }
    y += lot - d;
    for (let yy = y; yy < y + d; yy++) {
      for (let xx = x; xx < x + w; xx++) {
        const i = idx2(xx, yy);
        if (use[i] !== WALLED && use[i] !== PLAZA && use[i] !== STREET) ground2[i] = Block.GRASS;
        use[i] = BUILT;
        objects[i] = Block.TOWN_PART;
        upper[i] = Block.AIR;
        buildingAt[i] = k;
      }
    }
    objects[idx2(x, y + d - 1)] = id;
    return b;
  };
  const rect = (x0, y0, x1, y1, fn) => {
    for (let y = Math.max(0, y0); y <= Math.min(H - 1, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(W - 1, x1); x++) fn(x, y, idx2(x, y));
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
  const carvable = (x, y) => inside2(x, y) && (use[idx2(x, y)] === FREE || use[idx2(x, y)] === STREET || use[idx2(x, y)] === PLAZA || use[idx2(x, y)] === RESERVED && y > COURT_Y1);
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
      nodes.push({ x, y, ok: carvable(x, y) && carvable(x + 1, y + 1) && use[idx2(x, y)] !== RESERVED });
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
    const dist2 = /* @__PURE__ */ new Map([[from, 0]]);
    const prev = /* @__PURE__ */ new Map();
    const open3 = /* @__PURE__ */ new Set([from]);
    while (open3.size) {
      let cur = -1;
      let cd = Infinity;
      for (const n of open3) {
        const d = dist2.get(n);
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
        if (nd < (dist2.get(n) ?? Infinity)) {
          dist2.set(n, nd);
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
      const i = idx2(x, y);
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
    const q = [idx2(sx, sy)];
    prev[q[0]] = q[0];
    let found = -1;
    for (let k = 0; k < q.length && found < 0; k++) {
      const c = q[k];
      const cx = c % W;
      const cy = Math.floor(c / W);
      for (const [ox, oy] of [[0, 1], [1, 0], [-1, 0], [0, -1]]) {
        const nx = cx + ox;
        const ny = cy + oy;
        if (!inside2(nx, ny)) continue;
        const n = idx2(nx, ny);
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
    if (use[idx2(sx, sy)] !== PLAZA) use[idx2(sx, sy)] = STREET;
  };
  for (const b of required) connect(b.door[0], b.door[1]);
  connect(castle.door[0], castle.door[1]);
  const alleyEnds = [];
  for (let n = 0; n < 400 && alleyEnds.length < 10; n++) {
    const x = 4 + ri(W - 8);
    const y = COURT_Y1 + 2 + ri(H - COURT_Y1 - 22);
    if (use[idx2(x, y)] !== STREET || main[idx2(x, y)]) continue;
    const [ox, oy] = [[1, 0], [-1, 0], [0, 1], [0, -1]][ri(4)];
    const len = 3 + ri(3);
    const cells = [];
    let ok2 = true;
    for (let k = 1; k <= len + 1 && ok2; k++) {
      const cx = x + ox * k;
      const cy = y + oy * k;
      for (const s of [-1, 0, 1]) {
        const tx = cx + (oy !== 0 ? s : 0);
        const ty = cy + (ox !== 0 ? s : 0);
        if (!inside2(tx, ty) || use[idx2(tx, ty)] !== FREE || keepOff[idx2(tx, ty)]) ok2 = false;
      }
      if (k <= len) cells.push([cx, cy]);
    }
    if (!ok2) continue;
    for (const [cx, cy] of cells) use[idx2(cx, cy)] = STREET;
    alleyEnds.push(cells[cells.length - 1]);
  }
  rect(0, 0, W - 1, H - 1, (_x, _y, i) => {
    if (use[i] === RESERVED && i > idx2(0, COURT_Y1)) use[i] = FREE;
  });
  rect(0, 0, W - 1, H - 1, (_x, _y, i) => {
    if (use[i] === STREET) ground2[i] = FLOOR;
  });
  const isFree = (x, y) => inside2(x, y) && use[idx2(x, y)] === FREE && !keepOff[idx2(x, y)];
  const isWalk = (x, y) => inside2(x, y) && (use[idx2(x, y)] === STREET || use[idx2(x, y)] === PLAZA);
  const setDecor = (x, y, id) => {
    const i = idx2(x, y);
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
    buildingAt[idx2(x, y)] = k;
  }
  const order = [];
  for (let y = WALL + 1; y < H - WALL - 1; y++) for (let x = WALL + 1; x < W - WALL - 1; x++) order.push(idx2(x, y));
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
      let ok2 = true;
      for (let yy = y - 1; yy <= y + d && ok2; yy++) {
        for (let xx = x - 1; xx <= x + w && ok2; xx++) {
          const inner = xx >= x && xx < x + w && yy >= y && yy < y + d;
          if (inner ? !isFree(xx, yy) : inside2(xx, yy) && (use[idx2(xx, yy)] === BUILT || use[idx2(xx, yy)] === YARD)) ok2 = false;
        }
      }
      if (!ok2) continue;
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
        const i = idx2(dx, y + d + k);
        use[i] = WALKWAY;
        ground2[i] = FLOOR;
      }
      place(id, x, y, "Casa", true);
    }
  }
  const lamps = [];
  rect(0, 0, W - 1, H - 1, (x, y, i) => {
    if (use[i] !== FREE || keepOff[i] || !nearStreet(x, y)) return;
    if (![[1, 0], [-1, 0], [0, 1], [0, -1]].some(([ox, oy]) => inside2(x + ox, y + oy) && main[idx2(x + ox, y + oy)])) return;
    if (lamps.some(([lx, ly]) => Math.abs(lx - x) + Math.abs(ly - y) < 7)) return;
    lamps.push([x, y]);
    setDecor(x, y, Block.LAMP);
  });
  alleyEnds.forEach(([x, y], k) => setDecor(x, y, k % 2 ? Block.BARREL : Block.CRATES));
  for (const b of required.filter((r) => r.id === Block.SMITHY || r.id === Block.SHOP_TOOLS || r.id === Block.SHOP_POTION)) {
    const x0 = b.x - TOWN_X0;
    const y1 = b.y - TOWN_Y0;
    for (const [x, y] of [[x0 - 1, y1], [x0 + b.w, y1], [x0 - 1, y1 - 1], [x0 + b.w, y1 - 1]]) {
      if (inside2(x, y) && use[idx2(x, y)] === FREE) setDecor(x, y, h(x, y, 9) < 0.5 ? Block.BARREL : Block.CRATES);
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
    const roomy = [-1, 0, 1].every((oy) => [-1, 0, 1].every((ox) => inside2(x + ox, y + oy) && use[idx2(x + ox, y + oy)] === FREE));
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
function goddessIsoKind(equipped, attackTool, attacking, moving) {
  if (attacking && attackTool && TOOLS[attackTool].swings) return `goddess-iso-${attackTool}-attack`;
  if (equipped) return `goddess-iso-${equipped}`;
  return moving ? "goddess-iso" : "goddess-iso-idle";
}
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
    let placed2 = 0;
    for (let i = 0; i < 400 && placed2 < count; i++) {
      const a = hash2(world.seed, i, salt) * Math.PI * 2;
      const r = (3 + hash2(world.seed, i, salt + 1) * 6) * SUBDIV;
      const cx = Math.floor(x + Math.cos(a) * r);
      const cy = Math.floor(y + Math.sin(a) * r);
      if (!world.isWalkable(cx, cy) || world.getGround(cx, cy) !== Block.GRASS) continue;
      const animal = new FarmAnimal(kind, cx + 0.5, cy + 0.5, this.rand);
      if (this.all().some((w) => animal.overlapsAt(animal.x, animal.y, w))) continue;
      this.horses.push(animal);
      placed2++;
    }
  }
  /**
   * Animais domésticos na Vila Camponesa (`world/village.ts`, v0.93.91; v0.93.106: 3 de cada, cavalos incluídos): ovelhas, vacas, galinhas, capivaras e cavalos nascem DENTRO da vila, cada
   * espécie numa faixa de grama da planta dela (`VILLAGE_PENS`, em células da vila); a posição sai da seed, só em grama andável e livre.
   * Devolve quantos de cada espécie nasceram.
   */
  spawnVillageAnimals(world, have = {}) {
    const v = world.village;
    const placed2 = { sheep: have.sheep ?? 0, cow: have.cow ?? 0, chicken: have.chicken ?? 0, capybara: have.capybara ?? 0, horse: have.horse ?? 0 };
    if (!v) return placed2;
    for (const pen of VILLAGE_PENS) {
      for (let i = 0; i < 400 && placed2[pen.kind] < pen.count; i++) {
        const lx = pen.x0 + Math.floor(hash2(world.seed, i, pen.salt) * (pen.x1 - pen.x0 + 1));
        const ly = pen.y0 + Math.floor(hash2(world.seed, i, pen.salt + 1) * (pen.y1 - pen.y0 + 1));
        const cx = v.area.x0 + lx, cy = v.area.y0 + ly;
        if (!world.isWalkable(cx, cy) || world.getGround(cx, cy) !== Block.GRASS || world.getObject(cx, cy) !== Block.AIR) continue;
        const animal = pen.kind === "sheep" ? new Sheep(cx + 0.5, cy + 0.5) : new FarmAnimal(pen.kind, cx + 0.5, cy + 0.5, this.rand);
        if (this.all().some((w) => animal.overlapsAt(animal.x, animal.y, w))) continue;
        if (animal instanceof Sheep) this.npcs.push(animal);
        else this.horses.push(animal);
        placed2[pen.kind]++;
      }
    }
    return placed2;
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
      const inside2 = this.breeders().filter((a) => kindOf(a) === kind && inVillage(a));
      inside2.sort((a, b) => Number(a.baby) - Number(b.baby));
      for (const extra of inside2.slice(VILLAGE_ANIMALS_EACH)) {
        if (extra instanceof Sheep) this.npcs.splice(this.npcs.indexOf(extra), 1);
        else this.horses.splice(this.horses.indexOf(extra), 1);
        this.courting.delete(extra);
        removed++;
      }
      have[kind] = Math.min(inside2.length, VILLAGE_ANIMALS_EACH);
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
      const inside2 = (cx, cy) => cx > x0 && cx < x1 && cy > y0 && cy < y1;
      const cells = [];
      for (let cy = y0 + 1; cy < y1; cy++) for (let cx = x0 + 1; cx < x1; cx++) if (vl.ground[(cy - y0) * vl.w + (cx - x0)] === Block.PATH) cells.push([cx, cy, hash2(world.seed ^ 20905, cx, cy)]);
      cells.sort((p, q) => p[2] - q[2]);
      const homes = [];
      for (const [cx, cy] of cells) {
        if (homes.length >= villageCount) break;
        if (homes.every(([hx, hy]) => Math.hypot(hx - cx, hy - cy) >= 4 * SUBDIV)) homes.push([cx, cy]);
      }
      makeResidents(world.seed, "village", villageCount, townNames.map((r) => r.name)).forEach((r, i) => {
        if (homes[i]) this.placeVillager(world, homes[i][0], homes[i][1], r.base, inside2, r);
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
    for (const pack2 of world.lizardPacks) {
      if (wake && !wake(pack2.x + 0.5, pack2.y + 0.5)) continue;
      const bounds = lizardRoam(pack2.x, pack2.y);
      const existing = this.monsters.filter((m) => m.kind === "lizard" && Math.abs(m.homeX - (pack2.x + 0.5)) <= 5 * SUBDIV && Math.abs(m.homeY - (pack2.y + 0.5)) <= 5 * SUBDIV);
      if (existing.length >= LIZARD_PACK_SIZE) continue;
      for (const [x, y] of pack2.slots) {
        if (!world.isWalkable(x, y)) continue;
        const px = x + 0.5, py = y + 0.5;
        if (existing.some((m) => Math.hypot(m.homeX - px, m.homeY - py) < 0.2)) continue;
        this.monsters.push(new Monster("lizard", px, py, bounds, this.rand, px, py));
      }
      this.livePacks.add(`l:${pack2.x},${pack2.y}`);
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
    const near2 = (x, y, r) => hs.some((h) => Math.abs(h.x - x) <= r && Math.abs(h.y - y) <= r);
    this.spawnGoblins(world, (x, y) => near2(x, y, PACK_SPAWN_RADIUS) && !this.livePacks.has(`g:${Math.floor(x)},${Math.floor(y)}`));
    this.spawnLizards(world, (x, y) => near2(x, y, PACK_SPAWN_RADIUS) && !this.livePacks.has(`l:${Math.floor(x)},${Math.floor(y)}`));
    for (const key of [...this.livePacks]) {
      const [kind, xy] = key.split(":");
      const [x, y] = xy.split(",").map(Number);
      if (near2(x + 0.5, y + 0.5, PACK_DROP_RADIUS)) continue;
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
      const inside2 = inRect(m.bounds, Math.floor(h.x), Math.floor(h.y));
      const d = Math.hypot(h.x - m.x, h.y - m.y);
      if (inside2 && !bestInside || inside2 === bestInside && d < bestD) {
        best = h;
        bestD = d;
        bestInside = inside2;
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
        let near2 = null, nd = NOTICE_RANGE;
        for (const h of this.hunters()) {
          const d = Math.hypot(h.x - v.x, h.y - v.y);
          if (d <= nd) {
            near2 = h;
            nd = d;
          }
        }
        if (near2) v.faceTo(near2.x, near2.y);
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
      const near2 = this.hunters().some((p) => Math.hypot(p.x - r.x, p.y - r.y) < RESPAWN_CLEARANCE);
      if (near2 || this.all().some((w) => m.overlapsAt(m.x, m.y, w))) {
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
    const inside2 = d ? this.hunters().filter((p) => !p.dead && inRect(d.area, Math.floor(p.x), Math.floor(p.y))) : [];
    if (!d || inside2.length === 0) {
      this.flow = null;
      return;
    }
    this.flowTimer -= dt;
    if (this.flow && this.flowTimer > 0) return;
    this.flowTimer = FLOW_EVERY;
    const a = d.area;
    const w = a.x1 - a.x0 + 1;
    const h = a.y1 - a.y0 + 1;
    const dist2 = this.flow && this.flow.length === w * h ? this.flow.fill(-1) : new Int32Array(w * h).fill(-1);
    const q = new Int32Array(w * h);
    let head = 0;
    let tail = 0;
    for (const p of inside2) {
      const start = (Math.floor(p.y) - a.y0) * w + (Math.floor(p.x) - a.x0);
      if (dist2[start] === 0) continue;
      dist2[start] = 0;
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
        if (dist2[j] >= 0 || world.standHeight(a.x0 + nx, a.y0 + ny) !== 0) continue;
        dist2[j] = dist2[i] + 1;
        q[tail++] = j;
      }
    }
    this.flow = dist2;
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
      const kind = this.character === "goddess-iso" ? goddessIsoKind(p.equipped, p.attackTool, p.attacking, p.moving) : this.character === "goddess" ? "goddess" : sitting ? `${b}-sit` : heroActorKind(b, p.equipped, p.attackTool, p.attacking);
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
  constructor(cx, cy, maxStack2 = MAX_STACK) {
    this.cx = cx;
    this.cy = cy;
    this.maxStack = maxStack2;
    this.levels = Array.from({ length: maxStack2 }, () => new Uint8Array(CHUNK_SIZE * CHUNK_SIZE));
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
  /** Pede o redesenho sem mudar dados (vizinho de uma célula do rio que mudou na borda do chunk). */
  touch() {
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
    name: "Santu\xE1rio",
    ground: Block.ISO_G_GRASS,
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
  constructor(seed, ground2, layers = [], biome = BIOMES.celestial) {
    this.biome = biome;
    this.seed = seed >>> 0;
    this.cell = { ground: ground2, object: layers[0] ?? Block.AIR, upper: layers[1] ?? Block.AIR };
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
    return this.cell.object;
  }
  upperAt() {
    return this.cell.upper;
  }
  biomeAt() {
    return this.biome;
  }
  generateChunk(_cx, _cy, ground2, objects, upper) {
    ground2.fill(this.cell.ground, 0, CHUNK_SIZE * CHUNK_SIZE);
    objects.fill(this.cell.object);
    upper.fill(this.cell.upper);
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

// src/world/fazendaData.ts
var FAZENDA_ALTURAS = [
  "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwonnowwwwwwwwwwwwwwwwwwwwww",
  "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwonnowwwwwwwwwwwwwwwwwwwwww",
  "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwonnowwwwwwwwwwwwwwwwwwwwww",
  "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwvonnovwwwwwwwwwwwwwwwwwwwww",
  "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwvonnnuwwwwwwwwwwwwwwwwwwwww",
  "wwwwwwwwwwwwwwwwwwwwwwwwwwvvvwwwwwwwwvonnnqwwwwwwwwwwwwwwwwwwwww",
  "wwwwwwwwwwwwwwwvvvuuuvvvwwvvvwwwwwwwwwojiijowwwwvvvuuuvvvwwwwwww",
  "wwwwwwwwwwwvvutsrrrqrrrstuuuuwwwwwwwwwrdaaaajuutsrrrqrrrstuuvwww",
  "wwwwwwwvvutsrqppooooooopprtttuvvwwwwwwwl43233gqppoooooooppqrstuv",
  "ttuuttssrqpooooooooooooooqssrqrssttuuttn8211126jooooooooooooopqr",
  "pqqqqppooooooooooooooooooprrqoooppqqqqpph72211226gnooooooooooooo",
  "ooooooooooooooooooooooooopqqpoooooooooooooj7211123enoooooooooooo",
  "oooooooooooooooooooooooooooooooooooooooooooooc2112iooooooooooooo",
  "oooooooooooooooooooooooooonnnoooooooooooooooon4114nooooooooooooo",
  "oooooooooooooooooooooooonnmlllllllmmnnoooooool2117oooooooooooooo",
  "ooooooooooooooooooonnmlkjjjkkjhhhhiijkllmnooof212coooooooooooooo",
  "nnooooooooooooonnmlkjihhgggijigggggggghijjklm6112joooooooooonnml",
  "jklmmmnnnnnmmllkjihhggggggghhhhggggggggggghf41112fmnnnnnmmllkjih",
  "ghhiijjjjjjjiihhggggggggggggggggggggggggf82111125djjjjjjiiihgggg",
  "ggggggggggggggggggggggggggggfeefggggggd621111127dggggggggggggggg",
  "gggggggggggggggggggggggggggggdddgggggb42111128fggggggggggggggggg",
  "ggggggggggggggggggggggggfffffdccegggc4111126eggggggggggggggggfff",
  "ggggggggggggggggggffeedcccbbbbbbbdea3111128fgggggggggggffeedcccb",
  "cdefffggggggfffeedcbaa99988888aaaa8311113bfggggggfffeedcbaa99988",
  "99abbccddddcccbaa99888888888889999621114abccddddcccbaa9988888888",
  "8888899999999888888888888888888999511127889999999988888888888888",
  "8888888888888888888888888888888888411148888888888888888888888888",
  "8888888888888888888888888888888888311168888888888888888888888888",
  "8888888888888888888888888888888888211278888888888888888888888888",
  "8888888888888888888888888888888888211288888888888888888888888888",
  "8888888888888888888888888888888888211278888888888888888888888888",
  "8888888888888888888888888888888888411127888888888888888888888888",
  "8888888888888888888888888888888888721112788888888888888888888888",
  "8888888888888888888888888888888888872111388888888888888888888888",
  "8888888888888888888888888888888888887111278888888888888888888888",
  "8888888888888888888888888888888888887211278888888888888888888888",
  "8888888888888888888888888888888888884111288888888888888888888888",
  "8888888888888888888888888888888888872111488888888888888888888888",
  "8888888888888888888888888888888888861111688888888888888888888888",
  "8888888888888888888888888888888888861111588888888888888888888888",
  "8888888888888888888888888888888888862111148888888888888888888888",
  "8888888888888888888888888888888888884111112588888888888888888888",
  "8888888888888888888888888888888888888521111137888888888888888888",
  "8888888888888888888888888888888888888742111111257888888888888888",
  "8888888888888888888888888888888888888875311111111246888888888888",
  "8888888888888888888888888888888888888888886311111112468888888888",
  "8888888888888888888888888888888888888888888886311111136888888888",
  "8888888888888888888888888888888888888888888888763111111478888888",
  "8888888888888888888888888888888888888888888887543221101137888888",
  "8888888888888888888888888888888888888888888875321111111116888888",
  "8888888888888888888888888888888888888888888764211111111115788888",
  "8888888888888888888888888888888888888888888753111111111013788888",
  "8888888888888888888888888888888888888888888753111111111112788888",
  "8888888888888888888888888888888888888888888764211111111111788888",
  "8888888888888888888888888888888888888888888875321111111111688888",
  "8888888888888888888888888888888888888888888887542211221012788888",
  "8888888888888888888888888888888888888888888888765444411014888888",
  "8888888888888888888888888888888888888888888888887777310127888888",
  "8888888888888888888888888888888888888888888888888887110158888888",
  "8888888888888888888888888888888888888888888888888886101288888888",
  "8888888888888888888888888888888888888888888888888885101488888888",
  "8888888888888888888888888888888888888888888888888884101688888888",
  "8888888888888888888888888888888888888888888888888883101788888888",
  "8888888888888888888888888888888888888888888888888882001888888888"
];
var FAZENDA_AGUA = [
  "......................................qqqq......................",
  "......................................qqqq......................",
  "......................................qqqq......................",
  "......................................qqqq......................",
  "......................................qqqq......................",
  "......................................qqqqq.....................",
  ".......................................mmmm.....................",
  ".......................................ddddd....................",
  "........................................66666...................",
  ".........................................55555..................",
  "..........................................555555................",
  "............................................555555..............",
  "..............................................5555..............",
  "..............................................5555..............",
  "..............................................555...............",
  "..............................................555...............",
  "..............................................444...............",
  "............................................44444...............",
  "..........................................444444................",
  "........................................4444444.................",
  "......................................4444444...................",
  "......................................44444.....................",
  "....................................444444......................",
  "...................................444444.......................",
  "...................................44444........................",
  "...................................4444.........................",
  "..................................44444.........................",
  "..................................4444..........................",
  "..................................4444..........................",
  "..................................4444..........................",
  "..................................4444..........................",
  "..................................44444.........................",
  "...................................44444........................",
  "....................................44444.......................",
  ".....................................4444.......................",
  ".....................................4444.......................",
  ".....................................4444.......................",
  "....................................44444.......................",
  "....................................4444........................",
  "....................................4444........................",
  "....................................444444......................",
  ".....................................444444.....................",
  "......................................4444444...................",
  "......................................444444444.................",
  "........................................44444444444.............",
  "...........................................4444444444...........",
  "..............................................44444444..........",
  "................................................44444444........",
  "...............................................4444444444.......",
  "..............................................44444444444.......",
  ".............................................444444444444.......",
  ".............................................4444444444444......",
  ".............................................4444444444444......",
  ".............................................4444444444444......",
  "..............................................444444444444......",
  "...............................................44444444444......",
  ".....................................................4444.......",
  "....................................................44444.......",
  "....................................................4444........",
  "....................................................4444........",
  "....................................................444.........",
  "....................................................444.........",
  "...................................................4444.........",
  "...................................................4444........."
];

// src/world/sanctuaryFazenda.ts
var FAZENDA_N = 64;
var MAX_H = 7;
var FAZENDA_AREAS = {
  patio: { c0: 7, c1: 26, r0: 28, r1: 33 },
  milho: { c0: 5, c1: 17, r0: 35, r1: 41 },
  aboboras: { c0: 21, c1: 30, r0: 35, r1: 41 },
  horta: { c0: 5, c1: 17, r0: 45, r1: 51 },
  trigo: { c0: 21, c1: 30, r0: 45, r1: 51 },
  talhao: { c0: 5, c1: 17, r0: 55, r1: 59 }
};
var dec = (ch) => parseInt(ch, 36) / 4;
var at = (r, c, n = FAZENDA_N) => r * n + c;
function fazendaHeights() {
  const N = FAZENDA_N;
  const h = new Uint8Array(N * N);
  const wet = new Uint8Array(N * N);
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      const i = at(r, c);
      const w = FAZENDA_AGUA[r][c];
      if (w !== ".") {
        wet[i] = 1;
        h[i] = Math.max(1, Math.min(MAX_H, Math.round(dec(w))));
      } else h[i] = Math.max(1, Math.min(MAX_H, Math.round(dec(FAZENDA_ALTURAS[r][c]))));
    }
  }
  const nb = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  for (let pass = 0; pass < 12; pass++) {
    let changed = false;
    for (let r = 0; r < N; r++) {
      for (let c = 0; c < N; c++) {
        const i = at(r, c);
        if (wet[i]) continue;
        for (const [dx, dy] of nb) {
          const rr = r + dy, cc = c + dx;
          if (rr < 0 || cc < 0 || rr >= N || cc >= N) continue;
          const j = at(rr, cc);
          if (wet[j]) {
            if (h[i] < h[j]) {
              h[i] = h[j];
              changed = true;
            }
            continue;
          }
          if (h[i] > h[j] + 1) {
            h[i] = h[j] + 1;
            changed = true;
          }
        }
      }
    }
    if (!changed) break;
  }
  return { h, wet };
}
function buildFazenda(seed) {
  const N = FAZENDA_N;
  const { h, wet } = fazendaHeights();
  const top = new Uint16Array(N * N).fill(Block.GRASS);
  const obj = new Uint16Array(N * N);
  const keep = new Uint8Array(N * N);
  const custom = /* @__PURE__ */ new Map();
  const inRect2 = (r, c, a, m = 0) => c >= a.c0 - m && c <= a.c1 + m && r >= a.r0 - m && r <= a.r1 + m;
  const ok2 = (r, c) => r >= 0 && c >= 0 && r < N && c < N;
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      const i = at(r, c);
      if (wet[i]) {
        top[i] = RIO_LAGO;
        keep[i] = 1;
        continue;
      }
      if (h[i] > 2) continue;
      for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) if (ok2(r + dr, c + dc) && wet[at(r + dr, c + dc)]) {
        top[i] = Block.SAND;
        keep[i] = 1;
      }
    }
  }
  const A = FAZENDA_AREAS;
  for (let r = A.patio.r0; r <= A.patio.r1; r++) for (let c = A.patio.c0; c <= A.patio.c1; c++) {
    top[at(r, c)] = Block.PATH;
    keep[at(r, c)] = 1;
  }
  const hut = (c0, r0, w, hh) => {
    for (let r = r0; r < r0 + hh; r++) {
      for (let c = c0; c < c0 + w; c++) {
        const i = at(r, c);
        keep[i] = 1;
        const edge = c === c0 || c === c0 + w - 1 || r === r0 || r === r0 + hh - 1;
        const corner = (c === c0 || c === c0 + w - 1) && (r === r0 || r === r0 + hh - 1);
        const wall = corner ? Block.OAK_LOG : Block.OAK_PLANKS;
        const door = r === r0 + hh - 1 && c === c0 + 2;
        custom.set(i, edge ? [Block.STONE, Block.OAK_PLANKS, door ? Block.OAK_DOOR : wall, door ? Block.OAK_PLANKS : wall, Block.OAK_PLANKS] : [Block.STONE, Block.OAK_PLANKS, Block.AIR, Block.AIR, Block.OAK_PLANKS]);
      }
    }
  };
  hut(9, 28, 6, 5);
  hut(19, 28, 6, 5);
  for (const [c, r] of [[17, 29], [17, 32]]) obj[at(r, c)] = Block.ISO_LANTERN;
  const field = (a, kinds) => {
    for (let r = a.r0 - 1; r <= a.r1 + 1; r++) {
      for (let c = a.c0 - 1; c <= a.c1 + 1; c++) {
        const i = at(r, c);
        keep[i] = 1;
        if (inRect2(r, c, a)) {
          top[i] = Block.TILLED;
          const kind = kinds[(r - a.r0) % kinds.length];
          if (kind) obj[i] = cropId(kind, 15);
        } else obj[i] = r === a.r1 + 1 && c === Math.floor((a.c0 + a.c1) / 2) ? Block.FENCE_GATE : Block.FENCE;
      }
    }
  };
  field(A.milho, ["wheat"]);
  field(A.aboboras, ["tomato"]);
  field(A.horta, ["carrot", "potato"]);
  field(A.trigo, ["wheat"]);
  field(A.talhao, [null]);
  const BR = 31;
  let started = false;
  for (let c = A.patio.c1 + 1; c < N; c++) {
    const i = at(BR, c);
    if (wet[i]) {
      started = true;
      custom.set(i, [...Array(Math.max(0, h[i] - 1)).fill(Block.STONE), RIO_LAGO, Block.OAK_PLANKS]);
      keep[i] = 1;
    } else if (started) {
      top[i] = Block.OAK_PLANKS;
      keep[i] = 1;
      break;
    }
  }
  const free = (r, c) => ok2(r, c) && top[at(r, c)] === Block.GRASS && !keep[at(r, c)] && !obj[at(r, c)] && !custom.has(at(r, c));
  const near2 = (r, c, d, f) => {
    for (let dr = -d; dr <= d; dr++) for (let dc = -d; dc <= d; dc++) if (ok2(r + dr, c + dc) && f(at(r + dr, c + dc))) return true;
    return false;
  };
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      const i = at(r, c);
      if (!free(r, c) || near2(r, c, 2, (j) => !!keep[j] && !wet[j] && top[j] !== Block.SAND)) continue;
      const x = c + 32, y = r - 32;
      const p = hash2(seed, x, y);
      if (p < (h[i] >= 4 ? 0.05 : 0.012) && !near2(r, c, 2, (j) => ISO_TREE_IDS.has(obj[j]))) {
        const pick = Math.floor(hash2(seed ^ 81, x, y) * (ISO_TREE_SET.length + 1));
        obj[i] = pick === 0 ? Block.ISO_TREE : ISO_TREE_SET[pick - 1][0];
      }
    }
  }
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      const i = at(r, c);
      if (!free(r, c)) continue;
      const q = hash2(seed ^ 43, c + 32, r - 32);
      const treeNear = near2(r, c, 2, (j) => ISO_TREE_IDS.has(obj[j]));
      const bank = near2(r, c, 2, (j) => !!wet[j]);
      if (treeNear && q < 0.1 || bank && q < 0.06) obj[i] = q < 0.02 ? Block.ISO_BUSH_L : q < 0.04 ? Block.ISO_BUSH_M : Block.ISO_BUSH_S;
      else if (h[i] <= 2 && q > 0.9 && hash2(seed ^ 60, c >> 2, r >> 2) < 0.35) obj[i] = FLOWER_BLOCKS[Math.floor(hash2(seed ^ 119, c >> 1, r >> 1) * FLOWER_BLOCKS.length)];
    }
  }
  const out = [];
  for (let i = 0; i < N * N; i++) {
    const c = custom.get(i);
    if (c) {
      out.push(c);
      continue;
    }
    const hh = h[i];
    let col;
    if (wet[i]) col = [...Array(hh - 1).fill(Block.STONE), RIO_LAGO];
    else if (hh === 1) col = [top[i]];
    else if (hh === 2) col = [Block.STONE, top[i]];
    else col = [...Array(hh - 1).fill(Block.STONE), top[i]];
    if (obj[i] && !wet[i] && hh <= MAX_H) col[hh] = obj[i];
    out.push(col);
  }
  return out;
}

// src/world/valeGoblinData.ts
var VALE_ALTURAS = [
  "opqrsssrqpomkjjklmnoppnlkkmnopqqqponlllnnmlkjhfeffghkllnpqrsuutp",
  "qrrsttsrrrrpnkjjlmnopponmllmnopppppommmnmlkjigfeffgilmmorstuuvtr",
  "rsstuutssssroliikmnoppoonllmmnnoonnnnmmmmlkihgeeefhjllnpsuvvvvus",
  "stuuvvutttsrpliiklnoooonmlkkllmmmmmmmmmllkjhgfeefghjklnpsuvvvvut",
  "tuvwwvvutsrqolihjlmnnnnmlkjijkklllkllllkjiigfeddfghijlnprtuvvvvu",
  "uwwwwwutsrqpnkihiklmmmmlkjhghhijjjjjkkjjihgfedcdegghjlnprstuvvvu",
  "vwwwwwutrqpnljhggijkkkkjihgffgghhhghiiihgfeedccdefghikmoqrtuuuut",
  "vwwwwvusrqomljhfefghiihgffeddeefffffgggfeedccbcddefghjlnpqssttts",
  "vvvvvutsqpnmkigeddefffeeddccbccdddddefeedccbabbccdefhjkmopqrrrrq",
  "uuuuutsqomlkihfdcaccddccbba999abbbbcdddcbbaa9abbccdeghjlmopqqqpp",
  "rssssrqnlkjihfdca9aaaaaaa988788899abbbbaaa9999aabbcdfgijlmoopooo",
  "ttrqqpoljihhgecb9889999887766667788999998888899aabccdfgiklmmnnnn",
  "utrpoomjihgfecba977777776655555666777777777788899abbceghijkkllll",
  "utrqnmkjhfedcba98766666555444445556666666667778899aabdefgiklmmmm",
  "tssrpmkihfeca987665555554443333444555555555667778899abdfhjlmnoop",
  "sssrpnljhgeca876655544444333333333444454455566677789abdgikmnoopq",
  "rsrqpnlkigeca866554444443333333333344444455555666789abdgikmnoopp",
  "qqqponlkigeb9865544444333333333333334444444555556679abdgikmnoopp",
  "ppponmkjhfdb9765444443333333333333333333444444555678abdgikmooppq",
  "nnnmmkjigfdb9765444443333333333333333333344444455568acegikmoppqr",
  "lmmlkjihfeca8755444433333333333333333333333334444568acegikmnopqq",
  "jkkjjihgedba8755444433333333333333333333333333444467aceghjlmnopq",
  "lkjihgfedca987655444433333333333333333333333333444579bdfgijlmnoo",
  "onmljihgedca98755544433333333333333333333333333344579bcefhijlmnn",
  "rqomkiihgedba8765544433333333333333333333333333334568abdefgijkll",
  "srpnljjhgfdb986555443333333333333333333333333233345689abcefgijjl",
  "srqpnmkigedb9765554433333333333333333333333332333456789abcdeghkl",
  "srrqpomjhfdb97655544333333333333333333333333322334557899bcefgikl",
  "tsrrqonkigec9765554433333333333333333333333333333345789acdefhjkl",
  "utsrqpnkigeca76554433333333333333333333333333333334678abceffhijk",
  "uutrqomkigeca86554433333333333333333333333333333345678abceffghij",
  "uutsqomkhfeca87554433333333333333333333333333333345678abcdefghjk",
  "uutsqoljhfdba87554433333333333333333333333333333455679abcdeghjkm",
  "ttsrqnljhedb986654433333333333333333333333333334456789abcdegikmo",
  "tsrqpnligecb986655443333333333333333333333333344567789abcdehjlno",
  "rrqpomkifdca976655443333333333333333333333334444578889bccdehjlmo",
  "qqponljhfdca9765544433333333333333333333333444456899abcccdegikmn",
  "poonlkigedba97655444333333333333333333333344445679abbcddddegikln",
  "nnnmkjhgecba8765444333333333333333333333344455678abbcdddeeefhjlm",
  "nmlkjihfdca98765444333333333333333333333344455678abccdddefffhikl",
  "mlkjiihedba87655444333333333333333333333344556689abbcddfgihghijk",
  "lkjjjjhedcb97655444433333333333333333333344556789abbcdehjlkjikmm",
  "mmllljhedcca8765544433333333333344444444444556789abbcegjlmmllnop",
  "ooonmkheddcba875544433333333344444444444444456789bbcdgjlmmnnopqr",
  "pqqpnlhfdccba86554444333333334444444444444445679abcdfhkmmnooopqq",
  "rrrqomjgedcb976554444333344334455544444444445679abcegikmnopppqqq",
  "tsrqpnkigedba86655444333344444555555555555556689abdfhjlmnpppqrss",
  "ttsrpoljhfeca97665444333344444566655656666666679abdfhjkmopqqrstt",
  "ttsrqomkjhedb98765544333445545567766666666666679abdfhjkmopqrrsts",
  "ssrqpomljhfdba887665444445554456677787666666668abcdfgijlnoqrrrrr",
  "rrrqpnmkjhfdb9877766656665555455678898666666668abcdefhikmnpqqqqq",
  "qqpoomlkigfeb98887767777777665666789a9766666679abccdfghjkmopqqqq",
  "ooonmlkiiihfca9987767888988777877789a9766666679bbccdefgijlnopqqq",
  "nmmmlllkkkjhedcb9877899aa99889998899aa87666689bccccddeghjkmopppp",
  "mnnmmnnnnmljhgfdb988aabbbaaa999aa9aabdeefgghgggffedcdeghikmnoooo",
  "ppoooooponmkjigfca9accdddccba9abcbbbcefghijjkkjhhgedfhjiijlmnnnn",
  "srqqppooonmkjihfcbacdeffedddcbbcddbcdeefhjklmlkjihgfhjlkjjloqqpp",
  "tttrqpppoomlkihecbbcefgggffgfeeeedbcdeeghklnonlkkjihikmmmmoqrsrq",
  "uutsrqqqqpomkjhfdbcefghhiiiiihhgfdcdefghjmopponmlkjijlmoopqrsssr",
  "tuttsssrrqpnljhgedefhijjkkkjkjjhfdcdfghjmoqqqpomlkjiklnprsssttts",
  "ttutuutsrqomkjhgefgijklmmmllllkigecefec666666hkmlkkklmoqstuuuuts",
  "ttuvvuusrpomkihffgijlnopoonnmlljifeefd66666666imlkkkmnprtuvvvutr",
  "stuuuutsrpnmkihffhklnopqqpponmlljhffec66666666gkmkjklnprsuvvvusq",
  "rsssstssqpnlkihfgilnopqrrqpponmlkjhgd6666666666imljklnpqstuvutsq"
];
var VALE_SUPERFICIES = [
  "rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrgrrrrrrrrrrrrrrrr",
  "rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrgrrrrrrrrrrrrrrrr",
  "rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrgggrrrrrrrrrrrrrrr",
  "rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrggrrrrrrrrrrrrrrrr",
  "rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrgggrrrrrrrrrrrrrrrr",
  "rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrgggggrrrrrrrrrrrrrrr",
  "rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrgggggggrrrrrrrrrrrrrrr",
  "rrrrrrrrrrrrrrrrgrrrrrrrrrgggggrrrrrrrrrggggggggggrrrrrrrrrrrrrr",
  "rrrrrrrrrrrrrrrggggrrrgggggggggggggggrgggggggggggggrrrrrrrrrrrrr",
  "rrrrrrrrrrrrrrrgggggggggggggggggggggggggggggggggggggrrrrrrrrrrrr",
  "rrrrrrrrrrrrrrggggggggggggggggggggggggggggggggggggggrrrrrrrrrrrr",
  "rrrrrrrrrrrrrggggggggggggggggggggggggggggggggggggggggrrrrrrrrrrr",
  "rrrrrrrrrrrrggggggggggggggggggggggggggggggggggggggggggrrrrrrrrrr",
  "rrrrrrrrrrgggggggggggggggggggggggggggggggggggggggggggggrrrrrrrrr",
  "rrrrrrrrrrgggggggggggggggggggggggggggggggggggggggggggggrrrrrrrrr",
  "rrrrrrrrrrgggggggggggggggggggggggggggggggggggggggggggggrrrrrrrrr",
  "rrrrrrrrrrgggggggggggggggggggggggggggggggggggggggggggggrrrrrrrrr",
  "rrrrrrrrrrgggggggggggggggggggggggggggggggggggggggggggggrrrrrrrrr",
  "rrrrrrrrrrgggggggggggggggggggggggggggggggggggggggggggggrrrrrrrrr",
  "rrrrrrrrrrgggggggggggggggggggggggggggggggggggggggggggggrrrrrrrrr",
  "rrrrrrrrrggggggggggggggggggggggggggggggggggggggggggggggrrrrrrrrr",
  "rrrrrrrrgggggggggggggggggggggggggggggggggggggggggggggggrrrrrrrrr",
  "rrrrrrrggggggggggggggggggggggggggggggggggggggggggggggggrrrrrrrrr",
  "rrrrrrrrggggggggggggggggggggggggggggggggggggggggggggggggrrrrrrrr",
  "rrrrrrrrrggggggggggggggggggggggggggggggggggggggggggggggggrrrrrrr",
  "rrrrrrrrrrggggggggggggggggggggggggggggggggggggggggggggggggrrrrrr",
  "rrrrrrrrrgggggggggggggggggggggttttggggggggggggggggggggggggggrrrr",
  "rrrrrrrrrrggggggggggggggggggttttttttgggggggggggggggggggggggrrrrr",
  "rrrrrrrrrrggggggggggggggggggttttttttgggggggggggggggggggggggrrrrr",
  "rrrrrrrrrrgggggggggggggggggttttttttttgggggggggggggggggggggrrrrrr",
  "rrrrrrrrrrgggggggggggggggggttttttttttgggggggggggggggggggggrrrrrr",
  "rrrrrrrrrrggggggggggggggggggttttttttgggggggggggggggggggggggrrrrr",
  "rrrrrrrrrrggggggggggggggggggttttttttgggggggggggggggggggggggrrrrr",
  "rrrrrrrrrgggggggggggggggggggggttttgggggggggggggggggggggggggrrrrr",
  "rrrrrrrrrggggggggggggggggggggggtttgggggggggggggggggggggggggrrrrr",
  "rrrrrrrrrggggggggggggggggggggggtttgggggggggggggggggggggggggrrrrr",
  "rrrrrrrrrggggggggggggggggggggggtttgggggggggggggggggggggggggrrrrr",
  "rrrrrrrrgggggggggggggggggggggggttttggggggggggggggggggggggggrrrrr",
  "rrrrrrrrgggggggggggggggggggggggtttttgggggggggggggggggggggggrrrrr",
  "rrrrrrrrggggggggggggggggggggggggttttgggggggggggggggggggggrrrrrrr",
  "rrrrrrrggggggggggggggggggggggggggttttggggggggggggggggggrrrrrrrrr",
  "rrrrrrrgggggggggggggggggggggggggggttttgggggggggggggggggrrrrrrrrr",
  "rrrrrrrggggggggggggggggggggggggggggttttgggggggggggggggrrrrrrrrrr",
  "rrrrrrrggggggggggggggggggggggggggggtttttgggggggggggggrrrrrrrrrrr",
  "rrrrrrrrggggggggggggggggggggggggggggtttttgggggggggggrrrrrrrrrrrr",
  "rrrrrrrrgggggggggggggggggggggggggggggttttgggggggggggrrrrrrrrrrrr",
  "rrrrrrrrrgggggggggggggggggggggggggggggttttgggggggggrrrrrrrrrrrrr",
  "rrrrrrrrrrgggggggggggggggggggggggggggggttttggggggggrrrrrrrrrrrrr",
  "rrrrrrrrrrgggggggggggggggggggggggggggggtttttgggggggrrrrrrrrrrrrr",
  "rrrrrrrrrrrgggggggggggggggggggggggggggggttttgggggggrrrrrrrrrrrrr",
  "rrrrrrrrrrrgggggggggggggggggggggggggggggttttggggggggrrrrrrrrrrrr",
  "rrrrrrrrrrrgggggggggggggggggggggggggggggttttggggggggrrrrrrrrrrrr",
  "rrrrrrrrrrrrggggggggggggggggggggggggggggttttgggggggggrrrrrrrrrrr",
  "rrrrrrrrrrrrggggggggggggggggggggggggggggttttggggggggggrrrrrrrrrr",
  "rrrrrrrrrrrrrrrgggggggggggggggggggggggggrrrrrrrrrgggggrrrrrrrrrr",
  "rrrrrrrrrrrrrrrrggggggggggggggggggggggrrrrrrrrrrrrggrrrrrrrrrrrr",
  "rrrrrrrrrrrrrrrrggggggrrgggggggggggggggrrrrrrrrrrrrrrrrrrrrrrrrr",
  "rrrrrrrrrrrrrrrggggggrrrrrrrrggggggggggrrrrrrrrrrrrrrrrrrrrrrrrr",
  "rrrrrrrrrrrrrrrrggggrrrrrrrrrrrrrggggrrrrrrrrrrrrrrrrrrrrrrrrrrr",
  "rrrrrrrrrrrrrrrrgggrrrrrrrrrrrrrrgggrrrrrrrrrrrrrrrrrrrrrrrrrrrr",
  "rrrrrrrrrrrrrrrrgrrrrrrrrrrrrrrrrgggrgggttttgrrrrrrrrrrrrrrrrrrr",
  "rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrggrgggttttggrrrrrrrrrrrrrrrrrr",
  "rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrggggttttggrrrrrrrrrrrrrrrrrr",
  "rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrggggttttgggrrrrrrrrrrrrrrrrr"
];
var VALE_CAVERNA = { bocaExterna: [10, 6, 28], bocaInterna: [10, 6, 21], vazios: [[8, 22, 6, 10], [9, 22, 6, 11], [10, 22, 6, 11], [11, 22, 6, 10], [8, 23, 6, 10], [9, 23, 6, 11], [10, 23, 6, 11], [11, 23, 6, 10], [8, 24, 6, 10], [9, 24, 6, 11], [10, 24, 6, 11], [11, 24, 6, 10], [8, 25, 6, 10], [9, 25, 6, 11], [10, 25, 6, 11], [11, 25, 6, 10], [8, 26, 6, 10], [9, 26, 6, 11], [10, 26, 6, 11], [11, 26, 6, 10], [8, 27, 6, 10], [9, 27, 6, 11], [10, 27, 6, 11], [11, 27, 6, 10]] };
var VALE_FOGUEIRA = [0, 3, -2];
var VALE_GOBLINS = [[2, 3, -5], [4, 3, -3], [3, 3, 0], [1, 3, 2], [-2, 3, 1], [-4, 3, -2], [-2, 3, -5]];

// src/world/sanctuaryValeGoblin.ts
var VALE_N = 64;
var VALE_EXTRA_FIRES = [[-9, 9], [-9, -12], [12, -7]];
var VALE_CAMP_OFFSETS = VALE_GOBLINS.map(([x, , z]) => [x - VALE_FOGUEIRA[0], z - VALE_FOGUEIRA[2]]);
var MAX_STACK2 = 8;
var MAX_FLOOR = 6;
var at2 = (r, c) => r * VALE_N + c;
var ok = (r, c) => r >= 0 && c >= 0 && r < VALE_N && c < VALE_N;
function valeLevel(h, rock) {
  if (rock) return h >= 24 ? 8 : 7;
  return Math.max(2, Math.min(MAX_FLOOR, 2 + Math.round((h - 3) * 4 / 11)));
}
function valeHeights() {
  const level = new Uint8Array(VALE_N * VALE_N);
  const rock = new Uint8Array(VALE_N * VALE_N);
  for (let r = 0; r < VALE_N; r++) {
    for (let c = 0; c < VALE_N; c++) {
      const i = at2(r, c);
      rock[i] = VALE_SUPERFICIES[r][c] === "r" ? 1 : 0;
      level[i] = valeLevel(parseInt(VALE_ALTURAS[r][c], 36), !!rock[i]);
    }
  }
  const nb = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  for (let pass = 0; pass < 12; pass++) {
    let changed = false;
    for (let r = 0; r < VALE_N; r++) {
      for (let c = 0; c < VALE_N; c++) {
        const i = at2(r, c);
        if (rock[i]) continue;
        for (const [dx, dy] of nb) {
          if (!ok(r + dy, c + dx)) continue;
          const j = at2(r + dy, c + dx);
          if (rock[j]) {
            if (level[i] > level[j]) {
              level[i] = level[j];
              changed = true;
            }
            continue;
          }
          if (level[i] > level[j] + 1) {
            level[i] = level[j] + 1;
            changed = true;
          }
        }
      }
    }
    if (!changed) break;
  }
  return { level, rock };
}
function buildValeGoblin(seed) {
  const { level, rock } = valeHeights();
  const top = new Uint16Array(VALE_N * VALE_N).fill(Block.GRASS);
  const obj = new Uint16Array(VALE_N * VALE_N);
  const keep = new Uint8Array(VALE_N * VALE_N);
  const custom = /* @__PURE__ */ new Map();
  const cell = (x, z) => at2(z + 32, x + 32);
  for (let r = 0; r < VALE_N; r++) for (let c = 0; c < VALE_N; c++) if (VALE_SUPERFICIES[r][c] === "t") {
    top[at2(r, c)] = Block.PATH;
    keep[at2(r, c)] = 1;
  }
  const floor = valeLevel(VALE_CAVERNA.bocaExterna[1], false);
  for (const [x, z] of VALE_CAVERNA.vazios) {
    const i = cell(x, z);
    const col = [Block.STONE, ...Array(Math.max(0, floor - 2)).fill(Block.DIRT), Block.PATH, Block.AIR, Block.AIR];
    while (col.length < level[i]) col.push(Block.STONE);
    custom.set(i, col);
    keep[i] = 1;
  }
  const [bx, , bz] = VALE_CAVERNA.bocaExterna;
  for (const x of [bx - 3, bx + 2]) {
    obj[cell(x, bz)] = Block.ISO_LANTERN;
    keep[cell(x, bz)] = 1;
  }
  const [fx, , fz] = VALE_FOGUEIRA;
  const camp = { c: fx + 32, r: fz + 32 };
  obj[at2(camp.r, camp.c)] = Block.CAMPFIRE;
  const tent = (dc, dr) => {
    const cells = [[0, 0], [1, 0], [0, -1], [1, -1]];
    cells.forEach(([ox, oy], k) => {
      const i = at2(camp.r + dr + oy, camp.c + dc + ox);
      obj[i] = k === 0 ? Block.TENT : Block.TENT_PART;
      keep[i] = 1;
    });
  };
  tent(-7, -1);
  tent(-7, 4);
  obj[at2(camp.r + 3, camp.c + 4)] = Block.ISO_CRATE;
  obj[at2(camp.r + 2, camp.c + 6)] = Block.ISO_BARREL;
  obj[at2(camp.r - 4, camp.c - 5)] = Block.ISO_BARREL;
  for (let dr = -3; dr <= 3; dr++) for (let dc = -3; dc <= 3; dc++) keep[at2(camp.r + dr, camp.c + dc)] = 1;
  for (const [gx, , gz] of VALE_GOBLINS) keep[cell(gx, gz)] = 1;
  for (const [ex, ez] of VALE_EXTRA_FIRES) {
    const er = ez + 32, ec = ex + 32;
    for (let dr = -4; dr <= 4; dr++) for (let dc = -4; dc <= 4; dc++) if (dr * dr + dc * dc <= 11 && ok(er + dr, ec + dc)) {
      top[at2(er + dr, ec + dc)] = Block.PATH;
      keep[at2(er + dr, ec + dc)] = 1;
    }
    for (let dr = -3; dr <= 3; dr++) for (let dc = -3; dc <= 3; dc++) keep[at2(er + dr, ec + dc)] = 1;
    obj[at2(er, ec)] = Block.CAMPFIRE;
    obj[at2(er + 3, ec + 5)] = Block.ISO_CRATE;
    obj[at2(er + 5, ec - 2)] = Block.ISO_BARREL;
    obj[at2(er - 4, ec - 5)] = Block.ISO_BARREL;
    for (const [ox, oz] of VALE_CAMP_OFFSETS) keep[at2(er + oz, ec + ox)] = 1;
  }
  const free = (r, c) => ok(r, c) && !rock[at2(r, c)] && top[at2(r, c)] === Block.GRASS && !keep[at2(r, c)] && !obj[at2(r, c)] && !custom.has(at2(r, c)) && level[at2(r, c)] <= MAX_FLOOR;
  const near2 = (r, c, d, f) => {
    for (let dr = -d; dr <= d; dr++) for (let dc = -d; dc <= d; dc++) if (ok(r + dr, c + dc) && f(at2(r + dr, c + dc))) return true;
    return false;
  };
  for (let r = 0; r < VALE_N; r++) {
    for (let c = 0; c < VALE_N; c++) {
      const i = at2(r, c);
      if (!free(r, c) || near2(r, c, 2, (j) => !!keep[j])) continue;
      const x = c - 32, y = r - 32;
      if (hash2(seed, x, y) < (level[i] > 2 ? 0.05 : 0.014) && !near2(r, c, 2, (j) => ISO_TREE_IDS.has(obj[j]))) {
        const pick = Math.floor(hash2(seed ^ 81, x, y) * (ISO_TREE_SET.length + 1));
        obj[i] = pick === 0 ? Block.ISO_TREE : ISO_TREE_SET[pick - 1][0];
      }
    }
  }
  for (let r = 0; r < VALE_N; r++) {
    for (let c = 0; c < VALE_N; c++) {
      const i = at2(r, c);
      if (!free(r, c)) continue;
      const q = hash2(seed ^ 43, c - 32, r - 32);
      if (near2(r, c, 2, (j) => ISO_TREE_IDS.has(obj[j])) && q < 0.1) obj[i] = q < 0.025 ? Block.ISO_BUSH_L : q < 0.05 ? Block.ISO_BUSH_M : Block.ISO_BUSH_S;
      else if (q > 0.97) obj[i] = Block.ISO_ROCK_L;
      else if (q > 0.93 && !near2(r, c, 1, (j) => !!keep[j])) obj[i] = Block.ISO_PEBBLES;
    }
  }
  const out = [];
  for (let i = 0; i < VALE_N * VALE_N; i++) {
    const c = custom.get(i);
    if (c) {
      out.push(c);
      continue;
    }
    const hh = level[i];
    let col;
    if (rock[i]) col = Array(hh).fill(Block.STONE);
    else if (hh === 2) col = [Block.STONE, top[i]];
    else col = [Block.STONE, ...Array(hh - 2).fill(Block.DIRT), top[i]];
    if (obj[i] && !rock[i] && hh < MAX_STACK2) col[hh] = obj[i];
    out.push(col);
  }
  return out;
}

// src/world/sanctuaryLandscape.ts
var LANDSCAPE_SEED = 1835638650;
var LANDSCAPE_HUT = { x: -10, y: -14, w: 6, h: 5 };
var MIN = -2 * CHUNK_SIZE;
var SIZE = 4 * CHUNK_SIZE;
var MAX_LEVELS = 5;
function landscapeFor(_seed, ground2) {
  return new SanctuaryLandscape(LANDSCAPE_SEED, ground2);
}
var SanctuaryLandscape = class {
  constructor(seed, ground2) {
    this.ground = ground2;
    this.seed = seed >>> 0;
    this.cols = buildLandscape(this.seed);
    this.farm = buildFazenda(this.seed);
    this.vale = buildValeGoblin(this.seed);
  }
  ground;
  seed;
  /** Coluna de cada célula (índice (y − MIN) · SIZE + (x − MIN)): ids por nível da pilha, do chão para cima. */
  cols;
  /** Colunas da Fazenda (64 × 64, a leste do bloco original). */
  farm;
  /** Colunas do Vale Goblin (64 × 64, a leste da Fazenda). */
  vale;
  biome = BIOMES.celestial;
  column(x, y) {
    if (x < MIN || x >= MIN + 2 * SIZE || y < MIN - SIZE || y >= MIN + SIZE) return void 0;
    if (y < MIN) return x < MIN + SIZE ? this.vale[(y - MIN + SIZE) * SIZE + (x - MIN)] : void 0;
    if (x >= MIN + SIZE) return this.farm[(y - MIN) * SIZE + (x - MIN - SIZE)];
    return this.cols[(y - MIN) * SIZE + (x - MIN)];
  }
  cellAt(x, y) {
    const c = this.column(x, y);
    if (!c) return { ground: Block.VOID, object: Block.AIR, upper: Block.AIR };
    return { ground: this.ground, object: c?.[0] ?? Block.AIR, upper: c?.[1] ?? Block.AIR };
  }
  groundAt() {
    return this.ground;
  }
  objectAt(x, y) {
    return this.cellAt(x, y).object;
  }
  upperAt(x, y) {
    return this.cellAt(x, y).upper;
  }
  biomeAt() {
    return this.biome;
  }
  generateChunk(cx, cy, ground2, objects, upper) {
    for (let ly = 0; ly < CHUNK_SIZE; ly++) {
      for (let lx = 0; lx < CHUNK_SIZE; lx++) {
        const c = this.cellAt(cx * CHUNK_SIZE + lx, cy * CHUNK_SIZE + ly);
        ground2[ly * CHUNK_SIZE + lx] = c.ground;
        objects[ly * CHUNK_SIZE + lx] = c.object;
        upper[ly * CHUNK_SIZE + lx] = c.upper;
      }
    }
  }
  /** Níveis 2..4 da pilha (o gerador comum só conhece os dois primeiros). */
  generateLevels(cx, cy, levels) {
    for (let ly = 0; ly < CHUNK_SIZE; ly++) {
      for (let lx = 0; lx < CHUNK_SIZE; lx++) {
        const c = this.column(cx * CHUNK_SIZE + lx, cy * CHUNK_SIZE + ly);
        if (!c) continue;
        for (let l = 2; l < Math.min(levels.length, c.length); l++) levels[l][ly * CHUNK_SIZE + lx] = c[l];
      }
    }
  }
};
var idx = (x, y) => (y - MIN) * SIZE + (x - MIN);
var inside = (x, y) => x >= MIN && y >= MIN && x < MIN + SIZE && y < MIN + SIZE;
function buildLandscape(seed) {
  const noise = new Noise(seed ^ 23063);
  const n = (x, y, s) => noise.fbm2(x / s + 17.3, y / s - 9.1, 3);
  const p = {
    h: new Uint8Array(SIZE * SIZE).fill(2),
    top: new Uint16Array(SIZE * SIZE).fill(Block.GRASS),
    obj: new Uint16Array(SIZE * SIZE),
    keep: new Uint8Array(SIZE * SIZE),
    custom: /* @__PURE__ */ new Map()
  };
  const each = (f) => {
    for (let y = MIN; y < MIN + SIZE; y++) for (let x = MIN; x < MIN + SIZE; x++) f(x, y, idx(x, y));
  };
  const hill = (cx, cy, rx, ry, stone) => each((x, y, i) => {
    const d = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 + 0.3 * n(x, y, 6);
    if (d < 1) {
      p.h[i] = 3;
      if (d < stone) p.top[i] = Block.STONE_COBBLE;
    }
  });
  hill(15, -14, 14, 10, 0.1);
  hill(-22, -18, 8, 6, 0.06);
  const LX = -11, LY = 10, RX = 12, RY = 8;
  const lake = (x, y) => ((x - LX) / RX) ** 2 + ((y - LY) / RY) ** 2 + 0.3 * n(x, y, 5);
  each((x, y, i) => {
    const d = lake(x, y);
    if (d < 1) {
      p.top[i] = RIO_LAGO;
      p.keep[i] = 1;
    } else if (d < 1.32) {
      p.top[i] = Block.SAND;
      p.keep[i] = 1;
    }
  });
  const river = [];
  const RIVER_X = -15;
  for (let y = -12; y < MIN + SIZE; y++) {
    const i = idx(RIVER_X, y);
    if (p.top[i] === RIO_LAGO) break;
    if (p.h[i] === 3) continue;
    p.top[i] = RIO_CANAL;
    p.keep[i] = 1;
    river.push(i);
  }
  const plank = (x, y) => {
    if (!inside(x, y)) return;
    const i = idx(x, y);
    if (p.h[i] === 3) return;
    if (p.top[i] === RIO_CANAL || p.top[i] === RIO_LAGO) p.custom.set(i, [Block.STONE, p.top[i], Block.OAK_PLANKS]);
    else p.top[i] = Block.OAK_PLANKS;
    p.keep[i] = 1;
  };
  const post = (x, y) => {
    const i = idx(x, y);
    const base = p.custom.get(i) ?? [Block.STONE, Block.OAK_PLANKS];
    p.custom.set(i, [...base.slice(0, base.length), Block.OAK_LOG]);
  };
  if (river.length) {
    const mid = river[Math.floor(river.length / 2)];
    const by = Math.floor(mid / SIZE) + MIN;
    for (let x = MIN; x < MIN + SIZE; x++) {
      const i = idx(x, by);
      if (p.top[i] === RIO_CANAL) for (let k = -2; k <= 2; k++) plank(x + k, by);
    }
  }
  const DY = 12;
  for (let x = -4; x <= 3; x++) for (let y = DY; y <= DY + 1; y++) plank(x, y);
  post(-4, DY);
  post(-4, DY + 1);
  post(3, DY);
  post(3, DY + 1);
  const { x: HX, y: HY, w: HW, h: HH } = LANDSCAPE_HUT;
  for (let y = HY; y < HY + HH; y++) {
    for (let x = HX; x < HX + HW; x++) {
      const i = idx(x, y);
      p.h[i] = 2;
      p.top[i] = Block.OAK_PLANKS;
      p.keep[i] = 1;
      const edge = x === HX || x === HX + HW - 1 || y === HY || y === HY + HH - 1;
      const corner = (x === HX || x === HX + HW - 1) && (y === HY || y === HY + HH - 1);
      const wall = corner ? Block.OAK_LOG : Block.OAK_PLANKS;
      const door = y === HY + HH - 1 && x === HX + 2;
      if (edge) p.custom.set(i, [Block.STONE, Block.OAK_PLANKS, door ? Block.OAK_DOOR : wall, door ? Block.OAK_PLANKS : wall, Block.OAK_PLANKS]);
      else p.custom.set(i, [Block.STONE, Block.OAK_PLANKS, Block.AIR, Block.AIR, Block.OAK_PLANKS]);
    }
  }
  const GX = -10, GY = -7, GW = 7, GH = 5;
  for (let y = GY; y < GY + GH; y++) {
    for (let x = GX; x < GX + GW; x++) {
      const i = idx(x, y);
      p.keep[i] = 1;
      if (x === GX || x === GX + GW - 1 || y === GY || y === GY + GH - 1) p.obj[i] = y === GY + GH - 1 && x === GX + 3 ? Block.FENCE_GATE : Block.FENCE;
      else if (hash2(seed, x, y) < 0.7) p.obj[i] = FLOWER_BLOCKS[Math.floor(hash2(seed ^ 119, x >> 1, y >> 1) * 4) + 3];
    }
  }
  for (let y = MIN; y < MIN + 6; y++) for (let x = 6; x <= 13; x++) p.keep[idx(x, y)] = 1;
  const grass = (x, y) => {
    if (!inside(x, y)) return false;
    const i = idx(x, y);
    return p.top[i] === Block.GRASS && !p.keep[i] && !p.obj[i] && !p.custom.has(i);
  };
  const nearKeep = (x, y, r) => {
    for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) if (inside(x + dx, y + dy) && p.keep[idx(x + dx, y + dy)]) return true;
    return false;
  };
  const clear = (x, y) => Math.hypot(x, y) < 6;
  each((x, y, i) => {
    if (!grass(x, y) || clear(x, y) || nearKeep(x, y, 3)) return;
    const forest = n(x + 40, y - 25, 9);
    const r = hash2(seed, x, y);
    const nearTree = () => {
      for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) if (inside(x + dx, y + dy) && p.obj[idx(x + dx, y + dy)] === Block.ISO_TREE) return true;
      return false;
    };
    if (r < 6e-3 + Math.max(0, forest) * 0.16 && !nearTree()) p.obj[i] = Block.ISO_TREE;
  });
  each((x, y, i) => {
    if (p.obj[i] || !grass(x, y) || clear(x, y)) return;
    const r = hash2(seed ^ 43, x, y);
    let treeNear = false;
    for (let dy = -2; dy <= 2 && !treeNear; dy++) for (let dx = -2; dx <= 2; dx++) if (inside(x + dx, y + dy) && p.obj[idx(x + dx, y + dy)] === Block.ISO_TREE) {
      treeNear = true;
      break;
    }
    const bank = nearKeep(x, y, 2);
    if (treeNear && r < 0.1) p.obj[i] = r < 0.025 ? Block.ISO_BUSH_L : r < 0.05 ? Block.ISO_BUSH_M : Block.ISO_BUSH_S;
    else if (bank && !nearKeep(x, y, 1) && r < 0.05) p.obj[i] = r < 0.02 ? Block.ISO_BUSH_M : Block.ISO_BUSH_S;
  });
  each((x, y, i) => {
    if (p.obj[i] || !grass(x, y) || clear(x, y)) return;
    const patch = n(x - 30, y + 20, 5);
    if (patch > 0.2 && hash2(seed ^ 60, x, y) < 0.2) {
      const kind = Math.floor((n(x + 5, y + 5, 3) + 1) * 7.5);
      p.obj[i] = FLOWER_BLOCKS[Math.max(0, Math.min(FLOWER_BLOCKS.length - 1, kind))];
    }
  });
  const out = [];
  each((_x, _y, i) => {
    const custom = p.custom.get(i);
    if (custom) {
      out.push(custom.slice(0, MAX_LEVELS));
      return;
    }
    const h = p.h[i];
    const col = h === 1 ? [p.top[i]] : h === 2 ? [Block.STONE, p.top[i]] : [Block.STONE, Block.DIRT, p.top[i]];
    if (p.obj[i]) col[h] = p.obj[i];
    out.push(col);
  });
  return out;
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
    const dist2 = lo + hash2(seed, 1698, t) * BAND;
    const cx = Math.round(gate[0] + Math.cos(angle) * dist2), cy = Math.round(gate[1] + Math.sin(angle) * dist2);
    const area = { x0: cx - SIDE / 2, y0: cy - SIDE / 2, x1: cx + SIDE / 2 - 1, y1: cy + SIDE / 2 - 1 };
    let ok2 = true;
    for (let y = area.y0 - 1; y <= area.y1 + 1 && ok2; y++) for (let x = area.x0 - 1; x <= area.x1 + 1 && ok2; x++) ok2 = free(x, y);
    if (!ok2) continue;
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

// src/world/farmPlot.ts
var PLOT_W = 6;
var PLOT_H = 4;
var NEAR2 = 6 * SUBDIV;
var FAR = 70 * SUBDIV;
function planFarmPlot(world) {
  if (!world.town) return null;
  const [gx, gy] = world.outsideGate();
  const avoid = [];
  if (world.flowerPatch) avoid.push({ x0: world.flowerPatch.area.x0 - 2, y0: world.flowerPatch.area.y0 - 2, x1: world.flowerPatch.area.x1 + 2, y1: world.flowerPatch.area.y1 + 2 });
  const ok2 = (x, y) => {
    if (world.isProtected(x, y) || avoid.some((r) => inRect(r, x, y))) return false;
    const c = world.generator.cellAt(x, y);
    if (c.ground !== Block.GRASS && c.ground !== Block.DIRT) return false;
    const o = blockDef(c.object);
    return c.upper === Block.AIR && (c.object === Block.AIR || o.shape === "decoration");
  };
  for (let d = NEAR2; d <= FAR; d += 2) {
    for (let dy = -d; dy <= d; dy++) {
      for (let dx = -d; dx <= d; dx++) {
        if (Math.max(Math.abs(dx), Math.abs(dy)) !== d) continue;
        const x0 = gx + dx, y0 = gy + dy;
        let good = true;
        for (let y = y0 - 1; y <= y0 + PLOT_H && good; y++) for (let x = x0 - 1; x <= x0 + PLOT_W && good; x++) good = ok2(x, y);
        if (good) return { x0, y0, x1: x0 + PLOT_W - 1, y1: y0 + PLOT_H - 1 };
      }
    }
  }
  return null;
}

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
    progression: true,
    hunger: true,
    breakSeconds: null,
    surfaceObjects: false,
    view: "oblique",
    sky: ["#1b1838", "#1b1838"]
  },
  santuario: {
    id: "santuario",
    name: "Santu\xE1rio de Orvalis",
    // Santuário refeito do zero (ADR 0036): solo, vista isométrica, cubos cheios (1 nível = 1 célula). Terreno plano em **camadas** (v0.93.143): chão de grama,
    // uma camada de Bloco de Pedra (nível 1) e uma de Grama (nível 2); a Deusa e tudo o mais ficam em cima (nível 3).
    terrain: { kind: "flat", ground: Block.ISO_G_GRASS, layers: [Block.ISO_STONE_BLOCK, Block.ISO_G_GRASS], landscape: true },
    // 64 chunks: 8 × 8 (cx −2..5, cy −6..1): o Santuário original (cx −2..1, cy −2..1), a leste a Fazenda (cx 2..5, cy −2..1) e, ao norte do original, o Vale Goblin (cx −2..1, cy −6..−3); o canto cx 2..5, cy −6..−3 é céu aberto (VOID).
    bounds: { cx0: -2, cy0: -6, cx1: 5, cy1: 1 },
    character: "goddess-iso",
    // Materiais de construção do Mundo (lista única, na ordem aprovada pelo dono do produto); o chão (grama) não precisa estar na hotbar para existir.
    blocks: [...ISO_BLOCKS, ...WORLD_BLOCKS_IN_SANCTUARY, ...RIO_BRUSHES],
    tools: false,
    farming: false,
    crops: true,
    sheep: false,
    wolves: false,
    dungeon: false,
    town: false,
    collectBlocks: false,
    minimap: false,
    progression: false,
    hunger: false,
    breakSeconds: 1,
    // quebrar qualquer bloco leva 1 s (pedido do dono do produto, 17/11/2026)
    surfaceObjects: true,
    view: "isometric",
    sky: ["#8fb8ff", "#f6d9ff"]
  },
  /**
   * Titã (ADR 0039, v0.94.0): mundo voxel solo em primeira pessoa. Fica **fora** do motor de chão e pilhas (`World`/`Game`/`SUBDIV`): o perfil só
   * registra o mundo na resolução da URL (`?mundo=titan`) e `main.ts` abre `src/titan/` em vez do `Game`. Os campos do motor 2.5D ficam
   * desligados e não são lidos (nenhum `World` é criado com este perfil).
   */
  titan: {
    id: "titan",
    name: "Tit\xE3 \xB7 Margem Silenciosa",
    terrain: { kind: "procedural" },
    bounds: null,
    character: "heroine",
    blocks: [],
    tools: false,
    farming: false,
    sheep: false,
    wolves: false,
    dungeon: false,
    town: false,
    collectBlocks: false,
    minimap: false,
    progression: false,
    hunger: false,
    breakSeconds: null,
    surfaceObjects: false,
    view: "oblique",
    sky: ["#d99342", "#f2cc93"]
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
  const idx2 = (x, y) => y * W + x;
  const inside2 = (x, y) => x >= 0 && y >= 0 && x < W && y < H;
  const at3 = (lx, ly) => ({ x: lx + VILLAGE_X0, y: ly + VILLAGE_Y0 });
  const free = (x, y) => inside2(x, y) && objects[idx2(x, y)] === Block.AIR && ground2[idx2(x, y)] !== Block.PATH;
  const path = (x0, y0, x1, y1) => {
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if (inside2(x, y)) ground2[idx2(x, y)] = Block.PATH;
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
    for (const [cx, cy] of body) if (inside2(cx, cy)) objects[idx2(cx, cy)] = Block.TOWN_PART;
    objects[idx2(x, y)] = id;
    props.push({ id, ...at3(x, y) });
    return true;
  };
  const must = (id, x, y, cells) => put(id, x, y, cells, true);
  const stake = (x, y) => {
    objects[idx2(x, y)] = Block.V_STAKE;
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
  for (let x = 23; x <= 25; x++) objects[idx2(x, 43)] = Block.V_GATE_GAP;
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
function bigCells(size, x, y) {
  const out = [];
  for (let dy = 0; dy < size; dy++) for (let dx = 0; dx < size; dx++) out.push([x + dx, y - dy]);
  return out;
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
  /** Terreno indicado para arar (missão 07); null fora do Mundo da Cidade. Não altera o mapa. */
  farmPlot = null;
  /** Spawn calculado no terreno base (a dungeon é posta longe dele e não o altera). */
  spawn = null;
  constructor(seed, profile = WORLD_PROFILES.principal) {
    this.profile = profile;
    this.maxStack = profile.id === "santuario" ? SANCTUARY_MAX_STACK : MAX_STACK;
    this.cubeLevels = profile.id === "santuario" ? 1 : CUBE_LEVELS;
    this.generator = profile.terrain.kind === "flat" ? (profile.terrain.landscape ? landscapeFor(seed, profile.terrain.ground) : null) ?? new FlatGenerator(seed, profile.terrain.ground, profile.terrain.layers) : new WorldGenerator(seed);
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
    if (this.profile.blocks.includes(Block.TENT) && !this.profile.surfaceObjects) this.interiors = [...this.interiors, tentLayout()];
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
    if (this.town && profile.dungeon) this.farmPlot = planFarmPlot(this);
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
    const inside2 = x0 >= area.x0 + TOWN_WALL && x1 <= area.x1 - TOWN_WALL && y0 >= area.y0 + TOWN_WALL && y1 <= area.y1 - TOWN_WALL;
    return !inside2;
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
      this.generator.generateLevels?.(cx, cy, chunk.levels);
      if (this.cubeLevels > 1) this.expandQuarters(chunk);
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
    const onlyCubes = this.profile.surfaceObjects;
    while (n < this.maxStack) {
      const id = this.getLevel(x, y, n);
      if (id === Block.AIR || onlyCubes && blockDef(id).shape !== "cube") break;
      n++;
    }
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
    if (base.shape === "cube") {
      const h = this.stackHeight(x, y);
      if (this.profile.surfaceObjects && h < this.maxStack) {
        const on = this.getLevel(x, y, h);
        if (on !== Block.AIR && blockDef(on).solid) return null;
      }
      return h;
    }
    return base.solid ? null : 0;
  }
  /**
   * O bloco da SUPERFÍCIE da célula: o objeto que não é cubo em cima da pilha de cubos (Santuário, `surfaceObjects`) ou, nos outros mundos, o do nível 0.
   * É o que baú, porta, fogueira etc. consultam em vez de `getObject` (que no Santuário é o cubo de pedra do terreno).
   */
  surfaceObject(x, y) {
    if (!this.profile.surfaceObjects) return this.getObject(x, y);
    const h = this.stackHeight(x, y);
    return h < this.maxStack ? this.getLevel(x, y, h) : Block.AIR;
  }
  /** Nível onde fica o objeto de superfície da célula (0 fora do Santuário). */
  surfaceLevel(x, y) {
    return this.profile.surfaceObjects ? Math.min(this.stackHeight(x, y), this.maxStack - 1) : 0;
  }
  /** Mantido para o objeto do nível 0 (testes/ferramentas). */
  setObject(x, y, id) {
    this.setLevel(x, y, 0, id);
  }
  touchChunkNeighbors(cx, cy, lx, ly) {
    const last = CHUNK_SIZE - 1;
    if (lx === 0) this.getChunk(cx - 1, cy)?.touch();
    if (lx === last) this.getChunk(cx + 1, cy)?.touch();
    if (ly === 0) this.getChunk(cx, cy - 1)?.touch();
    if (ly === last) this.getChunk(cx, cy + 1)?.touch();
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
    } else {
      const prev = chunk.getLevel(lx, ly, level);
      chunk.setLevel(lx, ly, level, id);
      if (isRioBrush(id) || isRioBrush(prev)) this.touchChunkNeighbors(cx, cy, lx, ly);
    }
    if (level === 0 || this.profile.surfaceObjects && typeof level === "number" && isCrop(id)) {
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
      return id === Block.TENT_PART ? Block.TENT : this.bigOfPart(id) ?? id;
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
        const a = this.tentAnchor(x, y, top.level);
        if (a && this.tent && a[0] === this.tent[0] && a[1] === this.tent[1]) this.tent = null;
        if (a) for (const [cx, cy] of tentCells(a[0], a[1])) this.setLevel(cx, cy, top.level, Block.AIR);
        else this.setLevel(x, y, top.level, Block.AIR);
        return Block.TENT;
      }
      const bigId = ISO_BIG[top.id] ? top.id : this.bigOfPart(top.id);
      if (bigId !== null) {
        const a = this.bigAnchor(bigId, x, y, top.level);
        if (a) for (const [cx, cy] of bigCells(ISO_BIG[bigId].size, a[0], a[1])) this.setLevel(cx, cy, top.level, Block.AIR);
        else this.setLevel(x, y, top.level, Block.AIR);
        return bigId;
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
    if (this.getGround(x, y) === Block.HOLE) return def.shape === "cube" && !isRioBrush(id) ? "ground" : null;
    if (this.getGround(x, y) === Block.WATER) return REPLACES_WATER.has(id) ? "ground" : null;
    if (!this.isGroundStandable(x, y)) return null;
    const base = blockDef(this.getObject(x, y));
    if (this.profile.surfaceObjects && def.shape !== "cube" && base.shape === "cube") {
      const h = this.stackHeight(x, y);
      if (h >= this.maxStack) return null;
      if (def.shape === "door" && !this.hasDoorFrame(x, y, h)) return null;
      return this.footprint(id, x, y).every(([cx, cy]) => this.surfaceFree(cx, cy, h)) ? h : null;
    }
    if (base.id === Block.AIR || base.shape === "decoration") {
      if (def.shape === "door" && !this.hasDoorFrame(x, y)) return null;
      if (def.shape === "wall-door" && !this.canPlaceWallDoor(x, y)) return null;
      if ((id === Block.TENT || ISO_BIG[id]) && !this.footprint(id, x, y).every(([cx, cy]) => this.isFootprintFree(cx, cy))) return null;
      return 0;
    }
    if (def.shape === "cube" && base.shape === "cube") {
      const h = this.stackHeight(x, y);
      if (h >= this.maxStack) return null;
      if (this.profile.surfaceObjects && this.getLevel(x, y, h) !== Block.AIR) return null;
      return h;
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
  isDoorJamb(x, y, level = 0) {
    const d = blockDef(this.getLevel(x, y, level));
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
    return blockDef(this.surfaceObject(x, y)).seat ? [x, y] : null;
  }
  /** A porta só vai entre dois batentes (qualquer bloco de madeira — tora ou tábuas, de qualquer árvore — ou de pedra, podem misturar): células da esquerda e da direita. */
  hasDoorFrame(x, y, level = 0) {
    return this.isDoorJamb(x - 1, y, level) && this.isDoorJamb(x + 1, y, level);
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
    return isOpenable(this.surfaceObject(x, y));
  }
  /** Porta ou portão aberto? */
  isDoorOpen(x, y) {
    return isOpen(this.surfaceObject(x, y));
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
    const next = toggled(this.surfaceObject(x, y));
    if (next === null) return false;
    this.setLevel(x, y, this.surfaceLevel(x, y), next);
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
  /**
   * Onde um CUBO entraria **no nível pedido** — colocar numa face de um cubo vizinho (vista isométrica, ADR 0036): o nível pode ficar flutuando, sem cubo no
   * nível de baixo. Só cubos; a célula precisa estar livre naquele nível e não ter objeto não-cubo (árvore, porta, enfeite) no chão. Nível 0 segue as regras de
   * sempre (`placementLevel`). null = não pode.
   */
  placementLevelAt(x, y, id, level) {
    const def = blockDef(id);
    if (!def.placeable || def.layer !== "object" || def.shape !== "cube") return null;
    if (!this.profile.blocks.includes(id) || this.isProtected(x, y) || !this.inBounds(x, y)) return null;
    if (!Number.isInteger(level) || level < 0 || level >= this.maxStack) return null;
    if (level === 0) return this.placementLevel(x, y, id) === 0 ? 0 : null;
    if (this.getLevel(x, y, level) !== Block.AIR || this.getGround(x, y) === Block.VOID) return null;
    const base = blockDef(this.getObject(x, y));
    if (base.id !== Block.AIR && base.shape !== "cube") return null;
    return level;
  }
  canPlaceAt(x, y, id, level) {
    return this.placementLevelAt(x, y, id, level) !== null;
  }
  placeBlockAt(x, y, id, level) {
    const at3 = this.placementLevelAt(x, y, id, level);
    if (at3 === null) return false;
    this.setLevel(x, y, at3, id);
    return true;
  }
  placeBlock(x, y, id) {
    const level = this.placementLevel(x, y, id);
    if (level === null) return false;
    this.setLevel(x, y, level, id);
    if (level === "ground") this.clearWaterPlantsCovering(x, y);
    if (id === Block.TENT) {
      for (const [cx, cy] of tentCells(x, y).slice(1)) this.setLevel(cx, cy, typeof level === "number" ? level : 0, Block.TENT_PART);
      this.tent = [x, y];
    }
    const big = ISO_BIG[id];
    if (big) for (const [cx, cy] of bigCells(big.size, x, y).slice(1)) this.setLevel(cx, cy, typeof level === "number" ? level : 0, big.part);
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
  /** A superfície da pilha de cubos da célula, na altura `h`, está livre (vazia ou com enfeite), em chão firme e fora de área protegida? (Santuário) */
  surfaceFree(x, y, h) {
    if (!this.inBounds(x, y) || this.isProtected(x, y) || !this.isGroundStandable(x, y) || this.getGround(x, y) === Block.HOLE) return false;
    if (blockDef(this.getObject(x, y)).shape !== "cube" || this.stackHeight(x, y) !== h || h >= this.maxStack) return false;
    const on = blockDef(this.getLevel(x, y, h));
    return on.id === Block.AIR || on.shape === "decoration";
  }
  /** Células que um bloco ocupa ao ser colocado em (x, y) (tenda 2×2; os demais, 1). */
  footprint(id, x, y) {
    const big = ISO_BIG[id];
    return id === Block.TENT ? tentCells(x, y) : big ? bigCells(big.size, x, y) : [[x, y]];
  }
  /**
   * Cantos possíveis para um objeto de várias células cobrir a célula (x, y) (tenda: 4 opções).
   * Quem coloca escolhe o que não pega ninguém; blocos de 1 célula têm só (x, y).
   */
  footprintAnchors(id, x, y) {
    const big = ISO_BIG[id];
    if (big) {
      const n = big.size, c = Math.floor(n / 2);
      const out = [[x - c, y + c]];
      for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) if (i !== c || j !== c) out.push([x - i, y + j]);
      return out;
    }
    return id === Block.TENT ? [[x, y], [x - 1, y], [x, y + 1], [x - 1, y + 1]] : [[x, y]];
  }
  /** Canto (TENT) da tenda que contém a célula, ou null. */
  tentAnchor(x, y, level = 0) {
    for (const [dx, dy] of [[0, 0], [-1, 0], [0, 1], [-1, 1]]) {
      if (this.getLevel(x + dx, y + dy, level) === Block.TENT) return [x + dx, y + dy];
    }
    return null;
  }
  /** O objeto grande (casa, barraca) a que o id de parte pertence, ou null. */
  bigOfPart(id) {
    for (const [big, d] of Object.entries(ISO_BIG)) if (d.part === id) return Number(big);
    return null;
  }
  /** Canto (o id `big`) do objeto grande que contém a célula, ou null; `level` = o nível da pilha onde ele está (0 no chão; em cima do terreno do Santuário, mais). */
  bigAnchor(big, x, y, level = 0) {
    const n = ISO_BIG[big]?.size ?? 1;
    for (let dy = 0; dy < n; dy++) for (let dx = 0; dx < n; dx++) {
      if (this.getLevel(x - dx, y + dy, level) === big) return [x - dx, y + dy];
    }
    return null;
  }
  /** Última tenda colocada (ponto de renascer), se ainda estiver de pé. */
  tent = null;
  /** Conteúdo dos baús, por célula ("x,y"): 27 espaços (pilha ou null). Parte do estado do mundo (salvo). */
  chests = /* @__PURE__ */ new Map();
  /** Espaços do baú da célula (null se não há baú). */
  chestAt(x, y) {
    return this.surfaceObject(x, y) === Block.CHEST ? this.chests.get(chunkKey(x, y)) ?? this.newChest(x, y) : null;
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
      if (this.profile.surfaceObjects) return [0, 0];
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
    if (!isCropSeedling(id)) return false;
    if (this.profile.surfaceObjects) {
      const h = this.stackHeight(x, y);
      if (h < 1 || h >= this.maxStack || this.getLevel(x, y, h - 1) !== PLANTABLE_GROUND) return false;
      const on = blockDef(this.getLevel(x, y, h));
      return on.id === Block.AIR || on.shape === "decoration";
    }
    if (this.getGround(x, y) !== PLANTABLE_GROUND) return false;
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
    this.setLevel(x, y, this.surfaceLevel(x, y), id);
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
      const id = this.surfaceObject(x, y);
      if (this.profile.surfaceObjects && isCrop(id)) {
        const kind2 = cropKind(id), stage2 = cropStage(id);
        if (stage2 < CROP_STAGES - 1 && rand() < dt / CROP_STAGE_SECONDS[kind2]) {
          const next = cropId(kind2, stage2 + 1);
          this.setLevel(x, y, this.surfaceLevel(x, y), next);
          onGrow?.(x, y, next);
        }
        continue;
      }
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
    const ok2 = (x, y) => this.isWalkable(x, y) && this.isWalkable(x + 1, y) && this.isWalkable(x - 1, y) && this.isWalkable(x, y + 1) && this.isWalkable(x, y - 1);
    for (let r = 0; r <= maxRadius; r++) {
      for (let dy = -r; dy <= r; dy++) {
        for (let dx = -r; dx <= r; dx++) {
          if (Math.max(Math.abs(dx), Math.abs(dy)) !== r) continue;
          if (ok2(x0 + dx, y0 + dy)) return [x0 + dx, y0 + dy];
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
    this.rules = roomRules(id);
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
  /** Regras desta sala (`ROOM_RULES`): modo, blocos infinitos, coleta, câmeras e proteção da cidade. */
  rules;
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
    const base = hello.appearance ?? DEFAULT_APPEARANCE;
    const appearance = this.rules.goddessOnly ? { body: base.body, goddess: true } : { body: base.body };
    const player = { id, name, state: null, appearance };
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
        loot = [...wasChest ? chestLoot : [], ...breakDrops(a.tool, breaking, this.rules.collectBlockDrops && this.world.profile.collectBlocks, this.rand, { seed: this.world.seed, x: a.x, y: a.y })];
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
    const near2 = (o) => Math.abs(o.x - x) <= MOBS_RADIUS && Math.abs(o.y - y) <= MOBS_RADIUS;
    const list = [];
    const e = this.entities;
    for (const a of e.animals) {
      if (!near2(a)) continue;
      const s = { i: this.mobId(a), k: a instanceof Sheep ? "sheep" : a.species, x: round2(a.x), y: round2(a.y), f: FACING_ORDER.indexOf(a.facing) };
      if (a.moving) s.m = 1;
      if (a.baby) s.b = 1;
      if (a.inLove && a.courtship <= 0) s.l = 1;
      if (a.canEat) s.e = 1;
      list.push(s);
    }
    for (const v of e.villagers) {
      if (v.hidden || !near2(v)) continue;
      const s = { i: this.mobId(v), k: `npc-${v.npc}`, x: round2(v.x), y: round2(v.y), f: FACING_ORDER.indexOf(v.facing) };
      if (v.moving) s.m = 1;
      if (v.resident) s.u = v.resident.id;
      if (v.fade > 0) s.a = round2(v.fade);
      const g = this.playerIdOf(v.leader);
      if (g) s.g = g;
      list.push(s);
    }
    for (const m of e.monsters) {
      if (!near2(m)) continue;
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
      if (near2(d)) list.push({ i: 0, k: d.kind, x: round2(d.x), y: round2(d.y), f: FACING_ORDER.indexOf(d.facing), d: round2(d.t) });
    }
    for (const a of e.actors) {
      if (a.kind === "love-hearts" && near2(a)) list.push({ i: 0, k: a.kind, x: round2(a.x), y: round2(a.y), f: 0, r: a.frame, s: a.scale });
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

// src/titan/tiles.json
var tiles_default = {
  tile: 32,
  pad: 2,
  cols: 8,
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
    "22-laje-de-junco/lateral"
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
var T = { AIR: 0, SAND: 1, DAMP_SAND: 2, DARK_ROCK: 3, FROST: 4, LAKE: 5, BEDROCK: 6, LANTERN: 7, VEIN_ROCK: 8, VEIN_FROST: 9, WORKBENCH: 10, EMBER: 11, SLAB: 12, WORKBENCH_90: 13, WORKBENCH_180: 14, WORKBENCH_270: 15, SLAB_TOP: 16, SLAB_DOUBLE: 17, MARCO: 18, MARCO_90: 19, MARCO_180: 20, MARCO_270: 21, PAINEL: 22, PAINEL_Z: 23, VEIN_COPPER: 24, BRAZIER: 25, BRAZIER_LIT: 26, CARAPACE: 27, EMBER_VEIN: 28, EMBER_BLOCK: 29, MAT: 30, LADDER: 31, LADDER_90: 32, LADDER_180: 33, LADDER_270: 34, CHEST: 35, CHEST_90: 36, CHEST_180: 37, CHEST_270: 38, BED: 39, BED_90: 40, BED_180: 41, BED_270: 42, BED_HEAD: 43, BED_HEAD_90: 44, BED_HEAD_180: 45, BED_HEAD_270: 46, REED_BLOCK: 47, REED_SLAB: 48, REED_SLAB_TOP: 49, REED_STAIR: 50, REED_STAIR_90: 51, REED_STAIR_180: 52, REED_STAIR_270: 53, REED_CHAIR: 54, REED_CHAIR_90: 55, REED_CHAIR_180: 56, REED_CHAIR_270: 57, DOOR: 58, DOOR_LAST: 89 };
var T_MAX = T.DOOR_LAST;
var BLOCK_NAMES = { 1: "Areia ocre", 2: "Areia \xFAmida", 3: "Rocha escura", 4: "Gelo fosco", 5: "Lago escuro", 6: "Rocha-m\xE3e", 7: "Lanterna da margem", 8: "Rocha com veio", 9: "Gelo com veio", 10: "Mesa de Trabalho", 11: "Brasa de \xE2mbar", 12: "Laje de rocha", 13: "Mesa de Trabalho", 14: "Mesa de Trabalho", 15: "Mesa de Trabalho", 16: "Laje de rocha", 17: "Laje dupla de rocha", 18: "Marco de Margem", 19: "Marco de Margem", 20: "Marco de Margem", 21: "Marco de Margem", 22: "Painel de Junco", 23: "Painel de Junco", 24: "Veio de Cobre de Duna", 25: "Braseiro de Rocha", 26: "Braseiro de Rocha (aceso)", 27: "Revestimento de Carapa\xE7a", 28: "Veio de \xC2mbar", 29: "Bloco de \xC2mbar Compactado", 30: "Esteira de Junco", 31: "Escada de Junco", 32: "Escada de Junco", 33: "Escada de Junco", 34: "Escada de Junco", 35: "Ba\xFA de Rocha e Junco", 36: "Ba\xFA de Rocha e Junco", 37: "Ba\xFA de Rocha e Junco", 38: "Ba\xFA de Rocha e Junco", 39: "Cama de Junco", 40: "Cama de Junco", 41: "Cama de Junco", 42: "Cama de Junco", 43: "Cama de Junco", 44: "Cama de Junco", 45: "Cama de Junco", 46: "Cama de Junco", 47: "Bloco de Junco", 48: "Laje de Junco", 49: "Laje de Junco", 50: "Degrau de Junco", 51: "Degrau de Junco", 52: "Degrau de Junco", 53: "Degrau de Junco", 54: "Cadeira de Junco", 55: "Cadeira de Junco", 56: "Cadeira de Junco", 57: "Cadeira de Junco" };
for (let id = T.DOOR; id <= T.DOOR_LAST; id++) BLOCK_NAMES[id] = "Porta de Junco";
var isSolid = (id) => id !== T.AIR && id !== T.LAKE && id !== T.LANTERN && !isMarco(id) && id !== T.MAT && !isLadder(id);
var isTarget = (id) => isSolid(id) || id === T.LANTERN || isMarco(id) || id === T.MAT || isLadder(id);
var blocksLight = (id) => isSolid(id) && !isPanel(id);
var isOccupied = isTarget;
var blockHeight = (id) => blockSpan(id)[1];
var isSlab = (id) => id === T.SLAB || id === T.SLAB_TOP || id === T.REED_SLAB || id === T.REED_SLAB_TOP;
var isSlabBottom = (id) => id === T.SLAB || id === T.REED_SLAB;
function blockSpan(id) {
  if (isStair(id) || isChair(id) || isDoor2(id)) return [0, 1];
  if (isBrazier(id)) return [0, BRAZIER_HEIGHT];
  if (isChest(id)) return [0, CHEST_HEIGHT];
  if (isBed(id)) return [0, BED_HEIGHT];
  if (isPanel(id)) return [0, PANEL_HEIGHT];
  if (isSlab(id)) return isSlabBottom(id) ? [0, 0.5] : [0.5, 1];
  return isSolid(id) ? [0, 1] : [0, 0];
}
var isFull = (id) => isSolid(id) && !isSlab(id) && !isPanel(id) && !isChest(id) && !isBed(id) && !isBrazier(id) && !isStair(id) && !isChair(id) && !isDoor2(id);
var isVein = (id) => id === T.VEIN_ROCK || id === T.VEIN_FROST;
var isStair = (id) => id >= T.REED_STAIR && id <= T.REED_STAIR_270;
var isChair = (id) => id >= T.REED_CHAIR && id <= T.REED_CHAIR_270;
var stairTurn = (id) => isStair(id) ? id - T.REED_STAIR : 0;
var chairTurn = (id) => isChair(id) ? id - T.REED_CHAIR : 0;
var stairId = (turn) => T.REED_STAIR + (turn % 4 + 4) % 4;
var chairId = (turn) => T.REED_CHAIR + (turn % 4 + 4) % 4;
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
var isDoor2 = (id) => id >= T.DOOR && id <= T.DOOR_LAST;
var isDoorUpper = (id) => isDoor2(id) && (id - T.DOOR & 16) !== 0;
var doorTurn = (id) => isDoor2(id) ? id - T.DOOR & 3 : 0;
var isDoorOpen = (id) => isDoor2(id) && (id - T.DOOR & 4) !== 0;
var isDoorHingeRight = (id) => isDoor2(id) && (id - T.DOOR & 8) !== 0;
var doorId = (turn, hingeRight, open3, upper) => T.DOOR + (turn % 4 + 4) % 4 + (open3 ? 4 : 0) + (hingeRight ? 8 : 0) + (upper ? 16 : 0);
var doorToggled = (id) => isDoor2(id) ? isDoorOpen(id) ? id - 4 : id + 4 : id;
var doorRight = (turn) => {
  const [fx, fz] = ladderFacing(turn);
  return [fz === 0 ? 0 : fz, fx === 0 ? 0 : -fx];
};
function doorBox(hingeRight, open3) {
  if (!open3) return [0, 0, 1 - DOOR_THICK, 1, 1, 1];
  return hingeRight ? [1 - DOOR_THICK, 0, 0, 1, 1, 1] : [0, 0, 0, DOOR_THICK, 1, 1];
}
var BOXES = /* @__PURE__ */ new Map();
for (let t = 0; t < 4; t++) for (const hr of [false, true]) for (const op of [false, true]) for (const up of [false, true]) BOXES.set(doorId(t, hr, op, up), [rotateBox(doorBox(hr, op), t)]);
for (let t = 0; t < 4; t++) {
  BOXES.set(T.REED_STAIR + t, STAIR_BASE.map((b) => rotateBox(b, t)));
  BOXES.set(T.REED_CHAIR + t, CHAIR_BASE.map((b) => rotateBox(b, t)));
}
var blockBoxes = (id) => BOXES.get(id) ?? null;
var isBrazier = (id) => id === T.BRAZIER || id === T.BRAZIER_LIT;
var BRAZIER_HEIGHT = 0.774;
var BRAZIER_LIGHT = 13;
var lightLevelOf = (id) => id === T.LANTERN ? 15 : id === T.BRAZIER_LIT ? BRAZIER_LIGHT : 0;
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
function modelOf(id) {
  if (isWorkbench(id)) return { kind: "workbench", turn: workbenchTurn(id) };
  if (isMarco(id)) return { kind: "marco", turn: marcoTurn(id) };
  if (isPanel(id)) return { kind: "painel", turn: id === T.PAINEL ? 0 : 1 };
  if (isLadder(id)) return { kind: "escada", turn: ladderTurn(id) };
  if (isChest(id)) return { kind: "bau", turn: chestTurn(id) };
  if (isBedFoot(id)) return { kind: "cama", turn: bedTurn(id) };
  if (isStair(id)) return { kind: "degrau", turn: stairTurn(id) };
  if (isChair(id)) return { kind: "cadeira", turn: chairTurn(id) };
  if (isDoor2(id) && !isDoorUpper(id)) return { kind: "porta", turn: id - T.DOOR & 15 };
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
BLOCK_TILES[T.REED_BLOCK] = faces3("21-bloco-de-junco");
BLOCK_TILES[T.REED_SLAB] = [tileIndex("22-laje-de-junco/topo"), tileIndex("22-laje-de-junco/lateral"), tileIndex("22-laje-de-junco/topo")];
BLOCK_TILES[T.REED_SLAB_TOP] = BLOCK_TILES[T.REED_SLAB];
var inRegion = (x, z, r = REGION_LEGACY) => x >= r.min && x < r.max && z >= r.min && z < r.max;
var chunkOf = (v) => Math.floor(v / 16);
var localOf = (v) => v - chunkOf(v) * 16;
var sectionOf = (y) => Math.floor((y - Y_MIN) / SECTION);
var columnIndex = (lx, y, lz) => ((y - Y_MIN) * 16 + lz) * 16 + lx;
var unpackIndex = (i) => ({ lx: i & 15, lz: i >> 4 & 15, y: (i >> 8) + Y_MIN });
var chunkKey2 = (cx, cz) => `${cx},${cz}`;

// src/titan/items.ts
var Item2 = { SAND: 1, DAMP_SAND: 2, DARK_ROCK: 3, FROST: 4, ROCK_SHARD: 5, FROST_SHARD: 6, CAPSULE: 7, LANTERN: 8, WORKBENCH: 9, ICE_LENS: 10, EMBER: 11, GLASS_REED: 12, SLAB: 13, MARCO: 14, PAINEL: 15, NOZ: 16, COPPER_SHARD: 17, COPPER_INGOT: 18, DRY_REED: 19, STONE_PICK: 20, BRAZIER: 21, STONE_DAGGER: 22, COPPER_PICK: 23, COPPER_DAGGER: 24, PLATE: 25, CARAPACE: 26, RAW_MEAT: 27, COOKED_MEAT: 28, EMBER_BLOCK: 29, NOZ_TORRADA: 30, ESTEIRA: 31, ESCADA: 32, BAU: 33, CAMA: 34, BALDE: 35, BALDE_CHEIO: 36, BLOCO_JUNCO: 37, LAJE_JUNCO: 38, DEGRAU_JUNCO: 39, CADEIRA_JUNCO: 40, PORTA_JUNCO: 41 };
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
var maxStack = (item) => item === Item2.CAPSULE || item === Item2.LANTERN || item === Item2.WORKBENCH || isBucket(item) || isTool(item) ? 1 : 64;
var isItem = (n) => Number.isInteger(n) && n >= 1 && n <= 41;
var isBucket = (item) => item === Item2.BALDE || item === Item2.BALDE_CHEIO;
function blockOfItem(item) {
  if (item >= Item2.SAND && item <= Item2.FROST) return item;
  if (item === Item2.LANTERN) return T.LANTERN;
  if (item === Item2.WORKBENCH) return T.WORKBENCH;
  if (item === Item2.SLAB) return T.SLAB;
  if (item === Item2.BLOCO_JUNCO) return T.REED_BLOCK;
  if (item === Item2.LAJE_JUNCO) return T.REED_SLAB;
  if (item === Item2.DEGRAU_JUNCO) return T.REED_STAIR;
  if (item === Item2.CADEIRA_JUNCO) return T.REED_CHAIR;
  if (item === Item2.PORTA_JUNCO) return T.DOOR;
  if (item === Item2.MARCO) return T.MARCO;
  if (item === Item2.PAINEL) return T.PAINEL;
  if (item === Item2.CARAPACE) return T.CARAPACE;
  if (item === Item2.EMBER_BLOCK) return T.EMBER_BLOCK;
  if (item === Item2.CAMA) return T.BED;
  if (item === Item2.BAU) return T.CHEST;
  if (item === Item2.ESCADA) return T.LADDER;
  if (item === Item2.ESTEIRA) return T.MAT;
  if (item === Item2.BRAZIER) return T.BRAZIER;
  return null;
}
function itemOfBlock(block) {
  if (block >= T.SAND && block <= T.FROST) return block;
  if (block === T.VEIN_ROCK) return Item2.DARK_ROCK;
  if (block === T.VEIN_FROST) return Item2.FROST;
  if (block === T.LANTERN) return Item2.LANTERN;
  if (isWorkbench(block)) return Item2.WORKBENCH;
  if (isMarco(block)) return Item2.MARCO;
  if (isPanel(block)) return Item2.PAINEL;
  if (block === T.CARAPACE) return Item2.CARAPACE;
  if (block === T.EMBER_BLOCK) return Item2.EMBER_BLOCK;
  if (block === T.MAT) return Item2.ESTEIRA;
  if (block >= T.LADDER && block <= T.LADDER_270) return Item2.ESCADA;
  if (block >= T.CHEST && block <= T.CHEST_270) return Item2.BAU;
  if (block >= T.BED && block <= T.BED_HEAD_270) return Item2.CAMA;
  if (block === T.BRAZIER || block === T.BRAZIER_LIT) return Item2.BRAZIER;
  if (block >= T.REED_STAIR && block <= T.REED_STAIR_270) return Item2.DEGRAU_JUNCO;
  if (block >= T.REED_CHAIR && block <= T.REED_CHAIR_270) return Item2.CADEIRA_JUNCO;
  if (block >= T.DOOR && block <= T.DOOR_LAST) return Item2.PORTA_JUNCO;
  if (block === T.REED_BLOCK) return Item2.BLOCO_JUNCO;
  if (block === T.REED_SLAB || block === T.REED_SLAB_TOP) return Item2.LAJE_JUNCO;
  if (block === T.SLAB || block === T.SLAB_TOP || block === T.SLAB_DOUBLE) return Item2.SLAB;
  return null;
}
var dropCountOf = (block) => block === T.SLAB_DOUBLE ? 2 : 1;
var FOOD = { [Item2.NOZ]: { hunger: 4, saturation: 2.4 }, [Item2.NOZ_TORRADA]: { hunger: 7, saturation: 5.6 }, [Item2.RAW_MEAT]: { hunger: 2, saturation: 1.2 }, [Item2.COOKED_MEAT]: { hunger: 8, saturation: 12.8 } };
var foodOf = (item) => FOOD[item] ?? null;
var TOOLS2 = {
  [Item2.STONE_PICK]: { kind: "pick", tier: "rock" },
  [Item2.COPPER_PICK]: { kind: "pick", tier: "copper" },
  [Item2.STONE_DAGGER]: { kind: "dagger", tier: "rock" },
  [Item2.COPPER_DAGGER]: { kind: "dagger", tier: "copper" }
};
var toolOf = (item) => item ? TOOLS2[item] ?? null : null;
var isTool = (item) => item in TOOLS2;
var isPick = (item) => toolOf(item)?.kind === "pick";

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
  reed: { bottom: T.REED_SLAB, top: T.REED_SLAB_TOP, whole: T.REED_BLOCK }
};
function resolveSlabPlacement(targetId, ny, hy, held = T.SLAB) {
  const f = held === T.REED_SLAB || held === T.REED_SLAB_TOP ? FAMILY.reed : FAMILY.rock;
  if (targetId === f.bottom && ny === 1) return { merge: true, block: f.whole };
  if (targetId === f.top && ny === -1) return { merge: true, block: f.whole };
  const top = ny === -1 || ny === 0 && (hy ?? 0) >= 0.5;
  return { merge: false, block: top ? f.top : f.bottom };
}

// src/titan/recipes.ts
var RECIPES2 = [
  { id: "mesa", name: "Mesa de Trabalho", group: "utilidades", result: { item: Item2.WORKBENCH, count: 1 }, ingredients: [{ item: Item2.DARK_ROCK, count: 4 }], station: "personal" },
  { id: "lente", name: "Lente de Gelo", group: "materiais", result: { item: Item2.ICE_LENS, count: 1 }, ingredients: [{ item: Item2.FROST_SHARD, count: 1 }], station: "workbench" },
  { id: "lanterna", name: "Lanterna da Margem", group: "utilidades", result: { item: Item2.LANTERN, count: 1 }, ingredients: [{ item: Item2.ROCK_SHARD, count: 2 }, { item: Item2.ICE_LENS, count: 1 }, { item: Item2.EMBER, count: 1 }], station: "workbench" },
  { id: "marco", name: "Marco de Margem", group: "construcao", result: { item: Item2.MARCO, count: 1 }, ingredients: [{ item: Item2.ROCK_SHARD, count: 1 }, { item: Item2.GLASS_REED, count: 1 }], station: "workbench" },
  { id: "painel", name: "Painel de Junco", group: "construcao", result: { item: Item2.PAINEL, count: 2 }, ingredients: [{ item: Item2.GLASS_REED, count: 2 }, { item: Item2.DARK_ROCK, count: 1 }], station: "workbench" },
  { id: "laje", name: "Laje de Rocha", group: "construcao", result: { item: Item2.SLAB, count: 6 }, ingredients: [{ item: Item2.DARK_ROCK, count: 3 }], station: "workbench" },
  { id: "picareta-rocha", name: "Picareta de Rocha", group: "ferramentas", result: { item: Item2.STONE_PICK, count: 1 }, ingredients: [{ item: Item2.ROCK_SHARD, count: 3 }, { item: Item2.DRY_REED, count: 2 }], station: "workbench" },
  { id: "braseiro", name: "Braseiro de Rocha", group: "utilidades", result: { item: Item2.BRAZIER, count: 1 }, ingredients: [{ item: Item2.DARK_ROCK, count: 4 }], station: "workbench" },
  { id: "revestimento", name: "Revestimento de Carapa\xE7a", group: "construcao", result: { item: Item2.CARAPACE, count: 2 }, ingredients: [{ item: Item2.PLATE, count: 1 }, { item: Item2.DARK_ROCK, count: 1 }], station: "workbench" },
  { id: "lingote-cobre", name: "Lingote de Cobre de Duna", group: "materiais", result: { item: Item2.COPPER_INGOT, count: 1 }, ingredients: [{ item: Item2.COPPER_SHARD, count: 2 }], station: "brazier" },
  { id: "bloco-junco", name: "Bloco de Junco", group: "construcao", result: { item: Item2.BLOCO_JUNCO, count: 1 }, ingredients: [{ item: Item2.DRY_REED, count: 6 }], station: "workbench" },
  { id: "laje-junco", name: "Laje de Junco", group: "construcao", result: { item: Item2.LAJE_JUNCO, count: 6 }, ingredients: [{ item: Item2.BLOCO_JUNCO, count: 3 }], station: "workbench" },
  { id: "degrau-junco", name: "Degrau de Junco", group: "construcao", result: { item: Item2.DEGRAU_JUNCO, count: 4 }, ingredients: [{ item: Item2.BLOCO_JUNCO, count: 3 }], station: "workbench" },
  { id: "cadeira-junco", name: "Cadeira de Junco", group: "construcao", result: { item: Item2.CADEIRA_JUNCO, count: 1 }, ingredients: [{ item: Item2.DRY_REED, count: 3 }, { item: Item2.ESTEIRA, count: 1 }], station: "workbench" },
  { id: "porta-junco", name: "Porta de Junco", group: "construcao", result: { item: Item2.PORTA_JUNCO, count: 1 }, ingredients: [{ item: Item2.BLOCO_JUNCO, count: 3 }], station: "workbench" },
  // provisória (ADR 0102): pede calibragem em jogo
  { id: "balde", name: "Balde de Cobre", group: "ferramentas", result: { item: Item2.BALDE, count: 1 }, ingredients: [{ item: Item2.COPPER_INGOT, count: 3 }], station: "workbench" },
  { id: "cama", name: "Cama de Junco", group: "construcao", result: { item: Item2.CAMA, count: 1 }, ingredients: [{ item: Item2.DARK_ROCK, count: 3 }, { item: Item2.ESTEIRA, count: 2 }], station: "workbench" },
  { id: "bau", name: "Ba\xFA de Rocha e Junco", group: "construcao", result: { item: Item2.BAU, count: 1 }, ingredients: [{ item: Item2.DARK_ROCK, count: 4 }, { item: Item2.ESTEIRA, count: 1 }], station: "workbench" },
  { id: "escada", name: "Escada de Junco", group: "construcao", result: { item: Item2.ESCADA, count: 3 }, ingredients: [{ item: Item2.DRY_REED, count: 4 }], station: "workbench" },
  { id: "esteira", name: "Esteira de Junco", group: "construcao", result: { item: Item2.ESTEIRA, count: 1 }, ingredients: [{ item: Item2.DRY_REED, count: 3 }], station: "workbench" },
  { id: "noz-torrada", name: "Noz Torrada", group: "materiais", result: { item: Item2.NOZ_TORRADA, count: 1 }, ingredients: [{ item: Item2.NOZ, count: 1 }], station: "brazier" },
  { id: "carne-assada", name: "Carne Assada de Farejador", group: "materiais", result: { item: Item2.COOKED_MEAT, count: 1 }, ingredients: [{ item: Item2.RAW_MEAT, count: 1 }], station: "brazier" },
  { id: "picareta-cobre", name: "Picareta de Cobre", group: "ferramentas", result: { item: Item2.COPPER_PICK, count: 1 }, ingredients: [{ item: Item2.COPPER_INGOT, count: 3 }, { item: Item2.DRY_REED, count: 2 }], station: "workbench" },
  { id: "adaga-rocha", name: "Adaga de Rocha", group: "ferramentas", result: { item: Item2.STONE_DAGGER, count: 1 }, ingredients: [{ item: Item2.ROCK_SHARD, count: 1 }, { item: Item2.DRY_REED, count: 1 }], station: "workbench" },
  { id: "adaga-cobre", name: "Adaga de Cobre", group: "ferramentas", result: { item: Item2.COPPER_DAGGER, count: 1 }, ingredients: [{ item: Item2.COPPER_INGOT, count: 1 }, { item: Item2.DRY_REED, count: 1 }], station: "workbench" },
  { id: "ambar-compactado", name: "Bloco de \xC2mbar Compactado", group: "construcao", result: { item: Item2.EMBER_BLOCK, count: 1 }, ingredients: [{ item: Item2.EMBER, count: 9 }], station: "workbench" },
  { id: "ambar-desmontar", name: "Desmontar Bloco de \xC2mbar", group: "materiais", result: { item: Item2.EMBER, count: 9 }, ingredients: [{ item: Item2.EMBER_BLOCK, count: 1 }], station: "workbench" }
];
var stationMet = (r, at3) => r.station === "personal" || r.station === at3;
function matchBench(totals) {
  for (const r of RECIPES2) {
    if (r.ingredients.length === totals.size && r.ingredients.every((g) => totals.get(g.item) === g.count)) return r;
  }
  return null;
}

// src/titan/furnace.ts
var COOK_TIME_S = 10;
var FUEL_TIME_S = { [Item2.EMBER]: 40, [Item2.EMBER_BLOCK]: 360 };
var newFurnace = () => ({ input: null, fuel: null, output: null, burnLeft: 0, burnTotal: 0, cook: 0 });
var furnaceKey = (x, y, z) => `${x},${y},${z}`;
function smeltRecipe(item) {
  return RECIPES2.find((r) => r.station === "brazier" && r.ingredients.length === 1 && r.ingredients[0].item === item) ?? null;
}
var isFuel = (item) => item in FUEL_TIME_S;
var accepts = (slot, item) => slot === "input" ? smeltRecipe(item) !== null : slot === "fuel" ? isFuel(item) : false;
function canSmelt(f) {
  const r = f.input ? smeltRecipe(f.input.item) : null;
  if (!f.input || !r || f.input.count < r.ingredients[0].count) return false;
  if (!f.output) return true;
  return f.output.item === r.result.item && f.output.count + r.result.count <= maxStack(r.result.item);
}
var isWorking = (f) => f.burnLeft > 0 && canSmelt(f);
function tickFurnace(f, dt) {
  let changed = false;
  const was = isWorking(f);
  let rest = dt;
  for (let guard = 0; rest > EPS && guard < 64; guard++) {
    const can = canSmelt(f);
    if (f.burnLeft <= EPS && can && f.fuel && isFuel(f.fuel.item)) {
      f.burnTotal = f.burnLeft = FUEL_TIME_S[f.fuel.item];
      if (--f.fuel.count <= 0) f.fuel = null;
      changed = true;
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
      const r = smeltRecipe(f.input.item);
      f.cook = 0;
      if ((f.input.count -= r.ingredients[0].count) <= 0) f.input = null;
      f.output = f.output ? { item: f.output.item, count: f.output.count + r.result.count } : { item: r.result.item, count: r.result.count };
      changed = true;
    }
  }
  if (was !== isWorking(f)) changed = true;
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
function furnaceFromData(d) {
  const o = d && typeof d === "object" ? d : {};
  const f = newFurnace();
  const i = unpack(o.i), fu = unpack(o.f);
  f.input = i && accepts("input", i.item) ? i : null;
  f.fuel = fu && accepts("fuel", fu.item) ? fu : null;
  f.output = unpack(o.o);
  f.burnTotal = num(o.t, 0, 600);
  f.burnLeft = Math.min(num(o.b, 0, 600), f.burnTotal);
  f.cook = num(o.c, 0, COOK_TIME_S);
  return f;
}

// src/titan/sky.ts
var DAY_TICKS = 24e3;
var TICKS_PER_SECOND = 20;
var DAY_SECONDS = DAY_TICKS / TICKS_PER_SECOND;
var PHASE_TICKS = { sunsetStart: 12e3, nightStart: 13800, sunriseStart: 22200 };
var tickFrac = (ticks) => ticks / DAY_TICKS;
var AFTERNOON = tickFrac(9e3);
var WAKE_TICKS = 600;
var isNightTime = (frac) => frac * DAY_TICKS >= PHASE_TICKS.nightStart;
var FIXED_HOURS = { manha: tickFrac(720), tarde: tickFrac(9e3), crepusculo: tickFrac(12900), noite: tickFrac(18e3) };
function advanceDay(frac, dtSeconds) {
  const f = (frac + dtSeconds / DAY_SECONDS) % 1;
  return f < 0 ? f + 1 : f;
}
function validDay(f) {
  return typeof f === "number" && Number.isFinite(f) && f >= 0 && f < 1 ? f : AFTERNOON;
}
var hex = (n) => [(n >> 16 & 255) / 255, (n >> 8 & 255) / 255, (n & 255) / 255];
var MANHA = { zenith: hex(11565650), mid: hex(14259804), horizon: hex(16040090), fog: hex(14725256), ambient: 0.85, tint: [1, 0.97, 0.92] };
var TARDE = { zenith: hex(12152371), mid: hex(14259010), horizon: hex(15912083), fog: hex(13803622), ambient: 1, tint: [1, 1, 1] };
var NOITE = { zenith: hex(328714), mid: hex(722962), horizon: hex(2364440), fog: hex(1116944), ambient: 0.22, tint: [0.84, 0.95, 1.22] };
var LOOKS = [
  { t: 0, ...MANHA },
  { t: tickFrac(6e3), ...TARDE },
  { t: tickFrac(PHASE_TICKS.sunsetStart), ...TARDE },
  { t: tickFrac(PHASE_TICKS.nightStart), ...NOITE },
  { t: tickFrac(PHASE_TICKS.sunriseStart), ...NOITE }
];
var mix = (a, b, k) => [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k];
var ease = (k) => k * k * (3 - 2 * k);
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
function skyAt(frac) {
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
  return {
    tint: mix(a.tint, b.tint, k),
    glowDir,
    glow,
    glowK,
    cool: COOL,
    coolK: 0.65 * dayK,
    haze: 0.45 + 0.55 * dayK,
    stars,
    zenith: mix(a.zenith, b.zenith, k),
    mid: mix(a.mid, b.mid, k),
    horizon: mix(a.horizon, b.horizon, k),
    fog: mix(a.fog, b.fog, k),
    ambient: a.ambient + (b.ambient - a.ambient) * k,
    sun: { dir: [d[0] / m, d[1] / m, d[2] / m], alpha: up ? Math.min(1, Math.max(0, (elev - 0.55) / 0.2)) : 0 }
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
var STEP_HEIGHT2 = 0.6;
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
  if (collides(v, b.x, b.y + STEP_HEIGHT2, b.z) || collides(v, nx, b.y + STEP_HEIGHT2, nz)) return 0;
  const top = landingY(v, nx, nz, b.y, b.y + STEP_HEIGHT2);
  const up = top - b.y;
  if (up <= 0.01 || up > STEP_HEIGHT2 + 1e-4 || collides(v, nx, top, nz)) return 0;
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
  [Item2.STONE_PICK]: 131,
  [Item2.STONE_DAGGER]: 131,
  [Item2.COPPER_PICK]: 190,
  [Item2.COPPER_DAGGER]: 190
};
var maxDurability = (item) => MAX_DURABILITY[item] ?? null;
function wearCost(tool, action) {
  const t = toolOf(tool);
  if (!t) return 0;
  if (action.type === "break_block") return isCollectBlock(action.block) ? 0 : t.kind === "dagger" ? 2 : 1;
  return t.kind === "dagger" ? 1 : 2;
}

// src/titan/inventory.ts
var HOTBAR = 9;
var BAG = 27;
var SLOTS2 = HOTBAR + BAG;
var OLD_HOTBAR = 7;
var OLD_BAG = 24;
var CRAFT_SLOTS = 4;
var CRAFT_START = SLOTS2;
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
    for (let i = 0; i < SLOTS2; i++) if (this.s[i]?.item === item) n += this.s[i].count;
    return n;
  }
  /** Quanto de `item` ainda cabe (pilhas parciais + espaços vazios). */
  room(item) {
    const m = maxStack(item);
    let r = 0;
    for (let i = 0; i < SLOTS2; i++) {
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
    for (let i = 0; i < SLOTS2 && left > 0; i++) {
      const c = this.s[i];
      if (c && c.item === item && c.count < m) {
        const t = Math.min(m - c.count, left);
        c.count += t;
        left -= t;
      }
    }
    for (let i = 0; i < SLOTS2 && left > 0; i++) {
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
    if (!Number.isInteger(slot) || slot < 0 || slot >= SLOTS2 || !this.s[slot]) return null;
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
      const order = [...Array(SLOTS2).keys()].filter((i) => copy[i]?.item === g.item).sort((a, b) => (a >= HOTBAR ? 0 : 1) - (b >= HOTBAR ? 0 : 1) || copy[a].count - copy[b].count || b - a);
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
    for (let i = 0; i < SLOTS2; i++) {
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
    for (let i = 0; i < SLOTS2; i++) this.s[i] = d[i];
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
    let ok2 = true;
    for (let i = 0; i < CRAFT_SLOTS; i++) {
      const c = this.s[CRAFT_START + i];
      if (!c) continue;
      this.s[CRAFT_START + i] = null;
      if (!this.add(c.item, c.count)) {
        this.s[CRAFT_START + i] = c;
        ok2 = false;
      }
    }
    return ok2;
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
  takeBenchResult(at3) {
    const rec = this.benchRecipe();
    if (!rec) return "none";
    if (!stationMet(rec, at3)) return "station";
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
    return { v: 3, slots: this.s.slice(0, SLOTS2).map(pack2), craft: this.s.slice(SLOTS2, SLOTS2 + CRAFT_SLOTS).map(pack2), ...bench.some(Boolean) ? { bench } : {} };
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
    } else read(o?.slots, SLOTS2, 0);
    read(o?.craft, CRAFT_SLOTS, SLOTS2);
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
var CHEST_SLOTS2 = 18;
var newChest = () => new Array(CHEST_SLOTS2).fill(null);
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
  for (let i = 0; i < CHEST_SLOTS2 && i < d.length; i++) {
    const e = d[i];
    if (!Array.isArray(e) || !isItem(e[0]) || !Number.isInteger(e[1]) || e[1] < 1 || e[1] > maxStack(e[0])) continue;
    const max = maxDurability(e[0]), wear = max !== null && Number.isInteger(e[2]) && e[2] >= 1 && e[2] < max ? e[2] : 0;
    c[i] = { item: e[0], count: e[1], ...wear ? { wear } : {} };
  }
  return c;
}
var chestIsEmpty = (c) => c.every((s) => !s);

// src/titan/crops.ts
var CROP_TICK_MEAN_S = 30;
var CROP_SIM_RADIUS = 56;
var CROP_MIN_LIGHT = 9;
var CROP_YIELD = 2;
var cropKey = (x, y, z) => `${x},${y},${z}`;
var cropId2 = (x, y, z) => `crop:${x},${y},${z}`;
function parseCropId(id) {
  const m = /^crop:(-?\d+),(-?\d+),(-?\d+)$/.exec(id);
  return m ? [Number(m[1]), Number(m[2]), Number(m[3])] : null;
}
var soilKind = (block) => block === T.DAMP_SAND ? "umido" : block === T.SAND ? "seco" : null;
var maxAge = (kind) => kind === "umido" ? 2 : 1;
var maxAgeOf = (species, soil) => species === "noz" ? 2 : maxAge(soil);
var isRipe = (species, soil, age) => age >= maxAgeOf(species, soil);
function harvestOf(species, soil) {
  if (species === "noz") return { item: Item2.NOZ, count: NUT_YIELD, backTo: 1, label: "nozes" };
  return soil === "umido" ? { item: Item2.GLASS_REED, count: CROP_YIELD, backTo: 1, label: "mudas de junco" } : { item: Item2.DRY_REED, count: CROP_YIELD, backTo: 0, label: "hastes secas" };
}
var seedOf = (species) => species === "noz" ? Item2.NOZ : Item2.GLASS_REED;
var plantableSoil = (species, block) => species === "noz" ? block === T.SAND : soilKind(block) !== null;
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
  const kind = crop ? soilKind(s.volume.get(crop.x, crop.y - 1, crop.z)) : null;
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
  if (hit.ny !== 1 || !plantableSoil(species, s.volume.get(hit.x, hit.y, hit.z))) return { ok: false, msg: "A muda se planta no topo da areia" };
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
    if (isLadder(id) && fx === dx && fz === dz && s.volume.remove(x + dx, y, z + dz)) spillBlock(s, Item2.ESCADA, 1, x + dx, y, z + dz);
  }
}
function releaseMat(s, x, y, z) {
  if (!isMat(s.volume.get(x, y, z)) || !s.volume.remove(x, y, z)) return;
  spillBlock(s, Item2.ESTEIRA, 1, x, y, z);
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
  spillBlock(s, Item2.CAMA, 1, fx, y, fz);
  return { ok: true };
}
function doorHingeFor(v, x, y, z, turn) {
  const [rx, rz] = doorRight(turn), left = v.get(x - rx, y, z - rz);
  return isDoor2(left) && !isDoorUpper(left) && doorTurn(left) === turn && !isDoorHingeRight(left);
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
  if (!isDoor2(id) || !s.volume.breakable(x, y, z)) return { ok: false };
  const ly = isDoorUpper(id) ? y - 1 : y;
  for (const yy of [ly, ly + 1]) if (isDoor2(s.volume.get(x, yy, z))) s.volume.remove(x, yy, z);
  spillBlock(s, Item2.PORTA_JUNCO, 1, x, ly, z);
  return { ok: true };
}
function useDoor(s, x, y, z) {
  const id = s.volume.get(x, y, z);
  if (!isDoor2(id)) return { ok: false };
  const ly = isDoorUpper(id) ? y - 1 : y, lo = s.volume.get(x, ly, z);
  if (!isDoor2(lo) || isDoorUpper(lo) || !isDoor2(s.volume.get(x, ly + 1, z))) return { ok: false };
  const closing = isDoorOpen(lo);
  if (closing) {
    const cb = blockBoxes(doorToggled(lo))?.[0], b = s.body;
    if (cb && b.x + BODY_HALF > x + cb[0] && b.x - BODY_HALF < x + cb[3] && b.z + BODY_HALF > z + cb[2] && b.z - BODY_HALF < z + cb[5] && b.y < ly + 2 && b.y + BODY_HEIGHT > ly) return { ok: false, msg: "Tem algu\xE9m no caminho da porta" };
  }
  const flip = (cx, cz) => {
    for (const yy of [ly, ly + 1]) {
      const d = s.volume.get(cx, yy, cz);
      if (isDoor2(d) && isDoorOpen(d) === closing) s.volume.set(cx, yy, cz, doorToggled(d));
    }
  };
  flip(x, z);
  const [rx, rz] = doorRight(doorTurn(lo)), sgn = isDoorHingeRight(lo) ? -1 : 1, px = x + sgn * rx, pz = z + sgn * rz, pd = s.volume.get(px, ly, pz);
  if (isDoor2(pd) && !isDoorUpper(pd) && doorTurn(pd) === doorTurn(lo) && isDoorHingeRight(pd) !== isDoorHingeRight(lo)) flip(px, pz);
  return { ok: true, open: !closing };
}
function useBed(s, x, y, z, sleep = true) {
  const id = s.volume.get(x, y, z);
  if (!isBed(id)) return { ok: false };
  const [dx, dz] = bedPartnerOffset(id), footX = isBedFoot(id) ? x : x + dx, footZ = isBedFoot(id) ? z : z + dz;
  s.spawn = { x: footX, y, z: footZ };
  s.metaRev++;
  if (!isNightTime(s.time)) return { ok: true, msg: "Ponto de retorno marcado. S\xF3 se dorme \xE0 noite." };
  if (!sleep) return { ok: true, msg: "Ponto de retorno marcado." };
  const wake = tickFrac(WAKE_TICKS);
  if (s.time > wake) s.days++;
  s.time = wake;
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
  if (!s.inventory.canAdd(Item2.GLASS_REED)) return FULL;
  s.inventory.add(Item2.GLASS_REED);
  s.collected.add(id);
  s.collectedRev++;
  return { ok: true };
}
function collectNut(s, id) {
  if (s.regrow.has(id) || !/^nut:(-?\d+),(-?\d+),(-?\d+)$/.test(id)) return { ok: false };
  const m = /^nut:(-?\d+),(-?\d+),(-?\d+)$/.exec(id);
  if (s.items.at(Number(m[1]), Number(m[2]), Number(m[3])) !== id) return { ok: false };
  if (!s.inventory.canAdd(Item2.NOZ, NUT_YIELD)) return FULL;
  s.inventory.add(Item2.NOZ, NUT_YIELD);
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
  if (id !== T.BRAZIER && id !== T.BRAZIER_LIT) return null;
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
  if (!accepts(slot, st.item)) return { ok: false, msg: slot === "fuel" ? "Isso n\xE3o queima" : "O braseiro n\xE3o cozinha isso" };
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
  if (!c || !st || invSlot >= SLOTS2) return { ok: false };
  if (chestRoom(c, st.item) < st.count) return { ok: false, msg: "Ba\xFA cheio" };
  const taken = s.inventory.take(invSlot);
  chestPut(c, taken);
  s.metaRev++;
  return { ok: true };
}
function chestTakeOut(s, x, y, z, slot) {
  const c = chestAt(s, x, y, z), st = c && Number.isInteger(slot) && slot >= 0 && slot < CHEST_SLOTS2 ? c[slot] : null;
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
  if (isDoor2(s.volume.get(x, y, z))) return breakDoor(s, x, y, z);
  if (isCopperVein(s.volume.get(x, y, z))) {
    if (!isPick(s.inventory.get(s.selected)?.item)) return { ok: false, msg: "S\xF3 p\xF3 nos dedos. Falta uma picareta." };
    const reed0 = s.items.at(x, y + 1, z);
    if (!s.volume.remove(x, y, z)) return { ok: false };
    dropShard(s, Item2.COPPER_SHARD, x, y, z, COPPER_YIELD);
    releaseReed(s, reed0, x, y + 1, z);
    return { ok: true };
  }
  if (isAmberVein(s.volume.get(x, y, z))) {
    if (!isPick(s.inventory.get(s.selected)?.item)) return { ok: false, msg: "S\xF3 p\xF3 nos dedos. Falta uma picareta." };
    const reed0 = s.items.at(x, y + 1, z);
    if (!s.volume.remove(x, y, z)) return { ok: false };
    dropShard(s, Item2.EMBER, x, y, z, amberYield(x, y, z));
    releaseReed(s, reed0, x, y + 1, z);
    return { ok: true };
  }
  const reed = s.items.at(x, y + 1, z);
  if (s.volume.get(x, y, z) === T.EMBER) {
    if (!s.volume.remove(x, y, z)) return { ok: false };
    dropShard(s, Item2.EMBER, x, y, z);
    releaseReed(s, reed, x, y + 1, z);
    return { ok: true };
  }
  const item = itemOfBlock(s.volume.get(x, y, z));
  if (item === null) return { ok: false };
  const count = dropCountOf(s.volume.get(x, y, z));
  const block = s.volume.get(x, y, z);
  const direct = item === Item2.LANTERN;
  if (direct && !s.inventory.canAdd(item, count)) return FULL;
  if (!s.volume.remove(x, y, z)) return { ok: false };
  if (direct) s.inventory.add(item, count);
  else spillBlock(s, item, count, x, y, z);
  if (isBrazier(block)) spillFurnace(s, x, y, z);
  if (isChest(block)) spillChest(s, x, y, z);
  if (isVein(block)) dropShard(s, block === T.VEIN_ROCK ? 5 : 6, x, y, z);
  releaseReed(s, reed, x, y + 1, z);
  releaseCrop(s, x, y + 1, z);
  releaseMat(s, x, y + 1, z);
  releaseLadders(s, x, y, z);
  if (isBed(s.volume.get(x, y + 1, z))) breakBed(s, x, y + 1, z);
  if (isDoor2(s.volume.get(x, y + 1, z))) breakDoor(s, x, y + 1, z);
  return { ok: true };
}
function releaseReed(s, id, x, y, z) {
  if (!id || !id.startsWith("reed:") || s.collected.has(id)) return;
  s.collected.add(id);
  s.collectedRev++;
  dropShard(s, Item2.GLASS_REED, x, y, z);
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
  if (stack.item === Item2.BALDE) {
    if (v.get(hit.x, hit.y, hit.z) !== T.LAKE) return { ok: false, msg: "Aponte o balde para o lago" };
    if (v.get(hit.x, hit.y + 1, hit.z) === T.LAKE) return { ok: false, msg: "O balde s\xF3 recolhe a superf\xEDcie do lago" };
    if (!v.set(hit.x, hit.y, hit.z, T.AIR)) return { ok: false };
    s.inventory.replace(slot, Item2.BALDE_CHEIO);
    return { ok: true, msg: "Balde cheio" };
  }
  const x = hit.x + hit.nx, y = hit.y + hit.ny, z = hit.z + hit.nz;
  if (hit.item || !v.editable(x, y, z) || v.get(x, y, z) !== T.AIR) return { ok: false, msg: "Aqui n\xE3o d\xE1 para despejar" };
  if (y > LAKE_LAST_Y) return { ok: false, msg: "O l\xEDquido s\xF3 se despeja em cavidade abaixo da superf\xEDcie do lago" };
  const occupied = s.items.at(x, y, z) ?? [...s.drops.values()].find((d) => d.x === x && d.y === y && d.z === z)?.id ?? null;
  if (occupied || !v.set(x, y, z, T.LAKE)) return { ok: false, msg: "Aqui n\xE3o d\xE1 para despejar" };
  s.inventory.replace(slot, Item2.BALDE);
  return { ok: true, msg: "L\xEDquido despejado" };
}
function placeFromSlot(s, hit, slot) {
  const stack = s.inventory.get(slot);
  if (!stack) return { ok: false };
  if (isBucket(stack.item)) return useBucket(s, hit, slot);
  if (stack.item === Item2.NOZ && canPlantNut(s, hit)) return plantCrop(s, hit, slot, "noz");
  if (foodOf(stack.item)) return eatFromSlot(s, slot);
  if (stack.item === Item2.GLASS_REED) return plantCrop(s, hit, slot, "junco");
  let block = blockOfItem(stack.item);
  if (block === null) return { ok: false, msg: "Este item n\xE3o se coloca" };
  if (block === T.DOOR) return placeDoor(s, hit, slot);
  if (block === T.BED) return placeBed(s, hit, slot);
  if (block === T.LADDER) {
    if (hit.ny !== 0 || hit.item) return { ok: false, msg: "A escada se prende \xE0 lateral de um bloco" };
    if (!isFull(s.volume.get(hit.x, hit.y, hit.z))) return { ok: false, msg: "A escada precisa de um bloco inteiro atr\xE1s" };
    block = ladderId(ladderTurnOf(hit.nx, hit.nz));
  } else if (block === T.WORKBENCH) block = workbenchId(workbenchTurnFacing(s.yaw));
  else if (block === T.MARCO) block = marcoId(marcoTurnFacing(s.yaw));
  else if (block === T.PAINEL) block = panelIdFacing(s.yaw);
  else if (block === T.REED_STAIR) block = stairId(marcoTurnFacing(s.yaw));
  else if (block === T.REED_CHAIR) block = chairId(marcoTurnFacing(s.yaw));
  else if (block === T.CHEST) block = chestId(chestTurnFacing(s.yaw));
  if (block === T.SLAB || block === T.REED_SLAB) {
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
var KINDS2 = {
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
  return { id, kind, body: newBody(hx, den.y, hz), yaw: Math.PI / 2, phase: "wander", t: 0, home: { x: hx, z: hz }, goal: { x: hx, z: hz }, pause: kind === "grande" ? 1.5 : 0.4, cooldown: 0, stuck: 0, hp: KINDS2[kind].hp, aggro: 0, hurt: 99, clock: 0, seed: s };
}
function creatureSpecs(g) {
  if (g.version < 12) return g.den ? [{ id: "grande", kind: "grande", ...g.den }, { id: "pequeno", kind: "pequeno", ...g.den }] : [];
  const biome = biomeAt(g.arrival.x, g.arrival.z), out = [];
  const near2 = (p, id, kind, r) => {
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
      out.push(near2(p, `g${bigs.length - 1}`, "grande", 3));
    }
  }
  g.nutPlants.forEach((p, i) => {
    if (i === free) return;
    for (let k = 0; k < biome.pequenoPerPlant; k++) out.push(near2(p, k ? `p${i}_${k}` : `p${i}`, "pequeno", 2));
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
  const K = KINDS2[f.kind];
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
var WEAPON_DAMAGE = { [Item2.STONE_DAGGER]: 4, [Item2.COPPER_DAGGER]: 6, [Item2.STONE_PICK]: 2, [Item2.COPPER_PICK]: 3 };
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
  restDrop(s, `${base}:${n}:0`, Item2.RAW_MEAT, f.body.x, f.body.y, f.body.z, loot.meat);
  restDrop(s, `${base}:${n}:1`, Item2.PLATE, f.body.x, f.body.y, f.body.z, loot.plate);
  return { ok: true, damage, dead: true, broken: w.broken, toolName: w.name, loot, msg: `${KINDS2[f.kind].name} abatido: ${loot.meat} ${loot.meat > 1 ? "por\xE7\xF5es" : "por\xE7\xE3o"} de carne e ${loot.plate} placa${w.broken ? `; ${w.name} quebrou` : ""}` };
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
    let near2 = 0;
    for (const c of cands) {
      if (near2 >= 2) break;
      if (c.d >= 7 && c.d <= 16 && take(c, 3)) near2++;
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
    const near2 = (l) => l.some((f) => Math.hypot(f.x - x, f.z - z) < 5);
    if (near2(this.formations) || near2(this.copperSites) || near2(this.shelterSites) || near2(this.pillars)) return null;
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

// src/titan/volume.ts
var TitanVolume = class {
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
    const e = this.edits.get(chunkKey2(chunkOf(x), chunkOf(z)));
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
    const cx = chunkOf(x), cz = chunkOf(z);
    const key = chunkKey2(cx, cz);
    const idx2 = columnIndex(localOf(x), y, localOf(z));
    const baseId = this.gen.blockAt(x, y, z);
    let e = this.edits.get(key);
    const current = e?.get(idx2) ?? baseId;
    if (current === id) return false;
    if (id === baseId) {
      e?.delete(idx2);
      if (e && e.size === 0) this.edits.delete(key);
    } else {
      if (!e) {
        e = /* @__PURE__ */ new Map();
        this.edits.set(key, e);
      }
      e.set(idx2, id);
    }
    this.dirty.set(key, ++this.chunkRev);
    this.markSections(x, y, z);
    this.updateLight(x, y, z, current, id);
    this.onSet?.(x, y, z, id);
    return true;
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
    if (!isSolid(id) && id !== T.LANTERN && !isMarco(id) && id !== T.MAT && !isLadder(id)) return false;
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
      for (const idx2 of cells.keys()) {
        const u = unpackIndex(idx2);
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
      const key = chunkKey2(k.cx, k.cz);
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
      for (const [idx2, id] of c.edits) if (Number.isInteger(idx2) && idx2 >= 0 && idx2 < 384 * 256 && Number.isInteger(id) && id >= 0 && id <= T_MAX) m.set(idx2, id);
      if (m.size) this.edits.set(chunkKey2(c.cx, c.cz), m);
      for (const [idx2, id] of m) {
        const md = modelOf(id);
        if (md) {
          const u = unpackIndex(idx2);
          const x = c.cx * 16 + u.lx, z = c.cz * 16 + u.lz;
          this.models[md.kind].set(lightKey(x, u.y, z), [x, u.y, z, md.turn]);
        }
      }
      for (const [idx2, id] of m) {
        const lv = lightLevelOf(id);
        if (!lv) continue;
        const u = unpackIndex(idx2);
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
  models = { workbench: /* @__PURE__ */ new Map(), marco: /* @__PURE__ */ new Map(), painel: /* @__PURE__ */ new Map(), escada: /* @__PURE__ */ new Map(), bau: /* @__PURE__ */ new Map(), cama: /* @__PURE__ */ new Map(), braseiro: /* @__PURE__ */ new Map(), braseiroAceso: /* @__PURE__ */ new Map(), degrau: /* @__PURE__ */ new Map(), cadeira: /* @__PURE__ */ new Map(), porta: /* @__PURE__ */ new Map() };
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
      return id && !s.collected.has(id) ? id : reedAt(x, y, z) ?? nutAt(x, y, z) ?? (s.crops.has(cropKey(x, y, z)) ? cropId2(x, y, z) : null);
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
    if (b === T.BRAZIER || b === T.BRAZIER_LIT) out.set(k, furnaceFromData(v));
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
    const r = tickFurnace(f, dt);
    if (!r.changed) continue;
    any = true;
    s.metaRev++;
    const [x, y, z] = k.split(",").map(Number);
    const want = isWorking(f) ? T.BRAZIER_LIT : T.BRAZIER, cur = s.volume.get(x, y, z);
    if ((cur === T.BRAZIER || cur === T.BRAZIER_LIT) && cur !== want) s.volume.set(x, y, z, want);
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
    const noz = !!v && typeof v === "object" && v.s === "noz", age = noz ? v.a : v;
    if (!m || typeof age !== "number" || !Number.isInteger(age) || age < 0) continue;
    const [x, y, z] = [Number(m[1]), Number(m[2]), Number(m[3])], species = noz ? "noz" : "junco", below = vol.get(x, y - 1, z), kind = soilKind(below);
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
  const s = { seed: gen.seed, volume, body: newBody(a.x, a.y, a.z), yaw: a.yaw, pitch: -0.12, selected: 0, resumed: false, relocated: false, time: AFTERNOON, days: 0, inventory: Inventory.starting(), collected, collectedRev: 0, regrow, crops, furnaces: /* @__PURE__ */ new Map(), chests: /* @__PURE__ */ new Map(), spawn: null, respawn: /* @__PURE__ */ new Map(), creatures: creaturesFor(gen), savedStateRev: -1, drops: /* @__PURE__ */ new Map(), dropFx: /* @__PURE__ */ new Map(), dropsRev: 0, vitals: newVitals(), known: /* @__PURE__ */ new Set(), grants, metaRev: 0, items: makeItems({ volume, collected, grants, regrow, crops }) };
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
  const converted = save.header.v < 4 ? inv.convertItem(Item2.CAPSULE, Item2.EMBER) : 0;
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
  const s = { seed: gen.seed, volume, body: newBody(safe.x, safe.y, safe.z), yaw: p.yaw, pitch: p.pitch, selected: Math.max(0, Math.min(HOTBAR - 1, save.header.selected | 0)), resumed: true, relocated: moved, time: validDay(save.header.time), days: Number.isInteger(save.header.days) && save.header.days >= 0 ? save.header.days : 0, inventory: inv, collected, collectedRev: 0, regrow, crops, furnaces: validFurnaces(save.header.furnaces, volume), chests: validChests(save.header.chests, volume), spawn: validSpawn(save.header.spawn, volume), respawn, creatures: creaturesFor(gen).filter((c) => !respawn.has(c.id)), savedStateRev: -1, drops: validDrops(save.header.drops, gen), dropFx: /* @__PURE__ */ new Map(), dropsRev: 0, known, grants, metaRev: 0, vitals: vitalsFromData(save.header.vitals), items: makeItems({ volume, collected, grants, regrow, crops }) };
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
  const hasBench = s.inventory.total(Item2.WORKBENCH) > 0 || s.volume.workbenchCells().length > 0;
  const add = (id, cond) => {
    if (cond && !s.known.has(id)) {
      s.known.add(id);
      out.push(id);
    }
  };
  add("bancada", hasBench);
  add("mesa", s.inventory.total(Item2.DARK_ROCK) > 0 || hasBench);
  add("braseiro", s.inventory.total(Item2.COPPER_SHARD) > 0 || s.inventory.total(Item2.COPPER_INGOT) > 0 || s.inventory.total(Item2.BRAZIER) > 0 || s.furnaces.size > 0);
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
function cropLight(s, x, y, z) {
  let open3 = true;
  for (let yy = y + 1; yy <= Y_MAX; yy++) if (isSolid(s.volume.get(x, yy, z))) {
    open3 = false;
    break;
  }
  return Math.max(open3 ? skyAt(s.time).ambient * 15 : 0, s.volume.light(x, y + 1, z));
}
function tickCrops(s, dt, rng, near2) {
  let changed = false;
  const pTick = 1 - Math.exp(-dt / CROP_TICK_MEAN_S);
  for (const c of s.crops.values()) {
    if (Math.hypot(c.x + 0.5 - near2.x, c.z + 0.5 - near2.z) > CROP_SIM_RADIUS || rng() >= pTick) continue;
    const kindAt = (dx, dz) => soilKind(s.volume.get(c.x + dx, c.y - 1, c.z + dz));
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
  return { v: TITAN_SAVE_VERSION, world: "titan", seed: s.seed, generatorVersion: s.volume.gen.version, savedAt: Date.now(), player: { x: s.body.x, y: s.body.y, z: s.body.z, yaw: s.yaw, pitch: s.pitch }, selected: s.selected, time: s.time, days: s.days, inventory: { bag: s.inventory.toData(), collected: [...s.collected].sort() }, recipes: [...s.known].sort(), grants: s.grants.ember ? { ember: s.grants.ember } : void 0, drops: [...s.drops.values()].sort((a, b) => a.id < b.id ? -1 : 1), vitals: vitalsToData(s.vitals), ...s.respawn.size ? { respawn: Object.fromEntries(s.respawn) } : {}, ...s.spawn ? { spawn: s.spawn } : {}, ...s.chests.size ? { chests: Object.fromEntries([...s.chests].filter(([, c]) => !chestIsEmpty(c)).map(([k, c]) => [k, chestToData(c)])) } : {}, ...s.furnaces.size ? { furnaces: Object.fromEntries([...s.furnaces].map(([k, f]) => [k, furnaceToData(f)])) } : {}, ...s.regrow.size ? { regrow: Object.fromEntries([...s.regrow].map(([id, t]) => [id, Math.round(t * 10) / 10])) } : {}, ...s.crops.size ? { crops: Object.fromEntries([...s.crops.values()].map((c) => [cropKey(c.x, c.y, c.z), c.species === "noz" ? { s: "noz", a: c.age } : c.age])) } : {} };
}

// src/net/titan/protocol.ts
var TITAN_PROTOCOL_VERSION = 2;
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
    if (rest.length && rest.every((o) => o.bed) && isNightTime(this.world.time)) {
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
    const near2 = !cell || Math.hypot(cell.x + 0.5 - b.x, cell.y + 0.5 - (b.y + EYE_HEIGHT), cell.z + 0.5 - b.z) <= TITAN_ROOM_REACH;
    if (near2) {
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
    if (isDoor2(id)) return useDoor(p.view, x, y, z);
    if (!isBed(id)) return { ok: false };
    const r = useBed(p.view, x, y, z, false);
    if (!isNightTime(this.world.time)) return r;
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
    const idx2 = this.world.creatures.findIndex((c) => c.id === id), f = this.world.creatures[idx2], b = p.view.body;
    if (!f) return { ok: false };
    if (Math.hypot(f.body.x - b.x, f.body.y - (b.y + EYE_HEIGHT), f.body.z - b.z) > TITAN_STRIKE_REACH) return { ok: false, msg: "Longe demais" };
    if (this.clock - p.struckAt < ATTACK_COOLDOWN_S - 0.05) return { ok: false };
    p.struckAt = this.clock;
    const r = attackCreature(p.view, idx2);
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
        let near2 = null, nd = Infinity;
        for (const p of list) {
          const d = Math.hypot(f.body.x - p.view.body.x, f.body.z - p.view.body.z);
          if (d < nd) {
            nd = d;
            near2 = p;
          }
        }
        if (!near2 || f.phase === "wander" && nd > TITAN_SIM_RADIUS) continue;
        const ev = stepFarejador(f, w.volume, { x: near2.view.body.x, y: near2.view.body.y, z: near2.view.body.z }, dt);
        if (ev.hit) out.push({ to: near2.id, msg: { t: "hurt", damage: ev.damage, kind: f.kind } });
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
      out.push({ to: "all", msg: { t: "time", time: w.time, days: w.days } });
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
      out.push({ to: "all", msg: { t: "time", time: w.time, days: w.days } });
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
  MAX_PLAYERS,
  PROTOCOL_VERSION,
  ROOMS,
  ROOM_SNAPSHOT_VERSION,
  Room,
  TITAN_MAX_PLAYERS,
  TITAN_PROTOCOL_VERSION,
  TITAN_ROOMS,
  TITAN_SNAPSHOT_VERSION,
  TitanRoom,
  parseClientMessage,
  parseTitanClientMessage,
  roomById,
  sanitizeName,
  titanRoomById
});
