export type LiderLegislatura = {
  titulo: string | null
  dataInicio: string | null
  dataFim: string | null
  bancada: { nome: string | null, tipo: string | null, uri: string | null } | null
  parlamentar: {
    id: number
    nome: string
    siglaPartido: string | null
    siglaUf: string | null
    email: string | null
    urlFoto: string | null
    uri: string | null
  } | null
}

export default defineEventHandler(async (event): Promise<{ dados: LiderLegislatura[] }> => {
  const lid = getRouterParam(event, 'lid')

  return await $fetch(`https://dadosabertos.camara.leg.br/api/v2/legislaturas/${lid}/lideres`, {
    headers: { Accept: 'application/json' }
  })
})
