<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'

const route = useRoute()
const vid = route.params.vid as string

const { data: votacao } = await useFetch(`/api/votacoes/${vid}`)

useHead(() => ({ title: votacao.value ? `Votação ${votacao.value.id}` : 'Votação' }))
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-1">
      Votação {{ votacao?.id }}
    </h1>
    <p class="text-muted text-sm mb-6">
      {{ votacao?.siglaOrgao }} •
      <NuxtTime
        v-if="votacao?.data"
        :datetime="votacao.data.slice(0, 10)"
        locale="pt-BR"
        year="numeric"
        month="long"
        day="numeric"
      />
      •
      <UBadge
        v-if="votacao?.aprovacao !== null"
        :color="votacao?.aprovacao === 1 ? 'success' : 'error'"
        variant="soft"
      >
        {{ votacao?.aprovacao === 1 ? 'Aprovada' : 'Rejeitada' }}
      </UBadge>
    </p>

    <UTabs
      default-value="detalhes"
      :items="([
        { label: 'Detalhes', value: 'detalhes' },
        { label: 'Votos', value: 'votos' },
        { label: 'Orientações', value: 'orientacoes' }
      ] satisfies TabsItem[])"
      @update:model-value="async e => await navigateTo(e === 'detalhes' ? `/votacoes/${vid}` : `/votacoes/${vid}/${e}`)"
    >
      <template #content>
        <NuxtPage />
      </template>
    </UTabs>
  </div>
</template>
