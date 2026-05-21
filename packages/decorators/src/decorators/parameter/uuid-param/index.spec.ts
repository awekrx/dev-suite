import { uuidParam } from './index';

describe('uuidParam parameter decorator', () => {
  it('validates uuid format', () => {
    class Example {
      echo(input: string) {
        return input;
      }
    }

    uuidParam()(Example.prototype, 'echo', 0);

    expect(new Example().echo('550e8400-e29b-41d4-a716-446655440000')).toBe('550e8400-e29b-41d4-a716-446655440000');
    expect(() => new Example().echo('bad-uuid')).toThrow('Invalid UUID');
  });
});
