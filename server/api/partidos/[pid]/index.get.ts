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
    uriMembros: string | null
    lider: {
      idLegislatura: number | null
      nome: string
      siglaPartido: string | null
      uf: string | null
      uri: string | null
      uriPartido: string | null
      urlFoto: string | null
    } | null
  } | null
}

export default defineEventHandler(async (event): Promise<PartidoDetalhe> => {
  const pid = getRouterParam(event, 'pid')
  if (!pid) throw createError({ statusCode: 400, statusMessage: 'Parâmetro de rota obrigatório' })

  const response = await camaraClient.get<{ dados: PartidoDetalhe }>(`partidos/${pid}`)

  return response.dados
})
