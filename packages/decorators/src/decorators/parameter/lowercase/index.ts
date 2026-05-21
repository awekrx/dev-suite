import { createParameterDecorator } from '$core/decorators/parameter';

import { LowercaseOptions } from './types';

export const lowercase = (options: LowercaseOptions = {}) =>
  createParameterDecorator<(...args: unknown[]) => unknown>({
    wrap: ({ invoke, value }) => {
      if (typeof value !== 'string') {
        return invoke(value);
      }

      const normalized = options.locale ? value.toLocaleLowerCase(options.locale) : value.toLowerCase();

      return invoke(normalized);
    },
  });

export * from './types';
