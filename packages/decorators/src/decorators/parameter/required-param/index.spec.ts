import { requiredParam } from './index';

describe('requiredParam parameter decorator', () => {
  it('throws when parameter is missing', () => {
    class Example {
      run(input: string) {
        return input;
      }
    }

    requiredParam()(Example.prototype, 'run', 0);

    expect(() => new Example().run(undefined as unknown as string)).toThrow('Required parameter');
  });
});
