export type Frente = {
  id: number
  idLegislatura: number
  titulo: string
  uri: string
}

export default defineEventHandler(async (): Promise<{ dados: Frente[] }> => {
  return await camaraClient.get<{ dados: Frente[] }>('frentes', { query: { ordem: 'desc', ordenarPor: 'id' } })
})
