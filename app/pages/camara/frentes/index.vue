<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { CamaraLista, Frente } from '#shared/api'

const { data, status } = await useFetch<CamaraLista<Frente>>('/api/camara/frentes')

const columns: TableColumn<Frente>[] = [
  { accessorKey: 'titulo', header: 'Frente' },
  { accessorKey: 'idLegislatura', header: 'Legislatura' }
]

useHead(() => ({ title: 'Frentes' }))
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">
      Frentes Parlamentares
    </h1>

    <UTable
      :data="data?.dados ?? []"
      :columns="columns"
      :loading="status === 'pending'"
    >
      <template #titulo-cell="{ row }">
        <NuxtLink :to="`/camara/frentes/${row.original.id}`">
          <span class="text-primary hover:underline font-medium">{{ row.original.titulo }}</span>
        </NuxtLink>
      </template>

      <template #idLegislatura-cell="{ row }">
        <span class="text-muted">{{ row.original.idLegislatura }}</span>
      </template>
    </UTable>
  </div>
</template>
