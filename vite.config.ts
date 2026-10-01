import { copyFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * GitHub Pages has no SPA fallback, so a deep link like /strawberries/shop would 404.
 * Pages serves 404.html for unknown paths; making it a copy of index.html lets the router take over.
 */
function spaFallback(): Plugin {
  let outDir = 'dist'
  return {
    name: 'spa-fallback-404',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir)
    },
    async closeBundle() {
      await copyFile(resolve(outDir, 'index.html'), resolve(outDir, '404.html'))
    },
  }
}

export default defineConfig(({ command }) => ({
  // Served from https://ratherblue.github.io/strawberries/ in production; the dev server stays at /.
  base: command === 'build' ? '/strawberries/' : '/',
  plugins: [react(), spaFallback()],
  css: {
    modules: { localsConvention: 'camelCaseOnly' },
    preprocessorOptions: { scss: { api: 'modern-compiler' } },
  },
}))
