<script setup lang="ts">
import { ref, computed, onMounted } from "vue"
import * as vNG from "v-network-graph"
import { ForceLayout, ForceNodeDatum, ForceEdgeDatum } from "v-network-graph/lib/force-layout"
import { VNetworkGraph } from "v-network-graph"
import "v-network-graph/lib/style.css"
import type { CamaraLista, CamaraProposicaoItem } from "#shared/api"
import type { GraphNode } from "~/composables/useCoautoriaNetwork"

const { nodes, edges, limitReached, fetchProposicaoAutores, fetchDeputadoProposicoes } = useCoautoriaNetwork()

const expanded = new Set<string>()
const hoveredNode = ref<string | null>(null)
const hoveredEdge = ref<string | null>(null)

// hover: apenas mostra os dados do nó (debug)
function onNodeHover(id: string) {
  hoveredNode.value = id
}

function onNodeOut() {
  hoveredNode.value = null
}

function onEdgeHover(id: string) {
  hoveredEdge.value = id
}

function onEdgeOut() {
  hoveredEdge.value = null
}

// dblclick: proposições buscam os autores, deputados buscam suas proposições
async function onNodeDblClick(id: string) {
  if (expanded.has(id)) return
  const node = nodes.value[id]
  if (!node) return
  expanded.add(id)

  if (node.type === "proposicao") {
    const { id, siglaTipo, numero, ano, ementa } = node
    await fetchProposicaoAutores({ id, siglaTipo, numero, ano, ementa })
  }
  else {
    await fetchDeputadoProposicoes(id)
  }
}

// seed: proposição aleatória da API. PECs quase sempre têm coautores,
// então sorteamos entre elas; caímos para o pool geral se necessário
async function seed() {
  nodes.value = {}
  edges.value = {}
  expanded.clear()
  hoveredNode.value = null
  hoveredEdge.value = null
  limitReached.value = false

  const res = await $fetch<CamaraLista<CamaraProposicaoItem>>("/api/camara/proposicoes", { query: { siglaTipo: "PEC", itens: 50 } })
  const pool = [...res.dados.filter(p => p.ementa)].sort(() => Math.random() - 0.5)
  for (const p of pool.slice(0, 3)) {
    const linked = await fetchProposicaoAutores(p)
    if (linked >= 2) break
  }
}

onMounted(() => seed())

