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

export default defineEventHandler(async (): Promise<{ dados: Votacao[] }> => {
  return await $fetch('https://dadosabertos.camara.leg.br/api/v2/votacoes', {
    query: { itens: 10, ordem: 'desc', ordenarPor: 'dataHoraRegistro' },
    headers: { Accept: 'application/json' }
  })
})
