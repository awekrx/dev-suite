import { isPromise } from './is-promise';

describe('isPromise', () => {
  it('returns true for Promise-like values', () => {
    expect(isPromise(Promise.resolve('ok'))).toBe(true);
  });

  it('returns false for non-promise values', () => {
    expect(isPromise(undefined)).toBe(false);
    expect(isPromise(null)).toBe(false);
    expect(isPromise(123)).toBe(false);
    expect(isPromise({})).toBe(false);
  });
});
