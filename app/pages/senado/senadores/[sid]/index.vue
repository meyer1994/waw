<script setup lang="ts">
const route = useRoute()
const sid = route.params.sid as string

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
</script>

<template>
  <div
    v-if="senador"
    class="mt-6"
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
</template>
