import { defineConfig } from '@playwright/test'

// Usa o Google Chrome já instalado no computador (não baixa outro navegador)
export default defineConfig({
  testDir: './e2e',
  outputDir: './test-results',
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:5199',
    channel: 'chrome',
  },
  webServer: {
    command: 'npm run dev -- --port 5199 --strictPort',
    url: 'http://localhost:5199',
    reuseExistingServer: true,
  },
})
