#!/usr/bin/env bash
# Atualiza vendor/orvalis-net.cjs a partir do jogo (ADR 0016 do jogo): gera o pacote no repositório do jogo e copia.
# Uso: npm run sync-net [-- caminho/do/mundoblocos-2d]   (padrão: ../mundoblocos-2d)
set -euo pipefail
GAME="${1:-../mundoblocos-2d}"
(cd "$GAME" && npm run build:net)
cp "$GAME/dist-net/orvalis-net.cjs" vendor/orvalis-net.cjs
head -1 vendor/orvalis-net.cjs
