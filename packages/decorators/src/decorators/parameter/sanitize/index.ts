import { createParameterDecorator } from '$core/decorators/parameter';

import { SanitizeOptions } from './types';

export const sanitize = (options: SanitizeOptions = {}) =>
  createParameterDecorator<(...args: unknown[]) => unknown>({
    wrap: ({ invoke, value }) => {
      if (typeof value !== 'string') {
        return invoke(value);
      }

      if (typeof options.rule === 'function') {
        return invoke(options.rule(value));
      }

      const rule = options.rule ?? /[<>]/g;
      const replacement = options.replacement ?? '';

      return invoke(value.replace(rule, replacement));
    },
  });

export * from './types';
