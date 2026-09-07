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
  if (!pid) throw createError({ statusCode: 400, statusMessage: 'Parâmetro de rota obrigatório' })

  return await camaraClient.get<{ dados: Votacao[] }>(`proposicoes/${pid}/votacoes`)
})
