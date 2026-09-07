<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { MembroGrupo } from '~~/server/api/grupos/[gid]/membros.get'

const route = useRoute()
const gid = route.params.gid as string

const { data, status } = await useFetch(`/api/grupos/${gid}/membros`)

const membros = computed(() => data.value?.dados.flatMap(grupo => grupo.membros) ?? [])

const columns: TableColumn<MembroGrupo>[] = [
  { accessorKey: 'nome', header: 'Membro' },
  { accessorKey: 'cargo', header: 'Cargo' },
  { accessorKey: 'tipo', header: 'Tipo' },
  { id: 'periodo', header: 'Período' }
]
</script>

<template>
  <div class="mt-6">
    <UTable
      :data="membros"
      :columns="columns"
      :loading="status === 'pending'"
    >
      <template #nome-cell="{ row }">
        <NuxtLink
          v-if="row.original.uri?.includes('/camara/deputados/')"
          :to="`/camara/deputados/${row.original.uri.split('/').pop()}`"
        >
          <span class="text-primary hover:underline font-medium">{{ row.original.nome }}</span>
        </NuxtLink>
        <span
          v-else
          class="font-medium"
        >{{ row.original.nome }}</span>
      </template>

      <template #cargo-cell="{ row }">
        <span class="text-sm">{{ row.original.cargo ?? '—' }}</span>
      </template>

      <template #tipo-cell="{ row }">
        <span class="text-muted text-sm">{{ row.original.tipo ?? '—' }}</span>
      </template>

      <template #periodo-cell="{ row }">
        <span class="text-muted text-sm">
          {{ row.original.dataInicio?.slice(0, 10) ?? '—' }} – {{ row.original.dataFim?.slice(0, 10) ?? 'atual' }}
        </span>
      </template>
    </UTable>
  </div>
</template>
