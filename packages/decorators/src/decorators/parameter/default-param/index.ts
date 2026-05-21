import { createParameterDecorator } from '$core/decorators/parameter';

import { DefaultParamOptions } from './types';

export const defaultParam = (fallback: unknown, options: DefaultParamOptions = {}) =>
  createParameterDecorator<(...args: unknown[]) => unknown>({
    wrap: ({ invoke, value }) => {
      const isMissing = typeof value === 'undefined' || (options.treatNullAsMissing && value === null);

      return invoke(isMissing ? fallback : value);
    },
  });

export * from './types';
