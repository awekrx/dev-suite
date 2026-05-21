import { createMethodDecorator } from '$core/decorators/method';
import { AnyFn } from '$core/types/any-fn';

import { TimeoutOptions } from './types';

export const timeout = <OriginalFn extends AnyFn>(options: TimeoutOptions) => {
  const { ms, message = `Method execution timed out after ${ms}ms` } = options;

  return createMethodDecorator<OriginalFn>({
    wrap: ({ invoke }) => {
      const response = invoke();

      if (!response || typeof (response as Promise<unknown>).then !== 'function') {
        return response;
      }

      let timer: ReturnType<typeof setTimeout> | undefined;

      const timeoutPromise = new Promise<never>((_, reject) => {
        timer = setTimeout(() => reject(new Error(message)), ms);
      });

      return Promise.race([response as Promise<unknown>, timeoutPromise]).finally(() => {
        if (timer) {
          clearTimeout(timer);
          timer = undefined;
        }
      }) as ReturnType<OriginalFn>;
    },
  });
};
