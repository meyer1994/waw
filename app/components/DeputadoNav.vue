<script setup lang="ts">
const props = defineProps<{ did: string }>()

const route = useRoute()

const sections = computed(() => [
  { label: 'Proposições', to: `/deputados/${props.did}` },
  { label: 'Despesas', to: `/deputados/${props.did}/despesas` },
  { label: 'Eventos', to: `/deputados/${props.did}/eventos` },
  { label: 'Discursos', to: `/deputados/${props.did}/discursos` }
])

const isActive = (to: string) => route.path === to
</script>

<template>
  <nav class="flex gap-2 mb-6">
    <UButton
      v-for="section in sections"
      :key="section.to"
      :to="section.to"
      :label="section.label"
      :variant="isActive(section.to) ? 'soft' : 'ghost'"
      color="neutral"
      size="sm"
    />
  </nav>
</template>
