import { defaultParam } from './index';

describe('defaultParam parameter decorator', () => {
  it('applies fallback for undefined values', () => {
    class Example {
      greet(name: string) {
        return `hi ${name}`;
      }
    }

    defaultParam('guest')(Example.prototype, 'greet', 0);

    expect(new Example().greet(undefined as unknown as string)).toBe('hi guest');
  });
});
