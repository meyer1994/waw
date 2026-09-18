<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { asArray } from '~~/shared/senado'
import type { Curso, HistoricoAcademicoDoc } from '#shared/api-senado'

const route = useRoute()
const sid = route.params.sid as string

const { data, status } = await useFetch<HistoricoAcademicoDoc>(`/api/senado/senador/${sid}/historicoAcademico.json`)
const cursos = computed(() => asArray(data.value?.HistoricoAcademicoParlamentar?.Parlamentar?.HistoricoAcademico?.Curso))

const columns: TableColumn<Curso>[] = [
  { accessorKey: 'NomeCurso', header: 'Curso' },
  { accessorKey: 'GrauInstrucao', header: 'Grau' },
  { accessorKey: 'Estabelecimento', header: 'Instituição' },
  { accessorKey: 'Local', header: 'Local' }
]
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">
      Histórico Acadêmico
    </h2>

    <UTable
      :data="cursos"
      :columns="columns"
      :loading="status === 'pending'"
    >
      <template #Estabelecimento-cell="{ row }">
        <span class="text-muted">{{ row.original.Estabelecimento ?? '—' }}</span>
      </template>
    </UTable>
  </div>
</template>
