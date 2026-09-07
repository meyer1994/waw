<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'

const route = useRoute()
const lid = route.params.lid as string

const { data: legislatura } = await useFetch(`/api/legislaturas/${lid}`)

useHead(() => ({ title: `${legislatura.value?.id ?? ''}ª Legislatura` }))
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-1">
      {{ legislatura?.id }}ª Legislatura
    </h1>
    <p class="text-muted text-sm mb-6">
      <NuxtTime
        v-if="legislatura?.dataInicio"
        :datetime="legislatura.dataInicio"
        locale="pt-BR"
        year="numeric"
        month="long"
        day="numeric"
      />
      –
      <NuxtTime
        v-if="legislatura?.dataFim"
        :datetime="legislatura.dataFim"
        locale="pt-BR"
        year="numeric"
        month="long"
        day="numeric"
      />
      <span v-else>atual</span>
    </p>

    <UTabs
      default-value="detalhes"
      :items="([
        { label: 'Detalhes', value: 'detalhes' },
        { label: 'Mesa', value: 'mesa' },
        { label: 'Líderes', value: 'lideres' }
      ] satisfies TabsItem[])"
      @update:model-value="async e => await navigateTo(e === 'detalhes' ? `/legislaturas/${lid}` : `/legislaturas/${lid}/${e}`)"
    >
      <template #content>
        <NuxtPage />
      </template>
    </UTabs>
  </div>
</template>
