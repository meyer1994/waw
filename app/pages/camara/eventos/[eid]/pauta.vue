<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { CamaraLista, Pauta } from '#shared/api'

const route = useRoute()
const eid = route.params.eid as string

const { data, status } = await useFetch<CamaraLista<Pauta>>(`/api/camara/eventos/${eid}/pauta`)

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
            {{ row.original.regime ?? '—' }}
            <template v-if="row.original.relator">
              <span> • Relator: </span>
              <NuxtLink
                v-if="row.original.relator.id"
                :to="`/camara/deputados/${row.original.relator.id}`"
                class="text-primary hover:underline"
              >
                {{ row.original.relator.nome }}
              </NuxtLink>
              <span v-else>{{ row.original.relator.nome }}</span>
            </template>
          </p>
        </div>
      </template>

      <template #situacaoItem-cell="{ row }">
        <span class="text-sm">{{ row.original.situacaoItem ?? '—' }}</span>
      </template>
    </UTable>
  </div>
</template>
