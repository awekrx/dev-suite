import { PropertyValueContext } from '$core/decorators/property/types';

export type PersistAdapter = {
  get: (key: string) => unknown;
  set: (key: string, value: unknown) => void;
  delete?: (key: string) => void;
};

export type PersistOptions = {
  adapter: PersistAdapter;
  deserialize?: (value: unknown) => unknown;
  enabled?: boolean | ((args: PropertyValueContext) => boolean);
  key?: string | ((args: PropertyValueContext) => string);
  serialize?: (value: unknown) => unknown;
};
