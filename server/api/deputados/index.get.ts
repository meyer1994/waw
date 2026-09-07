import { deputadosSchema } from '~~/shared/schemas'

export type Deputado = {
  id: number
  nome: string
  siglaPartido: string
  siglaUf: string
  idLegislatura: number
  urlFoto: string
  email: string | null
  uri: string
  uriPartido: string
}

type DeputadosResponse = {
  dados: Deputado[]
  links: { href: string, rel: string, method?: string }[]
}

export default defineEventHandler(async (event): Promise<DeputadosResponse> => {
  const query = await getValidatedQuery(event, data => deputadosSchema.parse(data))

  const url = new URL('https://dadosabertos.camara.leg.br/api/v2/deputados')
  for (const [key, value] of Object.entries(query))
    if (value !== undefined) url.searchParams.set(key, String(value))

  return await $fetch<DeputadosResponse>(url.toString(), {
    headers: { Accept: 'application/json' }
  })
})
