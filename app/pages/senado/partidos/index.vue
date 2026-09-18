<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { PARTY_FLAGS } from '~~/shared/constants'
import { asArray } from '~~/shared/senado'
import type { Partido, PartidoListaDoc } from '#shared/api-senado'

const busca = ref('')

const { data, status } = await useFetch<PartidoListaDoc>('/api/senado/composicao/lista/partidos.json')
const partidos = computed(() => {
  const lista = asArray(data.value?.ListaPartidos?.Partidos?.Partido)
  const q = busca.value.trim().toLowerCase()
  if (!q) return lista
  return lista.filter(p => p.Sigla.toLowerCase().includes(q) || p.Nome.toLowerCase().includes(q))
})

const columns: TableColumn<Partido>[] = [
  { accessorKey: 'Sigla', header: 'Sigla' },
  { accessorKey: 'Nome', header: 'Nome' },
  { accessorKey: 'DataCriacao', header: 'Criação' },
  { accessorKey: 'DataExtincao', header: 'Extinção' }
]

useHead(() => ({ title: 'Partidos' }))
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">
      Partidos
    </h1>

    <UForm
      :disabled="status === 'pending'"
      class="flex gap-3 mb-4"
    >
      <UInput
        v-model="busca"
        icon="i-lucide-search"
        placeholder="Buscar partido..."
        class="w-72"
      />
    </UForm>

    <UTable
      :data="partidos"
      :columns="columns"
      :loading="status === 'pending'"
    >
      <template #Sigla-cell="{ row }">
        <span class="flex items-center gap-1.5">
          <NuxtImg
            v-if="PARTY_FLAGS[row.original.Sigla]"
            :src="PARTY_FLAGS[row.original.Sigla]"
            alt=""
            class="w-5 h-3.5 rounded-[2px] object-cover"
          />
          <span class="font-medium">{{ row.original.Sigla }}</span>
        </span>
      </template>

      <template #DataExtincao-cell="{ row }">
        <template v-if="row.original.DataExtincao">
          <span class="text-muted text-sm">{{ row.original.DataExtincao }}</span>
        </template>
        <UBadge
          v-else
          color="success"
          variant="subtle"
        >
          Ativo
        </UBadge>
      </template>
    </UTable>
  </div>
</template>
