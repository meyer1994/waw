<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { Partido } from '~~/server/api/partidos/index.get'

const { data, status } = await useFetch('/api/partidos')

const columns: TableColumn<Partido>[] = [
  { accessorKey: 'sigla', header: 'Sigla' },
  { accessorKey: 'nome', header: 'Nome' }
]

useHead(() => ({ title: 'Partidos' }))
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">
      Partidos
    </h1>

    <UTable
      :data="data?.dados ?? []"
      :columns="columns"
      :loading="status === 'pending'"
    >
      <template #sigla-cell="{ row }">
        <NuxtLink :to="`/camara/partidos/${row.original.id}`">
          <span class="text-primary hover:underline font-medium">{{ row.original.sigla }}</span>
        </NuxtLink>
      </template>

      <template #nome-cell="{ row }">
        <span class="text-sm">{{ row.original.nome }}</span>
      </template>
    </UTable>
  </div>
</template>
