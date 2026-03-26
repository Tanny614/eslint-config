import type { Config, Rules } from '../types'
import { pluginEslintComments } from '../plugins'

export const comments = (): Config[] => [
  {
    name: 'tanny/eslint-comments/rules',
    plugins: {
      'eslint-comments': pluginEslintComments,
    },
    rules: {
      'eslint-comments/no-aggregating-enable': 'error',
      'eslint-comments/no-duplicate-disable': 'error',
      'eslint-comments/no-unlimited-disable': 'error',
      'eslint-comments/no-unused-enable': 'error',
    } satisfies Rules,
  },
]
