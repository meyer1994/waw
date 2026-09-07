export type Filiacao = {
  Partido: {
    CodigoPartido: string
    SiglaPartido: string
    NomePartido: string
  }
  DataFiliacao: string | null
  DataDesfiliacao: string | null
}

export default defineEventHandler(async (event): Promise<{ dados: Filiacao[] }> => {
  const sid = getRouterParam(event, 'sid')

  const dados = await senadoClient.list<Filiacao>(
    `senador/${sid}/filiacoes`,
    ['FiliacaoParlamentar', 'Parlamentar', 'Filiacoes', 'Filiacao']
  )

  return { dados }
})
