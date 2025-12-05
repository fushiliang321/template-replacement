import { globalIgnores } from 'eslint/config'
import oxlint from 'eslint-plugin-oxlint'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
    },
  },

  globalIgnores(['/dist/**', '/node_modules/**']),

  ...oxlint.configs['flat/recommended'], // oxlint should be the last one
]
