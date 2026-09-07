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
  Orador?: Record<string, unknown>
  Publicacoes?: Record<string, unknown>
}

export default defineEventHandler(async (event): Promise<{ dados: Pronunciamento[] }> => {
  const sid = getRouterParam(event, 'sid')
  if (!sid) throw createError({ statusCode: 400, statusMessage: 'Parâmetro de rota obrigatório' })
  const query = await getValidatedQuery(event, data => pronunciamentosSchema.parse(data))

  // Senado expects AAAAMMDD, transform YYYY-MM-DD
  // upstream returns 0 rows without a date range — default to the current legislature (57ª)
  const LEGISLATURA_57_INICIO = '2023-02-01'
  const hoje = new Date().toISOString().slice(0, 10)

  const dados = await senadoClient.list<Pronunciamento>(
    `senador/${sid}/discursos`,
    ['DiscursosParlamentar', 'Parlamentar', 'Pronunciamentos', 'Pronunciamento'],
    {
      query: {
        casa: query.casa,
        dataInicio: (query.dataInicio ?? LEGISLATURA_57_INICIO).replaceAll('-', ''),
        dataFim: (query.dataFim ?? hoje).replaceAll('-', '')
      }
    }
  )

  return { dados }
})
