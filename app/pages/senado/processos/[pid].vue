<script setup lang="ts">
import { asArray } from '~~/shared/senado'
import type { ProcessoDetalhe } from '#shared/api-senado'

const route = useRoute()
const pid = route.params.pid as string

const { data } = await useFetch<ProcessoDetalhe>(`/api/senado/processo/${pid}.json`)
const processo = computed(() => data.value)

const autoriaIniciativa = computed(() => asArray(processo.value?.autoriaIniciativa))
const classificacoes = computed(() => asArray(processo.value?.classificacoes))
const apensados = computed(() => asArray(processo.value?.processosApensados))
const relacionados = computed(() => asArray(processo.value?.processosRelacionados))
const outrosNumeros = computed(() => asArray(processo.value?.outrosNumeros))
const despachos = computed(() => asArray(processo.value?.despachos))
const autoriaDocumento = computed(() => asArray(processo.value?.documento?.autoria))

const linhas = computed<[string, string][]>(() => {
  const p = processo.value
  if (!p) return []
  const r: [string, string][] = [
    ['Objetivo', p.objetivo ?? '—'],
    ['Casa identificadora', p.casaIdentificadora ?? '—'],
    ['Início efetivo', p.dataInicioEfetivo ?? '—'],
    ['Tramitando', p.tramitando ?? '—'],
    ['Situação atual', p.situacaoAtual ?? '—'],
    ['Sigla da situação', p.siglaSituacaoAtual ?? '—'],
    ['Data da situação', p.dataSituacaoAtual ?? '—'],
    ['Última informação', p.ultimaInformacaoAtualizada ?? '—'],
    ['Atualizado em', p.dthUltimaAtualizacao ?? '—']
  ]
  return r
})

