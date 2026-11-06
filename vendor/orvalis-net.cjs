// Gerado por mundoblocos-2d v0.55.0 (9b461ce) — npm run build:net. NÃO EDITE: atualize pelo jogo.
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
  ROOM_CODE_LENGTH: () => ROOM_CODE_LENGTH,
  Room: () => Room,
  makeRoomCode: () => makeRoomCode,
  normalizeRoomCode: () => normalizeRoomCode,
  parseClientMessage: () => parseClientMessage,
  sanitizeName: () => sanitizeName
});
module.exports = __toCommonJS(index_exports);

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
  // --- árvores que crescem (prancha de crescimento): muda → jovem → (crescendo) → adulta ---
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
  CRYSTAL_LIFE: 94,
  LIGHT_BLOCK: 95,
  WOOD_CELESTIAL: 96,
  FOLIAGE_GOLDEN: 97
};
var WHEAT_FIRST = 60;
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
  // Porta: ocupa a célula inteira (nada empilha em cima); fechada bloqueia, aberta deixa passar.
  object(Block.OAK_DOOR, "Porta de Carvalho", { shape: "door", organic: "wood" }),
  object(Block.TENT, "Tenda", { shape: "rock", organic: "wood" }),
  // madeira: o machado quebra
  object(Block.TENT_PART, "Tenda", { shape: "rock", placeable: false, organic: "wood" }),
  object(Block.CHEST, "Ba\xFA de Carvalho", { shape: "rock", organic: "wood" }),
  object(Block.CHAIR, "Cadeira de Madeira", { shape: "rock", organic: "wood" }),
  // madeira: o machado desmonta
  object(Block.CAMPFIRE, "Fogueira", { shape: "rock", organic: "wood", glow: true }),
  // madeira: o machado desmonta
  object(Block.CAULDRON, "Caldeir\xE3o de Pedra", { shape: "rock", stone: true, glow: true }),
  object(Block.OVEN, "Forno de Pedra", { shape: "rock", stone: true, glow: true }),
  object(Block.OAK_DOOR_OPEN, "Porta de Carvalho (aberta)", { shape: "door", solid: false, placeable: false, organic: "wood" }),
  object(Block.CACTUS, "Cacto", { placeable: false, organic: "plant" }),
  object(Block.OAK_TREE, "Carvalho", { shape: "tree", placeable: false, organic: "wood" }),
  object(Block.SAKURA_TREE, "Cerejeira", { shape: "tree", placeable: false, organic: "wood" }),
  // Mudas são plantas (a enxada arranca); dali em diante, madeira.
  object(Block.OAK_SAPLING, "Muda de Carvalho", { shape: "tree", placeable: false, organic: "plant" }),
  object(Block.OAK_YOUNG, "Carvalho Jovem", { shape: "tree", placeable: false, organic: "wood" }),
  object(Block.OAK_GROWING, "Carvalho Jovem", { shape: "tree", placeable: false, organic: "wood" }),
  object(Block.APPLE_SAPLING, "Muda de Macieira", { shape: "tree", placeable: false, organic: "plant" }),
  object(Block.APPLE_YOUNG, "Macieira Jovem", { shape: "tree", placeable: false, organic: "wood" }),
  object(Block.APPLE_TREE, "Macieira", { shape: "tree", placeable: false, organic: "wood" }),
  object(Block.APPLE_TREE_BARE, "Macieira", { shape: "tree", placeable: false, organic: "wood" }),
  object(Block.TALL_GRASS, "Capim", { shape: "decoration", solid: false, placeable: false, organic: "plant" }),
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
  ].map(([id, name]) => object(id, name, { shape: "building", breakable: false, placeable: false })),
  ...[
    [Block.LAMP, "Poste de Luz"],
    [Block.BARREL, "Barril"],
    [Block.CRATES, "Caixotes"],
    [Block.SIGNPOST, "Placa"],
    [Block.HEDGE, "Cerca Viva"]
  ].map(([id, name]) => object(id, name, { shape: "building", breakable: false, placeable: false })),
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
  Block.STONE_BRICK_CRACKED
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
var HOTBAR_BLOCKS = [...MATERIALS, Block.OAK_DOOR, Block.TENT, Block.CHEST, Block.CAMPFIRE, Block.CAULDRON, Block.OVEN, Block.CHAIR];
var TREE_NEXT = {
  [Block.OAK_SAPLING]: Block.OAK_YOUNG,
  [Block.OAK_YOUNG]: Block.OAK_GROWING,
  [Block.OAK_GROWING]: Block.OAK_TREE,
  [Block.APPLE_SAPLING]: Block.APPLE_YOUNG,
  [Block.APPLE_YOUNG]: Block.APPLE_TREE,
  [Block.APPLE_TREE_BARE]: Block.APPLE_TREE
};
function isGrowingTree(id) {
  return TREE_NEXT[id] !== void 0;
}
function isDoor(id) {
  return id === Block.OAK_DOOR || id === Block.OAK_DOOR_OPEN;
}

