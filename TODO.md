# TODO — Senado pages (from `openapi-senado.json`)

> **Status: core section implemented.** `app/pages/senado/*` is live with a
> `/api/senado/** → dadosabertos/**` proxy, a hand-modeled type layer
> (`shared/api-senado.d.ts`) and pages for all the main entities. See
> “Complete sections” below.

## ⚠️ Key gotcha — Senado returns XML unless `.json`/`Accept`

- The Senado API returns **XML by default**; the Nitro `routeRules` `proxy`
  does **not** forward the client `Accept` header, so `useFetch('/api/senado/...')`
  would silently get XML and render empty tables.
- Fix: all senado fetch URLs end with **`.json`** (`/api/senado/senador/{id}.json`),
  which the upstream honors (official mechanism). Keep this convention for new pages.
- The proxy cache key is path+query (not Accept), so never request a senado URL
  without `.json` — it poisons the cache with XML for ~5 min (SWR maxAge).

## Types

- [x] `pnpm types` fixed (was writing camara types into `shared/senado.d.ts` because
      `openapi-typescript` only reads the first positional input).
- [x] Reconstructed `schemas/processo.yml` (missing upstream) from real API responses;
      regeneration script: `scripts/gen-senado-processo-schema.py`.
- [x] `shared/api-senado.d.ts` — envelope types for all implemented sections.
- [x] `shared/senado.ts` — `asArray()` (XML single-vs-array), misc helpers.

## Resources inventory

~140 endpoints in `openapi-senado.json`, grouped by domain.
Endpoints marked `(DEPRECATED)` are being retired by the Senado API (see spec
intro) — many `materia/*` services point to `processo/*` as successor.

### 🏛️ `senador` — Senadores (↔ `camara/deputados`)
- [ ] Lista senadores en ejercicio — `GET /dadosabertos/senador/lista/atual`
- [ ] Lista por legislatura — `GET /dadosabertos/senador/lista/legislatura/{legislatura}`
- [ ] Lista intervalo de legislaturas — `GET /dadosabertos/senador/lista/legislatura/{inicio}/{fim}`
- [ ] Afastados — `GET /dadosabertos/senador/afastados`
- [ ] Partidos (activos/extintos) — `GET /dadosabertos/senador/partidos`
- [ ] Tipos uso de la palabra — `GET /dadosabertos/senador/lista/tiposUsoPalavra`
- [ ] Detalle — `GET /dadosabertos/senador/{codigo}`
- Subpáginas por senador:
  - [ ] Apartes — `GET /dadosabertos/senador/{codigo}/apartes`
  - [ ] Autorias — `GET /dadosabertos/senador/{codigo}/autorias` *(dep)*
  - [ ] Cargos — `GET /dadosabertos/senador/{codigo}/cargos`
  - [ ] Comissões (membresía) — `GET /dadosabertos/senador/{codigo}/comissoes`
  - [ ] Discursos — `GET /dadosabertos/senador/{codigo}/discursos`
  - [ ] Filiações partidárias — `GET /dadosabertos/senador/{codigo}/filiacoes`
  - [ ] Histórico acadêmico — `GET /dadosabertos/senador/{codigo}/historicoAcademico`
  - [ ] Licencias — `GET /dadosabertos/senador/{codigo}/licencas`
  - [ ] Lideranças — `GET /dadosabertos/senador/{codigo}/liderancas` *(dep)*
  - [ ] Mandatos — `GET /dadosabertos/senador/{codigo}/mandatos`
  - [ ] Profissões — `GET /dadosabertos/senador/{codigo}/profissao`
  - [ ] Relatorias — `GET /dadosabertos/senador/{codigo}/relatorias` *(dep)*
  - [ ] Votaciones — `GET /dadosabertos/senador/{codigo}/votacoes` *(dep)*

### 🏛️ `comissao` — Comissões / Colegiados (↔ `camara/orgaos`)
- [ ] Lista colegiados activos — `GET /dadosabertos/comissao/lista/colegiados`
- [ ] Lista por tipo — `GET /dadosabertos/comissao/lista/{tipo}`
- [ ] Comissões mistas — `GET /dadosabertos/comissao/lista/mistas`
- [ ] Tipos de colegiado — `GET /dadosabertos/comissao/lista/tiposColegiado`
- [ ] Requerimientos CPI — `GET /dadosabertos/comissao/cpi/{comissao}/requerimentos`
- [ ] Detalle — `GET /dadosabertos/comissao/{codigo}`
- [ ] Documentos — `GET /dadosabertos/comissao/{comissao}/documentos` *(dep)*
- [ ] Reuniones — `GET /dadosabertos/comissao/reuniao/{codigoReuniao}`
- [ ] Notas taquigráficas reunión — `GET /dadosabertos/comissao/reuniao/notas/{codigoReuniao}`
- [ ] Doc última reunión — `GET /dadosabertos/comissao/reuniao/{sigla}/documento/{tipoDocumento}`
- [ ] Agenda (día/mes/período/actual) — `GET /dadosabertos/comissao/agenda/{data}`, `/mes/{mes}`,
      `/{inicio}/{fim}`, `/atual/iCal`

