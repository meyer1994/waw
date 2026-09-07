<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { Deputado } from '~~/server/api/deputados/index.get'

const route = useRoute()
const eid = route.params.eid as string

const { data, status } = await useFetch(`/api/eventos/${eid}/deputados`)

const columns: TableColumn<Deputado>[] = [
  { id: 'nome', header: 'Deputado' },
  { accessorKey: 'siglaPartido', header: 'Partido' },
  { accessorKey: 'siglaUf', header: 'UF' }
]
</script>

<template>
  <div class="mt-6">
    <UTable
      :data="data?.dados ?? []"
      :columns="columns"
      :loading="status === 'pending'"
    >
      <template #nome-cell="{ row }">
        <NuxtLink
          :to="`/deputados/${row.original.id}`"
          class="flex items-center gap-2"
        >
          <UAvatar
            :src="row.original.urlFoto"
            :alt="row.original.nome"
            size="2xs"
          />
          <span class="text-primary hover:underline font-medium">{{ row.original.nome }}</span>
        </NuxtLink>
      </template>
    </UTable>
  </div>
</template>
