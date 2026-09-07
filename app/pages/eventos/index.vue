<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { Evento } from '~~/server/api/eventos/index.get'

const { data, status } = await useFetch('/api/eventos')

const columns: TableColumn<Evento>[] = [
  { id: 'data', header: 'Data' },
  { id: 'evento', header: 'Evento' },
  { accessorKey: 'situacao', header: 'Situação' }
]

useHead(() => ({ title: 'Eventos' }))
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">
      Eventos
    </h1>

    <UTable
      :data="data?.dados ?? []"
      :columns="columns"
      :loading="status === 'pending'"
    >
      <template #data-cell="{ row }">
        <NuxtTime
          v-if="row.original.dataHoraInicio"
          :datetime="row.original.dataHoraInicio"
          locale="pt-BR"
          year="numeric"
          month="2-digit"
          day="2-digit"
          hour="2-digit"
          minute="2-digit"
        />
        <span
          v-else
          class="text-muted"
        >—</span>
      </template>

      <template #evento-cell="{ row }">
        <NuxtLink :to="`/eventos/${row.original.id}`">
          <p class="text-primary hover:underline font-medium">
            {{ row.original.descricaoTipo }}
          </p>
        </NuxtLink>
        <p class="text-muted text-sm line-clamp-2">
          {{ row.original.descricao }}
        </p>
      </template>

      <template #situacao-cell="{ row }">
        <span class="text-sm">{{ row.original.situacao ?? '—' }}</span>
      </template>
    </UTable>
  </div>
</template>