useHead(() => ({ title: processo.value?.identificacao ?? 'Processo' }))
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-1">
      {{ processo?.identificacao }}
    </h1>
    <p class="text-muted text-sm mb-6">
      {{ processo?.tipoDocumento ?? processo?.descricaoSigla }} • {{ processo?.ementa }}
    </p>

    <div
      v-if="processo"
      class="space-y-6"
    >
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold">
              Dados gerais
            </h2>
            <UBadge
              :color="processo.tramitando === 'Sim' ? 'success' : 'neutral'"
              variant="subtle"
            >
              {{ processo.tramitando === 'Sim' ? 'Em tramitação' : 'Encerrado' }}
            </UBadge>
          </div>
        </template>

        <dl class="grid grid-cols-2 gap-4 text-sm">
          <div
            v-for="[label, value] in linhas"
            :key="label"
          >
            <dt class="text-muted">
              {{ label }}
            </dt>
            <dd>{{ value }}</dd>
          </div>
        </dl>

        <template
          v-if="processo.conteudo?.ementa"
          #footer
        >
          <div class="text-sm">
            <span class="text-muted block mb-1">Ementa (conteúdo)</span>
            {{ processo.conteudo.ementa }}
          </div>
        </template>
      </UCard>

      <div
        v-if="processo.documento"
        class="grid md:grid-cols-2 gap-6"
      >
        <UCard>
          <template #header>
            <h2 class="text-lg font-semibold">
              Documento
            </h2>
          </template>
          <dl class="grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt class="text-muted">
                Tipo
              </dt>
              <dd>{{ processo.documento.tipo }}</dd>
            </div>
            <div>
              <dt class="text-muted">
                Apresentação
              </dt>
              <dd>{{ processo.documento.dataApresentacao ?? '—' }}</dd>
            </div>
            <div>
              <dt class="text-muted">
                Leitura
              </dt>
              <dd>{{ processo.documento.dataLeitura ?? '—' }}</dd>
            </div>
            <div>
              <dt class="text-muted">
                Casa de leitura
              </dt>
              <dd>{{ processo.documento.casaLeitura ?? '—' }}</dd>
            </div>
          </dl>
          <template #footer>
            <ul class="divide-y divide-(--ui-border) text-sm">
              <li
                v-for="(autor, i) in autoriaDocumento"
                :key="i"
                class="py-1.5 flex items-center justify-between gap-2"
              >
                <span class="font-medium">{{ autor.autor }}</span>
                <span class="text-muted text-xs">{{ autor.ente }}</span>
              </li>
            </ul>
            <UButton
              v-if="processo.documento.url"
              :to="processo.documento.url"
              target="_blank"
              icon="i-lucide-external-link"
              color="primary"
              variant="soft"
              size="sm"
              class="mt-3"
            >
              Texto integral
            </UButton>
          </template>
        </UCard>

        <UCard>
          <template #header>
            <h2 class="text-lg font-semibold">
              Autoria da iniciativa
            </h2>
          </template>
          <ul class="divide-y divide-(--ui-border) text-sm">
            <li
              v-for="(autor, i) in autoriaIniciativa"
              :key="i"
              class="py-2 flex items-center justify-between gap-2"
            >
              <span>
                <span class="font-medium">{{ autor.autor }}</span>
                <span
                  v-if="autor.siglaPartido || autor.siglaCargo"
                  class="text-muted text-xs block"
                >
                  {{ [autor.siglaCargo, autor.siglaPartido, autor.ente].filter(Boolean).join(' • ') }}
                </span>
              </span>
              <NuxtLink
                v-if="autor.codigoParlamentar"
                :to="`/senado/senadores/${autor.codigoParlamentar}`"
                class="text-primary hover:underline text-xs"
              >
                Perfil
              </NuxtLink>
            </li>
            <li
              v-if="!autoriaIniciativa.length"
              class="py-2 text-muted"
            >
              Sem registro
            </li>
          </ul>
        </UCard>
      </div>

      <UCard v-if="classificacoes.length">
        <template #header>
          <h2 class="text-lg font-semibold">
            Classificações
          </h2>
        </template>
        <div class="flex flex-wrap gap-2">
          <UBadge
            v-for="c in classificacoes"
            :key="c.codigo"
            variant="subtle"
          >
            {{ c.descricao }}
          </UBadge>
        </div>
      </UCard>

      <div class="grid md:grid-cols-2 gap-6">
        <UCard v-if="apensados.length || relacionados.length">
          <template #header>
            <h2 class="text-lg font-semibold">
              Processos apensados
            </h2>
          </template>
          <table class="text-sm w-full">
            <tbody>
              <tr
                v-for="p in apensados"
                :key="p.id"
                class="border-b border-(--ui-border) last:border-0"
              >
                <td class="py-1.5">
                  <NuxtLink
                    :to="`/senado/processos/${p.id}`"
                    class="text-primary hover:underline"
                  >
                    {{ p.identificacao }}
                  </NuxtLink>
                </td>
                <td class="py-1.5 text-muted text-xs">
                  {{ p.tipoApensamento ?? '' }}
                </td>
              </tr>
            </tbody>
          </table>
        </UCard>

        <UCard v-if="relacionados.length">
          <template #header>
            <h2 class="text-lg font-semibold">
              Processos relacionados
            </h2>
          </template>
          <table class="text-sm w-full">
            <tbody>
              <tr
                v-for="p in relacionados"
                :key="p.idOutroProcesso"
                class="border-b border-(--ui-border) last:border-0"
              >
                <td class="py-1.5">
                  <NuxtLink
                    :to="`/senado/processos/${p.idOutroProcesso}`"
                    class="text-primary hover:underline"
                  >
                    {{ p.sigla }} {{ p.numero }}/{{ p.ano }}
                  </NuxtLink>
                </td>
                <td class="py-1.5 text-muted text-xs">
                  {{ p.tipoRelacao ?? '' }}
                </td>
              </tr>
            </tbody>
          </table>
        </UCard>
      </div>

      <UCard v-if="despachos.length || outrosNumeros.length">
        <template #header>
          <h2 class="text-lg font-semibold">
            Tramitação
          </h2>
        </template>
        <ul class="divide-y divide-(--ui-border) text-sm">
          <li
            v-for="(d, i) in despachos"
            :key="i"
            class="py-2"
          >
            <div class="flex items-center justify-between gap-2">
              <span class="font-medium">{{ d.tipoMotivacao }}</span>
              <span class="text-muted text-xs">
                <NuxtTime
                  v-if="d.data"
                  :datetime="d.data"
                  year="numeric"
                  month="2-digit"
                  day="2-digit"
                />
              </span>
            </div>
            <p
              v-if="d.providencias"
              class="text-muted text-sm line-clamp-2"
            >
              {{ d.providencias }}
            </p>
          </li>
          <li
            v-for="(n, i) in outrosNumeros"
            :key="`n${i}`"
            class="py-2 flex items-center justify-between gap-2"
          >
            <span class="text-sm">{{ n.sigla }} {{ n.numero }}/{{ n.ano }}</span>
            <span class="text-muted text-xs">{{ n.enteIdentificador }}</span>
          </li>
        </ul>
      </UCard>
    </div>
  </div>
</template>
