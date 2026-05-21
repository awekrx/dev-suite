import { createClassDecorator } from '$core/decorators/class';

import { AutoBindMethodsOptions } from './types';

const bindMethodsFromPrototypeChain = (
  instance: object,
  exclude: Set<PropertyKey>,
  shouldIncludeOwnProperties: boolean,
) => {
  const visited = new Set<PropertyKey>();

  let currentPrototype = Object.getPrototypeOf(instance);

  while (currentPrototype && currentPrototype !== Object.prototype) {
    for (const key of Reflect.ownKeys(currentPrototype)) {
      if (key === 'constructor' || exclude.has(key) || visited.has(key)) {
        continue;
      }

      const descriptor = Object.getOwnPropertyDescriptor(currentPrototype, key);
      const method = descriptor?.value;

      if (typeof method === 'function') {
        Object.defineProperty(instance, key, {
          value: method.bind(instance),
          configurable: true,
          writable: true,
        });
      }

      visited.add(key);
    }

    currentPrototype = Object.getPrototypeOf(currentPrototype);
  }

  if (!shouldIncludeOwnProperties) {
    return;
  }

  for (const key of Reflect.ownKeys(instance)) {
    if (exclude.has(key)) {
      continue;
    }

    const value = (instance as Record<PropertyKey, unknown>)[key];

    if (typeof value === 'function') {
      Object.defineProperty(instance, key, {
        value: value.bind(instance),
        configurable: true,
        writable: true,
      });
    }
  }
};

export const autoBindMethods = (options: AutoBindMethodsOptions = {}) => {
  const { exclude = [], shouldIncludeOwnProperties = false } = options;
  const excludeSet = new Set<PropertyKey>(exclude);

  return createClassDecorator({
    after: ({ originalThis }) => {
      bindMethodsFromPrototypeChain(originalThis, excludeSet, shouldIncludeOwnProperties);
    },
  });
};

export * from './types';
