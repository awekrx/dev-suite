import { createParameterDecorator } from './index';

describe('createParameterDecorator', () => {
  it('runs before/after and transforms a parameter via wrap', () => {
    const before = jest.fn();
    const after = jest.fn();

    class Example {
      method(a: number, b: number) {
        return a + b;
      }
    }

    createParameterDecorator<(a: number, b: number) => number>({
      before,
      after,
      wrap: ({ invoke }) => invoke(10),
    })(Example.prototype, 'method', 1);

    const result = new Example().method(5, 2);

    expect(result).toBe(15);
    expect(before).toHaveBeenCalledTimes(1);
    expect(after).toHaveBeenCalledTimes(1);
    expect(before.mock.calls[0]?.[0]).toMatchObject({
      propertyKey: 'method',
      parameterIndex: 1,
      value: 2,
    });
    expect(after.mock.calls[0]?.[0]).toMatchObject({
      propertyKey: 'method',
      parameterIndex: 1,
      value: 10,
    });
  });

  it('throws when applied to non-method', () => {
    class Example {
      value = 1;
    }

    expect(() => createParameterDecorator<() => void>({})(Example.prototype, 'value', 0)).toThrow(
      'createParameterDecorator can only be applied to methods',
    );
  });
});
