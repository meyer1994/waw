<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { CamaraLista, Despesa } from '#shared/api'
import { MESES } from '~~/shared/constants'

const route = useRoute()
const did = route.params.did as string

const ano = ref<string>()
const mes = ref<string>()

const { data, status } = await useFetch<CamaraLista<Despesa>>(`/api/camara/deputados/${did}/despesas`, {
  query: computed(() => ({ ano: ano.value, mes: mes.value }))
})

const anoItems = Array.from({ length: 10 }, (_, i) => ({ label: String(new Date().getFullYear() - i), value: String(new Date().getFullYear() - i) }))

const mesItems = MESES.map((nome, i) => ({ label: nome, value: String(i + 1) }))

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
    <h2 class="text-xl font-semibold mb-4">
      Despesas
    </h2>

    <UForm
      :disabled="status === 'pending'"
      class="flex gap-3 mb-4"
    >
      <USelectMenu
        v-model="ano"
        value-key="value"
        :items="anoItems"
        clear
        placeholder="Todos os anos"
      />

      <USelectMenu
        v-model="mes"
        value-key="value"
        :items="mesItems"
        clear
        searchable
        placeholder="Todos os meses"
      />
    </UForm>

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
        <span class="font-medium tabular-nums">{{ formatValor(row.original.valorLiquido ?? null) }}</span>
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
  </div>
</template>
