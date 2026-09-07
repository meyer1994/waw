export type Profissao = {
  NomeProfissao: string
  IndicadorAtividadePrincipal: string | null
}

export default defineEventHandler(async (event): Promise<{ dados: Profissao[] }> => {
  const sid = getRouterParam(event, 'sid')
  if (!sid) throw createError({ statusCode: 400, statusMessage: 'Parâmetro de rota obrigatório' })

  // Note: upstream returns the HistoricoAcademico envelope for this service (quirk of the API)
  const dados = await senadoClient.list<Profissao>(
    `senador/${sid}/profissao`,
    ['HistoricoAcademicoParlamentar', 'Parlamentar', 'Profissoes', 'Profissao']
  )

  return { dados }
})
