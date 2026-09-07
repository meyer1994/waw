import type { Bloco } from '../index.get'

export default defineEventHandler(async (event): Promise<Bloco> => {
  const bid = getRouterParam(event, 'bid')
  if (!bid) throw createError({ statusCode: 400, statusMessage: 'Parâmetro de rota obrigatório' })

  const response = await camaraClient.get<{ dados: Bloco }>(`blocos/${bid}`)

  return response.dados
})
