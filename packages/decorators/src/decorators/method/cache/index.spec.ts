import { cache } from './index';

import { decorateMethod } from '../../../test/utils/decorate-method';

describe('cache decorator', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-01-01T00:00:00Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('reuses cached sync value for same args', () => {
    const impl = jest.fn((a: number) => a * 2);
    const wrapped = decorateMethod(cache() as MethodDecorator, impl);

    expect(wrapped(2)).toBe(4);
    expect(wrapped(2)).toBe(4);
    expect(impl).toHaveBeenCalledTimes(1);
  });

  it('expires cached values by ttl', () => {
    const impl = jest.fn(() => Math.random());
    const wrapped = decorateMethod(cache({ ttlMs: 100 }) as MethodDecorator, impl);

    const first = wrapped();

    jest.advanceTimersByTime(101);
    const second = wrapped();

    expect(first).not.toBe(second);
    expect(impl).toHaveBeenCalledTimes(2);
  });

  it('removes rejected promise from cache', async () => {
    const impl = jest
      .fn()
      .mockImplementationOnce(async () => {
        throw new Error('fail');
      })
      .mockResolvedValueOnce('ok');

    const wrapped = decorateMethod(cache() as MethodDecorator, impl);

    await expect(wrapped()).rejects.toThrow('fail');
    await expect(wrapped()).resolves.toBe('ok');
    expect(impl).toHaveBeenCalledTimes(2);
  });
});
