<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { asArray } from '~~/shared/senado'
import type { ApartesDoc, Pronunciamento } from '#shared/api-senado'

const route = useRoute()
const sid = route.params.sid as string

const { data, status } = await useFetch<ApartesDoc>(`/api/senado/senador/${sid}/apartes.json`)
const apartes = computed(() => asArray(data.value?.ApartesParlamentar?.Parlamentar?.Apartes?.Aparte))

const columns: TableColumn<Pronunciamento>[] = [
  { accessorKey: 'DataPronunciamento', header: 'Data' },
  { accessorKey: 'SiglaCasaPronunciamento', header: 'Casa' },
  { id: 'sessao', header: 'Sessão' },
  { id: 'resumo', header: 'Resumo' }
]
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">
      Apartes
    </h2>

    <UTable
      :data="apartes"
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
