<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { Legislatura } from '~~/server/api/legislaturas/index.get'

const { data, status } = await useFetch('/api/legislaturas')

const columns: TableColumn<Legislatura>[] = [
  { accessorKey: 'id', header: 'Legislatura' },
  { id: 'periodo', header: 'Período' }
]

useHead(() => ({ title: 'Legislaturas' }))
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">
      Legislaturas
    </h1>

    <UTable
      :data="data?.dados ?? []"
      :columns="columns"
      :loading="status === 'pending'"
    >
      <template #id-cell="{ row }">
        <NuxtLink :to="`/camara/legislaturas/${row.original.id}`">
          <span class="text-primary hover:underline font-medium">{{ row.original.id }}ª</span>
        </NuxtLink>
      </template>

      <template #periodo-cell="{ row }">
        <span class="text-muted text-sm">
          <NuxtTime
            v-if="row.original.dataInicio"
            :datetime="row.original.dataInicio"
            locale="pt-BR"
            year="numeric"
            month="2-digit"
            day="2-digit"
          />
          –
          <NuxtTime
            v-if="row.original.dataFim"
            :datetime="row.original.dataFim"
            locale="pt-BR"
            year="numeric"
            month="2-digit"
            day="2-digit"
          />
          <span v-else>atual</span>
        </span>
      </template>
    </UTable>
  </div>
</template>
