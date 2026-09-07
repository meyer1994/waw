import type { Grupo } from '../index.get'

export type GrupoDetalhe = Grupo & {
  projetoTitulo: string | null
  projetoUri: string | null
}

export default defineEventHandler(async (event): Promise<GrupoDetalhe> => {
  const gid = getRouterParam(event, 'gid')

  const response = await $fetch<{ dados: GrupoDetalhe }>(
    `https://dadosabertos.camara.leg.br/api/v2/grupos/${gid}`,
    { headers: { Accept: 'application/json' } }
  )

  return response.dados
})
