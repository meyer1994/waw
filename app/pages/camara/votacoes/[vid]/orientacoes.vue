<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { PARTY_FLAGS } from '~~/shared/constants'
import type { CamaraLista, Orientacao } from '#shared/api'

const route = useRoute()
const vid = route.params.vid as string

const { data, status } = await useFetch<CamaraLista<Orientacao>>(`/api/camara/votacoes/${vid}/orientacoes`)

const columns: TableColumn<Orientacao>[] = [
  { id: 'partido', header: 'Partido/Bloco' },
  { accessorKey: 'codTipoLideranca', header: 'Liderança' },
  { id: 'orientacao', header: 'Orientação' }
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
      <template #partido-cell="{ row }">
        <span class="flex items-center gap-1.5">
          <NuxtImg
            v-if="row.original.siglaPartidoBloco && PARTY_FLAGS[row.original.siglaPartidoBloco]"
            :src="PARTY_FLAGS[row.original.siglaPartidoBloco]"
            alt=""
            class="w-5 h-3.5 rounded-[2px] object-cover"
          />
          <NuxtLink
            v-if="row.original.uriPartidoBloco?.includes('/camara/partidos/')"
            :to="`/camara/partidos/${row.original.uriPartidoBloco.split('/').pop()}`"
          >
            <span class="text-primary hover:underline font-medium">{{ row.original.siglaPartidoBloco }}</span>
          </NuxtLink>
          <span
            v-else
            class="font-medium"
          >{{ row.original.siglaPartidoBloco ?? '—' }}</span>
        </span>
      </template>

      <template #codTipoLideranca-cell="{ row }">
        <span class="text-muted text-sm">{{ row.original.codTipoLideranca ?? '—' }}</span>
      </template>

      <template #orientacao-cell="{ row }">
        <UBadge
          :color="votoColor(row.original.orientacaoVoto ?? null)"
          variant="subtle"
          size="sm"
        >
          {{ row.original.orientacaoVoto ?? '—' }}
        </UBadge>
      </template>
    </UTable>
  </div>
</template>
