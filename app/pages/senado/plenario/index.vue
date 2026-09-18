<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { asArray } from '~~/shared/senado'
import type { AgendaPlenarioDoc, SessaoAgenda } from '#shared/api-senado'

const hoje = new Date()
const data = ref(hoje.toISOString().slice(0, 10)) // yyyy-mm-dd

const url = computed(() => {
  const compact = data.value.replaceAll('-', '')
  return `/api/senado/plenario/agenda/dia/${compact}.json`
})

const { data: agenda, status, refresh } = await useFetch<AgendaPlenarioDoc>(url, { watch: false })

const sessoes = computed(() => asArray(agenda.value?.AgendaPlenario?.Sessoes?.Sessao))

const columns: TableColumn<SessaoAgenda>[] = [
  { accessorKey: 'Data', header: 'Data' },
  { id: 'sessao', header: 'Sessão' },
  { accessorKey: 'TipoSessao', header: 'Tipo' },
  { accessorKey: 'LocalSessao', header: 'Local' },
  { accessorKey: 'SituacaoSessao', header: 'Situação' }
]

useHead(() => ({ title: 'Plenário — Agenda' }))
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">
      Plenário — Agenda
    </h1>

    <UForm
      :disabled="status === 'pending'"
      class="flex gap-3 items-center mb-4"
    >
      <UInput
        v-model="data"
        type="date"
        class="w-44"
        aria-label="Data"
      />
      <UButton
        icon="i-lucide-refresh-cw"
        :loading="status === 'pending'"
        @click="refresh()"
      >
        Buscar
      </UButton>
    </UForm>

    <UTable
      :data="sessoes"
      :columns="columns"
      :loading="status === 'pending'"
    >
      <template #sessao-cell="{ row }">
        <NuxtLink
          :to="`/senado/plenario/${row.original.CodigoSessao}`"
          class="text-primary hover:underline font-medium"
        >
          {{ row.original.NumeroSessao?.trim() || 'Sessão' }}
        </NuxtLink>
        <span class="text-muted text-xs block">
          {{ row.original.Casa }} • Legislatura {{ row.original.Legislatura }}
        </span>
      </template>

      <template #Data-cell="{ row }">
        <NuxtTime
          :datetime="row.original.Data ?? ''"
          year="numeric"
          month="2-digit"
          day="2-digit"
        />
      </template>

      <template #SituacaoSessao-cell="{ row }">
        <UBadge
          :color="row.original.SituacaoSessao === 'Encerrada' ? 'neutral' : 'success'"
          variant="subtle"
        >
          {{ row.original.SituacaoSessao ?? '—' }}
        </UBadge>
      </template>
    </UTable>
  </div>
</template>
