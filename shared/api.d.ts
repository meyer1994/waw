// Tipos das respostas da API aberta da Câmara (openapi-camara.json).
// Os endpoints são acessados via proxy: /api/camara/** -> https://dadosabertos.camara.leg.br/api/v2/**

// ------------------------------------------------------------------
// Envelope padrão de listagem e de item
// ------------------------------------------------------------------
// ------------------------------------------------------------------
// Alias das definições do OpenAPI (shared/camara.d.ts, gerado via
// `pnpm dlx openapi-typescript openapi-camara.json -o shared/camara.d.ts`)
// para os nomes usados nas páginas.
// ------------------------------------------------------------------
import type { components } from './camara'

export interface CamaraLink {
  href: string
  rel: string
  method?: string
}

export type CamaraLista<T> = { dados: T[], links: CamaraLink[] }
export type CamaraItem<T> = { dados: T, links: CamaraLink[] }

type Schemas = components['schemas']

// TODO: o spec tipa federacao como boolean, mas o upstream retorna 'S' | 'N'
export type Bloco = Omit<Schemas['Bloco'], 'federacao'> & { federacao?: string | null }
export type Deputado = Schemas['Deputado']
export type Despesa = Schemas['DeputadoDespesas']
export type Discurso = Schemas['DeputadoDiscurso']
export type Evento = Schemas['Eventos']
export type Frente = Schemas['Frente']
export type Historico = Schemas['DeputadoHistorico']
export type MandatoExterno = Schemas['DeputadoMandatoExterno']
export type Ocupacao = Schemas['DeputadoOcupacoes']
export type Orgao = Schemas['Orgao']
export type Profissao = Schemas['DeputadoProfissoes']
export type Proposicao = Schemas['ProposicaoRetornoPrincipal']
export type Pauta = Schemas['Pauta']
export type Votacao = Schemas['Votacao']
export type MembroFrente = Schemas['MembroFrente']
export type HistoricoGrupo = Schemas['Historico']
export type Grupo = Schemas['Grupos']
export type LiderLegislatura = Schemas['LegislaturaIDLideres']
export type MembroMesa = Schemas['LegislaturaIDMesa']
export type Legislatura = Schemas['Legislatura']
export type Membro = Schemas['OrgaoMembros']
export type Lider = Schemas['PartidosIDLideres']
export type Partido = Schemas['Partido']
export type Autor = Schemas['ProposicaoAutor']
export type ProposicaoRelacionada = Schemas['ProposicoesRelacionadas']
export type Tema = Schemas['ProposicaoTema']
export type Tramitacao = Schemas['ProposicaoTramitacao']
export type Orientacao = Schemas['Orientacao']
// TODO: o spec tipa Votos.deputado_ como opcional, mas o upstream sempre o retorna
export interface Voto {
  dataRegistroVoto: string | null
  tipoVoto: string | null
  deputado_: {
    id: number
    nome: string
    siglaPartido: string | null
    siglaUf: string | null
    idLegislatura: number | null
    urlFoto: string | null
    email: string | null
    uri: string | null
    uriPartido: string | null
  }
}

// tipos de detalhe: o spec define os schemas de detalhe como "inline"/vazios,
// então estendemos os tipos principais com os campos reais do upstream
export type ProposicaoDetalhe = Schemas['ProposicaoRetornoPrincipal'] & {
  descricaoTipo?: string | null
  ementaDetalhada?: string | null
  keywords?: string | null
  urlInteiroTeor?: string | null
  texto?: string | null
  justificativa?: string | null
  statusProposicao: {
    dataHora: string | null
    sequencia: number | null
    siglaOrgao: string | null
    uriOrgao: string | null
    regime: string | null
    descricaoTramitacao: string | null
    descricaoSituacao: string | null
    ementaUrl: string | null
  } | null
  uriAutores?: string | null
  uriOrgaoNumerador?: string | null
  uriPropAnterior?: string | null
  uriPropPosterior?: string | null
  uriPropPrincipal?: string | null
  urnFinal?: string | null
}
export type VotacaoDetalhe = Schemas['VotacaoID'] & {
  proposicaoObjeto?: string | null
  uriProposicaoObjeto?: string | null
}
export type PartidoDetalhe = Schemas['PartidoID']
export type FrenteDetalhe = Schemas['FrenteID']
export type OrgaoDetalhe = Schemas['OrgaoDetalhe']
export type DeputadoOrgao = Schemas['DeputadoOrgao']
export type GrupoMembros = { id: number, nome: string, membros: MembroGrupo[] }

// TODO: o spec tipa GruposMembros.membros como Membro (estilo OrgaoMembros),
// mas o upstream retorna cargo/tipo — forma real da resposta de /grupos/{id}/membros
export interface MembroGrupo {
  cargo: string | null
  dataFim: string | null
  dataInicio: string | null
  idLegislatura: string | null
  nome: string
  ordemEntrada: number | null
  tipo: string | null
  uri: string | null
}

// ------------------------------------------------------------------
// GET /deputados
// ------------------------------------------------------------------
export interface CamaraDeputadoItem {
  id: number
  uri: string
  nome: string
  siglaPartido: string
  siglaUf: string
  idLegislatura: number
  urlFoto: string
  email: string | null
  uriPartido: string
}

// ------------------------------------------------------------------
// GET /deputados/{id}
// ------------------------------------------------------------------
export interface CamaraGabinete {
  andar: string | null
  email: string | null
  nome: string | null
  predio: string | null
  sala: string | null
  telefone: string | null
}

export interface CamaraDeputadoUltimoStatus {
  id: number
  uri: string
  nome: string
  nomeEleitoral: string | null
  siglaPartido: string
  siglaUf: string
  idLegislatura: number
  urlFoto: string
  email: string | null
  situacao: string
  condicaoEleitoral: string
  descricaoStatus: string | null
  data: string
  gabinete: CamaraGabinete | null
}

export interface CamaraDeputadoDetalhe {
  cpf: string
  dataNascimento: string | null
  dataFalecimento: string | null
  escolaridade: string | null
  municipioNascimento: string | null
  nomeCivil: string | null
  redeSocial: string[]
  sexo: string | null
  ufNascimento: string | null
  uri: string
  urlWebsite: string | null
  ultimoStatus: CamaraDeputadoUltimoStatus
}

// ------------------------------------------------------------------
// GET /proposicoes
// ------------------------------------------------------------------
export interface CamaraProposicaoItem {
  id: number
  uri: string
  siglaTipo: string
  codTipo: number
  numero: number
  ano: number
  ementa: string
  dataApresentacao: string | null
}

// ------------------------------------------------------------------
// GET /proposicoes/{id}/autores
// ------------------------------------------------------------------
export interface CamaraProposicaoAutor {
  codTipo: number
  nome: string
  ordemAssinatura: number | null
  proponente: number | null
  tipo: string
  uri: string
}
