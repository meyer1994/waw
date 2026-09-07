<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { Deputado } from '~~/server/api/deputados/index.get'

const route = useRoute()
const pid = route.params.pid as string

const { data, status } = await useFetch(`/api/partidos/${pid}/membros`)

const columns: TableColumn<Deputado>[] = [
  { id: 'deputado', header: 'Deputado' },
  { accessorKey: 'siglaUf', header: 'UF' },
  { accessorKey: 'email', header: 'Email' }
]
</script>

<template>
  <div class="mt-6">
    <UTable
      :data="data?.dados ?? []"
      :columns="columns"
      :loading="status === 'pending'"
    >
      <template #deputado-cell="{ row }">
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

      <template #email-cell="{ row }">
        <span class="text-muted text-sm">{{ row.original.email ?? '—' }}</span>
      </template>
    </UTable>
  </div>
</template>
