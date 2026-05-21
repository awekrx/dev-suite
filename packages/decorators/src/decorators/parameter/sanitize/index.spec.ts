import { sanitize } from './index';

describe('sanitize parameter decorator', () => {
  it('removes dangerous symbols from string', () => {
    class Example {
      echo(input: string) {
        return input;
      }
    }

    sanitize()(Example.prototype, 'echo', 0);

    expect(new Example().echo('<b>ok</b>')).toBe('bok/b');
  });
});
