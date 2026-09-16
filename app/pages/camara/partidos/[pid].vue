<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import type { CamaraItem, PartidoDetalhe } from '#shared/api'

const route = useRoute()
const pid = route.params.pid as string
const parent = `/camara/partidos/${pid}`

const items: NavigationMenuItem[] = [
  { label: 'Membros', icon: 'i-lucide-users', to: `${parent}/membros` },
  { label: 'Líderes', icon: 'i-lucide-crown', to: `${parent}/lideres` }
]

const { data } = await useFetch<CamaraItem<PartidoDetalhe>>(`/api/camara/partidos/${pid}`)
const partido = computed(() => data.value?.dados)

useHead(() => ({ title: partido.value?.sigla ?? 'Partido' }))
</script>

<template>
  <div>
    <div class="flex items-center gap-4 mb-8">
      <UAvatar
        as="NuxtImg"
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

    <div
      v-if="partido"
      class="mb-6"
    >
      <UCard>
        <dl class="grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt class="text-muted">
              Nome
            </dt>
            <dd>{{ partido.nome }}</dd>
          </div>
          <div>
            <dt class="text-muted">
              Número eleitoral
            </dt>
            <dd>{{ partido.numeroEleitoral ?? '—' }}</dd>
          </div>
          <div>
            <dt class="text-muted">
              Situação
            </dt>
            <dd>{{ partido.status?.situacao ?? '—' }}</dd>
          </div>
          <div>
            <dt class="text-muted">
              Total de membros
            </dt>
            <dd>{{ partido.status?.totalMembros ?? '—' }}</dd>
          </div>
          <div>
            <dt class="text-muted">
              Website
            </dt>
            <dd>
              <ULink
                v-if="partido.urlWebSite"
                :to="partido.urlWebSite"
                target="_blank"
              >
                {{ partido.urlWebSite }}
              </ULink>
              <span v-else>—</span>
            </dd>
          </div>
          <div>
            <dt class="text-muted">
              Facebook
            </dt>
            <dd>
              <ULink
                v-if="partido.urlFacebook"
                :to="partido.urlFacebook"
                target="_blank"
              >
                {{ partido.urlFacebook }}
              </ULink>
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
