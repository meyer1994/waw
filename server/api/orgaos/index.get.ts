import { orgaosSchema } from '~~/shared/schemas'

export type Orgao = {
  id: number
  uri: string
  sigla: string
  nome: string
  apelido: string | null
  codTipoOrgao: number
  tipoOrgao: string | null
  nomePublicacao: string | null
  nomeResumido: string | null
}

export default defineEventHandler(async (event): Promise<{ dados: Orgao[] }> => {
  const { sigla, codTipoOrgao, itens } = await getValidatedQuery(event, data => orgaosSchema.parse(data))

  const res = await camaraClient.get<{ dados: Orgao[] }>('orgaos', { query: {
    sigla,
    codTipoOrgao,
    itens,
    ordem: 'desc',
    ordenarPor: 'id'
  } })

  return { dados: res.dados }
})
