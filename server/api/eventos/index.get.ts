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

export default defineEventHandler(async (event): Promise<{ dados: Evento[] }> => {
  const { codTipoEvento, idOrgao, dataInicio, dataFim, itens } = await getValidatedQuery(event, data => eventosSchema.parse(data))

  return await camaraClient.get('eventos', { query: {
    codTipoEvento,
    idOrgao,
    dataInicio,
    dataFim,
    itens,
    ordem: 'desc',
    ordenarPor: 'dataHoraInicio'
  } })
})
