import { eventosSchema } from '~~/shared/schemas'

export type Evento = {
  id: number
  dataHoraInicio: string | null
  dataHoraFim: string | null
  descricao: string | null
  descricaoTipo: string | null
  situacao: string | null
  uri: string | null
  urlRegistro: string | null
  localExterno: string | null
  localCamara: { andar: string | null, nome: string | null, predio: string | null, sala: string | null } | null
  orgaos: { id: number, nome: string, sigla: string | null, uri: string | null }[]
}

export default defineEventHandler(async (event): Promise<{
  dados: Evento[]
  links: { href: string, rel: string, method?: string }[]
}> => {
  const did = getRouterParam(event, 'did')
  const query = await getValidatedQuery(event, data => eventosSchema.parse(data))

  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined)
      params.set(key, String(value))
  }

  return await $fetch(`https://dadosabertos.camara.leg.br/api/v2/deputados/${did}/eventos`, {
    query: params,
    headers: { Accept: 'application/json' }
  })
})
