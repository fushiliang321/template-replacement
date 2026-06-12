import { defineConfig } from 'vite'
import { dirname, relative, sep, posix } from 'path'
import { fileURLToPath } from 'url'
import { wasmBase64Plugin } from './utils/vite'
import buildConfig from './build.config.json'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  plugins: [
    wasmBase64Plugin({
      algorithm: 'deflate',
      level: 9,
      encoding: 'base64',
    })
  ],
  build: {
    target: 'esnext',
    sourcemap: true,
    outDir: './dist',
    lib: {
      entry: buildConfig,
      name: 'template-replacement',
      formats: ['es'],
    },
    rolldownOptions: {
      output: {
        entryFileNames: (info) => {
          const facadeModuleId = info.facadeModuleId
          if (!facadeModuleId) {
            return '[name].js'
          }

          // 将绝对路径转换为相对于项目根目录的路径
          let relativePath = relative(__dirname, facadeModuleId)

          // 统一使用正斜杠
          relativePath = relativePath.split(sep).join(posix.sep)

          // 去掉开头的 ./ 和 .ts 后缀
          relativePath = relativePath.replace(/^\.\//, '').replace(/\.ts$/, '')

          // 返回目录结构保持不变的 js 路径
          return `${relativePath}.js`
        },
      },
    },
  },
  worker: {
    format: 'es',
  },
})
