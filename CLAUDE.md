# Instruções para agentes de IA — orvalis-servidor

Backend do **Orvalis** (o jogo está em `maiam/mundoblocos-2d`; leia lá `docs/adr/0015-orvalis-independente.md` e
`docs/NEXT_STEPS.md`, Fase M — o plano do multiplayer).

- **Independente do maiamapps**: nunca chamar nem depender de `maiamapps`.
- **Regras do jogo não se copiam**: a sala é o `Room` do jogo, empacotado em `vendor/orvalis-net.cjs` (`npm run build:net`
  no jogo + `npm run sync-net` aqui). Nunca edite o vendor; mudou o protocolo → atualize jogo e servidor juntos
  (`PROTOCOL_VERSION`). Este repositório só cuida de rede (WebSocket, limites, origens).
- Endereço provisório `orvalis-servidor.pensamentos.online` (Hostinger, app web Node.js). Porta sempre de `PORT`.
- Antes de entregar: `npm test`. Publicação: PR para `main`, Verificação verde, mesclar com *merge* (nunca squash).
- Commits em pt-BR explicando o porquê.
