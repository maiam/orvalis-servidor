# Orvalis — servidor

Servidor do **Orvalis** (multiplayer co-op; depois contas e nuvem). O jogo fica em `maiam/mundoblocos-2d`
(`orvalis.pensamentos.online`); este é só o backend (ADRs 0015 e 0016 do jogo).

**Etapa atual: salas fixas (protocolo 8).** Salas por número (`ROOMS` do jogo; hoje só a Sala 1), até 10 jogadores ao
mesmo tempo, entrada só com nome, sem combate entre jogadores. Cada sala é um mundo compartilhado **salvo em disco**:
o que se faz nela, os baús e a bolsa de cada jogador (pelo nome) ficam guardados para a próxima entrada; os itens no
chão são da sala (quem pega primeiro leva). O servidor é autoritativo: as regras são as do jogo, vindas de `vendor/orvalis-net.cjs`
(a classe `Room` do jogo, empacotada — **nunca edite à mão**; atualize com `npm run sync-net`).

| Rota | O que faz |
|---|---|
| `GET /` | Página de teste: entrar numa sala pelo número e ver quem está nela |
| `GET /salas` | JSON `[{ numero, nome, jogadores, maximo }]` (o menu do jogo mostra) |
| `GET /saude` | JSON `{ ok, protocolo, pacote, salas, jogadores, segundosNoAr, dados }` (`dados`: pasta, última gravação, se cada sala veio do disco) |
| `WS /ws` | Protocolo do jogo (`src/net/protocol.ts` no jogo) |

Limites: 16 kB por mensagem; 40 mensagens/s por conexão (acima são ignoradas; acima de 200/s a conexão cai).
Origens permitidas: o jogo, o Santuário, este servidor e `localhost:5173` (troque com `ALLOWED_ORIGINS`,
lista separada por vírgula). **Dados**: um arquivo `sala-<n>.json` por sala em `DATA_DIR` (padrão `~/orvalis-dados`, fora
da pasta do código, que o deploy troca), gravado a cada 15 s quando algo mudou e ao desligar; carregado ao ligar. **Cópia de segurança:** antes da primeira regravação feita por um pacote novo do jogo, o arquivo que estava lá vira `sala-<n>.json.antes-<versão>-<commit>.bak` (uma por pacote, nunca sobrescrita) — a rede de segurança das migrações (formato e grade fina, ADR 0032 do jogo). Arquivo gravado numa grade **mais fina** que a do pacote não é aberto (a sala começa limpa) e o arquivo continua intacto até alguém mexer na sala.

## Rodar
```bash
npm ci
npm start      # http://localhost:3000 (ou a porta de PORT)
npm test
npm run sync-net -- ../mundoblocos-2d   # atualiza o pacote do jogo (rode depois de mudar src/net ou src/world lá)
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
- Sem dependência do maiamapps. Regras do jogo não são copiadas: virão do código `src/world/` do jogo (próximas etapas).
- Publicação: PR para `main` → Verificação (GitHub Actions) verde → mesclar (método *merge*).
