import {
  cache,
  clampParam,
  coerce,
  constructMetrics,
  createClassDecorator,
  createMethodDecorator,
  createParameterDecorator,
  createPropertyDecorator,
  debounce,
  debugFnArgs,
  debugFnResponse,
  dedupe,
  defaultParam,
  defaultValue,
  emailParam,
  enumParam,
  fallback,
  featureGate,
  fromJson,
  idempotent,
  lock,
  lowercase,
  maskSensitive,
  memoizedComputed,
  metrics,
  observable,
  persist,
  rangeParam,
  rateLimit,
  requiredParam,
  retry,
  sanitize,
  serialize,
  singleton,
  splitCsv,
  timeout,
  trace,
  transform,
  trim,
  uppercase,
  uuidParam,
  validate,
  validateArgs,
  validateSchema,
} from '@dev-suite/decorators';
import { createRequire } from 'node:module';

const requireModule = createRequire(__filename);

const subpathExports: Array<[Record<string, unknown>, string]> = [
  [requireModule('@dev-suite/decorators/auto-bind-methods') as Record<string, unknown>, 'autoBindMethods'],
  [requireModule('@dev-suite/decorators/cache') as Record<string, unknown>, 'cache'],
  [requireModule('@dev-suite/decorators/clamp-param') as Record<string, unknown>, 'clampParam'],
  [requireModule('@dev-suite/decorators/class-metadata') as Record<string, unknown>, 'classMetadata'],
  [requireModule('@dev-suite/decorators/class-trace') as Record<string, unknown>, 'classTrace'],
  [requireModule('@dev-suite/decorators/coerce') as Record<string, unknown>, 'coerce'],
  [requireModule('@dev-suite/decorators/construct-metrics') as Record<string, unknown>, 'constructMetrics'],
  [requireModule('@dev-suite/decorators/default-param') as Record<string, unknown>, 'defaultParam'],
  [requireModule('@dev-suite/decorators/debounce') as Record<string, unknown>, 'debounce'],
  [requireModule('@dev-suite/decorators/dedupe') as Record<string, unknown>, 'dedupe'],
  [requireModule('@dev-suite/decorators/debug-fn-args') as Record<string, unknown>, 'debugFnArgs'],
  [requireModule('@dev-suite/decorators/debug-fn-response') as Record<string, unknown>, 'debugFnResponse'],
  [requireModule('@dev-suite/decorators/email-param') as Record<string, unknown>, 'emailParam'],
  [requireModule('@dev-suite/decorators/enum-param') as Record<string, unknown>, 'enumParam'],
  [requireModule('@dev-suite/decorators/fallback') as Record<string, unknown>, 'fallback'],
  [requireModule('@dev-suite/decorators/feature-gate') as Record<string, unknown>, 'featureGate'],
  [requireModule('@dev-suite/decorators/from-json') as Record<string, unknown>, 'fromJson'],
  [requireModule('@dev-suite/decorators/idempotent') as Record<string, unknown>, 'idempotent'],
  [requireModule('@dev-suite/decorators/inject-config') as Record<string, unknown>, 'injectConfig'],
  [requireModule('@dev-suite/decorators/instance-limit') as Record<string, unknown>, 'instanceLimit'],
  [requireModule('@dev-suite/decorators/lifecycle-hooks') as Record<string, unknown>, 'lifecycleHooks'],
  [requireModule('@dev-suite/decorators/lock') as Record<string, unknown>, 'lock'],
  [requireModule('@dev-suite/decorators/lowercase') as Record<string, unknown>, 'lowercase'],
  [requireModule('@dev-suite/decorators/mask-sensitive') as Record<string, unknown>, 'maskSensitive'],
  [requireModule('@dev-suite/decorators/metrics') as Record<string, unknown>, 'metrics'],
  [requireModule('@dev-suite/decorators/rate-limit') as Record<string, unknown>, 'rateLimit'],
  [requireModule('@dev-suite/decorators/range-param') as Record<string, unknown>, 'rangeParam'],
  [requireModule('@dev-suite/decorators/required-param') as Record<string, unknown>, 'requiredParam'],
  [requireModule('@dev-suite/decorators/retry') as Record<string, unknown>, 'retry'],
  [requireModule('@dev-suite/decorators/serialize') as Record<string, unknown>, 'serialize'],
  [requireModule('@dev-suite/decorators/sanitize') as Record<string, unknown>, 'sanitize'],
  [requireModule('@dev-suite/decorators/singleton') as Record<string, unknown>, 'singleton'],
  [requireModule('@dev-suite/decorators/split-csv') as Record<string, unknown>, 'splitCsv'],
  [requireModule('@dev-suite/decorators/timeout') as Record<string, unknown>, 'timeout'],
  [requireModule('@dev-suite/decorators/trace') as Record<string, unknown>, 'trace'],
  [requireModule('@dev-suite/decorators/trim') as Record<string, unknown>, 'trim'],
  [requireModule('@dev-suite/decorators/uppercase') as Record<string, unknown>, 'uppercase'],
  [requireModule('@dev-suite/decorators/uuid-param') as Record<string, unknown>, 'uuidParam'],
  [requireModule('@dev-suite/decorators/default-value') as Record<string, unknown>, 'defaultValue'],
  [requireModule('@dev-suite/decorators/memoized-computed') as Record<string, unknown>, 'memoizedComputed'],
  [requireModule('@dev-suite/decorators/observable') as Record<string, unknown>, 'observable'],
  [requireModule('@dev-suite/decorators/persist') as Record<string, unknown>, 'persist'],
  [requireModule('@dev-suite/decorators/transform') as Record<string, unknown>, 'transform'],
  [requireModule('@dev-suite/decorators/validate') as Record<string, unknown>, 'validate'],
  [requireModule('@dev-suite/decorators/validate-args') as Record<string, unknown>, 'validateArgs'],
  [requireModule('@dev-suite/decorators/validate-schema') as Record<string, unknown>, 'validateSchema'],
];

