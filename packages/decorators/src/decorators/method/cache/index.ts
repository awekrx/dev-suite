import { createMethodDecorator } from '$core/decorators/method';
import { AnyFn } from '$core/types/any-fn';

import { CacheOptions } from './types';

type CacheEntry<ResponseType> = {
  value: ResponseType;
  expiresAt?: number;
};

export const cache = <OriginalFn extends AnyFn>(options: CacheOptions<Parameters<OriginalFn>> = {}) => {
  const { keyResolver = (args) => JSON.stringify(args), ttlMs } = options;
  const staticEntries = new Map<string, CacheEntry<ReturnType<OriginalFn>>>();
  const entriesByInstance = new WeakMap<object, Map<string, CacheEntry<ReturnType<OriginalFn>>>>();

  return createMethodDecorator<OriginalFn>({
    wrap: ({ args, invoke, originalThis }) => {
      let entries = staticEntries;

      if (typeof originalThis === 'object' && originalThis) {
        const instanceEntries = entriesByInstance.get(originalThis);

        if (instanceEntries) {
          entries = instanceEntries;
        } else {
          entries = new Map<string, CacheEntry<ReturnType<OriginalFn>>>();
          entriesByInstance.set(originalThis, entries);
        }
      }

      const key = keyResolver(args);
      const existing = entries.get(key);

      if (existing) {
        if (typeof existing.expiresAt === 'undefined' || existing.expiresAt > Date.now()) {
          return existing.value;
        }

        entries.delete(key);
      }

      const value = invoke();
      const expiresAt = typeof ttlMs === 'number' ? Date.now() + ttlMs : undefined;

      if (value && typeof (value as Promise<unknown>).then === 'function') {
        const valuePromise = (value as Promise<unknown>).catch((error) => {
          entries.delete(key);

          throw error;
        }) as ReturnType<OriginalFn>;

        entries.set(key, { value: valuePromise, expiresAt });

        return valuePromise;
      }

      entries.set(key, { value, expiresAt });

      return value;
    },
  });
};
