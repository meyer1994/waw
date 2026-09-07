export type Grupo = {
  id: number
  nome: string
  anoCriacao: number | null
  ativo: string | null
  grupoMisto: string | null
  subvencionado: string | null
  observacoes: string | null
  resolucaoTitulo: string | null
  resolucaoUri: string | null
  ultimoStatus: string | null
  uri: string
}

export default defineEventHandler(async (): Promise<{ dados: Grupo[] }> => {
  return await camaraClient.get<{ dados: Grupo[] }>('grupos', { query: { ordem: 'desc', ordenarPor: 'id' } })
})
