import { createPropertyDecorator } from '$core/decorators/property';
import { PropertyValueContext } from '$core/decorators/property/types';

import { PersistOptions } from './types';

const resolvePersistKey = (options: PersistOptions, context: PropertyValueContext): string => {
  if (typeof options.key === 'function') {
    return options.key(context);
  }

  return options.key ?? `${context.target.constructor.name}:${String(context.propertyKey)}`;
};

const isPersistEnabled = (options: PersistOptions, context: PropertyValueContext): boolean => {
  if (typeof options.enabled === 'function') {
    return options.enabled(context);
  }

  return options.enabled ?? true;
};

export const persist = (options: PersistOptions) =>
  createPropertyDecorator({
    get: ({ entry, setValue, ...context }) => {
      if (entry.hasValue) {
        return entry.value;
      }

      if (!isPersistEnabled(options, context)) {
        return entry.value;
      }

      const persistKey = resolvePersistKey(options, context);
      const persistedValue = options.adapter.get(persistKey);

      if (typeof persistedValue !== 'undefined') {
        const nextValue = options.deserialize ? options.deserialize(persistedValue) : persistedValue;

        setValue(nextValue);
      }

      return entry.value;
    },
    set: ({ setValue, value, ...context }) => {
      setValue(value);

      if (!isPersistEnabled(options, context)) {
        return;
      }

      const persistKey = resolvePersistKey(options, context);
      const serializedValue = options.serialize ? options.serialize(value) : value;

      options.adapter.set(persistKey, serializedValue);
    },
  });

export * from './types';