describe('@dev-suite/decorators exports', () => {
  it('should expose all expected decorators and factories as functions', () => {
    expect(typeof createClassDecorator).toBe('function');
    expect(typeof createMethodDecorator).toBe('function');
    expect(typeof createParameterDecorator).toBe('function');
    expect(typeof createPropertyDecorator).toBe('function');

    expect(typeof cache).toBe('function');
    expect(typeof clampParam).toBe('function');
    expect(typeof coerce).toBe('function');
    expect(typeof constructMetrics).toBe('function');
    expect(typeof defaultParam).toBe('function');
    expect(typeof emailParam).toBe('function');
    expect(typeof enumParam).toBe('function');
    expect(typeof fromJson).toBe('function');
    expect(typeof lowercase).toBe('function');
    expect(typeof maskSensitive).toBe('function');
    expect(typeof defaultValue).toBe('function');
    expect(typeof debugFnArgs).toBe('function');
    expect(typeof debugFnResponse).toBe('function');
    expect(typeof debounce).toBe('function');
    expect(typeof dedupe).toBe('function');
    expect(typeof fallback).toBe('function');
    expect(typeof featureGate).toBe('function');
    expect(typeof idempotent).toBe('function');
    expect(typeof lock).toBe('function');
    expect(typeof memoizedComputed).toBe('function');
    expect(typeof metrics).toBe('function');
    expect(typeof observable).toBe('function');
    expect(typeof persist).toBe('function');
    expect(typeof rateLimit).toBe('function');
    expect(typeof rangeParam).toBe('function');
    expect(typeof requiredParam).toBe('function');
    expect(typeof retry).toBe('function');
    expect(typeof serialize).toBe('function');
    expect(typeof sanitize).toBe('function');
    expect(typeof singleton).toBe('function');
    expect(typeof splitCsv).toBe('function');
    expect(typeof timeout).toBe('function');
    expect(typeof trace).toBe('function');
    expect(typeof transform).toBe('function');
    expect(typeof trim).toBe('function');
    expect(typeof uppercase).toBe('function');
    expect(typeof uuidParam).toBe('function');
    expect(typeof validate).toBe('function');
    expect(typeof validateArgs).toBe('function');
    expect(typeof validateSchema).toBe('function');
  });

  it('should expose every decorator via dedicated subpath import', () => {
    for (const [moduleExports, exportName] of subpathExports) {
      expect(typeof moduleExports[exportName]).toBe('function');
    }
  });
});
