export type Curso = {
  NomeCurso: string
  GrauInstrucao: string | null
  Estabelecimento: string | null
  Local: string | null
}

export default defineEventHandler(async (event): Promise<{ dados: Curso[] }> => {
  const sid = getRouterParam(event, 'sid')
  if (!sid) throw createError({ statusCode: 400, statusMessage: 'Parâmetro de rota obrigatório' })

  const dados = await senadoClient.list<Curso>(
    `senador/${sid}/historicoAcademico`,
    ['HistoricoAcademicoParlamentar', 'Parlamentar', 'HistoricoAcademico', 'Curso']
  )

  return { dados }
})
