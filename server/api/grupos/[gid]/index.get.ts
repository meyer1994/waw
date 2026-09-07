import type { Grupo } from '../index.get'

export type GrupoDetalhe = Grupo & {
  projetoTitulo: string | null
  projetoUri: string | null
}

export default defineEventHandler(async (event): Promise<GrupoDetalhe> => {
  const gid = getRouterParam(event, 'gid')

  const response = await camaraClient.get<{ dados: GrupoDetalhe }>(`grupos/${gid}`)

  return response.dados
})
