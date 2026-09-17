<script setup lang="ts">
// Todas as tabelas de referência da API da Câmara (endpoints /referencias/*).
const grupos = [
  {
    title: 'Deputados',
    description: 'Referências usadas para filtrar e detalhar deputados.',
    endpoints: [
      { label: 'Referências de deputados', path: '/referencias/deputados' },
      { label: 'Situação', path: '/referencias/deputados/codSituacao' },
      { label: 'Tipo de profissão', path: '/referencias/deputados/codTipoProfissao' },
      { label: 'Sigla de UF', path: '/referencias/deputados/siglaUF' },
      { label: 'Tipo de despesa', path: '/referencias/deputados/tipoDespesa' }
    ]
  },
  {
    title: 'Eventos',
    endpoints: [
      { label: 'Referências de eventos', path: '/referencias/eventos' },
      { label: 'Situação do evento', path: '/referencias/eventos/codSituacaoEvento' },
      { label: 'Tipo de evento', path: '/referencias/eventos/codTipoEvento' }
    ]
  },
  {
    title: 'Órgãos',
    endpoints: [
      { label: 'Referências de órgãos', path: '/referencias/orgaos' },
      { label: 'Situação do órgão', path: '/referencias/orgaos/codSituacao' },
      { label: 'Tipo de órgão', path: '/referencias/orgaos/codTipoOrgao' }
    ]
  },
  {
    title: 'Proposições',
    endpoints: [
      { label: 'Referências de proposições', path: '/referencias/proposicoes' },
      { label: 'Situação', path: '/referencias/proposicoes/codSituacao' },
      { label: 'Tema', path: '/referencias/proposicoes/codTema' },
      { label: 'Tipo de autor', path: '/referencias/proposicoes/codTipoAutor' },
      { label: 'Tipo de tramitação', path: '/referencias/proposicoes/codTipoTramitacao' },
      { label: 'Sigla de tipo', path: '/referencias/proposicoes/siglaTipo' }
    ]
  },
  {
    title: 'Situações',
    endpoints: [
      { label: 'Situações de deputado', path: '/referencias/situacoesDeputado' },
      { label: 'Situações de evento', path: '/referencias/situacoesEvento' },
      { label: 'Situações de órgão', path: '/referencias/situacoesOrgao' },
      { label: 'Situações de proposição', path: '/referencias/situacoesProposicao' }
    ]
  },
  {
    title: 'Tipos',
    endpoints: [
      { label: 'Tipos de autor', path: '/referencias/tiposAutor' },
      { label: 'Tipos de evento', path: '/referencias/tiposEvento' },
      { label: 'Tipos de órgão', path: '/referencias/tiposOrgao' },
      { label: 'Tipos de proposição', path: '/referencias/tiposProposicao' },
      { label: 'Tipos de tramitação', path: '/referencias/tiposTramitacao' }
    ]
  },
  {
    title: 'Unidades federativas',
    endpoints: [
      { label: 'UFs', path: '/referencias/uf' }
    ]
  }
]

useHead(() => ({ title: 'Referências' }))
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">
      Referências
    </h1>

    <div class="flex flex-col gap-4">
      <ReferenciasCard
        v-for="grupo in grupos"
        :key="grupo.title"
        v-bind="grupo"
      />
    </div>
  </div>
</template>
