import type { Deputado } from '../../deputados/index.get'

export default defineEventHandler(async (event): Promise<{ dados: Deputado[] }> => {
  const eid = getRouterParam(event, 'eid')

  return await camaraClient.get<{ dados: Deputado[] }>(`eventos/${eid}/deputados`)
})
