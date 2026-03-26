# @tanny/eslint-config

Flat ESLint config for modern JavaScript, TypeScript, Vue, Markdown, YAML, and pnpm projects.

This project uses ESLint for both linting and formatting-oriented rules. Prettier is intentionally not included.

## Features

- Flat config first
- Built-in presets for JavaScript, TypeScript, JSONC, Markdown, YAML, Vue, and pnpm
- Project-aware defaults for Vue and pnpm
- Typed config names and rule options via `eslint-typegen`
- Exposes both a default config and factory functions for customization

## Install

```bash
pnpm add -D @tanny/eslint-config eslint
```

## Usage

Create an `eslint.config.ts`:

```ts
import config from '@tanny/eslint-config'

export default config
```

## Custom Usage

If you want to customize which preset groups are enabled, use the factory:

```ts
import { defineConfig } from '@tanny/eslint-config'

export default defineConfig({
  command: false,
  pnpm: true,
  vue: true,
})
```

You can also append your own flat configs:

```ts
import { defineConfig } from '@tanny/eslint-config'

export default defineConfig(
  {
    pnpm: true,
  },
  {
    rules: {
      'no-console': 'off',
    },
  },
)
```

## Options

The public factory options are intentionally kept small:

- `basic`
  Enables the base JavaScript and TypeScript preset set.
- `command`
  Enables command-related lint rules.
- `langExtensions`
  Enables Markdown, YAML, JSONC, and config-file sorting rules.
- `pnpm`
  Enables pnpm-specific rules. Defaults to auto-detection based on `pnpm-workspace.yaml` or `packageManager`.
- `vue`
  Enables Vue rules. Defaults to auto-detection based on installed Vue ecosystem packages.

## Exported Presets

The package exports a few higher-level preset helpers:

- `presetJavaScript()`
- `presetJsonc()`
- `presetLangExtensions()`
- `presetBasic()`
- `presetAll()`

It also re-exports individual config modules from `src/configs`, so you can assemble a fully custom flat config if needed.

## Auto Detection

The package currently auto-detects:

- Vue projects via `vue`, `nuxt`, `vitepress`, or `@slidev/cli`
- pnpm projects via `pnpm-workspace.yaml` or `package.json#packageManager`

## Scripts

```bash
pnpm run dev
pnpm run typegen
pnpm run typecheck
pnpm run build
pnpm run lint
pnpm run lint:fix
```

## Development Notes

- Generated rule option types are written to `src/typegen.d.ts`
- Git hooks are managed by `simple-git-hooks`
- `lint-staged` runs `eslint --fix` before commit

## License

MIT
