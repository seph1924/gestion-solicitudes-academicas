import { readFileSync } from 'node:fs'
import process from 'node:process'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf-8'))

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Lee .env, .env.production, etc. (incluye variables sin prefijo VITE_ solo para este archivo)
  const env = loadEnv(mode, process.cwd(), '')
  const analizar = mode === 'analyze'
  const esProduccion = mode === 'production' || analizar

  if (esProduccion && !env.VITE_API_URL) {
    console.warn('\n[build] Aviso: VITE_API_URL no está definida; el bundle usará http://localhost:3000/api\n')
  }

  return {
    plugins: [
      react(),
      // Genera stats.html con el mapa del bundle (npm run analyze)
      analizar && visualizer({ filename: 'stats.html', gzipSize: true, open: false })
    ],

    // Constantes reemplazadas en tiempo de compilación
    define: {
      __APP_VERSION__: JSON.stringify(pkg.version),
      __BUILD_DATE__: JSON.stringify(new Date().toISOString())
    },

    // Minificación con esbuild: elimina debugger y llamadas console.log/info/debug sueltas
    esbuild: esProduccion
      ? { drop: ['debugger'], pure: ['console.log', 'console.info', 'console.debug'] }
      : {},

    build: {
      target: 'es2020',
      minify: 'esbuild',
      sourcemap: false,
      chunkSizeWarningLimit: 400,
      rollupOptions: {
        output: {
          // Separa librerías estables del código propio: mejor caché del navegador
          manualChunks(id) {
            if (!id.includes('node_modules')) return
            if (/node_modules\/(react|react-dom|scheduler)\//.test(id)) return 'react'
            if (id.includes('react-router')) return 'router'
            if (id.includes('@reduxjs') || id.includes('react-redux') || id.includes('immer') || id.includes('reselect')) return 'estado'
            if (id.includes('axios')) return 'http'
          }
        }
      }
    }
  }
})
