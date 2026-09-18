<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { asArray } from '~~/shared/senado'
import type { Licenca, LicencaDoc } from '#shared/api-senado'

const route = useRoute()
const sid = route.params.sid as string

const { data, status } = await useFetch<LicencaDoc>(`/api/senado/senador/${sid}/licencas.json`)
const licencas = computed(() => asArray(data.value?.LicencaParlamentar?.Parlamentar?.Licencas?.Licenca))

const columns: TableColumn<Licenca>[] = [
  { accessorKey: 'DescricaoTipoAfastamento', header: 'Tipo de afastamento' },
  { accessorKey: 'DataInicio', header: 'Início' },
  { accessorKey: 'DataFim', header: 'Fim' }
]
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">
      Licenças
    </h2>

    <UTable
      :data="licencas"
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
          color="warning"
          variant="subtle"
        >
          Em curso
        </UBadge>
      </template>
    </UTable>
  </div>
</template>
