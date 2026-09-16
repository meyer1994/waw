<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { CamaraLista, Orgao } from '#shared/api'
import { COD_TIPO_ORGAO } from '~~/shared/constants'

const sigla = ref('')
const codTipoOrgao = ref<string>()

const debSigla = debouncedRef(sigla, 500)
const { data, status } = await useFetch<CamaraLista<Orgao>>('/api/camara/orgaos', {
  query: computed(() => ({ sigla: debSigla.value || undefined, codTipoOrgao: codTipoOrgao.value }))
})

const tipoOrgaoItems = Object.entries(COD_TIPO_ORGAO).map(([cod, nome]) => ({ label: nome, value: cod }))

const columns: TableColumn<Orgao>[] = [
  { accessorKey: 'sigla', header: 'Sigla' },
  { accessorKey: 'nome', header: 'Nome' },
  { accessorKey: 'tipoOrgao', header: 'Tipo' }
]

useHead(() => ({ title: 'Órgãos' }))
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">
      Órgãos
    </h1>

    <UForm
      :disabled="status === 'pending'"
      class="flex gap-3 mb-4"
    >
      <UInput
        v-model="sigla"
        icon="i-lucide-search"
        placeholder="Buscar por sigla..."
      />

      <USelectMenu
        v-model="codTipoOrgao"
        value-key="value"
        :items="tipoOrgaoItems"
        searchable
        clear
        placeholder="Todos os tipos"
      />
    </UForm>

    <UTable
      :data="data?.dados ?? []"
      :columns="columns"
      :loading="status === 'pending'"
    >
      <template #sigla-cell="{ row }">
        <NuxtLink :to="`/camara/orgaos/${row.original.id}`">
          <span class="text-primary hover:underline font-medium">{{ row.original.sigla }}</span>
        </NuxtLink>
      </template>

      <template #nome-cell="{ row }">
        <span class="text-sm">{{ row.original.nome }}</span>
      </template>

      <template #tipoOrgao-cell="{ row }">
        <span class="text-muted text-sm">{{ row.original.tipoOrgao ?? '—' }}</span>
      </template>
    </UTable>
  </div>
</template>
