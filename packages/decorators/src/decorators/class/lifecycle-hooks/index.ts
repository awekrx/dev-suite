import { createClassDecorator } from '$core/decorators/class';

import { LifecycleHookNames } from './types';

const getHook = (instance: object, hookKey: PropertyKey) => {
  const candidate = (instance as Record<PropertyKey, unknown>)[hookKey];

  if (typeof candidate === 'function') {
    return candidate as (...args: unknown[]) => unknown;
  }

  return null;
};

export const lifecycleHooks = (options: LifecycleHookNames = {}) => {
  const { onInit = 'onInit', onDestroy = 'onDestroy' } = options;

  return createClassDecorator({
    after: ({ originalThis }) => {
      const initHook = getHook(originalThis, onInit);

      initHook?.call(originalThis);

      const destroyHook = getHook(originalThis, onDestroy);
      const originalDestroy = getHook(originalThis, 'destroy');

      Object.defineProperty(originalThis, 'destroy', {
        value: (...args: unknown[]) => {
          originalDestroy?.apply(originalThis, args);

          return destroyHook?.apply(originalThis, args);
        },
        configurable: true,
        writable: true,
      });
    },
  });
};

export * from './types';
