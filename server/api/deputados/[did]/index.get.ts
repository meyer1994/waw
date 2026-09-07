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
    siglaPartido: string
    siglaUf: string
    idLegislatura: number
    urlFoto: string
    email: string | null
    uri: string
    uriPartido: string | null
    situacao: string
    condicaoEleitoral: string
    data: string
  }
}

export default defineEventHandler(async (event): Promise<{
  deputado: DeputadoDetalhado
  proposicoes: { dados: Proposicao[], links: Link[] }
}> => {
  const did = getRouterParam(event, 'did')

  const [deputadoRes, proposicoesRes] = await Promise.all([
    camaraClient.get<{ dados: DeputadoDetalhado }>(`deputados/${did}`),
    camaraClient.get<{ dados: Proposicao[], links: Link[] }>('proposicoes', {
      idDeputadoAutor: did,
      dataApresentacaoInicio: '2023-01-01',
      itens: 10,
      ordem: 'desc',
      ordenarPor: 'id'
    })
  ])

  return {
    deputado: deputadoRes.dados,
    proposicoes: proposicoesRes
  }
})
