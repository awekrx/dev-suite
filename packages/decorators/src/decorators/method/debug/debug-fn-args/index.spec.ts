import { debugFnArgs } from './index';

describe('debugFnArgs decorator', () => {
  it('logs method arguments in before hook', () => {
    const spy = jest.spyOn(console, 'debug').mockImplementation(() => undefined);

    class Example {
      run(input: string) {
        return input;
      }
    }

    const descriptor = Object.getOwnPropertyDescriptor(Example.prototype, 'run') as TypedPropertyDescriptor<
      (input: string) => string
    >;

    (debugFnArgs({ shouldHideDebugPrefix: true, shouldHideTime: true }) as MethodDecorator)(
      Example.prototype,
      'run',
      descriptor,
    );
    Object.defineProperty(Example.prototype, 'run', descriptor);

    expect(new Example().run('x')).toBe('x');
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('called with args'), ['x']);
    spy.mockRestore();
  });
});
