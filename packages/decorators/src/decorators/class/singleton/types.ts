import { Ctor } from '$core/decorators/class';

export type SingletonOptions<ClassCtor extends Ctor> = {
  keyResolver?: (args: unknown[]) => string;
  store?: Map<string, InstanceType<ClassCtor>>;
};
