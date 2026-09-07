<script setup lang="ts">
const route = useRoute()
const pid = route.params.pid as string

const { data: proposicao } = await useFetch(`/api/proposicoes/${pid}`)

const formatDataHora = (dataHora: string | null) => {
  if (!dataHora)
    return '—'
  return new Date(`${dataHora.slice(0, 10)}T${dataHora.slice(11, 16)}:00`).toLocaleString('pt-BR')
}
</script>

<template>
  <div class="mt-6">
    <UCard
      v-if="proposicao"
      class="mb-6"
    >
      <h2 class="font-semibold mb-2">
        Ementa
      </h2>
      <p class="text-sm">
        {{ proposicao.ementa }}
      </p>
      <p
        v-if="proposicao.ementaDetalhada"
        class="text-muted text-sm mt-2"
      >
        {{ proposicao.ementaDetalhada }}
      </p>
    </UCard>

    <UCard
      v-if="proposicao?.statusProposicao"
      class="mb-6"
    >
      <h2 class="font-semibold mb-2">
        Situação
      </h2>
      <dl class="grid grid-cols-2 gap-4 text-sm">
        <div>
          <dt class="text-muted">
            Órgão
          </dt>
          <dd>{{ proposicao.statusProposicao.siglaOrgao ?? '—' }}</dd>
        </div>
        <div>
          <dt class="text-muted">
            Situação
          </dt>
          <dd>{{ proposicao.statusProposicao.descricaoSituacao ?? '—' }}</dd>
        </div>
        <div>
          <dt class="text-muted">
            Tramitação
          </dt>
          <dd>{{ proposicao.statusProposicao.descricaoTramitacao ?? '—' }}</dd>
        </div>
        <div>
          <dt class="text-muted">
            Regime
          </dt>
          <dd>{{ proposicao.statusProposicao.regime ?? '—' }}</dd>
        </div>
        <div>
          <dt class="text-muted">
            Atualizada em
          </dt>
          <dd>{{ formatDataHora(proposicao.statusProposicao.dataHora) }}</dd>
        </div>
      </dl>
    </UCard>

    <UButton
      v-if="proposicao?.urlInteiroTeor"
      :to="proposicao.urlInteiroTeor"
      target="_blank"
      icon="i-lucide-file-text"
      variant="outline"
    >
      Inteiro teor
    </UButton>
  </div>
</template>
