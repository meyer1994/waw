<script setup lang="ts">
useHead({ title: 'Waw — Dados Legislativos' })
</script>

<template>
  <div>
    <UPageHero
      title="Dados Abertos Legislativos"
      description="Explore deputados, senadores, proposições, votações e mais — dados abertos da Câmara dos Deputados e do Senado Federal em um só lugar."
      :links="[{
        label: 'Ver deputados',
        to: '/camara/deputados',
        icon: 'i-lucide-arrow-right',
        trailing: true
      }, {
        label: 'Ver senadores',
        to: '/senado/senadores',
        color: 'neutral',
        variant: 'subtle'
      }]"
    />
  </div>
</template>
