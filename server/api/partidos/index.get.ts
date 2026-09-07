export type Partido = {
  id: number
  sigla: string
  nome: string
  uri: string
}

export default defineEventHandler(async (): Promise<{ dados: Partido[] }> => {
  return await camaraClient.get<{ dados: Partido[] }>('partidos', { query: { ordem: 'desc', ordenarPor: 'id' } })
})
