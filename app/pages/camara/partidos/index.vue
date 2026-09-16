<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { PARTY_FLAGS } from '~~/shared/constants'
import type { CamaraLista, Partido } from '#shared/api'

const { data, status } = await useFetch<CamaraLista<Partido>>('/api/camara/partidos')

const columns: TableColumn<Partido>[] = [
  { id: 'logo', header: '', meta: { class: { th: 'w-16' } } },
  { accessorKey: 'sigla', header: 'Sigla' },
  { accessorKey: 'nome', header: 'Nome' }
]

useHead(() => ({ title: 'Partidos' }))
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">
      Partidos
    </h1>

    <UTable
      :data="data?.dados ?? []"
      :columns="columns"
      :loading="status === 'pending'"
    >
      <template #logo-cell="{ row }">
        <NuxtImg
          v-if="row.original.sigla && PARTY_FLAGS[row.original.sigla]"
          :src="PARTY_FLAGS[row.original.sigla ?? '']"
          alt=""
          class="w-8 h-5 rounded-[2px] object-cover"
        />
      </template>

      <template #sigla-cell="{ row }">
        <NuxtLink :to="`/camara/partidos/${row.original.id}`">
          <span class="text-primary hover:underline font-medium">{{ row.original.sigla }}</span>
        </NuxtLink>
      </template>

      <template #nome-cell="{ row }">
        <span class="text-sm">{{ row.original.nome }}</span>
      </template>
    </UTable>
  </div>
</template>
