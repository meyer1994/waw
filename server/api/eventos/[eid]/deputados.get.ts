import type { Deputado } from '../../deputados/index.get'

export default defineEventHandler(async (event): Promise<{ dados: Deputado[] }> => {
  const eid = getRouterParam(event, 'eid')
  if (!eid) throw createError({ statusCode: 400, statusMessage: 'Parâmetro de rota obrigatório' })

  return await camaraClient.get<{ dados: Deputado[] }>(`eventos/${eid}/deputados`)
})
