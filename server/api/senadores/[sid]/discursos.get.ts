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
  const dados = await senadoClient.list<Pronunciamento>(
    `senador/${sid}/discursos`,
    ['DiscursosParlamentar', 'Parlamentar', 'Pronunciamentos', 'Pronunciamento'],
    {
      query: {
        casa: query.casa,
        dataInicio: query.dataInicio?.replaceAll('-', ''),
        dataFim: query.dataFim?.replaceAll('-', '')
      }
    }
  )

  return { dados }
})
