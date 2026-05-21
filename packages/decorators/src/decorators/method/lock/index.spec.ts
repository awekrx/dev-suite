import { lock } from './index';

import { decorateMethod } from '../../../test/utils/decorate-method';

describe('lock decorator', () => {
  it('throws while same key is in flight', async () => {
    let resolveRequest: ((value: string) => void) | undefined;

    const implementation = jest.fn(
      (_value: string) =>
        new Promise<string>((resolve) => {
          resolveRequest = resolve;
        }),
    );

    const wrapped = decorateMethod(lock() as MethodDecorator, implementation);

    const firstCall = wrapped('x');

    expect(() => wrapped('x')).toThrow('Method is locked');

    resolveRequest?.('ok');
    await expect(firstCall).resolves.toBe('ok');
  });

  it('unlocks after completion', async () => {
    const implementation = jest.fn(async (value: string) => value);
    const wrapped = decorateMethod(lock() as MethodDecorator, implementation);

    await expect(wrapped('x')).resolves.toBe('x');
    await expect(wrapped('x')).resolves.toBe('x');
    expect(implementation).toHaveBeenCalledTimes(2);
  });
});
