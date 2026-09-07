export type Curso = {
  NomeCurso: string
  GrauInstrucao: string | null
  Estabelecimento: string | null
}

export default defineEventHandler(async (event): Promise<{ dados: Curso[] }> => {
  const sid = getRouterParam(event, 'sid')

  const res = await $fetch<{ HistoricoAcademicoParlamentar: { Parlamentar: { HistoricoAcademico?: { Curso?: Curso | Curso[] } } } }>(
    `https://legis.senado.leg.br/dadosabertos/senador/${sid}/historicoAcademico.json`,
    { headers: { Accept: 'application/json' } }
  )

  return { dados: toArray(res.HistoricoAcademicoParlamentar?.Parlamentar?.HistoricoAcademico?.Curso) }
})
