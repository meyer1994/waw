<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { Frente } from '~~/server/api/deputados/[did]/frentes.get'

const route = useRoute()
const did = route.params.did as string

const { data, status } = await useFetch(`/api/deputados/${did}/frentes`)

const columns: TableColumn<Frente>[] = [
  { accessorKey: 'titulo', header: 'Frente' },
  { accessorKey: 'idLegislatura', header: 'Legislatura' }
]
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">
      Frentes
    </h2>

    <UTable
      :data="data?.dados ?? []"
      :columns="columns"
      :loading="status === 'pending'"
    >
      <template #titulo-cell="{ row }">
        <span class="text-sm">{{ row.original.titulo }}</span>
      </template>

      <template #idLegislatura-cell="{ row }">
        <span class="font-medium">{{ row.original.idLegislatura }}</span>
      </template>
    </UTable>
  </div>
</template>
