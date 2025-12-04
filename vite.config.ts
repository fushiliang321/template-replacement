import { defineConfig } from 'vite'
import wasmPack from 'vite-plugin-wasm-pack'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    wasmPack(
      [],
      ['template-replacement-sign-core-wasm', 'template-replacement-core-wasm'],
    ),
    dts({
      entryRoot: './dist',
      insertTypesEntry: true,
    }),
  ],
  build: {
    outDir: './dist',
    lib: {
      entry: [
        './worker/main/sign.ts',
        './worker/main/general.ts',
        './replace/general.ts',
        './replace/sign.ts',
      ],
      name: 'template-replacement',
      fileName: (format, entryName) => `${entryName}.js`,
      formats: ['es'],
    },
    rollupOptions: {
      output: {
        entryFileNames: (info: { facadeModuleId: string }) => {
          const modules = info.facadeModuleId?.split('/')
          if (!modules?.length || modules?.length < 2) {
            return '[name].js'
          }
          return modules[modules?.length - 2] + '/[name].js'
        },
      },
    },
  },
  worker: {
    format: 'es',
  },
})
