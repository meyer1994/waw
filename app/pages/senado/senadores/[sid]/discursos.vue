<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { pronunciamentosSchema } from '~~/shared/schemas'
import { asArray } from '~~/shared/senado'
import type { PronunciamientoDoc, Pronunciamento } from '#shared/api-senado'

const route = useRoute()
const sid = route.params.sid as string

const casa = ref<string>()
const dataInicio = ref('')
const dataFim = ref('')

const { data, status } = await useFetch<PronunciamientoDoc>(`/api/senado/senador/${sid}/discursos.json`, {
  query: computed(() => ({
    casa: casa.value,
    dataInicio: dataInicio.value || undefined,
    dataFim: dataFim.value || undefined
  }))
})

const discursos = computed(() => asArray(data.value?.DiscursosParlamentar?.Parlamentar?.Pronunciamentos?.Pronunciamento))

const columns: TableColumn<Pronunciamento>[] = [
  { accessorKey: 'DataPronunciamento', header: 'Data' },
  { id: 'tipo', header: 'Tipo' },
  { id: 'sessao', header: 'Sessão' },
  { id: 'resumo', header: 'Resumo' }
]
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">
      Discursos
    </h2>

    <UForm
      :schema="pronunciamentosSchema"
      :disabled="status === 'pending'"
      class="flex gap-3 mb-4"
    >
      <USelectMenu
        v-model="casa"
        value-key="value"
        :items="[
          { label: 'Senado', value: 'SF' },
          { label: 'Câmara', value: 'CD' },
          { label: 'Congresso', value: 'CN' },
          { label: 'Presidência', value: 'PR' }
        ]"
        clear
        placeholder="Todas as casas"
      />

      <UInput
        v-model="dataInicio"
        type="date"
      />

      <UInput
        v-model="dataFim"
        type="date"
      />
    </UForm>

    <UTable
      :data="discursos"
      :columns="columns"
      :loading="status === 'pending'"
    >
      <template #DataPronunciamento-cell="{ row }">
        <NuxtTime
          v-if="row.original.DataPronunciamento"
          :datetime="row.original.DataPronunciamento"
          year="numeric"
          month="2-digit"
          day="2-digit"
        />
        <span
          v-else
          class="text-muted"
        >—</span>
      </template>

      <template #tipo-cell="{ row }">
        <span class="text-sm">{{ row.original.TipoUsoPalavra?.Descricao ?? 'Discurso' }}</span>
      </template>

      <template #sessao-cell="{ row }">
        <span class="text-muted text-sm">
          {{ row.original.SessaoPlenaria?.SiglaTipoSessao }} {{ row.original.SessaoPlenaria?.NumeroSessao }}
        </span>
      </template>

      <template #resumo-cell="{ row }">
        <NuxtLink
          v-if="row.original.UrlTexto"
          :to="row.original.UrlTexto"
          target="_blank"
          class="text-muted text-sm line-clamp-2 hover:underline"
        >
          {{ row.original.TextoResumo }}
        </NuxtLink>
        <span
          v-else
          class="text-muted text-sm line-clamp-2"
        >{{ row.original.TextoResumo ?? '—' }}</span>
      </template>
    </UTable>
  </div>
</template>
