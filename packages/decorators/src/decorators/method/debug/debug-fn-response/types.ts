import { Primitive } from 'utility-types';

import { AnyFn } from '$core/types/any-fn';

import { DebugFnOptions } from '../types';

export type DebugFnResponseOptions<OriginalFn extends AnyFn> = {
  formatResponse?: (response: ReturnType<OriginalFn>) => Primitive;
} & DebugFnOptions;
