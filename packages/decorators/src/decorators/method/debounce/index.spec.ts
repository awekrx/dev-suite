import { debounce } from './index';

import { decorateMethod } from '../../../test/utils/decorate-method';

describe('debounce decorator', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('cancels previous call for same key', async () => {
    const impl = jest.fn(async (v: string) => v);
    const wrapped = decorateMethod(debounce({ waitMs: 20 }) as MethodDecorator, impl);

    const first = wrapped('first');
    const second = wrapped('second');

    jest.advanceTimersByTime(20);

    await expect(first).rejects.toThrow('Debounced call canceled');
    await expect(second).resolves.toBe('second');
    expect(impl).toHaveBeenCalledTimes(1);
  });

  it('resolves a single call after wait window', async () => {
    const impl = jest.fn(async (v: string) => v);
    const wrapped = decorateMethod(debounce({ waitMs: 20 }) as MethodDecorator, impl);

    const pending = wrapped('x');

    jest.advanceTimersByTime(20);

    await expect(pending).resolves.toBe('x');
    expect(impl).toHaveBeenCalledTimes(1);
  });
});
