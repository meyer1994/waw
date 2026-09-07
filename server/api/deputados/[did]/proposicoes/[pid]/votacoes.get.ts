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

  const base = 'https://dadosabertos.camara.leg.br/api/v2'
  const headers = { Accept: 'application/json' }

  const [propRes, votRes] = await Promise.all([
    $fetch<{ dados: ProposicaoDetalhe }>(`${base}/proposicoes/${pid}`, { headers }),
    $fetch<{ dados: Votacao[], links: Link[] }>(`${base}/proposicoes/${pid}/votacoes`, { headers })
  ])

  const votacoes = await Promise.all(votRes.dados.map(async (votacao) => {
    const votos = await $fetch<{ dados: Voto[] }>(`${base}/votacoes/${votacao.id}/votos`, { headers })
    const voto = votos.dados.find(v => v.deputado_.id === Number(did))

    return { ...votacao, voto: voto?.tipoVoto ?? null }
  }))

  return {
    proposicao: propRes.dados,
    votacoes,
    links: votRes.links
  }
})
