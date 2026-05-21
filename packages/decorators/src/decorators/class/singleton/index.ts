import { createClassDecorator, Ctor } from '$core/decorators/class';

import { SingletonOptions } from './types';

export const singleton = <ClassCtor extends Ctor>(options: SingletonOptions<ClassCtor> = {}) => {
  const cache = options.store ?? new Map<string, InstanceType<ClassCtor>>();
  const keyResolver = options.keyResolver ?? (() => '__singleton__');

  return createClassDecorator({
    wrap: ({ args, invoke }) => {
      const key = keyResolver(args);
      const cached = cache.get(key);

      if (cached) {
        return cached;
      }

      const instance = invoke(args) as InstanceType<ClassCtor>;

      cache.set(key, instance);

      return instance;
    },
  });
};

export * from './types';
