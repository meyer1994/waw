<script setup lang="ts">
import type { CamaraLista, Deputado } from '#shared/api'

const name = ref('')
const debName = debouncedRef(name, 500)

const { data, status } = await useFetch<CamaraLista<Deputado>>('/api/camara/deputados', {
  query: computed(() => ({ nome: debName.value || undefined, itens: 40 }))
})

const deputados = computed(() => data.value?.dados ?? [])

function initials(nome: string) {
  return nome.split(' ').filter(p => p.length > 2).slice(0, 2).map(p => p[0]).join('').toUpperCase()
}
</script>

<template>
  <div class="min-h-screen bg-white font-sans text-neutral-900 p-8">
    <header class="max-w-3xl mx-auto mb-10 flex items-end justify-between gap-4 flex-wrap">
      <div>
        <p class="text-xs font-semibold tracking-widest text-neutral-400 uppercase mb-1">
          Estilo 2 · Editorial
        </p>
        <h1 class="text-4xl font-serif tracking-tight">
          Deputados
        </h1>
      </div>
      <input
        v-model="name"
        type="text"
        placeholder="Buscar por nome..."
        class="w-64 border-b border-neutral-300 bg-transparent px-1 py-2 text-sm outline-none focus:border-neutral-900"
      >
    </header>

    <div
      v-if="status === 'pending'"
      class="max-w-3xl mx-auto text-neutral-400 text-sm"
    >
      Carregando…
    </div>

    <ul
      v-else
      class="max-w-3xl mx-auto divide-y divide-neutral-200 border-t border-neutral-200"
    >
      <li
        v-for="d in deputados"
        :key="d.id"
      >
        <NuxtLink
          :to="`/camara/deputados/${d.id}`"
          class="flex items-center gap-5 py-4 px-2 hover:bg-neutral-50 transition-colors"
        >
          <span class="w-10 h-10 shrink-0 rounded-full bg-neutral-900 text-white text-xs font-semibold flex items-center justify-center">
            {{ initials(d.nome) }}
          </span>
          <NuxtImg
            :src="d.urlFoto"
            :alt="d.nome"
            class="w-10 h-12 object-cover rounded-sm grayscale"
          />
          <span class="flex-1 min-w-0">
            <span class="block font-medium truncate">{{ d.nome }}</span>
            <span class="block text-xs text-neutral-500">{{ d.email ?? 'sem email' }}</span>
          </span>
          <span class="text-sm text-neutral-500 shrink-0">{{ d.siglaPartido }}/{{ d.siglaUf }}</span>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
