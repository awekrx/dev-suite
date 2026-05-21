import { idempotent } from './index';

import { decorateMethod } from '../../../test/utils/decorate-method';

describe('idempotent decorator', () => {
  it('returns same in-flight promise for same key', async () => {
    let resolveFn: ((value: string) => void) | undefined;

    const impl = jest.fn(
      (_key: string) =>
        new Promise<string>((resolve) => {
          resolveFn = resolve;
        }),
    );

    const wrapped = decorateMethod(idempotent() as MethodDecorator, impl);

    const first = wrapped('x');
    const second = wrapped('x');

    expect(first).toBe(second);
    expect(impl).toHaveBeenCalledTimes(1);

    resolveFn?.('done');
    await expect(first).resolves.toBe('done');
  });

  it('executes again after previous promise settles', async () => {
    const impl = jest.fn(async (_key: string) => 'ok');
    const wrapped = decorateMethod(idempotent() as MethodDecorator, impl);

    await wrapped('x');
    await wrapped('x');
    expect(impl).toHaveBeenCalledTimes(2);
  });
});
