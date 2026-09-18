<script setup lang="ts">
useHead({ title: 'Waw — Dados Legislativos' })

const senadoCards = [
  {
    title: 'Senadores',
    description: 'Lista, filiações, mandatos, comissões, discursos e mais.',
    to: '/senado/senadores',
    icon: 'i-lucide-users'
  },
  {
    title: 'Comissões',
    description: 'Colegiados do Senado e do Congresso Nacional.',
    to: '/senado/comissao',
    icon: 'i-lucide-building-2'
  },
  {
    title: 'Processos',
    description: 'Processos legislativos em tramitação ou encerrados.',
    to: '/senado/processos',
    icon: 'i-lucide-file-text'
  },
  {
    title: 'Plenário',
    description: 'Agenda de sessões, pauta, resultados e resumos.',
    to: '/senado/plenario',
    icon: 'i-lucide-calendar-days'
  },
  {
    title: 'Votações',
    description: 'Votos nominais de parlamentares em processos.',
    to: '/senado/votacoes',
    icon: 'i-lucide-check-check'
  },
  {
    title: 'Legislação',
    description: 'Normas jurídicas federais.',
    to: '/senado/legislacao',
    icon: 'i-lucide-scale'
  },
  {
    title: 'Blocos',
    description: 'Blocos parlamentares e sua composição.',
    to: '/senado/blocos',
    icon: 'i-lucide-layers'
  },
  {
    title: 'Partidos',
    description: 'Partidos políticos em atividade ou extintos.',
    to: '/senado/partidos',
    icon: 'i-lucide-flag'
  },
  {
    title: 'Mesa Diretora',
    description: 'Composição das mesas do Senado e do Congresso.',
    to: '/senado/mesa',
    icon: 'i-lucide-landmark'
  },
  {
    title: 'Lideranças',
    description: 'Lideranças do governo e da oposição nas casas.',
    to: '/senado/lideranca',
    icon: 'i-lucide-crown'
  }
]
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

    <h2 class="text-xl font-bold mt-10 mb-4">
      Senado
    </h2>
    <UPageGrid>
      <UPageCard
        v-for="card in senadoCards"
        :key="card.to"
        :title="card.title"
        :description="card.description"
        :to="card.to"
        :icon="card.icon"
      >
        <template #footer>
          <UButton
            :to="card.to"
            color="neutral"
            variant="ghost"
            size="sm"
            label="Explorar"
            icon="i-lucide-arrow-right"
            trailing
          />
        </template>
      </UPageCard>
    </UPageGrid>
  </div>
</template>
