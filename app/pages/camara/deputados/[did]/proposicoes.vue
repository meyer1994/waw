<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { CamaraLista, Proposicao } from '#shared/api'

const route = useRoute()
const did = route.params.did as string

// a API não tem /deputados/{id}/proposicoes; usa-se /proposicoes com o filtro idDeputado
const { data, status } = await useFetch<CamaraLista<Proposicao>>('/api/camara/proposicoes', { query: { idDeputadoAutor: did, itens: 100, ordem: 'DESC', ordenarPor: 'id' } })
const proposicoes = computed(() => data.value?.dados)

const columns: TableColumn<Proposicao>[] = [
  { id: 'proposicao', header: 'Proposição' },
  { accessorKey: 'dataApresentacao', header: 'Apresentação' },
  { id: 'ementa', header: 'Ementa' }
]
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">
      Proposições
    </h2>

    <UTable
      :data="proposicoes ?? []"
      :columns="columns"
      :loading="status === 'pending'"
    >
      <template #proposicao-cell="{ row }">
        <NuxtLink :to="`/camara/proposicoes/${row.original.id}`">
          <span class="text-primary hover:underline">
            {{ row.original.siglaTipo }} {{ row.original.numero }}/{{ row.original.ano }}
          </span>
        </NuxtLink>
      </template>

      <template #dataApresentacao-cell="{ row }">
        <NuxtTime
          v-if="row.original.dataApresentacao"
          :datetime="row.original.dataApresentacao.slice(0, 10)"
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

      <template #ementa-cell="{ row }">
        <span class="text-muted text-sm line-clamp-2">
          {{ row.original.ementa }}
        </span>
      </template>
    </UTable>
  </div>
</template>
