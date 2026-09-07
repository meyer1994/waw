export type Frente = {
  id: number
  idLegislatura: number
  titulo: string
  uri: string
}

export default defineEventHandler(async (): Promise<{ dados: Frente[] }> => {
  return await $fetch('https://dadosabertos.camara.leg.br/api/v2/frentes', {
    query: { ordem: 'desc', ordenarPor: 'id' },
    headers: { Accept: 'application/json' }
  })
})
