import { discursosSchema } from '~~/shared/schemas'

export type Discurso = {
  dataHoraInicio: string | null
  dataHoraFim: string | null
  faseEvento: { dataHoraFim: string | null, dataHoraInicio: string | null, titulo: string | null } | null
  keywords: string | null
  sumario: string | null
  tipoDiscurso: string | null
  transcricao: string | null
  uriEvento: string | null
  urlAudio: string | null
  urlTexto: string | null
  urlVideo: string | null
}

export default defineEventHandler(async (event): Promise<{
  dados: Discurso[]
  links: { href: string, rel: string, method?: string }[]
}> => {
  const did = getRouterParam(event, 'did')
  const query = await getValidatedQuery(event, data => discursosSchema.parse(data))

  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined)
      params.set(key, String(value))
  }

  return await $fetch(`https://dadosabertos.camara.leg.br/api/v2/deputados/${did}/discursos`, {
    query: params,
    headers: { Accept: 'application/json' }
  })
})
