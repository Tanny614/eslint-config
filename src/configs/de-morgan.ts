import type { Config } from "../types";
import { pluginDeMorgan } from "../plugins";

export const deMorgan = (): Config[] => [
  {
    name: 'tanny/de-morgan',
    ...pluginDeMorgan.configs.recommended
  }
]