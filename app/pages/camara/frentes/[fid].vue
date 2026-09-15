<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()
const fid = route.params.fid as string
const parent = `/camara/frentes/${fid}`
const detalhesVisivel = computed(() => route.path === parent)

const items: NavigationMenuItem[] = [
  { label: 'Membros', icon: 'i-lucide-users', to: `${parent}/membros` }
]

const { data: frente } = await useFetch(`/api/frentes/${fid}`)

useHead(() => ({ title: frente.value?.titulo ?? 'Frente' }))
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-1">
      {{ frente?.titulo }}
    </h1>
    <p class="text-muted text-sm mb-6">
      Legislatura {{ frente?.idLegislatura }} • {{ frente?.situacao ?? '—' }} • Coordenador: {{ frente?.coordenador?.nome ?? '—' }}
    </p>

    <div
      v-if="detalhesVisivel && frente"
      class="mb-6"
    >
      <UCard>
        <dl class="grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt class="text-muted">
              Título
            </dt>
            <dd>{{ frente.titulo }}</dd>
          </div>
          <div>
            <dt class="text-muted">
              Situação
            </dt>
            <dd>{{ frente.situacao ?? '—' }}</dd>
          </div>
          <div>
            <dt class="text-muted">
              Coordenador
            </dt>
            <dd>{{ frente.coordenador?.nome ?? '—' }}</dd>
          </div>
          <div>
            <dt class="text-muted">
              Email
            </dt>
            <dd>{{ frente.email ?? '—' }}</dd>
          </div>
          <div>
            <dt class="text-muted">
              Telefone
            </dt>
            <dd>{{ frente.telefone ?? '—' }}</dd>
          </div>
          <div>
            <dt class="text-muted">
              Keywords
            </dt>
            <dd>{{ frente.keywords ?? '—' }}</dd>
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
