export type LiderLegislatura = {
  titulo: string | null
  dataInicio: string | null
  dataFim: string | null
  bancada: { nome: string | null, tipo: string | null, uri: string | null } | null
  parlamentar: {
    id: number
    nome: string
    siglaPartido: string | null
    siglaUf: string | null
    idLegislatura: number | null
    email: string | null
    urlFoto: string | null
    uri: string | null
    uriPartido: string | null
  } | null
}

export default defineEventHandler(async (event): Promise<{ dados: LiderLegislatura[] }> => {
  const lid = getRouterParam(event, 'lid')
  if (!lid) throw createError({ statusCode: 400, statusMessage: 'Parâmetro de rota obrigatório' })

  return await camaraClient.get<{ dados: LiderLegislatura[] }>(`legislaturas/${lid}/lideres`)
})
