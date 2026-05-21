import { singleton } from './index';

describe('singleton decorator', () => {
  it('returns the same instance for repeated construction', () => {
    class Example {
      constructor(public readonly value: number) {}
    }

    const Decorated = singleton()(Example);

    const first = new Decorated(1);
    const second = new Decorated(2);

    expect(first).toBe(second);
    expect(first.value).toBe(1);
  });

  it('supports key-based singleton instances', () => {
    class Example {
      constructor(public readonly value: string) {}
    }

    const Decorated = singleton({ keyResolver: (args) => String(args[0]) })(Example);

    const firstA = new Decorated('a');
    const secondA = new Decorated('a');
    const firstB = new Decorated('b');

    expect(firstA).toBe(secondA);
    expect(firstA).not.toBe(firstB);
  });
});
