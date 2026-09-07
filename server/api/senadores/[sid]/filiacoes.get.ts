export type Filiacao = {
  Partido: {
    CodigoPartido: string
    SiglaPartido: string
    NomePartido: string
  }
  DataFiliacao: string | null
  DataDesfiliacao: string | null
}

export default defineEventHandler(async (event): Promise<{ dados: Filiacao[] }> => {
  const sid = getRouterParam(event, 'sid')

  const res = await $fetch<{ FiliacaoParlamentar: { Parlamentar: { Filiacoes?: { Filiacao?: Filiacao | Filiacao[] } } } }>(
    `https://legis.senado.leg.br/dadosabertos/senador/${sid}/filiacoes.json`,
    { headers: { Accept: 'application/json' } }
  )

  return { dados: toArray(res.FiliacaoParlamentar?.Parlamentar?.Filiacoes?.Filiacao) }
})
