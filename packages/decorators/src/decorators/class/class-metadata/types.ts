import { Ctor } from '$core/decorators/class';

export const CLASS_METADATA_SYMBOL = Symbol('class-metadata');

export type ClassMetadataOptions = {
  metadata: Record<string, unknown>;
  symbol?: symbol;
};

export type MetadataClassCtor = Ctor & {
  [key: symbol]: unknown;
  [CLASS_METADATA_SYMBOL]?: Record<string, unknown>;
};
