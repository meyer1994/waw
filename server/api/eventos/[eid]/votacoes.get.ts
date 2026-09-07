import type { Votacao } from '../../votacoes/index.get'

export default defineEventHandler(async (event): Promise<{ dados: Votacao[] }> => {
  const eid = getRouterParam(event, 'eid')

  return await $fetch(`https://dadosabertos.camara.leg.br/api/v2/eventos/${eid}/votacoes`, {
    headers: { Accept: 'application/json' }
  })
})
