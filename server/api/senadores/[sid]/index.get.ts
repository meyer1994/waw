import type { Senador } from '../index.get'

export type Legislatura = {
  NumeroLegislatura: string
  DataInicio: string | null
  DataFim: string | null
}

export type Exercicio = {
  CodigoExercicio: string
  DataInicio: string | null
  DataFim: string | null
  DescricaoFormaInterposicao: string | null
  DescricaoInterposicao: string | null
}

export type Mandato = {
  CodigoMandato: string
  UfParlamentar: string
  PrimeiraLegislaturaDoMandato: Legislatura | null
  SegundaLegislaturaDoMandato: Legislatura | null
  DescricaoParticipacao: string | null
  Suplentes?: { Suplente: Suplente | Suplente[] }
  Exercicios?: { Exercicio: Exercicio | Exercicio[] }
  Partidos?: { Partido: PartidoMandato | PartidoMandato[] }
}

export type Suplente = {
  DescricaoParticipacao: string | null
  CodigoParlamentar: string
  NomeParlamentar: string
}

export type PartidoMandato = {
  CodigoPartido: string
  Sigla: string
  Nome: string
  DataFiliacao: string | null
  DataDesfiliacao: string | null
}

export type DadosBasicosParlamentar = {
  DataNascimento: string | null
  Naturalidade: string | null
  UfNaturalidade: string | null
  EnderecoParlamentar: string | null
}

export type SenadorDetalhe = {
  IdentificacaoParlamentar: Senador
  DadosBasicosParlamentar: DadosBasicosParlamentar
  OutrasInformacoes?: Record<string, unknown>
  Telefones?: Record<string, unknown>
}

export default defineEventHandler(async (event): Promise<{ senador: SenadorDetalhe, mandatos: Mandato[] }> => {
  const sid = getRouterParam(event, 'sid')

  const [detRes, mandatos] = await Promise.all([
    senadoClient.get<{ DetalheParlamentar: { Parlamentar: SenadorDetalhe } }>(`senador/${sid}`),
    senadoClient.list<Mandato>(`senador/${sid}/mandatos`, ['MandatoParlamentar', 'Parlamentar', 'Mandatos', 'Mandato'])
  ])

  return {
    senador: detRes.DetalheParlamentar.Parlamentar,
    mandatos
  }
})
