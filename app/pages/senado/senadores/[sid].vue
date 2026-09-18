<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import type { SenadorDetalhe, SenadorDetalheDoc } from '#shared/api-senado'

const route = useRoute()
const sid = route.params.sid as string
const parent = `/senado/senadores/${sid}`

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

const { data } = await useFetch<SenadorDetalheDoc>(`/api/senado/senador/${sid}.json`)
const senador = computed(() => data.value?.DetalheParlamentar?.Parlamentar)
const ident = computed(() => senador.value?.IdentificacaoParlamentar)
const basico = computed(() => senador.value?.DadosBasicosParlamentar)

const rows = computed<[string, string][]>(() => {
  const s: SenadorDetalhe | undefined = senador.value
  return [
    ['Nome completo', s?.IdentificacaoParlamentar?.NomeCompletoParlamentar ?? '—'],
    ['Partido', s?.IdentificacaoParlamentar?.SiglaPartidoParlamentar ?? '—'],
    ['UF', s?.IdentificacaoParlamentar?.UfParlamentar ?? '—'],
    ['Sexo', s?.IdentificacaoParlamentar?.SexoParlamentar ?? '—'],
    ['Nascimento', basico.value?.DataNascimento ?? '—'],
    ['Naturalidade', basico.value?.Naturalidade ? `${basico.value.Naturalidade} – ${basico.value.UfNaturalidade ?? ''}` : '—'],
    ['Endereço', basico.value?.EnderecoParlamentar ?? '—'],
    ['Email', s?.IdentificacaoParlamentar?.EmailParlamentar ?? '—'],
    ['Membro da Mesa', s?.IdentificacaoParlamentar?.MembroMesa === 'Sim' ? 'Sim' : 'Não'],
    ['Membro da Liderança', s?.IdentificacaoParlamentar?.MembroLideranca === 'Sim' ? 'Sim' : 'Não']
  ]
})

useHead(() => ({ title: ident.value?.NomeParlamentar ?? 'Senador' }))
</script>

<template>
  <div>
    <div class="flex items-center gap-4 mb-8">
      <UAvatar
        as="NuxtImg"
        :src="ident?.UrlFotoParlamentar ?? undefined"
        :alt="ident?.NomeParlamentar"
        :text="ident?.NomeParlamentar?.slice(0, 1)"
        size="3xl"
      />

      <div>
        <h1 class="text-2xl font-bold">
          {{ ident?.NomeParlamentar }}
        </h1>
        <p class="text-muted">
          {{ basico?.Naturalidade }} • {{ ident?.SiglaPartidoParlamentar }} – {{ ident?.UfParlamentar }}
        </p>
        <p class="text-sm text-muted">
          {{ ident?.FormaTratamento }} • Mesa: {{ ident?.MembroMesa === 'Sim' ? 'Sim' : 'Não' }}
        </p>
      </div>
    </div>

    <div
      v-if="senador"
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
