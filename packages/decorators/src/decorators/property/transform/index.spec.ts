import { transform } from './index';

describe('transform decorator', () => {
  it('transforms values before storing', () => {
    class Example {
      value!: string;
    }

    transform(({ value }) => String(value).toUpperCase())(Example.prototype, 'value');

    const instance = new Example();

    instance.value = 'hello';

    expect(instance.value).toBe('HELLO');
  });
});
