export type Historico = {
  id: number
  idLegislatura: number
  nome: string
  nomeEleitoral: string
  siglaPartido: string | null
  siglaUf: string | null
  situacao: string | null
  condicaoEleitoral: string | null
  descricaoStatus: string | null
  email: string | null
  dataHora: string | null
  uri: string | null
  uriPartido: string | null
  urlFoto: string | null
}

export default defineEventHandler(async (event): Promise<{ dados: Historico[] }> => {
  const did = getRouterParam(event, 'did')
  if (!did) throw createError({ statusCode: 400, statusMessage: 'Parâmetro de rota obrigatório' })

  return await camaraClient.get<{ dados: Historico[] }>(`deputados/${did}/historico`)
})
