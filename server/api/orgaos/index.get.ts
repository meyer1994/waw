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
  return await $fetch('https://dadosabertos.camara.leg.br/api/v2/orgaos', {
    query: { ordem: 'desc', ordenarPor: 'id' },
    headers: { Accept: 'application/json' }
  })
})
