export type Voto = {
  dataRegistroVoto: string | null
  tipoVoto: string | null
  deputado_: {
    id: number
    nome: string
    siglaPartido: string | null
    siglaUf: string | null
    idLegislatura: number | null
    urlFoto: string | null
    email: string | null
    uri: string | null
    uriPartido: string | null
  }
}

export default defineEventHandler(async (event): Promise<{ dados: Voto[] }> => {
  const vid = getRouterParam(event, 'vid')
  if (!vid) throw createError({ statusCode: 400, statusMessage: 'Parâmetro de rota obrigatório' })

  return await camaraClient.get<{ dados: Voto[] }>(`votacoes/${vid}/votos`)
})
