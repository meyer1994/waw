<script setup lang="ts">
const route = useRoute()
const oid = route.params.oid as string

const { data: orgao } = await useFetch(`/api/orgaos/${oid}`)
</script>

<template>
  <div
    v-if="orgao"
    class="mt-6"
  >
    <UCard>
      <dl class="grid grid-cols-2 gap-4 text-sm">
        <div>
          <dt class="text-muted">
            Nome
          </dt>
          <dd>{{ orgao.nome }}</dd>
        </div>
        <div>
          <dt class="text-muted">
            Apelido
          </dt>
          <dd>{{ orgao.apelido ?? '—' }}</dd>
        </div>
        <div>
          <dt class="text-muted">
            Tipo
          </dt>
          <dd>{{ orgao.tipoOrgao ?? '—' }}</dd>
        </div>
        <div>
          <dt class="text-muted">
            Casa
          </dt>
          <dd>{{ orgao.casa || '—' }}</dd>
        </div>
        <div>
          <dt class="text-muted">
            Sala
          </dt>
          <dd>{{ orgao.sala ?? '—' }}</dd>
        </div>
        <div>
          <dt class="text-muted">
            Instalação
          </dt>
          <dd>
            <NuxtTime
              v-if="orgao.dataInstalacao"
              :datetime="orgao.dataInstalacao.slice(0, 10)"
              locale="pt-BR"
              year="numeric"
              month="2-digit"
              day="2-digit"
            />
            <span v-else>—</span>
          </dd>
        </div>
      </dl>
    </UCard>
  </div>
</template>
