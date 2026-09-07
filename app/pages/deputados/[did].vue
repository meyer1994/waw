<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'
import type { DeputadoDetalhado } from '~~/server/api/deputados/[did]/index.get'

const route = useRoute()
const did = route.params.did as string

const { data } = await useFetch<DeputadoDetalhado>(`/api/deputados/${did}`)
const deputado = computed(() => data.value?.deputado)
</script>

<template>
  <div>
    <div class="flex items-center gap-4 mb-8">
      <UAvatar
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

    <UTabs
      :items="([
        { label: 'Proposições', value: 'proposicoes' },
        { label: 'Discursos', value: 'discursos' },
        { label: 'Despesas', value: 'despesas' },
        { label: 'Eventos', value: 'eventos' },
        { label: 'Órgãos', value: 'orgaos' },
        { label: 'Frentes', value: 'frentes' },
        { label: 'Histórico', value: 'historico' },
        { label: 'Ocupações', value: 'ocupacoes' },
        { label: 'Profissões', value: 'profissoes' },
        { label: 'Mandatos Externos', value: 'mandatosExternos' }
      ] satisfies TabsItem[])"
      @update:model-value="async e => await navigateTo(`/deputados/${did}/${e}`)"
    >
      <template #content>
        <NuxtPage />
      </template>
    </UTabs>
  </div>
</template>
