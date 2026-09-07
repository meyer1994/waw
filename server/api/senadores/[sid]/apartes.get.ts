import type { Pronunciamento } from './discursos.get'

export default defineEventHandler(async (event): Promise<{ dados: Pronunciamento[] }> => {
  const sid = getRouterParam(event, 'sid')
  if (!sid) throw createError({ statusCode: 400, statusMessage: 'Parâmetro de rota obrigatório' })

  const dados = await senadoClient.list<Pronunciamento>(
    `senador/${sid}/apartes`,
    ['ApartesParlamentar', 'Parlamentar', 'Apartes', 'Aparte']
  )

  return { dados }
})
