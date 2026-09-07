export type Profissao = {
  codTipoProfissao: number
  dataHora: string | null
  titulo: string
}

export default defineEventHandler(async (event): Promise<{ dados: Profissao[] }> => {
  const did = getRouterParam(event, 'did')

  return await camaraClient.get<{ dados: Profissao[] }>(`deputados/${did}/profissoes`)
})
