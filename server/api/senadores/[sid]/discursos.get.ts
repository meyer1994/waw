import { pronunciamentosSchema } from '~~/shared/schemas'

export type Pronunciamento = {
  CodigoPronunciamento: string
  DataPronunciamento: string | null
  SiglaCasaPronunciamento: string | null
  NomeCasaPronunciamento: string | null
  SiglaPartidoParlamentarNaData: string | null
  UfParlamentarNaData: string | null
  TextoResumo: string | null
  Indexacao: string | null
  UrlTexto: string | null
  UrlTextoBinario: string | null
  TipoUsoPalavra?: { Sigla: string | null, Descricao: string | null }
  SessaoPlenaria?: { SiglaTipoSessao: string | null, NumeroSessao: string | null, DataSessao: string | null }
}

export default defineEventHandler(async (event): Promise<{ dados: Pronunciamento[] }> => {
  const sid = getRouterParam(event, 'sid')
  const query = await getValidatedQuery(event, data => pronunciamentosSchema.parse(data))

  // Senado expects AAAAMMDD, transform YYYY-MM-DD
  const params: Record<string, string> = {}
  if (query.casa) params.casa = query.casa
  if (query.dataInicio) params.dataInicio = query.dataInicio.replaceAll('-', '')
  if (query.dataFim) params.dataFim = query.dataFim.replaceAll('-', '')

  const res = await $fetch<{ DiscursosParlamentar: { Parlamentar: { Pronunciamentos?: { Pronunciamento?: Pronunciamento | Pronunciamento[] } } } }>(
    `https://legis.senado.leg.br/dadosabertos/senador/${sid}/discursos.json`,
    { query: params, headers: { Accept: 'application/json' } }
  )

  return { dados: toArray(res.DiscursosParlamentar?.Parlamentar?.Pronunciamentos?.Pronunciamento) }
})
