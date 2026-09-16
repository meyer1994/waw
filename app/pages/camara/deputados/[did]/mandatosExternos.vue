<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { PARTY_FLAGS } from '~~/shared/constants'
import type { CamaraLista, MandatoExterno } from '#shared/api'

const route = useRoute()
const did = route.params.did as string

const { data, status } = await useFetch<CamaraLista<MandatoExterno>>(`/api/camara/deputados/${did}/mandatosExternos`)

const columns: TableColumn<MandatoExterno>[] = [
  { accessorKey: 'cargo', header: 'Cargo' },
  { id: 'local', header: 'Local' },
  { accessorKey: 'siglaPartidoEleicao', header: 'Partido' },
  { id: 'periodo', header: 'Período' }
]
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">
      Mandatos Externos
    </h2>

    <UTable
      :data="data?.dados ?? []"
      :columns="columns"
      :loading="status === 'pending'"
    >
      <template #cargo-cell="{ row }">
        <span class="text-sm font-medium">{{ row.original.cargo ?? '—' }}</span>
      </template>

      <template #local-cell="{ row }">
        <span class="text-sm text-muted">
          {{ [row.original.municipio, row.original.siglaUf].filter(Boolean).join(' • ') || '—' }}
        </span>
      </template>

      <template #siglaPartidoEleicao-cell="{ row }">
        <span class="text-sm flex items-center gap-1.5">
          <NuxtImg
            v-if="row.original.siglaPartidoEleicao && PARTY_FLAGS[row.original.siglaPartidoEleicao]"
            :src="PARTY_FLAGS[row.original.siglaPartidoEleicao]"
            alt=""
            class="w-5 h-3.5 rounded-[2px] object-cover"
          />
          {{ row.original.siglaPartidoEleicao ?? '—' }}
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
