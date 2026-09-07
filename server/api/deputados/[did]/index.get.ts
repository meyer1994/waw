import type { Deputado } from '../index.get'

export type Proposicao = {
  id: number
  uri: string
  siglaTipo: string
  codTipo: number
  numero: number
  ano: number
  ementa: string
  dataApresentacao: string | null
}

type Link = { href: string, rel: string, method?: string }

export type DeputadoDetalhado = Omit<Deputado, 'nome' | 'siglaPartido' | 'siglaUf' | 'idLegislatura' | 'email' | 'uriPartido' | 'urlFoto'> & {
  cpf: string
  dataNascimento: string | null
  dataFalecimento: string | null
  escolaridade: string | null
  municipioNascimento: string | null
  nomeCivil: string | null
  redeSocial: string[]
  sexo: string | null
  ufNascimento: string | null
  urlWebsite: string | null
  ultimoStatus: {
    id: number
    nome: string
    nomeEleitoral: string | null
    siglaPartido: string
    siglaUf: string
    idLegislatura: number
    urlFoto: string
    email: string | null
    uri: string
    uriPartido: string | null
    situacao: string
    condicaoEleitoral: string
    descricaoStatus: string | null
    data: string
    gabinete: {
      andar: string | null
      email: string | null
      nome: string | null
      predio: string | null
      sala: string | null
      telefone: string | null
    } | null
  }
}

export default defineEventHandler(async (event): Promise<{
  deputado: DeputadoDetalhado
  proposicoes: { dados: Proposicao[], links: Link[] }
}> => {
  const did = getRouterParam(event, 'did')
  if (!did) throw createError({ statusCode: 400, statusMessage: 'Parâmetro de rota obrigatório' })

  const [deputadoRes, proposicoesRes] = await Promise.all([
    camaraClient.get<{ dados: DeputadoDetalhado }>(`deputados/${did}`),
    camaraClient.get<{ dados: Proposicao[], links: Link[] }>('proposicoes', { query: {
      idDeputadoAutor: did,
      dataApresentacaoInicio: '2023-01-01',
      itens: 10,
      ordem: 'desc',
      ordenarPor: 'id'
    } })
  ])

  return {
    deputado: deputadoRes.dados,
    proposicoes: proposicoesRes
  }
})
