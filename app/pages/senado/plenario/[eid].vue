<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { asArray } from '~~/shared/senado'
import type { EncontroDoc } from '#shared/api-senado'

const route = useRoute()
const eid = route.params.eid as string
const parent = `/senado/plenario/${eid}`

const items: NavigationMenuItem[] = [
  { label: 'Pauta', icon: 'i-lucide-list', to: `${parent}/pauta` },
  { label: 'Resultado', icon: 'i-lucide-check-check', to: `${parent}/resultado` },
  { label: 'Resumo', icon: 'i-lucide-file-text', to: `${parent}/resumo` }
]

const { data } = await useFetch<EncontroDoc>(`/api/senado/plenario/encontro/${eid}.json`)
const encontro = computed(() => asArray(data.value?.encontros?.encontro)[0])

const linhas = computed<[string, string][]>(() => {
  const e = encontro.value
  if (!e) return []
  return [
    ['Data prevista', e.dataPrevista?.slice(0, 16).replace('T', ' ') ?? '—'],
    ['Tipo', e.tipoSessao?.nome ?? '—'],
    ['Situação', e.tipoSituacao?.nome ?? '—'],
    ['Legislatura', e.sessaoLegislativa?.numeroLegislatura ?? '—'],
    ['Sessão legislativa', e.sessaoLegislativa?.descricao ?? '—'],
    ['Local', e.local ?? '—']
  ]
})

useHead(() => ({ title: `Encontro ${eid}` }))
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-1">
      Encontro {{ encontro?.codigo ?? eid }}
    </h1>
    <p class="text-muted text-sm mb-6">
      {{ encontro?.tipoSessao?.nome }} • {{ encontro?.dataPrevista }}
    </p>

    <div
      v-if="encontro"
      class="mb-6"
    >
      <UCard>
        <dl class="grid grid-cols-2 gap-4 text-sm">
          <div
            v-for="[label, value] in linhas"
            :key="label"
          >
            <dt class="text-muted">
              {{ label }}
            </dt>
            <dd>{{ value }}</dd>
          </div>
        </dl>
      </UCard>
    </div>

    <UNavigationMenu
      :items="items"
      class="mb-6"
    />

    <NuxtPage />
  </div>
</template>
