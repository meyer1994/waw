<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { asArray } from '~~/shared/senado'
import type { ComissaoMembro, ComissaoMembroDoc } from '#shared/api-senado'

const route = useRoute()
const sid = route.params.sid as string

const somenteAtivos = ref(false)

const { data, status } = await useFetch<ComissaoMembroDoc>(`/api/senado/senador/${sid}/comissoes.json`, {
  query: computed(() => ({ ativo: somenteAtivos.value || undefined }))
})

const comissoes = computed(() => asArray(data.value?.MembroComissaoParlamentar?.Parlamentar?.MembroComissoes?.Comissao))

const columns: TableColumn<ComissaoMembro>[] = [
  { id: 'sigla', header: 'Sigla' },
  { id: 'nome', header: 'Comissão' },
  { id: 'casa', header: 'Casa' },
  { accessorKey: 'DescricaoParticipacao', header: 'Participação' },
  { accessorKey: 'DataInicio', header: 'Início' }
]
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">
      Comissões
    </h2>

    <div class="flex items-center gap-2 mb-4">
      <USwitch v-model="somenteAtivos" />
      <span class="text-sm text-muted">Somente em exercício</span>
    </div>

    <UTable
      :data="comissoes"
      :columns="columns"
      :loading="status === 'pending'"
    >
      <template #sigla-cell="{ row }">
        <span class="font-medium">{{ row.original.IdentificacaoComissao.SiglaComissao }}</span>
      </template>

      <template #nome-cell="{ row }">
        <NuxtLink
          :to="`/senado/comissao/${row.original.IdentificacaoComissao.CodigoComissao}`"
          class="text-sm text-primary hover:underline"
        >
          {{ row.original.IdentificacaoComissao.NomeComissao }}
        </NuxtLink>
      </template>

      <template #casa-cell="{ row }">
        <span class="text-muted text-sm">{{ row.original.IdentificacaoComissao.SiglaCasaComissao ?? '—' }}</span>
      </template>

      <template #DataInicio-cell="{ row }">
        <NuxtTime
          v-if="row.original.DataInicio"
          :datetime="row.original.DataInicio"
          year="numeric"
          month="2-digit"
          day="2-digit"
        />
        <span
          v-else
          class="text-muted"
        >—</span>
      </template>
    </UTable>
  </div>
</template>
