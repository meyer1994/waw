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
  // TODO: DC flag is the PSDC-era one (renamed in 2017)
  DC: '/partidos/Bandeira PSDC.svg',
  MISSÃO: '/partidos/Bandeira do Partido Missão.svg',
  NOVO: '/partidos/Partido Novo flag (2023).svg',
  PCdoB: '/partidos/PCdoB flag.svg',
  PL: '/partidos/Bandeira do Partido Liberal (Brasil).svg',
  // TODO: PP flag is the 1993 one, the current-era version is not on Commons
  PP: '/partidos/Bandeira do Partido Progressista (Brasil) (1993).svg',
  PT: '/partidos/Bandeira do Partido dos Trabalhadores (2022).svg',
  PV: '/partidos/Bandeira Partido Verde Brasil.svg'
}
