<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { CamaraLista, Ocupacao } from '#shared/api'

const route = useRoute()
const did = route.params.did as string

const { data, status } = await useFetch<CamaraLista<Ocupacao>>(`/api/camara/deputados/${did}/ocupacoes`)

const columns: TableColumn<Ocupacao>[] = [
  { accessorKey: 'titulo', header: 'Ocupação' },
  { accessorKey: 'entidade', header: 'Entidade' },
  { id: 'local', header: 'Local' },
  { id: 'periodo', header: 'Período' }
]
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">
      Ocupações
    </h2>

    <UTable
      :data="data?.dados ?? []"
      :columns="columns"
      :loading="status === 'pending'"
    >
      <template #local-cell="{ row }">
        <span class="text-sm text-muted">
          {{ [row.original.entidadeUF, row.original.entidadePais].filter(Boolean).join(' • ') || '—' }}
        </span>
      </template>

      <template #periodo-cell="{ row }">
        <span class="text-sm text-muted">
          {{ row.original.anoInicio ?? '—' }} – {{ row.original.anoFim ?? 'atual' }}
        </span>
      </template>
    </UTable>
  </div>
</template>
