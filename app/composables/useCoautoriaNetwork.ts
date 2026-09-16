import type {
  CamaraDeputadoDetalhe,
  CamaraItem,
  CamaraLista,
  CamaraProposicaoAutor,
  CamaraProposicaoItem
} from '#shared/api'

export interface DeputadoNode extends Record<string, unknown> {
  type: 'deputado'
  nome: string
}
export interface ProposicaoNode extends Record<string, unknown> {
  type: 'proposicao'
  id: number
  siglaTipo: string
  numero: number
  sigla: string
  ementa: string
  ano: number
}
export type GraphNode = DeputadoNode | ProposicaoNode
export type GraphNodes = Record<string, GraphNode>

export type GraphEdges = Record<string, { source: string, target: string, proposicao: CamaraProposicaoItem }>

// proxy direto para a API aberta da Câmara (ver routeRules no nuxt.config.ts)
const API = '/api/camara'

export function useCoautoriaNetwork() {
  // limits to keep the expansion from exploding
  const MAX_AUTORES = 10
  const MAX_NODES = 60

  const nodes = ref<GraphNodes>({})
  const edges = ref<GraphEdges>({})
  const limitReached = ref(false)

  function roomLeft() {
    if (Object.keys(nodes.value).length >= MAX_NODES) {
      limitReached.value = true
      return false
    }
    return true
  }

  // add a node if missing, or enrich when the existing node only has sparse data
  // `name` feeds the default label of v-network-graph
  function addNode(id: string, node: GraphNode) {
    const existing = nodes.value[id]
    if (existing) {
      const isSparseDeputado = existing.type === 'deputado' && !('siglaPartido' in existing)
      if (!isSparseDeputado) return
    }
    const name = node.type === 'deputado' ? node.nome : node.sigla
    nodes.value = { ...nodes.value, [id]: { name, ...node } }
  }

  // dedupe undirected edges by sorted key
  function addEdge(source: string, target: string, proposicao: CamaraProposicaoItem) {
    const key = [source, target].sort().join('~')
    if (edges.value[`e-${key}`]) return
    edges.value = { ...edges.value, [`e-${key}`]: { source, target, proposicao } }
  }

  // fetches the autores of a proposição, creating autoria edges (dep <-> prop).
  // each added deputado is fully fetched. returns how many authors were linked.
  async function fetchProposicaoAutores(proposicao: CamaraProposicaoItem) {
    const pid = `prop-${proposicao.id}`
    addNode(pid, {
      type: 'proposicao',
      id: proposicao.id,
      siglaTipo: proposicao.siglaTipo,
      numero: proposicao.numero,
      sigla: `${proposicao.siglaTipo} ${proposicao.numero}/${proposicao.ano}`,
      ementa: proposicao.ementa,
      ano: proposicao.ano
    })

    const res = await $fetch<CamaraLista<CamaraProposicaoAutor>>(`${API}/proposicoes/${proposicao.id}/autores`)
    let linked = 0
    const autores = res.dados.slice(0, MAX_AUTORES)
    await Promise.all(autores.map(async (autor) => {
      const match = autor.uri.match(/deputados\/(\d+)$/)
      if (!match?.[1]) return
      if (!roomLeft()) return
      await addDeputadoFromAutores(match[1], proposicao, pid)
      linked++
    }))
    return linked
  }

  // fetches the full deputado detail and links it to the proposição
  async function addDeputadoFromAutores(did: string, proposicao: CamaraProposicaoItem, pid: string) {
    const existing = nodes.value[did]
    if (!(existing && 'siglaPartido' in existing)) {
      try {
        const res = await $fetch<CamaraItem<CamaraDeputadoDetalhe>>(`${API}/deputados/${did}`)
        const detalhe = res.dados
        addNode(did, {
          type: 'deputado',
          ...detalhe,
          ...detalhe.ultimoStatus,
          nome: detalhe.ultimoStatus.nomeEleitoral ?? detalhe.ultimoStatus.nome
        })
      } catch {
        // happy path: se o detalhe falhar, usa os dados esparsos do /autores
        addNode(did, { type: 'deputado', nome: '…' })
      }
    }
    addEdge(did, pid, proposicao)
  }

  // fetches a deputado's proposições, adding prop nodes + autoria edges (dep <-> prop)
  async function fetchDeputadoProposicoes(did: string) {
    const res = await $fetch<CamaraItem<CamaraDeputadoDetalhe>>(`${API}/deputados/${did}`)
    const detalhe = res.dados
    addNode(did, {
      type: 'deputado',
      ...detalhe,
      ...detalhe.ultimoStatus,
      nome: detalhe.ultimoStatus.nomeEleitoral ?? detalhe.ultimoStatus.nome
    })

    const props = await $fetch<CamaraLista<CamaraProposicaoItem>>(`${API}/proposicoes`, { query: {
      idDeputadoAutor: did,
      itens: 10,
      ordem: 'desc',
      ordenarPor: 'id'
    } })

    for (const p of props.dados) {
      if (!roomLeft()) break
      const pid = `prop-${p.id}`
      addNode(pid, {
        type: 'proposicao',
        id: p.id,
        siglaTipo: p.siglaTipo,
        numero: p.numero,
        sigla: `${p.siglaTipo} ${p.numero}/${p.ano}`,
        ementa: p.ementa,
        ano: p.ano
      })
      addEdge(did, pid, p)
    }
  }

  return { nodes, edges, limitReached, fetchProposicaoAutores, fetchDeputadoProposicoes }
}
