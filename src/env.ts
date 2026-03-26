import { existsSync, readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import process from 'node:process'

const cwd = process.cwd()
const require = createRequire(import.meta.url)

function isPackageExists(name: string): boolean {
  try {
    require.resolve(name, { paths: [cwd] })
    return true
  }
  catch {
    return false
  }
}

function readPackageJson(): Record<string, unknown> | undefined {
  try {
    return JSON.parse(readFileSync('package.json', 'utf8')) as Record<string, unknown>
  }
  catch {
    return undefined
  }
}

export const hasTypeScript = (): boolean => isPackageExists('typescript')

export const hasVue = (): boolean =>
  isPackageExists('vue')
  || isPackageExists('nuxt')
  || isPackageExists('vitepress')
  || isPackageExists('@slidev/cli')

export function hasPnpm(): boolean {
  if (existsSync('pnpm-workspace.yaml'))
    return true

  const packageJson = readPackageJson()
  const packageManager = packageJson?.packageManager

  return typeof packageManager === 'string' && packageManager.startsWith('pnpm@')
}
