import { rangeParam } from './index';

describe('rangeParam parameter decorator', () => {
  it('validates numeric range', () => {
    class Example {
      echo(input: number) {
        return input;
      }
    }

    rangeParam({ min: 1, max: 3 })(Example.prototype, 'echo', 0);

    expect(new Example().echo(2)).toBe(2);
    expect(() => new Example().echo(10)).toThrow('out of range');
  });
});
