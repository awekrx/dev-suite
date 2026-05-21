import { createPropertyDecorator } from '$core/decorators/property';

import { ObservableChangeHandler } from './types';

export const observable = (onChange: ObservableChangeHandler) =>
  createPropertyDecorator({
    set: ({ setValue, value, previousValue, ...context }) => {
      setValue(value);
      onChange({ ...context, nextValue: value, previousValue });
    },
  });

export * from './types';
