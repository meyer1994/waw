export type Pauta = {
  codRegime: number | null
  ordem: number | null
  regime: string | null
  situacaoItem: string | null
  textoParecer: string | null
  titulo: string | null
  topico: string | null
  uriVotacao: string | null
  proposicao_?: {
    id: number
    uri: string | null
    siglaTipo: string
    codTipo: number
    numero: string
    ano: string
    ementa: string | null
    dataApresentacao: string | null
  } | null
  proposicaoRelacionada_?: {
    id: number
    uri: string | null
    siglaTipo: string
    codTipo: string | null
    numero: string
    ano: string
    ementa: string | null
    dataApresentacao: string | null
  } | null
  relator?: {
    id: number
    nome: string
    siglaPartido: string | null
    siglaUf: string | null
    idLegislatura: number | null
    urlFoto: string | null
    email: string | null
    uri: string | null
    uriPartido: string | null
  } | null
}

export default defineEventHandler(async (event): Promise<{ dados: Pauta[] }> => {
  const eid = getRouterParam(event, 'eid')
  if (!eid) throw createError({ statusCode: 400, statusMessage: 'Parâmetro de rota obrigatório' })

  return await camaraClient.get<{ dados: Pauta[] }>(`eventos/${eid}/pauta`)
})
