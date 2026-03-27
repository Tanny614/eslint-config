import type { Config } from '../types'
import createCommand from 'eslint-plugin-command/config'

export const command = (): Config[] => [
  {
    ...createCommand(),
    name: 'tanny/command',
  },
]
