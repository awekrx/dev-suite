import { emailParam } from './index';

describe('emailParam parameter decorator', () => {
  it('validates and normalizes email', () => {
    class Example {
      echo(input: string) {
        return input;
      }
    }

    emailParam()(Example.prototype, 'echo', 0);

    expect(new Example().echo(' User@Mail.com ')).toBe('user@mail.com');
  });
});
