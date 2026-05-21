export type CacheOptions<FnArgs extends unknown[]> = {
  keyResolver?: (args: FnArgs) => string;
  ttlMs?: number;
};
