import { createPropertyDecorator } from '$core/decorators/property';
import { PropertyValueContext } from '$core/decorators/property/types';

import { DefaultValueResolver } from './types';

const resolveDefaultValue = (value: DefaultValueResolver, context: PropertyValueContext): unknown =>
  (typeof value === 'function' ? value(context) : value);

export const defaultValue = (value: DefaultValueResolver) =>
  createPropertyDecorator({
    get: ({ entry, ...context }) => {
      if (!entry.hasValue) {
        const nextValue = resolveDefaultValue(value, context);

        entry.hasValue = true;
        entry.value = nextValue;
      }

      return entry.value;
    },
  });

export * from './types';
