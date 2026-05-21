import { clampParam } from './index';

describe('clampParam parameter decorator', () => {
  it('clamps numeric values to range', () => {
    class Example {
      echo(input: number) {
        return input;
      }
    }

    clampParam({ min: 1, max: 5 })(Example.prototype, 'echo', 0);

    expect(new Example().echo(10)).toBe(5);
  });
});
