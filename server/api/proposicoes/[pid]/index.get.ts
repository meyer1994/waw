export type ProposicaoDetalhe = {
  id: number
  uri: string
  siglaTipo: string
  codTipo: number
  numero: number
  ano: number
  ementa: string
  dataApresentacao: string | null
  descricaoTipo: string | null
  ementaDetalhada: string | null
  keywords: string | null
  urlInteiroTeor: string | null
  texto: string | null
  justificativa: string | null
  statusProposicao: {
    dataHora: string | null
    sequencia: number | null
    siglaOrgao: string | null
    uriOrgao: string | null
    regime: string | null
    descricaoTramitacao: string | null
    descricaoSituacao: string | null
    ementaUrl: string | null
  } | null
}

export default defineEventHandler(async (event): Promise<ProposicaoDetalhe> => {
  const pid = getRouterParam(event, 'pid')

  const response = await camaraClient.get<{ dados: ProposicaoDetalhe }>(`proposicoes/${pid}`)

  return response.dados
})
