import type { Evento } from '../../eventos/index.get'

export default defineEventHandler(async (event): Promise<{ dados: Evento[] }> => {
  const oid = getRouterParam(event, 'oid')

  return await camaraClient.get<{ dados: Evento[] }>(`orgaos/${oid}/eventos`, {
    ordem: 'desc',
    ordenarPor: 'dataHoraInicio'
  })
})
