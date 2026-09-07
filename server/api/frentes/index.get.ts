import { frentesSchema } from '~~/shared/schemas'

export type Frente = {
  id: number
  idLegislatura: number
  titulo: string
  uri: string
}

export default defineEventHandler(async (event): Promise<{ dados: Frente[] }> => {
  // upstream returns 0 rows without an idLegislatura filter
  const { idLegislatura } = await getValidatedQuery(event, data => frentesSchema.parse(data))

  return await camaraClient.get<{ dados: Frente[] }>('frentes', {
    // upstream /frentes rejects ordem/ordenarPor with 400
    query: { idLegislatura: idLegislatura ?? 57 }
  })
})
