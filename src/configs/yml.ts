import type { Config, Rules } from '../types'
import { GLOB_YAML } from '../globs'
import { pluginYml } from '../plugins'

export const yml = (): Config[] => [
  {
    name: 'tanny/yml/setup',
    plugins: {
      yml: pluginYml,
    },
  },
  {
    files: [GLOB_YAML],
    language: 'yml/yaml',
    name: 'tanny/yml/rules',
    rules: {
      'yml/block-mapping': 'error',
      'yml/block-sequence': 'error',
      'yml/no-empty-key': 'error',
      'yml/no-empty-sequence-entry': 'error',
      'yml/no-irregular-whitespace': 'error',
      'yml/plain-scalar': 'error',
      'yml/vue-custom-block/no-parsing-error': 'error',
      'yml/block-mapping-question-indicator-newline': 'error',
      'yml/block-sequence-hyphen-indicator-newline': 'error',
      'yml/flow-mapping-curly-newline': 'error',
      'yml/flow-mapping-curly-spacing': 'error',
      'yml/flow-sequence-bracket-newline': 'error',
      'yml/flow-sequence-bracket-spacing': 'error',
      'yml/indent': ['error', 2],
      'yml/key-spacing': 'error',
      'yml/no-tab-indent': 'error',
      'yml/quotes': ['error', { avoidEscape: true, prefer: 'single' }],
      'yml/spaced-comment': 'error',
    } satisfies Rules,
  },
]
