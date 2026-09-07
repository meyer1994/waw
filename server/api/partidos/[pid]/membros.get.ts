import type { Deputado } from '../../deputados/index.get'

export default defineEventHandler(async (event): Promise<{ dados: Deputado[] }> => {
  const pid = getRouterParam(event, 'pid')

  return await camaraClient.get<{ dados: Deputado[] }>(`partidos/${pid}/membros`)
})
