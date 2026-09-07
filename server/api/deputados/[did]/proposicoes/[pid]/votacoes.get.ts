type Link = { href: string, rel: string, method?: string }

export type Votacao = {
  aprovacao: number | null
  data: string | null
  dataHoraRegistro: string | null
  descricao: string | null
  id: string
  proposicaoObjeto: string | null
  siglaOrgao: string | null
  uri: string | null
  uriEvento: string | null
  uriOrgao: string | null
  uriProposicaoObjeto: string | null
}

export type VotacaoComVoto = Votacao & { voto: string | null }

type Voto = {
  dataRegistroVoto: string | null
  tipoVoto: string | null
  deputado_: { id: number }
}

export type ProposicaoDetalhe = {
  siglaTipo: string
  numero: number
  ano: number
  ementa: string
} & Record<string, unknown>

export default defineEventHandler(async (event): Promise<{
  proposicao: ProposicaoDetalhe
  votacoes: VotacaoComVoto[]
  links: Link[]
}> => {
  const did = getRouterParam(event, 'did')
  const pid = getRouterParam(event, 'pid')

  const [propRes, votRes] = await Promise.all([
    camaraClient.get<{ dados: ProposicaoDetalhe }>(`proposicoes/${pid}`),
    camaraClient.get<{ dados: Votacao[], links: Link[] }>(`proposicoes/${pid}/votacoes`)
  ])

  const votacoes = await Promise.all(votRes.dados.map(async (votacao) => {
    const votos = await camaraClient.get<{ dados: Voto[] }>(`votacoes/${votacao.id}/votos`)
    const voto = votos.dados.find(v => v.deputado_.id === Number(did))

    return { ...votacao, voto: voto?.tipoVoto ?? null }
  }))

  return {
    proposicao: propRes.dados,
    votacoes,
    links: votRes.links
  }
})
