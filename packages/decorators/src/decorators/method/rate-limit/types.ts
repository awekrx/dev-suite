export type RateLimitOptions<FnArgs extends unknown[]> = {
  maxCalls: number;
  windowMs: number;
  keyResolver?: (args: FnArgs) => string;
  message?: string;
};
