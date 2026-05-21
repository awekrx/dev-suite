import { createMethodDecorator } from '$core/decorators/method';
import { AnyFn } from '$core/types/any-fn';

import { DebugFnResponseOptions } from './types';

import { runDebugCore } from '../core';

const onceSeenKeys = new Set<string>();

export const debugFnResponse = <OriginalFn extends AnyFn>(options: DebugFnResponseOptions<OriginalFn> = {}) => {
  const { formatResponse, ...restOptions } = options;

  return createMethodDecorator<OriginalFn>({
    after: ({ response, propertyKey, originalThis }) => {
      runDebugCore({
        ...restOptions,
        originalThis,
        propertyKey,
        onceSeenKeys,
        data: response,
        formatter: formatResponse,
        insertFnNameInMessageTemplate: (fnName) => `Function ${fnName} returned`,
      });
    },
  });
};
