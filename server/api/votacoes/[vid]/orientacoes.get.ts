export type Orientacao = {
  codPartidoBloco: number
  codTipoLideranca: string | null
  orientacaoVoto: string | null
  siglaPartidoBloco: string | null
  uriPartidoBloco: string | null
}

export default defineEventHandler(async (event): Promise<{ dados: Orientacao[] }> => {
  const vid = getRouterParam(event, 'vid')
  if (!vid) throw createError({ statusCode: 400, statusMessage: 'Parâmetro de rota obrigatório' })

  return await camaraClient.get<{ dados: Orientacao[] }>(`votacoes/${vid}/orientacoes`)
})
