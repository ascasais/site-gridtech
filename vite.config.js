import { defineConfig } from 'vite'

// Página estática: o kit de design fica em public/assets e é servido como arquivos simples.
// Os arquivos gerados pelo Vite vão para dist/static, para não se misturar com public/assets.
export default defineConfig({
  build: { assetsDir: 'static' },
})
