import type { Evento } from '../../eventos/index.get'

export default defineEventHandler(async (event): Promise<{ dados: Evento[] }> => {
  const oid = getRouterParam(event, 'oid')
  if (!oid) throw createError({ statusCode: 400, statusMessage: 'Parâmetro de rota obrigatório' })

  return await camaraClient.get<{ dados: Evento[] }>(`orgaos/${oid}/eventos`, { query: {
    ordem: 'desc',
    ordenarPor: 'dataHoraInicio'
  } })
})
