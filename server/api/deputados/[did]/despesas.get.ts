export type Despesa = {
  ano: number
  cnpjCpfFornecedor: string | null
  codDocumento: string | null
  codLote: number | null
  codTipoDocumento: number | null
  dataDocumento: string | null
  mes: number
  nomeFornecedor: string | null
  numDocumento: string | null
  numRessarcimento: string | null
  parcela: number | null
  tipoDespesa: string | null
  tipoDocumento: string | null
  urlDocumento: string | null
  valorDocumento: number | null
  valorGlosa: number | null
  valorLiquido: number | null
}

export default defineEventHandler(async (event): Promise<{ dados: Despesa[] }> => {
  const did = getRouterParam(event, 'did')
  if (!did) throw createError({ statusCode: 400, statusMessage: 'Parâmetro de rota obrigatório' })

  return await camaraClient.get<{ dados: Despesa[] }>(`deputados/${did}/despesas`, { query: {
    itens: 10,
    ordem: 'desc',
    ordenarPor: 'dataDocumento'
  } })
})
