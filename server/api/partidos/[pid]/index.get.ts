export type PartidoDetalhe = {
  id: number
  sigla: string
  nome: string
  uri: string
  numeroEleitoral: number | null
  urlLogo: string | null
  urlWebSite: string | null
  urlFacebook: string | null
  status: {
    data: string | null
    idLegislatura: number | null
    situacao: string | null
    totalMembros: number | null
    totalPosse: number | null
    uri: string | null
  } | null
}

export default defineEventHandler(async (event): Promise<PartidoDetalhe> => {
  const pid = getRouterParam(event, 'pid')

  const response = await camaraClient.get<{ dados: PartidoDetalhe }>(`partidos/${pid}`)

  return response.dados
})
