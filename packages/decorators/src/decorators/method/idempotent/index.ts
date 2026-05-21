import { createMethodDecorator } from '$core/decorators/method';
import { AnyFn } from '$core/types/any-fn';

import { IdempotentOptions } from './types';

export const idempotent = <OriginalFn extends AnyFn>(options: IdempotentOptions<Parameters<OriginalFn>> = {}) => {
  const { keyResolver = (args) => JSON.stringify(args) } = options;
  const staticInFlight = new Map<string, Promise<unknown>>();
  const inFlightByInstance = new WeakMap<object, Map<string, Promise<unknown>>>();

  return createMethodDecorator<OriginalFn>({
    wrap: ({ args, invoke, originalThis }) => {
      let inFlight = staticInFlight;

      if (typeof originalThis === 'object' && originalThis) {
        inFlight = inFlightByInstance.get(originalThis) ?? new Map<string, Promise<unknown>>();
        inFlightByInstance.set(originalThis, inFlight);
      }

      const key = keyResolver(args);
      const existing = inFlight.get(key);

      if (existing) {
        return existing as ReturnType<OriginalFn>;
      }

      try {
        const response = invoke(args);

        if (!response || typeof (response as Promise<unknown>).then !== 'function') {
          return response;
        }

        const promise = (response as Promise<unknown>).finally(() => {
          inFlight.delete(key);
        });

        inFlight.set(key, promise);

        return promise as ReturnType<OriginalFn>;
      } catch (error) {
        inFlight.delete(key);

        throw error;
      }
    },
  });
};
