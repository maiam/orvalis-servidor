# Orvalis — servidor

Servidor do **Orvalis** (multiplayer, depois contas e nuvem). O jogo fica em outro repositório
(`maiam/mundoblocos-2d`, publicado em `orvalis.pensamentos.online`); este é só o backend (ADR 0015 do jogo).

**Etapa atual: 0 — teste de hospedagem.** Um servidor mínimo que confirma se a hospedagem aceita conexões WebSocket.

| Rota | O que faz |
|---|---|
| `GET /` | Página de teste: conecta por WebSocket, manda "ping" a cada 2 s e mostra o eco |
| `GET /saude` | JSON `{ ok, conectados, segundosNoAr }` |
| `WS /ws` | Eco das mensagens + aviso de quantos estão conectados (ping a cada 25 s mantém a conexão viva) |

## Rodar
```bash
npm ci
npm start      # http://localhost:3000 (ou a porta de PORT)
npm test
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

**Como saber se funcionou:** abrir `https://orvalis-servidor.pensamentos.online/` — deve aparecer **"✅ Conectado"** e
o eco a cada 2 s. Abrindo em duas abas, "Conectados agora" mostra 2. Se aparecer **"❌ Não conectou"**, a hospedagem não
aceita WebSocket de entrada → plano B: VPS (mesmo código).

## Regras
- Sem dependência do maiamapps. Regras do jogo não são copiadas: virão do código `src/world/` do jogo (próximas etapas).
- Publicação: PR para `main` → Verificação (GitHub Actions) verde → mesclar (método *merge*).
