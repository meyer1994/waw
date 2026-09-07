<script setup lang="ts">
const route = useRoute()
const bid = route.params.bid as string

const { data: bloco } = await useFetch(`/api/blocos/${bid}`)
</script>

<template>
  <div
    v-if="bloco"
    class="mt-6"
  >
    <UCard>
      <dl class="grid grid-cols-2 gap-4 text-sm">
        <div>
          <dt class="text-muted">
            Nome
          </dt>
          <dd>{{ bloco.nome }}</dd>
        </div>
        <div>
          <dt class="text-muted">
            Legislatura
          </dt>
          <dd>{{ bloco.idLegislatura ?? '—' }}</dd>
        </div>
        <div>
          <dt class="text-muted">
            Federação
          </dt>
          <dd>{{ bloco.federacao === 'S' ? 'Sim' : bloco.federacao === 'N' ? 'Não' : '—' }}</dd>
        </div>
      </dl>
    </UCard>
  </div>
</template>
