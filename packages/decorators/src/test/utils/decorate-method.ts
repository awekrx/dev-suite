export const decorateMethod = <FunctionImplementation extends (...args: any[]) => any>(
  decorator: MethodDecorator,
  methodNameOrImplementation: string | FunctionImplementation,
  maybeImplementation?: FunctionImplementation,
): FunctionImplementation => {
  const methodName = typeof methodNameOrImplementation === 'string' ? methodNameOrImplementation : 'run';

  const implementation = (
    typeof methodNameOrImplementation === 'string' ? maybeImplementation : methodNameOrImplementation
  ) as FunctionImplementation;

  const holder = { [methodName]: implementation } as Record<string, FunctionImplementation>;

  const descriptor = Object.getOwnPropertyDescriptor(
    holder,
    methodName,
  ) as TypedPropertyDescriptor<FunctionImplementation>;

  decorator(holder, methodName, descriptor);
  Object.defineProperty(holder, methodName, descriptor);

  return holder[methodName] as FunctionImplementation;
};
