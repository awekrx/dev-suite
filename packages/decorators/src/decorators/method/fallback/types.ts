import { AnyFn } from '$core/types/any-fn';

export type FallbackOptions<OriginalFn extends AnyFn> = {
  fallbackValue?: ReturnType<OriginalFn>;
  onError?: (error: unknown, args: Parameters<OriginalFn>) => ReturnType<OriginalFn>;
};
