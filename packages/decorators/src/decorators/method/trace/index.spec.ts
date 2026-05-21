import { trace } from './index';

import { decorateMethod } from '../../../test/utils/decorate-method';

describe('trace decorator', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-01-01T00:00:00Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('reports start and success events for sync call', () => {
    const reporter = jest.fn();
    const wrapped = decorateMethod(trace({ reporter }) as MethodDecorator, (value: number) => value * 2);

    expect(wrapped(2)).toBe(4);
    expect(reporter).toHaveBeenCalledTimes(2);
    expect(reporter.mock.calls[0][0]).toMatchObject({ phase: 'start', args: [2] });
    expect(reporter.mock.calls[1][0]).toMatchObject({ phase: 'success', durationMs: 0, args: [2] });
  });

  it('reports error event for async rejection', async () => {
    const reporter = jest.fn();

    const wrapped = decorateMethod(trace({ reporter }) as MethodDecorator, async () => {
      throw new Error('boom');
    });

    await expect(wrapped()).rejects.toThrow('boom');
    expect(reporter).toHaveBeenCalledTimes(2);
    expect(reporter.mock.calls[1][0]).toMatchObject({ phase: 'error' });
  });

  it('does not break method call when reporter throws', () => {
    const reporter = jest.fn(() => {
      throw new Error('reporter-failed');
    });

    const implementation = jest.fn((value: number) => value + 1);
    const wrapped = decorateMethod(trace({ reporter }) as MethodDecorator, implementation);

    expect(wrapped(2)).toBe(3);
    expect(implementation).toHaveBeenCalledTimes(1);
    expect(reporter).toHaveBeenCalled();
  });
});
