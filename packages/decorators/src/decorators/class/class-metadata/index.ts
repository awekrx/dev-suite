import { createClassDecorator } from '$core/decorators/class';

import { CLASS_METADATA_SYMBOL, ClassMetadataOptions, MetadataClassCtor } from './types';

export const classMetadata = (options: ClassMetadataOptions) => {
  const { metadata, symbol = CLASS_METADATA_SYMBOL } = options;

  return createClassDecorator({
    before: ({ target }) => {
      const metadataTarget = target as MetadataClassCtor;
      const currentMetadata = (metadataTarget[symbol] as Record<string, unknown> | undefined) ?? {};

      metadataTarget[symbol] = {
        ...currentMetadata,
        ...metadata,
      };
    },
  });
};

export * from './types';
