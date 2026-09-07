<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { Evento } from '~~/server/api/deputados/[did]/eventos.get'

const route = useRoute()
const did = route.params.did as string

const { data, status } = await useFetch(`/api/deputados/${did}/eventos`)

const columns: TableColumn<Evento>[] = [
  { id: 'data', header: 'Data' },
  { id: 'evento', header: 'Evento' },
  { id: 'local', header: 'Local' },
  { id: 'situacao', header: 'Situação' }
]

useHead(() => ({ title: 'Eventos' }))
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">
      Eventos
    </h2>

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
        <div>
          <p class="font-medium">
            {{ row.original.descricaoTipo }}
          </p>
          <p class="text-muted text-sm line-clamp-2">
            {{ row.original.descricao }}
          </p>
        </div>
      </template>

      <template #local-cell="{ row }">
        <span class="text-sm">
          {{ row.original.localCamara?.nome ?? row.original.localExterno ?? '—' }}
        </span>
      </template>

      <template #situacao-cell="{ row }">
        <UBadge
          :color="row.original.situacao === 'Encerrada' ? 'neutral' : 'primary'"
          variant="soft"
          size="sm"
        >
          {{ row.original.situacao ?? '—' }}
        </UBadge>
      </template>
    </UTable>
  </div>
</template>
