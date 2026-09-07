<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { deputadosSchema } from '~~/shared/schemas'
import type { Deputado } from '~~/server/api/deputados/index.get'

const ufItems = ['AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO']

const name = ref('')
const siglaUf = ref('')

const debName = debouncedRef(name, 500)
const { data, status } = await useFetch('/api/deputados', { query: { nome: debName, siglaUf } })

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
        class="w-64"
      />

      <USelect
        v-model="siglaUf"
        :items="ufItems.map(uf => ({ label: uf || 'Todos os estados', value: uf }))"
        class="w-48"
      />
    </UForm>

    <!-- table -->
    <UTable
      :data="data?.dados ?? []"
      :columns="columns"
      :loading="status === 'pending'"
    >
      <template #foto-cell="{ row }">
        <NuxtLink :to="`/camara/deputados/${row.original.id}`">
          <UAvatar
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
