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

  return await camaraClient.get<{ dados: Ocupacao[] }>(`deputados/${did}/ocupacoes`)
})
