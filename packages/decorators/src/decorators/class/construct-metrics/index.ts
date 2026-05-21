import { createClassDecorator } from '$core/decorators/class';
import { resolveEnabled } from '$core/utils/resolve-enabled';

import { ConstructMetricsOptions, ConstructMetricsReport } from './types';

const defaultReporter = (report: ConstructMetricsReport) => {
  console.info('[construct-metrics]', report);
};

export const constructMetrics = (options: ConstructMetricsOptions = {}) => {
  const { reporter = defaultReporter, enabled = true } = options;

  return createClassDecorator({
    wrap: ({ invoke, args, target }) => {
      if (!resolveEnabled(enabled)) {
        return invoke(args);
      }

      const start = Date.now();

      try {
        const instance = invoke(args);

        reporter({
          className: target.name,
          durationMs: Date.now() - start,
          success: true,
        });

        return instance;
      } catch (error) {
        reporter({
          className: target.name,
          durationMs: Date.now() - start,
          success: false,
          error,
        });

        throw error;
      }
    },
  });
};

export * from './types';
