<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { Despesa } from '~~/server/api/deputados/[did]/despesas.get'

const route = useRoute()
const did = route.params.did as string

const state = reactive({
  pagina: 1,
  itens: 15,
  ordem: 'desc' as const,
  ordenarPor: 'ano' as const
})

const { data, status } = await useFetch(`/api/deputados/${did}/despesas`, { query: state })

const hasNextPage = computed(() => data.value?.links.some(link => link.rel === 'next') ?? false)
const hasPreviousPage = computed(() => data.value?.links.some(link => link.rel === 'previous') ?? false)

const columns: TableColumn<Despesa>[] = [
  { id: 'data', header: 'Data' },
  { id: 'tipoDespesa', header: 'Tipo' },
  { id: 'fornecedor', header: 'Fornecedor' },
  { id: 'valorLiquido', header: 'Valor' },
  { id: 'documento', header: '' }
]

const formatValor = (valor: number | null) =>
  valor?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) ?? '—'

useHead(() => ({ title: 'Despesas' }))
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">
      Despesas
    </h1>

    <DeputadoNav :did="did" />

    <UTable
      :data="data?.dados ?? []"
      :columns="columns"
      :loading="status === 'pending'"
    >
      <template #data-cell="{ row }">
        <NuxtTime
          v-if="row.original.dataDocumento"
          :datetime="row.original.dataDocumento.slice(0, 10)"
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

      <template #tipoDespesa-cell="{ row }">
        <span class="text-sm">{{ row.original.tipoDespesa }}</span>
      </template>

      <template #fornecedor-cell="{ row }">
        <div>
          <p>{{ row.original.nomeFornecedor ?? '—' }}</p>
          <p class="text-muted text-xs">
            {{ row.original.tipoDocumento }} • {{ row.original.mes }}/{{ row.original.ano }}
          </p>
        </div>
      </template>

      <template #valorLiquido-cell="{ row }">
        <span class="font-medium tabular-nums">{{ formatValor(row.original.valorLiquido) }}</span>
      </template>

      <template #documento-cell="{ row }">
        <UButton
          v-if="row.original.urlDocumento"
          :to="row.original.urlDocumento"
          target="_blank"
          icon="i-lucide-file-text"
          color="neutral"
          variant="ghost"
          size="xs"
          aria-label="Ver documento"
        />
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
</template>
