import type { Votacao } from '../../votacoes/index.get'

export default defineEventHandler(async (event): Promise<{ dados: Votacao[] }> => {
  const eid = getRouterParam(event, 'eid')

  return await camaraClient.get<{ dados: Votacao[] }>(`eventos/${eid}/votacoes`)
})
