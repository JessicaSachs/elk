import type { VitePWANuxtOptions } from '../modules/pwa/types'

export const pwa: VitePWANuxtOptions = {
  mode: 'production',
  // disable PWA only when in preview mode
  disable: true,
  scope: '/',
  srcDir: './service-worker',
  filename: 'sw.ts',
  strategies: 'injectManifest',
  injectRegister: false,
  includeManifestIcons: false,
  manifest: false,
  injectManifest: {
    globPatterns: ['**/*.{js,json,css,html,txt,svg,png,ico,webp,woff,woff2,ttf,eot,otf,wasm}'],
    globIgnores: ['emojis/**', 'shiki/**', 'manifest**.webmanifest'],
    manifestTransforms: [(entries) => {
      const manifest = entries.map((entry) => {
        if (entry.url.length > 1 && entry.url[0] !== '/')
          entry.url = `/${entry.url}`

        return entry
      })

      return { manifest, warnings: [] }
    }],
  },
  devOptions: {
    enabled: false,
    type: 'module',
  },
}
