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
  return await $fetch('https://dadosabertos.camara.leg.br/api/v2/grupos', {
    query: { ordem: 'desc', ordenarPor: 'id' },
    headers: { Accept: 'application/json' }
  })
})
