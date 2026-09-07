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

  return await camaraClient.get<{ dados: ProposicaoRelacionada[] }>(`proposicoes/${pid}/relacionadas`)
})
