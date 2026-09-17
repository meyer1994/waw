<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'

const route = useRoute()
const sid = route.params.sid as string

const somenteAtivos = ref(false)

const { data, status } = await useFetch(`/api/senadores/${sid}/cargos`, {
  query: computed(() => ({ ativo: somenteAtivos.value || undefined }))
})

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

    <div class="flex items-center gap-2 mb-4">
      <USwitch v-model="somenteAtivos" />
      <span class="text-sm text-muted">Somente em exercício</span>
    </div>

    <UTable
      :data="data?.dados ?? []"
      :columns="columns"
      :loading="status === 'pending'"
    >
      <template #DataInicio-cell="{ row }">
        <NuxtTime
          v-if="row.original.DataInicio"
          :datetime="row.original.DataInicio"
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
