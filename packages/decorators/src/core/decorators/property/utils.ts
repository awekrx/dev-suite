import { PropertyStorageEntry } from './types';

const storageByInstance = new WeakMap<object, Map<PropertyKey, PropertyStorageEntry>>();

export const getStorageEntry = (instance: object, propertyKey: PropertyKey): PropertyStorageEntry => {
  const entries = storageByInstance.get(instance) ?? new Map<PropertyKey, PropertyStorageEntry>();

  if (!storageByInstance.has(instance)) {
    storageByInstance.set(instance, entries);
  }

  const existingEntry = entries.get(propertyKey);

  if (existingEntry) {
    return existingEntry;
  }

  const nextEntry: PropertyStorageEntry = {
    hasValue: false,
    value: undefined,
  };

  entries.set(propertyKey, nextEntry);

  return nextEntry;
};
