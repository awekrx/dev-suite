import { createClassDecorator } from '$core/decorators/class';

import { ClassTraceLogger, ClassTraceOptions } from './types';

const defaultLogger: ClassTraceLogger = {
  info: (message, context) => {
    console.info(message, context);
  },
  error: (message, context) => {
    console.error(message, context);
  },
};

export const classTrace = (options: ClassTraceOptions = {}) => {
  const { logger = defaultLogger, shouldIncludeArgs = false } = options;

  return createClassDecorator({
    wrap: ({ invoke, args, target }) => {
      logger.info(
        'class.construct.start',
        shouldIncludeArgs ? { className: target.name, args } : { className: target.name },
      );

      try {
        const instance = invoke(args);

        logger.info('class.construct.success', { className: target.name });

        return instance;
      } catch (error) {
        logger.error('class.construct.error', { className: target.name, error });

        throw error;
      }
    },
  });
};

export * from './types';
