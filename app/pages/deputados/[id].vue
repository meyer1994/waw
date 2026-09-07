<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { Proposicao } from '~~/server/api/deputados/[id].get'

const route = useRoute()
const id = route.params.id as string

const state = reactive({
  pagina: 1,
  itens: 15,
  ordem: 'desc' as const,
  ordenarPor: 'id' as const
})

const { data, status } = await useFetch(`/api/deputados/${id}`, { query: state })
const deputado = computed(() => data.value?.deputado)
const proposicoes = computed(() => data.value?.proposicoes)

const hasNextPage = computed(() => proposicoes.value?.links.some(link => link.rel === 'next') ?? false)
const hasPreviousPage = computed(() => proposicoes.value?.links.some(link => link.rel === 'previous') ?? false)

const columns: TableColumn<Proposicao>[] = [
  {
    id: 'proposicao',
    header: 'Proposição',
    cell: ({ row }) => `${row.original.siglaTipo} ${row.original.numero}/${row.original.ano}`
  },
  { accessorKey: 'dataApresentacao', header: 'Apresentação' },
  { id: 'ementa', header: 'Ementa' }
]

useHead(() => ({ title: deputado.value?.ultimoStatus.nome ?? 'Deputado' }))
</script>

<template>
  <div>
    <div
      v-if="status === 'pending'"
      class="flex justify-center py-8"
    >
      <UIcon
        name="i-lucide-loader-circle"
        class="size-8 animate-spin"
      />
    </div>

    <div v-else-if="deputado?.ultimoStatus">
      <div class="flex items-center gap-4 mb-8">
        <UAvatar
          :src="deputado.ultimoStatus.urlFoto"
          :alt="deputado.ultimoStatus.nome"
          size="3xl"
        />

        <div>
          <h1 class="text-2xl font-bold">
            {{ deputado.ultimoStatus.nome }}
          </h1>
          <p class="text-muted">
            {{ deputado.nomeCivil }} • {{ deputado.ultimoStatus.siglaPartido }}–{{ deputado.ultimoStatus.siglaUf }}
          </p>
          <p class="text-sm text-muted">
            {{ deputado.ultimoStatus.situacao }} • {{ deputado.ultimoStatus.condicaoEleitoral }}
          </p>
        </div>
      </div>

      <h2 class="text-xl font-semibold mb-4">
        Proposições
      </h2>

      <UTable
        :data="proposicoes?.dados ?? []"
        :columns="columns"
        :loading="status === 'pending'"
      >
        <template #dataApresentacao-cell="{ row }">
          {{ row.original.dataApresentacao ? new Date(`${row.original.dataApresentacao.slice(0, 10)}T00:00:00`).toLocaleDateString('pt-BR') : '—' }}
        </template>

        <template #ementa-cell="{ row }">
          <span class="text-muted text-sm line-clamp-2">
            {{ row.original.ementa }}
          </span>
        </template>
      </UTable>

      <div class="flex justify-end gap-3 mt-4">
        <UButton
          icon="i-lucide-chevron-left"
          color="neutral"
          variant="outline"
          :disabled="!hasPreviousPage"
          @click="state.pagina--"
        >
          Anterior
        </UButton>
        <UButton
          trailing-icon="i-lucide-chevron-right"
          color="neutral"
          variant="outline"
          :disabled="!hasNextPage"
          @click="state.pagina++"
        >
          Próxima
        </UButton>
      </div>
    </div>
  </div>
</template>
