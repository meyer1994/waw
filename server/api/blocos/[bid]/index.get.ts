import type { Bloco } from '../index.get'

export default defineEventHandler(async (event): Promise<Bloco> => {
  const bid = getRouterParam(event, 'bid')

  const response = await camaraClient.get<{ dados: Bloco }>(`blocos/${bid}`)

  return response.dados
})
