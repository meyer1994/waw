<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'

const route = useRoute()
const eid = route.params.eid as string

const { data: evento } = await useFetch(`/api/eventos/${eid}`)

useHead(() => ({ title: evento.value?.descricaoTipo ?? 'Evento' }))
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-1">
      {{ evento?.descricaoTipo }}
    </h1>
    <p class="text-muted text-sm mb-6">
      <NuxtTime
        v-if="evento?.dataHoraInicio"
        :datetime="evento.dataHoraInicio"
        locale="pt-BR"
        year="numeric"
        month="long"
        day="numeric"
        hour="2-digit"
        minute="2-digit"
      />
      • {{ evento?.situacao ?? '—' }}
    </p>

    <UTabs
      default-value="detalhes"
      :items="([
        { label: 'Detalhes', value: 'detalhes' },
        { label: 'Pauta', value: 'pauta' },
        { label: 'Deputados', value: 'deputados' },
        { label: 'Órgãos', value: 'orgaos' },
        { label: 'Votações', value: 'votacoes' }
      ] satisfies TabsItem[])"
      @update:model-value="async e => await navigateTo(e === 'detalhes' ? `/eventos/${eid}` : `/eventos/${eid}/${e}`)"
    >
      <template #content>
        <NuxtPage />
      </template>
    </UTabs>
  </div>
</template>
