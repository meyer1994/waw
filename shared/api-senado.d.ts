// Tipos das respostas da API aberta do Senado (openapi-senado.json).
// Endpoints acessados via proxy: /api/senado/** -> https://legis.senado.leg.br/dadosabertos/**
//
// A API expone dos estilos de respuesta:
//  - Services "nuevos" (processo, votacao, lideranca, encontro): arrays/objetos JSON limpios,
//    tipados via `components` de shared/senado.d.ts.
//  - Services "XML" legados (senador, comissao, composicao, plenario, legislacao):
//    envoltorio { <NomeServico>: { Metadados, ... } } com colecciones PascalCase.
//    Para arrays repetibles, 1 item -> objeto, n items -> array (ver asArray).

import type { components } from './senado'

type Schemas = components['schemas']

// ------------------------------------------------------------------
// Util
// ------------------------------------------------------------------
export type MaybeArray<T> = T | T[] | null | undefined

// ------------------------------------------------------------------
// Senadores — senador/*
// ------------------------------------------------------------------
export interface IdentificacaoParlamentar {
  CodigoParlamentar: string
  CodigoPublicoNaLegAtual?: string
  NomeParlamentar: string
  NomeCompletoParlamentar?: string
  SexoParlamentar?: string
  FormaTratamento?: string
  UrlFotoParlamentar?: string
  UrlPaginaParlamentar?: string
  EmailParlamentar?: string
  SiglaPartidoParlamentar?: string
  UfParlamentar?: string
  MembroMesa?: string
  MembroLideranca?: string
  Bloco?: BlocoParlamentar
  Telefones?: { Telefone?: MaybeArray<{ NumeroTelefone: string, IndicadorFax?: string }> }
}

export interface BlocoParlamentar {
  CodigoBloco: string
  NomeBloco: string
  NomeApelido?: string
  DataCriacao?: string
}

export interface LegislaturaDoMandato {
  NumeroLegislatura: string
  DataInicio?: string
  DataFim?: string
}

export interface Mandato {
  CodigoMandato: string
  UfParlamentar: string
  PrimeiraLegislaturaDoMandato?: LegislaturaDoMandato
  SegundaLegislaturaDoMandato?: LegislaturaDoMandato
  DescricaoParticipacao?: string
  Partidos?: { Partido?: MaybeArray<{ CodigoPartido: string, Sigla?: string, NomePartido?: string }> }
  Suplentes?: { Suplente?: MaybeArray<{ DescricaoParticipacao: string, CodigoParlamentar: string, NomeParlamentar: string }> }
  Exercicios?: { Exercicio?: MaybeArray<{ CodigoExercicio: string, DataInicio?: string, DataFim?: string }> }
}

export interface SenadorEnLista {
  IdentificacaoParlamentar: IdentificacaoParlamentar
  Mandato?: Mandato
}

export interface SenadorDetalhe {
  DadosBasicosParlamentar?: {
    DataNascimento?: string
    Naturalidade?: string
    UfNaturalidade?: string
    EnderecoParlamentar?: string
  }
  IdentificacaoParlamentar?: IdentificacaoParlamentar
  OutrasInformacoes?: Record<string, unknown>
  Telefones?: unknown
}

export interface Filiacao {
  Partido: { CodigoPartido: string, SiglaPartido: string, NomePartido?: string }
  DataFiliacao?: string
  DataDesfiliacao?: string
}

export interface ComissaoMembro {
  IdentificacaoComissao: {
    CodigoComissao: string
    SiglaComissao: string
    NomeComissao: string
    SiglaCasaComissao?: string
  }
  DescricaoParticipacao?: string
  DataInicio?: string
}

export interface SessaoPlenariaPronunciamento {
  CodigoSessao?: string
  SiglaCasaSessao?: string
  SiglaTipoSessao?: string
  NumeroSessao?: string
  DataSessao?: string
}

