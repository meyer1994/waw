<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const navItems: NavigationMenuItem[][] = [
  [
    { label: 'Deputados', icon: 'i-lucide-users', to: '/camara/deputados' },
    { label: 'Proposições', icon: 'i-lucide-file-text', to: '/camara/proposicoes' },
    { label: 'Partidos', icon: 'i-lucide-flag', to: '/camara/partidos' },
    { label: 'Votações', icon: 'i-lucide-vote', to: '/camara/votacoes' },
    { label: 'Órgãos', icon: 'i-lucide-landmark', to: '/camara/orgaos' },
    { label: 'Eventos', icon: 'i-lucide-calendar', to: '/camara/eventos' }
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
        class="data-[orientation=horizontal]:border-b border-default data-[orientation=horizontal]:w-full"
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
