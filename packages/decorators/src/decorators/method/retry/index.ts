import { createMethodDecorator } from '$core/decorators/method';
import { AnyFn } from '$core/types/any-fn';

import { RetryOptions } from './types';

const delay = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });

export const retry = <OriginalFn extends AnyFn>(options: RetryOptions<OriginalFn>) => {
  const { attempts, delayMs = 0, shouldRetry = () => true } = options;

  return createMethodDecorator<OriginalFn>({
    wrap: ({ args, invoke }) => {
      if (attempts <= 1) {
        return invoke(args);
      }

      const shouldUsePromiseFlow = (value: unknown): value is Promise<unknown> =>
        !!value && typeof (value as Promise<unknown>).then === 'function';

      let attemptNumber = 0;

      const runSync = (): ReturnType<OriginalFn> => {
        while (attemptNumber < attempts) {
          attemptNumber += 1;

          try {
            const response = invoke(args);

            if (shouldUsePromiseFlow(response)) {
              return runAsync(response) as ReturnType<OriginalFn>;
            }

            return response;
          } catch (error) {
            const isLastAttempt = attemptNumber >= attempts;

            if (isLastAttempt || !shouldRetry(error, { args, attemptNumber })) {
              throw error;
            }
          }
        }

        throw new Error('Retry attempts exhausted');
      };

      const runAsync = async (responsePromise?: Promise<unknown>): Promise<Awaited<ReturnType<OriginalFn>>> => {
        try {
          if (responsePromise) {
            return (await responsePromise) as Awaited<ReturnType<OriginalFn>>;
          }

          const response = invoke(args);

          return (await Promise.resolve(response)) as Awaited<ReturnType<OriginalFn>>;
        } catch (error) {
          const isLastAttempt = attemptNumber >= attempts;

          if (isLastAttempt || !shouldRetry(error, { args, attemptNumber })) {
            throw error;
          }

          if (delayMs > 0) {
            await delay(delayMs);
          }

          attemptNumber += 1;

          return runAsync();
        }
      };

      return runSync();
    },
  });
};
