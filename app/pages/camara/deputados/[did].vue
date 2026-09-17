<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import type { CamaraDeputadoDetalhe, CamaraItem } from '#shared/api'

const did = useRoute().params.did as string
const parent = `/camara/deputados/${did}`

const items: NavigationMenuItem[] = [
  { label: 'Proposições', icon: 'i-lucide-file-text', to: `${parent}/proposicoes` },
  { label: 'Discursos', icon: 'i-lucide-mic', to: `${parent}/discursos` },
  { label: 'Despesas', icon: 'i-lucide-receipt', to: `${parent}/despesas` },
  { label: 'Eventos', icon: 'i-lucide-calendar-days', to: `${parent}/eventos` },
  { label: 'Órgãos', icon: 'i-lucide-building-2', to: `${parent}/orgaos` },
  { label: 'Frentes', icon: 'i-lucide-users', to: `${parent}/frentes` },
  { label: 'Histórico', icon: 'i-lucide-history', to: `${parent}/historico` },
  { label: 'Histórico Antigo', icon: 'i-lucide-file-clock', to: `${parent}/historico-old` },
  { label: 'Ocupações', icon: 'i-lucide-briefcase', to: `${parent}/ocupacoes` },
  { label: 'Profissões', icon: 'i-lucide-hammer', to: `${parent}/profissoes` },
  { label: 'Mandatos Externos', icon: 'i-lucide-globe', to: `${parent}/mandatosExternos` }
]

const { data } = await useFetch<CamaraItem<CamaraDeputadoDetalhe>>(`/api/camara/deputados/${did}`)
const deputado = computed(() => data.value?.dados)

useHead(() => ({ title: deputado.value?.ultimoStatus?.nome ?? 'Deputado' }))
const formattedUrl = (url: string) => new URL(url).hostname
</script>

<template>
  <div>
    <div class="flex items-center gap-4 mb-8">
      <UAvatar
        as="NuxtImg"
        :src="deputado?.ultimoStatus?.urlFoto"
        :alt="deputado?.ultimoStatus?.nome"
        size="3xl"
      />

      <div>
        <h1 class="text-2xl font-bold">
          {{ deputado?.ultimoStatus?.nome }}
        </h1>
        <p class="text-muted">
          {{ deputado?.nomeCivil }} • {{ deputado?.ultimoStatus?.siglaPartido }} – {{ deputado?.ultimoStatus?.siglaUf }}
        </p>
        <p class="text-sm text-muted">
          {{ deputado?.ultimoStatus?.situacao }} • {{ deputado?.ultimoStatus?.condicaoEleitoral }}
        </p>
      </div>
    </div>

    <div
      v-if="deputado"
      class="mb-6"
    >
      <UCard>
        <dl class="grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt class="text-muted">
              Nome civil
            </dt>
            <dd>{{ deputado.nomeCivil ?? '—' }}</dd>
          </div>
          <div>
            <dt class="text-muted">
              CPF
            </dt>
            <dd>{{ deputado.cpf ?? '—' }}</dd>
          </div>
          <div>
            <dt class="text-muted">
              Nascimento
            </dt>
            <dd>{{ deputado.dataNascimento?.slice(0, 10) ?? '—' }}</dd>
          </div>
          <div>
            <dt class="text-muted">
              Falecimento
            </dt>
            <dd>{{ deputado.dataFalecimento?.slice(0, 10) ?? '—' }}</dd>
          </div>
          <div>
            <dt class="text-muted">
              Município de nascimento
            </dt>
            <dd>{{ deputado.municipioNascimento ? `${deputado.municipioNascimento} – ${deputado.ufNascimento ?? ''}` : '—' }}</dd>
          </div>
          <div>
            <dt class="text-muted">
              Sexo
            </dt>
            <dd>{{ deputado.sexo === 'M' ? 'Masculino' : deputado.sexo === 'F' ? 'Feminino' : '—' }}</dd>
          </div>
          <div>
            <dt class="text-muted">
              Escolaridade
            </dt>
            <dd>{{ deputado.escolaridade ?? '—' }}</dd>
          </div>
          <div>
            <dt class="text-muted">
              Email
            </dt>
            <dd>{{ deputado.ultimoStatus.email ?? '—' }}</dd>
          </div>
          <div>
            <dt class="text-muted">
              Website
            </dt>
            <dd>{{ deputado.urlWebsite ?? '—' }}</dd>
          </div>
          <div>
            <dt class="text-muted">
              Redes sociais
            </dt>
            <dd>
              <div
                v-if="deputado.redeSocial?.length"
                class="flex flex-col gap-1"
              >
                <ULink
                  v-for="url in deputado.redeSocial ?? []"
                  :key="url"
                  :to="url"
                  external
                  target="_blank"
                  class="text-primary hover:underline text-sm inline-flex items-center gap-1"
                >
                  <UIcon
                    name="i-lucide-at-sign"
                    class="size-4"
                  />
                  {{ formattedUrl(url) }}
                </ULink>
              </div>
              <span
                v-else
                class="text-muted"
              >—</span>
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
