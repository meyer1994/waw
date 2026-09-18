# Waw — Dados Legislativos

Explorador de dados abertos do legislativo brasileiro: Deputados e Senadores,
proposições, votações, comissões, sessões plenárias, legislação e composição
das casas — tudo consumido direto das APIs públicas da **Câmara dos Deputados**
e do **Senado Federal**.

Feito com [Nuxt 4](https://nuxt.com) + [Nuxt UI v4](https://ui.nuxt.com).

## Seções

### Câmara (dadosabertos.camara.leg.br)
Deputados (perfil + proposições, discursos, despesas, eventos, órgãos, frentes,
histórico, ocupações, profissões, mandatos externos) · Proposições · Partidos ·
Blocos · Órgãos · Eventos · Votações · Frentes · Grupos · Legislaturas.

### Senado (legis.senado.leg.br/dadosabertos)
Senadores (perfil + filiações, mandatos, comissões, cargos, licenças, discursos,
apartes, profissões, acadêmico) · Comissões (detalhe + composição) · Processos
Legislativos · Plenário (agenda + pauta/resultado/resumo de encontros) ·
Votações Nominais · Legislação · Blocos · Partidos · Mesa Diretora · Lideranças.

## Stack

- **Nuxt 4** (SSR) + **Nuxt UI v4** (Tailwind CSS v4) + Vue 3
- **VueUse** (composables) · **Zod** (validação de formulários)
- **v-network-graph** + **d3-force** (visualizações de rede, `app/pages/examples`)
- **Cloudflare Workers** (deploy via `wrangler`, cache em KV)
- **openapi-typescript** (tipos derivados dos specs OpenAPI)

## Scripts

| Comando | Descrição |
| --- | --- |
| `pnpm dev` | Servidor de desenvolvimento (`http://localhost:3000`) |
| `pnpm build` | Build de produção (`.output/`, preset cloudflare) |
| `pnpm preview` | Preview do build |
| `pnpm lint` / `--fix` | ESLint |
| `pnpm typecheck` | Vue/TS type check |
| `pnpm types` | Regenera `shared/camara.d.ts` e `shared/senado.d.ts` |
| `pnpm cf:deploy` | Deploy no Cloudflare (`wrangler --cwd .output deploy`) |

## Arquitetura

Não há endpoints server-side — toda a aplicação consome as APIs de dados
abertos através de **proxies** definidos em `nuxt.config.ts` (`routeRules`),
com cache **SWR** persistido na **KV `CACHE`** do Cloudflare
(`nitro.storage.cloudflare-kv-binding`, ver `wrangler.jsonc`).

```
/api/camara/**  ->  https://dadosabertos.camara.leg.br/api/v2/**
/api/senado/**  ->  https://legis.senado.leg.br/dadosabertos/**
```

- `allowQuery` mantém os parâmetros no cache key (cache por filtro); cache
  fresco 5 min, stale 10 min (`swr: true`).
- A raiz `/` é pré-renderizada (`prerender: true`).

### ⚠️ Senado responde XML por padrão

O proxy Nitro não repassa o header `Accept`, e a API do Senado retorna XML a
menos que o caminho termine em `.json`. Por isso **todas as URLs do Senado
terminam com `.json`** (`/api/senado/senador/6009.json`). Não remova o sufixo —
uma requisição sem ele envenena o cache com XML por ~5 min.

## Tipos

`pnpm types` roda o openapi-typescript sobre os dois specs:

```
openapi-camara.json -> shared/camara.d.ts
openapi-senado.json -> shared/senado.d.ts
```

- `shared/api.d.ts` e `shared/api-senado.d.ts` são camadas de aliases/tipos de
  envelope usadas pelas páginas.
- O spec do Senado referencia `schemas/processo.yml` (detalhe de processo), que
  **não é publicado** upstream — o arquivo é reconstruído a partir de respostas
  reais da API via `scripts/gen-senado-processo-schema.py`, gerando
  `schemas/processo.yml`.

## Estrutura

```
app/
├── app.vue               # layout (header/nav, footer)
├── pages/                # rotas por arquivo
│   ├── camara/…          # seção Câmara
│   └── senado/…          # seção Senado
shared/                   # constantes, schemas zod e tipos OpenAPI
public/flags · public/partidos   # SVGs/files de UF e partidos
nuxt.config.ts            # proxies + cache + preset cloudflare
wrangler.jsonc            # binding KV CACHE p/ persistência de cache
```

`app/pages/<seção>/<entidade>/` segue a convenção de 3 níveis:
`index.vue` (lista) · `[id].vue` (shell do detalhe com `<UNavigationMenu>` +
`<NuxtPage />`) · `[id]/subpagina.vue` (self-contained).