export type MembroGrupo = {
  cargo: string | null
  dataFim: string | null
  dataInicio: string | null
  idLegislatura: string | null
  nome: string
  ordemEntrada: number | null
  tipo: string | null
  uri: string | null
}

export default defineEventHandler(async (event): Promise<{ dados: { id: number, nome: string, membros: MembroGrupo[] }[] }> => {
  const gid = getRouterParam(event, 'gid')
  if (!gid) throw createError({ statusCode: 400, statusMessage: 'Parâmetro de rota obrigatório' })

  return await camaraClient.get<{ dados: { id: number, nome: string, membros: MembroGrupo[] }[] }>(`grupos/${gid}/membros`)
})
