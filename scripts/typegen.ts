import type { Config } from '../src/types.ts'
import { writeFile } from 'node:fs/promises'
import process from 'node:process'
import { flatConfigsToRulesDTS } from 'eslint-typegen/core'
import { builtinRules } from 'eslint/use-at-your-own-risk'
import { presetAll } from '../src/presets.ts'

const builtinRulesConfig = {
  plugins: {
    '': { rules: Object.fromEntries(builtinRules.entries()) },
  },
}

async function main(): Promise<void> {
  const presetConfigs = presetAll()
  const configs: Config[] = [
    ...presetConfigs,
    builtinRulesConfig,
  ]

  let dts = await flatConfigsToRulesDTS(configs, {
    exportTypeName: 'RuleOptions',
    includeAugmentation: false,
  })

  const configNames = [...new Set(
    presetConfigs
      .map(config => config.name)
      .filter((name): name is string => Boolean(name)),
  )]

  dts += `
// Names of all the configs
export type ConfigNames = ${configNames.length ? configNames.map(i => `'${i}'`).join(' | ') : 'never'}
`

  await writeFile('src/typegen.d.ts', dts)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
