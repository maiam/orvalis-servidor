# Orvalis — servidor

Servidor do **Orvalis** (multiplayer co-op; depois contas e nuvem). O jogo fica em `maiam/mundoblocos-2d`
(`orvalis.pensamentos.online`); este é só o backend (ADRs 0015 e 0016 do jogo).

**Etapa atual: 2 — salas co-op.** Até 4 convidados por sala, entrada só com nome, código de convite de 6 caracteres,
sem combate entre jogadores. O servidor é autoritativo: as regras são as do jogo, vindas de `vendor/orvalis-net.cjs`
(a classe `Room` do jogo, empacotada — **nunca edite à mão**; atualize com `npm run sync-net`).

| Rota | O que faz |
|---|---|
| `GET /` | Página de teste: criar sala ou entrar com código e ver quem está nela |
| `GET /saude` | JSON `{ ok, protocolo, pacote, salas, jogadores, segundosNoAr }` |
| `WS /ws` | Protocolo do jogo (`src/net/protocol.ts` no jogo) |

Limites: 16 kB por mensagem; 40 mensagens/s por conexão (acima são ignoradas; acima de 200/s a conexão cai); até
200 salas. Origens permitidas: o jogo, o Santuário, este servidor e `localhost:5173` (troque com `ALLOWED_ORIGINS`,
lista separada por vírgula). Salas vivem só na memória: acabam quando o último sai ou o servidor reinicia.

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
