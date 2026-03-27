import type { Config } from "../types";
import { GLOB_EXCLUDE } from "../globs";
import { pluginIgnore } from "../plugins";

export const ignores = (): Config[] => [
  {
    name: 'tanny/global-ignores',
    ignores: GLOB_EXCLUDE
  },
  {
    name: 'tanny/gitignore',
    ...pluginIgnore({ strict: false })
  }
]
