<script setup lang="ts">
import type { VotacaoComVoto } from '~~/server/api/deputados/[did]/proposicoes/[pid]/votacoes.get'

const route = useRoute()
const did = route.params.did as string
const pid = route.params.pid as string

const { data, status } = await useFetch(`/api/deputados/${did}/proposicoes/${pid}/votacoes`)

const proposicao = computed(() => data.value?.proposicao)
const votacoes = computed<VotacaoComVoto[]>(() => data.value?.votacoes ?? [])

const titulo = computed(() => proposicao.value
  ? `${proposicao.value.siglaTipo} ${proposicao.value.numero}/${proposicao.value.ano}`
  : 'Proposição')

useHead(() => ({ title: titulo.value }))

const votoColor = (voto: string | null) => {
  if (voto === 'Sim')
    return 'success' as const
  if (voto === 'Não')
    return 'error' as const
  return 'neutral' as const
}
</script>

<template>
  <div>
    <div
      v-if="status === 'pending'"
      class="flex justify-center py-8"
    >
      <UIcon
        name="i-lucide-loader-circle"
        class="size-8 animate-spin"
      />
    </div>

    <template v-else-if="proposicao">
      <h1 class="text-2xl font-bold mb-2">
        {{ titulo }}
      </h1>
      <p class="text-muted text-sm mb-8 line-clamp-3">
        {{ proposicao.ementa }}
      </p>

      <h2 class="text-xl font-semibold mb-4">
        Votações
      </h2>

      <p
        v-if="votacoes.length === 0"
        class="text-muted"
      >
        Nenhuma votação registrada para esta proposição.
      </p>

      <ul class="space-y-4">
        <li
          v-for="votacao in votacoes"
          :key="votacao.id"
          class="border rounded-lg p-4"
        >
          <div class="flex items-start justify-between gap-4">
            <div>
              <p class="font-medium">
                {{ votacao.siglaOrgao }} •
                <NuxtTime
                  v-if="votacao.data"
                  :datetime="votacao.data.slice(0, 10)"
                  locale="pt-BR"
                  year="numeric"
                  month="2-digit"
                  day="2-digit"
                />
                <span v-else>—</span>
              </p>
              <p class="text-muted text-sm mt-1">
                {{ votacao.descricao }}
              </p>
            </div>

            <div class="flex flex-col items-end gap-2 shrink-0">
              <UBadge
                v-if="votacao.aprovacao !== null"
                :color="votacao.aprovacao === 1 ? 'success' : 'error'"
                variant="soft"
              >
                {{ votacao.aprovacao === 1 ? 'Aprovada' : 'Rejeitada' }}
              </UBadge>

              <UBadge
                v-if="votacao.voto"
                :color="votoColor(votacao.voto)"
                variant="subtle"
              >
                Voto: {{ votacao.voto }}
              </UBadge>
              <span
                v-else
                class="text-muted text-sm"
              >Sem voto registrado</span>
            </div>
          </div>
        </li>
      </ul>
    </template>
  </div>
</template>
