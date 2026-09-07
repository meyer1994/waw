export type Pauta = {
  codRegime: number | null
  ordem: number | null
  regime: string | null
  situacaoItem: string | null
  textoParecer: string | null
  titulo: string | null
  topico: string | null
  uri: string | null
  proposicao_?: { id: number, siglaTipo: string, numero: string, ano: string, ementa: string | null } | null
  relator?: { id: number, nome: string } | null
}

export default defineEventHandler(async (event): Promise<{ dados: Pauta[] }> => {
  const eid = getRouterParam(event, 'eid')

  return await $fetch(`https://dadosabertos.camara.leg.br/api/v2/eventos/${eid}/pauta`, {
    headers: { Accept: 'application/json' }
  })
})
