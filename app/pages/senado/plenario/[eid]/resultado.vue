<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { asArray } from '~~/shared/senado'
import type { ResultadoEncontroDoc } from '#shared/api-senado'

const route = useRoute()
const eid = route.params.eid as string

const { data, status } = await useFetch<ResultadoEncontroDoc>(`/api/senado/plenario/encontro/${eid}/resultado.json`)
const itens = computed(() =>
  asArray(asArray(data.value?.ServicoPlenario?.encontros?.encontro)[0]?.itensPauta?.itemPauta)
)

interface LinhaResultado {
  identificacao: string
  apreciacao?: string
  titulo: string
  decisao: string
  sim: number
  nao: number
  abstencao: number
  quorum: number
}

const linhas = computed<LinhaResultado[]>(() => {
  const out: LinhaResultado[] = []
  for (const item of itens.value) {
    const votos = asArray(item.itensResultado?.itemResultado)
    const base = {
      identificacao: item.txtIdentificacao?.trim() || 'Item',
      apreciacao: item.txtApreciacao
    }
    if (!votos.length) {
      out.push({
        ...base,
        titulo: '—',
        decisao: 'Sem resultado registrado',
        sim: 0,
        nao: 0,
        abstencao: 0,
        quorum: 0
      })
    }
    for (const v of votos) {
      out.push({
        ...base,
        titulo: v.txtTituloResultado ?? v.desItemResultado ?? 'Votação',
        decisao: v.txtDecisao ?? v.txtResultado ?? '—',
        sim: Number(v.qtdSim ?? 0),
        nao: Number(v.qtdNao ?? 0),
        abstencao: Number(v.qtdAbstencao ?? 0),
        quorum: Number(v.qtdQuorum ?? 0)
      })
    }
  }
  return out
})

const columns: TableColumn<LinhaResultado>[] = [
  { accessorKey: 'identificacao', header: 'Item' },
  { accessorKey: 'titulo', header: 'Votação' },
  { accessorKey: 'sim', header: 'Sim' },
  { accessorKey: 'nao', header: 'Não' },
  { accessorKey: 'abstencao', header: 'Abstenções' },
  { accessorKey: 'decisao', header: 'Decisão' }
]
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">
      Resultado
    </h2>

    <UTable
      :data="linhas"
      :columns="columns"
      :loading="status === 'pending'"
    >
      <template #sim-cell="{ row }">
        <UBadge
          color="success"
          variant="subtle"
        >
          {{ row.original.sim }}
        </UBadge>
      </template>

      <template #nao-cell="{ row }">
        <UBadge
          color="error"
          variant="subtle"
        >
          {{ row.original.nao }}
        </UBadge>
      </template>

      <template #abstencao-cell="{ row }">
        <UBadge
          color="neutral"
          variant="subtle"
        >
          {{ row.original.abstencao }}
        </UBadge>
      </template>

      <template #decisao-cell="{ row }">
        <span
          class="text-muted text-sm line-clamp-2"
          :title="row.original.decisao"
        >{{ row.original.decisao }}</span>
      </template>
    </UTable>
  </div>
</template>