export interface Pronunciamento {
  CodigoPronunciamento: string
  TipoUsoPalavra?: { Codigo: string, Sigla?: string, Descricao?: string }
  DataPronunciamento?: string
  SiglaPartidoParlamentarNaData?: string
  UfParlamentarNaData?: string
  SiglaCasaPronunciamento?: string
  TextoResumo?: string
  Indexacao?: string
  UrlTexto?: string
  UrlTextoBinario?: string
  SessaoPlenaria?: SessaoPlenariaPronunciamento
}

export interface CargoParlamentar {
  IdentificacaoComissao?: {
    CodigoComissao: string
    SiglaComissao: string
    NomeComissao: string
    SiglaCasaComissao?: string
  }
  CodigoCargo?: string
  DescricaoCargo?: string
  DataInicio?: string
}

export interface Licenca {
  Codigo: string
  DataInicio?: string
  DataInicioPrevista?: string
  DataFim?: string
  DataFimPrevista?: string
  SiglaTipoAfastamento?: string
  DescricaoTipoAfastamento?: string
}

export interface Curso {
  NomeCurso?: string
  GrauInstrucao?: string
  Estabelecimento?: string
  Local?: string
}

export interface Profissao {
  NomeProfissao?: string
  IndicadorAtividadePrincipal?: string
}

// Envolturas por serviço
export interface SenadorListaDoc { ListaParlamentarEmExercicio: { Parlamentares: { Parlamentar: MaybeArray<SenadorEnLista> } } }
export interface SenadorDetalheDoc { DetalheParlamentar: { Parlamentar: SenadorDetalhe } }
export interface MandatoDoc { MandatoParlamentar: { Parlamentar: { Mandatos?: { Mandato: MaybeArray<Mandato> } } } }
export interface FiliacaoDoc { FiliacaoParlamentar: { Parlamentar: { Filiacoes?: { Filiacao: MaybeArray<Filiacao> } } } }
export interface ComissaoMembroDoc { MembroComissaoParlamentar: { Parlamentar: { MembroComissoes?: { Comissao: MaybeArray<ComissaoMembro> } } } }
export interface PronunciamientoDoc { DiscursosParlamentar: { Parlamentar: { Pronunciamentos?: { Pronunciamento: MaybeArray<Pronunciamento> } } } }
export interface ApartesDoc { ApartesParlamentar: { Parlamentar: { Apartes?: { Aparte: MaybeArray<Pronunciamento> } } } }
export interface CargoDoc { CargoParlamentar: { Parlamentar: { Cargos?: { Cargo: MaybeArray<CargoParlamentar> } } } }
export interface LicencaDoc { LicencaParlamentar: { Parlamentar: { Licencas?: { Licenca: MaybeArray<Licenca> } } } }
export interface HistoricoAcademicoDoc { HistoricoAcademicoParlamentar: { Parlamentar: { HistoricoAcademico?: { Curso: MaybeArray<Curso> } } } }

// ------------------------------------------------------------------
// Comissão — comissao/*
// ------------------------------------------------------------------
export interface Colegiado {
  Codigo: string
  Sigla: string
  Nome: string
  DataInicio?: string
  Publica?: string
  CodigoTipoColegiado?: string
  SiglaTipoColegiado?: string
  DescricaoTipoColegiado?: string
  SiglaCasa?: string
}

export interface ColegiadoDetalhe {
  CodigoColegiado: string
  NomeColegiado: string
  SiglaColegiado: string
  DataInicio?: string
  QuantidadesMembros?: {
    Distribuicao?: { Senadores?: string, SenadoresTitulares?: string, SenadoresSuplentes?: string }
  }
  Cargos?: { Cargo?: MaybeArray<{
    TipoCargo: string
    CodigoCargo?: string
    NomeParlamentar?: string
    CodigoParlamentar?: string
    Bancada?: string
    ObservacaoCargo?: string
  }> }
}

export interface ComissaoListaDoc { ListaColegiados: { Colegiados: { Colegiado: MaybeArray<Colegiado> } } }
export interface ComissaoDetalheDoc { ComissoesCongresoNacional: { Colegiados: { Colegiado: MaybeArray<ColegiadoDetalhe> } } }

