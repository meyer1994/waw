<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { asArray } from '~~/shared/senado'
import type { ComissaoDetalheDoc } from '#shared/api-senado'

const route = useRoute()
const cid = route.params.cid as string
const parent = `/senado/comissao/${cid}`

const items: NavigationMenuItem[] = [
  { label: 'Membros', icon: 'i-lucide-users', to: `${parent}/membros` }
]

const { data } = await useFetch<ComissaoDetalheDoc>(`/api/senado/comissao/${cid}.json`)
const comissao = computed(() => asArray(data.value?.ComissoesCongresoNacional?.Colegiados?.Colegiado)[0])
const cargos = computed(() => asArray(comissao.value?.Cargos?.Cargo).filter(c => c.NomeParlamentar))

useHead(() => ({ title: comissao.value?.SiglaColegiado ?? 'Comissão' }))
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-1">
      {{ comissao?.SiglaColegiado }}
    </h1>
    <p class="text-muted text-sm mb-6">
      {{ comissao?.NomeColegiado }}
    </p>

    <div
      v-if="comissao"
      class="mb-6"
    >
      <UCard>
        <dl class="grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt class="text-muted">
              Nome
            </dt>
            <dd>{{ comissao.NomeColegiado }}</dd>
          </div>
          <div>
            <dt class="text-muted">
              Início
            </dt>
            <dd>{{ comissao.DataInicio ?? '—' }}</dd>
          </div>
          <div>
            <dt class="text-muted">
              Senadores
            </dt>
            <dd>{{ comissao.QuantidadesMembros?.Distribuicao?.Senadores ?? '—' }}</dd>
          </div>
          <div>
            <dt class="text-muted">
              Titulares / Suplentes
            </dt>
            <dd>
              {{ comissao.QuantidadesMembros?.Distribuicao?.SenadoresTitulares ?? '—' }} /
              {{ comissao.QuantidadesMembros?.Distribuicao?.SenadoresSuplentes ?? '—' }}
            </dd>
          </div>
        </dl>
      </UCard>
    </div>

    <div
      v-if="cargos.length"
      class="mb-6"
    >
      <h2 class="text-lg font-semibold mb-3">
        Mesa Diretora
      </h2>
      <UCard>
        <ul class="divide-y divide-(--ui-border) text-sm">
          <li
            v-for="cargo in cargos"
            :key="cargo.CodigoCargo"
            class="flex items-center justify-between py-2 gap-4"
          >
            <span class="text-muted w-40 shrink-0">{{ cargo.TipoCargo }}</span>
            <span class="flex-1 font-medium">{{ cargo.NomeParlamentar }}</span>
            <NuxtLink
              v-if="cargo.CodigoParlamentar"
              :to="`/senado/senadores/${cargo.CodigoParlamentar}`"
              class="text-primary hover:underline text-sm shrink-0"
            >
              Perfil
            </NuxtLink>
          </li>
        </ul>
      </UCard>
    </div>

    <UNavigationMenu
      :items="items"
      class="mb-6"
    />

    <NuxtPage />
  </div>
</template>
