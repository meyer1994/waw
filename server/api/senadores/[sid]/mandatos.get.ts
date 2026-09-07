import type { Mandato } from './index.get'

export default defineEventHandler(async (event): Promise<{ dados: Mandato[] }> => {
  const sid = getRouterParam(event, 'sid')

  const res = await $fetch<{ MandatoParlamentar: { Parlamentar: { Mandatos?: { Mandato?: Mandato | Mandato[] } } } }>(
    `https://legis.senado.leg.br/dadosabertos/senador/${sid}/mandatos.json`,
    { headers: { Accept: 'application/json' } }
  )

  return { dados: toArray(res.MandatoParlamentar?.Parlamentar?.Mandatos?.Mandato) }
})
