import { createPropertyDecorator } from './index';

describe('createPropertyDecorator', () => {
  it('allows get handler to hydrate value lazily', () => {
    class Example {
      value!: number;
    }

    createPropertyDecorator({
      get: ({ entry, setValue }) => {
        if (!entry.hasValue) {
          setValue(42);
        }

        return entry.value;
      },
    })(Example.prototype, 'value');

    const example = new Example();

    expect(example.value).toBe(42);
  });

  it('allows set handler to transform written values', () => {
    class Example {
      value!: string;
    }

    createPropertyDecorator({
      set: ({ value, setValue }) => {
        setValue(String(value).trim().toUpperCase());
      },
    })(Example.prototype, 'value');

    const example = new Example();

    example.value = '  hello ';

    expect(example.value).toBe('HELLO');
  });

  it('supports validation inside set handler', () => {
    class Example {
      value!: number;
    }

    createPropertyDecorator({
      set: ({ value, setValue, propertyKey }) => {
        if (typeof value !== 'number' || value < 0) {
          throw new Error(`Invalid value for property ${String(propertyKey)}`);
        }

        setValue(value);
      },
    })(Example.prototype, 'value');

    const example = new Example();

    expect(() => {
      example.value = -1;
    }).toThrow('Invalid value for property value');
  });

  it('supports per-instance memoization through entry state', () => {
    const compute = jest.fn(() => Math.random());

    class Example {
      value!: number;
    }

    createPropertyDecorator({
      get: ({ entry, setValue }) => {
        if (!entry.hasValue) {
          setValue(compute());
        }

        return entry.value;
      },
    })(Example.prototype, 'value');

    const example = new Example();
    const first = example.value;
    const second = example.value;

    expect(first).toBe(second);
    expect(compute).toHaveBeenCalledTimes(1);
  });

  it('exposes previous value in set handler', () => {
    const onChange = jest.fn();

    class Example {
      value!: number;
    }

    createPropertyDecorator({
      set: ({ value, previousValue, setValue, ...context }) => {
        setValue(value);
        onChange({ ...context, nextValue: value, previousValue });
      },
    })(Example.prototype, 'value');

    const example = new Example();

    example.value = 5;

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0]?.[0]).toMatchObject({
      propertyKey: 'value',
      nextValue: 5,
      previousValue: undefined,
    });
  });

  it('uses default setter behavior when set handler is not provided', () => {
    class Example {
      value!: number;
    }

    createPropertyDecorator({})(Example.prototype, 'value');
    const example = new Example();

    example.value = 10;

    expect(example.value).toBe(10);
  });
});
