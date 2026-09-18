<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { ProcessoListItem } from '#shared/api-senado'

interface SiglaItem { sigla: string, descricao: string }

const termo = ref('')
const sigla = ref<string>()
const ano = ref('')
const tramitando = ref(false)

const debTermo = debouncedRef(termo, 500)
const { data, status } = await useFetch<ProcessoListItem[]>('/api/senado/processo.json', {
  query: computed(() => ({
    termo: debTermo.value || undefined,
    sigla: sigla.value,
    ano: ano.value || undefined,
    tramitando: tramitando.value || undefined
  }))
})

const { data: siglasData } = await useFetch<SiglaItem[]>('/api/senado/processo/siglas.json')
const siglaItems = computed(() =>
  (siglasData.value ?? []).map(s => ({ label: `${s.sigla} — ${s.descricao}`, value: s.sigla }))
)
// lista grande: manter as siglas mais relevantes no topo
const siglaOrdenadas = computed(() =>
  [...siglaItems.value].sort((a, b) => (marcada(a.value) ? -1 : 1) - (marcada(b.value) ? -1 : 1))
)

const RECENTES = new Set(['PL', 'PLP', 'PEC', 'MPV', 'PDS', 'PRS', 'PDL', 'PDC', 'MSG', 'PLS', 'PLC', 'PLN'])
const marcada = (s: string) => RECENTES.has(s)

const columns: TableColumn<ProcessoListItem>[] = [
  { id: 'processo', header: 'Processo' },
  { accessorKey: 'tipoDocumento', header: 'Tipo' },
  { id: 'ementa', header: 'Ementa' },
  { accessorKey: 'autoria', header: 'Autoria' },
  { accessorKey: 'situacaoAtual', header: 'Situação' },
  { accessorKey: 'dataApresentacao', header: 'Apresentação' },
  { id: 'tramitando', header: 'Tramitação' }
]

useHead(() => ({ title: 'Processos' }))
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">
      Processos Legislativos
    </h1>

    <UForm
      :disabled="status === 'pending'"
      class="flex gap-3 mb-4 flex-wrap"
    >
      <UInput
        v-model="termo"
        icon="i-lucide-search"
        placeholder="Buscar por termo, autor, ementa..."
        class="w-72"
      />

      <USelectMenu
        v-model="sigla"
        value-key="value"
        :items="siglaOrdenadas"
        searchable
        clear
        placeholder="Todas as siglas"
        class="w-72"
      />

      <UInput
        v-model="ano"
        type="number"
        placeholder="Ano"
        class="w-28"
      />

      <USwitch
        v-model="tramitando"
        label="Em tramitação"
      />
    </UForm>

    <UTable
      :data="data ?? []"
      :columns="columns"
      :loading="status === 'pending'"
    >
      <template #processo-cell="{ row }">
        <NuxtLink :to="`/senado/processos/${row.original.id}`">
          <span class="text-primary hover:underline font-medium">{{ row.original.identificacao }}</span>
        </NuxtLink>
      </template>

      <template #ementa-cell="{ row }">
        <span class="text-muted text-sm line-clamp-2">{{ row.original.ementa }}</span>
      </template>

      <template #situacaoAtual-cell="{ row }">
        <span class="text-muted text-sm">{{ row.original.situacaoAtual ?? '—' }}</span>
      </template>

      <template #dataApresentacao-cell="{ row }">
        <NuxtTime
          v-if="row.original.dataApresentacao"
          :datetime="row.original.dataApresentacao.slice(0, 10)"
          year="numeric"
          month="2-digit"
          day="2-digit"
        />
        <span
          v-else
          class="text-muted"
        >—</span>
      </template>

      <template #tramitando-cell="{ row }">
        <UBadge
          :color="row.original.tramitando === 'Sim' ? 'success' : 'neutral'"
          variant="subtle"
        >
          {{ row.original.tramitando === 'Sim' ? 'Sim' : 'Não' }}
        </UBadge>
      </template>
    </UTable>
  </div>
</template>
