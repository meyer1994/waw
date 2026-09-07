<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { Cargo } from '~~/server/api/senadores/[sid]/cargos.get'

const route = useRoute()
const sid = route.params.sid as string

const { data, status } = await useFetch(`/api/senadores/${sid}/cargos`)

const columns: TableColumn<Cargo>[] = [
  { accessorKey: 'SiglaComissao', header: 'Órgão' },
  { accessorKey: 'NomeComissao', header: 'Nome' },
  { accessorKey: 'DescricaoCargo', header: 'Cargo' },
  { accessorKey: 'DataInicio', header: 'Início' },
  { accessorKey: 'DataFim', header: 'Fim' }
]
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">
      Cargos
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
        <template v-if="row.original.DataFim">
          <NuxtTime
            :datetime="row.original.DataFim"
            locale="pt-BR"
            year="numeric"
            month="2-digit"
            day="2-digit"
          />
        </template>
        <UBadge
          v-else
          color="success"
          variant="subtle"
        >
          Atual
        </UBadge>
      </template>
    </UTable>
  </div>
</template>
