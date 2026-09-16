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

export default defineEventHandler(async (event): Promise<{ dados: Proposicao[] }> => {
  const { siglaTipo, numero, ano, keywords, codTema, autor, dataApresentacaoInicio, dataApresentacaoFim, itens } = await getValidatedQuery(event, data => proposicoesSchema.parse(data))

  const res = await camaraClient.get<{ dados: Proposicao[] }>('proposicoes', { query: {
    siglaTipo,
    numero,
    ano,
    keywords,
    codTema,
    autor,
    dataApresentacaoInicio,
    dataApresentacaoFim,
    itens,
    ordem: 'desc',
    ordenarPor: 'id'
  } })

  return { dados: res.dados }
})
