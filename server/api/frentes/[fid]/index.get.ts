export type FrenteDetalhe = {
  id: number
  idLegislatura: number
  titulo: string
  uri: string
  coordenador: string | null
  email: string | null
  telefone: string | null
  situacao: string | null
  keywords: string | null
  urlDocumento: string | null
  urlWebsite: string | null
}

export default defineEventHandler(async (event): Promise<FrenteDetalhe> => {
  const fid = getRouterParam(event, 'fid')

  const response = await $fetch<{ dados: FrenteDetalhe }>(
    `https://dadosabertos.camara.leg.br/api/v2/frentes/${fid}`,
    { headers: { Accept: 'application/json' } }
  )

  return response.dados
})
