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

  return await $fetch(`https://dadosabertos.camara.leg.br/api/v2/deputados/${did}/discursos`, {
    query: { itens: 10, ordem: 'desc', ordenarPor: 'dataHoraInicio' },
    headers: { Accept: 'application/json' }
  })
})
