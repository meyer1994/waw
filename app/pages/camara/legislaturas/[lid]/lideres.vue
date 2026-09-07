<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { LiderLegislatura } from '~~/server/api/legislaturas/[lid]/lideres.get'

const route = useRoute()
const lid = route.params.lid as string

const { data, status } = await useFetch(`/api/legislaturas/${lid}/lideres`)

const columns: TableColumn<LiderLegislatura>[] = [
  { id: 'nome', header: 'Líder' },
  { accessorKey: 'titulo', header: 'Cargo' },
  { id: 'bancada', header: 'Bancada' }
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
          v-if="row.original.parlamentar"
          :to="`/camara/deputados/${row.original.parlamentar.id}`"
          class="flex items-center gap-2"
        >
          <UAvatar
            :src="row.original.parlamentar.urlFoto ?? undefined"
            :alt="row.original.parlamentar.nome"
            size="2xs"
          />
          <span class="text-primary hover:underline font-medium">{{ row.original.parlamentar.nome }}</span>
        </NuxtLink>
        <span v-else>—</span>
      </template>

      <template #titulo-cell="{ row }">
        <span class="text-sm">{{ row.original.titulo ?? '—' }}</span>
      </template>

      <template #bancada-cell="{ row }">
        <span class="text-muted text-sm">{{ row.original.bancada?.nome ?? '—' }}</span>
      </template>
    </UTable>
  </div>
</template>
