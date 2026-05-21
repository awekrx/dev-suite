import { uppercase } from './index';

describe('uppercase parameter decorator', () => {
  it('normalizes to uppercase', () => {
    class Example {
      echo(input: string) {
        return input;
      }
    }

    uppercase()(Example.prototype, 'echo', 0);

    expect(new Example().echo('TeSt')).toBe('TEST');
  });
});
