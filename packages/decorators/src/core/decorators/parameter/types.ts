import { AnyFn } from '$core/types/any-fn';
import { ClassMethodThis } from '$core/types/class-method-this';

export type ParameterDecoratorArgs<OriginalFn extends AnyFn> = {
  descriptor: TypedPropertyDescriptor<OriginalFn>;
  parameterIndex: number;
  propertyKey: PropertyKey;
  target: object;
};

export type ParameterDecoratorInterceptorArgs<OriginalFn extends AnyFn> = {
  args: Parameters<OriginalFn>;
  originalThis: ClassMethodThis;
  value: unknown;
} & ParameterDecoratorArgs<OriginalFn>;

export type ParameterDecoratorBeforeInterceptorArgs<OriginalFn extends AnyFn> =
  ParameterDecoratorInterceptorArgs<OriginalFn>;

export type ParameterDecoratorAfterInterceptorArgs<OriginalFn extends AnyFn> =
  ParameterDecoratorInterceptorArgs<OriginalFn>;

export type ParameterDecoratorWrapInterceptorArgs<OriginalFn extends AnyFn> = {
  invoke: (value?: unknown) => unknown;
} & ParameterDecoratorInterceptorArgs<OriginalFn>;

export type CreateParameterDecoratorArgs<OriginalFn extends AnyFn> = {
  after?: (args: ParameterDecoratorAfterInterceptorArgs<OriginalFn>) => void;
  before?: (args: ParameterDecoratorBeforeInterceptorArgs<OriginalFn>) => void;
  wrap?: (args: ParameterDecoratorWrapInterceptorArgs<OriginalFn>) => unknown;
};
