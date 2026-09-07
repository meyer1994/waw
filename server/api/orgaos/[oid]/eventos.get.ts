import type { Evento } from '../../eventos/index.get'

export default defineEventHandler(async (event): Promise<{ dados: Evento[] }> => {
  const oid = getRouterParam(event, 'oid')

  return await $fetch(`https://dadosabertos.camara.leg.br/api/v2/orgaos/${oid}/eventos`, {
    query: { ordem: 'desc', ordenarPor: 'dataHoraInicio' },
    headers: { Accept: 'application/json' }
  })
})
