<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { CamaraItem, CamaraLista, Referencia } from '#shared/api'

const props = defineProps<{
  title: string
  description?: string
  endpoints: { label: string, path: string }[]
}>()

// Payloads variam entre lista (CamaraLista<Referencia>) e objeto com arrays
// por categoria (CamaraItem<Record<string, Referencia[]>>), dependendo do endpoint.
type ReferenciaDados = CamaraLista<Referencia> | CamaraItem<Record<string, Referencia[]>>

const fetched = await Promise.all(props.endpoints.map(async (endpoint) => {
  const { data, status } = await useFetch<ReferenciaDados>(`/api/camara${endpoint.path}`)
  return { label: endpoint.label, data, status }
}))

const loading = computed(() => fetched.some(f => f.status.value === 'pending'))

const rows = computed(() => {
  const out: { grupo: string, cod?: string, sigla?: string, nome?: string, descricao?: string }[] = []

  fetched.forEach(({ label, data }) => {
    const dados = data.value?.dados
    if (Array.isArray(dados)) {
      dados.forEach(item => out.push({ grupo: label, ...item }))
      return
    }
    Object.entries(dados ?? {}).forEach(([key, items]) => {
      items.forEach(item => out.push({ grupo: `${label} · ${key}`, ...item }))
    })
  })

  return out
})

const columns: TableColumn<{ grupo: string, cod?: string, sigla?: string, nome?: string, descricao?: string }>[] = [
  { accessorKey: 'grupo', header: 'Grupo' },
  { accessorKey: 'cod', header: 'Código' },
  { accessorKey: 'sigla', header: 'Sigla' },
  { accessorKey: 'nome', header: 'Nome' },
  { accessorKey: 'descricao', header: 'Descrição' }
]
</script>

<template>
  <UCard>
    <template #header>
      <p class="font-semibold">
        {{ title }}
      </p>
      <p
        v-if="description"
        class="text-sm text-muted"
      >
        {{ description }}
      </p>
    </template>

    <UTable
      :data="rows"
      :columns="columns"
      :loading="loading"
    >
      <template #cod-cell="{ row }">
        <span class="font-mono text-sm">{{ row.original.cod ?? '—' }}</span>
      </template>
      <template #sigla-cell="{ row }">
        <span class="font-mono text-sm">{{ row.original.sigla ?? '—' }}</span>
      </template>
      <template #nome-cell="{ row }">
        <span class="font-medium">{{ row.original.nome ?? '—' }}</span>
      </template>
      <template #descricao-cell="{ row }">
        <span class="text-muted text-sm">{{ row.original.descricao ?? '—' }}</span>
      </template>
    </UTable>
  </UCard>
</template>
