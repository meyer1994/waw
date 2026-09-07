import type { Deputado } from './index.get'
import { proposicoesSchema } from '~~/shared/schemas'

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
  const id = getRouterParam(event, 'id')
  const { pagina, itens, ordem, ordenarPor } = await getValidatedQuery(
    event,
    data => proposicoesSchema.pick({ pagina: true, itens: true, ordem: true, ordenarPor: true }).parse(data)
  )

  const [deputadoRes, proposicoesRes] = await Promise.all([
    $fetch<{ dados: DeputadoDetalhado }>(
      `https://dadosabertos.camara.leg.br/api/v2/deputados/${id}`,
      { headers: { Accept: 'application/json' } }
    ),
    $fetch<{ dados: Proposicao[], links: Link[] }>(
      'https://dadosabertos.camara.leg.br/api/v2/proposicoes',
      {
        query: {
          idDeputadoAutor: id,
          dataApresentacaoInicio: '2023-01-01',
          pagina,
          itens,
          ordem,
          ordenarPor
        },
        headers: { Accept: 'application/json' }
      }
    )
  ])

  return {
    deputado: deputadoRes.dados,
    proposicoes: proposicoesRes
  }
})
