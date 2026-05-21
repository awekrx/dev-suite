import { defaultValue } from './index';

describe('defaultValue decorator', () => {
  it('assigns default value on first read', () => {
    class Example {
      value!: number;
    }

    defaultValue(123)(Example.prototype, 'value');

    expect(new Example().value).toBe(123);
  });
});
