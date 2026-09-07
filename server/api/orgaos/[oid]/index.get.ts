import type { Orgao } from '../index.get'

export type OrgaoDetalhe = Orgao & {
  dataInicio: string | null
  dataInstalacao: string | null
  dataFim: string | null
  dataFimOriginal: string | null
  casa: string | null
  sala: string | null
  urlWebsite: string | null
}

export default defineEventHandler(async (event): Promise<OrgaoDetalhe> => {
  const oid = getRouterParam(event, 'oid')
  if (!oid) throw createError({ statusCode: 400, statusMessage: 'Parâmetro de rota obrigatório' })

  const response = await camaraClient.get<{ dados: OrgaoDetalhe }>(`orgaos/${oid}`)

  return response.dados
})