// ------------------------------------------------------------------
// Per-node colors: deputados by partido, proposições by ano
// ------------------------------------------------------------------
const PARTY_COLORS = ["#0ea5e9", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#14b8a6", "#f97316", "#84cc16", "#6366f1"]

function colorFromString(value: string): string {
  let hash = 0
  for (let i = 0; i < value.length; i++) hash = (hash * 31 + value.charCodeAt(i)) >>> 0
  return PARTY_COLORS[hash % PARTY_COLORS.length]
}

function nodeColor(node: GraphNode): string {
  if (node.type === "deputado") return colorFromString((node.siglaPartido as string) ?? "?")
  return colorFromString(`ano-${node.ano}`)
}

// ------------------------------------------------------------------
// Configs
// ------------------------------------------------------------------
const configs = computed(() => ({
  view: {
    panHandler: null,
    zoomHandler: null,
    layoutHandler: new ForceLayout({
      positionFixedByDrag: false,
      positionFixedByClickWithAltKey: true,
      createSimulation: (d3, nodes, edges) => {
        const forceLink = d3.forceLink<ForceNodeDatum, ForceEdgeDatum>(edges).id(d => d.id)
        return d3
          .forceSimulation(nodes)
          .force("edge", forceLink.distance(120).strength(0.3))
          .force("charge", d3.forceManyBody().strength(-500))
          .force("collide", d3.forceCollide(50).strength(0.2))
          .force("center", d3.forceCenter().strength(0.05))
          .alphaMin(0.001)
      },
    }),
  },
  node: {
    // per-node styling: functions go on each field (official EachObject example)
    normal: {
      type: node => (node.type === "deputado" ? "circle" : "rect"),
      radius: node => (node.type === "deputado" ? 20 : 0),
      width: node => (node.type === "deputado" ? 0 : 30),
      height: node => (node.type === "deputado" ? 0 : 30),
      borderRadius: node => (node.type === "deputado" ? 0 : 4),
      color: node => nodeColor(node),
      strokeWidth: 2,
      strokeColor: "#ffffff",
    },
    hover: {
      color: node => nodeColor(node),
      strokeWidth: 3,
      strokeColor: "#111827",
    },
    label: {
      fontSize: node => (node.type === "deputado" ? 10 : 9),
      color: node => (node.type === "deputado" ? "#1f2937" : "#6d28d9"),
      direction: "south",
    },
  },
  edge: {
    normal: { color: "#94a3b8", width: 2, dasharray: "0" },
    hover: { color: "#334155", width: 3 },
  },
}))

// ------------------------------------------------------------------
// Side panel (debug)
// ------------------------------------------------------------------
const hoveredNodeData = computed(() => {
  if (!hoveredNode.value) return null
  return nodes.value[hoveredNode.value] ?? null
})

const hoveredEdgeData = computed(() => {
  if (!hoveredEdge.value) return null
  const edge = edges.value[hoveredEdge.value]
  if (!edge) return null
  return {
    ...edge,
    sourceNome: nodes.value[edge.source]?.nome ?? edge.source,
    targetNome: nodes.value[edge.target]?.nome ?? edge.target,
  }
})
</script>

<template>
  <div class="p-8 bg-gray-50 min-h-screen font-sans text-gray-900">
    <header class="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Connection Network</h1>
        <p class="text-gray-600">
          Deputados conectados por coautoria. Duplo-clique num deputado para expandir a rede.
        </p>
      </div>
      <button
        class="px-3 py-1.5 rounded-full text-xs font-semibold border border-red-200 text-red-600 bg-white hover:bg-red-50 transition-colors"
        @click="seed()"
      >
        ↺ Reiniciar
      </button>
    </header>

    <div v-if="limitReached" class="mb-4 p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs">
      Limite de nós atingido — a expansão foi interrompida para manter o grafo legível. Reinicie ou feche ramos (breve).
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div class="lg:col-span-3 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <ClientOnly>
          <VNetworkGraph
            class="w-full h-[600px] min-h-[400px]"
            :nodes="nodes"
            :edges="edges"
            :configs="configs"
            :event-handlers="{
              'node:pointerover': event => onNodeHover(event.node),
              'node:pointerout': () => onNodeOut(),
              'node:dblclick': event => onNodeDblClick(event.node),
              'edge:pointerover': event => onEdgeHover(event.edge),
              'edge:pointerout': () => onEdgeOut(),
            }"
          />
        </ClientOnly>
      </div>

      <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-200 min-h-40">
        <h4 class="font-bold mb-3 text-gray-700">Hover (debug)</h4>

        <div v-if="hoveredNodeData">
          <div class="text-xs font-semibold text-gray-500 mb-2 uppercase">Nó</div>
          <pre class="text-xs bg-gray-50 rounded-lg p-3 overflow-auto max-h-64">{{ JSON.stringify(hoveredNodeData, null, 2) }}</pre>
        </div>

        <div v-else-if="hoveredEdgeData">
          <div class="text-xs font-semibold text-gray-500 mb-2 uppercase">Ligação (coautoria)</div>
          <pre class="text-xs bg-gray-50 rounded-lg p-3 overflow-auto max-h-64">{{ JSON.stringify(hoveredEdgeData, null, 2) }}</pre>
        </div>

        <p v-else class="text-xs text-gray-400">
          Passe o mouse sobre um nó ou ligação para ver os dados.
        </p>
      </div>
    </div>
  </div>
</template>
