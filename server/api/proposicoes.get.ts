import { proposicoesSchema } from '~~/shared/schemas'

export type Proposicao = {
  id: number
  uri: string
  siglaTipo: string
  codTipo: number
  numero: number
  ano: number
  ementa: string
  dataApresentacao: string | null
}

type ProposicoesResponse = {
  dados: Proposicao[]
  links: { href: string, rel: string, method?: string }[]
}

export default defineEventHandler(async (event): Promise<ProposicoesResponse> => {
  const query = await getValidatedQuery(event, data => proposicoesSchema.parse(data))

  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined)
      params.set(key, String(value))
  }

  return await $fetch<ProposicoesResponse>('https://dadosabertos.camara.leg.br/api/v2/proposicoes', {
    query: params,
    headers: { Accept: 'application/json' }
  })
})
