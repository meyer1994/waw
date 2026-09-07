<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { Membro } from '~~/server/api/orgaos/[oid]/membros.get'

const route = useRoute()
const oid = route.params.oid as string

const { data, status } = await useFetch(`/api/orgaos/${oid}/membros`)

const columns: TableColumn<Membro>[] = [
  { id: 'nome', header: 'Membro' },
  { accessorKey: 'titulo', header: 'Cargo' },
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
            :src="row.original.urlFoto ?? undefined"
            :alt="row.original.nome"
            size="2xs"
          />
          <span class="text-primary hover:underline font-medium">{{ row.original.nome }}</span>
        </NuxtLink>
      </template>

      <template #titulo-cell="{ row }">
        <span class="text-sm">{{ row.original.titulo ?? '—' }}</span>
      </template>
    </UTable>
  </div>
</template>
