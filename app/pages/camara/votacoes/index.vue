<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { Votacao } from '~~/server/api/votacoes/index.get'

const { data, status } = await useFetch('/api/votacoes')

const columns: TableColumn<Votacao>[] = [
  { id: 'data', header: 'Data' },
  { accessorKey: 'siglaOrgao', header: 'Órgão' },
  { id: 'descricao', header: 'Descrição' },
  { id: 'resultado', header: 'Resultado' }
]

useHead(() => ({ title: 'Votações' }))
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">
      Votações
    </h1>

    <UTable
      :data="data?.dados ?? []"
      :columns="columns"
      :loading="status === 'pending'"
    >
      <template #data-cell="{ row }">
        <NuxtLink :to="`/camara/votacoes/${row.original.id}`">
          <NuxtTime
            v-if="row.original.data"
            :datetime="row.original.data.slice(0, 10)"
            locale="pt-BR"
            year="numeric"
            month="2-digit"
            day="2-digit"
          />
        </NuxtLink>
      </template>

      <template #siglaOrgao-cell="{ row }">
        <span class="font-medium">{{ row.original.siglaOrgao ?? '—' }}</span>
      </template>

      <template #descricao-cell="{ row }">
        <span class="text-muted text-sm line-clamp-2">{{ row.original.descricao }}</span>
      </template>

      <template #resultado-cell="{ row }">
        <UBadge
          v-if="row.original.aprovacao !== null"
          :color="row.original.aprovacao === 1 ? 'success' : 'error'"
          variant="soft"
          size="sm"
        >
          {{ row.original.aprovacao === 1 ? 'Aprovada' : 'Rejeitada' }}
        </UBadge>
        <span
          v-else
          class="text-muted text-sm"
        >—</span>
      </template>
    </UTable>
  </div>
</template>
