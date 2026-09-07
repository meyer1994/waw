<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { Curso } from '~~/server/api/senadores/[sid]/historicoAcademico.get'

const route = useRoute()
const sid = route.params.sid as string

const { data, status } = await useFetch(`/api/senadores/${sid}/historicoAcademico`)

const columns: TableColumn<Curso>[] = [
  { accessorKey: 'NomeCurso', header: 'Curso' },
  { accessorKey: 'GrauInstrucao', header: 'Grau' },
  { accessorKey: 'Estabelecimento', header: 'Instituição' }
]
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">
      Histórico Acadêmico
    </h2>

    <UTable
      :data="data?.dados ?? []"
      :columns="columns"
      :loading="status === 'pending'"
    >
      <template #Estabelecimento-cell="{ row }">
        <span class="text-muted">{{ row.original.Estabelecimento ?? '—' }}</span>
      </template>
    </UTable>
  </div>
</template>
