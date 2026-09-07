<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { PARTY_FLAGS } from '~~/shared/constants'
import type { Voto } from '~~/server/api/votacoes/[vid]/votos.get'

const route = useRoute()
const vid = route.params.vid as string

const { data, status } = await useFetch(`/api/votacoes/${vid}/votos`)

const columns: TableColumn<Voto>[] = [
  { id: 'nome', header: 'Deputado' },
  { id: 'partido', header: 'Partido' },
  { id: 'voto', header: 'Voto' }
]

const votoColor = (voto: string | null) => {
  if (voto === 'Sim')
    return 'success' as const
  if (voto === 'Não')
    return 'error' as const
  return 'neutral' as const
}
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
          :to="`/camara/deputados/${row.original.deputado_.id}`"
          class="flex items-center gap-2"
        >
          <UAvatar
            :src="row.original.deputado_.urlFoto ?? undefined"
            :alt="row.original.deputado_.nome"
            size="2xs"
          />
          <span class="text-primary hover:underline font-medium">{{ row.original.deputado_.nome }}</span>
        </NuxtLink>
      </template>

      <template #partido-cell="{ row }">
        <span class="text-muted text-sm flex items-center gap-1.5">
          <NuxtImg
            v-if="row.original.deputado_.siglaPartido && PARTY_FLAGS[row.original.deputado_.siglaPartido]"
            :src="PARTY_FLAGS[row.original.deputado_.siglaPartido]"
            alt=""
            class="w-5 h-3.5 rounded-[2px] object-cover"
          />
          {{ row.original.deputado_.siglaPartido }}
          <NuxtImg
            v-if="row.original.deputado_.siglaUf"
            :src="`/flags/${row.original.deputado_.siglaUf.toLowerCase()}.svg`"
            alt=""
            class="w-5 h-3.5 rounded-[2px] object-cover"
          />
          {{ row.original.deputado_.siglaUf }}
        </span>
      </template>

      <template #voto-cell="{ row }">
        <UBadge
          :color="votoColor(row.original.tipoVoto)"
          variant="subtle"
          size="sm"
        >
          {{ row.original.tipoVoto ?? '—' }}
        </UBadge>
      </template>
    </UTable>
  </div>
</template>
