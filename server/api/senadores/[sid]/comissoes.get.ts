export type ComissaoMembro = {
  CodigoComissao: string
  SiglaComissao: string
  NomeComissao: string
  SiglaCasaComissao: string | null
  DescricaoParticipacao: string | null
  DataInicio: string | null
  DataFim: string | null
}

// TODO: upstream "Comissao" record keeps changing shape (IdentificacaoComissao + participação/datas), kept loose
type RawComissao = {
  IdentificacaoComissao?: Partial<ComissaoMembro>
  DescricaoParticipacao?: string | null
  DataInicio?: string | null
  DataFim?: string | null
} & Record<string, unknown>

export default defineEventHandler(async (event): Promise<{ dados: ComissaoMembro[] }> => {
  const sid = getRouterParam(event, 'sid')

  const res = await $fetch<{ MembroComissaoParlamentar: { Parlamentar: { MembroComissoes?: { Comissao?: RawComissao | RawComissao[] } } } }>(
    `https://legis.senado.leg.br/dadosabertos/senador/${sid}/comissoes.json`,
    { headers: { Accept: 'application/json' } }
  )

  return {
    dados: toArray(res.MembroComissaoParlamentar?.Parlamentar?.MembroComissoes?.Comissao).map((c): ComissaoMembro => ({
      CodigoComissao: c.IdentificacaoComissao?.CodigoComissao ?? '',
      SiglaComissao: c.IdentificacaoComissao?.SiglaComissao ?? '',
      NomeComissao: c.IdentificacaoComissao?.NomeComissao ?? '',
      SiglaCasaComissao: c.IdentificacaoComissao?.SiglaCasaComissao ?? null,
      DescricaoParticipacao: c.DescricaoParticipacao ?? null,
      DataInicio: c.DataInicio ?? null,
      DataFim: c.DataFim ?? null
    }))
  }
})
