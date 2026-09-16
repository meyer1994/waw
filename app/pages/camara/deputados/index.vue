<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { PARTY_FLAGS, UF } from '~~/shared/constants'
import { deputadosSchema } from '~~/shared/schemas'
import type { Deputado, CamaraLista, Partido } from '#shared/api'

const ufItems: string[] = Object.values(UF)

const name = ref('')
const siglaUf = ref<string>()
const siglaPartido = ref<string>()
const siglaSexo = ref<string>()
const idLegislatura = ref<string>()

const debName = debouncedRef(name, 500)
const { data, status } = await useFetch<CamaraLista<Deputado>>('/api/camara/deputados', {
  query: computed(() => ({
    nome: debName.value || undefined,
    siglaUf: siglaUf.value,
    siglaPartido: siglaPartido.value,
    siglaSexo: siglaSexo.value,
    idLegislatura: idLegislatura.value
  }))
})

const { data: partidos } = await useFetch<CamaraLista<Partido>>('/api/camara/partidos')

const sexoItems = [
  { label: 'Masculino', value: 'M' },
  { label: 'Feminino', value: 'F' }
]

const legislaturaItems = Array.from({ length: 6 }, (_, i) => ({ label: String(57 - i), value: String(57 - i) }))

const columns: TableColumn<Deputado>[] = [
  { id: 'foto', header: '', meta: { class: { th: 'w-16' } } },
  { accessorKey: 'nome', header: 'Nome' },
  { accessorKey: 'siglaPartido', header: 'Partido' },
  { accessorKey: 'siglaUf', header: 'UF' },
  { accessorKey: 'idLegislatura', header: 'Legislatura' },
  { accessorKey: 'email', header: 'Email' }
]
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">
      Deputados
    </h1>

    <!-- search form -->
    <UForm
      :schema="deputadosSchema"
      :disabled="status === 'pending'"
      class="flex gap-3 mb-4"
    >
      <UInput
        v-model="name"
        icon="i-lucide-search"
        placeholder="Buscar por nome..."
      />

      <USelectMenu
        v-model="siglaUf"
        value-key="value"
        :items="ufItems.map(uf => ({ label: uf, value: uf }))"
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
        v-model="siglaPartido"
        value-key="value"
        :items="partidos?.dados.map(p => ({ label: `${p.sigla} — ${p.nome}`, value: p.sigla })) ?? []"
        searchable
        clear
        placeholder="Partido"
      >
        <template #leading="{ modelValue }">
          <NuxtImg
            v-if="modelValue && PARTY_FLAGS[String(modelValue)]"
            :src="PARTY_FLAGS[String(modelValue)]"
            alt=""
            class="w-5 h-3.5 rounded-[2px] object-cover"
          />
        </template>

        <template #item-leading="{ item }">
          <NuxtImg
            v-if="item.value && PARTY_FLAGS[String(item.value)]"
            :src="PARTY_FLAGS[String(item.value)]"
            alt=""
            class="w-5 h-3.5 rounded-[2px] object-cover"
          />
        </template>
      </USelectMenu>

      <USelectMenu
        v-model="siglaSexo"
        value-key="value"
        :items="sexoItems"
        clear
        placeholder="Sexo"
      />

      <USelectMenu
        v-model="idLegislatura"
        value-key="value"
        :items="legislaturaItems"
        clear
        placeholder="Legislatura"
      />
    </UForm>

    <!-- table -->
    <UTable
      :data="data?.dados ?? []"
      :columns="columns"
      :loading="status === 'pending'"
    >
      <template #siglaPartido-cell="{ row }">
        <span class="flex items-center gap-1.5">
          <NuxtImg
            v-if="row.original.siglaPartido && PARTY_FLAGS[row.original.siglaPartido]"
            :src="PARTY_FLAGS[row.original.siglaPartido]"
            alt=""
            class="w-5 h-3.5 rounded-[2px] object-cover"
          />
          {{ row.original.siglaPartido ?? '—' }}
        </span>
      </template>

      <template #siglaUf-cell="{ row }">
        <span
          v-if="row.original.siglaUf"
          class="flex items-center gap-1.5"
        >
          <NuxtImg
            :src="`/flags/${row.original.siglaUf.toLowerCase()}.svg`"
            alt=""
            class="w-5 h-3.5 rounded-[2px] object-cover"
          />
          {{ row.original.siglaUf }}
        </span>
        <span
          v-else
          class="text-muted text-sm"
        >—</span>
      </template>

      <template #foto-cell="{ row }">
        <NuxtLink :to="`/camara/deputados/${row.original.id}`">
          <UAvatar
            as="NuxtImg"
            :src="row.original.urlFoto"
            :alt="row.original.nome"
            size="sm"
            class="hover:ring-2 hover:ring-primary transition"
          />
        </NuxtLink>
      </template>

      <template #email-cell="{ row }">
        <ULink
          v-if="row.original.email"
          :to="`mailto:${row.original.email}`"
          class="text-primary hover:underline"
        >
          {{ row.original.email }}
        </ULink>
        <span
          v-else
          class="text-muted"
        >—</span>
      </template>
    </UTable>
  </div>
</template>
