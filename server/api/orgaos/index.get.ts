export type Orgao = {
  id: number
  uri: string
  sigla: string
  nome: string
  apelido: string | null
  codTipoOrgao: number
  tipoOrgao: string | null
  nomePublicacao: string | null
  nomeResumido: string | null
}

export default defineEventHandler(async (): Promise<{ dados: Orgao[] }> => {
  return await camaraClient.get('orgaos', { query: { ordem: 'desc', ordenarPor: 'id' } })
})
