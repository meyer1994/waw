<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { asArray } from '~~/shared/senado'
import type { Colegiado, ComissaoListaDoc } from '#shared/api-senado'

const busca = ref('')

const { data, status } = await useFetch<ComissaoListaDoc>('/api/senado/comissao/lista/colegiados.json')
const colegiados = computed(() => {
  const lista = asArray(data.value?.ListaColegiados?.Colegiados?.Colegiado)
  const q = busca.value.trim().toLowerCase()
  if (!q) return lista
  return lista.filter(c =>
    c.Sigla.toLowerCase().includes(q) || c.Nome.toLowerCase().includes(q) || c.DescricaoTipoColegiado?.toLowerCase().includes(q)
  )
})

const columns: TableColumn<Colegiado>[] = [
  { accessorKey: 'Sigla', header: 'Sigla' },
  { accessorKey: 'Nome', header: 'Nome' },
  { accessorKey: 'DescricaoTipoColegiado', header: 'Tipo' },
  { accessorKey: 'SiglaCasa', header: 'Casa' }
]

useHead(() => ({ title: 'Comissões' }))
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">
      Comissões
    </h1>

    <UForm
      :disabled="status === 'pending'"
      class="flex gap-3 mb-4"
    >
      <UInput
        v-model="busca"
        icon="i-lucide-search"
        placeholder="Buscar comissão..."
        class="w-80"
      />
    </UForm>

    <UTable
      :data="colegiados"
      :columns="columns"
      :loading="status === 'pending'"
    >
      <template #Sigla-cell="{ row }">
        <NuxtLink :to="`/senado/comissao/${row.original.Codigo}`">
          <span class="text-primary hover:underline font-medium">{{ row.original.Sigla }}</span>
        </NuxtLink>
      </template>

      <template #Nome-cell="{ row }">
        <NuxtLink :to="`/senado/comissao/${row.original.Codigo}`">
          <span class="text-sm text-primary hover:underline">{{ row.original.Nome }}</span>
        </NuxtLink>
      </template>

      <template #DescricaoTipoColegiado-cell="{ row }">
        <span class="text-muted text-sm">{{ row.original.DescricaoTipoColegiado ?? '—' }}</span>
      </template>

      <template #SiglaCasa-cell="{ row }">
        <span class="text-muted text-sm">{{ row.original.SiglaCasa ?? '—' }}</span>
      </template>
    </UTable>
  </div>
</template>
