import { trim } from './index';

describe('trim parameter decorator', () => {
  it('trims string values', () => {
    class Example {
      echo(input: string) {
        return input;
      }
    }

    trim()(Example.prototype, 'echo', 0);

    expect(new Example().echo('  hi  ')).toBe('hi');
  });
});
