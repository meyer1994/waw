export interface DeputadoNode extends Record<string, unknown> { nome: string }
export type GraphNodes = Record<string, DeputadoNode>
export type GraphEdges = Record<string, { source: string, target: string }>

interface Autoria { id: number, siglaTipo: string, numero: number, ano: number }
interface Autor { nome: string, uri: string }

export function useCoautoriaNetwork() {
  const nodes = ref<GraphNodes>({})
  const edges = ref<GraphEdges>({})

  // add a node if missing, or enrich when the existing node only has sparse data
  // `name` feeds the default label of v-network-graph
  function addNode(id: string, node: DeputadoNode) {
    const existing = nodes.value[id]
    if (existing && "siglaPartido" in existing) return
    nodes.value = { ...nodes.value, [id]: { name: node.nome, ...node } }
  }

  // dedupe undirected edges by sorted key
  function addEdge(source: string, target: string) {
    const key = [source, target].sort().join("~")
    if (edges.value[`e-${key}`]) return
    edges.value = { ...edges.value, [`e-${key}`]: { source, target } }
  }

  // fetches a deputado's proposições, then the autores of each one,
  // adding deputado-deputado (coautoria) edges
  async function fetchDeputadoProposicoes(did: string) {
    const res = await $fetch<{
      deputado: { nomeEleitoral: string, nome: string, siglaPartido: string, siglaUf: string }
      proposicoes: { dados: Autoria[] }
    }>(`/api/deputados/${did}`)

    addNode(`dep-${did}`, { ...res.deputado, nome: res.deputado.nomeEleitoral ?? res.deputado.nome })

    await Promise.all(res.proposicoes.dados.map(async (p) => {
      const autores = await $fetch<{ dados: Autor[] }>(`/api/proposicoes/${p.id}/autores`)
      for (const autor of autores.dados) {
        const match = autor.uri.match(/deputados\/(\d+)$/)
        if (!match) continue
        addNode(`dep-${match[1]}`, { nome: autor.nome, uri: autor.uri })
        addEdge(`dep-${did}`, `dep-${match[1]}`)
      }
    }))
  }

  return { nodes, edges, fetchDeputadoProposicoes }
}
