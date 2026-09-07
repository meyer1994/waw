<script setup lang="ts">
const route = useRoute()
const vid = route.params.vid as string

const { data: votacao } = await useFetch(`/api/votacoes/${vid}`)
</script>

<template>
  <div
    v-if="votacao"
    class="mt-6"
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
</template>
