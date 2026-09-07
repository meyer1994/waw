<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { z } from 'zod'
import { deputadosSchema } from '~~/shared/schemas'
import type { Deputado } from '~~/server/api/deputados.get'

const ufItems = ['AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO']

type State = z.output<typeof deputadosSchema>
const state = reactive<Partial<State>>({ pagina: 1, itens: 15 })

const { data, status } = await useFetch('/api/deputados', { query: state })
const hasNextPage = computed(() => data.value?.links.some(link => link.rel === 'next') ?? false)
const hasPreviousPage = computed(() => data.value?.links.some(link => link.rel === 'previous') ?? false)

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
  <UApp>
    <UHeader>
      <template #left>
        <NuxtLink
          to="/"
          class="focus-visible:outline-3 outline-primary/25 rounded-md p-1 -ms-1"
        >
          <span class="font-bold">Deputados</span>
        </NuxtLink>
      </template>

      <template #right>
        <UColorModeButton />

        <UButton
          to="https://github.com/nuxt-ui-templates/starter"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
          color="neutral"
          variant="ghost"
        />
      </template>
    </UHeader>

    <UMain>
      <UContainer class="py-8">
        <h1 class="text-2xl font-bold mb-4">
          Deputados
        </h1>

        <!-- search form -->
        <UForm
          :state="state"
          :schema="deputadosSchema"
          :disabled="status === 'pending'"
          class="flex gap-3 mb-4"
        >
          <UInput
            v-model="state.nome"
            icon="i-lucide-search"
            placeholder="Buscar por nome..."
            class="w-64"
          />

          <USelect
            v-model="state.siglaUf"
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
            <UAvatar
              :src="row.original.urlFoto"
              :alt="row.original.nome"
              size="sm"
            />
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

        <div class="flex justify-end gap-3 mt-4">
          <UButton
            icon="i-lucide-chevron-left"
            color="neutral"
            variant="outline"
            :disabled="!hasPreviousPage"
            @click="() => state.pagina = (state.pagina ?? 1) - 1"
          >
            Anterior
          </UButton>
          <UButton
            trailing-icon="i-lucide-chevron-right"
            color="neutral"
            variant="outline"
            :disabled="!hasNextPage"
            @click="() => state.pagina = (state.pagina ?? 1) + 1"
          >
            Próxima
          </UButton>
        </div>
      </UContainer>
    </UMain>

    <USeparator icon="i-simple-icons-nuxtdotjs" />

    <UFooter>
      <template #left>
        <p class="text-sm text-muted">
          Built with Nuxt UI • © {{ new Date().getFullYear() }}
        </p>
      </template>

      <template #right>
        <UButton
          to="https://github.com/nuxt-ui-templates/starter"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
          color="neutral"
          variant="ghost"
        />
      </template>
    </UFooter>
  </UApp>
</template>
