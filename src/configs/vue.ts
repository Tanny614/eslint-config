import type { ESLint } from 'eslint'
import type { Config, Rules } from '../types'
import { GLOB_VUE } from '../globs'
import { parserVue, pluginAntfu, pluginNode, pluginVue, tseslint } from '../plugins'
import { typescriptCore } from './typescript'

const vueTs: Config[] = typescriptCore
  .filter(config => config.name?.startsWith('tanny/typescript/') && !['tanny/typescript/setup', 'tanny/typescript/parser'].includes(config.name))
  .map(config => ({
    ...config,
    files: [GLOB_VUE],
    name: `tanny/vue/${config.name?.replace('tanny/typescript/', '') ?? 'anonymous'}`,
  }))

const recommendedRules = [
  pluginVue.configs.base.rules,
  ...pluginVue.configs['flat/essential'].map(config => config.rules),
  ...pluginVue.configs['flat/strongly-recommended'].map(config => config.rules),
  ...pluginVue.configs['flat/recommended'].map(config => config.rules),
].reduce((acc, rules) => ({ ...acc, ...rules }), {})

export const vue = (): Config[] => [
  ...vueTs,
  {
    files: [GLOB_VUE],
    languageOptions: {
      parser: parserVue,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        extraFileExtensions: ['.vue'],
        parser: tseslint.parser,
        sourceType: 'module',
      },
    },
    name: 'tanny/vue',
    plugins: {
      '@typescript-eslint': tseslint.plugin as ESLint.Plugin,
      vue: pluginVue,
      antfu: pluginAntfu,
      node: pluginNode,
    },
    processor: pluginVue.processors['.vue'],
    rules: {
      ...recommendedRules,
      'antfu/no-top-level-await': 'off',
      'no-useless-assignment': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      'vue/block-order': ['error', {
        order: ['script', 'template', 'style'],
      }],
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      'vue/component-options-name-casing': ['error', 'PascalCase'],
      'vue/custom-event-name-casing': ['error', 'camelCase'],
      'vue/define-macros-order': ['error', {
        order: ['defineOptions', 'defineProps', 'defineEmits', 'defineSlots'],
      }],
      'vue/eqeqeq': ['error', 'smart'],
      'vue/max-attributes-per-line': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/no-empty-pattern': 'error',
      'vue/no-irregular-whitespace': 'error',
      'vue/no-loss-of-precision': 'error',
      'vue/no-sparse-arrays': 'error',
      'vue/no-unused-refs': 'error',
      'vue/no-useless-v-bind': 'error',
      'vue/no-v-html': 'off',
      'vue/object-shorthand': ['error', 'always', {
        avoidQuotes: true,
        ignoreConstructors: false,
      }],
      'vue/padding-line-between-blocks': ['error', 'always'],
      'vue/prefer-template': 'error',
      'vue/prop-name-casing': ['error', 'camelCase'],
      'vue/require-default-prop': 'off',
      'vue/require-prop-types': 'off',
    } satisfies Rules,
  },
]
