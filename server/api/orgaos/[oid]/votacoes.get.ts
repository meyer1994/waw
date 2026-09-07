import type { Votacao } from '../../votacoes/index.get'

export default defineEventHandler(async (event): Promise<{ dados: Votacao[] }> => {
  const oid = getRouterParam(event, 'oid')

  return await $fetch(`https://dadosabertos.camara.leg.br/api/v2/orgaos/${oid}/votacoes`, {
    query: { ordem: 'desc', ordenarPor: 'dataHoraRegistro' },
    headers: { Accept: 'application/json' }
  })
})
