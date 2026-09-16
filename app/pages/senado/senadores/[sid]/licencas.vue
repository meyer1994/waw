<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'

const route = useRoute()
const sid = route.params.sid as string

const { data, status } = await useFetch(`/api/senadores/${sid}/licencas`)

const columns: TableColumn<Licenca>[] = [
  { accessorKey: 'DataInicio', header: 'Início' },
  { accessorKey: 'DataFim', header: 'Fim' },
  { accessorKey: 'DescricaoTipoAfastamento', header: 'Tipo' }
]
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">
      Licenças
    </h2>

    <UTable
      :data="data?.dados ?? []"
      :columns="columns"
      :loading="status === 'pending'"
    >
      <template #DataInicio-cell="{ row }">
        <NuxtTime
          v-if="row.original.DataInicio"
          :datetime="row.original.DataInicio"
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

      <template #DataFim-cell="{ row }">
        <NuxtTime
          v-if="row.original.DataFim"
          :datetime="row.original.DataFim"
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
