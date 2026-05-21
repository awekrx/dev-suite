import { createMethodDecorator } from '$core/decorators/method';
import { AnyFn } from '$core/types/any-fn';

import { ValidateArgsOptions } from './types';

export const validateArgs = <OriginalFn extends AnyFn>(options: ValidateArgsOptions<OriginalFn>) => {
  const { schema } = options;

  return createMethodDecorator<OriginalFn>({
    wrap: ({ args, invoke }) => {
      const parsedArgs = schema.parse(args);

      return invoke(parsedArgs);
    },
  });
};
