<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { PARTY_FLAGS } from '~~/shared/constants'
import type { MembroMesa } from '~~/server/api/legislaturas/[lid]/mesa.get'

const route = useRoute()
const lid = route.params.lid as string

const { data, status } = await useFetch(`/api/legislaturas/${lid}/mesa`)

const columns: TableColumn<MembroMesa>[] = [
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
      <template #siglaPartido-cell="{ row }">
        <span class="flex items-center gap-1.5">
          <NuxtImg
            v-if="row.original.siglaPartido && PARTY_FLAGS[row.original.siglaPartido]"
            :src="PARTY_FLAGS[row.original.siglaPartido]"
            alt=""
            class="w-5 h-3.5 rounded-[2px] object-cover"
          />
          {{ row.original.siglaPartido ?? '—' }}
        </span>
      </template>
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
    </UTable>
  </div>
</template>
