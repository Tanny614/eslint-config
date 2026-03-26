import type { Config, Rules } from '../types'
import { GLOB_SRC } from '../globs'
import { pluginJsdoc } from '../plugins'

export const jsdoc = (): Config[] => [
  {
    name: 'tanny/jsdoc/setup',
    plugins: {
      jsdoc: pluginJsdoc,
    },
  },
  {
    files: [GLOB_SRC],
    name: 'tanny/jsdoc/rules',
    rules: {
      'jsdoc/check-access': 'warn',
      'jsdoc/check-alignment': 'warn',
      'jsdoc/check-param-names': 'warn',
      'jsdoc/check-property-names': 'warn',
      'jsdoc/check-types': 'warn',
      'jsdoc/empty-tags': 'warn',
      'jsdoc/implements-on-classes': 'warn',
      'jsdoc/multiline-blocks': 'warn',
      'jsdoc/no-defaults': 'warn',
      'jsdoc/no-multi-asterisks': 'warn',
      'jsdoc/require-param-name': 'warn',
      'jsdoc/require-property': 'warn',
      'jsdoc/require-property-description': 'warn',
      'jsdoc/require-property-name': 'warn',
      'jsdoc/require-returns-check': 'warn',
      'jsdoc/require-returns-description': 'warn',
      'jsdoc/require-yields-check': 'warn',
    } satisfies Rules,
  },
]
