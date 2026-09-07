<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'

const route = useRoute()
const bid = route.params.bid as string

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

    <UTabs
      default-value="detalhes"
      :items="([
        { label: 'Detalhes', value: 'detalhes' },
        { label: 'Partidos', value: 'partidos' }
      ] satisfies TabsItem[])"
      @update:model-value="async e => await navigateTo(e === 'detalhes' ? `/blocos/${bid}` : `/blocos/${bid}/${e}`)"
    >
      <template #content>
        <NuxtPage />
      </template>
    </UTabs>
  </div>
</template>
