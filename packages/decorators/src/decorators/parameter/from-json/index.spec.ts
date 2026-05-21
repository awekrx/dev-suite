import { fromJson } from './index';

describe('fromJson parameter decorator', () => {
  it('parses json string', () => {
    class Example {
      getName(input: { name: string }) {
        return input.name;
      }
    }

    fromJson()(Example.prototype, 'getName', 0);

    expect(new Example().getName('{"name":"john"}' as unknown as { name: string })).toBe('john');
  });
});
