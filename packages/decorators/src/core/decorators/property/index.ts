import { ClassMethodThis } from '$core/types/class-method-this';

import { CreatePropertyDecoratorArgs, PropertyDecoratorArgs, PropertyValueContext } from './types';
import { getStorageEntry } from './utils';

export const createPropertyDecorator =
  (runtime: CreatePropertyDecoratorArgs) =>
  (target: PropertyDecoratorArgs['target'], propertyKey: PropertyDecoratorArgs['propertyKey']) => {
    Object.defineProperty(target, propertyKey, {
      configurable: true,
      enumerable: true,
      get(this: object) {
        const entry = getStorageEntry(this, propertyKey);
        const originalThis = this as ClassMethodThis;
        const context: PropertyValueContext = { originalThis, propertyKey, target };

        const setValue = (nextValue: unknown) => {
          entry.value = nextValue;
          entry.hasValue = true;
        };

        if (!runtime.get) {
          return entry.value;
        }

        return runtime.get({
          ...context,
          entry,
          getValue: () => entry.value,
          setValue,
        });
      },
      set(this: object, value: unknown) {
        const entry = getStorageEntry(this, propertyKey);
        const originalThis = this as ClassMethodThis;
        const context: PropertyValueContext = { originalThis, propertyKey, target };
        const previousValue = entry.value;
        const setValue = (nextValue: unknown) => {
          entry.value = nextValue;
          entry.hasValue = true;
        };

        if (!runtime.set) {
          setValue(value);
          return;
        }

        runtime.set({
          ...context,
          entry,
          getValue: () => entry.value,
          previousValue,
          setValue,
          value,
        });
        if (!entry.hasValue) {
          setValue(value);
        }
      },
    });
  };
