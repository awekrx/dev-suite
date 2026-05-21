import { coerce } from './index';

describe('coerce parameter decorator', () => {
  it('coerces parameter to number', () => {
    class Example {
      sum(a: number, b: number) {
        return a + b;
      }
    }

    coerce({ to: 'number' })(Example.prototype, 'sum', 1);

    expect(new Example().sum(2, '3' as unknown as number)).toBe(5);
  });
});
