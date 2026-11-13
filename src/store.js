// Gravação das salas fixas em disco (protocolo 8, ADR 0020 do jogo): um arquivo JSON por sala (`sala-<n>.json`), com o
// `RoomSnapshot` do jogo (mundo editado, hora, bolsas). Grava em arquivo temporário e renomeia (nunca deixa um arquivo
// pela metade). A pasta fica FORA da pasta do código: o deploy da Hostinger troca o código a cada merge.
const { copyFileSync, mkdirSync, readFileSync, renameSync, writeFileSync, existsSync, statSync } = require('node:fs');
const { homedir } = require('node:os');
const { join } = require('node:path');

/** Pasta dos dados: `DATA_DIR` ou ~/orvalis-dados. */
function dataDir() {
  return process.env.DATA_DIR || join(homedir(), 'orvalis-dados');
}

function createStore(dir = dataDir()) {
  mkdirSync(dir, { recursive: true });
  const file = (id) => join(dir, `sala-${id}.json`);
  return {
    dir,
    /** Lê a fotografia da sala (null se não há ou se o arquivo está estragado). */
    load(id) {
      try {
        if (!existsSync(file(id))) return null;
        return JSON.parse(readFileSync(file(id), 'utf8'));
      } catch (e) {
        console.error(`sala ${id}: arquivo ilegível, começando do zero`, e.message);
        return null;
      }
    },
    /**
     * Grava a sala. Antes da primeira regravação feita por um pacote novo do jogo (`tag`, ex.: `0.93.58-c6c2569`), guarda uma cópia do
     * arquivo que estava lá (`sala-N.json.antes-<tag>.bak`): é a rede de segurança das migrações (grade, formato) — o arquivo antigo
     * nunca se perde por uma conversão ruim. Uma cópia por pacote, nunca sobrescrita.
     */
    save(id, snapshot, tag = 'sem-pacote') {
      const bak = `${file(id)}.antes-${String(tag).replace(/[^\w.-]+/g, '_')}.bak`;
      try {
        if (existsSync(file(id)) && !existsSync(bak)) copyFileSync(file(id), bak);
      } catch (e) {
        console.error(`sala ${id}: não foi possível guardar a cópia de segurança`, e.message);
      }
      const tmp = `${file(id)}.tmp`;
      writeFileSync(tmp, JSON.stringify(snapshot));
      renameSync(tmp, file(id));
    },
    /** Tamanho do arquivo da sala (bytes), para a página de saúde. */
    size(id) {
      try { return statSync(file(id)).size; } catch { return 0; }
    },
  };
}

module.exports = { createStore, dataDir };
