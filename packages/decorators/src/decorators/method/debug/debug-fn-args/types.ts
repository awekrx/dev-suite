import { Primitive } from 'utility-types';

import { AnyFn } from '$core/types/any-fn';

import { DebugFnOptions } from '../types';

export type DebugFnArgsOptions<OriginalFn extends AnyFn> = {
  formatArgs?: (args: Parameters<OriginalFn>) => Primitive;
} & DebugFnOptions;
