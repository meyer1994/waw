<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'

const route = useRoute()
const fid = route.params.fid as string

const { data: frente } = await useFetch(`/api/frentes/${fid}`)

useHead(() => ({ title: frente.value?.titulo ?? 'Frente' }))
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-1">
      {{ frente?.titulo }}
    </h1>
    <p class="text-muted text-sm mb-6">
      Legislatura {{ frente?.idLegislatura }} • {{ frente?.situacao ?? '—' }} • Coordenador: {{ frente?.coordenador ?? '—' }}
    </p>

    <UTabs
      default-value="detalhes"
      :items="([
        { label: 'Detalhes', value: 'detalhes' },
        { label: 'Membros', value: 'membros' }
      ] satisfies TabsItem[])"
      @update:model-value="async e => await navigateTo(e === 'detalhes' ? `/camara/frentes/${fid}` : `/camara/frentes/${fid}/${e}`)"
    >
      <template #content>
        <NuxtPage />
      </template>
    </UTabs>
  </div>
</template>
