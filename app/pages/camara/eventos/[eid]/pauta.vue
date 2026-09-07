<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { Pauta } from '~~/server/api/eventos/[eid]/pauta.get'

const route = useRoute()
const eid = route.params.eid as string

const { data, status } = await useFetch(`/api/eventos/${eid}/pauta`)

const columns: TableColumn<Pauta>[] = [
  { accessorKey: 'ordem', header: '#' },
  { id: 'item', header: 'Item' },
  { accessorKey: 'situacaoItem', header: 'Situação' }
]
</script>

<template>
  <div class="mt-6">
    <UTable
      :data="data?.dados ?? []"
      :columns="columns"
      :loading="status === 'pending'"
    >
      <template #ordem-cell="{ row }">
        <span class="text-muted">{{ row.original.ordem ?? '—' }}</span>
      </template>

      <template #item-cell="{ row }">
        <div>
          <NuxtLink
            v-if="row.original.proposicao_"
            :to="`/camara/proposicoes/${row.original.proposicao_.id}`"
          >
            <span class="text-primary hover:underline font-medium">
              {{ row.original.proposicao_.siglaTipo }} {{ row.original.proposicao_.numero }}/{{ row.original.proposicao_.ano }}
            </span>
          </NuxtLink>
          <p class="text-sm">
            {{ row.original.titulo ?? '—' }}
          </p>
          <p class="text-muted text-xs">
            {{ row.original.regime ?? '—' }}{{ row.original.relator ? ` • Relator: ${row.original.relator.nome}` : '' }}
          </p>
        </div>
      </template>

      <template #situacaoItem-cell="{ row }">
        <span class="text-sm">{{ row.original.situacaoItem ?? '—' }}</span>
      </template>
    </UTable>
  </div>
</template>
