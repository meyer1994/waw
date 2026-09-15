<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()
const vid = route.params.vid as string
const parent = `/camara/votacoes/${vid}`
const detalhesVisivel = computed(() => route.path === parent)

const items: NavigationMenuItem[] = [
  { label: 'Votos', icon: 'i-lucide-check', to: `${parent}/votos` },
  { label: 'Orientações', icon: 'i-lucide-compass', to: `${parent}/orientacoes` }
]

const { data: votacao } = await useFetch(`/api/votacoes/${vid}`)

useHead(() => ({ title: votacao.value ? `Votação ${votacao.value.id}` : 'Votação' }))
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-1">
      Votação {{ votacao?.id }}
    </h1>
    <p class="text-muted text-sm mb-6">
      {{ votacao?.siglaOrgao }} •
      <NuxtTime
        v-if="votacao?.data"
        :datetime="votacao.data.slice(0, 10)"
        locale="pt-BR"
        year="numeric"
        month="long"
        day="numeric"
      />
      •
      <UBadge
        v-if="votacao?.aprovacao !== null"
        :color="votacao?.aprovacao === 1 ? 'success' : 'error'"
        variant="soft"
      >
        {{ votacao?.aprovacao === 1 ? 'Aprovada' : 'Rejeitada' }}
      </UBadge>
    </p>

    <div
      v-if="detalhesVisivel && votacao"
      class="mb-6"
    >
      <UCard>
        <dl class="grid grid-cols-2 gap-4 text-sm">
          <div class="col-span-2">
            <dt class="text-muted">
              Descrição
            </dt>
            <dd>{{ votacao.descricao ?? '—' }}</dd>
          </div>
          <div>
            <dt class="text-muted">
              Órgão
            </dt>
            <dd>{{ votacao.siglaOrgao ?? '—' }}</dd>
          </div>
          <div>
            <dt class="text-muted">
              Objeto
            </dt>
            <dd>{{ votacao.proposicaoObjeto ?? '—' }}</dd>
          </div>
          <div>
            <dt class="text-muted">
              Data
            </dt>
            <dd>
              <NuxtTime
                v-if="votacao.data"
                :datetime="votacao.data.slice(0, 10)"
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
              Registrada em
            </dt>
            <dd>
              <NuxtTime
                v-if="votacao.dataHoraRegistro"
                :datetime="votacao.dataHoraRegistro"
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
