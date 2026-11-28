# Orvalis — servidor

Servidor do **Orvalis** (multiplayer co-op; depois contas e nuvem). O jogo fica em `maiam/mundoblocos-2d`
(`orvalis.pensamentos.online`); este é só o backend (ADRs 0015 e 0016 do jogo).

**Salas do Titã (ADR 0104 e 0115 do jogo).** As salas fixas são as `TITAN_ROOMS` do jogo (hoje **Titã 1**, número 101, e **Orvalis 1**, número 102, ADR 0138 do jogo: cada sala usa o gerador do seu mundo; **desde o protocolo 6 a sala 102 é a Aldeia da Costa** (ADR 0142 do jogo: mapa feito à mão, seed 128064, `def.terrain = 'costa'`; o arquivo antigo da sala, de relevo por ruído, é recusado na leitura e a sala começa limpa); **desde o protocolo 7 (ADR 0147 do jogo) a sala 102 é a Costa v101, com 4 acampamentos de 12 Grunhos (mob inimigo que o servidor simula e que fere quem se aproxima); o arquivo salvo da versão 100 (sem acampamentos) é recusado, a sala recomeça e o armazenamento guarda o antigo em `sala-102.json.antes-<pacote>.bak`;** no Orvalis a **fauna de fazenda** é da sala desde o protocolo 4 — o servidor a simula ao redor dos jogadores e a grava no arquivo da sala —, e, desde o protocolo 5, **a pesca** (a boia corre no servidor e é só do dono) **e os botes** (compartilhados pela sala, um piloto por bote, posição conferida pelo servidor)) : salas **cooperativas de sobrevivência** do mundo Titã (`?mundo=titan`), até 10 jogadores ao mesmo tempo, entrada só com nome, sem combate entre jogadores. Cada sala é um mundo compartilhado **salvo em disco**: o que se faz nela, os baús, braseiros e a bolsa de cada jogador (pelo nome) ficam guardados para a próxima entrada; os itens no chão são da sala (quem pega primeiro leva). O servidor é autoritativo: as regras são as do jogo, vindas de `vendor/orvalis-net.cjs` (a `TitanRoom` do jogo, empacotada — **nunca edite à mão**; atualize com `npm run sync-net`). Protocolo: `TITAN_PROTOCOL_VERSION` (`src/net/titan/protocol.ts` no jogo); relógio de 10×/s com passo limitado a 0,25 s; gravação em `sala-101.json`.

> **As salas 1 e 2 do Orvalis 2.5D (Sala 1 e Santuário) saíram** com o jogo 2.5D (v0.183.0 do jogo, ADR 0115): o servidor não as abre mais. Os arquivos `sala-1.json` e `sala-2.json` antigos ficam no disco, sem uso.

| Rota | O que faz |
|---|---|
| `GET /` | Página de teste: entrar numa sala pelo número e ver quem está nela |
| `GET /salas` | JSON `[{ numero, nome, jogadores, maximo }]` (o menu do jogo mostra) |
| `GET /saude` | JSON `{ ok, protocolo, pacote, salas, jogadores, segundosNoAr, dados }` (`dados`: pasta, última gravação, se cada sala veio do disco) |
| `WS /ws` | Protocolo do Titã (`src/net/titan/protocol.ts` no jogo) |

Limites: 16 kB por mensagem; 40 mensagens/s por conexão (acima são ignoradas; acima de 200/s a conexão cai).
Origens permitidas: o jogo, este servidor e `localhost:5173` (troque com `ALLOWED_ORIGINS`,
lista separada por vírgula). **Dados**: um arquivo `sala-<n>.json` por sala em `DATA_DIR` (padrão `~/orvalis-dados`, fora
da pasta do código, que o deploy troca), gravado a cada 15 s quando algo mudou e ao desligar; carregado ao ligar. **Cópia de segurança:** antes da primeira regravação feita por um pacote novo do jogo, o arquivo que estava lá vira `sala-<n>.json.antes-<versão>-<commit>.bak` (uma por pacote, nunca sobrescrita) — a rede de segurança das migrações (formato e grade fina, ADR 0032 do jogo). Arquivo gravado numa grade **mais fina** que a do pacote não é aberto (a sala começa limpa) e o arquivo continua intacto até alguém mexer na sala.

## Rodar
```bash
npm ci
npm start      # http://localhost:3000 (ou a porta de PORT)
npm test
npm run sync-net -- ../mundoblocos-2d   # atualiza o pacote do jogo (rode depois de mudar `src/net/titan` ou as regras do Titã lá)
```

## Hospedagem (Hostinger, app web Node.js)
Subdomínio: `orvalis-servidor.pensamentos.online` (provisório até o domínio próprio do Orvalis).

| Campo no hPanel | Valor |
|---|---|
| Repositório / branch | `maiam/orvalis-servidor` / `main` |
| Versão do Node | 22.x |
| Diretório raiz | `./` |
| Comando de build | *(vazio — não há build)*; se o campo for obrigatório: `npm ci` |
| Arquivo de entrada / comando de início | `server.js` / `npm start` (CommonJS: o carregador da hospedagem usa `require`) |
| Variáveis | nenhuma (a porta vem de `PORT`, definida pela Hostinger) |

**Como testar no ar:** abrir `https://orvalis-servidor.pensamentos.online/`, clicar **Entrar / criar sala** (aparece o
código), abrir outra aba, digitar o código e entrar — as duas abas mostram os dois nomes.

## Regras
- Sem dependência do maiamapps. Regras do jogo não são copiadas: vêm do código `src/titan/` do jogo, empacotado em `vendor/`.
- Publicação: PR para `main` → Verificação (GitHub Actions) verde → mesclar (método *merge*).
