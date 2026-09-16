<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { CamaraLista, Discurso } from '#shared/api'

const route = useRoute()
const did = route.params.did as string

const { data, status } = await useFetch<CamaraLista<Discurso>>(`/api/camara/deputados/${did}/discursos`)

const columns: TableColumn<Discurso>[] = [
  { id: 'data', header: 'Data' },
  { accessorKey: 'tipoDiscurso', header: 'Tipo' },
  { id: 'fase', header: 'Fase' },
  { id: 'sumario', header: 'Sumário' },
  { id: 'midia', header: '' }
]
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">
      Discursos
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

      <template #tipoDiscurso-cell="{ row }">
        <span class="text-sm">{{ row.original.tipoDiscurso ?? 'Discurso' }}</span>
      </template>

      <template #fase-cell="{ row }">
        <span class="text-muted text-sm">{{ row.original.faseEvento?.titulo ?? '—' }}</span>
      </template>

      <template #sumario-cell="{ row }">
        <span class="text-sm line-clamp-2">{{ row.original.sumario ?? row.original.keywords }}</span>
      </template>

      <template #midia-cell="{ row }">
        <div class="flex gap-1">
          <UButton
            v-if="row.original.urlVideo"
            :to="row.original.urlVideo"
            target="_blank"
            icon="i-lucide-video"
            color="neutral"
            variant="ghost"
            size="xs"
            aria-label="Ver vídeo"
          />
          <UButton
            v-if="row.original.urlAudio"
            :to="row.original.urlAudio"
            target="_blank"
            icon="i-lucide-audio-lines"
            color="neutral"
            variant="ghost"
            size="xs"
            aria-label="Ouvir áudio"
          />
          <UButton
            v-if="row.original.urlTexto"
            :to="row.original.urlTexto"
            target="_blank"
            icon="i-lucide-file-text"
            color="neutral"
            variant="ghost"
            size="xs"
            aria-label="Ler texto"
          />
        </div>
      </template>
    </UTable>
  </div>
</template>
