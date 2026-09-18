<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { CamaraLista, Partido } from '#shared/api'

const route = useRoute()
const bid = route.params.bid as string

const { data, status } = await useFetch<CamaraLista<Partido>>(`/api/camara/blocos/${bid}/partidos`)

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
        <NuxtLink :to="`/camara/partidos/${row.original.id}`">
          <span class="text-primary hover:underline font-medium">{{ row.original.sigla }}</span>
        </NuxtLink>
      </template>

      <template #nome-cell="{ row }">
        <NuxtLink
          :to="`/camara/partidos/${row.original.id}`"
          class="text-sm text-primary hover:underline"
        >
          {{ row.original.nome }}
        </NuxtLink>
      </template>
    </UTable>
  </div>
</template>
