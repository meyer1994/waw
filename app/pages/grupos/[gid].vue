<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'

const route = useRoute()
const gid = route.params.gid as string

const { data: grupo } = await useFetch(`/api/grupos/${gid}`)

useHead(() => ({ title: grupo.value?.nome ?? 'Grupo' }))
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-1">
      {{ grupo?.nome }}
    </h1>
    <p class="text-muted text-sm mb-6">
      {{ grupo?.anoCriacao ?? '—' }} • {{ grupo?.ativo === 'S' ? 'Ativo' : 'Inativo' }}
    </p>

    <UTabs
      default-value="detalhes"
      :items="([
        { label: 'Detalhes', value: 'detalhes' },
        { label: 'Membros', value: 'membros' },
        { label: 'Histórico', value: 'historico' }
      ] satisfies TabsItem[])"
      @update:model-value="async e => await navigateTo(e === 'detalhes' ? `/grupos/${gid}` : `/grupos/${gid}/${e}`)"
    >
      <template #content>
        <NuxtPage />
      </template>
    </UTabs>
  </div>
</template>
