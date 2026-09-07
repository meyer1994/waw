<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'

const route = useRoute()
const pid = route.params.pid as string

const { data: partido } = await useFetch(`/api/partidos/${pid}`)

useHead(() => ({ title: partido.value?.sigla ?? 'Partido' }))
</script>

<template>
  <div>
    <div class="flex items-center gap-4 mb-8">
      <UAvatar
        :src="partido?.urlLogo ?? undefined"
        :alt="partido?.sigla"
        :text="partido?.sigla"
        size="3xl"
      />

      <div>
        <h1 class="text-2xl font-bold">
          {{ partido?.sigla }}
        </h1>
        <p class="text-muted">
          {{ partido?.nome }} • {{ partido?.status?.situacao ?? '—' }}
        </p>
        <p class="text-sm text-muted">
          {{ partido?.status?.totalMembros ?? 0 }} deputados • Legislatura {{ partido?.status?.idLegislatura ?? '—' }}
        </p>
      </div>
    </div>

    <UTabs
      default-value="detalhes"
      :items="([
        { label: 'Detalhes', value: 'detalhes' },
        { label: 'Membros', value: 'membros' },
        { label: 'Líderes', value: 'lideres' }
      ] satisfies TabsItem[])"
      @update:model-value="async e => await navigateTo(e === 'detalhes' ? `/partidos/${pid}` : `/partidos/${pid}/${e}`)"
    >
      <template #content>
        <NuxtPage />
      </template>
    </UTabs>
  </div>
</template>
