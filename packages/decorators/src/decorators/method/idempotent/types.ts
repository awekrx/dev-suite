export type IdempotentOptions<FnArgs extends unknown[]> = {
  keyResolver?: (args: FnArgs) => string;
};
