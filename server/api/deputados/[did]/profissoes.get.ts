export type Profissao = {
  codTipoProfissao: number
  dataHora: string | null
  titulo: string
}

export default defineEventHandler(async (event): Promise<{ dados: Profissao[] }> => {
  const did = getRouterParam(event, 'did')

  return await $fetch(`https://dadosabertos.camara.leg.br/api/v2/deputados/${did}/profissoes`, {
    headers: { Accept: 'application/json' }
  })
})
