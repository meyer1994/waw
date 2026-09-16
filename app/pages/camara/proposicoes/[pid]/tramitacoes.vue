<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { CamaraLista, Tramitacao } from '#shared/api'

const route = useRoute()
const pid = route.params.pid as string

const { data, status } = await useFetch<CamaraLista<Tramitacao>>(`/api/camara/proposicoes/${pid}/tramitacoes`)

const columns: TableColumn<Tramitacao>[] = [
  { id: 'data', header: 'Data' },
  { accessorKey: 'siglaOrgao', header: 'Órgão' },
  { accessorKey: 'descricaoTramitacao', header: 'Tramitação' },
  { id: 'despacho', header: 'Despacho' }
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
          v-if="row.original.dataHora"
          :datetime="row.original.dataHora"
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

      <template #siglaOrgao-cell="{ row }">
        <span class="font-medium">{{ row.original.siglaOrgao ?? '—' }}</span>
      </template>

      <template #descricaoTramitacao-cell="{ row }">
        <span class="text-sm">{{ row.original.descricaoTramitacao ?? '—' }}</span>
        <p
          v-if="row.original.descricaoSituacao"
          class="text-muted text-xs"
        >
          {{ row.original.descricaoSituacao }}
        </p>
      </template>

      <template #despacho-cell="{ row }">
        <span class="text-muted text-sm line-clamp-2">{{ row.original.despacho ?? '—' }}</span>
      </template>
    </UTable>
  </div>
</template>
