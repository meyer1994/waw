<script setup lang="ts">
import type { PageCardProps } from '@nuxt/ui'

useHead({ title: 'Waw — Dados Legislativos' })

const sections: PageCardProps[] = [
  {
    title: 'Deputados',
    description: 'Perfil, despesas, discursos, proposições e histórico dos deputados federais.',
    to: '/camara/deputados',
    icon: 'i-lucide-landmark'
  },
  {
    title: 'Senadores',
    description: 'Mandatos, comissões, filiações e pronunciamentos dos senadores.',
    to: '/senado/senadores',
    icon: 'i-lucide-vote'
  },
  {
    title: 'Proposições',
    description: 'Projetos de lei, ementas, tramitações, temas e votações.',
    to: '/camara/proposicoes',
    icon: 'i-lucide-file-text'
  },
  {
    title: 'Eventos',
    description: 'Sessões e reuniões com pauta, presentes e registros.',
    to: '/camara/eventos',
    icon: 'i-lucide-calendar-days'
  },
  {
    title: 'Votações',
    description: 'Resultados, votos por parlamentar e orientações das bancadas.',
    to: '/camara/votacoes',
    icon: 'i-lucide-check-check'
  },
  {
    title: 'Partidos & Blocos',
    description: 'Composição, lideranças e membros dos partidos e blocos.',
    to: '/camara/partidos',
    icon: 'i-lucide-flag'
  },
  {
    title: 'Órgãos',
    description: 'Comissões permanentes, especiais e conselhos, com membros e pautas.',
    to: '/camara/orgaos',
    icon: 'i-lucide-building-2'
  },
  {
    title: 'Frentes & Grupos',
    description: 'Frentes parlamentares e grupos de amizade Brasil–outros países.',
    to: '/camara/frentes',
    icon: 'i-lucide-users'
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
        label: 'Ver votações',
        to: '/camara/votacoes',
        color: 'neutral',
        variant: 'subtle'
      }]"
    />

    <UPageSection
      title="Explorar"
      description="Navegue pelas principais entidades do processo legislativo."
    >
      <UPageGrid>
        <UPageCard
          v-for="section in sections"
          :key="section.to"
          v-bind="section"
        />
      </UPageGrid>
    </UPageSection>

    <UPageSection>
      <UPageCard
        title="Fonte dos dados"
        description="Os dados são obtidos em tempo real das APIs oficiais de Dados Abertos da Câmara dos Deputados e do Senado Federal. Não há cache: cada consulta reflete o estado atual do serviço."
        icon="i-lucide-database"
        :to="'https://dadosabertos.camara.leg.br'"
        target="_blank"
      />
    </UPageSection>
  </div>
</template>
