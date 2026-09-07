<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { PARTY_FLAGS, UF } from '~~/shared/constants'
import { senadoresSchema } from '~~/shared/schemas'
import type { Senador } from '~~/server/api/senadores/index.get'

const ufItems: string[] = Object.values(UF)

const uf = ref('')
const participacao = ref('todos')
const afastados = ref(false)

const debUf = debouncedRef(uf, 500)
const { data, status } = await useFetch('/api/senadores', {
  query: computed(() => ({
    afastados: afastados.value || undefined,
    uf: debUf.value || undefined,
    participacao: participacao.value === 'todos' ? undefined : participacao.value
  }))
})

const columns: TableColumn<Senador>[] = [
  { id: 'foto', header: '', meta: { class: { th: 'w-16' } } },
  { accessorKey: 'NomeParlamentar', header: 'Nome' },
  { accessorKey: 'SiglaPartidoParlamentar', header: 'Partido' },
  { accessorKey: 'UfParlamentar', header: 'UF' },
  { accessorKey: 'DescricaoParticipacao', header: 'Participação' },
  { accessorKey: 'EmailParlamentar', header: 'Email' }
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
      <USelect
        v-model="uf"
        :items="ufItems.map(u => ({ label: u || 'Todos os estados', value: u }))"
        class="w-48"
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
      </USelect>

      <USelect
        v-model="participacao"
        :items="[
          { label: 'Todos', value: 'todos' },
          { label: 'Titulares', value: 'T' },
          { label: 'Suplentes', value: 'S' }
        ]"
        class="w-48"
      />

      <USwitch
        v-model="afastados"
        label="Afastados"
      />
    </UForm>

    <!-- table -->
    <UTable
      :data="data?.dados ?? []"
      :columns="columns"
      :loading="status === 'pending'"
    >
      <template #SiglaPartidoParlamentar-cell="{ row }">
        <span class="flex items-center gap-1.5">
          <NuxtImg
            v-if="PARTY_FLAGS[row.original.SiglaPartidoParlamentar]"
            :src="PARTY_FLAGS[row.original.SiglaPartidoParlamentar]"
            alt=""
            class="w-5 h-3.5 rounded-[2px] object-cover"
          />
          {{ row.original.SiglaPartidoParlamentar }}
        </span>
      </template>

      <template #UfParlamentar-cell="{ row }">
        <span class="flex items-center gap-1.5">
          <NuxtImg
            :src="`/flags/${row.original.UfParlamentar.toLowerCase()}.svg`"
            alt=""
            class="w-5 h-3.5 rounded-[2px] object-cover"
          />
          {{ row.original.UfParlamentar }}
        </span>
      </template>
      <template #foto-cell="{ row }">
        <NuxtLink :to="`/senado/senadores/${row.original.CodigoParlamentar}`">
          <UAvatar
            :src="row.original.UrlFotoParlamentar ?? undefined"
            :alt="row.original.NomeParlamentar"
            :text="row.original.NomeParlamentar?.slice(0, 1)"
            size="sm"
            class="hover:ring-2 hover:ring-primary transition"
          />
        </NuxtLink>
      </template>

      <template #NomeParlamentar-cell="{ row }">
        <NuxtLink
          :to="`/senado/senadores/${row.original.CodigoParlamentar}`"
          class="text-primary hover:underline font-medium"
        >
          {{ row.original.NomeParlamentar }}
        </NuxtLink>
      </template>

      <template #DescricaoParticipacao-cell="{ row }">
        {{ row.original.DescricaoParticipacao ?? '—' }}
      </template>

      <template #EmailParlamentar-cell="{ row }">
        <ULink
          v-if="row.original.EmailParlamentar"
          :to="`mailto:${row.original.EmailParlamentar}`"
          class="text-primary hover:underline"
        >
          {{ row.original.EmailParlamentar }}
        </ULink>
        <span
          v-else
          class="text-muted"
        >—</span>
      </template>
    </UTable>
  </div>
</template>