export interface MembroComissao {
  NomeMembro: string
  NomeCasaMembro?: string
  CodigoParlamentar?: string
  TipoVaga?: string
  IndicadorVagaAtiva?: string
  DataInicioMembroVaga?: string
  DataFimMembroVaga?: string
}

export interface ComposicaoComissaoDoc {
  UltimaComposicaoComissaoSf: { ComposicaoComissao: { Membros?: { Membro: MaybeArray<MembroComissao> } } }
}

// ------------------------------------------------------------------
// Procesos — processo/*
// (schema oficial: components['schemas'].processo e Processo)
// ------------------------------------------------------------------
export type ProcessoListItem = Schemas['processo']
export type ProcessoDetalhe = Schemas['Processo']

// ------------------------------------------------------------------
// Plenário — plenario/*
// ------------------------------------------------------------------
export interface SessaoAgenda {
  DiaUtil?: string
  Data?: string
  DiaSemana?: string
  Mes?: string
  Horario?: string
  Hora?: string
  NumeroSessao?: string
  TipoSessao?: string
  LocalSessao?: string
  CodigoSessao: string
  Casa?: string
  SessaoLegislativa?: string
  Legislatura?: string
  SituacaoSessao?: string
  PautaConfirmada?: string
}

export interface AgendaPlenarioDoc { AgendaPlenario: { Sessoes?: { Sessao: MaybeArray<SessaoAgenda> } } }

export interface SessaoLegislativa {
  codigo?: string
  numeroLegislatura?: string
  numeroSessao?: string
  tipoSessao?: string
  descricao?: string
  dataInicio?: string
  dataFim?: string
}

export interface TipoSessaoEncontro {
  codigo?: string
  siglaCasa?: string
  sigla?: string
  nome?: string
  ativo?: string
  tipoDeliberativa?: string
}

export interface Encontro {
  codigo: string
  dataPrevista?: string
  tipoPublicidade?: string
  sessaoLegislativa?: SessaoLegislativa
  codSessaoOrdia?: string
  tipoSessao?: TipoSessaoEncontro
  tipoSituacao?: { codigo?: string, nome?: string, realizada?: string }
  local?: string
  presidenteAtual?: string | null
}

export interface EncontroDoc {
  metadados?: { versao?: string, descricaoDataSet?: string, versaoServico?: string }
  encontros?: { encontro: MaybeArray<Encontro> }
}

export interface ItemPauta {
  codigo?: string
  sequencial?: string
  seqOrdem?: string
  identificacao?: string
  txtIdentificacao?: string
  apreciacao?: string
  txtApreciacao?: string
  ementa?: string
  txtEmenta?: string
  codMateria?: string
  tipoItemPauta?: string
  materiaLegislativa?: unknown
  itensResultado?: {
    itemResultado: MaybeArray<{
      codItemResultado?: string
      seqItemDeliberado?: string
      txtTituloResultado?: string
      desItemResultado?: string
      indNominal?: string
      qtdSim?: string
      qtdNao?: string
      qtdAbstencao?: string
      qtdQuorum?: string
      txtResultado?: string | null
      txtEncaminhamento?: string | null
      txtDecisao?: string | null
      txtDestino?: string | null
    }>
  }
}

export interface PautaDoc { ServicoPlenario: { itensPauta?: { itemPauta: MaybeArray<ItemPauta> } } }

export interface ResultadoItemPauta {
  codigo?: string
  seqOrdem?: string
  txtIdentificacao?: string
  txtApreciacao?: string
  txtEmenta?: string
  indAdiado?: string
  indPauta?: string
  indRetirado?: string
  itensResultado?: {
    itemResultado: MaybeArray<{
      codItemResultado?: string
      seqItemDeliberado?: string
      txtTituloResultado?: string
      desItemResultado?: string
      indNominal?: string
      qtdSim?: string
      qtdNao?: string
      qtdAbstencao?: string
      qtdQuorum?: string
      txtResultado?: string | null
      txtDecisao?: string | null
    }>
  }
}

