type FetchInit = NonNullable<Parameters<typeof $fetch>[1]>

const base = 'https://dadosabertos.camara.leg.br/api/v2'

export class CamaraClient {
  async get<T>(path: string, init?: FetchInit) {
    // Nitro's typed internal $fetch conflicts with the generic T here
    return await $fetch<T>(`${base}/${path}`, {
      ...init,
      headers: { Accept: 'application/json', ...init?.headers }
    })
  }
}

export const camaraClient = new CamaraClient()
