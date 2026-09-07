export type Cargo = {
  CodigoComissao: string
  SiglaComissao: string
  NomeComissao: string
  SiglaCasaComissao: string | null
  CodigoCargo: string | null
  DescricaoCargo: string | null
  DataInicio: string | null
  DataFim: string | null
}

// TODO: upstream "Cargo" record keeps changing shape (IdentificacaoComissao + cargo/datas), kept loose
type RawCargo = {
  IdentificacaoComissao?: Partial<Cargo>
  CodigoCargo?: string | null
  DescricaoCargo?: string | null
  DataInicio?: string | null
  DataFim?: string | null
} & Record<string, unknown>

export default defineEventHandler(async (event): Promise<{ dados: Cargo[] }> => {
  const sid = getRouterParam(event, 'sid')

  const res = await $fetch<{ CargoParlamentar: { Parlamentar: { Cargos?: { Cargo?: RawCargo | RawCargo[] } } } }>(
    `https://legis.senado.leg.br/dadosabertos/senador/${sid}/cargos.json`,
    { headers: { Accept: 'application/json' } }
  )

  return {
    dados: toArray(res.CargoParlamentar?.Parlamentar?.Cargos?.Cargo).map((c): Cargo => ({
      CodigoComissao: c.IdentificacaoComissao?.CodigoComissao ?? '',
      SiglaComissao: c.IdentificacaoComissao?.SiglaComissao ?? '',
      NomeComissao: c.IdentificacaoComissao?.NomeComissao ?? '',
      SiglaCasaComissao: c.IdentificacaoComissao?.SiglaCasaComissao ?? null,
      CodigoCargo: c.CodigoCargo ?? null,
      DescricaoCargo: c.DescricaoCargo ?? null,
      DataInicio: c.DataInicio ?? null,
      DataFim: c.DataFim ?? null
    }))
  }
})
