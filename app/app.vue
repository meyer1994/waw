<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const navItems: NavigationMenuItem[][] = [
  [
    {
      label: 'Câmara',
      icon: 'i-lucide-landmark',
      children: [
        { label: 'Deputados', to: '/camara/deputados' },
        { label: 'Proposições', to: '/camara/proposicoes' },
        { label: 'Partidos', to: '/camara/partidos' },
        { label: 'Votações', to: '/camara/votacoes' },
        { label: 'Órgãos', to: '/camara/orgaos' },
        { label: 'Eventos', to: '/camara/eventos' }
      ]
    },
    {
      label: 'Senado',
      icon: 'i-lucide-scale',
      children: [
        { label: 'Senadores', to: '/senado/senadores' }
      ]
    }
  ]
]
</script>

<template>
  <UApp>
    <UHeader>
      <template #left>
        <NuxtLink
          to="/"
          class="focus-visible:outline-3 outline-primary/25 rounded-md p-1 -ms-1"
        >
          <span class="font-bold">Waw</span>
        </NuxtLink>
      </template>

      <UNavigationMenu
        :items="navItems"
        highlight
      />

      <template #right>
        <UColorModeButton />

        <UButton
          to="https://github.com/nuxt-ui-templates/starter"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
          color="neutral"
          variant="ghost"
        />
      </template>
    </UHeader>

    <UMain>
      <UContainer class="py-8">
        <NuxtPage />
      </UContainer>
    </UMain>

    <USeparator icon="i-simple-icons-nuxtdotjs" />

    <UFooter>
      <template #left>
        <p class="text-sm text-muted">
          Built with Nuxt UI • © {{ new Date().getFullYear() }}
        </p>
      </template>

      <template #right>
        <UButton
          to="https://github.com/nuxt-ui-templates/starter"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
          color="neutral"
          variant="ghost"
        />
      </template>
    </UFooter>
  </UApp>
</template>
