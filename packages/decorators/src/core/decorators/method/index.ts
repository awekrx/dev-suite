import { AnyFn } from '$core/types/any-fn';
import { ClassMethodThis } from '$core/types/class-method-this';

import { CreateMethodDecoratorArgs, MethodDecoratorArgs } from './types';

export const createMethodDecorator =
  <OriginalFn extends AnyFn>(args: CreateMethodDecoratorArgs<OriginalFn>) =>
  (
    target: MethodDecoratorArgs<OriginalFn>['target'],
    propertyKey: MethodDecoratorArgs<OriginalFn>['propertyKey'],
    descriptor: MethodDecoratorArgs<OriginalFn>['descriptor'],
  ) => {
    const { before, after, wrap } = args;

    const originalFn = descriptor.value as OriginalFn;

    descriptor.value = function value(
      this: ThisParameterType<OriginalFn>,
      ...fnArgs: Parameters<OriginalFn>
    ): ReturnType<OriginalFn> {
      const invoke = (argsToInvoke: Parameters<OriginalFn> = fnArgs) => {
        before?.({
          target,
          propertyKey,
          descriptor,
          args: argsToInvoke,
          originalThis: this as ClassMethodThis,
        });

        const response = originalFn.apply(this, argsToInvoke) as ReturnType<OriginalFn>;

        after?.({
          target,
          propertyKey,
          descriptor,
          response,
          originalThis: this as ClassMethodThis,
        });

        return response;
      };

      if (!wrap) {
        return invoke();
      }

      return wrap({
        target,
        propertyKey,
        descriptor,
        args: fnArgs,
        invoke,
        originalThis: this as ClassMethodThis,
      });
    } as OriginalFn;

    return descriptor;
  };

export * from './types';
