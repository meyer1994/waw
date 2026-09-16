<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { Bloco, CamaraLista } from '#shared/api'

const { data, status } = await useFetch<CamaraLista<Bloco>>('/api/camara/blocos')

const columns: TableColumn<Bloco>[] = [
  { accessorKey: 'nome', header: 'Bloco' },
  { accessorKey: 'idLegislatura', header: 'Legislatura' }
]

useHead(() => ({ title: 'Blocos' }))
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">
      Blocos Parlamentares
    </h1>

    <UTable
      :data="data?.dados ?? []"
      :columns="columns"
      :loading="status === 'pending'"
    >
      <template #nome-cell="{ row }">
        <NuxtLink :to="`/camara/blocos/${row.original.id}`">
          <span class="text-primary hover:underline font-medium">{{ row.original.nome }}</span>
        </NuxtLink>
      </template>

      <template #idLegislatura-cell="{ row }">
        <span class="text-muted">{{ row.original.idLegislatura ?? '—' }}</span>
      </template>
    </UTable>
  </div>
</template>
