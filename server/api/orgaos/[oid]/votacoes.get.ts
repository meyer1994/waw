import type { Votacao } from '../../votacoes/index.get'

export default defineEventHandler(async (event): Promise<{ dados: Votacao[] }> => {
  const oid = getRouterParam(event, 'oid')
  if (!oid) throw createError({ statusCode: 400, statusMessage: 'Parâmetro de rota obrigatório' })

  return await camaraClient.get<{ dados: Votacao[] }>(`orgaos/${oid}/votacoes`, { query: {
    ordem: 'desc',
    ordenarPor: 'dataHoraRegistro'
  } })
})
