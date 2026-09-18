<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { asArray } from '~~/shared/senado'
import type { ComposicaoComissaoDoc, MembroComissao } from '#shared/api-senado'

const route = useRoute()
const cid = route.params.cid as string

const somenteAtivos = ref(true)

const { data, status } = await useFetch<ComposicaoComissaoDoc>(`/api/senado/composicao/comissao/${cid}.json`, {
  query: computed(() => ({ ativas: somenteAtivos.value }))
})

const membros = computed(() => {
  const todos = asArray(data.value?.UltimaComposicaoComissaoSf?.ComposicaoComissao?.Membros?.Membro)
  return somenteAtivos.value ? todos.filter(m => m.IndicadorVagaAtiva === 'Sim') : todos
})

const columns: TableColumn<MembroComissao>[] = [
  { accessorKey: 'NomeMembro', header: 'Parlamentar' },
  { accessorKey: 'TipoVaga', header: 'Vaga' },
  { accessorKey: 'IndicadorVagaAtiva', header: 'Situação' },
  { accessorKey: 'DataInicioMembroVaga', header: 'Início' }
]
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">
      Membros
    </h2>

    <div class="flex items-center gap-2 mb-4">
      <USwitch v-model="somenteAtivos" />
      <span class="text-sm text-muted">Somente vagas ativas</span>
    </div>

    <UTable
      :data="membros"
      :columns="columns"
      :loading="status === 'pending'"
    >
      <template #NomeMembro-cell="{ row }">
        <NuxtLink
          v-if="row.original.CodigoParlamentar"
          :to="`/senado/senadores/${row.original.CodigoParlamentar}`"
          class="text-primary hover:underline font-medium"
        >
          {{ row.original.NomeMembro }}
        </NuxtLink>
        <span
          v-else
          class="font-medium"
        >{{ row.original.NomeMembro }}</span>
      </template>

      <template #IndicadorVagaAtiva-cell="{ row }">
        <UBadge
          :color="row.original.IndicadorVagaAtiva === 'Sim' ? 'success' : 'neutral'"
          variant="subtle"
        >
          {{ row.original.IndicadorVagaAtiva === 'Sim' ? 'Ativa' : 'Inativa' }}
        </UBadge>
      </template>

      <template #DataInicioMembroVaga-cell="{ row }">
        <NuxtTime
          v-if="row.original.DataInicioMembroVaga"
          :datetime="row.original.DataInicioMembroVaga"
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
