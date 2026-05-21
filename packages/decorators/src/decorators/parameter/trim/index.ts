import { createParameterDecorator } from '$core/decorators/parameter';

import { TrimOptions } from './types';

export const trim = (options: TrimOptions = {}) =>
  createParameterDecorator<(...args: unknown[]) => unknown>({
    wrap: ({ invoke, value }) => {
      if (typeof value !== 'string') {
        return invoke(value);
      }

      const trimmed = options.collapseWhitespace ? value.trim().replace(/\s+/g, ' ') : value.trim();

      return invoke(trimmed);
    },
  });

export * from './types';
