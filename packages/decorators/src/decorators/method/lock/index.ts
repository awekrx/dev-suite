import { createMethodDecorator } from '$core/decorators/method';
import { AnyFn } from '$core/types/any-fn';

import { LockOptions } from './types';

export const lock = <OriginalFn extends AnyFn>(options: LockOptions<Parameters<OriginalFn>> = {}) => {
  const { keyResolver = (args) => JSON.stringify(args), message = 'Method is locked' } = options;

  const staticLocks = new Set<string>();
  const locksByInstance = new WeakMap<object, Set<string>>();

  return createMethodDecorator<OriginalFn>({
    wrap: ({ args, invoke, originalThis }) => {
      let locks = staticLocks;

      if (typeof originalThis === 'object' && originalThis) {
        locks = locksByInstance.get(originalThis) ?? new Set<string>();
        locksByInstance.set(originalThis, locks);
      }

      const key = keyResolver(args);

      if (locks.has(key)) {
        throw new Error(message);
      }

      locks.add(key);

      try {
        const response = invoke(args);

        if (response && typeof (response as Promise<unknown>).then === 'function') {
          return (response as Promise<unknown>).finally(() => {
            locks.delete(key);
          }) as ReturnType<OriginalFn>;
        }

        locks.delete(key);

        return response;
      } catch (error) {
        locks.delete(key);

        throw error;
      }
    },
  });
};
