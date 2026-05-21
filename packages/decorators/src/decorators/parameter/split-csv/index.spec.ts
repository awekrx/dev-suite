import { splitCsv } from './index';

describe('splitCsv parameter decorator', () => {
  it('splits comma separated string', () => {
    class Example {
      count(items: string[]) {
        return items.length;
      }
    }

    splitCsv()(Example.prototype, 'count', 0);

    expect(new Example().count('a, b, , c' as unknown as string[])).toBe(3);
  });
});
