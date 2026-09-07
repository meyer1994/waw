export type MembroMesa = {
  codTitulo: string | null
  dataFim: string | null
  dataInicio: string | null
  email: string | null
  id: number
  idLegislatura: number | null
  nome: string
  siglaPartido: string | null
  siglaUf: string | null
  titulo: string | null
  uri: string | null
  uriPartido: string | null
  urlFoto: string | null
}

export default defineEventHandler(async (event): Promise<{ dados: MembroMesa[] }> => {
  const lid = getRouterParam(event, 'lid')
  if (!lid) throw createError({ statusCode: 400, statusMessage: 'Parâmetro de rota obrigatório' })

  return await camaraClient.get<{ dados: MembroMesa[] }>(`legislaturas/${lid}/mesa`)
})
