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
  if (!sid) throw createError({ statusCode: 400, statusMessage: 'Parâmetro de rota obrigatório' })

  const comissoes = await senadoClient.list<RawComissao>(
    `senador/${sid}/comissoes`,
    ['MembroComissaoParlamentar', 'Parlamentar', 'MembroComissoes', 'Comissao']
  )

  return {
    dados: comissoes.map((c): ComissaoMembro => ({
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
