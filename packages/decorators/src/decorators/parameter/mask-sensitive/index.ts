import { createParameterDecorator } from '$core/decorators/parameter';

import { MaskSensitiveOptions } from './types';

export const maskSensitive = (options: MaskSensitiveOptions = {}) =>
  createParameterDecorator<(...args: unknown[]) => unknown>({
    wrap: ({ invoke, value }) => invoke(typeof value === 'undefined' ? value : (options.mask ?? '***')),
  });

export * from './types';
