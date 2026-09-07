import { senadoresSchema } from '~~/shared/schemas'

export type Senador = {
  CodigoParlamentar: string
  NomeParlamentar: string
  NomeCompletoParlamentar: string | null
  SexoParlamentar: string | null
  FormaTratamento: string | null
  SiglaPartidoParlamentar: string
  UfParlamentar: string
  UrlFotoParlamentar: string | null
  EmailParlamentar: string | null
  MembroMesa: string | null
  MembroLideranca: string | null
  DescricaoParticipacao: string | null
  Bloco?: Bloco | null
  CodigoPublicoNaLegAtual?: string | null
  UrlPaginaParlamentar?: string | null
  Telefones?: Record<string, unknown>
}

export type Bloco = {
  CodigoBloco: string | null
  NomeBloco: string | null
  SiglaBloco: string | null
}

type RawParlamentar = {
  IdentificacaoParlamentar: Omit<Senador, 'DescricaoParticipacao'>
  Mandato: { DescricaoParticipacao: string | null }
}

export default defineEventHandler(async (event): Promise<{ dados: Senador[] }> => {
  const query = await getValidatedQuery(event, data => senadoresSchema.parse(data))

  const [path, keys]: [string, string[]] = query.afastados
    ? ['senador/afastados', ['AfastamentoAtual', 'Parlamentares', 'Parlamentar']]
    : ['senador/lista/atual', ['ListaParlamentarEmExercicio', 'Parlamentares', 'Parlamentar']]

  const parlamentares = await senadoClient.list<RawParlamentar>(path, keys, {
    query: {
      uf: query.uf,
      participacao: query.participacao
    }
  })

  return {
    dados: parlamentares.map(({ IdentificacaoParlamentar, Mandato }) => ({
      ...IdentificacaoParlamentar,
      DescricaoParticipacao: Mandato?.DescricaoParticipacao ?? null
    }))
  }
})
