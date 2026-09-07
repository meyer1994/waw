import type { Partido } from '../../partidos/index.get'

export default defineEventHandler(async (event): Promise<{ dados: Partido[] }> => {
  const bid = getRouterParam(event, 'bid')

  return await camaraClient.get<{ dados: Partido[] }>(`blocos/${bid}/partidos`)
})
