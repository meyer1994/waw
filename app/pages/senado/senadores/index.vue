<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { PARTY_FLAGS, UF } from '~~/shared/constants'
import { senadoresSchema } from '~~/shared/schemas'
import { asArray } from '~~/shared/senado'
import type { SenadorListaDoc, SenadorEnLista } from '#shared/api-senado'

const ufItems: string[] = Object.values(UF)

const uf = ref<string>()
const participacao = ref<string>()
const afastados = ref(false)

const debUf = debouncedRef(uf, 500)
const url = computed(() => (afastados.value ? '/api/senado/senador/afastados.json' : '/api/senado/senador/lista/atual.json'))
const { data, status } = await useFetch(url, {
  query: computed(() => ({
    uf: debUf.value,
    participacao: participacao.value
  }))
})

const senadores = computed(() => {
  // Os dois serviços usam envelopes diferentes mas a mesma lista de Parlamentar
  const doc = data.value as SenadorListaDoc & { AfastamentoAtual?: SenadorListaDoc['ListaParlamentarEmExercicio'] } | undefined
  return asArray(doc?.ListaParlamentarEmExercicio?.Parlamentares?.Parlamentar ?? doc?.AfastamentoAtual?.Parlamentares?.Parlamentar)
})

const columns: TableColumn<SenadorEnLista>[] = [
  { id: 'foto', header: '', meta: { class: { th: 'w-16' } } },
  { id: 'nome', header: 'Nome' },
  { id: 'partido', header: 'Partido' },
  { id: 'uf', header: 'UF' },
  { id: 'participacao', header: 'Participação' },
  { id: 'bloco', header: 'Bloco' },
  { id: 'email', header: 'Email' }
]

useHead(() => ({ title: afastados.value ? 'Senadores Afastados' : 'Senadores' }))
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">
      {{ afastados ? 'Senadores Afastados' : 'Senadores' }}
    </h1>

    <!-- search form -->
    <UForm
      :schema="senadoresSchema"
      :disabled="status === 'pending'"
      class="flex gap-3 mb-4"
    >
      <USelectMenu
        v-model="uf"
        value-key="value"
        :items="ufItems.map(u => ({ label: u, value: u }))"
        searchable
        clear
        placeholder="Todos os estados"
      >
        <template #leading="{ modelValue }">
          <NuxtImg
            v-if="modelValue"
            :src="`/flags/${String(modelValue).toLowerCase()}.svg`"
            alt=""
            class="w-5 h-3.5 rounded-[2px] object-cover"
          />
        </template>

        <template #item-leading="{ item }">
          <NuxtImg
            v-if="item.value"
            :src="`/flags/${String(item.value).toLowerCase()}.svg`"
            alt=""
            class="w-5 h-3.5 rounded-[2px] object-cover"
          />
        </template>
      </USelectMenu>

      <USelectMenu
        v-model="participacao"
        value-key="value"
        :items="[
          { label: 'Titulares', value: 'T' },
          { label: 'Suplentes', value: 'S' }
        ]"
        clear
        placeholder="Participação"
      />

      <USwitch
        v-model="afastados"
        label="Afastados"
      />
    </UForm>

    <!-- table -->
    <UTable
      :data="senadores"
      :columns="columns"
      :loading="status === 'pending'"
    >
      <template #foto-cell="{ row }">
        <NuxtLink :to="`/senado/senadores/${row.original.IdentificacaoParlamentar.CodigoParlamentar}`">
          <UAvatar
            as="NuxtImg"
            :src="row.original.IdentificacaoParlamentar.UrlFotoParlamentar ?? undefined"
            :alt="row.original.IdentificacaoParlamentar.NomeParlamentar"
            :text="row.original.IdentificacaoParlamentar.NomeParlamentar.slice(0, 1)"
            size="sm"
            class="hover:ring-2 hover:ring-primary transition"
          />
        </NuxtLink>
      </template>

      <template #nome-cell="{ row }">
        <NuxtLink
          :to="`/senado/senadores/${row.original.IdentificacaoParlamentar.CodigoParlamentar}`"
          class="text-primary hover:underline font-medium"
        >
          {{ row.original.IdentificacaoParlamentar.NomeParlamentar }}
        </NuxtLink>
      </template>

      <template #partido-cell="{ row }">
        <span class="flex items-center gap-1.5">
          <NuxtImg
            v-if="row.original.IdentificacaoParlamentar.SiglaPartidoParlamentar && PARTY_FLAGS[row.original.IdentificacaoParlamentar.SiglaPartidoParlamentar]"
            :src="PARTY_FLAGS[row.original.IdentificacaoParlamentar.SiglaPartidoParlamentar]"
            alt=""
            class="w-5 h-3.5 rounded-[2px] object-cover"
          />
          {{ row.original.IdentificacaoParlamentar.SiglaPartidoParlamentar ?? '—' }}
        </span>
      </template>

      <template #uf-cell="{ row }">
        <span
          v-if="row.original.IdentificacaoParlamentar.UfParlamentar"
          class="flex items-center gap-1.5"
        >
          <NuxtImg
            :src="`/flags/${row.original.IdentificacaoParlamentar.UfParlamentar.toLowerCase()}.svg`"
            alt=""
            class="w-5 h-3.5 rounded-[2px] object-cover"
          />
          {{ row.original.IdentificacaoParlamentar.UfParlamentar }}
        </span>
        <span
          v-else
          class="text-muted text-sm"
        >—</span>
      </template>

      <template #participacao-cell="{ row }">
        <span class="text-muted text-sm">{{ row.original.Mandato?.DescricaoParticipacao ?? '—' }}</span>
      </template>

      <template #bloco-cell="{ row }">
        <span class="text-muted text-sm">{{ row.original.IdentificacaoParlamentar.Bloco?.NomeApelido ?? '—' }}</span>
      </template>

      <template #email-cell="{ row }">
        <ULink
          v-if="row.original.IdentificacaoParlamentar.EmailParlamentar"
          :to="`mailto:${row.original.IdentificacaoParlamentar.EmailParlamentar}`"
          class="text-primary hover:underline"
        >
          {{ row.original.IdentificacaoParlamentar.EmailParlamentar }}
        </ULink>
        <span
          v-else
          class="text-muted"
        >—</span>
      </template>
    </UTable>
  </div>
</template>
