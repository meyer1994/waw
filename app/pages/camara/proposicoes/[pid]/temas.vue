<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { CamaraLista, Tema } from '#shared/api'

const route = useRoute()
const pid = route.params.pid as string

const { data, status } = await useFetch<CamaraLista<Tema>>(`/api/camara/proposicoes/${pid}/temas`)

const columns: TableColumn<Tema>[] = [
  { accessorKey: 'tema', header: 'Tema' },
  { id: 'relevancia', header: 'Relevância' }
]
</script>

<template>
  <div class="mt-6">
    <UTable
      :data="data?.dados ?? []"
      :columns="columns"
      :loading="status === 'pending'"
    >
      <template #tema-cell="{ row }">
        <span class="text-sm font-medium">{{ row.original.tema }}</span>
      </template>

      <template #relevancia-cell="{ row }">
        <UBadge
          v-if="row.original.relevancia"
          :color="row.original.relevancia >= 80 ? 'primary' : 'neutral'"
          variant="soft"
          size="sm"
        >
          {{ row.original.relevancia }}
        </UBadge>
        <span
          v-else
          class="text-muted"
        >—</span>
      </template>
    </UTable>
  </div>
</template>
