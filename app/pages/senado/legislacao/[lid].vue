<script setup lang="ts">
import { asArray } from '~~/shared/senado'
import type { DocumentoDetalhe, LegislacaoDetalheDoc } from '#shared/api-senado'

const route = useRoute()
const lid = route.params.lid as string

const { data } = await useFetch<LegislacaoDetalheDoc>(`/api/senado/legislacao/${lid}.json`)
const doc = computed(() => asArray(data.value?.DetalheDocumento?.documentos?.documento)[0] as DocumentoDetalhe | undefined)
const ident = computed(() => doc.value?.identificacao)
const publicacoes = computed(() => asArray(doc.value?.publicacoes?.publicacao))

const linhas = computed<[string, string][]>(() => {
  const d = ident.value
  if (!d) return []
  return [
    ['Identificação', d.normaNome ?? d.norma ?? '—'],
    ['Tipo', d.descricao ?? d.tipo ?? '—'],
    ['Número', d.numero ?? '—'],
    ['Assinatura', d.dataassinatura ?? '—'],
    ['Situação', d.situacao ?? '—'],
    ['Apelido', d.apelido ?? '—']
  ]
})

useHead(() => ({ title: ident.value?.normaNome ?? `Norma ${lid}` }))
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-1">
      {{ ident?.normaNome ?? ident?.norma }}
    </h1>
    <p class="text-muted text-sm mb-6">
      {{ ident?.descricao }} • {{ ident?.numero }} • {{ ident?.dataassinatura }}
    </p>

    <div
      v-if="doc"
      class="space-y-6"
    >
      <UCard>
        <dl class="grid grid-cols-2 gap-4 text-sm">
          <div
            v-for="[label, value] in linhas"
            :key="label"
          >
            <dt class="text-muted">
              {{ label }}
            </dt>
            <dd>{{ value }}</dd>
          </div>
        </dl>
        <template #footer>
          <UButton
            v-if="ident?.urlDocumento || ident?.uruDocumento"
            :to="ident.urlDocumento ?? ident.uruDocumento ?? ''"
            target="_blank"
            icon="i-lucide-external-link"
            color="primary"
            variant="soft"
          >
            Ver norma completa
          </UButton>
        </template>
      </UCard>

      <UCard v-if="publicacoes.length">
        <template #header>
          <h2 class="text-lg font-semibold">
            Publicações
          </h2>
        </template>
        <ul class="divide-y divide-(--ui-border) text-sm">
          <li
            v-for="(p, i) in publicacoes"
            :key="i"
            class="py-2 flex items-center justify-between gap-2"
          >
            <span>{{ p?.descricao ?? p?.tipo ?? 'Publicação' }}</span>
            <span class="text-muted text-xs">{{ p?.data ?? p?.dataPublicacao ?? '' }}</span>
          </li>
        </ul>
      </UCard>
    </div>
  </div>
</template>
