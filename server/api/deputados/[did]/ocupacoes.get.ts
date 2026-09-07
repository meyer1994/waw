export type Ocupacao = {
  anoInicio: number | null
  anoFim: number | null
  titulo: string | null
  entidade: string | null
  entidadePais: string | null
  entidadeUF: string | null
}

export default defineEventHandler(async (event): Promise<{ dados: Ocupacao[] }> => {
  const did = getRouterParam(event, 'did')

  return await $fetch(`https://dadosabertos.camara.leg.br/api/v2/deputados/${did}/ocupacoes`, {
    headers: { Accept: 'application/json' }
  })
})
