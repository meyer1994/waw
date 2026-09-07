import type { Deputado } from '../../deputados/index.get'

export default defineEventHandler(async (event): Promise<{ dados: Deputado[] }> => {
  const pid = getRouterParam(event, 'pid')
  if (!pid) throw createError({ statusCode: 400, statusMessage: 'Parâmetro de rota obrigatório' })

  return await camaraClient.get<{ dados: Deputado[] }>(`partidos/${pid}/membros`)
})
