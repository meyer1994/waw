export type Voto = {
  dataRegistroVoto: string | null
  tipoVoto: string | null
  deputado_: {
    id: number
    nome: string
    siglaPartido: string | null
    siglaUf: string | null
    urlFoto: string | null
    uri: string | null
  }
}

export default defineEventHandler(async (event): Promise<{ dados: Voto[] }> => {
  const vid = getRouterParam(event, 'vid')

  return await camaraClient.get<{ dados: Voto[] }>(`votacoes/${vid}/votos`)
})
