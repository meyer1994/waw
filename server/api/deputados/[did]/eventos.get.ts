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
  const did = getRouterParam(event, 'did')

  return await camaraClient.get<{ dados: Evento[] }>(`deputados/${did}/eventos`, {
    itens: 10,
    ordem: 'desc',
    ordenarPor: 'dataHoraInicio'
  })
})
