import { createMethodDecorator } from '$core/decorators/method';
import { AnyFn } from '$core/types/any-fn';

import { SerializeContext, SerializeOptions } from './types';

export const serialize = <OriginalFn extends AnyFn>(options: SerializeOptions<OriginalFn>) => {
  const { serializer } = options;

  return createMethodDecorator<OriginalFn>({
    wrap: ({ args, invoke, propertyKey, originalThis }) => {
      const context: SerializeContext<OriginalFn> = {
        args,
        methodName: propertyKey,
        originalThis,
      };

      const response = invoke(args);

      if (response && typeof (response as Promise<unknown>).then === 'function') {
        return (response as Promise<unknown>).then((resolved) =>
          serializer(resolved as Awaited<ReturnType<OriginalFn>>, context),
        ) as ReturnType<OriginalFn>;
      }

      return serializer(response as Awaited<ReturnType<OriginalFn>>, context) as ReturnType<OriginalFn>;
    },
  });
};

export * from './types';
