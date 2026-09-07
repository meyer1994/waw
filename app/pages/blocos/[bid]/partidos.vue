<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { Partido } from '~~/server/api/partidos/index.get'

const route = useRoute()
const bid = route.params.bid as string

const { data, status } = await useFetch(`/api/blocos/${bid}/partidos`)

const columns: TableColumn<Partido>[] = [
  { accessorKey: 'sigla', header: 'Sigla' },
  { accessorKey: 'nome', header: 'Nome' }
]
</script>

<template>
  <div class="mt-6">
    <UTable
      :data="data?.dados ?? []"
      :columns="columns"
      :loading="status === 'pending'"
    >
      <template #sigla-cell="{ row }">
        <NuxtLink :to="`/partidos/${row.original.id}`">
          <span class="text-primary hover:underline font-medium">{{ row.original.sigla }}</span>
        </NuxtLink>
      </template>

      <template #nome-cell="{ row }">
        <span class="text-sm">{{ row.original.nome }}</span>
      </template>
    </UTable>
  </div>
</template>
