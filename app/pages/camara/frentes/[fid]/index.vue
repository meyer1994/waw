<script setup lang="ts">
const route = useRoute()
const fid = route.params.fid as string

const { data: frente } = await useFetch(`/api/frentes/${fid}`)
</script>

<template>
  <div
    v-if="frente"
    class="mt-6"
  >
    <UCard>
      <dl class="grid grid-cols-2 gap-4 text-sm">
        <div>
          <dt class="text-muted">
            Título
          </dt>
          <dd>{{ frente.titulo }}</dd>
        </div>
        <div>
          <dt class="text-muted">
            Situação
          </dt>
          <dd>{{ frente.situacao ?? '—' }}</dd>
        </div>
        <div>
          <dt class="text-muted">
            Coordenador
          </dt>
          <dd>{{ frente.coordenador ?? '—' }}</dd>
        </div>
        <div>
          <dt class="text-muted">
            Email
          </dt>
          <dd>{{ frente.email ?? '—' }}</dd>
        </div>
        <div>
          <dt class="text-muted">
            Telefone
          </dt>
          <dd>{{ frente.telefone ?? '—' }}</dd>
        </div>
        <div>
          <dt class="text-muted">
            Keywords
          </dt>
          <dd>{{ frente.keywords ?? '—' }}</dd>
        </div>
      </dl>
    </UCard>
  </div>
</template>
