export type Votacao = {
  aprovacao: number | null
  data: string | null
  dataHoraRegistro: string | null
  descricao: string | null
  id: string
  proposicaoObjeto: string | null
  siglaOrgao: string | null
  uri: string | null
  uriEvento: string | null
  uriOrgao: string | null
  uriProposicaoObjeto: string | null
}

export default defineEventHandler(async (event): Promise<{ dados: Votacao[] }> => {
  const pid = getRouterParam(event, 'pid')

  return await $fetch(`https://dadosabertos.camara.leg.br/api/v2/proposicoes/${pid}/votacoes`, {
    headers: { Accept: 'application/json' }
  })
})