export interface ResultadoEncontroDoc {
  ServicoPlenario: { encontros: { encontro: MaybeArray<{
    codigoEncontroLegislativo?: string
    numEncontro?: string
    dthTerminoPrevista?: string
    itensPauta?: { itemPauta: MaybeArray<ResultadoItemPauta> }
    quantidadesParlamentar?: unknown
  }> } }
}

export interface ResumoEncontro {
  codigo?: string
  dataPrevista?: string
  local?: string
  presidenteAtual?: string | null
  sessaoLegislativa?: SessaoLegislativa
}

export interface ResumoEncontroDoc { ServicoPlenario: { encontros: { encontro: MaybeArray<ResumoEncontro> } } }

// ------------------------------------------------------------------
// Votações — votacao
// ------------------------------------------------------------------
export type SessaoVotacao = Schemas['sessaoVotacao']

// ------------------------------------------------------------------
// Legislação — legislacao/*
// a lista (legislacao/lista) devolve itens planos; o detalhe aninha em `identificacao`
// ------------------------------------------------------------------
export interface DocumentoFlat {
  id: string
  tipo?: string
  descricao?: string
  numero?: string
  norma?: string
  normaNome?: string
  ementa?: string
}

export interface DocumentoDetalhe {
  id: string
  identificacao?: {
    tipo?: string
    descricao?: string
    numero?: string
    norma?: string
    normaNome?: string
    situacao?: string
    dataassinatura?: string
    apelido?: string
    uruDocumento?: string
    urlDocumento?: string
  }
  publicacoes?: { publicacao?: MaybeArray<Record<string, unknown>> }
}

export interface LegislacaoListaDoc { ListaDocumento: { documentos: MaybeArray<{ documento: MaybeArray<DocumentoFlat> }> } }
export interface LegislacaoDetalheDoc { DetalheDocumento: { documentos: { documento: MaybeArray<DocumentoDetalhe> } } }

// ------------------------------------------------------------------
// Composición — composicao/*
// ------------------------------------------------------------------
export interface BlocoLista {
  CodigoBloco: string
  NomeBloco: string
  NomeApelido?: string
  DataCriacao?: string
  Membros?: { Membro?: MaybeArray<{ Partido?: { Codigo?: string, Sigla?: string, Nome?: string } }> }
}

export interface BlocoListaDoc { ListaBlocoParlamentar: { Blocos: { Bloco: MaybeArray<BlocoLista> } } }

export interface BlocoDetalhe {
  id: string
  siglaCasa?: string
  nomeBloco: string
  nomeApelidoBloco?: string
  dataCriacao?: string
  composicaoBloco?: {
    composicao_bloco: MaybeArray<{
      id?: string
      idPartido?: string
      partido?: { idPartido: string, siglaPartido: string, nomePartido?: string, dataCriacao?: string }
      dataAdesao?: string
      sequenciaOrdemDia?: string
    }>
  }
}

export interface BlocoDetalheDoc { blocos: { bloco: BlocoDetalhe } }

export interface Partido {
  Codigo: string
  Sigla: string
  Nome: string
  DataCriacao?: string
  DataExtincao?: string
}

export interface PartidoListaDoc { ListaPartidos: { Partidos: { Partido: MaybeArray<Partido> } } }

export interface CargoMesa {
  TipoCargo?: string
  NomeParlamentar?: string
  CodigoParlamentar?: string
  Http?: string
  Bancada?: string
  Cargo?: string | string[]
}

export interface MesaColegiado {
  CodigoColegiado: string
  NomeColegiado: string
  SiglaColegiado: string
  DataInicio?: string
  Titulares?: string
  Suplentes?: string
  QuantidadesMembros?: { Titulares?: string, SenadoresTitulares?: string, DeputadosTitulares?: string }
  Cargos?: { Cargo?: MaybeArray<CargoMesa> }
}

export interface MesaSenadoDoc { MesaSenado: { Colegiados: { Colegiado: MaybeArray<MesaColegiado> } } }
export interface MesaCNDoc { MesaCongresso: { Colegiados: { Colegiado: MaybeArray<MesaColegiado> } } }

export type Lideranca = Schemas['lideranca']
