// Helpers para a API de dados abertos do Senado.
// https://legis.senado.leg.br/dadosabertos

/**
 * A API do Senado converte XML→JSON: um elemento repetível aparece como array
 * quando há 2+ itens, mas como objeto único quando há apenas 1 (e ausente
 * quando não há). Normaliza sempre a um array.
 */
export const asArray = <T>(value: T | T[] | null | undefined): T[] => {
  if (value === null || value === undefined) return []
  return Array.isArray(value) ? value : [value]
}

/** Formatea la fecha ISO/`dd/mm/aaaa` del Senado para NuxtTime sin romperse. */
export const senadoDate = (value?: string | null) => value ?? null

/** Extrae el nombre corto del Parlamentar dentro del objeto raíz de un servicio XML. */
export const parlName = (root: { Parlamentar?: { Nome?: string } } | undefined | null) =>
  root?.Parlamentar?.Nome ?? null
