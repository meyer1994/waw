import type { Mandato } from './index.get'

export default defineEventHandler(async (event): Promise<{ dados: Mandato[] }> => {
  const sid = getRouterParam(event, 'sid')

  const dados = await senadoClient.list<Mandato>(
    `senador/${sid}/mandatos`,
    ['MandatoParlamentar', 'Parlamentar', 'Mandatos', 'Mandato']
  )

  return { dados }
})
