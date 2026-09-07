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
  return await camaraClient.get<{ dados: Votacao[] }>('votacoes', { query: {
    itens: 10,
    ordem: 'desc',
    ordenarPor: 'dataHoraRegistro'
  } })
})