// src/world/items.ts
var Item = {
  WHEAT_SEED: "wheat_seed",
  WHEAT: "wheat",
  /** Espólios das aranhas (sem uso ainda — futuras receitas). */
  SILK: "silk",
  FANG: "fang",
  QUEEN_HEART: "queen_heart",
  /** Mudas (cortar a árvore adulta) e a fruta da macieira (comer vem com a comida, Fase P). */
  OAK_SAPLING: "oak_sapling",
  APPLE_SAPLING: "apple_sapling",
  APPLE: "apple",
  /** Hortaliças: o próprio legume é o que se planta (e o que se colhe). */
  POTATO: "potato",
  TOMATO: "tomato",
  CARROT: "carrot",
  /** Pano de Seda (10 sedas): ingrediente da tenda. */
  SILK_CLOTH: "silk_cloth"
};
var ITEMS = {
  wheat_seed: { id: Item.WHEAT_SEED, name: "Semente de Trigo", plants: Block.WHEAT_0 },
  wheat: { id: Item.WHEAT, name: "Trigo", feeds: "sheep" },
  silk: { id: Item.SILK, name: "Seda de Aranha", loot: true },
  fang: { id: Item.FANG, name: "Presa de Aranha", loot: true },
  queen_heart: { id: Item.QUEEN_HEART, name: "Cora\xE7\xE3o da Rainha", loot: true },
  oak_sapling: { id: Item.OAK_SAPLING, name: "Muda de Carvalho", plants: Block.OAK_SAPLING },
  apple_sapling: { id: Item.APPLE_SAPLING, name: "Muda de Macieira", plants: Block.APPLE_SAPLING },
  apple: { id: Item.APPLE, name: "Ma\xE7\xE3" },
  potato: { id: Item.POTATO, name: "Batata", plants: Block.POTATO_0 },
  tomato: { id: Item.TOMATO, name: "Tomate", plants: Block.TOMATO_0 },
  carrot: { id: Item.CARROT, name: "Cenoura", plants: Block.CARROT_0 },
  silk_cloth: { id: Item.SILK_CLOTH, name: "Pano de Seda" }
};
var VEGETABLES = [Item.POTATO, Item.TOMATO, Item.CARROT];
var LOOT_ITEMS = [Item.SILK, Item.FANG, Item.QUEEN_HEART];
var blockStack = (id) => `block:${id}`;
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
var TOOL_ORDER = [Tool.SWORD, Tool.HOE, Tool.PICKAXE, Tool.SHOVEL, Tool.AXE];
var COLLECTABLE = /* @__PURE__ */ new Set([...MATERIALS, Block.OAK_DOOR, Block.TENT, Block.CHEST, Block.CAMPFIRE, Block.CAULDRON, Block.OVEN, Block.CHAIR]);
var ADULT_TREES = /* @__PURE__ */ new Set([Block.OAK_TREE, Block.SAKURA_TREE, Block.APPLE_TREE, Block.APPLE_TREE_BARE]);
var RECIPES = [
  {
    id: "oak-planks",
    name: "T\xE1bua de Carvalho",
    profession: "builder",
    inputs: [{ item: blockStack(Block.OAK_LOG), count: 1 }],
    output: { item: blockStack(Block.OAK_PLANKS), count: 2 }
  },
  {
    id: "oak-door",
    name: "Porta de Carvalho",
    profession: "builder",
    inputs: [{ item: blockStack(Block.OAK_PLANKS), count: 4 }],
    output: { item: blockStack(Block.OAK_DOOR), count: 1 }
  },
  ...[
    ["stone-cobble", "Pedra Irregular", Block.STONE_COBBLE],
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

// src/config.ts
var MAX_STACK = 3;
var CHUNK_SIZE = 16;
var UNLOAD_MARGIN = 3;

// src/world/chunk.ts
var Chunk = class {
  constructor(cx, cy) {
    this.cx = cx;
    this.cy = cy;
  }
  cx;
  cy;
  ground = new Uint8Array(CHUNK_SIZE * CHUNK_SIZE);
  /** Um array por nível de pilha. */
  levels = Array.from({ length: MAX_STACK }, () => new Uint8Array(CHUNK_SIZE * CHUNK_SIZE));
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
    while (n < MAX_STACK && this.levels[n][ly * CHUNK_SIZE + lx] !== 0) n++;
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

// src/world/dungeon.ts
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
  const open = /* @__PURE__ */ new Map();
  const link = (a, b) => {
    if (!open.has(a)) open.set(a, /* @__PURE__ */ new Set());
    if (!open.has(b)) open.set(b, /* @__PURE__ */ new Set());
    open.get(a).add(b);
    open.get(b).add(a);
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
    for (const m of neighbors(n)) if (m > n && !open.get(n)?.has(m) && rand() < 0.09) link(n, m);
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
    for (const m of open.get(q[h0]) ?? []) if (dist[m] < 0) {
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
    for (const m of open.get(n) ?? []) {
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
var DUNGEON_RIM = 6;
var CAVE_MIN_CASTLE_DIST = 10 * CHUNK_SIZE;
var CAVE_W = 5;
var CAVE_D = 3;
function isolatedDungeon(seed) {
  return buildDungeon(seed, DUNGEON_ORIGIN[0], DUNGEON_ORIGIN[1], "south");
}
function dungeonGuard(l) {
  return { x0: l.area.x0 - DUNGEON_RIM, y0: l.area.y0 - DUNGEON_RIM, x1: l.area.x1 + DUNGEON_RIM, y1: l.area.y1 + DUNGEON_RIM };
}
function dungeonEntry(l) {
  const c = l.gate[l.gate.length - 2];
  const inward = { north: [0, 1], south: [0, -1], west: [1, 0], east: [-1, 0] }[l.side];
  return [c[0] + inward[0], c[1] + inward[1]];
}
function isDungeonExit(l, x, y) {
  return l.gate.slice(0, 3).some(([gx, gy]) => gx === x && gy === y);
}
function caveAt(x, y) {
  const footprint = { x0: x, y0: y - CAVE_D + 1, x1: x + CAVE_W - 1, y1: y };
  const outside = [x + (CAVE_W >> 1), y + 1];
  return {
    x,
    y,
    footprint,
    outside,
    guard: { x0: footprint.x0 - 1, y0: footprint.y0 - 1, x1: footprint.x1 + 1, y1: footprint.y1 },
    front: { x0: outside[0] - 2, y0: outside[1], x1: outside[0] + 2, y1: outside[1] + 2 }
  };
}
function planCave(base, castle, avoid) {
  const seed = base.seed;
  const a0 = hash2(seed, 7001, 3) * Math.PI * 2;
  const overlaps = (r) => !!avoid && r.x0 <= avoid.x1 && r.x1 >= avoid.x0 && r.y0 <= avoid.y1 && r.y1 >= avoid.y0;
  let fallback = null;
  for (let t = 0; t < 96; t++) {
    const a = a0 + t * 0.7;
    const dist = CAVE_MIN_CASTLE_DIST + 8 + hash2(seed, 7002, t) * 80 + Math.floor(t / 9) * 24;
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
    this.landing = layout.side === "north" || layout.side === "south" ? { x0: dx - 1, y0: dy, x1: dx + 1, y1: dy } : { x0: dx, y0: dy - 1, x1: dx, y1: dy + 1 };
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

// src/world/town.ts
var TOWN_W = 164;
var TOWN_H = 132;
var TOWN_X0 = -TOWN_W / 2;
var TOWN_Y0 = -TOWN_H;
var TOWN_SEED = 233152122;
var TOWN_MARGIN = 8;
var TOWN_CLEAR = 3;
var ROAD_LEN = 14;
var TOWN_SOUTH_FIELD = 28;
var WALL = 2;
var TOWN_SIZES = {
  [Block.CASTLE]: [26, 17, 17],
  [Block.GUILD]: [9, 9, 9],
  [Block.INN]: [9, 5, 5],
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
  return cached ??= buildTown();
}
function buildTown() {
  const W = TOWN_W;
  const H = TOWN_H;
  const rand = mulberry32(TOWN_SEED);
  const ri = (n) => Math.floor(rand() * n);
  const idx = (x, y) => y * W + x;
  const inside = (x, y) => x >= 0 && y >= 0 && x < W && y < H;
  const ground2 = new Uint8Array(W * H).fill(Block.GRASS);
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
      ground2[i] = Block.STONE_COBBLE;
      if (y >= H - WALL && x >= GX0 && x <= GX1) {
        use[i] = STREET;
        continue;
      }
      use[i] = WALLED;
      objects[i] = h(x, y, 1) < 0.22 ? Block.STONE_BRICK_CRACKED : Block.STONE_BRICK;
      upper[i] = h(x, y, 2) < 0.22 ? Block.STONE_BRICK_CRACKED : Block.STONE_BRICK;
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
  plaza(CX0 + 2, CY1, CX0 + 23, COURT_Y1, Block.STONE_POLISHED);
  plaza(W / 2 - 9, MID - 6, W / 2 + 9, MID + 6, Block.STONE_FLOOR);
  plaza(W / 2 - 9, H - 17, W / 2 + 8, H - TD - 1, Block.STONE_FLOOR);
  rect(GX0, H - TD, GX1, H - 1, (_x, _y, i) => {
    use[i] = STREET;
    ground2[i] = Block.STONE_COBBLE;
  });
  const required = [
    place(Block.GUILD, W / 2 - 28, MID - 8, "Guilda dos Aventureiros", true),
    place(Block.INN, W / 2 + 20, MID - 4, "Hospedaria", true),
    place(Block.SMITHY, 30, MID + 18, "Ferreiro", true),
    place(Block.SHOP_POTION, W / 2 + 22, MID + 18, "Loja de Po\xE7\xF5es", true),
    place(Block.SHOP_GOODS, W / 2 + 27, MID + 18, "Armaz\xE9m", true),
    place(Block.SHOP_TOOLS, W / 2 + 32, MID + 18, "Loja de Ferramentas", true)
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
    const open = /* @__PURE__ */ new Set([from]);
    while (open.size) {
      let cur = -1;
      let cd = Infinity;
      for (const n of open) {
        const d = dist.get(n);
        if (d < cd) {
          cd = d;
          cur = n;
        }
      }
      open.delete(cur);
      if (cur === to) break;
      for (const e of adj.get(cur) ?? []) {
        const n = other(e, cur);
        const nd = cd + weight.get(e);
        if (nd < (dist.get(n) ?? Infinity)) {
          dist.set(n, nd);
          prev.set(n, e);
          open.add(n);
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
  rect(0, 0, W - 1, H - 1, (x, y, i) => {
    if (use[i] === STREET) ground2[i] = h(x, y, 3) < 0.3 ? Block.STONE_CRACKED : Block.STONE_COBBLE;
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
        ground2[i] = Block.STONE_COBBLE;
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
      objects[i] = h(x, y, 6) < 0.3 ? Block.SAKURA_TREE : Block.OAK_TREE;
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
var INTERIOR_DEFS = [SMITHY_INTERIOR];
var INTERIOR_ORIGIN = [0, -1e5];
var INTERIOR_SPACING = 64;
var INTERIOR_MARGIN = 2;
function interiorLayouts(town) {
  const out = [];
  INTERIOR_DEFS.forEach((def, k) => {
    const b = town.buildings.find((x) => x.id === def.building && x.door);
    if (!b) return;
    const w = def.map[0].length;
    const h = def.map.length;
    const x0 = INTERIOR_ORIGIN[0] + k * INTERIOR_SPACING;
    const y0 = INTERIOR_ORIGIN[1];
    const find = (ch) => {
      const row = def.map.findIndex((r) => r.includes(ch));
      return [x0 + def.map[row].indexOf(ch), y0 + row];
    };
    const exit = find("E");
    const area = { x0, y0, x1: x0 + w - 1, y1: y0 + h - 1 };
    out.push({
      def,
      w,
      h,
      area,
      guard: { x0: x0 - INTERIOR_MARGIN, y0: y0 - INTERIOR_MARGIN, x1: area.x1 + INTERIOR_MARGIN, y1: area.y1 + INTERIOR_MARGIN },
      entry: [exit[0], exit[1] - 1],
      exit,
      outside: b.door,
      keeper: def.keeper ? { at: [x0 + def.keeper.at[0], y0 + def.keeper.at[1]], rows: [y0 + def.keeper.rows[0], y0 + def.keeper.rows[1]] } : null
    });
  });
  return out;
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

// src/world/biomes.ts
var BIOMES = {
  meadow: {
    key: "meadow",
    name: "Campos Verdejantes",
    ground: Block.GRASS,
    tree: Block.OAK_TREE,
    treeDensity: 0.22,
    altTree: { id: Block.APPLE_TREE, share: 1 / 6 },
    decorations: [Block.TALL_GRASS, Block.TALL_GRASS, Block.FLOWER],
    decoChance: 0.12
  },
  sakura: {
    key: "sakura",
    name: "Bosque de Sakura",
    ground: Block.GRASS,
    tree: Block.SAKURA_TREE,
    treeDensity: 0.3,
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
    const continent = this.terrain.fbm2(x / 420 + 11.3, y / 420 - 7.1, 3) * 0.45;
    const local = this.terrain.fbm2(x / 70, y / 70, 5);
    return local * 0.8 + continent;
  }
  biomeAt(x, y) {
    x += this.climateOx;
    y += this.climateOy;
    const t = this.climate.fbm2(x / 480 + 31.7, y / 480 + 5.2, 3);
    const m = this.climate.fbm2(x / 300 - 913.1, y / 300 + 77.7, 3);
    return pickBiome(t * 1.9, m * 1.9);
  }
  isRiver(x, y) {
    return Math.abs(this.terrain.fbm2(x / 230 + 400, y / 230 - 400, 3)) < 0.022;
  }
  /**
   * Célula completa numa única avaliação de ruído (elevação, clima, rio, trilha).
   * `groundAt/objectAt/upperAt` derivam daqui — antes cada um recalculava o terreno
   * (até 5× por célula ao gerar um chunk).
   */
  cellAt(x, y) {
    const e = this.elevation(x, y);
    if (e < WATER_LEVEL || e < MOUNTAIN_LEVEL - 0.04 && this.isRiver(x, y)) {
      return { ground: Block.WATER, object: Block.AIR, upper: Block.AIR };
    }
    const biome = this.biomeAt(x, y);
    if (e < BEACH_LEVEL) return { ground: Block.SAND, object: Block.AIR, upper: Block.AIR };
    let ground2 = biome.ground;
    if (e > MOUNTAIN_LEVEL - 0.05 && biome.key !== "desert") ground2 = Block.DIRT;
    else if (biome.key !== "desert" && Math.abs(this.detail.fbm2(x / 90 - 300, y / 90 + 300, 2)) < 0.012) {
      return { ground: Block.PATH, object: Block.AIR, upper: Block.AIR };
    }
    if (e > MOUNTAIN_LEVEL) {
      return { ground: ground2, object: Block.STONE, upper: e > HIGH_MOUNTAIN ? Block.STONE : Block.AIR };
    }
    const r = hash2(this.seed, x, y);
    const forest = this.detail.fbm2(x / 38 + 50, y / 38 - 50, 2);
    const density = biome.treeDensity * (forest > 0.05 ? 1 : 0.12);
    let object2 = Block.AIR;
    if (r < density) {
      const alt = biome.altTree;
      object2 = alt && hash2(this.seed, x + 4409, y - 2027) < alt.share ? alt.id : biome.tree;
    } else if (r > 0.994) object2 = Block.STONE;
    else if (hash2(this.seed, x, y + 7919) < biome.decoChance) {
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

// src/world/profiles.ts
var WORLD_PROFILES = {
  principal: {
    id: "principal",
    name: "Orvalis",
    terrain: { kind: "procedural" },
    bounds: null,
    character: "heroine",
    blocks: HOTBAR_BLOCKS,
    tools: true,
    farming: true,
    sheep: true,
    dungeon: true,
    town: true,
    collectBlocks: true,
    minimap: true,
    sky: ["#1b1838", "#1b1838"]
  },
  santuario: {
    id: "santuario",
    name: "Santu\xE1rio Celestial da Deusa da Vida",
    terrain: { kind: "flat", ground: Block.CLOUD_SOLID },
    // 10 chunks: 5 × 2 (80 × 32 blocos), centrados na origem.
    bounds: { cx0: -3, cy0: -1, cx1: 1, cy1: 0 },
    character: "goddess",
    blocks: CELESTIAL_BLOCKS,
    tools: false,
    farming: false,
    sheep: false,
    dungeon: false,
    town: false,
    collectBlocks: false,
    minimap: false,
    sky: ["#8fb8ff", "#f6d9ff"]
  }
};

// src/world/world.ts
var WHEAT_STAGE_SECONDS = 6;
var CROP_STAGE_SECONDS = { wheat: WHEAT_STAGE_SECONDS, potato: 8, carrot: 8, tomato: 10 };
var TREE_STAGE_SECONDS = 120;
var FRUIT_REGROW_SECONDS = 150;
var SAPLING_GROUND = /* @__PURE__ */ new Set([Block.DIRT, Block.GRASS]);
var PLANTABLE_GROUND = Block.TILLED;
var TILLABLE = /* @__PURE__ */ new Set([Block.DIRT, Block.GRASS]);
var FLATTENABLE = /* @__PURE__ */ new Set([Block.DIRT, Block.GRASS, Block.TILLED]);
function tentCells(x, y) {
  return [[x, y], [x + 1, y], [x, y - 1], [x + 1, y - 1]];
}
var CHEST_SLOTS = 27;
var REPLACES_WATER = /* @__PURE__ */ new Set([Block.DIRT, Block.GRASS, Block.TILLED, Block.PATH, Block.STONE, Block.OAK_LOG, Block.OAK_PLANKS]);
var FLOW_SECONDS = 0.6;
var FLOW_DIRS = [["west", -1, 0], ["east", 1, 0], ["north", 0, -1], ["south", 0, 1]];
function numKey(cx, cy) {
  return cx * 2097152 + cy;
}
var World = class {
  generator;
  profile;
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
  /** Interiores das construções da cidade (ADR 0014): cômodos isolados e protegidos. Vazio sem cidade. */
  interiors = [];
  /** Buracos enchendo de água (estado de execução; ao carregar, `settleWater` reagenda). */
  flows = /* @__PURE__ */ new Map();
  /** Spawn calculado no terreno base (a dungeon é posta longe dele e não o altera). */
  spawn = null;
  constructor(seed, profile = WORLD_PROFILES.principal) {
    this.profile = profile;
    this.generator = profile.terrain.kind === "flat" ? new FlatGenerator(seed, profile.terrain.ground) : new WorldGenerator(seed);
    const b = profile.bounds;
    this.cellBounds = b ? { x0: b.cx0 * CHUNK_SIZE, y0: b.cy0 * CHUNK_SIZE, x1: (b.cx1 + 1) * CHUNK_SIZE - 1, y1: (b.cy1 + 1) * CHUNK_SIZE - 1 } : null;
    if (profile.town) {
      this.town = townLayout();
      this.generator = new TownTerrain(this.generator, this.town);
      this.spawn = this.town.start;
    }
    if (profile.dungeon) {
      const base = this.generator;
      const spawn = this.spawn = this.findSpawn();
      const keep = this.town ? grow(this.town.area, TOWN_MARGIN + 4) : null;
      if (keep) keep.y1 = this.town.area.y1 + TOWN_SOUTH_FIELD;
      const castle = this.town?.buildings.find((b2) => b2.id === Block.CASTLE);
      const center = castle ? [castle.x + castle.w / 2, castle.y - castle.d / 2] : spawn;
      this.dungeon = isolatedDungeon(seed);
      this.cave = planCave(base, center, keep);
      this.generator = new DungeonTerrain(base, this.dungeon, this.cave);
    }
    if (this.town) {
      this.interiors = interiorLayouts(this.town);
      this.generator = new InteriorTerrain(this.generator, this.interiors);
    }
  }
  /** Célula dentro da dungeon, da cidade (muralhas incluídas) ou de um interior? Lá nada é quebrado, colocado, arado nem plantado. */
  isProtected(x, y) {
    return !!this.dungeon && inRect(dungeonGuard(this.dungeon), x, y) || !!this.cave && inRect(this.cave.guard, x, y) || !!this.town && inRect(this.town.area, x, y) || this.interiors.some((l) => inRect(l.guard, x, y));
  }
  /** Interior (cômodo) que contém a célula, ou null. */
  interiorAt(x, y) {
    return this.interiors.find((l) => inRect(l.area, x, y)) ?? null;
  }
  /** Interior cuja porta fica diante desta célula da rua (andar para cima nela = entrar), ou null. */
  interiorEntrance(x, y) {
    return this.interiors.find((l) => l.outside[0] === x && l.outside[1] === y) ?? null;
  }
  /** Diante da boca da caverna (andar para cima aqui = entrar no covil)? */
  isCaveDoor(x, y) {
    return !!this.cave && this.cave.outside[0] === x && this.cave.outside[1] === y;
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
    return this.town ? this.town.doorstep : this.findSpawn();
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
      chunk = new Chunk(cx, cy);
      this.generator.generateChunk(cx, cy, chunk.ground, chunk.objects, chunk.upper);
      this.chunks.set(key, chunk);
    }
    return chunk;
  }
  /** Chão da célula. Fora de chunk carregado consulta o gerador (puro); fora dos limites, céu. */
  getGround(x, y) {
    if (!this.inBounds(x, y)) return Block.VOID;
    const chunk = this.chunkAt(x, y);
    return chunk ? chunk.getGround(toLocal(x), toLocal(y)) : this.generator.groundAt(x, y);
  }
  /** Objeto do nível 0 da célula (AIR se vazio). */
  getObject(x, y) {
    if (!this.inBounds(x, y)) return Block.AIR;
    const chunk = this.chunkAt(x, y);
    return chunk ? chunk.getObject(toLocal(x), toLocal(y)) : this.generator.objectAt(x, y);
  }
  /** Cubo empilhado no nível 1 (AIR se não houver). */
  getUpper(x, y) {
    if (!this.inBounds(x, y)) return Block.AIR;
    const chunk = this.chunkAt(x, y);
    return chunk ? chunk.getLevel(toLocal(x), toLocal(y), 1) : this.generator.upperAt(x, y);
  }
  /** Bloco de um nível da pilha (0 = objeto no chão). O gerador só preenche os níveis 0 e 1. */
  getLevel(x, y, level) {
    if (level === 0) return this.getObject(x, y);
    if (level === 1) return this.getUpper(x, y);
    if (!this.inBounds(x, y)) return Block.AIR;
    const chunk = this.chunkAt(x, y);
    return chunk ? chunk.getLevel(toLocal(x), toLocal(y), level) : Block.AIR;
  }
  /** Bloco visível no topo da célula e seu nível (null se vazia). */
  topBlock(x, y) {
    for (let level = MAX_STACK - 1; level >= 0; level--) {
      const id = this.getLevel(x, y, level);
      if (id !== Block.AIR) return { id, level };
    }
    return null;
  }
  /** Quantos cubos há empilhados na célula (0..MAX_STACK). */
  stackHeight(x, y) {
    if (blockDef(this.getObject(x, y)).shape !== "cube") return 0;
    let n = 1;
    while (n < MAX_STACK && this.getLevel(x, y, n) !== Block.AIR) n++;
    return n;
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
    if (level === "ground") chunk.setGround(lx, ly, id);
    else chunk.setLevel(lx, ly, level, id);
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
      if (id === Block.TENT && !tentCells(x, y).every(([cx, cy]) => this.isFootprintFree(cx, cy))) return null;
      return 0;
    }
    if (def.shape === "cube" && base.shape === "cube") {
      const h = this.stackHeight(x, y);
      return h < MAX_STACK ? h : null;
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
  /** Cubo de madeira (Tora ou Tábua de Carvalho) ou de Pedra no nível 0 — serve de batente para a porta. */
  isDoorJamb(x, y) {
    const d = blockDef(this.getObject(x, y));
    return d.shape === "cube" && (d.organic === "wood" || d.stone);
  }
  /** A porta só vai entre dois batentes (qualquer bloco de madeira ou de pedra, podem misturar): células da esquerda e da direita. */
  hasDoorFrame(x, y) {
    return this.isDoorJamb(x - 1, y) && this.isDoorJamb(x + 1, y);
  }
  isDoor(x, y) {
    return isDoor(this.getObject(x, y));
  }
  isDoorOpen(x, y) {
    return this.getObject(x, y) === Block.OAK_DOOR_OPEN;
  }
  /**
   * Abre/fecha a porta da célula (o id guarda o estado: fechada bloqueia, aberta deixa passar).
   * Quem chama garante que ninguém está na célula ao fechar. Retorna false se não há porta.
   */
  toggleDoor(x, y) {
    const id = this.getObject(x, y);
    if (!isDoor(id)) return false;
    this.setLevel(x, y, 0, id === Block.OAK_DOOR ? Block.OAK_DOOR_OPEN : Block.OAK_DOOR);
    return true;
  }
  canPlace(x, y, id) {
    return this.placementLevel(x, y, id) !== null;
  }
  placeBlock(x, y, id) {
    const level = this.placementLevel(x, y, id);
    if (level === null) return false;
    this.setLevel(x, y, level, id);
    if (id === Block.TENT) {
      for (const [cx, cy] of tentCells(x, y).slice(1)) this.setLevel(cx, cy, 0, Block.TENT_PART);
      this.tent = [x, y];
    }
    return true;
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
   * Dá para plantar `id` aqui? Plantação (trigo, batata, tomate, cenoura): só em Terra Arada. Muda de árvore: em Terra
   * ou Terra com Grama.
   * Sempre com a célula livre (ou só com enfeite).
   */
  canPlant(x, y, id = Block.WHEAT_0) {
    if (this.isProtected(x, y)) return false;
    const sapling = id === Block.OAK_SAPLING || id === Block.APPLE_SAPLING;
    if (!sapling && !isCropSeedling(id)) return false;
    if (sapling ? !SAPLING_GROUND.has(this.getGround(x, y)) : this.getGround(x, y) !== PLANTABLE_GROUND) return false;
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
  tick(dt, rand = Math.random) {
    this.tickWater(dt);
    for (const key of [...this.crops]) {
      const [x, y] = key.split(",").map(Number);
      const id = this.getObject(x, y);
      const kind = cropKind(id);
      if (!kind) {
        this.crops.delete(key);
        continue;
      }
      const stage = cropStage(id);
      if (stage < CROP_STAGES - 1 && rand() < dt / CROP_STAGE_SECONDS[kind]) this.setLevel(x, y, 0, cropId(kind, stage + 1));
    }
    for (const key of [...this.trees]) {
      const [x, y] = key.split(",").map(Number);
      const id = this.getObject(x, y);
      const next = TREE_NEXT[id];
      if (next === void 0) {
        this.trees.delete(key);
        continue;
      }
      const t = id === Block.APPLE_TREE_BARE ? FRUIT_REGROW_SECONDS : TREE_STAGE_SECONDS;
      if (rand() < dt / t) this.setLevel(x, y, 0, next);
    }
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
   * Camadas a mais que o motor atual são ignoradas; a menos ficam vazias.
   */
  restoreChunk(cx, cy, ground2, levels) {
    const c = new Chunk(cx, cy);
    c.ground.set(ground2.subarray(0, c.ground.length));
    levels.forEach((l, i) => {
      if (i < c.levels.length) c.levels[i].set(l.subarray(0, c.levels[i].length));
    });
    for (let ly = 0; ly < CHUNK_SIZE; ly++) {
      for (let lx = 0; lx < CHUNK_SIZE; lx++) {
        const x = cx * CHUNK_SIZE + lx;
        const y = cy * CHUNK_SIZE + ly;
        if (!this.isProtected(x, y)) continue;
        const cell = this.generator.cellAt(x, y);
        c.setGround(lx, ly, cell.ground);
        c.levels.forEach((l, i) => {
          l[ly * CHUNK_SIZE + lx] = i === 0 ? cell.object : i === 1 ? cell.upper : Block.AIR;
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
        if (isCrop(id)) this.crops.add(chunkKey(cx * CHUNK_SIZE + lx, cy * CHUNK_SIZE + ly));
        if (isGrowingTree(id)) this.trees.add(chunkKey(cx * CHUNK_SIZE + lx, cy * CHUNK_SIZE + ly));
      }
    }
  }
};

// src/net/protocol.ts
var PROTOCOL_VERSION = 4;
var MAX_PLAYERS = 4;
var ROOM_CODE_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
var ROOM_CODE_LENGTH = 6;
var NAME_MIN = 2;
var NAME_MAX = 16;
function normalizeRoomCode(text) {
  const c = text.toUpperCase().replace(/[\s-]/g, "");
  if (c.length !== ROOM_CODE_LENGTH) return null;
  for (const ch of c) if (!ROOM_CODE_ALPHABET.includes(ch)) return null;
  return c;
}
function makeRoomCode(rand) {
  let s = "";
  for (let i = 0; i < ROOM_CODE_LENGTH; i++) s += ROOM_CODE_ALPHABET[Math.floor(rand() * ROOM_CODE_ALPHABET.length)];
  return s;
}
function sanitizeName(text) {
  const n = text.normalize("NFC").replace(/\s+/g, " ").trim();
  if (n.length < NAME_MIN || n.length > NAME_MAX) return null;
  return /^[\p{L}\p{N} _-]+$/u.test(n) ? n : null;
}
var FACINGS = /* @__PURE__ */ new Set(["down", "left", "right", "up"]);
var finite = (v) => typeof v === "number" && Number.isFinite(v) && Math.abs(v) < 2 ** 30;
function parseState(v) {
  if (!v || typeof v !== "object") return null;
  const s = v;
  if (!finite(s.x) || !finite(s.y) || !FACINGS.has(s.facing) || typeof s.moving !== "boolean") return null;
  return { x: s.x, y: s.y, facing: s.facing, moving: s.moving };
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
      if (!Number.isInteger(o.v) || typeof o.name !== "string" || o.room !== void 0 && typeof o.room !== "string") return null;
      return { t: "hello", v: o.v, name: o.name, room: o.room };
    case "state": {
      const s = parseState(o.s);
      return s ? { t: "state", s } : null;
    }
    case "action": {
      const a = parseAction(o.a);
      return a && Number.isInteger(o.seq) ? { t: "action", seq: o.seq, a } : null;
    }
    default:
      return null;
  }
}

// src/net/room.ts
var Room = class {
  constructor(code, seed) {
    this.code = code;
    this.seed = seed;
    this.world = new World(seed);
  }
  code;
  seed;
  world;
  players = /* @__PURE__ */ new Map();
  /** Ações aplicadas desde que a sala abriu (quem entra depois recebe e reaplica; persistência por chunk vem depois). */
  edits = [];
  nextId = 1;
  get size() {
    return this.players.size;
  }
  /** Pedido de entrada já com a sala escolhida. Retorna o id do novo jogador e o que enviar (ou só um erro). */
  join(hello) {
    const fail = (code, message) => ({ id: null, out: [{ to: 0, msg: { t: "error", code, message } }] });
    if (hello.v !== PROTOCOL_VERSION) return fail("version", "Vers\xE3o do jogo diferente da do servidor: recarregue a p\xE1gina.");
    const name = sanitizeName(hello.name);
    if (!name) return fail("name", "Nome inv\xE1lido: use de 2 a 16 letras ou n\xFAmeros.");
    if (this.players.size >= MAX_PLAYERS) return fail("full", `Sala cheia (m\xE1ximo ${MAX_PLAYERS} jogadores).`);
    const id = this.nextId++;
    const player = { id, name, state: null };
    const others = [...this.players.values()];
    this.players.set(id, player);
    return {
      id,
      out: [
        { to: id, msg: { t: "welcome", you: id, room: this.code, seed: this.seed, players: others, edits: this.edits } },
        { to: { except: id }, msg: { t: "joined", player } }
      ]
    };
  }
  leave(id) {
    if (!this.players.delete(id)) return [];
    return [{ to: "all", msg: { t: "left", id } }];
  }
  /** Mensagem de um jogador já na sala. Ações passam pelas regras do `World`; recusadas voltam só para quem mandou. */
  handle(id, m) {
    const p = this.players.get(id);
    if (!p) return [];
    if (m.t === "state") {
      p.state = m.s;
      return [{ to: { except: id }, msg: { t: "state", id, s: m.s } }];
    }
    if (m.t === "action") {
      if (!applyAction(this.world, m.a)) return [{ to: id, msg: { t: "rejected", seq: m.seq } }];
      const applied = { by: id, action: m.a };
      this.edits.push(applied);
      return [{ to: "all", msg: { t: "applied", ...applied } }];
    }
    return [];
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MAX_PLAYERS,
  PROTOCOL_VERSION,
  ROOM_CODE_LENGTH,
  Room,
  makeRoomCode,
  normalizeRoomCode,
  parseClientMessage,
  sanitizeName
});
