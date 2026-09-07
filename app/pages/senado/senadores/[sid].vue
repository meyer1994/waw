<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'

const route = useRoute()
const sid = route.params.sid as string

const { data } = await useFetch(`/api/senadores/${sid}`)
const senador = computed(() => data.value?.senador?.IdentificacaoParlamentar)

const perfil = computed(() => data.value?.senador)

useHead(() => ({ title: senador.value?.NomeParlamentar ?? 'Senador' }))
</script>

<template>
  <div>
    <div class="flex items-center gap-4 mb-8">
      <UAvatar
        :src="senador?.UrlFotoParlamentar ?? undefined"
        :alt="senador?.NomeParlamentar"
        :text="senador?.NomeParlamentar?.slice(0, 1)"
        size="3xl"
      />

      <div>
        <h1 class="text-2xl font-bold">
          {{ senador?.NomeParlamentar }}
        </h1>
        <p class="text-muted">
          {{ perfil?.DadosBasicosParlamentar?.Naturalidade }} • {{ senador?.SiglaPartidoParlamentar }} – {{ senador?.UfParlamentar }}
        </p>
        <p class="text-sm text-muted">
          {{ perfil?.IdentificacaoParlamentar?.FormaTratamento }} • Mesa: {{ senador?.MembroMesa === 'Sim' ? 'Sim' : 'Não' }}
        </p>
      </div>
    </div>

    <UTabs
      default-value="perfil"
      :items="([
        { label: 'Perfil', value: 'perfil' },
        { label: 'Filiações', value: 'filiacoes' },
        { label: 'Mandatos', value: 'mandatos' },
        { label: 'Comissões', value: 'comissoes' },
        { label: 'Cargos', value: 'cargos' },
        { label: 'Licenças', value: 'licencas' },
        { label: 'Discursos', value: 'discursos' },
        { label: 'Apartes', value: 'apartes' },
        { label: 'Profissões', value: 'profissao' },
        { label: 'Acadêmico', value: 'historicoAcademico' }
      ] satisfies TabsItem[])"
      @update:model-value="async e => await navigateTo(e === 'perfil' ? `/senado/senadores/${sid}` : `/senado/senadores/${sid}/${e}`)"
    >
      <template #content>
        <NuxtPage />
      </template>
    </UTabs>
  </div>
</template>
