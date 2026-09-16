<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import type { CamaraItem, Grupo } from '#shared/api'

const route = useRoute()
const gid = route.params.gid as string
const parent = `/camara/grupos/${gid}`

const items: NavigationMenuItem[] = [
  { label: 'Membros', icon: 'i-lucide-users', to: `${parent}/membros` },
  { label: 'Histórico', icon: 'i-lucide-history', to: `${parent}/historico` }
]

const { data } = await useFetch<CamaraItem<Grupo>>(`/api/camara/grupos/${gid}`)
const grupo = computed(() => data.value?.dados)

useHead(() => ({ title: grupo.value?.nome ?? 'Grupo' }))
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-1">
      {{ grupo?.nome }}
    </h1>
    <p class="text-muted text-sm mb-6">
      {{ grupo?.anoCriacao ?? '—' }} • {{ grupo?.ativo === 'S' ? 'Ativo' : 'Inativo' }}
    </p>

    <div
      v-if="grupo"
      class="mb-6"
    >
      <UCard>
        <dl class="grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt class="text-muted">
              Nome
            </dt>
            <dd>{{ grupo.nome }}</dd>
          </div>
          <div>
            <dt class="text-muted">
              Ano de criação
            </dt>
            <dd>{{ grupo.anoCriacao ?? '—' }}</dd>
          </div>
          <div>
            <dt class="text-muted">
              Grupo misto
            </dt>
            <dd>{{ grupo.grupoMisto === 'S' ? 'Sim' : 'Não' }}</dd>
          </div>
          <div>
            <dt class="text-muted">
              Subvencionado
            </dt>
            <dd>{{ grupo.subvencionado === 'S' ? 'Sim' : 'Não' }}</dd>
          </div>
          <div>
            <dt class="text-muted">
              Resolução
            </dt>
            <dd>
              <ULink
                v-if="grupo.resolucaoUri"
                :to="grupo.resolucaoUri"
                target="_blank"
              >
                {{ grupo.resolucaoTitulo ?? 'Ver resolução' }}
              </ULink>
              <span v-else>—</span>
            </dd>
          </div>
          <div>
            <dt class="text-muted">
              Último status
            </dt>
            <dd>{{ grupo.ultimoStatus?.presidenteNome ?? '—' }}</dd>
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
