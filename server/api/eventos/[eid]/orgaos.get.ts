import type { Orgao } from '../../orgaos/index.get'

export default defineEventHandler(async (event): Promise<{ dados: Orgao[] }> => {
  const eid = getRouterParam(event, 'eid')

  return await camaraClient.get<{ dados: Orgao[] }>(`eventos/${eid}/orgaos`)
})
