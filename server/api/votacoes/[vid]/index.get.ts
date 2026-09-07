import type { Votacao } from '../index.get'

export default defineEventHandler(async (event): Promise<Votacao> => {
  const vid = getRouterParam(event, 'vid')

  const response = await camaraClient.get<{ dados: Votacao }>(`votacoes/${vid}`)

  return response.dados
})
