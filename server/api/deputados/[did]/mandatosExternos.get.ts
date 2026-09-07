export type MandatoExterno = {
  anoInicio: string | null
  anoFim: string | null
  cargo: string | null
  municipio: string | null
  siglaPartidoEleicao: string | null
  siglaUf: string | null
  uriPartidoEleicao: string | null
}

export default defineEventHandler(async (event): Promise<{ dados: MandatoExterno[] }> => {
  const did = getRouterParam(event, 'did')

  return await $fetch(`https://dadosabertos.camara.leg.br/api/v2/deputados/${did}/mandatosExternos`, {
    headers: { Accept: 'application/json' }
  })
})
