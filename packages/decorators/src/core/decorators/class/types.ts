import { ClassMethodThis } from '$core/types/class-method-this';

export type Ctor = new (...args: any[]) => any;

export type ClassDecoratorArgs = {
  target: Ctor;
};

export type ClassDecoratorBeforeInterceptorArgs = {
  args: unknown[];
  originalThis: ClassMethodThis;
  target: Ctor;
};

export type ClassDecoratorAfterInterceptorArgs = {
  originalThis: ClassMethodThis;
  response: unknown;
  target: Ctor;
};

export type CreateClassDecoratorArgs = {
  after?: (args: ClassDecoratorAfterInterceptorArgs) => void;
  before?: (args: ClassDecoratorBeforeInterceptorArgs) => void;
  wrap?: (args: ClassDecoratorWrapInterceptorArgs) => object;
};

export type ClassDecoratorWrapInterceptorArgs = {
  args: unknown[];
  invoke: (args?: unknown[]) => object;
  target: Ctor;
};
