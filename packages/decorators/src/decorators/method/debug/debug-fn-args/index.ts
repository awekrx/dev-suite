import { createMethodDecorator } from '$core/decorators/method';
import { AnyFn } from '$core/types/any-fn';

import { DebugFnArgsOptions } from './types';

import { runDebugCore } from '../core';

const onceSeenKeys = new Set<string>();

export const debugFnArgs = <OriginalFn extends AnyFn>(options: DebugFnArgsOptions<OriginalFn> = {}) => {
  const { formatArgs, ...restOptions } = options;

  return createMethodDecorator<OriginalFn>({
    before: ({ args, propertyKey, originalThis }) => {
      runDebugCore({
        ...restOptions,
        originalThis,
        propertyKey,
        onceSeenKeys,
        data: args,
        formatter: formatArgs,
        insertFnNameInMessageTemplate: (fnName) => `Function ${fnName} called with args`,
      });
    },
  });
};
