<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import type { CamaraItem, Legislatura } from '#shared/api'

const route = useRoute()
const lid = route.params.lid as string
const parent = `/camara/legislaturas/${lid}`

const items: NavigationMenuItem[] = [
  { label: 'Mesa', icon: 'i-lucide-armchair', to: `${parent}/mesa` },
  { label: 'Líderes', icon: 'i-lucide-crown', to: `${parent}/lideres` }
]

const { data } = await useFetch<CamaraItem<Legislatura>>(`/api/camara/legislaturas/${lid}`)
const legislatura = computed(() => data.value?.dados)

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

    <div
      v-if="legislatura"
      class="mb-6"
    >
      <UCard>
        <dl class="grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt class="text-muted">
              Número
            </dt>
            <dd>{{ legislatura.id }}ª</dd>
          </div>
          <div>
            <dt class="text-muted">
              Em exercício
            </dt>
            <dd>{{ legislatura.dataFim ? 'Encerrada' : 'Em curso' }}</dd>
          </div>
          <div>
            <dt class="text-muted">
              Início
            </dt>
            <dd>
              <NuxtTime
                v-if="legislatura.dataInicio"
                :datetime="legislatura.dataInicio"
                locale="pt-BR"
                year="numeric"
                month="long"
                day="numeric"
              />
              <span v-else>—</span>
            </dd>
          </div>
          <div>
            <dt class="text-muted">
              Fim
            </dt>
            <dd>
              <NuxtTime
                v-if="legislatura.dataFim"
                :datetime="legislatura.dataFim"
                locale="pt-BR"
                year="numeric"
                month="long"
                day="numeric"
              />
              <span v-else>—</span>
            </dd>
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
