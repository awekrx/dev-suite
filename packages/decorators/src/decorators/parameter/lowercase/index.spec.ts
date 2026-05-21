import { lowercase } from './index';

describe('lowercase parameter decorator', () => {
  it('normalizes to lowercase', () => {
    class Example {
      echo(input: string) {
        return input;
      }
    }

    lowercase()(Example.prototype, 'echo', 0);

    expect(new Example().echo('TeSt')).toBe('test');
  });
});
