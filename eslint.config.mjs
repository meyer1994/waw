// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // Your custom configs here
  {
    ignores: ['app/pages/examples/**', 'shared/camara.d.ts']
  }
)
