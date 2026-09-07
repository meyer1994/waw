import type { Partido } from '../../partidos/index.get'

export default defineEventHandler(async (event): Promise<{ dados: Partido[] }> => {
  const bid = getRouterParam(event, 'bid')
  if (!bid) throw createError({ statusCode: 400, statusMessage: 'Parâmetro de rota obrigatório' })

  return await camaraClient.get<{ dados: Partido[] }>(`blocos/${bid}/partidos`)
})
