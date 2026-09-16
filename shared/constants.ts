export enum UF {
  AC = 'AC',
  AL = 'AL',
  AM = 'AM',
  AP = 'AP',
  BA = 'BA',
  CE = 'CE',
  DF = 'DF',
  ES = 'ES',
  GO = 'GO',
  MA = 'MA',
  MG = 'MG',
  MS = 'MS',
  MT = 'MT',
  PA = 'PA',
  PB = 'PB',
  PE = 'PE',
  PI = 'PI',
  PR = 'PR',
  RJ = 'RJ',
  RN = 'RN',
  RO = 'RO',
  RR = 'RR',
  RS = 'RS',
  SC = 'SC',
  SE = 'SE',
  SP = 'SP',
  TO = 'TO'
}

// Party sigla -> flag in /public/partidos
// Only parties present in Category:SVG flags of political parties in Brazil are mapped
export const PARTY_FLAGS: Record<string, string> = {
  Agir: '/partidos/agir.png',
  Avante: '/partidos/avante.png',
  Cidadania: '/partidos/cidadania.png',
  // TODO: DC flag is the PSDC-era one (renamed in 2017)
  DC: '/partidos/dc.svg',
  MISSÃO: '/partidos/missao.svg',
  MOBILIZA: '/partidos/mobiliza.png',
  NOVO: '/partidos/novo.svg',
  PCdoB: '/partidos/pcdob.svg',
  PL: '/partidos/pl.svg',
  PMB: '/partidos/pmb.png',
  PMN: '/partidos/pmn.png',
  PP: '/partidos/pp.png',
  Podemos: '/partidos/podemos.png',
  PSB: '/partidos/psb.png',
  PSD: '/partidos/psd.png',
  PSDB: '/partidos/psdb.png',
  PSC: '/partidos/psc.png',
  PSOL: '/partidos/psol.png',
  PT: '/partidos/pt.svg',
  PTB: '/partidos/ptb.png',
  PV: '/partidos/pv.svg',
  REDE: '/partidos/rede.png',
  PRTB: '/partidos/prtb.png',
  Republicanos: '/partidos/republicanos.png',
  Solidariedade: '/partidos/solidariedade.png',
  UNIÃO: '/partidos/uniao.png'
}

// https://dadosabertos.camara.leg.br/api/v2/referencias/eventos (curated common types)
export const COD_TIPO_EVENTO: Record<number, string> = {
  110: 'Sessão Deliberativa',
  112: 'Reunião Deliberativa',
  115: 'Sessão Não Deliberativa Solene',
  118: 'Trabalho de Comissões',
  120: 'Audiência Pública',
  125: 'Audiência Pública e Deliberação',
  150: 'Sessão Não Deliberativa de Debates',
  152: 'Reunião de Debate',
  175: 'Sessão Preparatória - Posse',
  177: 'Sessão Preparatória - Eleição'
}

// https://dadosabertos.camara.leg.br/api/v2/referencias/orgaos/codTipoOrgao
export const COD_TIPO_ORGAO: Record<number, string> = {
  1: 'Comissão Diretora',
  2: 'Comissão Permanente',
  3: 'Comissão Especial',
  4: 'Comissão Parlamentar de Inquérito',
  5: 'Comissão Externa',
  6: 'Comissão Mista Permanente',
  7: 'Comissão de Sindicância',
  8: 'Comissão Representativa do CN',
  9: 'Comissão Medida Provisória',
  10: 'Grupo de Trabalho',
  11: 'Conselho',
  12: 'Procuradoria Parlamentar',
  13: 'Corregedoria',
  14: 'Ouvidoria',
  15: 'Coordenadoria da Mulher',
  16: 'Secretaria',
  17: 'Outros'
}

// Curated main legislative types (upstream /referencias/proposicoes/siglaTipo is noisy)
export const SIGLA_TIPO = [
  'PL',
  'PLP',
  'PLV',
  'PEC',
  'MPV',
  'PDC',
  'PDL',
  'PRC',
  'PFC',
  'PET',
  'REQ',
  'MSC',
  'MSF',
  'MSG'
] as const

// https://dadosabertos.camara.leg.br/api/v2/referencias/proposicoes/codTema
export const COD_TEMA: Record<number, string> = {
  34: 'Administração Pública',
  35: 'Arte, Cultura e Religião',
  37: 'Comunicações',
  39: 'Direitos e Garantias',
  40: 'Direito Penal e Processual Penal',
  41: 'Direito Civil e Processual Civil',
  42: 'Economia e Finanças',
  43: 'Defesa e Segurança',
  44: 'Educação',
  46: 'Energia',
  48: 'Esporte e Lazer',
  51: 'Saúde',
  52: 'Habitação',
  53: 'Indústria',
  54: 'Meio Ambiente',
  55: 'Trabalho e Emprego',
  56: 'Agricultura',
  57: 'Previdência Social',
  58: 'Assistência Social',
  60: 'Transportes',
  61: 'Ciência, Tecnologia e Informática',
  62: 'Política Internacional e Relações Exteriores',
  64: 'Turismo',
  66: 'Viação',
  67: 'Sistema Financeiro e Tributário',
  68: 'Consumidor',
  70: 'Água',
  72: 'Saneamento',
  74: 'Comércio e Serviços',
  76: 'Justiça',
  85: 'Política Social',
  86: 'Povos Indígenas'
}

export const MESES = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro'
] as const
