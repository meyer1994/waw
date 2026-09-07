export type Partido = {
  id: number
  sigla: string
  nome: string
  uri: string
}

export default defineEventHandler(async (): Promise<{ dados: Partido[] }> => {
  return await $fetch('https://dadosabertos.camara.leg.br/api/v2/partidos', {
    query: { ordem: 'desc', ordenarPor: 'id' },
    headers: { Accept: 'application/json' }
  })
})
