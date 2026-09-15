<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()
const bid = route.params.bid as string
const parent = `/camara/blocos/${bid}`
const detalhesVisivel = computed(() => route.path === parent)

const items: NavigationMenuItem[] = [
  { label: 'Partidos', icon: 'i-lucide-flag', to: `${parent}/partidos` }
]

const { data: bloco } = await useFetch(`/api/blocos/${bid}`)

useHead(() => ({ title: bloco.value?.nome ?? 'Bloco' }))
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-1">
      {{ bloco?.nome }}
    </h1>
    <p class="text-muted text-sm mb-6">
      Legislatura {{ bloco?.idLegislatura ?? '—' }}
    </p>

    <div
      v-if="detalhesVisivel && bloco"
      class="mb-6"
    >
      <UCard>
        <dl class="grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt class="text-muted">
              Nome
            </dt>
            <dd>{{ bloco.nome }}</dd>
          </div>
          <div>
            <dt class="text-muted">
              Legislatura
            </dt>
            <dd>{{ bloco.idLegislatura ?? '—' }}</dd>
          </div>
          <div>
            <dt class="text-muted">
              Federação
            </dt>
            <dd>{{ bloco.federacao === 'S' ? 'Sim' : bloco.federacao === 'N' ? 'Não' : '—' }}</dd>
          </div>
        </dl>
      </UCard>
    </div>

    <UNavigationMenu
      :items="items"
      class="mb-6"
    />

    <NuxtPage />
  </div>
</template>
