<script setup lang="ts">
const props = defineProps<{ did: string }>()

const route = useRoute()

const sections = computed(() => [
  { label: 'Proposições', value: 'proposicoes' },
  { label: 'Despesas', value: 'despesas' },
  { label: 'Eventos', value: 'eventos' },
  { label: 'Discursos', value: 'discursos' }
])

const active = computed(() => {
  const section = route.path.split('/')[3]
  return sections.value.find(s => s.value === section)?.value ?? 'proposicoes'
})

const onChange = (value: string | number) => {
  if (value === 'proposicoes')
    return navigateTo(`/deputados/${props.did}`)
  return navigateTo(`/deputados/${props.did}/${value}`)
}
</script>

<template>
  <UTabs
    :items="sections"
    :model-value="active"
    :content="false"
    class="mb-6"
    @update:model-value="onChange"
  />
</template>
