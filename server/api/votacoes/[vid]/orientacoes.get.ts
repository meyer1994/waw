export type Orientacao = {
  codPartidoBloco: number
  codTipoLideranca: string | null
  orientacaoVoto: string | null
  siglaPartidoBloco: string | null
  uriPartidoBloco: string | null
}

export default defineEventHandler(async (event): Promise<{ dados: Orientacao[] }> => {
  const vid = getRouterParam(event, 'vid')

  return await $fetch(`https://dadosabertos.camara.leg.br/api/v2/votacoes/${vid}/orientacoes`, {
    headers: { Accept: 'application/json' }
  })
})
