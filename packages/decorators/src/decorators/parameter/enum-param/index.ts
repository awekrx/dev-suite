import { createParameterDecorator } from '$core/decorators/parameter';

import { EnumParamOptions } from './types';

export const enumParam = (options: EnumParamOptions) =>
  createParameterDecorator<(...args: unknown[]) => unknown>({
    wrap: ({ invoke, value, propertyKey, parameterIndex }) => {
      if (!options.allowed.includes(value)) {
        throw new Error(
          options.message ?? `Invalid enum value for parameter ${parameterIndex} in ${String(propertyKey)}`,
        );
      }

      return invoke(value);
    },
  });

export * from './types';
