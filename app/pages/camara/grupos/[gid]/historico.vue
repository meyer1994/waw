<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { HistoricoGrupo } from '~~/server/api/grupos/[gid]/historico.get'

const route = useRoute()
const gid = route.params.gid as string

const { data, status } = await useFetch(`/api/grupos/${gid}/historico`)

const columns: TableColumn<HistoricoGrupo>[] = [
  { id: 'data', header: 'Data' },
  { accessorKey: 'presidente', header: 'Presidente' },
  { id: 'oficio', header: 'Ofício' }
]
</script>

<template>
  <div class="mt-6">
    <UTable
      :data="data?.dados ?? []"
      :columns="columns"
      :loading="status === 'pending'"
    >
      <template #data-cell="{ row }">
        <NuxtTime
          v-if="row.original.dataStatus"
          :datetime="row.original.dataStatus.slice(0, 10)"
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

      <template #presidente-cell="{ row }">
        <span class="text-sm">{{ row.original.presidente ?? '—' }}</span>
      </template>

      <template #oficio-cell="{ row }">
        <div>
          <p class="text-sm">
            {{ row.original.oficioTitulo ?? '—' }}
          </p>
          <p class="text-muted text-xs">
            {{ row.original.oficioAutor ?? '—' }}
          </p>
        </div>
      </template>
    </UTable>
  </div>
</template>
