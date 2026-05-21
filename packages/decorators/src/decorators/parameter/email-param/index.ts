import { createParameterDecorator } from '$core/decorators/parameter';

import { EmailParamOptions } from './types';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const emailParam = (options: EmailParamOptions = {}) =>
  createParameterDecorator<(...args: unknown[]) => unknown>({
    wrap: ({ invoke, value, propertyKey, parameterIndex }) => {
      if (typeof value !== 'string') {
        throw new Error(options.message ?? `Invalid email for parameter ${parameterIndex} in ${String(propertyKey)}`);
      }

      const normalized = options.normalize === false ? value : value.trim().toLowerCase();

      if (!emailRegex.test(normalized)) {
        throw new Error(options.message ?? `Invalid email for parameter ${parameterIndex} in ${String(propertyKey)}`);
      }

      return invoke(normalized);
    },
  });

export * from './types';
