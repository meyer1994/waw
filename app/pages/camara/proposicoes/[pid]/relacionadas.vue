<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { CamaraLista, ProposicaoRelacionada } from '#shared/api'

const route = useRoute()
const pid = route.params.pid as string

const { data, status } = await useFetch<CamaraLista<ProposicaoRelacionada>>(`/api/camara/proposicoes/${pid}/relacionadas`)

const columns: TableColumn<ProposicaoRelacionada>[] = [
  { id: 'proposicao', header: 'Proposição' },
  { id: 'data', header: 'Apresentação' },
  { id: 'ementa', header: 'Ementa' }
]
</script>

<template>
  <div class="mt-6">
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
