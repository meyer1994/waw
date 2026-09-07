export type Membro = {
  codTitulo: string | null
  dataFim: string | null
  dataInicio: string | null
  email: string | null
  id: number
  idLegislatura: number | null
  nome: string
  siglaPartido: string | null
  siglaUf: string | null
  titulo: string | null
  uri: string | null
  uriPartido: string | null
  urlFoto: string | null
}

export default defineEventHandler(async (event): Promise<{ dados: Membro[] }> => {
  const oid = getRouterParam(event, 'oid')

  return await $fetch(`https://dadosabertos.camara.leg.br/api/v2/orgaos/${oid}/membros`, {
    headers: { Accept: 'application/json' }
  })
})
