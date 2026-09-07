<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { Lider } from '~~/server/api/partidos/[pid]/lideres.get'

const route = useRoute()
const pid = route.params.pid as string

const { data, status } = await useFetch(`/api/partidos/${pid}/lideres`)

const columns: TableColumn<Lider>[] = [
  { id: 'nome', header: 'Líder' },
  { accessorKey: 'titulo', header: 'Cargo' },
  { accessorKey: 'siglaUf', header: 'UF' },
  { id: 'periodo', header: 'Período' }
]
</script>

<template>
  <div class="mt-6">
    <UTable
      :data="data?.dados ?? []"
      :columns="columns"
      :loading="status === 'pending'"
    >
      <template #siglaUf-cell="{ row }">
        <span
          v-if="row.original.siglaUf"
          class="flex items-center gap-1.5"
        >
          <NuxtImg
            :src="`/flags/${row.original.siglaUf.toLowerCase()}.svg`"
            alt=""
            class="w-5 h-3.5 rounded-[2px] object-cover"
          />
          {{ row.original.siglaUf }}
        </span>
        <span
          v-else
          class="text-muted text-sm"
        >—</span>
      </template>
      <template #nome-cell="{ row }">
        <NuxtLink
          :to="`/camara/deputados/${row.original.id}`"
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

      <template #periodo-cell="{ row }">
        <span class="text-muted text-sm">
          {{ row.original.dataInicio?.slice(0, 10) ?? '—' }} – {{ row.original.dataFim?.slice(0, 10) ?? 'atual' }}
        </span>
      </template>
    </UTable>
  </div>
</template>
