// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/image', '@nuxt/ui', '@vueuse/nuxt', 'nitro-cloudflare-dev'],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/': { prerender: true },

    // Cache all API proxies (Camara/Senado upstreams). SWR: serve instantly
    '/api/**': {
      cache: {
        // @ts-expect-error - allowQuery is valid, but not typed
        allowQuery: true,
        maxAge: 60 * 5, // 5 minutes
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

    // Persist the cache in the CACHE KV binding (wrangler.jsonc),
    // so entries survive restarts and are shared across workers
    storage: {
      cache: {
        driver: 'cloudflare-kv-binding',
        binding: 'CACHE'
      }
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
