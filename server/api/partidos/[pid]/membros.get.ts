import type { Deputado } from '../../deputados/index.get'

export default defineEventHandler(async (event): Promise<{ dados: Deputado[] }> => {
  const pid = getRouterParam(event, 'pid')

  return await $fetch(`https://dadosabertos.camara.leg.br/api/v2/partidos/${pid}/membros`, {
    headers: { Accept: 'application/json' }
  })
})
