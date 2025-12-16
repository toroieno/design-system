import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig(({ mode }) => {
  const isLib = mode === 'lib'
  
  return {
    plugins: [
      vue(),
      // Generate .d.ts files for library build
      isLib && dts({
        insertTypesEntry: true,
        include: ['src/components/**/*', 'src/index.ts'],
        outDir: 'dist',
      }),
    ].filter(Boolean),
    
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    
    build: isLib ? {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'DesignSystem',
        fileName: 'design-system',
        formats: ['es', 'umd'],
      },
      rollupOptions: {
        // Externalize deps that shouldn't be bundled
        external: ['vue'],
        output: {
          // Global variable name for UMD build
          globals: {
            vue: 'Vue',
          },
          // Preserve CSS in a single file
          assetFileNames: (assetInfo) => {
            if (assetInfo.name === 'style.css') return 'style.css'
            return assetInfo.name || 'assets/[name][extname]'
          },
        },
      },
      // Generate sourcemaps for debugging
      sourcemap: true,
      // Clear output directory before build
      emptyOutDir: true,
    } : {},
    
  }
})
