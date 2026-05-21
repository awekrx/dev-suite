import { createParameterDecorator } from '$core/decorators/parameter';

import { ClampParamOptions } from './types';

export const clampParam = (options: ClampParamOptions) =>
  createParameterDecorator<(...args: unknown[]) => unknown>({
    wrap: ({ invoke, value }) => {
      const numeric = Number(value);
      const clamped = Math.min(options.max, Math.max(options.min, numeric));

      return invoke(clamped);
    },
  });

export * from './types';
