# helora.dev

Site institucional da HeloraDev. SPA em React 18 + Vite 4 + Tailwind 3, hospedado na **Cloudflare Pages**.

## Rodar localmente

```bash
npm install
npm run dev      # Vite puro — ver o aviso abaixo
npm run build    # gera dist/
npm run lint     # precisa sair em 0
```

> ⚠️ **`npm run dev` não serve as Functions.** O `/api/contact` cai no rewrite da SPA
> e devolve `index.html` com status 200. Como o formulário checa `response.ok`, ele
> mostra **toast de sucesso sem ter enviado lead nenhum**. Para testar o formulário:
>
> ```bash
> npx wrangler pages dev dist
> ```

## Estrutura

| Caminho | Papel |
| --- | --- |
| `src/` | A SPA. `SectionIntro` e `SurfaceCard` são os primitivos que mantêm as seções coerentes entre si. |
| `functions/api/contact.js` | Pages Function que faz proxy do webhook do Make, guardando os segredos no servidor. |
| `public/_redirects` | Fallback da SPA. |
| `public/_routes.json` | Fixa as Functions em `/api/*`. Sem isso, a precedência entre Function e rewrite fica ambígua. |
| `public/fonts/` | IBM Plex Sans auto-hospedada. **Não trocar por CDN** — o site é autossuficiente de propósito. |

## Variáveis de ambiente

Cadastrar como **Secret** no painel da Cloudflare, em *Workers e Pages → helora-dev → Settings → Variables and Secrets*, nos ambientes **Production e Preview**:

| Nome | O que é |
| --- | --- |
| `MAKE_WEBHOOK_URL` | URL do webhook do cenário Make que recebe os leads |
| `MAKE_API_KEY` | Chave enviada no header `x-make-apikey` |

Sem elas o endpoint devolve 500 e nenhum lead é entregue. Variável nova **não se aplica a deploy existente** — precisa republicar.

## Deploy

Build command `npm run build`, output directory `dist`. Push na `master` publica.

## Checklist de cutover — na ordem

A ordem importa: inverter os passos 4 e 5 deixa o site sem receber leads.

1. [ ] **Recriar `MX` e `SPF` na Cloudflare antes de trocar os nameservers.**
       O e-mail `dev4me@helora.dev` está na Hostinger: `mx1.hostinger.com` (prioridade 5),
       `mx2.hostinger.com` (10) e `v=spf1 include:_spf.mail.hostinger.com ~all`.
       Este é o único passo da migração onde um erro quebra algo que hoje funciona.
2. [ ] Trocar os nameservers do domínio para os da Cloudflare
3. [ ] Conectar o repositório ao projeto Pages e publicar
4. [ ] Cadastrar as variáveis de ambiente e republicar
5. [ ] Enviar um lead de teste e confirmar que chegou no Make
6. [ ] **Só então** revogar a chave antiga no Make
7. [ ] Conferir GA4 em tempo real e o Meta Pixel Helper com o site já no ar
8. [ ] Conferir que o e-mail do domínio continua chegando

> ⚠️ O primeiro deploy publica o rebrand que nunca foi ao ar. O site atual ainda
> serve um bundle de janeiro de 2026 — a mudança visual será grande.

## Segurança

A chave do Make **já vazou**: esteve em texto puro no bundle público e segue no
histórico do git. O proxy impede exposição futura, não desfaz a passada.
**Rotacionar a chave no Make é obrigatório.**

O endpoint não tem rate limiting. Não há headers CORS, o que bloqueia abuso via
navegador de outra origem, mas `curl` ignora CORS — ainda dá para script. Ver T21.
