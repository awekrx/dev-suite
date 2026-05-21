import { Primitive } from 'utility-types';

import { MethodDecoratorInterceptorArgs } from '$core/decorators/method';
import { AnyFn } from '$core/types/any-fn';
import { DebugFnEnabled } from '$core/types/debug-fn-enabled';

export type DebugFnOptions = {
  enabled?: DebugFnEnabled;
  label?: string;
  once?: boolean;
  shouldHideDebugPrefix?: boolean;
  shouldHideTime?: boolean;
};

export type DebugFnCoreOptions<OriginalFn extends AnyFn, DataType extends unknown> = {
  data: DataType;
  insertFnNameInMessageTemplate: (fnName: string) => string;
  onceSeenKeys: Set<string>;
  formatter?: (data: DataType) => Primitive;
} & DebugFnOptions &
  Pick<MethodDecoratorInterceptorArgs<OriginalFn>, 'propertyKey' | 'originalThis'>;
