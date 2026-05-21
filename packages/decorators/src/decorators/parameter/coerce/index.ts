import { createParameterDecorator } from '$core/decorators/parameter';

import { CoerceOptions } from './types';

const applyCoerce = (value: unknown, to: CoerceOptions['to']): unknown => {
  if (typeof to === 'function') {
    return to(value);
  }

  if (to === 'number') {
    return Number(value);
  }

  if (to === 'boolean') {
    if (typeof value === 'string') {
      return value.toLowerCase() === 'true';
    }

    return Boolean(value);
  }

  if (to === 'string') {
    return String(value);
  }

  return value instanceof Date ? value : new Date(String(value));
};

export const coerce = (options: CoerceOptions) =>
  createParameterDecorator<(...args: unknown[]) => unknown>({
    wrap: ({ invoke, value }) => invoke(applyCoerce(value, options.to)),
  });

export * from './types';
