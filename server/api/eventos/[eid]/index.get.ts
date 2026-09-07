import type { Evento } from '../index.get'

export type EventoDetalhe = Evento & {
  localCamara: { andar: string | null, nome: string | null, predio: string | null, sala: string | null } | null
}

export default defineEventHandler(async (event): Promise<EventoDetalhe> => {
  const eid = getRouterParam(event, 'eid')

  const response = await $fetch<{ dados: EventoDetalhe }>(
    `https://dadosabertos.camara.leg.br/api/v2/eventos/${eid}`,
    { headers: { Accept: 'application/json' } }
  )

  return response.dados
})
