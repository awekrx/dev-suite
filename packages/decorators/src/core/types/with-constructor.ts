export type WithConstructor<T> = T extends object ? T & { constructor: { name: string } } : T;
