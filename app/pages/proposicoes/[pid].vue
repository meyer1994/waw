<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'

const route = useRoute()
const pid = route.params.pid as string

const { data: proposicao } = await useFetch(`/api/proposicoes/${pid}`)

const titulo = computed(() => proposicao.value
  ? `${proposicao.value.siglaTipo} ${proposicao.value.numero}/${proposicao.value.ano}`
  : 'Proposição')

useHead(() => ({ title: titulo.value }))
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-1">
      {{ titulo }}
    </h1>
    <p class="text-muted text-sm mb-6">
      {{ proposicao?.descricaoTipo }} • Apresentada em
      <NuxtTime
        v-if="proposicao?.dataApresentacao"
        :datetime="proposicao.dataApresentacao.slice(0, 10)"
        locale="pt-BR"
        year="numeric"
        month="long"
        day="numeric"
      />
    </p>

    <UTabs
      default-value="detalhes"
      :items="([
        { label: 'Detalhes', value: 'detalhes' },
        { label: 'Tramitações', value: 'tramitacoes' },
        { label: 'Autores', value: 'autores' },
        { label: 'Temas', value: 'temas' },
        { label: 'Relacionadas', value: 'relacionadas' },
        { label: 'Votações', value: 'votacoes' }
      ] satisfies TabsItem[])"
      @update:model-value="async e => await navigateTo(e === 'detalhes' ? `/proposicoes/${pid}` : `/proposicoes/${pid}/${e}`)"
    >
      <template #content>
        <NuxtPage />
      </template>
    </UTabs>
  </div>
</template>
