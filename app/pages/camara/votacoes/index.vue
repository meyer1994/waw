<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { CamaraLista, Votacao } from '#shared/api'

const dataInicio = ref('')
const dataFim = ref('')

const { data, status } = await useFetch<CamaraLista<Votacao>>('/api/camara/votacoes', {
  query: computed(() => ({ dataInicio: dataInicio.value || undefined, dataFim: dataFim.value || undefined }))
})

const columns: TableColumn<Votacao>[] = [
  { id: 'data', header: 'Data' },
  { accessorKey: 'siglaOrgao', header: 'Órgão' },
  { id: 'descricao', header: 'Descrição' },
  { id: 'resultado', header: 'Resultado' }
]

useHead(() => ({ title: 'Votações' }))
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">
      Votações
    </h1>

    <UForm
      :disabled="status === 'pending'"
      class="flex gap-3 mb-4"
    >
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
      :data="data?.dados ?? []"
      :columns="columns"
      :loading="status === 'pending'"
    >
      <template #data-cell="{ row }">
        <NuxtLink :to="`/camara/votacoes/${row.original.id}`">
          <NuxtTime
            v-if="row.original.data"
            :datetime="row.original.data.slice(0, 10)"
            year="numeric"
            month="2-digit"
            day="2-digit"
          />
        </NuxtLink>
      </template>

      <template #siglaOrgao-cell="{ row }">
        <span class="font-medium">{{ row.original.siglaOrgao ?? '—' }}</span>
      </template>

      <template #descricao-cell="{ row }">
        <span class="text-muted text-sm line-clamp-2">{{ row.original.descricao }}</span>
      </template>

      <template #resultado-cell="{ row }">
        <UBadge
          v-if="row.original.aprovacao !== null"
          :color="row.original.aprovacao === 1 ? 'success' : 'error'"
          variant="soft"
          size="sm"
        >
          {{ row.original.aprovacao === 1 ? 'Aprovada' : 'Rejeitada' }}
        </UBadge>
        <span
          v-else
          class="text-muted text-sm"
        >—</span>
      </template>
    </UTable>
  </div>
</template>
