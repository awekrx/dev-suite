import { enumParam } from './index';

describe('enumParam parameter decorator', () => {
  it('allows only whitelisted values', () => {
    class Example {
      echo(input: string) {
        return input;
      }
    }

    enumParam({ allowed: ['a', 'b'] })(Example.prototype, 'echo', 0);

    expect(new Example().echo('a')).toBe('a');
    expect(() => new Example().echo('c')).toThrow('Invalid enum value');
  });
});
