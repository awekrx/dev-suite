import { createParameterDecorator } from '$core/decorators/parameter';

import { UuidParamOptions } from './types';

const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export const uuidParam = (options: UuidParamOptions = {}) =>
  createParameterDecorator<(...args: unknown[]) => unknown>({
    wrap: ({ invoke, value, propertyKey, parameterIndex }) => {
      if (typeof value !== 'string' || !uuidRegex.test(value)) {
        throw new Error(options.message ?? `Invalid UUID for parameter ${parameterIndex} in ${String(propertyKey)}`);
      }

      return invoke(value);
    },
  });

export * from './types';
