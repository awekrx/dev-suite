import { createMethodDecorator } from '$core/decorators/method';
import { AnyFn } from '$core/types/any-fn';

import { DedupeOptions } from './types';

export const dedupe = <OriginalFn extends AnyFn>(options: DedupeOptions<Parameters<OriginalFn>> = {}) => {
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

      const response = invoke(args);

      if (!response || typeof (response as Promise<unknown>).then !== 'function') {
        return response;
      }

      const responsePromise = (response as Promise<unknown>).finally(() => {
        inFlight.delete(key);
      });

      inFlight.set(key, responsePromise);

      return responsePromise as ReturnType<OriginalFn>;
    },
  });
};

export * from './types';
