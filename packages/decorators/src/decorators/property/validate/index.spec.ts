import { validate } from './index';

describe('validate decorator', () => {
  it('throws for invalid values', () => {
    class Example {
      value!: number;
    }

    validate(({ value }) => typeof value === 'number' && value > 0)(Example.prototype, 'value');

    const instance = new Example();

    expect(() => {
      instance.value = 0;
    }).toThrow('Invalid value for property value');
  });
});
