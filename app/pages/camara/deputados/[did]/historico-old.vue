<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { PARTY_FLAGS } from '~~/shared/constants'
import type { CamaraLista, Historico } from '#shared/api'

const route = useRoute()
const did = route.params.did as string

const { data, status } = await useFetch<CamaraLista<Historico>>(`/api/camara/deputados/${did}/historico-old`)

const columns: TableColumn<Historico>[] = [
  { accessorKey: 'nome', header: 'Nome' },
  { id: 'legislatura', header: 'Legislatura' },
  { accessorKey: 'siglaPartido', header: 'Partido' },
  { accessorKey: 'siglaUf', header: 'UF' },
  { accessorKey: 'situacao', header: 'Situação' },
  { accessorKey: 'condicaoEleitoral', header: 'Condição' },
  { id: 'data', header: 'Data' }
]
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">
      Histórico antigo
    </h2>

    <UTable
      :data="data?.dados ?? []"
      :columns="columns"
      :loading="status === 'pending'"
    >
      <template #nome-cell="{ row }">
        <span class="font-medium">{{ row.original.nome ?? '—' }}</span>
      </template>
      <template #siglaPartido-cell="{ row }">
        <span class="flex items-center gap-1.5">
          <NuxtImg
            v-if="row.original.siglaPartido && PARTY_FLAGS[row.original.siglaPartido]"
            :src="PARTY_FLAGS[row.original.siglaPartido]"
            alt=""
            class="w-5 h-3.5 rounded-[2px] object-cover"
          />
          {{ row.original.siglaPartido ?? '—' }}
        </span>
      </template>
      <template #siglaUf-cell="{ row }">
        <span
          v-if="row.original.siglaUf"
          class="flex items-center gap-1.5"
        >
          <NuxtImg
            :src="`/flags/${row.original.siglaUf.toLowerCase()}.svg`"
            alt=""
            class="w-5 h-3.5 rounded-[2px] object-cover"
          />
          {{ row.original.siglaUf }}
        </span>
        <span
          v-else
          class="text-muted text-sm"
        >—</span>
      </template>
      <template #legislatura-cell="{ row }">
        <span class="font-medium">{{ row.original.idLegislatura }}</span>
      </template>
      <template #data-cell="{ row }">
        <NuxtTime
          v-if="row.original.dataHora"
          :datetime="row.original.dataHora"
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
