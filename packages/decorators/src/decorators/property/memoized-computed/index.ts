import { createPropertyDecorator } from '$core/decorators/property';

import { MemoizedComputedResolver } from './types';

export const memoizedComputed = (compute: MemoizedComputedResolver) =>
  createPropertyDecorator({
    get: ({ entry, setValue, ...context }) => {
      if (!entry.hasValue) {
        setValue(compute(context));
      }

      return entry.value;
    },
  });

export * from './types';
