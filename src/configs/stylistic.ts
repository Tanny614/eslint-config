import type { Config, Rules } from '../types'
import { pluginStylistic } from '../plugins'

const customizedStylistic = pluginStylistic.configs.customize({
  blockSpacing: true,
  braceStyle: '1tbs',
  commaDangle: 'never',
  indent: 2,
  jsx: true,
  quoteProps: 'consistent-as-needed',
  quotes: 'single',
  semi: false
})

export const stylistic = (): Config[] => [
  {
    name: 'tanny/stylistic/setup',
    plugins: {
      '@stylistic': pluginStylistic
    }
  },
  {
    name: 'tanny/stylistic/rules',
    rules: {
      ...customizedStylistic.rules,
      '@stylistic/array-bracket-newline': ['error', 'consistent'],
      '@stylistic/array-element-newline': ['error', 'consistent'],
      '@stylistic/arrow-parens': ['error', 'as-needed'],
      '@stylistic/function-call-argument-newline': ['error', 'consistent'],
      '@stylistic/function-paren-newline': ['error', 'multiline-arguments'],
      '@stylistic/linebreak-style': ['error', 'unix'],
      '@stylistic/newline-per-chained-call': ['error', {
        ignoreChainWithDepth: 3
      }],
      '@stylistic/object-curly-newline': ['error', {
        consistent: true,
        multiline: true
      }],
      '@stylistic/object-property-newline': ['error', {
        allowAllPropertiesOnSameLine: true
      }]
    } satisfies Rules
  }
]
