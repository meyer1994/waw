import { ApiClient } from './apiClient'

export class SenadoClient extends ApiClient {
  protected readonly base = 'https://legis.senado.leg.br/dadosabertos'

  protected buildUrl(path: string): string {
    return `${this.base}/${path}.json`
  }

  // Senado XML->JSON responses return single records as plain objects, not arrays
  static toArray<T>(value: T | T[] | undefined | null): T[] {
    if (value === undefined || value === null) return []
    return Array.isArray(value) ? value : [value]
  }

  // Digs a nested list out of a response envelope.
  // Example: list('senador/123/mandatos', ['MandatoParlamentar', 'Parlamentar', 'Mandatos', 'Mandato'])
  async list<T>(path: string, keys: readonly string[], query?: Record<string, unknown>): Promise<T[]> {
    let node: unknown = await this.get<unknown>(path, query)

    for (const key of keys) {
      if (node === undefined || node === null) break
      node = (node as Record<string, unknown>)[key]
    }

    return SenadoClient.toArray(node as T | T[] | undefined | null)
  }
}

export const senadoClient = new SenadoClient()
