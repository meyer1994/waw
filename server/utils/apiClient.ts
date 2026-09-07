export abstract class ApiClient {
  protected abstract readonly base: string

  protected abstract buildUrl(path: string): string

  async get<T>(path: string, query?: Record<string, unknown>): Promise<T> {
    const params: Record<string, string> = {}
    for (const [key, value] of Object.entries(query ?? {}))
      if (value !== undefined && value !== null) params[key] = String(value)

    // Nitro's typed internal $fetch conflicts with the generic T here
    return (await $fetch(this.buildUrl(path), {
      query: params,
      headers: { Accept: 'application/json' }
    })) as T
  }
}
