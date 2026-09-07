import type { Grupo } from '../index.get'

export type GrupoDetalhe = Grupo & {
  projetoTitulo: string | null
  projetoUri: string | null
  ultimoStatusID: {
    idLegislatura: number | null
    dataStatus: string | null
    documento: string | null
    presidenteNome: string | null
    presidenteUri: string | null
    oficioTitulo: string | null
    oficioUri: string | null
    oficioAutorNome: string | null
    oficioAutorTipo: string | null
    oficioAutorUri: string | null
    oficioDataApresentacao: string | null
    oficioDataPublicacao: string | null
  } | null
}

export default defineEventHandler(async (event): Promise<GrupoDetalhe> => {
  const gid = getRouterParam(event, 'gid')
  if (!gid) throw createError({ statusCode: 400, statusMessage: 'Parâmetro de rota obrigatório' })

  const response = await camaraClient.get<{ dados: GrupoDetalhe }>(`grupos/${gid}`)

  return response.dados
})
