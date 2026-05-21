export type LockOptions<FnArgs extends unknown[]> = {
  keyResolver?: (args: FnArgs) => string;
  message?: string;
};
