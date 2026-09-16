<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { CamaraLista, Orgao } from '#shared/api'

const route = useRoute()
const eid = route.params.eid as string

const { data, status } = await useFetch<CamaraLista<Orgao>>(`/api/camara/eventos/${eid}/orgaos`)

const columns: TableColumn<Orgao>[] = [
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
        <NuxtLink :to="`/camara/orgaos/${row.original.id}`">
          <span class="text-primary hover:underline font-medium">{{ row.original.sigla }}</span>
        </NuxtLink>
      </template>
    </UTable>
  </div>
</template>
