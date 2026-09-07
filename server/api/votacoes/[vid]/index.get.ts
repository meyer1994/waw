import type { Votacao } from '../index.get'

// Detail returns the full VotacaoID shape, not the list projection
export type VotacaoDetalhe = Votacao & {
  idEvento: string | null
  idOrgao: number | null
  dataHoraUltimaAberturaVotacao: string | null
  descUltimaAberturaVotacao: string | null
  efeitosRegistrados: Record<string, unknown>[] | null
  objetosPossiveis: Record<string, unknown>[] | null
  proposicoesAfetadas: Record<string, unknown>[] | null
  ultimaApresentacaoProposicao: Record<string, unknown> | null
}

export default defineEventHandler(async (event): Promise<VotacaoDetalhe> => {
  const vid = getRouterParam(event, 'vid')
  if (!vid) throw createError({ statusCode: 400, statusMessage: 'Parâmetro de rota obrigatório' })

  const response = await camaraClient.get<{ dados: VotacaoDetalhe }>(`votacoes/${vid}`)

  return response.dados
})
