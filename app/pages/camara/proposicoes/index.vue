<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { CamaraLista, Proposicao } from '#shared/api'
import { COD_TEMA, SIGLA_TIPO } from '~~/shared/constants'

const siglaTipo = ref('all')
const numero = ref('')
const ano = ref('all')
const keywords = ref('')
const codTema = ref('all')
const dataApresentacaoInicio = ref('')
const dataApresentacaoFim = ref('')

const debKeywords = debouncedRef(keywords, 500)
const { data, status } = await useFetch<CamaraLista<Proposicao>>('/api/camara/proposicoes', {
  query: computed(() => ({
    siglaTipo: siglaTipo.value === 'all' ? undefined : siglaTipo.value,
    numero: numero.value || undefined,
    ano: ano.value === 'all' ? undefined : ano.value,
    keywords: debKeywords.value || undefined,
    codTema: codTema.value === 'all' ? undefined : codTema.value,
    dataApresentacaoInicio: dataApresentacaoInicio.value || undefined,
    dataApresentacaoFim: dataApresentacaoFim.value || undefined
  }))
})

const tipoItems = [
  { label: 'Todos os tipos', value: 'all' },
  ...SIGLA_TIPO.map(tipo => ({ label: tipo, value: tipo }))
]

const temaItems = [
  { label: 'Todos os temas', value: 'all' },
  ...Object.entries(COD_TEMA).map(([cod, tema]) => ({ label: tema, value: cod }))
]

const anoItems = [
  { label: 'Ano', value: 'all' },
  ...Array.from({ length: new Date().getFullYear() - 1987 }, (_, i) => ({ label: String(new Date().getFullYear() - i), value: String(new Date().getFullYear() - i) }))
]

const columns: TableColumn<Proposicao>[] = [
  { id: 'proposicao', header: 'Proposição' },
  { id: 'data', header: 'Apresentação' },
  { id: 'ementa', header: 'Ementa' }
]

useHead(() => ({ title: 'Proposições' }))
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">
      Proposições
    </h1>

    <UForm
      :disabled="status === 'pending'"
      class="flex flex-wrap gap-3 mb-4"
    >
      <USelectMenu
        v-model="siglaTipo"
        value-key="value"
        :items="tipoItems"
        clear
        searchable
        placeholder="Tipo"
      />

      <UInput
        v-model="numero"
        type="number"
        placeholder="Número"
      />

      <USelectMenu
        v-model="ano"
        value-key="value"
        :items="anoItems"
        clear
        searchable
        placeholder="Ano"
      />

      <UInput
        v-model="keywords"
        icon="i-lucide-search"
        placeholder="Buscar na ementa..."
      />

      <USelectMenu
        v-model="codTema"
        value-key="value"
        :items="temaItems"
        searchable
        clear
        placeholder="Tema"
      />

      <UInput
        v-model="dataApresentacaoInicio"
        type="date"
      />

      <UInput
        v-model="dataApresentacaoFim"
        type="date"
      />
    </UForm>

    <UTable
      :data="data?.dados ?? []"
      :columns="columns"
      :loading="status === 'pending'"
    >
      <template #proposicao-cell="{ row }">
        <NuxtLink :to="`/camara/proposicoes/${row.original.id}`">
          <span class="text-primary hover:underline font-medium">
            {{ row.original.siglaTipo }} {{ row.original.numero }}/{{ row.original.ano }}
          </span>
        </NuxtLink>
      </template>

      <template #data-cell="{ row }">
        <NuxtTime
          v-if="row.original.dataApresentacao"
          :datetime="row.original.dataApresentacao.slice(0, 10)"
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

      <template #ementa-cell="{ row }">
        <span class="text-muted text-sm line-clamp-2">{{ row.original.ementa }}</span>
      </template>
    </UTable>
  </div>
</template>
