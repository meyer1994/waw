import type { Votacao } from '../../votacoes/index.get'

export default defineEventHandler(async (event): Promise<{ dados: Votacao[] }> => {
  const oid = getRouterParam(event, 'oid')

  return await camaraClient.get<{ dados: Votacao[] }>(`orgaos/${oid}/votacoes`, {
    ordem: 'desc',
    ordenarPor: 'dataHoraRegistro'
  })
})
