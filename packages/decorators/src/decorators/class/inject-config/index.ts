import { createClassDecorator } from '$core/decorators/class';

import { InjectConfigOptions } from './types';

export const injectConfig = <ConfigShape extends Record<string, unknown>>(
  options: InjectConfigOptions<ConfigShape>,
) => {
  const { config, propertyKey = 'config' } = options;

  return createClassDecorator({
    after: ({ originalThis }) => {
      Object.defineProperty(originalThis, propertyKey, {
        configurable: true,
        enumerable: true,
        writable: false,
        value: config,
      });
    },
  });
};

export * from './types';
