import { z } from 'zod';

import { validateSchema } from './index';

describe('validateSchema parameter decorator', () => {
  it('parses valid value and throws on invalid one', () => {
    class Example {
      echo(input: unknown) {
        return input;
      }
    }

    validateSchema({ parse: (value) => z.string().parse(value) })(Example.prototype, 'echo', 0);

    expect(new Example().echo('ok')).toBe('ok');
    expect(() => new Example().echo(10)).toThrow();
  });
});
