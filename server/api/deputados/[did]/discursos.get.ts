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

export default defineEventHandler(async (event): Promise<{ dados: Discurso[] }> => {
  const did = getRouterParam(event, 'did')
  if (!did) throw createError({ statusCode: 400, statusMessage: 'Parâmetro de rota obrigatório' })

  return await camaraClient.get<{ dados: Discurso[] }>(`deputados/${did}/discursos`, { query: {
    itens: 10,
    ordem: 'desc',
    ordenarPor: 'dataHoraInicio'
  } })
})
