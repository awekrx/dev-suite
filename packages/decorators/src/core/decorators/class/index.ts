import { ClassMethodThis } from '$core/types/class-method-this';

import { CreateClassDecoratorArgs, Ctor } from './types';

export const createClassDecorator =
  (args: CreateClassDecoratorArgs) =>
  <ClassCtor extends Ctor>(target: ClassCtor): ClassCtor => {
    const { before, after, wrap } = args;

    const proxy = new Proxy(target, {
      construct(classTarget, ctorArgs, newTarget) {
        const invoke = (argsToInvoke: unknown[] = ctorArgs) => {
          const instance = Reflect.construct(classTarget, argsToInvoke, newTarget) as ClassMethodThis;

          before?.({
            target,
            args: argsToInvoke,
            originalThis: instance,
          });

          after?.({
            target,
            response: instance,
            originalThis: instance,
          });

          return instance;
        };

        if (!wrap) {
          return invoke();
        }

        return wrap({
          target,
          args: ctorArgs,
          invoke,
        }) as object;
      },
    });

    return proxy as ClassCtor;
  };

export * from './types';
