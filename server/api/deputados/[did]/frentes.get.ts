export type Frente = {
  id: number
  idLegislatura: number
  titulo: string
  uri: string
}

export default defineEventHandler(async (event): Promise<{ dados: Frente[] }> => {
  const did = getRouterParam(event, 'did')
  if (!did) throw createError({ statusCode: 400, statusMessage: 'Parâmetro de rota obrigatório' })

  return await camaraClient.get<{ dados: Frente[] }>(`deputados/${did}/frentes`)
})
