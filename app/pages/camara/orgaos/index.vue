<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { Orgao } from '~~/server/api/orgaos/index.get'

const { data, status } = await useFetch('/api/orgaos')

const columns: TableColumn<Orgao>[] = [
  { accessorKey: 'sigla', header: 'Sigla' },
  { accessorKey: 'nome', header: 'Nome' },
  { accessorKey: 'tipoOrgao', header: 'Tipo' }
]

useHead(() => ({ title: 'Órgãos' }))
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">
      Órgãos
    </h1>

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

      <template #nome-cell="{ row }">
        <span class="text-sm">{{ row.original.nome }}</span>
      </template>

      <template #tipoOrgao-cell="{ row }">
        <span class="text-muted text-sm">{{ row.original.tipoOrgao ?? '—' }}</span>
      </template>
    </UTable>
  </div>
</template>
