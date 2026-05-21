import { createPropertyDecorator } from '$core/decorators/property';

import { ValidatePredicate } from './types';

export const validate = (validator: ValidatePredicate) =>
  createPropertyDecorator({
    set: ({ setValue, value, ...context }) => {
      const isValid = validator({ ...context, value });

      if (isValid === false) {
        throw new Error(`Invalid value for property ${String(context.propertyKey)}`);
      }

      setValue(value);
    },
  });

export * from './types';
