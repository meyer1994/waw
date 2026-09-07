export type Frente = {
  id: number
  idLegislatura: number
  titulo: string
  uri: string
}

export default defineEventHandler(async (event): Promise<{ dados: Frente[] }> => {
  const did = getRouterParam(event, 'did')

  return await camaraClient.get<{ dados: Frente[] }>(`deputados/${did}/frentes`)
})
