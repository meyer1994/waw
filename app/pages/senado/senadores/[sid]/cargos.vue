<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { asArray } from '~~/shared/senado'
import type { CargoDoc, CargoParlamentar } from '#shared/api-senado'

const route = useRoute()
const sid = route.params.sid as string

const { data, status } = await useFetch<CargoDoc>(`/api/senado/senador/${sid}/cargos.json`)
const cargos = computed(() => asArray(data.value?.CargoParlamentar?.Parlamentar?.Cargos?.Cargo))

const columns: TableColumn<CargoParlamentar>[] = [
  { accessorKey: 'DescricaoCargo', header: 'Cargo' },
  { id: 'comissao', header: 'Comissão' },
  { id: 'casa', header: 'Casa' },
  { accessorKey: 'DataInicio', header: 'Início' }
]
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">
      Cargos
    </h2>

    <UTable
      :data="cargos"
      :columns="columns"
      :loading="status === 'pending'"
    >
      <template #comissao-cell="{ row }">
        <NuxtLink
          v-if="row.original.IdentificacaoComissao"
          :to="`/senado/comissao/${row.original.IdentificacaoComissao.CodigoComissao}`"
          class="text-sm text-primary hover:underline"
        >
          {{ row.original.IdentificacaoComissao.NomeComissao }}
        </NuxtLink>
        <span
          v-else
          class="text-muted"
        >—</span>
      </template>

      <template #casa-cell="{ row }">
        <span class="text-muted text-sm">{{ row.original.IdentificacaoComissao?.SiglaCasaComissao ?? '—' }}</span>
      </template>

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
    </UTable>
  </div>
</template>
