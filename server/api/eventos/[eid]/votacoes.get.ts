import type { Votacao } from '../../votacoes/index.get'

export default defineEventHandler(async (event): Promise<{ dados: Votacao[] }> => {
  const eid = getRouterParam(event, 'eid')
  if (!eid) throw createError({ statusCode: 400, statusMessage: 'Parâmetro de rota obrigatório' })

  return await camaraClient.get<{ dados: Votacao[] }>(`eventos/${eid}/votacoes`)
})
