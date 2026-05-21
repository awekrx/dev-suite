import { rateLimit } from './index';

import { decorateMethod } from '../../../test/utils/decorate-method';

describe('rateLimit decorator', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-01-01T00:00:00Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('limits calls in the same time window', () => {
    const implementation = jest.fn((value: string) => value);
    const wrapped = decorateMethod(rateLimit({ maxCalls: 2, windowMs: 100 }) as MethodDecorator, implementation);

    expect(wrapped('a')).toBe('a');
    expect(wrapped('b')).toBe('b');
    expect(() => wrapped('c')).toThrow('Rate limit exceeded');
    expect(implementation).toHaveBeenCalledTimes(2);
  });

  it('allows calls again after time window passes', () => {
    const implementation = jest.fn((value: string) => value);
    const wrapped = decorateMethod(rateLimit({ maxCalls: 1, windowMs: 100 }) as MethodDecorator, implementation);

    expect(wrapped('a')).toBe('a');
    jest.advanceTimersByTime(101);
    expect(wrapped('b')).toBe('b');
    expect(implementation).toHaveBeenCalledTimes(2);
  });
});
