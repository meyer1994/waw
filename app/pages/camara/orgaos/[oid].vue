<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'

const route = useRoute()
const oid = route.params.oid as string

const { data: orgao } = await useFetch(`/api/orgaos/${oid}`)

useHead(() => ({ title: orgao.value?.sigla ?? 'Órgão' }))
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-1">
      {{ orgao?.sigla }}
    </h1>
    <p class="text-muted text-sm mb-6">
      {{ orgao?.nome }} • {{ orgao?.tipoOrgao }}
    </p>

    <UTabs
      default-value="detalhes"
      :items="([
        { label: 'Detalhes', value: 'detalhes' },
        { label: 'Membros', value: 'membros' },
        { label: 'Eventos', value: 'eventos' },
        { label: 'Votações', value: 'votacoes' }
      ] satisfies TabsItem[])"
      @update:model-value="async e => await navigateTo(e === 'detalhes' ? `/camara/orgaos/${oid}` : `/camara/orgaos/${oid}/${e}`)"
    >
      <template #content>
        <NuxtPage />
      </template>
    </UTabs>
  </div>
</template>
