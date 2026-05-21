import { timeout } from './index';

import { decorateMethod } from '../../../test/utils/decorate-method';

describe('timeout decorator', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('rejects when promise exceeds timeout', async () => {
    const wrapped = decorateMethod(
      timeout({ ms: 50 }) as MethodDecorator,
      'run',
      () =>
        new Promise((resolve) => {
          setTimeout(() => resolve('ok'), 100);
        }),
    );

    const pending = wrapped();

    jest.advanceTimersByTime(51);

    await expect(pending).rejects.toThrow('Method execution timed out after 50ms');
  });

  it('returns original response when promise resolves in time', async () => {
    const wrapped = decorateMethod(timeout({ ms: 10 }) as MethodDecorator, 'run', async () => 'ok');

    await expect(wrapped()).resolves.toBe('ok');
  });
});
