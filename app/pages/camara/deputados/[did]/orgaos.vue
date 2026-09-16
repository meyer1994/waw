<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { CamaraLista, DeputadoOrgao } from '#shared/api'

const route = useRoute()
const did = route.params.did as string

const { data, status } = await useFetch<CamaraLista<DeputadoOrgao>>(`/api/camara/deputados/${did}/orgaos`)

const columns: TableColumn<DeputadoOrgao>[] = [
  { id: 'orgao', header: 'Órgão' },
  { id: 'titulo', header: 'Cargo' },
  { id: 'periodo', header: 'Período' }
]
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">
      Órgãos
    </h2>

    <UTable
      :data="data?.dados ?? []"
      :columns="columns"
      :loading="status === 'pending'"
    >
      <template #orgao-cell="{ row }">
        <div>
          <p class="font-medium">
            {{ row.original.siglaOrgao }}
          </p>
          <p class="text-muted text-sm">
            {{ row.original.nomeOrgao }}
          </p>
        </div>
      </template>

      <template #titulo-cell="{ row }">
        <span class="text-sm">{{ row.original.titulo }}</span>
      </template>

      <template #periodo-cell="{ row }">
        <span class="text-sm text-muted">
          <NuxtTime
            v-if="row.original.dataInicio"
            :datetime="row.original.dataInicio.slice(0, 10)"
            locale="pt-BR"
            year="numeric"
            month="2-digit"
            day="2-digit"
          />
          <span v-if="row.original.dataFim"> –
            <NuxtTime
              :datetime="row.original.dataFim.slice(0, 10)"
              locale="pt-BR"
              year="numeric"
              month="2-digit"
              day="2-digit"
            />
          </span>
          <span v-else> – atual</span>
        </span>
      </template>
    </UTable>
  </div>
</template>
