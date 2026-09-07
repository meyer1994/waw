export type Tema = {
  codTema: number
  relevancia: number | null
  tema: string
}

export default defineEventHandler(async (event): Promise<{ dados: Tema[] }> => {
  const pid = getRouterParam(event, 'pid')
  if (!pid) throw createError({ statusCode: 400, statusMessage: 'Parâmetro de rota obrigatório' })

  return await camaraClient.get<{ dados: Tema[] }>(`proposicoes/${pid}/temas`)
})
