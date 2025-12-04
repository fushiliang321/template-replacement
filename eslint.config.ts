import { globalIgnores } from 'eslint/config'
import oxlint from 'eslint-plugin-oxlint'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx}'],
  },

  globalIgnores(["/dist/**", "/node_modules/**"]),

  ...oxlint.configs['flat/recommended'], // oxlint should be the last one
]
