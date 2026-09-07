export type ProposicaoRelacionada = {
  id: number
  uri: string
  siglaTipo: string
  codTipo: string | null
  numero: string
  ano: string
  ementa: string | null
  dataApresentacao: string | null
}

export default defineEventHandler(async (event): Promise<{ dados: ProposicaoRelacionada[] }> => {
  const pid = getRouterParam(event, 'pid')

  return await $fetch(`https://dadosabertos.camara.leg.br/api/v2/proposicoes/${pid}/relacionadas`, {
    headers: { Accept: 'application/json' }
  })
})