### 🏛️ `composicao` — Composición (↔ `camara/blocos · grupos · partidos · legislaturas`)
- [ ] Blocos (lista + composición) — `GET /dadosabertos/composicao/lista/blocos` · `GET /dadosabertos/composicao/bloco/{codigo}`
- [ ] Partidos (activos/extintos) — `GET /dadosabertos/composicao/lista/partidos`
- [ ] Liderança — `GET /dadosabertos/composicao/lideranca` + `tipos` + `tipos-unidade`; lista liderançaCN/SF *(dep)*
- [ ] Mesa directiva CN/SF — `GET /dadosabertos/composicao/mesaCN` · `GET /dadosabertos/composicao/mesaSF`
- [ ] Composición comisión — `GET /dadosabertos/composicao/comissao/{codigo}` · `/atual/mista/{codigo}` · `/resumida/mista/{codigo}/{inicio}/{fim}`
- [ ] Composición por tipo — `GET /dadosabertos/composicao/lista/{tipo}` · `/lista/cn/{tipo}`
- [ ] Tipos de cargo — `GET /dadosabertos/composicao/lista/tiposCargo`

### 📄 `processo` — Procesos legislativos (NEW, ↔ `camara/proposicoes`)
- [ ] Lista — `GET /dadosabertos/processo`
- [ ] Detalle — `GET /dadosabertos/processo/{id}`
- [ ] Documentos — `GET /dadosabertos/processo/documento` + `tipos` + `tipos-conteudo`
- [ ] Emendas — `GET /dadosabertos/processo/emenda`
- [ ] Relatorías — `GET /dadosabertos/processo/relatoria`
- [ ] Prazos — `GET /dadosabertos/processo/prazo` + `tipos`
- [ ] Catálogos — `assuntos`, `classes`, `destinos`, `entes`, `siglas`, `tipos-atualizacao`,
      `tipos-autor`, `tipos-decisao`, `tipos-situacao`

### 📄 `materia` — Matérias (OLD, mostly **DEPRECATED**, successor = `processo/*`)
- [ ] Vetos — `GET /dadosabertos/materia/vetos/antesrcn` · `/aposrcn` · `/encerrados` · `/{ano}`
- [ ] Distribución autoria — `GET /dadosabertos/materia/distribuicao/autoria` · `/{siglaComissao}`
- [ ] Distribución relatoría — `GET /dadosabertos/materia/distribuicao/relatoria/{sigla}`
- [ ] Matérias legislatura actual — `GET /dadosabertos/materia/legislaturaatual` *(dep)*
- [ ] Resto de `materia/*` (~30 endpoints) — deprecated, decidir si se omiten

### 🏛️ `plenario` — Sesiones / Encuentros (↔ `camara/eventos`)
- [ ] Encuentro (detalle) — `GET /dadosabertos/plenario/encontro/{codigo}`
- [ ] Pauta del encuentro — `GET /dadosabertos/plenario/encontro/{codigo}/pauta`
- [ ] Resultado / resumen — `GET /dadosabertos/plenario/encontro/{codigo}/resultado` · `/resumo`
- [ ] Agenda día/mes/CN/período — `GET /dadosabertos/plenario/agenda/dia/{data}` · `/mes/{data}` · `/cn/{data}` · `/cn/{inicio}/{fim}` · `/atual/iCal`
- [ ] Resultado sesión por fecha — `GET /dadosabertos/plenario/resultado/{data}` · `/cn/{data}` · `/mes/{data}`
- [ ] Resultado veto — `GET /dadosabertos/plenario/resultado/veto/{codigo}` + `/materia/{codigo}` + `/dispositivo/{codigo}`
- [ ] Legislaturas — `GET /dadosabertos/plenario/lista/legislaturas` · `GET /dadosabertos/plenario/legislatura/{data}`
- [ ] Discursos por período — `GET /dadosabertos/plenario/lista/discursos/{inicio}/{fim}`
- [ ] Votaciones nominales — `GET /dadosabertos/plenario/votacao/nominal/{ano}` *(dep)* · `GET /dadosabertos/plenario/lista/votacao/...` *(dep)*
- [ ] Orientación de bancada — `GET /dadosabertos/plenario/votacao/orientacionBancada/{inicio}/{fim}` · `/{dataSessao}`
- [ ] Tipos sesión/comparecencia — `GET /dadosabertos/plenario/tiposSessao` · `/lista/tiposComparecimento`

### 🗳️ `votacao` — Votaciones (↔ `camara/votacoes`)
- [ ] Votos nominales por proceso — `GET /dadosabertos/votacao`
- [ ] Votaciones en comisión — `GET /dadosabertos/votacaoComissao/comissao/{siglaComissao}`
- [ ] Por materia — `GET /dadosabertos/votacaoComissao/materia/{sigla}/{numero}/{ano}`
- [ ] Por parlamentario — `GET /dadosabertos/votacaoComissao/parlamentar/{codigo}`

