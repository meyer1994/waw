import type { Votacao } from '../index.get'

export default defineEventHandler(async (event): Promise<Votacao> => {
  const vid = getRouterParam(event, 'vid')

  const response = await $fetch<{ dados: Votacao }>(
    `https://dadosabertos.camara.leg.br/api/v2/votacoes/${vid}`,
    { headers: { Accept: 'application/json' } }
  )

  return response.dados
})
