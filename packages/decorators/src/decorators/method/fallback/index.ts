import { createMethodDecorator } from '$core/decorators/method';
import { AnyFn } from '$core/types/any-fn';

import { FallbackOptions } from './types';

export const fallback = <OriginalFn extends AnyFn>(options: FallbackOptions<OriginalFn> = {}) => {
  const { fallbackValue, onError } = options;

  return createMethodDecorator<OriginalFn>({
    wrap: ({ args, invoke }) => {
      try {
        const response = invoke(args);

        if (response && typeof (response as Promise<unknown>).then === 'function') {
          return (response as Promise<unknown>).catch((error) => {
            if (onError) {
              return onError(error, args);
            }

            return fallbackValue as ReturnType<OriginalFn>;
          }) as ReturnType<OriginalFn>;
        }

        return response;
      } catch (error) {
        if (onError) {
          return onError(error, args);
        }

        return fallbackValue as ReturnType<OriginalFn>;
      }
    },
  });
};
