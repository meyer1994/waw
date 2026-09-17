<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import type { CamaraItem, OrgaoDetalhe } from '#shared/api'

const route = useRoute()
const oid = route.params.oid as string
const parent = `/camara/orgaos/${oid}`

const items: NavigationMenuItem[] = [
  { label: 'Membros', icon: 'i-lucide-users', to: `${parent}/membros` },
  { label: 'Eventos', icon: 'i-lucide-calendar-days', to: `${parent}/eventos` },
  { label: 'Votações', icon: 'i-lucide-check-check', to: `${parent}/votacoes` }
]

const { data } = await useFetch<CamaraItem<OrgaoDetalhe>>(`/api/camara/orgaos/${oid}`)
const orgao = computed(() => data.value?.dados)

useHead(() => ({ title: orgao.value?.sigla ?? 'Órgão' }))
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-1">
      {{ orgao?.sigla }}
    </h1>
    <p class="text-muted text-sm mb-6">
      {{ orgao?.nome }} • {{ orgao?.tipoOrgao }}
    </p>

    <div
      v-if="orgao"
      class="mb-6"
    >
      <UCard>
        <dl class="grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt class="text-muted">
              Nome
            </dt>
            <dd>{{ orgao.nome }}</dd>
          </div>
          <div>
            <dt class="text-muted">
              Apelido
            </dt>
            <dd>{{ orgao.apelido ?? '—' }}</dd>
          </div>
          <div>
            <dt class="text-muted">
              Tipo
            </dt>
            <dd>{{ orgao.tipoOrgao ?? '—' }}</dd>
          </div>
          <div>
            <dt class="text-muted">
              Casa
            </dt>
            <dd>{{ orgao.casa || '—' }}</dd>
          </div>
          <div>
            <dt class="text-muted">
              Sala
            </dt>
            <dd>{{ orgao.sala ?? '—' }}</dd>
          </div>
          <div>
            <dt class="text-muted">
              Instalação
            </dt>
            <dd>
              <NuxtTime
                v-if="orgao.dataInstalacao"
                :datetime="orgao.dataInstalacao.slice(0, 10)"
                year="numeric"
                month="2-digit"
                day="2-digit"
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
