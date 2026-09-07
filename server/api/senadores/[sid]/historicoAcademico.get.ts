export type Curso = {
  NomeCurso: string
  GrauInstrucao: string | null
  Estabelecimento: string | null
}

export default defineEventHandler(async (event): Promise<{ dados: Curso[] }> => {
  const sid = getRouterParam(event, 'sid')

  const dados = await senadoClient.list<Curso>(
    `senador/${sid}/historicoAcademico`,
    ['HistoricoAcademicoParlamentar', 'Parlamentar', 'HistoricoAcademico', 'Curso']
  )

  return { dados }
})
