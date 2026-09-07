import type { Legislatura } from '../index.get'

export default defineEventHandler(async (event): Promise<Legislatura> => {
  const lid = getRouterParam(event, 'lid')

  const response = await camaraClient.get<{ dados: Legislatura }>(`legislaturas/${lid}`)

  return response.dados
})
