<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { MembroFrente } from '~~/server/api/frentes/[fid]/membros.get'

const route = useRoute()
const fid = route.params.fid as string

const { data, status } = await useFetch(`/api/frentes/${fid}/membros`)

const columns: TableColumn<MembroFrente>[] = [
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
