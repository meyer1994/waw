<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { Proposicao } from '~~/server/api/proposicoes/index.get'

const { data, status } = await useFetch('/api/proposicoes')

const columns: TableColumn<Proposicao>[] = [
  { id: 'proposicao', header: 'Proposição' },
  { id: 'data', header: 'Apresentação' },
  { id: 'ementa', header: 'Ementa' }
]

useHead(() => ({ title: 'Proposições' }))
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">
      Proposições
    </h1>

    <UTable
      :data="data?.dados ?? []"
      :columns="columns"
      :loading="status === 'pending'"
    >
      <template #proposicao-cell="{ row }">
        <NuxtLink :to="`/camara/proposicoes/${row.original.id}`">
          <span class="text-primary hover:underline font-medium">
            {{ row.original.siglaTipo }} {{ row.original.numero }}/{{ row.original.ano }}
          </span>
        </NuxtLink>
      </template>

      <template #data-cell="{ row }">
        <NuxtTime
          v-if="row.original.dataApresentacao"
          :datetime="row.original.dataApresentacao.slice(0, 10)"
          locale="pt-BR"
          year="numeric"
          month="2-digit"
          day="2-digit"
        />
        <span
          v-else
          class="text-muted"
        >—</span>
      </template>

      <template #ementa-cell="{ row }">
        <span class="text-muted text-sm line-clamp-2">{{ row.original.ementa }}</span>
      </template>
    </UTable>
  </div>
</template>
