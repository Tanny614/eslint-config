import type { Config, Rules } from '../types'
import { readFileSync } from 'node:fs'
import { pluginJson, pluginPnpm } from '../plugins'

function detectCatalogUsage(): boolean {
  try {
    const yaml = readFileSync('pnpm-workspace.yaml', 'utf8')
    return yaml.includes('catalog:') || yaml.includes('catalogs:')
  }
  catch {
    return false
  }
}

export function pnpm(): Config[] {
  const catalogs = detectCatalogUsage()

  return [
    {
      files: ['package.json', '**/package.json'],
      language: 'jsonc/x',
      name: 'tanny/pnpm/package-json',
      plugins: {
        jsonc: pluginJson,
        pnpm: pluginPnpm,
      },
      rules: {
        ...(catalogs
          ?
            {
              'pnpm/json-enforce-catalog': [
                'error',
                {
                  autofix: true,
                  ignores: ['@types/vscode'],
                },
              ],
            }
          : {}),
        'pnpm/json-prefer-workspace-settings': ['error', { autofix: true }],
        'pnpm/json-valid-catalog': ['error', { autofix: true }],
      } satisfies Rules,
    },
    {
      files: ['pnpm-workspace.yaml'],
      language: 'yml/yaml',
      name: 'tanny/pnpm/pnpm-workspace-yaml',
      plugins: {
        pnpm: pluginPnpm,
      },
      rules: {
        'pnpm/yaml-enforce-settings': ['error', {
          settings: {
            shellEmulator: true,
            trustPolicy: 'no-downgrade',
          },
        }],
        'pnpm/yaml-no-duplicate-catalog-item': 'error',
        'pnpm/yaml-no-unused-catalog-item': 'error',
      } satisfies Rules,
    },
  ]
}
