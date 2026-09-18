<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { PARTY_FLAGS } from '~~/shared/constants'
import { asArray } from '~~/shared/senado'
import type { Filiacao, FiliacaoDoc } from '#shared/api-senado'

const route = useRoute()
const sid = route.params.sid as string

const { data, status } = await useFetch<FiliacaoDoc>(`/api/senado/senador/${sid}/filiacoes.json`)
const filiacoes = computed(() => asArray(data.value?.FiliacaoParlamentar?.Parlamentar?.Filiacoes?.Filiacao))

const columns: TableColumn<Filiacao>[] = [
  { id: 'partido', header: 'Partido' },
  { accessorKey: 'Partido.NomePartido', header: 'Nome' },
  { accessorKey: 'DataFiliacao', header: 'Filiação' },
  { accessorKey: 'DataDesfiliacao', header: 'Desfiliação' }
]
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">
      Filiações Partidárias
    </h2>

    <UTable
      :data="filiacoes"
      :columns="columns"
      :loading="status === 'pending'"
    >
      <template #partido-cell="{ row }">
        <span class="flex items-center gap-1.5">
          <NuxtImg
            v-if="PARTY_FLAGS[row.original.Partido.SiglaPartido]"
            :src="PARTY_FLAGS[row.original.Partido.SiglaPartido]"
            alt=""
            class="w-5 h-3.5 rounded-[2px] object-cover"
          />
          {{ row.original.Partido.SiglaPartido }}
        </span>
      </template>

      <template #DataFiliacao-cell="{ row }">
        <NuxtTime
          v-if="row.original.DataFiliacao"
          :datetime="row.original.DataFiliacao"
          year="numeric"
          month="2-digit"
          day="2-digit"
        />
        <span
          v-else
          class="text-muted"
        >—</span>
      </template>

      <template #DataDesfiliacao-cell="{ row }">
        <template v-if="row.original.DataDesfiliacao">
          <NuxtTime
            :datetime="row.original.DataDesfiliacao"
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
