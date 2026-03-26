# AGENTS.md

Guidance for coding agents working in this repository.

## Project Overview

This repository builds `@tanny/eslint-config`, a flat ESLint config package for modern JavaScript and TypeScript projects.

Key expectations:

- Prettier is intentionally not used.
- ESLint is responsible for both linting and formatting-oriented rules.
- Public config factories should stay synchronous and return `Config[]`.
- The package should keep a small, stable public API surface.

## Repository Layout

- `src/index.ts`
  Public package entrypoint.
- `src/presets.ts`
  Main config factory and higher-level presets.
- `src/configs/`
  Individual config modules.
- `src/types.ts`
  Shared config typing.
- `src/typegen.d.ts`
  Generated rule option and config name types.
- `src/plugins.ts`
  Plugin and parser exports shared across config modules.
- `src/env.ts`
  Project-environment detection helpers.
- `scripts/typegen.ts`
  Generates `src/typegen.d.ts`.

## Common Commands

- `pnpm run typegen`
  Regenerate `src/typegen.d.ts`.
- `pnpm run typecheck`
  Run TypeScript checking.
- `pnpm run build`
  Regenerate types and build the package.
- `pnpm run lint`
  Run ESLint.
- `pnpm run lint:fix`
  Run ESLint with autofix.
- `pnpm run dev`
  Start the ESLint config inspector.

## Working Rules

- Preserve the current package API shape unless the task explicitly asks for API changes.
- Prefer adapting ideas from `antfu/eslint-config` first when upstream references conflict.
- Use `sxzz/eslint-config` as a secondary reference for file layout, env detection, and preset organization when it does not conflict with the local design.
- Keep config factories synchronous. Do not introduce async config factories into the public API.
- Prefer small preset-level options over exposing many fine-grained booleans.
- Reuse existing config modules instead of duplicating rules in multiple places.

## Config Design Guidelines

- Keep the main factory logic in `src/presets.ts`.
- Keep individual rulesets in `src/configs/*.ts`.
- Prefer explicit config names for every flat config object so `typegen` can derive `ConfigNames`.
- When adding a new config module, ensure it is wired into:
  - `src/configs/index.ts`
  - any relevant preset in `src/presets.ts`
  - `scripts/typegen.ts` indirectly through `presetAll()`
- If a config requires plugin rule typing, make sure the plugin is reachable through the generated config set used by `typegen`.

## Type Generation

- `scripts/typegen.ts` should stay aligned with the real exported config graph.
- Prefer deriving types from `presetAll()` instead of maintaining large hand-written lists of config names or plugins.
- `src/typegen.d.ts` is generated code. Do not hand-edit it unless the task explicitly requires it.
- If config names change, regenerate `src/typegen.d.ts`.

## Validation

After code changes that affect runtime behavior, config exports, or generated typings, prefer running:

- `pnpm run typegen`
- `pnpm run typecheck`
- `pnpm run build`

If only documentation changes were made, validation is optional.

## Change Safety

Pause and confirm before making changes that would:

- materially change import autofix behavior
- materially change TypeScript escape hatch policy
- materially change Vue SFC authoring behavior
- create large migration noise
- likely introduce many new false positives

## Git And Hooks

- This repo uses `simple-git-hooks`.
- Pre-commit runs `npx lint-staged`.
- Avoid destructive git operations unless explicitly requested.

## Documentation Expectations

- Keep `README.md` aligned with actual exported APIs and defaults.
- If presets, options, or install steps change, update the README in the same task when appropriate.

## Deferred Scope

Unless explicitly requested, avoid expanding into stylistic-only or Prettier-style modules.
