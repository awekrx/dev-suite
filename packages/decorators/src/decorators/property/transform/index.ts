import { createPropertyDecorator } from '$core/decorators/property';

import { TransformMapper } from './types';

export const transform = (mapper: TransformMapper) =>
  createPropertyDecorator({
    set: ({ setValue, value, ...context }) => {
      setValue(mapper({ ...context, value }));
    },
  });

export * from './types';
