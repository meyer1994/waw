import type { Orgao } from '../../orgaos/index.get'

export default defineEventHandler(async (event): Promise<{ dados: Orgao[] }> => {
  const eid = getRouterParam(event, 'eid')

  return await $fetch(`https://dadosabertos.camara.leg.br/api/v2/eventos/${eid}/orgaos`, {
    headers: { Accept: 'application/json' }
  })
})
