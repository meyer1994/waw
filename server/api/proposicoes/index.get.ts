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

export default defineEventHandler(async (): Promise<{ dados: Proposicao[], links: Link[] }> => {
  return await camaraClient.get<{ dados: Proposicao[], links: Link[] }>('proposicoes', { query: {
    itens: 10,
    ordem: 'desc',
    ordenarPor: 'id'
  } })
})
