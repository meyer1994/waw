<script setup lang="ts">
import { asArray } from '~~/shared/senado'
import type { ResumoEncontroDoc } from '#shared/api-senado'

const route = useRoute()
const eid = route.params.eid as string

const { data, status } = await useFetch<ResumoEncontroDoc>(`/api/senado/plenario/encontro/${eid}/resumo.json`)
const encontro = computed(() => asArray(data.value?.ServicoPlenario?.encontros?.encontro)[0])

const linhas = computed<[string, string][]>(() => {
  const e = encontro.value
  if (!e) return []
  return [
    ['Data prevista', e.dataPrevista ?? '—'],
    ['Local', e.local ?? '—'],
    ['Presidente', e.presidenteAtual ?? '—'],
    ['Legislatura', e.sessaoLegislativa?.numeroLegislatura ?? '—'],
    ['Sessão legislativa', e.sessaoLegislativa?.descricao ?? '—'],
    ['Início', e.sessaoLegislativa?.dataInicio ?? '—'],
    ['Fim', e.sessaoLegislativa?.dataFim ?? '—']
  ]
})
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">
      Resumo
    </h2>

    <div
      v-if="encontro"
      class="mb-6"
    >
      <UCard>
        <dl class="grid grid-cols-2 gap-4 text-sm">
          <div
            v-for="[label, value] in linhas"
            :key="label"
          >
            <dt class="text-muted">
              {{ label }}
            </dt>
            <dd>{{ value }}</dd>
          </div>
        </dl>
      </UCard>
    </div>

    <div
      v-if="!encontro && status !== 'pending'"
      class="text-muted text-sm"
    >
      Sem resumo disponível.
    </div>

    <USkeleton
      v-if="status === 'pending'"
      class="h-40"
    />
  </div>
</template>
