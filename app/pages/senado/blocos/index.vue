<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { asArray } from '~~/shared/senado'
import type { BlocoLista, BlocoListaDoc } from '#shared/api-senado'

const { data, status } = await useFetch<BlocoListaDoc>('/api/senado/composicao/lista/blocos.json')
const blocos = computed(() => asArray(data.value?.ListaBlocoParlamentar?.Blocos?.Bloco))

const columns: TableColumn<BlocoLista>[] = [
  { accessorKey: 'NomeApelido', header: 'Bloco' },
  { accessorKey: 'NomeBloco', header: 'Nome' },
  { accessorKey: 'DataCriacao', header: 'Criação' },
  { id: 'partidos', header: 'Partidos' }
]

useHead(() => ({ title: 'Blocos' }))
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">
      Blocos Parlamentares
    </h1>

    <UTable
      :data="blocos"
      :columns="columns"
      :loading="status === 'pending'"
    >
      <template #NomeApelido-cell="{ row }">
        <NuxtLink
          :to="`/senado/blocos/${row.original.CodigoBloco}`"
          class="text-primary hover:underline font-medium"
        >
          {{ row.original.NomeApelido }}
        </NuxtLink>
      </template>

      <template #DataCriacao-cell="{ row }">
        <span class="text-muted text-sm">{{ row.original.DataCriacao ?? '—' }}</span>
      </template>

      <template #partidos-cell="{ row }">
        <div class="flex flex-wrap gap-1">
          <UBadge
            v-for="membro in asArray(row.original.Membros?.Membro).map(m => m.Partido?.Sigla).filter(Boolean)"
            :key="membro"
            variant="subtle"
          >
            {{ membro }}
          </UBadge>
        </div>
      </template>
    </UTable>
  </div>
</template>
