export type Bloco = {
  id: number
  idLegislatura: number | null
  nome: string
  federacao: string | null
  uri: string
}

export default defineEventHandler(async (): Promise<{ dados: Bloco[] }> => {
  return await $fetch('https://dadosabertos.camara.leg.br/api/v2/blocos', {
    query: { ordem: 'desc', ordenarPor: 'id' },
    headers: { Accept: 'application/json' }
  })
})
