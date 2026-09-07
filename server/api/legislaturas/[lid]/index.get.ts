import type { Legislatura } from '../index.get'

export default defineEventHandler(async (event): Promise<Legislatura> => {
  const lid = getRouterParam(event, 'lid')

  const response = await $fetch<{ dados: Legislatura }>(
    `https://dadosabertos.camara.leg.br/api/v2/legislaturas/${lid}`,
    { headers: { Accept: 'application/json' } }
  )

  return response.dados
})
