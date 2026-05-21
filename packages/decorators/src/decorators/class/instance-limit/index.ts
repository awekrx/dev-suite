import { createClassDecorator } from '$core/decorators/class';

import { InstanceLimitOptions } from './types';

export const instanceLimit = (options: InstanceLimitOptions) => {
  const { maxInstances, message } = options;

  let currentInstances = 0;

  return createClassDecorator({
    wrap: ({ invoke, args, target }) => {
      if (currentInstances >= maxInstances) {
        throw new Error(message ?? `Instance limit reached for ${target.name}`);
      }

      const instance = invoke(args) as object;

      currentInstances += 1;
      let isDestroyed = false;

      const originalDestroy = (instance as Record<string, unknown>)['destroy'];

      Object.defineProperty(instance, 'destroy', {
        value: (...destroyArgs: unknown[]) => {
          if (!isDestroyed) {
            currentInstances = Math.max(0, currentInstances - 1);
            isDestroyed = true;
          }

          if (typeof originalDestroy === 'function') {
            return (originalDestroy as (...args: unknown[]) => unknown).apply(instance, destroyArgs);
          }

          return undefined;
        },
        configurable: true,
        writable: true,
      });

      return instance;
    },
  });
};

export * from './types';
