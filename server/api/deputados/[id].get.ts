import type { Deputado } from '../deputados.get'

type DeputadoDetalhado = Omit<Deputado, 'nome' | 'siglaPartido' | 'siglaUf' | 'idLegislatura' | 'email' | 'uriPartido' | 'urlFoto'> & {
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

export default defineEventHandler(async (event): Promise<DeputadoDetalhado> => {
  const id = getRouterParam(event, 'id')

  const response = await $fetch<{ dados: DeputadoDetalhado }>(
    `https://dadosabertos.camara.leg.br/api/v2/deputados/${id}`,
    { headers: { Accept: 'application/json' } }
  )

  return response.dados
})