### ⚖️ `legislacao` — Normas
- [ ] Pesquisa de normas — `GET /dadosabertos/legislacao/lista`
- [ ] Detalle por código — `GET /dadosabertos/legislacao/{codigo}`
- [ ] Por sigla/núm/año — `GET /dadosabertos/legislacao/{tipo}/{numdata}/{anoseq}`
- [ ] Por URN — `GET /dadosabertos/legislacao/urn`
- [ ] Catálogos — `classes`, `termos`, `tiposNorma`, `tiposPublicacao`, `tiposVide`, `tiposdeclaracao/detalhe`

### 🎤 `discurso` + `taquigrafia`
- [ ] Texto integral pronunciamiento — `GET /dadosabertos/discurso/texto-integral/{codigo}` · `/texto-binario/{codigo}`
- [ ] Notas taquigráficas — `GET /dadosabertos/taquigrafia/notas/sessao/{idSessao}` · `/notas/reuniao/{idReuniao}`
- [ ] Unidades descritivas (vídeo) — `GET /dadosabertos/taquigrafia/videos/sessao/{idSessao}` · `/videos/reuniao/{idReuniao}`

### 💰 `orcamento` — Presupuesto
- [ ] Lotes de enmiendas — `GET /dadosabertos/orcamento/lista`
- [ ] Oficios — `GET /dadosabertos/orcamento/oficios` · `/{numeroSedol}`

### 👤 `autor` — Autores
- [ ] Parlamentares autores en tramitación — `GET /dadosabertos/autor/lista/atual`
- [ ] Tipos de autor — `GET /dadosabertos/autor/tiposAutor` *(dep)*

## Proposed page tree (mapping to Câmara structure)

```
app/pages/senado/
├── senadores/          ← senador        (index, [sid].vue, subpages: comissoes, discursos,
│                                            filiacoes, mandatos, cargos, ...)
├── comissao/           ← comissao       (index, [cid].vue, subpages: reuniao, documentos, agenda...)
├── processos/          ← processo       (index, [pid].vue, subpages: documentos, emendas, relatorias...)
├── plenario/           ← plenario       (index?, [eid].vue: pauta, resultado, resumo)
├── votacoes/           ← votacao        (+ votacaoComissao)
├── legislacao/         ← legislacao
├── blocos/             ← composicao/blocos
├── partidos/           ← composicao/partidos
├── lideranca/          ← composicao/lideranca
├── mesa/               ← composicao/mesaSF · mesaCN
└── orcamento/ · discursos/ · autor/
```

## Implementation notes / decisions to make
- [x] Add `/api/senado/**` proxy in `nuxt.config.ts` → `https://legis.senado.leg.br/dadosabertos/**`
      (same SWR + `allowQuery` cache pattern as the Câmara proxy).
      `nuxt.config.ts` → `https://legis.senado.leg.br/dadosabertos/**`
      (same SWR + `allowQuery` cache pattern). All URLS must end in `.json`.
- [x] Replicate page contract: parent shell `[id].vue` reads route param, builds
      `NavigationMenuItem[]`, renders `<UNavigationMenu />` + `<NuxtPage />`;
      subpages re-read the param and self-fetch. (senadores, comissão, plenário)
- [ ] Decide which `(DEPRECATED)` endpoints to skip (materia especially) — still open;
      `materia/*` was not implemented (successor `processo/*` preferred).
- [x] Generate types from the OpenAPI spec — done (see “Types” above).
- [ ] Remove/replace `historico-old.vue` dead code under `camara/deputados/[did]/` — still open.
- [x] Check if the Câmara pages can be adapted — yes: `UTable`, `NuxtLink` row
      pattern, `UNavigationMenu` shells, `PARTY_FLAGS`/`UF` constants reused.

## Complete sections (impl)

| Section | Route | Notes |
|---|---|---|
| Senadores | `/senado/senadores` + `[sid]/*` | lista/atual + afastados; subpages filiações, mandatos, comissões, cargos, licenças, discursos, apartes, profissão (broke upstream), académico |
| Comissões | `/senado/comissao` + `[cid]/*` | lista colegiados, detalhe (mesa/cargos), `[cid]/membros` (composição) |
| Processos | `/senado/processos` + `[pid]` | lista (siglas via `/processo/siglas`), detalhe rico |
| Plenário | `/senado/plenario` + `[eid]/*` | agenda do dia (picker), detalhe + `pauta`/`resultado`/`resumo` |
| Votações | `/senado/votacoes` | sessão-votação nominal (filtro por período) |
| Legislação | `/senado/legislacao` + `[lid]` | pesquisa (lista plana ≠ detalhe aninhado) + detalhe |
| Blocos | `/senado/blocos` + `[bid]` | lista + composição |
| Partidos | `/senado/partidos` | lista (composicao/lista/partidos) |
| Mesa | `/senado/mesa` | mesaSF + mesaCN |
| Lideranças | `/senado/lideranca` | composicao/lideranca (array plano) |

## Not implemented (still open)
- `materia/*` (deprecated → use `processo/*`)
- `orcamento/*`, `autor/*`, `discurso/*` texto integral, `taquigrafia/*`
- `comissao` subpáginas de reuniões/agenda/documentos (só detalhe + membros)
