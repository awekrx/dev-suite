import { memoizedComputed } from './index';

describe('memoizedComputed decorator', () => {
  it('computes value once per instance', () => {
    const resolver = jest.fn(() => Math.random());

    class Example {
      value!: number;
    }

    memoizedComputed(() => resolver())(Example.prototype, 'value');

    const instance = new Example();
    const first = instance.value;
    const second = instance.value;

    expect(first).toBe(second);
    expect(resolver).toHaveBeenCalledTimes(1);
  });
});
