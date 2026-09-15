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

export default defineEventHandler(async (event): Promise<{ dados: Proposicao[], links: Link[] }> => {
  const { siglaTipo, numero, ano, keywords, codTema, autor, dataApresentacaoInicio, dataApresentacaoFim, itens } = await getValidatedQuery(event, data => proposicoesSchema.parse(data))

  return await camaraClient.get<{ dados: Proposicao[], links: Link[] }>('proposicoes', { query: {
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
})
