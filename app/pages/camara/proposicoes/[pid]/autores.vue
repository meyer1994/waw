<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { Autor } from '~~/server/api/proposicoes/[pid]/autores.get'

const route = useRoute()
const pid = route.params.pid as string

const { data, status } = await useFetch(`/api/proposicoes/${pid}/autores`)

const columns: TableColumn<Autor>[] = [
  { accessorKey: 'nome', header: 'Autor' },
  { accessorKey: 'tipo', header: 'Tipo' },
  { accessorKey: 'ordemAssinatura', header: 'Assinatura' }
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
          v-if="row.original.uri.includes('/camara/deputados/')"
          :to="`/camara/deputados/${row.original.uri.split('/').pop()}`"
        >
          <span class="text-primary hover:underline font-medium">{{ row.original.nome }}</span>
        </NuxtLink>
        <span
          v-else
          class="font-medium"
        >{{ row.original.nome }}</span>
      </template>

      <template #tipo-cell="{ row }">
        <span class="text-sm">{{ row.original.tipo }}</span>
      </template>

      <template #ordemAssinatura-cell="{ row }">
        <span class="text-muted text-sm">{{ row.original.ordemAssinatura ?? '—' }}</span>
      </template>
    </UTable>
  </div>
</template>
