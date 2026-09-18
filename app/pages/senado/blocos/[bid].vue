<script setup lang="ts">
import { PARTY_FLAGS } from '~~/shared/constants'
import { asArray } from '~~/shared/senado'
import type { BlocoDetalhe, BlocoDetalheDoc } from '#shared/api-senado'

const route = useRoute()
const bid = route.params.bid as string

const { data } = await useFetch<BlocoDetalheDoc>(`/api/senado/composicao/bloco/${bid}.json`)
const bloco = computed(() => asArray(data.value?.blocos?.bloco)[0] as BlocoDetalhe | undefined)
const composicao = computed(() => asArray(bloco.value?.composicaoBloco?.composicao_bloco))

const linhas = computed<[string, string][]>(() => {
  const b = bloco.value
  if (!b) return []
  return [
    ['Sigla', b.siglaCasa ?? '—'],
    ['Apelido', b.nomeApelidoBloco ?? '—'],
    ['Criação', b.dataCriacao ?? '—']
  ]
})

useHead(() => ({ title: bloco.value?.nomeBloco ?? `Bloco ${bid}` }))
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-1">
      {{ bloco?.nomeBloco }}
    </h1>
    <p class="text-muted text-sm mb-6">
      {{ bloco?.nomeApelidoBloco }} • {{ bloco?.siglaCasa }}
    </p>

    <div
      v-if="bloco"
      class="mb-6"
    >
      <UCard>
        <dl class="grid grid-cols-3 gap-4 text-sm">
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
      v-if="composicao.length"
      class="mb-6"
    >
      <h2 class="text-lg font-semibold mb-3">
        Composição ({{ composicao.length }} partidos)
      </h2>
      <UCard>
        <ul class="divide-y divide-(--ui-border) text-sm">
          <li
            v-for="c in composicao"
            :key="c.id ?? c.idPartido"
            class="py-2 flex items-center justify-between gap-4"
          >
            <span class="flex items-center gap-2">
              <NuxtImg
                v-if="c.partido?.siglaPartido && PARTY_FLAGS[c.partido.siglaPartido]"
                :src="PARTY_FLAGS[c.partido.siglaPartido]"
                alt=""
                class="w-5 h-3.5 rounded-[2px] object-cover"
              />
              <span class="font-medium">{{ c.partido?.siglaPartido }}</span>
              <span class="text-muted">{{ c.partido?.nomePartido }}</span>
            </span>
            <span class="text-muted text-xs">
              Adesão: {{ c.dataAdesao ?? '—' }}
            </span>
          </li>
        </ul>
      </UCard>
    </div>
  </div>
</template>
