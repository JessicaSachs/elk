import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.elk.app',
  appName: '@elk-zone/elk',
  webDir: '.output/public',
  server: {
    androidScheme: 'https',
  },
}

export default config
