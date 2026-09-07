import type { Orgao } from '../../orgaos/index.get'

export default defineEventHandler(async (event): Promise<{ dados: Orgao[] }> => {
  const eid = getRouterParam(event, 'eid')
  if (!eid) throw createError({ statusCode: 400, statusMessage: 'Parâmetro de rota obrigatório' })

  return await camaraClient.get<{ dados: Orgao[] }>(`eventos/${eid}/orgaos`)
})
