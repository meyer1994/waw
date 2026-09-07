import type { Pronunciamento } from './discursos.get'

export default defineEventHandler(async (event): Promise<{ dados: Pronunciamento[] }> => {
  const sid = getRouterParam(event, 'sid')

  const res = await $fetch<{ ApartesParlamentar: { Parlamentar: { Apartes?: { Aparte?: Pronunciamento | Pronunciamento[] } } } }>(
    `https://legis.senado.leg.br/dadosabertos/senador/${sid}/apartes.json`,
    { headers: { Accept: 'application/json' } }
  )

  return { dados: toArray(res.ApartesParlamentar?.Parlamentar?.Apartes?.Aparte) }
})
