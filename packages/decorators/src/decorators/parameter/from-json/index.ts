import { createParameterDecorator } from '$core/decorators/parameter';

import { FromJsonOptions } from './types';

export const fromJson = (options: FromJsonOptions = {}) =>
  createParameterDecorator<(...args: unknown[]) => unknown>({
    wrap: ({ invoke, value }) => {
      if (options.onlyStrings && typeof value !== 'string') {
        return invoke(value);
      }

      if (typeof value !== 'string') {
        return invoke(value);
      }

      return invoke(JSON.parse(value));
    },
  });

export * from './types';
