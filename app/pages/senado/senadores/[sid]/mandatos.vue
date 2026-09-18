<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { PARTY_FLAGS } from '~~/shared/constants'
import { asArray } from '~~/shared/senado'
import type { Mandato, MandatoDoc } from '#shared/api-senado'

const route = useRoute()
const sid = route.params.sid as string

const { data, status } = await useFetch<MandatoDoc>(`/api/senado/senador/${sid}/mandatos.json`)
const mandatos = computed(() => asArray(data.value?.MandatoParlamentar?.Parlamentar?.Mandatos?.Mandato))

// XML→JSON: 1 item vira objeto, n itens viram array
const partidosDoMandato = (mandato: Mandato): { CodigoPartido: string, Sigla?: string }[] =>
  asArray(mandato.Partidos?.Partido)

const columns: TableColumn<Mandato>[] = [
  { accessorKey: 'UfParlamentar', header: 'UF' },
  { accessorKey: 'DescricaoParticipacao', header: 'Participação' },
  { id: 'legislaturas', header: 'Legislaturas' },
  { id: 'exercicios', header: 'Exercícios' },
  { id: 'partidos', header: 'Partidos' }
]
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">
      Mandatos
    </h2>

    <UTable
      :data="mandatos"
      :columns="columns"
      :loading="status === 'pending'"
    >
      <template #UfParlamentar-cell="{ row }">
        <span class="flex items-center gap-1.5">
          <NuxtImg
            :src="`/flags/${row.original.UfParlamentar.toLowerCase()}.svg`"
            alt=""
            class="w-5 h-3.5 rounded-[2px] object-cover"
          />
          {{ row.original.UfParlamentar }}
        </span>
      </template>

      <template #legislaturas-cell="{ row }">
        <span class="text-muted text-sm">
          {{ row.original.PrimeiraLegislaturaDoMandato?.NumeroLegislatura }}
          <template v-if="row.original.SegundaLegislaturaDoMandato">
            – {{ row.original.SegundaLegislaturaDoMandato.NumeroLegislatura }}
          </template>
          ({{ row.original.PrimeiraLegislaturaDoMandato?.DataInicio }} –
          {{ row.original.SegundaLegislaturaDoMandato?.DataFim ?? row.original.PrimeiraLegislaturaDoMandato?.DataFim }})
        </span>
      </template>

      <template #exercicios-cell="{ row }">
        <span class="text-muted text-sm">
          {{ asArray(row.original.Exercicios?.Exercicio).length }} exercício(s)
        </span>
      </template>

      <template #partidos-cell="{ row }">
        <div class="flex flex-wrap gap-1">
          <UBadge
            v-for="partido in partidosDoMandato(row.original)"
            :key="partido.CodigoPartido"
            variant="subtle"
            class="flex items-center gap-1"
          >
            <NuxtImg
              v-if="partido.Sigla && PARTY_FLAGS[partido.Sigla]"
              :src="PARTY_FLAGS[partido.Sigla]"
              alt=""
              class="w-4 h-3 rounded-[1px] object-cover"
            />
            {{ partido.Sigla }}
          </UBadge>
          <span
            v-if="!row.original.Partidos?.Partido"
            class="text-muted"
          >—</span>
        </div>
      </template>
    </UTable>
  </div>
</template>
