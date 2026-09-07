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
}

type RawParlamentar = {
  IdentificacaoParlamentar: Omit<Senador, 'DescricaoParticipacao'>
  Mandato: { DescricaoParticipacao: string | null }
}

type Envelope = {
  ListaParlamentarEmExercicio?: { Parlamentares?: { Parlamentar?: RawParlamentar | RawParlamentar[] } }
  AfastamentoAtual?: { Parlamentares?: { Parlamentar?: RawParlamentar | RawParlamentar[] } }
}

export default defineEventHandler(async (event): Promise<{ dados: Senador[] }> => {
  const query = await getValidatedQuery(event, data => senadoresSchema.parse(data))

  const path = query.afastados ? 'afastados' : 'lista/atual'
  const url = new URL(`https://legis.senado.leg.br/dadosabertos/senador/${path}.json`)
  for (const [key, value] of Object.entries(query))
    if (value !== undefined && key !== 'afastados') url.searchParams.set(key, String(value))

  const res = await $fetch<Envelope>(url.toString(), {
    headers: { Accept: 'application/json' }
  })

  const raw = res.ListaParlamentarEmExercicio?.Parlamentares?.Parlamentar
    ?? res.AfastamentoAtual?.Parlamentares?.Parlamentar

  return {
    dados: toArray(raw).map(({ IdentificacaoParlamentar, Mandato }) => ({
      ...IdentificacaoParlamentar,
      DescricaoParticipacao: Mandato?.DescricaoParticipacao ?? null
    }))
  }
})
