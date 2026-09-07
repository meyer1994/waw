<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { Evento } from '~~/server/api/deputados/[did]/eventos.get'

const route = useRoute()
const did = route.params.did as string

const state = reactive({
  pagina: 1,
  itens: 15,
  ordem: 'desc' as const,
  ordenarPor: 'dataHoraInicio' as const
})

const { data, status } = await useFetch(`/api/deputados/${did}/eventos`, { query: state })

const hasNextPage = computed(() => data.value?.links.some(link => link.rel === 'next') ?? false)
const hasPreviousPage = computed(() => data.value?.links.some(link => link.rel === 'previous') ?? false)

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
    <h1 class="text-2xl font-bold mb-4">
      Eventos
    </h1>

    <DeputadoNav :did="did" />

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

    <div class="flex justify-end gap-3 mt-4">
      <UButton
        icon="i-lucide-chevron-left"
        color="neutral"
        variant="outline"
        :disabled="!hasPreviousPage"
        @click="state.pagina--"
      >
        Anterior
      </UButton>
      <UButton
        trailing-icon="i-lucide-chevron-right"
        color="neutral"
        variant="outline"
        :disabled="!hasNextPage"
        @click="state.pagina++"
      >
        Próxima
      </UButton>
    </div>
  </div>
</template>
