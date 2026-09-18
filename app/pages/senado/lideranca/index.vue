<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { PARTY_FLAGS } from '~~/shared/constants'
import type { Lideranca } from '#shared/api-senado'

const casa = ref<string>()
const busca = ref('')

const { data, status } = await useFetch<Lideranca[]>('/api/senado/composicao/lideranca.json', {
  query: computed(() => ({ casa: casa.value || undefined }))
})

const liderancas = computed(() => {
  const lista = data.value ?? []
  const q = busca.value.trim().toLowerCase()
  if (!q) return lista
  return lista.filter(l =>
    l.nomeParlamentar?.toLowerCase().includes(q)
    || l.siglaPartidoFiliacao?.toLowerCase().includes(q)
    || l.descricaoTipoLideranca?.toLowerCase().includes(q)
  )
})

const columns: TableColumn<Lideranca>[] = [
  { accessorKey: 'nomeParlamentar', header: 'Líder' },
  { id: 'partido', header: 'Partido' },
  { accessorKey: 'descricaoTipoLideranca', header: 'Liderança' },
  { accessorKey: 'descricaoTipoUnidadeLideranca', header: 'Unidade' },
  { accessorKey: 'casa', header: 'Casa' }
]

useHead(() => ({ title: 'Lideranças' }))
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">
      Lideranças
    </h1>

    <UForm
      :disabled="status === 'pending'"
      class="flex gap-3 mb-4"
    >
      <UInput
        v-model="busca"
        icon="i-lucide-search"
        placeholder="Buscar líder..."
        class="w-72"
      />

      <USelectMenu
        v-model="casa"
        value-key="value"
        :items="[
          { label: 'Senado', value: 'SF' },
          { label: 'Câmara', value: 'CD' },
          { label: 'Congresso', value: 'CN' }
        ]"
        clear
        placeholder="Todas as casas"
      />
    </UForm>

    <UTable
      :data="liderancas"
      :columns="columns"
      :loading="status === 'pending'"
    >
      <template #nomeParlamentar-cell="{ row }">
        <NuxtLink
          v-if="row.original.codigoParlamentar"
          :to="`/senado/senadores/${row.original.codigoParlamentar}`"
          class="text-primary hover:underline font-medium"
        >
          {{ row.original.nomeParlamentar }}
        </NuxtLink>
        <span
          v-else
          class="font-medium"
        >{{ row.original.nomeParlamentar }}</span>
      </template>

      <template #partido-cell="{ row }">
        <span class="flex items-center gap-1.5">
          <NuxtImg
            v-if="row.original.siglaPartidoFiliacao && PARTY_FLAGS[row.original.siglaPartidoFiliacao]"
            :src="PARTY_FLAGS[row.original.siglaPartidoFiliacao]"
            alt=""
            class="w-5 h-3.5 rounded-[2px] object-cover"
          />
          {{ row.original.siglaPartidoFiliacao ?? '—' }}
        </span>
      </template>

      <template #casa-cell="{ row }">
        <UBadge variant="subtle">
          {{ row.original.casa ?? '—' }}
        </UBadge>
      </template>
    </UTable>
  </div>
</template>
