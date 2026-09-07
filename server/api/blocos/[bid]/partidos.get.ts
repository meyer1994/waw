import type { Partido } from '../../partidos/index.get'

export default defineEventHandler(async (event): Promise<{ dados: Partido[] }> => {
  const bid = getRouterParam(event, 'bid')

  return await $fetch(`https://dadosabertos.camara.leg.br/api/v2/blocos/${bid}/partidos`, {
    headers: { Accept: 'application/json' }
  })
})
