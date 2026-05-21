import { maskSensitive } from './index';

describe('maskSensitive parameter decorator', () => {
  it('replaces parameter with mask', () => {
    class Example {
      echo(input: string) {
        return input;
      }
    }

    maskSensitive({ mask: 'HIDDEN' })(Example.prototype, 'echo', 0);

    expect(new Example().echo('secret')).toBe('HIDDEN');
  });
});
