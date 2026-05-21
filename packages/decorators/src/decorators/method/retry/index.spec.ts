import { retry } from './index';

import { decorateMethod } from '../../../test/utils/decorate-method';

describe('retry decorator', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('retries until success', async () => {
    const implementation = jest
      .fn()
      .mockRejectedValueOnce(new Error('fail-1'))
      .mockRejectedValueOnce(new Error('fail-2'))
      .mockResolvedValueOnce('ok');

    const wrapped = decorateMethod(retry({ attempts: 3, delayMs: 50 }) as MethodDecorator, implementation);

    const responsePromise = wrapped('x');

    await jest.advanceTimersByTimeAsync(100);

    await expect(responsePromise).resolves.toBe('ok');
    expect(implementation).toHaveBeenCalledTimes(3);
  });

  it('stops retries when shouldRetry returns false', async () => {
    const implementation = jest.fn().mockRejectedValue(new Error('no-retry'));

    const wrapped = decorateMethod(retry({ attempts: 3, shouldRetry: () => false }) as MethodDecorator, implementation);

    await expect(wrapped('x')).rejects.toThrow('no-retry');
    expect(implementation).toHaveBeenCalledTimes(1);
  });

  it('preserves sync return type and retries sync throws', () => {
    let attemptNumber = 0;

    const implementation = jest.fn(() => {
      attemptNumber += 1;

      if (attemptNumber < 3) {
        throw new Error('sync-fail');
      }

      return 'sync-ok';
    });

    const wrapped = decorateMethod(retry({ attempts: 3 }) as MethodDecorator, implementation);

    const response = wrapped();

    expect(response).toBe('sync-ok');
    expect(response).not.toBeInstanceOf(Promise);
    expect(implementation).toHaveBeenCalledTimes(3);
  });
});
