import { observable } from './index';

describe('observable decorator', () => {
  it('calls change handler on set', () => {
    const onChange = jest.fn();

    class Example {
      value!: string;
    }

    observable(onChange)(Example.prototype, 'value');

    const instance = new Example();

    instance.value = 'next';

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0]?.[0]).toMatchObject({
      nextValue: 'next',
      previousValue: undefined,
      propertyKey: 'value',
    });
  });
});
