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
  if (!sid) throw createError({ statusCode: 400, statusMessage: 'Parâmetro de rota obrigatório' })

  const dados = await senadoClient.list<Licenca>(
    `senador/${sid}/licencas`,
    ['LicencaParlamentar', 'Parlamentar', 'Licencas', 'Licenca']
  )

  return { dados }
})
