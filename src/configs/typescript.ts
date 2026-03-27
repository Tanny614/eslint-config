import type { ESLint } from 'eslint'
import type { Config, Rules } from '../types'
import { defineConfig } from 'eslint/config'
import { GLOB_JS, GLOB_TS, GLOB_TSX } from '../globs'
import { pluginAntfu, pluginImportLite, pluginUnusedImports, tseslint } from '../plugins'

const typescriptRecommended: Config[] = tseslint.configs.recommended
  .filter(config => config.name !== 'typescript-eslint/base')
  .map(config => ({
    ...config,
    files: [GLOB_TS, GLOB_TSX],
    name: `tanny/typescript/${config.name?.replace('typescript-eslint/', '') ?? 'recommended'}`,
  }))

export const typescriptCore: Config[] = defineConfig(
  {
    name: 'tanny/typescript/setup',
    plugins: {
      '@typescript-eslint': tseslint.plugin as ESLint.Plugin,
      antfu: pluginAntfu,
      import: pluginImportLite,
      'unused-imports': pluginUnusedImports,
    },
  },
  {
    files: [GLOB_TS, GLOB_TSX],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        sourceType: 'module',
      },
    },
    name: 'tanny/typescript/parser',
  },
  ...typescriptRecommended,
  {
    files: [GLOB_TS, GLOB_TSX],
    name: 'tanny/typescript/rules',
    rules: {
      '@typescript-eslint/ban-ts-comment': ['error', { 'ts-expect-error': 'allow-with-description' }],
      '@typescript-eslint/consistent-type-assertions': ['error', {
        assertionStyle: 'as',
        objectLiteralTypeAssertions: 'allow-as-parameter',
      }],
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/consistent-type-imports': ['error', {
        disallowTypeAnnotations: false,
        fixStyle: 'separate-type-imports',
        prefer: 'type-imports',
      }],
      '@typescript-eslint/explicit-function-return-type': ['error', {
        allowExpressions: true,
        allowHigherOrderFunctions: true,
        allowIIFEs: true,
      }],
      '@typescript-eslint/method-signature-style': ['error', 'property'],
      '@typescript-eslint/no-dynamic-delete': 'off',
      '@typescript-eslint/no-empty-object-type': ['error', { allowInterfaces: 'always' }],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-extraneous-class': 'off',
      '@typescript-eslint/no-import-type-side-effects': 'error',
      '@typescript-eslint/no-invalid-void-type': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-redeclare': ['error', { builtinGlobals: false }],
      '@typescript-eslint/no-require-imports': 'error',
      '@typescript-eslint/no-unused-expressions': ['error', {
        allowShortCircuit: true,
        allowTaggedTemplates: true,
        allowTernary: true,
      }],
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-use-before-define': ['error', { classes: false, functions: false, variables: true }],
      '@typescript-eslint/no-useless-constructor': 'off',
      '@typescript-eslint/no-wrapper-object-types': 'error',
      '@typescript-eslint/prefer-as-const': 'warn',
      '@typescript-eslint/prefer-literal-enum-member': ['error', { allowBitwiseExpressions: true }],
      '@typescript-eslint/triple-slash-reference': 'off',
      '@typescript-eslint/unified-signatures': 'off',
    } satisfies Rules,
  },
)

export const typescript = (): Config[] => [
  ...typescriptCore,
  {
    files: ['**/*.d.ts'],
    name: 'tanny/typescript/dts-rules',
    rules: {
      'import/no-duplicates': 'off',
      'no-restricted-syntax': 'off',
      'unused-imports/no-unused-vars': 'off',
    } satisfies Rules,
  },
  {
    files: [GLOB_JS, '**/*.cjs'],
    name: 'tanny/typescript/cjs-rules',
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    } satisfies Rules,
  },
]
