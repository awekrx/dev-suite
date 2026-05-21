import { z } from 'zod';

import { validateArgs } from './index';

import { decorateMethod } from '../../../test/utils/decorate-method';

describe('validateArgs decorator', () => {
  it('passes parsed arguments to method', () => {
    const implementation = jest.fn((value: number) => value * 2);

    const wrapped = decorateMethod(
      validateArgs({ schema: z.tuple([z.coerce.number()]) }) as MethodDecorator,
      implementation,
    );

    expect(wrapped('21' as unknown as number)).toBe(42);
    expect(implementation).toHaveBeenCalledWith(21);
  });

  it('throws zod error on invalid args', () => {
    const implementation = jest.fn((value: number) => value * 2);

    const wrapped = decorateMethod(
      validateArgs({ schema: z.tuple([z.number().min(10)]) }) as MethodDecorator,
      implementation,
    );

    expect(() => wrapped(1)).toThrow();
    expect(implementation).not.toHaveBeenCalled();
  });
});
