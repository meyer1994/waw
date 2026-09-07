<script setup lang="ts">
const route = useRoute()
const gid = route.params.gid as string

const { data: grupo } = await useFetch(`/api/grupos/${gid}`)
</script>

<template>
  <div
    v-if="grupo"
    class="mt-6"
  >
    <UCard>
      <dl class="grid grid-cols-2 gap-4 text-sm">
        <div>
          <dt class="text-muted">
            Nome
          </dt>
          <dd>{{ grupo.nome }}</dd>
        </div>
        <div>
          <dt class="text-muted">
            Ano de criação
          </dt>
          <dd>{{ grupo.anoCriacao ?? '—' }}</dd>
        </div>
        <div>
          <dt class="text-muted">
            Grupo misto
          </dt>
          <dd>{{ grupo.grupoMisto === 'S' ? 'Sim' : 'Não' }}</dd>
        </div>
        <div>
          <dt class="text-muted">
            Subvencionado
          </dt>
          <dd>{{ grupo.subvencionado === 'S' ? 'Sim' : 'Não' }}</dd>
        </div>
        <div>
          <dt class="text-muted">
            Resolução
          </dt>
          <dd>
            <ULink
              v-if="grupo.resolucaoUri"
              :to="grupo.resolucaoUri"
              target="_blank"
            >
              {{ grupo.resolucaoTitulo ?? 'Ver resolução' }}
            </ULink>
            <span v-else>—</span>
          </dd>
        </div>
        <div>
          <dt class="text-muted">
            Último status
          </dt>
          <dd>{{ grupo.ultimoStatus ?? '—' }}</dd>
        </div>
      </dl>
    </UCard>
  </div>
</template>
