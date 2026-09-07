import type { Deputado } from '../../deputados/index.get'

export default defineEventHandler(async (event): Promise<{ dados: Deputado[] }> => {
  const eid = getRouterParam(event, 'eid')

  return await $fetch(`https://dadosabertos.camara.leg.br/api/v2/eventos/${eid}/deputados`, {
    headers: { Accept: 'application/json' }
  })
})
