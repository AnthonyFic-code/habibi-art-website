// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxthub/core',
    '@nuxt/fonts',
    '@nuxt/ui',
    '@nuxt/eslint',
    '@vueuse/nuxt',
    'nuxt-auth-utils'
  ],

  hub: {
    blob: true,
    kv: true
  },

  ui: {
    icons: ['simple-icons']
  },

  experimental: {
    viewTransition: true
  },

  devtools: { enabled: true },

  eslint: {
    config: {
      stylistic: {
        quotes: 'single',
        commaDangle: 'never'
      }
    }
  }
})
