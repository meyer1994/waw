<script setup lang="ts">
import type { CamaraLista, Deputado } from '#shared/api'
import { PARTY_FLAGS } from '~~/shared/constants'

const name = ref('')
const debName = debouncedRef(name, 500)

const { data, status } = await useFetch<CamaraLista<Deputado>>('/api/camara/deputados', {
  query: computed(() => ({ nome: debName.value || undefined, itens: 40 }))
})

const deputados = computed(() => data.value?.dados ?? [])
</script>

<template>
  <div class="min-h-screen bg-slate-100 font-sans text-slate-900 p-8">
    <header class="max-w-5xl mx-auto mb-8">
      <p class="text-xs font-semibold tracking-widest text-emerald-600 uppercase mb-1">
        Estilo 1 · Cards
      </p>
      <h1 class="text-3xl font-bold">
        Deputados
      </h1>
      <input
        v-model="name"
        type="text"
        placeholder="Buscar por nome..."
        class="mt-4 w-full max-w-sm rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm shadow-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
      >
    </header>

    <div
      v-if="status === 'pending'"
      class="max-w-5xl mx-auto text-slate-400 text-sm"
    >
      Carregando…
    </div>

    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto"
    >
      <NuxtLink
        v-for="d in deputados"
        :key="d.id"
        :to="`/camara/deputados/${d.id}`"
        class="group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all"
      >
        <NuxtImg
          :src="d.urlFoto"
          :alt="d.nome"
          class="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div class="p-4">
          <h3 class="font-semibold text-sm leading-snug line-clamp-2">
            {{ d.nome }}
          </h3>
          <div class="mt-2 flex items-center gap-2 text-xs text-slate-500">
            <NuxtImg
              v-if="d.siglaPartido && PARTY_FLAGS[d.siglaPartido]"
              :src="PARTY_FLAGS[d.siglaPartido]"
              alt=""
              class="w-5 h-3.5 rounded-[2px] object-cover"
            />
            <span>{{ d.siglaPartido }} · {{ d.siglaUf }}</span>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
