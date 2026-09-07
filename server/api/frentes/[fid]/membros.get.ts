export type MembroFrente = {
  codTitulo: string | null
  dataFim: string | null
  dataInicio: string | null
  email: string | null
  id: number
  idLegislatura: number | null
  nome: string
  siglaPartido: string | null
  siglaUf: string | null
  titulo: string | null
  uri: string | null
  uriPartido: string | null
  urlFoto: string | null
}

export default defineEventHandler(async (event): Promise<{ dados: MembroFrente[] }> => {
  const fid = getRouterParam(event, 'fid')

  return await camaraClient.get<{ dados: MembroFrente[] }>(`frentes/${fid}/membros`)
})
