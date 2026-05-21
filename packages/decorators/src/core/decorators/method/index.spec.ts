import { createMethodDecorator } from './index';

describe('createMethodDecorator', () => {
  it('runs before and after interceptors around invoke', () => {
    const before = jest.fn();
    const after = jest.fn();

    class Example {
      value = 2;

      method(input: number) {
        return this.value + input;
      }
    }

    const descriptor = Object.getOwnPropertyDescriptor(Example.prototype, 'method') as TypedPropertyDescriptor<
      (input: number) => number
    >;

    createMethodDecorator<(input: number) => number>({ before, after })(Example.prototype, 'method', descriptor);
    Object.defineProperty(Example.prototype, 'method', descriptor);

    const instance = new Example();
    const result = instance.method(3);

    expect(result).toBe(5);
    expect(before).toHaveBeenCalledTimes(1);
    expect(after).toHaveBeenCalledTimes(1);
    expect(before.mock.calls[0]?.[0]).toMatchObject({
      propertyKey: 'method',
      args: [3],
    });
    expect(after.mock.calls[0]?.[0]).toMatchObject({
      propertyKey: 'method',
      response: 5,
    });
  });

  it('allows wrap to control invocation args', () => {
    class Example {
      method(a: number, b: number) {
        return a + b;
      }
    }

    const descriptor = Object.getOwnPropertyDescriptor(Example.prototype, 'method') as TypedPropertyDescriptor<
      (a: number, b: number) => number
    >;

    createMethodDecorator<(a: number, b: number) => number>({
      wrap: ({ invoke }) => invoke([10, 20]),
    })(Example.prototype, 'method', descriptor);
    Object.defineProperty(Example.prototype, 'method', descriptor);

    expect(new Example().method(1, 2)).toBe(30);
  });
});
