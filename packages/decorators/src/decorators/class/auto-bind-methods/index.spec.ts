import { autoBindMethods } from './index';

describe('autoBindMethods decorator', () => {
  it('binds prototype methods to instance', () => {
    class Example {
      value = 7;

      getValue() {
        return this.value;
      }
    }

    const Decorated = autoBindMethods()(Example);
    const instance = new Decorated();

    const detached = instance.getValue;

    expect(detached()).toBe(7);
  });

  it('respects excluded methods', () => {
    class Example {
      value = 7;

      getValue() {
        return this.value;
      }
    }

    const Decorated = autoBindMethods({ exclude: ['getValue'] })(Example);
    const instance = new Decorated();

    const detached = instance.getValue;

    expect(() => detached()).toThrow();
  });
});
