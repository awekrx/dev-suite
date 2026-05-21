import { createMethodDecorator } from '$core/decorators/method';

import { DebounceOptions } from './types';

type DebounceableFn = (...args: any[]) => Promise<unknown>;

type PendingCall = {
  reject: (reason?: unknown) => void;
  timer: ReturnType<typeof setTimeout>;
};

export const debounce = <OriginalFn extends DebounceableFn>(options: DebounceOptions) => {
  const { waitMs, cancelMessage = 'Debounced call canceled', keyResolver = () => '__default__' } = options;

  const staticState = new Map<string, PendingCall>();
  const stateByInstance = new WeakMap<object, Map<string, PendingCall>>();

  return createMethodDecorator<OriginalFn>({
    wrap: ({ args, invoke, originalThis }) => {
      let state = staticState;

      if (typeof originalThis === 'object' && originalThis) {
        state = stateByInstance.get(originalThis) ?? new Map<string, PendingCall>();
        stateByInstance.set(originalThis, state);
      }

      const key = keyResolver(args);
      const pending = state.get(key);

      if (pending) {
        clearTimeout(pending.timer);
        pending.reject(new Error(cancelMessage));
        state.delete(key);
      }

      return new Promise<Awaited<ReturnType<OriginalFn>>>((resolve, reject) => {
        const timer = setTimeout(() => {
          try {
            Promise.resolve(invoke(args))
              .then((response) => resolve(response as Awaited<ReturnType<OriginalFn>>))
              .catch(reject)
              .finally(() => {
                state.delete(key);
              });
          } catch (error) {
            state.delete(key);
            reject(error);
          }
        }, waitMs);

        state.set(key, {
          timer,
          reject,
        });
      }) as ReturnType<OriginalFn>;
    },
  });
};
