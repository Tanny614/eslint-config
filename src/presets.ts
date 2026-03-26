import type { Linter } from 'eslint'
import type { Arrayable } from 'eslint-flat-config-utils'
import type { ConfigNames } from './typegen'
import type { Config } from './types'
import { FlatConfigComposer } from 'eslint-flat-config-utils'
import {
  command,
  comments,
  deMorgan,
  ignores,
  imports,
  javascript,
  jsdoc,
  jsonc,
  markdown,
  node,
  perfectionist,
  pnpm,
  sort,
  typescript,
  unicorn,
  vue,
  yml,
} from './configs/index.ts'
import { hasPnpm, hasVue } from './env'

export interface Options {
  basic?: boolean
  command?: boolean
  langExtensions?: boolean
  pnpm?: boolean
  vue?: boolean
}

export type UserConfig = Arrayable<Config | Linter.Config> | FlatConfigComposer<any>

export const presetJavaScript = (): Config[] => [
  ...ignores(),
  ...comments(),
  ...javascript(),
  ...node(),
  ...imports(),
  ...jsdoc(),
  ...unicorn(),
  ...deMorgan(),
]

export const presetJsonc = (): Config[] => [
  ...jsonc(),
  ...sort(),
]

export const presetLangExtensions = (): Config[] => [
  ...markdown(),
  ...yml(),
  ...presetJsonc(),
]

export const presetBasic = (): Config[] => [
  ...presetJavaScript(),
  ...typescript(),
  ...perfectionist(),
]

export const presetAll = (): Config[] => [
  ...presetBasic(),
  ...vue(),
  ...command(),
  ...presetLangExtensions(),
  ...pnpm(),
]

export function createConfig(options: Options = {}): Config[] {
  const {
    basic: enableBasic = true,
    command: enableCommand = true,
    langExtensions: enableLangExtensions = true,
    pnpm: enablePnpm = hasPnpm(),
    vue: enableVue = hasVue(),
  } = options

  const configs: Config[] = []

  if (enableBasic)
    configs.push(...presetBasic())
  if (enableVue)
    configs.push(...vue())
  if (enableCommand)
    configs.push(...command())
  if (enableLangExtensions)
    configs.push(...presetLangExtensions())
  if (enablePnpm)
    configs.push(...pnpm())

  return configs
}

export function tanny(
  options: Options = {},
  ...userConfigs: UserConfig[]
): FlatConfigComposer<Config, ConfigNames> {
  return new FlatConfigComposer<Config, ConfigNames>(
    createConfig(options),
    ...(userConfigs as any),
  )
}

export function defineConfig(
  options: Options = {},
  ...userConfigs: UserConfig[]
): FlatConfigComposer<Config, ConfigNames> {
  return tanny(options, ...userConfigs)
}

export function createDefaultConfig(): Config[] {
  return [
    ...createConfig(),
  ]
}

const config = tanny()

export default config
