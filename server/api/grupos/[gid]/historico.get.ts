export type HistoricoGrupo = {
  dataStatus: string | null
  documentoSGM: string | null
  idLegislatura: string | null
  observacao: string | null
  oficioTitulo: string | null
  oficioAutor: string | null
  oficioAutorTipo: string | null
  oficioAutorUri: string | null
  oficioDataApresentacao: string | null
  oficioDataPublicacao: string | null
  presidente: string | null
  presidenteUri: string | null
}

export default defineEventHandler(async (event): Promise<{ dados: HistoricoGrupo[] }> => {
  const gid = getRouterParam(event, 'gid')
  if (!gid) throw createError({ statusCode: 400, statusMessage: 'Parâmetro de rota obrigatório' })

  return await camaraClient.get<{ dados: HistoricoGrupo[] }>(`grupos/${gid}/historico`)
})
