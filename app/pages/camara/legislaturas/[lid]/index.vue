<script setup lang="ts">
const route = useRoute()
const lid = route.params.lid as string

const { data: legislatura } = await useFetch(`/api/legislaturas/${lid}`)
</script>

<template>
  <div
    v-if="legislatura"
    class="mt-6"
  >
    <UCard>
      <dl class="grid grid-cols-2 gap-4 text-sm">
        <div>
          <dt class="text-muted">
            Número
          </dt>
          <dd>{{ legislatura.id }}ª</dd>
        </div>
        <div>
          <dt class="text-muted">
            Em exercício
          </dt>
          <dd>{{ legislatura.dataFim ? 'Encerrada' : 'Em curso' }}</dd>
        </div>
        <div>
          <dt class="text-muted">
            Início
          </dt>
          <dd>
            <NuxtTime
              v-if="legislatura.dataInicio"
              :datetime="legislatura.dataInicio"
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
            Fim
          </dt>
          <dd>
            <NuxtTime
              v-if="legislatura.dataFim"
              :datetime="legislatura.dataFim"
              locale="pt-BR"
              year="numeric"
              month="long"
              day="numeric"
            />
            <span v-else>—</span>
          </dd>
        </div>
      </dl>
    </UCard>
  </div>
</template>
