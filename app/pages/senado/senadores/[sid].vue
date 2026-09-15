<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()
const sid = route.params.sid as string
const parent = `/senado/senadores/${sid}`
const detalhesVisivel = computed(() => route.path === parent)

const items: NavigationMenuItem[] = [
  { label: 'Filiações', icon: 'i-lucide-flag', to: `${parent}/filiacoes` },
  { label: 'Mandatos', icon: 'i-lucide-clock', to: `${parent}/mandatos` },
  { label: 'Comissões', icon: 'i-lucide-building-2', to: `${parent}/comissoes` },
  { label: 'Cargos', icon: 'i-lucide-briefcase', to: `${parent}/cargos` },
  { label: 'Licenças', icon: 'i-lucide-calendar-x', to: `${parent}/licencas` },
  { label: 'Discursos', icon: 'i-lucide-mic', to: `${parent}/discursos` },
  { label: 'Apartes', icon: 'i-lucide-message-square', to: `${parent}/apartes` },
  { label: 'Profissões', icon: 'i-lucide-hammer', to: `${parent}/profissao` },
  { label: 'Acadêmico', icon: 'i-lucide-graduation-cap', to: `${parent}/historicoAcademico` }
]

const { data } = await useFetch(`/api/senadores/${sid}`)
const senador = computed(() => data.value?.senador)
const basico = computed(() => senador.value?.DadosBasicosParlamentar)

const rows = computed(() => [
  ['Nome completo', senador.value?.IdentificacaoParlamentar?.NomeCompletoParlamentar ?? '—'],
  ['Partido', senador.value?.IdentificacaoParlamentar?.SiglaPartidoParlamentar ?? '—'],
  ['UF', senador.value?.IdentificacaoParlamentar?.UfParlamentar ?? '—'],
  ['Sexo', senador.value?.IdentificacaoParlamentar?.SexoParlamentar ?? '—'],
  ['Nascimento', basico.value?.DataNascimento ?? '—'],
  ['Naturalidade', basico.value?.Naturalidade ? `${basico.value.Naturalidade} – ${basico.value.UfNaturalidade ?? ''}` : '—'],
  ['Endereço', basico.value?.EnderecoParlamentar ?? '—'],
  ['Email', senador.value?.IdentificacaoParlamentar?.EmailParlamentar ?? '—'],
  ['Membro da Mesa', senador.value?.IdentificacaoParlamentar?.MembroMesa ?? '—'],
  ['Membro da Liderança', senador.value?.IdentificacaoParlamentar?.MembroLideranca ?? '—']
])

useHead(() => ({ title: senador.value?.IdentificacaoParlamentar?.NomeParlamentar ?? 'Senador' }))
</script>

<template>
  <div>
    <div class="flex items-center gap-4 mb-8">
      <UAvatar
        as="NuxtImg"
        :src="senador?.IdentificacaoParlamentar?.UrlFotoParlamentar ?? undefined"
        :alt="senador?.IdentificacaoParlamentar?.NomeParlamentar"
        :text="senador?.IdentificacaoParlamentar?.NomeParlamentar?.slice(0, 1)"
        size="3xl"
      />

      <div>
        <h1 class="text-2xl font-bold">
          {{ senador?.IdentificacaoParlamentar?.NomeParlamentar }}
        </h1>
        <p class="text-muted">
          {{ basico?.Naturalidade }} • {{ senador?.IdentificacaoParlamentar?.SiglaPartidoParlamentar }} – {{ senador?.IdentificacaoParlamentar?.UfParlamentar }}
        </p>
        <p class="text-sm text-muted">
          {{ senador?.IdentificacaoParlamentar?.FormaTratamento }} • Mesa: {{ senador?.IdentificacaoParlamentar?.MembroMesa === 'Sim' ? 'Sim' : 'Não' }}
        </p>
      </div>
    </div>

    <div
      v-if="detalhesVisivel && senador"
      class="mb-6"
    >
      <UCard>
        <dl class="grid grid-cols-2 gap-4 text-sm">
          <div
            v-for="[label, value] in rows"
            :key="label"
          >
            <dt class="text-muted">
              {{ label }}
            </dt>
            <dd>{{ value }}</dd>
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
