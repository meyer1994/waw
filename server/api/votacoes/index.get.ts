import { votacoesSchema } from '~~/shared/schemas'

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
  const { idProposicao, idEvento, idOrgao, dataInicio, dataFim, itens } = await getValidatedQuery(event, data => votacoesSchema.parse(data))

  const res = await camaraClient.get<{ dados: Votacao[] }>('votacoes', { query: {
    idProposicao,
    idEvento,
    idOrgao,
    dataInicio,
    dataFim,
    itens,
    ordem: 'desc',
    ordenarPor: 'dataHoraRegistro'
  } })

  return { dados: res.dados }
})
