# TODOs — New resources from openapi.json

Pattern for each resource:
- `server/api/<res>/index.get.ts` — list endpoint
- `app/pages/<res>/index.vue` — list page (table)
- `server/api/<res>/[rid]/index.get.ts` — detail endpoint
- `app/pages/<res>/[rid].vue` — detail layout (UTabs + NuxtPage)
- `app/pages/<res>/[rid]/index.vue` — detail tab
- sub-resources: `server/api/<res>/[rid]/<sub>.get.ts` + `app/pages/<res>/[rid]/<sub>.vue`

All items DONE — nothing pending. Kept for reference.

## Partidos
- [x] GET /api/partidos (list)
- [x] /partidos list page
- [x] GET /api/partidos/:pid detail
- [x] /partidos/[pid] layout + detail tab (logo avatar, membros count)
- [x] GET /api/partidos/:pid/membros + page (deputados linked)
- [x] GET /api/partidos/:pid/lideres + page (deputados linked)

## Orgaos
- [x] GET /api/orgaos (list)
- [x] /orgaos list page
- [x] GET /api/orgaos/:oid detail
- [x] /orgaos/[oid] layout + detail tab
- [x] GET /api/orgaos/:oid/membros + page (deputados linked)
- [x] GET /api/orgaos/:oid/eventos + page
- [x] GET /api/orgaos/:oid/votacoes + page

## Eventos
- [x] GET /api/eventos (list) (done early, needed by orgaos)
- [x] /eventos list page
- [x] GET /api/eventos/:eid detail
- [x] /eventos/[eid] layout + detail tab
- [x] GET /api/eventos/:eid/pauta + page (proposições linked)
- [x] GET /api/eventos/:eid/deputados + page (linked)
- [x] GET /api/eventos/:eid/orgaos + page (linked)
- [x] GET /api/eventos/:eid/votacoes + page

## Legislaturas
- [x] GET /api/legislaturas (list)
- [x] /legislaturas list page
- [x] GET /api/legislaturas/:lid detail
- [x] /legislaturas/[lid] layout + detail tab
- [x] GET /api/legislaturas/:lid/mesa + page (deputados linked)
- [x] GET /api/legislaturas/:lid/lideres + page (deputados linked)

## Frentes
- [x] GET /api/frentes (list)
- [x] /frentes list page
- [x] GET /api/frentes/:fid detail
- [x] /frentes/[fid] layout + detail tab (coordenador, keywords)
- [x] GET /api/frentes/:fid/membros + page (deputados linked)

## Blocos
- [x] GET /api/blocos (list)
- [x] /blocos list page
- [x] GET /api/blocos/:bid detail
- [x] /blocos/[bid] layout + detail tab
- [x] GET /api/blocos/:bid/partidos + page (partidos linked)

## Grupos
- [x] GET /api/grupos (list)
- [x] /grupos list page (ativo badge)
- [x] GET /api/grupos/:gid detail
- [x] /grupos/[gid] layout + detail tab
- [x] GET /api/grupos/:gid/membros + page (deputados linked when URI matches)
- [x] GET /api/grupos/:gid/historico + page

## Votacoes
- [x] GET /api/votacoes (list)
- [x] /votacoes list page (resultado badges)
- [x] GET /api/votacoes/:vid detail
- [x] /votacoes/[vid] layout + detail tab (aprovada/rejeitada badge)
- [x] GET /api/votacoes/:vid/votos + page (deputados linked, voto badges)
- [x] GET /api/votacoes/:vid/orientacoes + page (partidos linked, voto badges)

## Wrap-up
- [x] Header nav links: Deputados, Proposições, Partidos, Votações, Órgãos, Eventos
- [x] Cross-links everywhere (deputados ⇄ partidos/orgaos/votacoes; proposições in pauta; partidos in blocos)
- [x] Lint clean
- [x] All routes verified 200
