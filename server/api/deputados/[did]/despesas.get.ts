import { despesasSchema } from '~~/shared/schemas'

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

export default defineEventHandler(async (event): Promise<{
  dados: Despesa[]
  links: { href: string, rel: string, method?: string }[]
}> => {
  const did = getRouterParam(event, 'did')
  const query = await getValidatedQuery(event, data => despesasSchema.parse(data))

  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined)
      params.set(key, String(value))
  }

  return await $fetch(`https://dadosabertos.camara.leg.br/api/v2/deputados/${did}/despesas`, {
    query: params,
    headers: { Accept: 'application/json' }
  })
})
