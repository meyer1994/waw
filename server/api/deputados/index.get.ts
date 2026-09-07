import { deputadosSchema } from '~~/shared/schemas'

export type Deputado = {
  id: number
  nome: string
  siglaPartido: string
  siglaUf: string
  idLegislatura: number
  urlFoto: string
  email: string | null
  uri: string
  uriPartido: string
}

export default defineEventHandler(async (event): Promise<{ dados: Deputado[] }> => {
  const query = await getValidatedQuery(event, data => deputadosSchema.parse(data))

  const res = await camaraClient.get<{ dados: Deputado[] }>('deputados', { query })

  return { dados: res.dados }
})
