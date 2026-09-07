export type Tramitacao = {
  dataHora: string | null
  sequencia: number | null
  siglaOrgao: string | null
  uriOrgao: string | null
  uriUltimoRelator: string | null
  regime: string | null
  descricaoTramitacao: string | null
  codTipoTramitacao: number | null
  descricaoSituacao: string | null
  codSituacao: number | null
  despacho: string | null
  url: string | null
  ambito: string | null
  apreciacao: string | null
}

export default defineEventHandler(async (event): Promise<{ dados: Tramitacao[] }> => {
  const pid = getRouterParam(event, 'pid')
  if (!pid) throw createError({ statusCode: 400, statusMessage: 'Parâmetro de rota obrigatório' })

  const response = await camaraClient.get<{ dados: Tramitacao[] }>(`proposicoes/${pid}/tramitacoes`)

  return { dados: [...response.dados].sort((a, b) => (b.dataHora ?? '').localeCompare(a.dataHora ?? '')) }
})
