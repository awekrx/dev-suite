import { createParameterDecorator } from '$core/decorators/parameter';

import { RangeParamOptions } from './types';

export const rangeParam = (options: RangeParamOptions) =>
  createParameterDecorator<(...args: unknown[]) => unknown>({
    wrap: ({ invoke, value, propertyKey, parameterIndex }) => {
      const numeric = Number(value);
      const isInclusive = options.inclusive ?? true;
      const isValid = isInclusive
        ? numeric >= options.min && numeric <= options.max
        : numeric > options.min && numeric < options.max;

      if (!isValid) {
        throw new Error(
          options.message ?? `Value for parameter ${parameterIndex} in ${String(propertyKey)} is out of range`,
        );
      }

      return invoke(numeric);
    },
  });

export * from './types';
