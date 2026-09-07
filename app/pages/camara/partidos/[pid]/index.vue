<script setup lang="ts">
const route = useRoute()
const pid = route.params.pid as string

const { data: partido } = await useFetch(`/api/partidos/${pid}`)
</script>

<template>
  <div
    v-if="partido"
    class="mt-6"
  >
    <UCard>
      <dl class="grid grid-cols-2 gap-4 text-sm">
        <div>
          <dt class="text-muted">
            Nome
          </dt>
          <dd>{{ partido.nome }}</dd>
        </div>
        <div>
          <dt class="text-muted">
            Número eleitoral
          </dt>
          <dd>{{ partido.numeroEleitoral ?? '—' }}</dd>
        </div>
        <div>
          <dt class="text-muted">
            Situação
          </dt>
          <dd>{{ partido.status?.situacao ?? '—' }}</dd>
        </div>
        <div>
          <dt class="text-muted">
            Total de membros
          </dt>
          <dd>{{ partido.status?.totalMembros ?? '—' }}</dd>
        </div>
        <div>
          <dt class="text-muted">
            Website
          </dt>
          <dd>
            <ULink
              v-if="partido.urlWebSite"
              :to="partido.urlWebSite"
              target="_blank"
            >
              {{ partido.urlWebSite }}
            </ULink>
            <span v-else>—</span>
          </dd>
        </div>
        <div>
          <dt class="text-muted">
            Facebook
          </dt>
          <dd>
            <ULink
              v-if="partido.urlFacebook"
              :to="partido.urlFacebook"
              target="_blank"
            >
              {{ partido.urlFacebook }}
            </ULink>
            <span v-else>—</span>
          </dd>
        </div>
      </dl>
    </UCard>
  </div>
</template>
