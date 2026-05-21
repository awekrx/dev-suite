import { AnyFn } from '$core/types/any-fn';

export type TraceEvent<OriginalFn extends AnyFn> = {
  args: Parameters<OriginalFn>;
  methodName: PropertyKey;
  phase: 'start' | 'success' | 'error';
  durationMs?: number;
  error?: unknown;
};

export type TraceOptions<OriginalFn extends AnyFn> = {
  reporter?: (event: TraceEvent<OriginalFn>) => void;
};
