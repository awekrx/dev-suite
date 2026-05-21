import { createParameterDecorator } from '$core/decorators/parameter';

import { SplitCsvOptions } from './types';

export const splitCsv = (options: SplitCsvOptions = {}) =>
  createParameterDecorator<(...args: unknown[]) => unknown>({
    wrap: ({ invoke, value }) => {
      if (typeof value !== 'string') {
        return invoke(value);
      }

      const separator = options.separator ?? ',';
      const shouldTrimItems = options.trimItems ?? true;
      const shouldFilterEmpty = options.filterEmpty ?? true;
      const items = value.split(separator);
      const normalized = shouldTrimItems ? items.map((item) => item.trim()) : items;

      return invoke(shouldFilterEmpty ? normalized.filter(Boolean) : normalized);
    },
  });

export * from './types';
