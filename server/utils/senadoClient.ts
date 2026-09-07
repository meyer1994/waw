type FetchInit = NonNullable<Parameters<typeof $fetch>[1]>

const base = 'https://legis.senado.leg.br/dadosabertos'

export class SenadoClient {
  async get<T>(path: string, init?: FetchInit) {
    return await $fetch<T>(`${base}/${path}.json`, {
      ...init,
      headers: { Accept: 'application/json', ...init?.headers }
    })
  }

  // Senado XML->JSON responses return single records as plain objects, not arrays
  static toArray<T>(value: T | T[] | undefined | null): T[] {
    if (value === undefined || value === null) return []
    return Array.isArray(value) ? value : [value]
  }

  // Digs a nested list out of a response envelope.
  // Example: list('senador/123/mandatos', ['MandatoParlamentar', 'Parlamentar', 'Mandatos', 'Mandato'])
  async list<T>(path: string, keys: readonly string[], init?: FetchInit): Promise<T[]> {
    let node: unknown = await this.get<unknown>(path, init)

    for (const key of keys) {
      if (node === undefined || node === null) break
      node = (node as Record<string, unknown>)[key]
    }

    return SenadoClient.toArray(node as T | T[] | undefined | null)
  }
}

export const senadoClient = new SenadoClient()
