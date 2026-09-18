<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { votacoesSchema } from '~~/shared/schemas'
import type { SessaoVotacao } from '#shared/api-senado'

const hoje = new Date()
const inicio = ref(new Date(hoje.getTime() - 30 * 24 * 3600 * 1000).toISOString().slice(0, 10))
const fim = ref(hoje.toISOString().slice(0, 10))

const { data, status } = await useFetch<SessaoVotacao[]>('/api/senado/votacao.json', {
  query: computed(() => ({
    dataInicio: inicio.value || undefined,
    dataFim: fim.value || undefined
  }))
})

const columns: TableColumn<SessaoVotacao>[] = [
  { id: 'sessao', header: 'Sessão' },
  { id: 'processo', header: 'Processo' },
  { accessorKey: 'descricaoVotacao', header: 'Votação' },
  { accessorKey: 'resultadoVotacao', header: 'Resultado' },
  { id: 'votos', header: 'Votos' }
]

useHead(() => ({ title: 'Votações' }))
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">
      Votações Nominais
    </h1>

    <UForm
      :schema="votacoesSchema"
      :disabled="status === 'pending'"
      class="flex gap-3 items-center mb-4"
    >
      <UInput
        v-model="inicio"
        type="date"
        placeholder="Data inicial"
        class="w-44"
      />
      <UInput
        v-model="fim"
        type="date"
        placeholder="Data final"
        class="w-44"
      />
    </UForm>

    <UTable
      :data="data ?? []"
      :columns="columns"
      :loading="status === 'pending'"
    >
      <template #sessao-cell="{ row }">
        <span class="font-medium">{{ row.original.siglaTipoSessao }} {{ row.original.numeroSessao }}</span>
        <span class="text-muted text-xs block">
          <NuxtTime
            v-if="row.original.dataSessao"
            :datetime="row.original.dataSessao"
            year="numeric"
            month="2-digit"
            day="2-digit"
          />
          • {{ row.original.casaSessao }}
        </span>
      </template>

      <template #processo-cell="{ row }">
        <NuxtLink
          v-if="row.original.idProcesso"
          :to="`/senado/processos/${row.original.idProcesso}`"
          class="text-primary hover:underline font-medium"
        >
          {{ row.original.identificacao }}
        </NuxtLink>
        <span
          v-else
          class="text-muted text-sm"
        >—</span>
        <span class="text-muted text-xs block line-clamp-1">
          {{ row.original.ementa }}
        </span>
      </template>

      <template #resultadoVotacao-cell="{ row }">
        <UBadge
          :color="row.original.resultadoVotacao?.toLowerCase().includes('rejeit') ? 'error' : row.original.resultadoVotacao?.toLowerCase().includes('aprov') ? 'success' : 'neutral'"
          variant="subtle"
        >
          {{ row.original.resultadoVotacao ?? '—' }}
        </UBadge>
      </template>

      <template #votos-cell="{ row }">
        <div class="flex gap-1.5 text-sm">
          <UBadge
            color="success"
            variant="outline"
          >
            {{ row.original.totalVotosSim ?? 0 }} Sim
          </UBadge>
          <UBadge
            color="error"
            variant="outline"
          >
            {{ row.original.totalVotosNao ?? 0 }} Não
          </UBadge>
          <UBadge
            color="neutral"
            variant="outline"
          >
            {{ row.original.totalVotosAbstencao ?? 0 }} Ab.
          </UBadge>
        </div>
      </template>
    </UTable>
  </div>
</template>
