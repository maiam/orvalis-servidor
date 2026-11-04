# Instruções para agentes de IA — orvalis-servidor

Backend do **Orvalis** (o jogo está em `maiam/mundoblocos-2d`; leia lá `docs/adr/0015-orvalis-independente.md` e
`docs/NEXT_STEPS.md`, Fase M — o plano do multiplayer).

- **Independente do maiamapps**: nunca chamar nem depender de `maiamapps`.
- **Regras do jogo não se copiam**: o servidor valida ações com o código de `src/world/` do jogo (puro, sem DOM); como
  compartilhar (pacote/submódulo) é decisão registrada no jogo.
- Endereço provisório `servidor.orvalis.pensamentos.online` (Hostinger, app web Node.js). Porta sempre de `PORT`.
- Antes de entregar: `npm test`. Publicação: PR para `main`, Verificação verde, mesclar com *merge* (nunca squash).
- Commits em pt-BR explicando o porquê.
