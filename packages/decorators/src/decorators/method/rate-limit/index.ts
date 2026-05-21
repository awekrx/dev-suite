import { createMethodDecorator } from '$core/decorators/method';
import { AnyFn } from '$core/types/any-fn';

import { RateLimitOptions } from './types';

export const rateLimit = <OriginalFn extends AnyFn>(options: RateLimitOptions<Parameters<OriginalFn>>) => {
  const { maxCalls, windowMs, keyResolver = () => '__default__', message = 'Rate limit exceeded' } = options;

  const staticCallHistory = new Map<string, number[]>();
  const callHistoryByInstance = new WeakMap<object, Map<string, number[]>>();

  return createMethodDecorator<OriginalFn>({
    wrap: ({ args, invoke, originalThis }) => {
      let callHistory = staticCallHistory;

      if (typeof originalThis === 'object' && originalThis) {
        callHistory = callHistoryByInstance.get(originalThis) ?? new Map<string, number[]>();
        callHistoryByInstance.set(originalThis, callHistory);
      }

      const key = keyResolver(args);
      const now = Date.now();
      const windowStart = now - windowMs;
      const history = (callHistory.get(key) ?? []).filter((timestamp) => timestamp > windowStart);

      if (history.length >= maxCalls) {
        throw new Error(message);
      }

      history.push(now);
      callHistory.set(key, history);

      return invoke(args);
    },
  });
};
