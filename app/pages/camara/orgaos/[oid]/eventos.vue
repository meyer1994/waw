<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { CamaraLista, Evento } from '#shared/api'

const route = useRoute()
const oid = route.params.oid as string

const { data, status } = await useFetch<CamaraLista<Evento>>(`/api/camara/orgaos/${oid}/eventos`)

const columns: TableColumn<Evento>[] = [
  { id: 'data', header: 'Data' },
  { id: 'evento', header: 'Evento' },
  { accessorKey: 'situacao', header: 'Situação' }
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
          v-if="row.original.dataHoraInicio"
          :datetime="row.original.dataHoraInicio"
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
        <div>
          <p class="font-medium">
            {{ row.original.descricaoTipo }}
          </p>
          <p class="text-muted text-sm line-clamp-2">
            {{ row.original.descricao }}
          </p>
        </div>
      </template>

      <template #situacao-cell="{ row }">
        <span class="text-sm">{{ row.original.situacao ?? '—' }}</span>
      </template>
    </UTable>
  </div>
</template>
