import { metrics } from './index';

import { decorateMethod } from '../../../test/utils/decorate-method';

describe('metrics decorator', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-01-01T00:00:00Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('reports success for sync methods', () => {
    const reporter = jest.fn();
    const wrapped = decorateMethod(metrics({ reporter }) as MethodDecorator, () => 'ok');

    expect(wrapped()).toBe('ok');
    expect(reporter).toHaveBeenCalledWith(expect.objectContaining({ name: 'run', success: true, durationMs: 0 }));
  });

  it('reports failure for async methods', async () => {
    const reporter = jest.fn();

    const wrapped = decorateMethod(metrics({ reporter }) as MethodDecorator, async () => {
      jest.advanceTimersByTime(5);

      throw new Error('fail');
    });

    await expect(wrapped()).rejects.toThrow('fail');
    expect(reporter).toHaveBeenCalledWith(expect.objectContaining({ name: 'run', success: false, durationMs: 5 }));
  });

  it('does not report when disabled', () => {
    const reporter = jest.fn();
    const wrapped = decorateMethod(metrics({ reporter, enabled: false }) as MethodDecorator, () => 'ok');

    expect(wrapped()).toBe('ok');
    expect(reporter).not.toHaveBeenCalled();
  });
});
