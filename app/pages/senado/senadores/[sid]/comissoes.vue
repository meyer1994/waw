<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { ComissaoMembro } from '~~/server/api/senadores/[sid]/comissoes.get'

const route = useRoute()
const sid = route.params.sid as string

const { data, status } = await useFetch(`/api/senadores/${sid}/comissoes`)

const columns: TableColumn<ComissaoMembro>[] = [
  { accessorKey: 'SiglaComissao', header: 'Sigla' },
  { accessorKey: 'NomeComissao', header: 'Comissão' },
  { accessorKey: 'SiglaCasaComissao', header: 'Casa' },
  { accessorKey: 'DescricaoParticipacao', header: 'Participação' },
  { accessorKey: 'DataInicio', header: 'Início' }
]
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">
      Comissões
    </h2>

    <UTable
      :data="data?.dados ?? []"
      :columns="columns"
      :loading="status === 'pending'"
    >
      <template #DataInicio-cell="{ row }">
        <NuxtTime
          v-if="row.original.DataInicio"
          :datetime="row.original.DataInicio"
          locale="pt-BR"
          year="numeric"
          month="2-digit"
          day="2-digit"
        />
        <span
          v-else
          class="text-muted"
        >—</span>
      </template>
    </UTable>
  </div>
</template>
