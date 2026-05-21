import { AnyFn } from '$core/types/any-fn';

export type RetryOptions<OriginalFn extends AnyFn> = {
  attempts: number;
  delayMs?: number;
  shouldRetry?: (
    error: unknown,
    context: {
      args: Parameters<OriginalFn>;
      attemptNumber: number;
    },
  ) => boolean;
};
