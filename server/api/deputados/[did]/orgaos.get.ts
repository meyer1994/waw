export type Orgao = {
  codTitulo: string | null
  dataFim: string | null
  dataInicio: string | null
  idOrgao: number
  nomeOrgao: string
  nomePublicacao: string | null
  siglaOrgao: string | null
  titulo: string | null
  uriOrgao: string | null
}

export default defineEventHandler(async (event): Promise<{ dados: Orgao[] }> => {
  const did = getRouterParam(event, 'did')

  return await $fetch(`https://dadosabertos.camara.leg.br/api/v2/deputados/${did}/orgaos`, {
    headers: { Accept: 'application/json' }
  })
})
