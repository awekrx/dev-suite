export type DebounceOptions = {
  waitMs: number;
  cancelMessage?: string;
  keyResolver?: (args: unknown[]) => string;
};
