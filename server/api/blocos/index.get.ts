export type Bloco = {
  id: number
  idLegislatura: number | null
  nome: string
  federacao: string | null
  uri: string
}

export default defineEventHandler(async (): Promise<{ dados: Bloco[] }> => {
  return await camaraClient.get<{ dados: Bloco[] }>('blocos', { ordem: 'desc', ordenarPor: 'id' })
})
