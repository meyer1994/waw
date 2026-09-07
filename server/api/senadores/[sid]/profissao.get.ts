export type Profissao = {
  NomeProfissao: string
  IndicadorAtividadePrincipal: string | null
}

// Note: upstream returns the HistoricoAcademico envelope for this service (quirk of the API)
export default defineEventHandler(async (event): Promise<{ dados: Profissao[] }> => {
  const sid = getRouterParam(event, 'sid')

  const res = await $fetch<{ HistoricoAcademicoParlamentar: { Parlamentar: { Profissoes?: { Profissao?: Profissao | Profissao[] } } } }>(
    `https://legis.senado.leg.br/dadosabertos/senador/${sid}/profissao.json`,
    { headers: { Accept: 'application/json' } }
  )

  return { dados: toArray(res.HistoricoAcademicoParlamentar?.Parlamentar?.Profissoes?.Profissao) }
})
