import { createParameterDecorator } from '$core/decorators/parameter';

import { RequiredParamOptions } from './types';

export const requiredParam = (options: RequiredParamOptions = {}) =>
  createParameterDecorator<(...args: unknown[]) => unknown>({
    wrap: ({ invoke, value, propertyKey, parameterIndex }) => {
      if (value === null || typeof value === 'undefined') {
        throw new Error(options.message ?? `Required parameter at index ${parameterIndex} for ${String(propertyKey)}`);
      }

      return invoke(value);
    },
  });

export * from './types';
