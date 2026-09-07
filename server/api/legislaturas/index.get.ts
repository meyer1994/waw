export type Legislatura = {
  id: number
  dataInicio: string | null
  dataFim: string | null
  uri: string
}

export default defineEventHandler(async (): Promise<{ dados: Legislatura[] }> => {
  return await $fetch('https://dadosabertos.camara.leg.br/api/v2/legislaturas', {
    query: { ordem: 'desc', ordenarPor: 'id' },
    headers: { Accept: 'application/json' }
  })
})
