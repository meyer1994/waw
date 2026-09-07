<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { Historico } from '~~/server/api/deputados/[did]/historico.get'

const route = useRoute()
const did = route.params.did as string

const { data, status } = await useFetch(`/api/deputados/${did}/historico`)

const columns: TableColumn<Historico>[] = [
  { id: 'legislatura', header: 'Legislatura' },
  { accessorKey: 'siglaPartido', header: 'Partido' },
  { accessorKey: 'siglaUf', header: 'UF' },
  { accessorKey: 'situacao', header: 'Situação' },
  { accessorKey: 'condicaoEleitoral', header: 'Condição' },
  { id: 'data', header: 'Data' }
]
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">
      Histórico
    </h2>

    <UTable
      :data="data?.dados ?? []"
      :columns="columns"
      :loading="status === 'pending'"
    >
      <template #legislatura-cell="{ row }">
        <span class="font-medium">{{ row.original.idLegislatura }}</span>
      </template>

      <template #data-cell="{ row }">
        <NuxtTime
          v-if="row.original.dataHora"
          :datetime="row.original.dataHora"
          locale="pt-BR"
          year="numeric"
          month="2-digit"
          day="2-digit"
        />
        <span
          v-else
          class="text-muted"
        >—</span>
      </template>
    </UTable>
  </div>
</template>
