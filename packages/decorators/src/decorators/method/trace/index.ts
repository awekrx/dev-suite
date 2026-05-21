import { createMethodDecorator } from '$core/decorators/method';
import { AnyFn } from '$core/types/any-fn';

import { TraceEvent, TraceOptions } from './types';

const defaultReporter = <OriginalFn extends AnyFn>(event: TraceEvent<OriginalFn>) => {
  console.info('[trace]', event);
};

export const trace = <OriginalFn extends AnyFn>(options: TraceOptions<OriginalFn> = {}) => {
  const { reporter = defaultReporter } = options;

  const safeReport = (event: TraceEvent<OriginalFn>) => {
    try {
      reporter(event);
    } catch {
      // Ignore reporter errors to avoid affecting business logic.
    }
  };

  return createMethodDecorator<OriginalFn>({
    wrap: ({ args, invoke, propertyKey }) => {
      const startedAt = Date.now();

      safeReport({
        phase: 'start',
        methodName: propertyKey,
        args,
      });

      try {
        const response = invoke(args);

        if (response && typeof (response as Promise<unknown>).then === 'function') {
          return (response as Promise<unknown>)
            .then((result) => {
              safeReport({
                phase: 'success',
                methodName: propertyKey,
                args,
                durationMs: Date.now() - startedAt,
              });

              return result;
            })
            .catch((error) => {
              safeReport({
                phase: 'error',
                methodName: propertyKey,
                args,
                durationMs: Date.now() - startedAt,
                error,
              });

              throw error;
            }) as ReturnType<OriginalFn>;
        }

        safeReport({
          phase: 'success',
          methodName: propertyKey,
          args,
          durationMs: Date.now() - startedAt,
        });

        return response;
      } catch (error) {
        safeReport({
          phase: 'error',
          methodName: propertyKey,
          args,
          durationMs: Date.now() - startedAt,
          error,
        });

        throw error;
      }
    },
  });
};
