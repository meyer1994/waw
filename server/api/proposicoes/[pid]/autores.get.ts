export type Autor = {
  codTipo: number
  nome: string
  ordemAssinatura: number | null
  proponente: number | null
  tipo: string
  uri: string
}

export default defineEventHandler(async (event): Promise<{ dados: Autor[] }> => {
  const pid = getRouterParam(event, 'pid')

  return await $fetch(`https://dadosabertos.camara.leg.br/api/v2/proposicoes/${pid}/autores`, {
    headers: { Accept: 'application/json' }
  })
})
