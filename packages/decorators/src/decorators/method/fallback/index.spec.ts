import { fallback } from './index';

import { decorateMethod } from '../../../test/utils/decorate-method';

describe('fallback decorator', () => {
  it('returns fallback value on sync error', () => {
    const wrapped = decorateMethod(fallback({ fallbackValue: 'safe' }) as MethodDecorator, () => {
      throw new Error('bad');
    });

    expect(wrapped()).toBe('safe');
  });

  it('uses onError for async error', async () => {
    const onError = jest.fn(() => 'recovered');

    const wrapped = decorateMethod(fallback({ onError }) as MethodDecorator, async () => {
      throw new Error('bad');
    });

    await expect(wrapped()).resolves.toBe('recovered');
    expect(onError).toHaveBeenCalledTimes(1);
  });
});
