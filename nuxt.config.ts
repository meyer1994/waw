// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/image', '@nuxt/ui', '@vueuse/nuxt', 'nitro-cloudflare-dev'],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/': { prerender: true },

    // Proxy direto para a API da Câmara — sem endpoints server-side.
    // O caminho após /api/camara/ é repassado ao upstream.
    '/api/camara/**': {
      proxy: 'https://dadosabertos.camara.leg.br/api/v2/**',

      // Cache (SWR) na CACHE KV do Cloudflare, como antes
      cache: {
        // @ts-expect-error - allowQuery is valid, but not typed
        allowQuery: true,
        maxAge: 60 * 5, // 5 minutos
        staleMaxAge: 60 * 10, // 10 minutos
        swr: true
      }
    },

    // Idem para a API do Senado (dados abertos legislativos).
    // /api/senado/senador/... -> https://legis.senado.leg.br/dadosabertos/senador/...
    '/api/senado/**': {
      proxy: 'https://legis.senado.leg.br/dadosabertos/**',

      cache: {
        // @ts-expect-error - allowQuery is valid, but not typed
        allowQuery: true,
        maxAge: 60 * 5,
        staleMaxAge: 60 * 10,
        swr: true
      }
    }
  },

  compatibilityDate: '2026-06-30',

  nitro: {
    preset: 'cloudflare_module',

    cloudflare: {
      deployConfig: true,
      nodeCompat: true
    },

    debug: true,
    logLevel: 'debug',

    // Persist the cache in the CACHE KV binding (wrangler.jsonc),
    // so entries survive restarts and are shared across workers
    storage: {
      cache: {
        driver: 'cloudflare-kv-binding',
        binding: 'CACHE'
      }
    }
  },

  typescript: {
    tsConfig: {
      exclude: ['../app/pages/examples']
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
