import { AnyFn } from '$core/types/any-fn';
import { ClassMethodThis } from '$core/types/class-method-this';

import { CreateParameterDecoratorArgs, ParameterDecoratorArgs } from './types';

export const createParameterDecorator =
  <OriginalFn extends AnyFn>(args: CreateParameterDecoratorArgs<OriginalFn>) =>
  (
    target: ParameterDecoratorArgs<OriginalFn>['target'],
    propertyKey: ParameterDecoratorArgs<OriginalFn>['propertyKey'],
    parameterIndex: ParameterDecoratorArgs<OriginalFn>['parameterIndex'],
  ) => {
    const { before, after, wrap } = args;
    const descriptor = Object.getOwnPropertyDescriptor(target, propertyKey) as
      | TypedPropertyDescriptor<OriginalFn>
      | undefined;

    if (!descriptor || typeof descriptor.value !== 'function') {
      throw new Error(`createParameterDecorator can only be applied to methods. Received: ${String(propertyKey)}`);
    }

    const originalFn = descriptor.value as OriginalFn;

    descriptor.value = function value(
      this: ThisParameterType<OriginalFn>,
      ...fnArgs: Parameters<OriginalFn>
    ): ReturnType<OriginalFn> {
      const originalThis = this as ClassMethodThis;
      const currentValue = fnArgs[parameterIndex];

      before?.({
        target,
        propertyKey,
        parameterIndex,
        descriptor,
        args: fnArgs,
        originalThis,
        value: currentValue,
      });

      const invoke = (nextValue: unknown = currentValue) => nextValue;
      const nextValue = wrap
        ? wrap({
            target,
            propertyKey,
            parameterIndex,
            descriptor,
            args: fnArgs,
            originalThis,
            value: currentValue,
            invoke,
          })
        : currentValue;

      after?.({
        target,
        propertyKey,
        parameterIndex,
        descriptor,
        args: fnArgs,
        originalThis,
        value: nextValue,
      });

      const nextArgs = [...fnArgs] as Parameters<OriginalFn>;
      nextArgs[parameterIndex] = nextValue as Parameters<OriginalFn>[number];

      return originalFn.apply(this, nextArgs) as ReturnType<OriginalFn>;
    } as OriginalFn;

    Object.defineProperty(target, propertyKey, descriptor);
  };

export * from './types';
