<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { asArray } from '~~/shared/senado'
import type { DocumentoFlat, LegislacaoListaDoc } from '#shared/api-senado'

const tipo = ref('')
const numero = ref('')
const ano = ref('')

const debTipo = debouncedRef(tipo, 500)
const { data, status } = await useFetch<LegislacaoListaDoc>('/api/senado/legislacao/lista.json', {
  query: computed(() => ({
    tipo: debTipo.value || undefined,
    numero: numero.value || undefined,
    ano: ano.value || undefined
  }))
})

const documentos = computed(() => {
  const docs = data.value?.ListaDocumento?.documentos
  // Sem filtros o serviço devolve `documentos: ""` — normalizar para lista vazia
  if (!docs || typeof docs === 'string') return []
  return asArray((asArray(docs)[0])?.documento)
})

const columns: TableColumn<DocumentoFlat>[] = [
  { id: 'norma', header: 'Norma' },
  { accessorKey: 'descricao', header: 'Tipo' },
  { accessorKey: 'numero', header: 'Número' },
  { id: 'ementa', header: 'Ementa' }
]

useHead(() => ({ title: 'Legislação' }))
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">
      Legislação Federal
    </h1>

    <UForm
      :disabled="status === 'pending'"
      class="flex gap-3 mb-4"
    >
      <UInput
        v-model="tipo"
        icon="i-lucide-scale"
        placeholder="Tipo (ex: LEI, DEC, MP, CF)"
        class="w-56"
      />
      <UInput
        v-model="numero"
        type="number"
        placeholder="Número"
        class="w-32"
      />
      <UInput
        v-model="ano"
        type="number"
        placeholder="Ano"
        class="w-32"
      />
    </UForm>

    <UTable
      :data="documentos"
      :columns="columns"
      :loading="status === 'pending'"
    >
      <template #norma-cell="{ row }">
        <NuxtLink
          v-if="row.original.normaNome || row.original.norma"
          :to="`/senado/legislacao/${row.original.id}`"
          class="text-primary hover:underline font-medium"
        >
          {{ row.original.normaNome ?? row.original.norma }}
        </NuxtLink>
        <span
          v-else
          class="text-muted text-sm"
        >—</span>
      </template>

      <template #ementa-cell="{ row }">
        <span class="text-muted text-sm line-clamp-2">{{ row.original.ementa ?? '—' }}</span>
      </template>
    </UTable>
  </div>
</template>
