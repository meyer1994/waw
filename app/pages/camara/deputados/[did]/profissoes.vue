<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { Profissao } from '~~/server/api/deputados/[did]/profissoes.get'

const route = useRoute()
const did = route.params.did as string

const { data, status } = await useFetch(`/api/deputados/${did}/profissoes`)

const columns: TableColumn<Profissao>[] = [
  { accessorKey: 'titulo', header: 'Profissão' },
  { id: 'data', header: 'Declarada em' }
]
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">
      Profissões
    </h2>

    <UTable
      :data="data?.dados ?? []"
      :columns="columns"
      :loading="status === 'pending'"
    >
      <template #titulo-cell="{ row }">
        <span class="text-sm">{{ row.original.titulo }}</span>
      </template>

      <template #data-cell="{ row }">
        <NuxtTime
          v-if="row.original.dataHora"
          :datetime="row.original.dataHora"
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
    </UTable>
  </div>
</template>
