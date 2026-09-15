<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()
const pid = route.params.pid as string
const parent = `/camara/proposicoes/${pid}`
const detalhesVisivel = computed(() => route.path === parent)

const items: NavigationMenuItem[] = [
  { label: 'Tramitações', icon: 'i-lucide-git-branch', to: `${parent}/tramitacoes` },
  { label: 'Autores', icon: 'i-lucide-pen-line', to: `${parent}/autores` },
  { label: 'Temas', icon: 'i-lucide-tags', to: `${parent}/temas` },
  { label: 'Relacionadas', icon: 'i-lucide-link', to: `${parent}/relacionadas` },
  { label: 'Votações', icon: 'i-lucide-check-check', to: `${parent}/votacoes` }
]

const { data: proposicao } = await useFetch(`/api/proposicoes/${pid}`)

const titulo = computed(() => proposicao.value
  ? `${proposicao.value.siglaTipo} ${proposicao.value.numero}/${proposicao.value.ano}`
  : 'Proposição')

const formatDataHora = (dataHora: string | null) => {
  if (!dataHora)
    return '—'
  return new Date(`${dataHora.slice(0, 10)}T${dataHora.slice(11, 16)}:00`).toLocaleString('pt-BR')
}

useHead(() => ({ title: titulo.value }))
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-1">
      {{ titulo }}
    </h1>
    <p class="text-muted text-sm mb-6">
      {{ proposicao?.descricaoTipo }} • Apresentada em
      <NuxtTime
        v-if="proposicao?.dataApresentacao"
        :datetime="proposicao.dataApresentacao.slice(0, 10)"
        locale="pt-BR"
        year="numeric"
        month="long"
        day="numeric"
      />
    </p>

    <div v-if="detalhesVisivel">
      <UCard
        v-if="proposicao"
        class="mb-6"
      >
        <h2 class="font-semibold mb-2">
          Ementa
        </h2>
        <p class="text-sm">
          {{ proposicao.ementa }}
        </p>
        <p
          v-if="proposicao.ementaDetalhada"
          class="text-muted text-sm mt-2"
        >
          {{ proposicao.ementaDetalhada }}
        </p>
      </UCard>

      <UCard
        v-if="proposicao?.statusProposicao"
        class="mb-6"
      >
        <h2 class="font-semibold mb-2">
          Situação
        </h2>
        <dl class="grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt class="text-muted">
              Órgão
            </dt>
            <dd>{{ proposicao.statusProposicao.siglaOrgao ?? '—' }}</dd>
          </div>
          <div>
            <dt class="text-muted">
              Situação
            </dt>
            <dd>{{ proposicao.statusProposicao.descricaoSituacao ?? '—' }}</dd>
          </div>
          <div>
            <dt class="text-muted">
              Tramitação
            </dt>
            <dd>{{ proposicao.statusProposicao.descricaoTramitacao ?? '—' }}</dd>
          </div>
          <div>
            <dt class="text-muted">
              Regime
            </dt>
            <dd>{{ proposicao.statusProposicao.regime ?? '—' }}</dd>
          </div>
          <div>
            <dt class="text-muted">
              Atualizada em
            </dt>
            <dd>{{ formatDataHora(proposicao.statusProposicao.dataHora) }}</dd>
          </div>
        </dl>
      </UCard>

      <UButton
        v-if="proposicao?.urlInteiroTeor"
        :to="proposicao.urlInteiroTeor"
        target="_blank"
        icon="i-lucide-file-text"
        variant="outline"
        class="mb-6"
      >
        Inteiro teor
      </UButton>
    </div>

    <UNavigationMenu
      :items="items"
      class="mb-6"
    />

    <NuxtPage />
  </div>
</template>
