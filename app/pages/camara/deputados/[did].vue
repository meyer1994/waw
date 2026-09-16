<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import type { CamaraDeputadoDetalhe, CamaraItem } from '#shared/api'

const did = useRoute().params.did as string
const parent = `/camara/deputados/${did}`

const items: NavigationMenuItem[] = [
  { label: 'Proposições', icon: 'i-lucide-file-text', to: `${parent}/proposicoes` },
  { label: 'Discursos', icon: 'i-lucide-mic', to: `${parent}/discursos` },
  { label: 'Despesas', icon: 'i-lucide-receipt', to: `${parent}/despesas` },
  { label: 'Eventos', icon: 'i-lucide-calendar-days', to: `${parent}/eventos` },
  { label: 'Órgãos', icon: 'i-lucide-building-2', to: `${parent}/orgaos` },
  { label: 'Frentes', icon: 'i-lucide-users', to: `${parent}/frentes` },
  { label: 'Histórico', icon: 'i-lucide-history', to: `${parent}/historico` },
  { label: 'Ocupações', icon: 'i-lucide-briefcase', to: `${parent}/ocupacoes` },
  { label: 'Profissões', icon: 'i-lucide-hammer', to: `${parent}/profissoes` },
  { label: 'Mandatos Externos', icon: 'i-lucide-globe', to: `${parent}/mandatosExternos` }
]

const { data } = await useFetch<CamaraItem<CamaraDeputadoDetalhe>>(`/api/camara/deputados/${did}`)
const deputado = computed(() => data.value?.dados)

useHead(() => ({ title: deputado.value?.ultimoStatus?.nome ?? 'Deputado' }))
</script>

<template>
  <div>
    <div class="flex items-center gap-4 mb-8">
      <UAvatar
        as="NuxtImg"
        :src="deputado?.ultimoStatus?.urlFoto"
        :alt="deputado?.ultimoStatus?.nome"
        size="3xl"
      />

      <div>
        <h1 class="text-2xl font-bold">
          {{ deputado?.ultimoStatus?.nome }}
        </h1>
        <p class="text-muted">
          {{ deputado?.nomeCivil }} • {{ deputado?.ultimoStatus?.siglaPartido }} – {{ deputado?.ultimoStatus?.siglaUf }}
        </p>
        <p class="text-sm text-muted">
          {{ deputado?.ultimoStatus?.situacao }} • {{ deputado?.ultimoStatus?.condicaoEleitoral }}
        </p>
      </div>
    </div>

    <UNavigationMenu
      :items="items"
      class="mb-6"
    />

    <NuxtPage />
  </div>
</template>
