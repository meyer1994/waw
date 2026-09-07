import { z } from 'zod'

const emptyToUndefined = <T extends z.ZodTypeAny>(schema: T) =>
  z.preprocess(value => (value === '' ? undefined : value), schema.optional())

export const deputadosSchema = z.object({
  id: z.coerce.number().int().positive().optional(),
  nome: emptyToUndefined(z.string().trim().min(1)),
  idLegislatura: z.coerce.number().int().positive().optional(),
  siglaUf: emptyToUndefined(z.string().trim().length(2).toUpperCase()),
  siglaPartido: emptyToUndefined(z.string().trim().min(1).toUpperCase()),
  siglaSexo: z.enum(['M', 'F']).optional(),
  pagina: z.coerce.number().int().min(1).default(1),
  itens: z.coerce.number().int().min(1).max(100).default(15),
  dataInicio: z.iso.date().optional(),
  dataFim: z.iso.date().optional(),
  ordem: z.enum(['asc', 'desc']).default('asc'),
  ordenarPor: z.enum(['id', 'idLegislatura', 'nome', 'siglaUF', 'siglaPartido']).default('nome')
})

// Senado — https://legis.senado.leg.br/dadosabertos
export const senadoresSchema = z.object({
  uf: emptyToUndefined(z.string().trim().length(2).toUpperCase()),
  participacao: z.enum(['T', 'S']).optional(),
  afastados: z.coerce.boolean().optional()
})

export const pronunciamentosSchema = z.object({
  casa: emptyToUndefined(z.string().trim().length(2).toUpperCase()),
  dataInicio: emptyToUndefined(z.iso.date()),
  dataFim: emptyToUndefined(z.iso.date())
})

export const frentesSchema = z.object({
  idLegislatura: z.coerce.number().int().positive().optional()
})
