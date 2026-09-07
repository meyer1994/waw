<script setup lang="ts">
const route = useRoute()
const eid = route.params.eid as string

const { data: evento } = await useFetch(`/api/eventos/${eid}`)
</script>

<template>
  <div
    v-if="evento"
    class="mt-6"
  >
    <UCard>
      <dl class="grid grid-cols-2 gap-4 text-sm">
        <div>
          <dt class="text-muted">
            Descrição
          </dt>
          <dd>{{ evento.descricao }}</dd>
        </div>
        <div>
          <dt class="text-muted">
            Situação
          </dt>
          <dd>{{ evento.situacao ?? '—' }}</dd>
        </div>
        <div>
          <dt class="text-muted">
            Início
          </dt>
          <dd>
            <NuxtTime
              v-if="evento.dataHoraInicio"
              :datetime="evento.dataHoraInicio"
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
        <div>
          <dt class="text-muted">
            Fim
          </dt>
          <dd>
            <NuxtTime
              v-if="evento.dataHoraFim"
              :datetime="evento.dataHoraFim"
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
        <div>
          <dt class="text-muted">
            Local
          </dt>
          <dd>{{ evento.localCamara?.nome ?? evento.localExterno ?? '—' }}</dd>
        </div>
        <div>
          <dt class="text-muted">
            Registro
          </dt>
          <dd>
            <ULink
              v-if="evento.urlRegistro"
              :to="evento.urlRegistro"
              target="_blank"
            >
              Ver registro
            </ULink>
            <span v-else>—</span>
          </dd>
        </div>
      </dl>
    </UCard>
  </div>
</template>
