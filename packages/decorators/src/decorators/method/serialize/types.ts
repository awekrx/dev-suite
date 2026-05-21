import { AnyFn } from '$core/types/any-fn';
import { ClassMethodThis } from '$core/types/class-method-this';

export type SerializeContext<OriginalFn extends AnyFn> = {
  args: Parameters<OriginalFn>;
  methodName: PropertyKey;
  originalThis: ClassMethodThis;
};

export type SerializeOptions<OriginalFn extends AnyFn> = {
  serializer: (value: Awaited<ReturnType<OriginalFn>>, context: SerializeContext<OriginalFn>) => unknown;
};
