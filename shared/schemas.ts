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
  itens: z.coerce.number().int().min(1).max(100).default(100),
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

export const despesasSchema = z.object({
  ano: z.coerce.number().int().min(1989).max(2100).optional(),
  mes: z.coerce.number().int().min(1).max(12).optional(),
  itens: z.coerce.number().int().min(1).max(100).default(100)
})

export const votacoesSchema = z.object({
  idProposicao: z.coerce.number().int().positive().optional(),
  idEvento: z.coerce.number().int().positive().optional(),
  idOrgao: z.coerce.number().int().positive().optional(),
  dataInicio: emptyToUndefined(z.iso.date()),
  dataFim: emptyToUndefined(z.iso.date()),
  itens: z.coerce.number().int().min(1).max(100).default(100)
})

export const eventosSchema = z.object({
  codTipoEvento: z.coerce.number().int().positive().optional(),
  idOrgao: z.coerce.number().int().positive().optional(),
  dataInicio: emptyToUndefined(z.iso.date()),
  dataFim: emptyToUndefined(z.iso.date()),
  itens: z.coerce.number().int().min(1).max(100).default(100)
})

export const orgaosSchema = z.object({
  sigla: emptyToUndefined(z.string().trim().min(1).toUpperCase()),
  codTipoOrgao: z.coerce.number().int().positive().optional(),
  itens: z.coerce.number().int().min(1).max(100).default(100)
})

export const proposicoesSchema = z.object({
  siglaTipo: emptyToUndefined(z.string().trim().min(1).toUpperCase()),
  numero: z.coerce.number().int().positive().optional(),
  ano: z.coerce.number().int().min(1987).max(2100).optional(),
  keywords: emptyToUndefined(z.string().trim().min(1)),
  codTema: z.coerce.number().int().positive().optional(),
  autor: emptyToUndefined(z.string().trim().min(1)),
  dataApresentacaoInicio: emptyToUndefined(z.iso.date()),
  dataApresentacaoFim: emptyToUndefined(z.iso.date()),
  itens: z.coerce.number().int().min(1).max(100).default(100)
})

// Senado cargos/comissoes upstream expects 'S'/'N'
export const ativoSchema = z.object({
  ativo: z.coerce.boolean().optional()
})
