import { AnyFn } from '$core/types/any-fn';
import { ClassMethodThis } from '$core/types/class-method-this';

export type MethodDecoratorArgs<OriginalFn extends AnyFn> = {
  descriptor: TypedPropertyDescriptor<OriginalFn>;
  propertyKey: PropertyKey;
  target: object;
};

export type MethodDecoratorInterceptorArgs<OriginalFn extends AnyFn> = {
  originalThis: ClassMethodThis;
} & MethodDecoratorArgs<OriginalFn>;

export type MethodDecoratorBeforeInterceptorArgs<OriginalFn extends AnyFn> = {
  args: Parameters<OriginalFn>;
} & MethodDecoratorInterceptorArgs<OriginalFn>;

export type MethodDecoratorAfterInterceptorArgs<OriginalFn extends AnyFn> = {
  response: ReturnType<OriginalFn>;
} & MethodDecoratorInterceptorArgs<OriginalFn>;

export type MethodDecoratorWrapInterceptorArgs<OriginalFn extends AnyFn> = {
  args: Parameters<OriginalFn>;
  invoke: (args?: Parameters<OriginalFn>) => ReturnType<OriginalFn>;
} & MethodDecoratorInterceptorArgs<OriginalFn>;

export type CreateMethodDecoratorArgs<OriginalFn extends AnyFn> = {
  after?: (args: MethodDecoratorAfterInterceptorArgs<OriginalFn>) => void;
  before?: (args: MethodDecoratorBeforeInterceptorArgs<OriginalFn>) => void;
  wrap?: (args: MethodDecoratorWrapInterceptorArgs<OriginalFn>) => ReturnType<OriginalFn>;
};

export type CreateMethodDecorator<OriginalFn extends AnyFn> = (
  args: CreateMethodDecoratorArgs<OriginalFn>,
) => TypedPropertyDescriptor<OriginalFn>;
