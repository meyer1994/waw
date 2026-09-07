<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { Orientacao } from '~~/server/api/votacoes/[vid]/orientacoes.get'

const route = useRoute()
const vid = route.params.vid as string

const { data, status } = await useFetch(`/api/votacoes/${vid}/orientacoes`)

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
        <NuxtLink
          v-if="row.original.uriPartidoBloco?.includes('/partidos/')"
          :to="`/partidos/${row.original.uriPartidoBloco.split('/').pop()}`"
        >
          <span class="text-primary hover:underline font-medium">{{ row.original.siglaPartidoBloco }}</span>
        </NuxtLink>
        <span
          v-else
          class="font-medium"
        >{{ row.original.siglaPartidoBloco ?? '—' }}</span>
      </template>

      <template #codTipoLideranca-cell="{ row }">
        <span class="text-muted text-sm">{{ row.original.codTipoLideranca ?? '—' }}</span>
      </template>

      <template #orientacao-cell="{ row }">
        <UBadge
          :color="votoColor(row.original.orientacaoVoto)"
          variant="subtle"
          size="sm"
        >
          {{ row.original.orientacaoVoto ?? '—' }}
        </UBadge>
      </template>
    </UTable>
  </div>
</template>
