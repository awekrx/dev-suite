export type CoerceTarget = 'number' | 'boolean' | 'string' | 'date' | ((value: unknown) => unknown);

export type CoerceOptions = {
  to: CoerceTarget;
};
