import type { Deputado } from '../../deputados/index.get'

export type FrenteDetalhe = {
  id: number
  idLegislatura: number
  titulo: string
  uri: string
  coordenador: Deputado | null
  idSituacao: number | null
  email: string | null
  telefone: string | null
  situacao: string | null
  keywords: string | null
  urlDocumento: string | null
  urlWebsite: string | null
}

export default defineEventHandler(async (event): Promise<FrenteDetalhe> => {
  const fid = getRouterParam(event, 'fid')
  if (!fid) throw createError({ statusCode: 400, statusMessage: 'Parâmetro de rota obrigatório' })

  const response = await camaraClient.get<{ dados: FrenteDetalhe }>(`frentes/${fid}`)

  return response.dados
})
