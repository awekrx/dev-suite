import { serialize } from './index';

import { decorateMethod } from '../../../test/utils/decorate-method';

describe('serialize decorator', () => {
  it('serializes sync response', () => {
    const wrapped = decorateMethod(
      serialize({
        serializer: (value, context) => `${String(context.methodName)}:${JSON.stringify(value)}`,
      }) as MethodDecorator,
      'getData',
      () => ({ ok: true }),
    );

    expect(wrapped()).toBe('getData:{"ok":true}');
  });

  it('serializes async response', async () => {
    const wrapped = decorateMethod(
      serialize({
        serializer: (value) => ({ payload: value }),
      }) as MethodDecorator,
      async () => 42,
    );

    await expect(wrapped()).resolves.toEqual({ payload: 42 });
  });
});
