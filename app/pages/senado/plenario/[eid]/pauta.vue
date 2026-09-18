<script setup lang="ts">
import { asArray } from '~~/shared/senado'
import type { ItemPauta, PautaDoc } from '#shared/api-senado'

const route = useRoute()
const eid = route.params.eid as string

const { data, status } = await useFetch<PautaDoc>(`/api/senado/plenario/encontro/${eid}/pauta.json`)
const itens = computed(() => asArray(data.value?.ServicoPlenario?.itensPauta?.itemPauta))

const resultadosDoItem = (item: ItemPauta) => asArray(item.itensResultado?.itemResultado)
const tituloDoItem = (item: ItemPauta, index: number) =>
  `${index + 1}. ${item.identificacao?.trim() || item.txtIdentificacao?.trim() || 'Item'}`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">
      Pauta
    </h2>

    <div
      v-if="itens.length"
      class="space-y-3"
    >
      <UCard
        v-for="(item, i) in itens"
        :key="item.codigo ?? i"
      >
        <template #header>
          <h3 class="font-semibold text-sm">
            {{ tituloDoItem(item, i) }}
          </h3>
        </template>

        <div class="text-sm space-y-2">
          <p
            v-if="item.apreciacao"
            class="text-muted"
          >
            {{ item.apreciacao }}
          </p>
          <p>
            {{ item.ementa }}
          </p>
          <div
            v-if="resultadosDoItem(item).length"
            class="pt-2 border-t border-(--ui-border) space-y-1"
          >
            <p
              v-for="r in resultadosDoItem(item)"
              :key="r.codItemResultado"
              class="text-muted text-sm"
            >
              {{ r.txtTituloResultado ?? r.desItemResultado }} — {{ r.txtDecisao ?? r.txtResultado ?? '—' }}
            </p>
          </div>
        </div>
      </UCard>
    </div>

    <div
      v-else-if="status !== 'pending'"
      class="text-muted text-sm"
    >
      Sem itens de pauta.
    </div>
  </div>
</template>
