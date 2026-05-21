# @dev-suite/decorators

<p align="left">
  <a href="https://www.npmjs.com/package/%40dev-suite%2Fdecorators"><img src="https://img.shields.io/npm/v/%40dev-suite%2Fdecorators.svg" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/%40dev-suite%2Fdecorators"><img src="https://img.shields.io/npm/dm/%40dev-suite%2Fdecorators.svg" alt="npm downloads"></a>
  <a href="https://www.npmjs.com/package/%40dev-suite%2Fdecorators"><img src="https://img.shields.io/npm/l/%40dev-suite%2Fdecorators.svg" alt="license"></a>
  <a href="https://www.npmjs.com/package/%40dev-suite%2Fdecorators"><img src="https://img.shields.io/bundlephobia/minzip/%40dev-suite%2Fdecorators" alt="bundle size"></a>
  <img src="https://img.shields.io/badge/types-TypeScript-blue" alt="TypeScript">
</p>

Framework-agnostic TypeScript decorators for classes, methods, properties, and parameters.

## Installation

```bash
npm i @dev-suite/decorators
# or
yarn add @dev-suite/decorators
# or
pnpm add @dev-suite/decorators
```

## Quick Example

```ts
import { dedupe, retry, timeout, serialize } from '@dev-suite/decorators';

class ApiClient {
  @dedupe()
  @retry({ attempts: 3, delayMs: 100 })
  @timeout({ ms: 3000 })
  @serialize({ serializer: (value) => ({ data: value }) })
  async fetchUser(id: string) {
    return { id, name: 'John' };
  }
}
```

## API Overview

### Class decorators

- `autoBindMethods`
- `classMetadata`
- `classTrace`
- `constructMetrics`
- `featureGate`
- `injectConfig`
- `instanceLimit`
- `lifecycleHooks`
- `singleton`

### Method decorators

- `benchmark`
- `cache`
- `debounce`
- `dedupe`
- `fallback`
- `idempotent`
- `lock`
- `metrics`
- `rateLimit`
- `retry`
- `serialize`
- `timeout`
- `trace`
- `transaction`
- `validateArgs`
- `debugFnArgs`
- `debugFnResponse`

### Parameter decorators

- `clampParam`
- `coerce`
- `defaultParam`
- `emailParam`
- `enumParam`
- `fromJson`
- `lowercase`
- `maskSensitive`
- `rangeParam`
- `requiredParam`
- `sanitize`
- `splitCsv`
- `trim`
- `uppercase`
- `uuidParam`
- `validateSchema`

### Property decorators

- `defaultValue`
- `memoizedComputed`
- `observable`
- `persist`
- `transform`
- `validate`

## Full Decorator Matrix

For all decorators with parameters and "where to use" guidance:

- [`docs/wiki/Decorators-Matrix.md`](../../docs/wiki/Decorators-Matrix.md)
- [GitHub Wiki: `Decorators-Matrix`](https://github.com/awekrx/dev-suite/wiki/Decorators-Matrix)

## Subpath Imports

You can import specific decorators directly:

```ts
import { retry } from '@dev-suite/decorators/retry';
import { transaction } from '@dev-suite/decorators/transaction';
```

## Development

```bash
yarn workspace @dev-suite/decorators build
yarn workspace @dev-suite/decorators test
yarn workspace @dev-suite/decorators sync-exports
```

## Contributing

- Keep **100% test coverage** for touched code paths.
- Add or update tests together with behavior changes.
- Keep changes framework-agnostic and backward-compatible unless explicitly discussed.

## Compatibility

- Node.js: `>=18.18.0`
- TypeScript declaration files: included (`dist/index.d.ts`)

## License

MIT
