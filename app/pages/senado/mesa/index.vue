<script setup lang="ts">
import { asArray } from '~~/shared/senado'
import type { CargoMesa, MesaCNDoc, MesaSenadoDoc } from '#shared/api-senado'

const { data: mesaSf } = await useFetch<MesaSenadoDoc>('/api/senado/composicao/mesaSF.json')
const { data: mesaCn } = await useFetch<MesaCNDoc>('/api/senado/composicao/mesaCN.json')

const colegiadoSf = computed(() => asArray(mesaSf.value?.MesaSenado?.Colegiados?.Colegiado)[0])
const colegiadoCn = computed(() => asArray(mesaCn.value?.MesaCongresso?.Colegiados?.Colegiado)[0])

const formatarCargo = (cargo: CargoMesa) => ({
  tipo: Array.isArray(cargo.Cargo) ? cargo.Cargo.join(', ') : (cargo.TipoCargo ?? cargo.Cargo ?? '—'),
  nome: cargo.NomeParlamentar ?? '—',
  bancada: cargo.Bancada ?? '',
  codigo: cargo.CodigoParlamentar ?? cargo.Http
})

const regras = computed(() => [
  { label: 'SF', colegiado: colegiadoSf.value },
  { label: 'CN', colegiado: colegiadoCn.value }
])

useHead(() => ({ title: 'Mesa Diretora' }))
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">
      Mesa Diretora
    </h1>

    <div class="grid lg:grid-cols-2 gap-6">
      <UCard
        v-for="regra in regras"
        :key="regra.label"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold">
              {{ regra.colegiado?.NomeColegiado ?? `Mesa — ${regra.label}` }}
            </h2>
            <UBadge variant="subtle">
              {{ regra.label }}
            </UBadge>
          </div>
        </template>

        <ul class="divide-y divide-(--ui-border) text-sm">
          <li
            v-for="(cargo, i) in asArray(regra.colegiado?.Cargos?.Cargo)"
            :key="i"
            class="py-2 flex items-center justify-between gap-3"
          >
            <span class="text-muted w-36 shrink-0">{{ formatarCargo(cargo).tipo }}</span>
            <span class="flex-1 font-medium">
              {{ formatarCargo(cargo).nome }}
            </span>
            <span class="text-muted text-xs shrink-0">
              {{ formatarCargo(cargo).bancada }}
            </span>
            <NuxtLink
              v-if="formatarCargo(cargo).codigo"
              :to="`/senado/senadores/${formatarCargo(cargo).codigo}`"
              class="text-primary hover:underline text-xs shrink-0"
            >
              Perfil
            </NuxtLink>
          </li>
          <li
            v-if="!asArray(regra.colegiado?.Cargos?.Cargo).length"
            class="py-2 text-muted"
          >
            Sem registros.
          </li>
        </ul>
      </UCard>
    </div>
  </div>
</template>
