import { writeFile } from "node:fs/promises";
import {builtinRules} from 'eslint/use-at-your-own-risk'
import { flatConfigsToRulesDTS } from 'eslint-typegen/core'



const configs = [{
  plugins: {
    '': {rules: Object.fromEntries(builtinRules)}
  }
}]

let dts = await flatConfigsToRulesDTS(configs, {
  includeAugmentation: false
})

const configNames = configs.map(i => i.name).filter(Boolean) as string[]
dts += `
// Names of all the configs
export type ConfigNames = ${configNames.map(i => `'${i}'`).join(' | ')}
`

await writeFile('src/typegen.d.ts', dts)
