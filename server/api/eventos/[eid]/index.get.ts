import type { Evento } from '../index.get'

export type EventoDetalhe = Evento & {
  uriConvidados: string | null
  uriDeputados: string | null
  urlDocumentoPauta: string | null
  fases?: Record<string, unknown>[]
  requerimentos?: Record<string, unknown>[]
}

export default defineEventHandler(async (event): Promise<EventoDetalhe> => {
  const eid = getRouterParam(event, 'eid')
  if (!eid) throw createError({ statusCode: 400, statusMessage: 'Parâmetro de rota obrigatório' })

  const response = await camaraClient.get<{ dados: EventoDetalhe }>(`eventos/${eid}`)

  return response.dados
})
