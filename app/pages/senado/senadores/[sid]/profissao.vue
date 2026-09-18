<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { asArray } from '~~/shared/senado'
import type { HistoricoAcademicoDoc, Profissao } from '#shared/api-senado'

const route = useRoute()
const sid = route.params.sid as string

// O serviço /senador/{codigo}/profissao reutiliza o XSD do histórico acadêmico;
// quando há dados, vêm em Parlamentar.Profissao/Profissões — lida-se de forma defensiva.
const { data, status } = await useFetch<HistoricoAcademicoDoc>(`/api/senado/senador/${sid}/profissao.json`)
const profissoes = computed(() => {
  const raiz = data.value?.HistoricoAcademicoParlamentar?.Parlamentar as Record<string, unknown> | undefined
  const bruto = raiz?.Profissao ?? raiz?.Profissões
  if (!bruto) return []
  const interno = typeof bruto === 'object' && bruto !== null && !Array.isArray(bruto)
    ? (bruto as { Profissao?: unknown }).Profissao ?? bruto
    : bruto
  return asArray(interno as Profissao)
})

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
      :data="profissoes"
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
