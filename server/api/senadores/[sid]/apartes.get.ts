import type { Pronunciamento } from './discursos.get'

export default defineEventHandler(async (event): Promise<{ dados: Pronunciamento[] }> => {
  const sid = getRouterParam(event, 'sid')

  const dados = await senadoClient.list<Pronunciamento>(
    `senador/${sid}/apartes`,
    ['ApartesParlamentar', 'Parlamentar', 'Apartes', 'Aparte']
  )

  return { dados }
})
