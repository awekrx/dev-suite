import { createParameterDecorator } from '$core/decorators/parameter';

import { ValidateSchemaOptions } from './types';

export const validateSchema = (options: ValidateSchemaOptions) =>
  createParameterDecorator<(...args: unknown[]) => unknown>({
    wrap: ({ invoke, value }) => {
      try {
        return invoke(options.parse(value));
      } catch (error) {
        if (options.message) {
          throw new Error(options.message);
        }

        throw error;
      }
    },
  });

export * from './types';
