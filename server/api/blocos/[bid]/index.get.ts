import type { Bloco } from '../index.get'

export default defineEventHandler(async (event): Promise<Bloco> => {
  const bid = getRouterParam(event, 'bid')

  const response = await $fetch<{ dados: Bloco }>(
    `https://dadosabertos.camara.leg.br/api/v2/blocos/${bid}`,
    { headers: { Accept: 'application/json' } }
  )

  return response.dados
})
