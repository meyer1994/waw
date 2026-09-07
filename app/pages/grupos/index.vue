<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { Grupo } from '~~/server/api/grupos/index.get'

const { data, status } = await useFetch('/api/grupos')

const columns: TableColumn<Grupo>[] = [
  { accessorKey: 'nome', header: 'Grupo' },
  { accessorKey: 'anoCriacao', header: 'Ano' },
  { id: 'status', header: 'Status' }
]

useHead(() => ({ title: 'Grupos' }))
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">
      Grupos de Trabalho
    </h1>

    <UTable
      :data="data?.dados ?? []"
      :columns="columns"
      :loading="status === 'pending'"
    >
      <template #nome-cell="{ row }">
        <NuxtLink :to="`/grupos/${row.original.id}`">
          <span class="text-primary hover:underline font-medium">{{ row.original.nome }}</span>
        </NuxtLink>
      </template>

      <template #anoCriacao-cell="{ row }">
        <span class="text-muted">{{ row.original.anoCriacao ?? '—' }}</span>
      </template>

      <template #status-cell="{ row }">
        <UBadge
          :color="row.original.ativo === 'S' ? 'success' : 'neutral'"
          variant="soft"
          size="sm"
        >
          {{ row.original.ativo === 'S' ? 'Ativo' : 'Inativo' }}
        </UBadge>
      </template>
    </UTable>
  </div>
</template>
