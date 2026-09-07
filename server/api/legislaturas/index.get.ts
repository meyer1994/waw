export type Legislatura = {
  id: number
  dataInicio: string | null
  dataFim: string | null
  uri: string
}

export default defineEventHandler(async (): Promise<{ dados: Legislatura[] }> => {
  return await camaraClient.get<{ dados: Legislatura[] }>('legislaturas', { ordem: 'desc', ordenarPor: 'id' })
})
