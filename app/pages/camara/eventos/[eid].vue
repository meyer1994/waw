<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import type { CamaraItem, Evento } from '#shared/api'

const route = useRoute()
const eid = route.params.eid as string
const parent = `/camara/eventos/${eid}`

const items: NavigationMenuItem[] = [
  { label: 'Pauta', icon: 'i-lucide-list-ordered', to: `${parent}/pauta` },
  { label: 'Deputados', icon: 'i-lucide-users', to: `${parent}/deputados` },
  { label: 'Órgãos', icon: 'i-lucide-building-2', to: `${parent}/orgaos` },
  { label: 'Votações', icon: 'i-lucide-check-check', to: `${parent}/votacoes` }
]

const { data } = await useFetch<CamaraItem<Evento>>(`/api/camara/eventos/${eid}`)
const evento = computed(() => data.value?.dados)

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

    <div
      v-if="evento"
      class="mb-6"
    >
      <UCard>
        <dl class="grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt class="text-muted">
              Descrição
            </dt>
            <dd>{{ evento.descricao }}</dd>
          </div>
          <div>
            <dt class="text-muted">
              Situação
            </dt>
            <dd>{{ evento.situacao ?? '—' }}</dd>
          </div>
          <div>
            <dt class="text-muted">
              Início
            </dt>
            <dd>
              <NuxtTime
                v-if="evento.dataHoraInicio"
                :datetime="evento.dataHoraInicio"
                locale="pt-BR"
                year="numeric"
                month="2-digit"
                day="2-digit"
                hour="2-digit"
                minute="2-digit"
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
                v-if="evento.dataHoraFim"
                :datetime="evento.dataHoraFim"
                locale="pt-BR"
                year="numeric"
                month="2-digit"
                day="2-digit"
                hour="2-digit"
                minute="2-digit"
              />
              <span v-else>—</span>
            </dd>
          </div>
          <div>
            <dt class="text-muted">
              Local
            </dt>
            <dd>{{ evento.localCamara?.nome ?? evento.localExterno ?? '—' }}</dd>
          </div>
          <div>
            <dt class="text-muted">
              Registro
            </dt>
            <dd>
              <ULink
                v-if="evento.urlRegistro"
                :to="evento.urlRegistro"
                target="_blank"
              >
                Ver registro
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
