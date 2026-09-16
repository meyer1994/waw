<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { CamaraLista, Deputado } from '#shared/api'

const route = useRoute()
const pid = route.params.pid as string

const { data, status } = await useFetch<CamaraLista<Deputado>>(`/api/camara/partidos/${pid}/membros`)

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
      <template #deputado-cell="{ row }">
        <NuxtLink
          :to="`/camara/deputados/${row.original.id}`"
          class="flex items-center gap-2"
        >
          <UAvatar
            as="NuxtImg"
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
