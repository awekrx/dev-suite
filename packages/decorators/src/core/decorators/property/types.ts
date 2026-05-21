import { ClassMethodThis } from '$core/types/class-method-this';

export type PropertyDecoratorArgs = {
  propertyKey: PropertyKey;
  target: object;
};

export type PropertyValueContext = {
  originalThis: ClassMethodThis;
  propertyKey: PropertyKey;
  target: object;
};

export type PropertyStorageEntry = {
  hasValue: boolean;
  value: unknown;
};

export type PropertyGetHandlerArgs = PropertyValueContext & {
  entry: PropertyStorageEntry;
  getValue: () => unknown;
  setValue: (value: unknown) => void;
};

export type PropertySetHandlerArgs = PropertyValueContext & {
  entry: PropertyStorageEntry;
  getValue: () => unknown;
  previousValue: unknown;
  setValue: (value: unknown) => void;
  value: unknown;
};

export type CreatePropertyDecoratorArgs = {
  get?: (args: PropertyGetHandlerArgs) => unknown;
  set?: (args: PropertySetHandlerArgs) => void;
};
