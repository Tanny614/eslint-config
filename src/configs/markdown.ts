import type { Config, Rules } from '../types'
import { mergeProcessors, processorPassThrough } from 'eslint-merge-processors'
import { GLOB_MARKDOWN, GLOB_MARKDOWN_CODE, GLOB_MARKDOWN_IN_MARKDOWN, GLOB_VUE } from '../globs'
import { pluginAntfu, pluginCommand, pluginMarkdown, pluginPerfectionist, pluginUnusedImports, tseslint } from '../plugins'

export const markdown = (): Config[] => [
  {
    name: 'tanny/markdown/setup',
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      antfu: pluginAntfu,
      command: pluginCommand,
      markdown: pluginMarkdown,
      perfectionist: pluginPerfectionist,
      'unused-imports': pluginUnusedImports,
    },
  },
  {
    files: [GLOB_MARKDOWN],
    ignores: [GLOB_MARKDOWN_IN_MARKDOWN],
    name: 'tanny/markdown/processor',
    processor: mergeProcessors([
      pluginMarkdown.processors.markdown,
      processorPassThrough,
    ]),
  },
  {
    files: [GLOB_MARKDOWN],
    language: 'markdown/gfm',
    name: 'tanny/markdown/parser',
  },
  {
    files: [GLOB_MARKDOWN],
    name: 'tanny/markdown/rules',
    rules: {
      ...(pluginMarkdown.configs.recommended.at(0)?.rules ?? {}),
      'markdown/fenced-code-language': 'off',
      'markdown/no-missing-label-refs': 'off',
    } satisfies Rules,
  },
  {
    files: [GLOB_MARKDOWN],
    name: 'tanny/markdown/disables/markdown',
    rules: {
      'command/command': 'off',
      'no-irregular-whitespace': 'off',
      'perfectionist/sort-exports': 'off',
      'perfectionist/sort-imports': 'off',
    } satisfies Rules,
  },
  {
    files: [GLOB_MARKDOWN_CODE, `${GLOB_MARKDOWN}/${GLOB_VUE}`],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          impliedStrict: true,
        },
      },
    },
    name: 'tanny/markdown/disables/code',
    rules: {
      'antfu/no-top-level-await': 'off',
      'no-alert': 'off',
      'no-console': 'off',
      'no-labels': 'off',
      'no-lone-blocks': 'off',
      'no-restricted-syntax': 'off',
      'no-undef': 'off',
      'no-unused-expressions': 'off',
      'no-unused-labels': 'off',
      '@typescript-eslint/consistent-type-imports': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-redeclare': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      'unused-imports/no-unused-imports': 'off',
      'unused-imports/no-unused-vars': 'off',
    } satisfies Rules,
  },
]
