export type DedupeOptions<FnArgs extends unknown[]> = {
  keyResolver?: (args: FnArgs) => string;
};
