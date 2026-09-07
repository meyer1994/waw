export type Frente = {
  id: number
  idLegislatura: number
  titulo: string
  uri: string
}

export default defineEventHandler(async (event): Promise<{ dados: Frente[] }> => {
  const did = getRouterParam(event, 'did')

  return await $fetch(`https://dadosabertos.camara.leg.br/api/v2/deputados/${did}/frentes`, {
    headers: { Accept: 'application/json' }
  })
})
