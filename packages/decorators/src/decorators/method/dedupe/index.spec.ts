import { dedupe } from './index';

import { decorateMethod } from '../../../test/utils/decorate-method';

describe('dedupe decorator', () => {
  it('returns same in-flight promise for same key', async () => {
    let resolveFn: ((value: string) => void) | undefined;

    const impl = jest.fn(
      (_key: string) =>
        new Promise<string>((resolve) => {
          resolveFn = resolve;
        }),
    );

    const wrapped = decorateMethod(dedupe() as MethodDecorator, impl);

    const first = wrapped('x');
    const second = wrapped('x');

    expect(first).toBe(second);
    expect(impl).toHaveBeenCalledTimes(1);

    resolveFn?.('done');
    await expect(first).resolves.toBe('done');
  });

  it('does not dedupe sync responses', () => {
    const impl = jest.fn((value: number) => value * 2);
    const wrapped = decorateMethod(dedupe() as MethodDecorator, impl);

    expect(wrapped(2)).toBe(4);
    expect(wrapped(2)).toBe(4);
    expect(impl).toHaveBeenCalledTimes(2);
  });
});
