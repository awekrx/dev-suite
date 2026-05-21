import { createParameterDecorator } from '$core/decorators/parameter';

import { UppercaseOptions } from './types';

export const uppercase = (options: UppercaseOptions = {}) =>
  createParameterDecorator<(...args: unknown[]) => unknown>({
    wrap: ({ invoke, value }) => {
      if (typeof value !== 'string') {
        return invoke(value);
      }

      const normalized = options.locale ? value.toLocaleUpperCase(options.locale) : value.toUpperCase();

      return invoke(normalized);
    },
  });

export * from './types';
