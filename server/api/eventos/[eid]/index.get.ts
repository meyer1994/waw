import type { Evento } from '../index.get'

export type EventoDetalhe = Evento & {
  localCamara: { andar: string | null, nome: string | null, predio: string | null, sala: string | null } | null
}

export default defineEventHandler(async (event): Promise<EventoDetalhe> => {
  const eid = getRouterParam(event, 'eid')

  const response = await camaraClient.get<{ dados: EventoDetalhe }>(`eventos/${eid}`)

  return response.dados
})
