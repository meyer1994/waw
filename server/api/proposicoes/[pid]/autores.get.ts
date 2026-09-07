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

  return await camaraClient.get<{ dados: Autor[] }>(`proposicoes/${pid}/autores`)
})
