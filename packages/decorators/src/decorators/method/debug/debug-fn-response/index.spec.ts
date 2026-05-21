import { debugFnResponse } from './index';

describe('debugFnResponse decorator', () => {
  it('logs method response in after hook', () => {
    const spy = jest.spyOn(console, 'debug').mockImplementation(() => undefined);

    class Example {
      run() {
        return 'ok';
      }
    }

    const descriptor = Object.getOwnPropertyDescriptor(Example.prototype, 'run') as TypedPropertyDescriptor<
      () => string
    >;

    (debugFnResponse({ shouldHideDebugPrefix: true, shouldHideTime: true }) as MethodDecorator)(
      Example.prototype,
      'run',
      descriptor,
    );
    Object.defineProperty(Example.prototype, 'run', descriptor);

    expect(new Example().run()).toBe('ok');
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('returned'), 'ok');
    spy.mockRestore();
  });
});
