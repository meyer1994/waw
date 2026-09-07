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

export const proposicoesSchema = z.object({
  id: z.coerce.number().int().positive().optional(),
  idDeputadoAutor: z.coerce.number().int().positive().optional(),
  siglaTipo: emptyToUndefined(z.string().trim().min(1).toUpperCase()),
  numero: z.coerce.number().int().positive().optional(),
  ano: z.coerce.number().int().min(1900).optional(),
  dataApresentacaoInicio: z.iso.date().optional(),
  dataApresentacaoFim: z.iso.date().optional(),
  pagina: z.coerce.number().int().min(1).default(1),
  itens: z.coerce.number().int().min(1).max(100).default(15),
  ordem: z.enum(['asc', 'desc']).default('desc'),
  ordenarPor: z.enum(['id', 'codTipo', 'siglaTipo', 'numero', 'ano']).default('id')
})

export const despesasSchema = z.object({
  ano: z.coerce.number().int().min(1990).optional(),
  mes: z.coerce.number().int().min(1).max(12).optional(),
  cnpjCpfFornecedor: emptyToUndefined(z.string().trim().min(1)),
  pagina: z.coerce.number().int().min(1).default(1),
  itens: z.coerce.number().int().min(1).max(100).default(15),
  ordem: z.enum(['asc', 'desc']).default('desc'),
  ordenarPor: z.string().trim().min(1).default('ano')
})

export const eventosSchema = z.object({
  dataInicio: z.iso.date().optional(),
  dataFim: z.iso.date().optional(),
  pagina: z.coerce.number().int().min(1).default(1),
  itens: z.coerce.number().int().min(1).max(100).default(15),
  ordem: z.enum(['asc', 'desc']).default('desc'),
  ordenarPor: z.string().trim().min(1).default('dataHoraInicio')
})

export const discursosSchema = z.object({
  dataInicio: z.iso.date().optional(),
  dataFim: z.iso.date().optional(),
  pagina: z.coerce.number().int().min(1).default(1),
  itens: z.coerce.number().int().min(1).max(100).default(15),
  ordem: z.enum(['asc', 'desc']).default('desc'),
  ordenarPor: z.string().trim().min(1).default('dataHoraInicio')
})
