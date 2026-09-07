<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { Profissao } from '~~/server/api/senadores/[sid]/profissao.get'

const route = useRoute()
const sid = route.params.sid as string

const { data, status } = await useFetch(`/api/senadores/${sid}/profissao`)

const columns: TableColumn<Profissao>[] = [
  { accessorKey: 'NomeProfissao', header: 'Profissão' },
  { accessorKey: 'IndicadorAtividadePrincipal', header: 'Atividade Principal' }
]
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">
      Profissões
    </h2>

    <UTable
      :data="data?.dados ?? []"
      :columns="columns"
      :loading="status === 'pending'"
    >
      <template #IndicadorAtividadePrincipal-cell="{ row }">
        <UBadge
          v-if="row.original.IndicadorAtividadePrincipal === 'Sim'"
          color="primary"
          variant="subtle"
        >
          Principal
        </UBadge>
        <span
          v-else
          class="text-muted"
        >—</span>
      </template>
    </UTable>
  </div>
</template>
