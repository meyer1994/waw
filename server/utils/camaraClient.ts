import { ApiClient } from './apiClient'

export class CamaraClient extends ApiClient {
  protected readonly base = 'https://dadosabertos.camara.leg.br/api/v2'

  protected buildUrl(path: string): string {
    return `${this.base}/${path}`
  }
}

export const camaraClient = new CamaraClient()
