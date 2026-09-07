export type Tema = {
  codTema: number
  relevancia: number | null
  tema: string
}

export default defineEventHandler(async (event): Promise<{ dados: Tema[] }> => {
  const pid = getRouterParam(event, 'pid')

  return await $fetch(`https://dadosabertos.camara.leg.br/api/v2/proposicoes/${pid}/temas`, {
    headers: { Accept: 'application/json' }
  })
})
