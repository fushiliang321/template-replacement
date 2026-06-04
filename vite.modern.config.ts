import { defineConfig } from 'vite'
import { dirname, relative, sep, posix } from 'path'
import { fileURLToPath } from 'url'
import { createRequire } from 'module'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const require = createRequire(import.meta.url)
const buildConfig = require('./build.config.json')

export default defineConfig({
  build: {
    target: 'esnext',
    sourcemap: true,
    outDir: './dist',
    lib: {
      entry: buildConfig.modern,
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
