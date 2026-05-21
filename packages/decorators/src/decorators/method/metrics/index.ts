import { createMethodDecorator } from '$core/decorators/method';
import { AnyFn } from '$core/types/any-fn';
import { resolveEnabled } from '$core/utils/resolve-enabled';

import { MetricsOptions, MetricsReport } from './types';

const defaultReporter = (report: MetricsReport) => {
  console.info('[metrics]', report);
};

export const metrics = <OriginalFn extends AnyFn>(options: MetricsOptions = {}) => {
  const { reporter = defaultReporter, enabled = true } = options;

  return createMethodDecorator<OriginalFn>({
    wrap: ({ invoke, propertyKey }) => {
      if (!resolveEnabled(enabled)) {
        return invoke();
      }

      const start = Date.now();

      try {
        const response = invoke();

        if (response && typeof (response as Promise<unknown>).then === 'function') {
          return (response as Promise<unknown>)
            .then((result) => {
              reporter({
                name: propertyKey,
                durationMs: Date.now() - start,
                success: true,
              });

              return result;
            })
            .catch((error) => {
              reporter({
                name: propertyKey,
                durationMs: Date.now() - start,
                success: false,
                error,
              });

              throw error;
            }) as ReturnType<OriginalFn>;
        }

        reporter({
          name: propertyKey,
          durationMs: Date.now() - start,
          success: true,
        });

        return response;
      } catch (error) {
        reporter({
          name: propertyKey,
          durationMs: Date.now() - start,
          success: false,
          error,
        });

        throw error;
      }
    },
  });
};
