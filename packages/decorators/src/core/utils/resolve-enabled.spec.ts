import { resolveEnabled } from './resolve-enabled';

describe('resolveEnabled', () => {
  it('returns true by default for undefined', () => {
    expect(resolveEnabled(undefined)).toBe(true);
  });

  it('returns the boolean value for literals', () => {
    expect(resolveEnabled(true)).toBe(true);
    expect(resolveEnabled(false)).toBe(false);
  });

  it('evaluates function result and guards exceptions', () => {
    expect(resolveEnabled(() => true)).toBe(true);
    expect(resolveEnabled(() => false)).toBe(false);
    expect(
      resolveEnabled(() => {
        throw new Error('boom');
      }),
    ).toBe(false);
  });
});
