import { defineConfig } from 'vite';
import wasmPack from 'vite-plugin-wasm-pack';
import dts from 'vite-plugin-dts';
import { terser } from 'rollup-plugin-terser';

export default defineConfig({
  plugins: [
    wasmPack([], ['template-replacement-sign-core-wasm','template-replacement-core-wasm']),
    dts({
      entryRoot: './dist',
      insertTypesEntry: true,
    }),
  ],
  build: {
    outDir: './dist',
    lib: {
      entry: ['./worker/main/sign.ts', './worker/main/general.ts', './replace/general.ts', './replace/sign.ts'],
      name: 'template-replacement',
      fileName: (format, entryName) => `${entryName}.js`,
      formats: ['es'],
    },
    minify:"terser",
    rollupOptions: {
      plugins: [terser({
        format: {
          // 取消代码注释
          comments: false,
        },
        mangle: {
          keep_classnames: false,
          reserved: [],
        },
      })],
      output: {
        entryFileNames: (info: { facadeModuleId: string; }) => {
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
  }
})