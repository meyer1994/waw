export type Licenca = {
  Codigo: string
  DataInicio: string | null
  DataInicioPrevista: string | null
  DataFim: string | null
  DataFimPrevista: string | null
  SiglaTipoAfastamento: string | null
  DescricaoTipoAfastamento: string | null
}

export default defineEventHandler(async (event): Promise<{ dados: Licenca[] }> => {
  const sid = getRouterParam(event, 'sid')

  const res = await $fetch<{ LicencaParlamentar: { Parlamentar: { Licencas?: { Licenca?: Licenca | Licenca[] } } } }>(
    `https://legis.senado.leg.br/dadosabertos/senador/${sid}/licencas.json`,
    { headers: { Accept: 'application/json' } }
  )

  return { dados: toArray(res.LicencaParlamentar?.Parlamentar?.Licencas?.Licenca) }
})
