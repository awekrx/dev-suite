import { constructMetrics } from './index';

describe('constructMetrics decorator', () => {
  it('reports successful construction', () => {
    const reporter = jest.fn();

    class Example {}

    const Decorated = constructMetrics({ reporter })(Example);

    new Decorated();

    expect(reporter).toHaveBeenCalledWith(
      expect.objectContaining({
        className: 'Example',
        success: true,
      }),
    );
  });

  it('reports construction errors', () => {
    const reporter = jest.fn();

    class Example {
      constructor() {
        throw new Error('boom');
      }
    }

    const Decorated = constructMetrics({ reporter })(Example);

    expect(() => new Decorated()).toThrow('boom');
    expect(reporter).toHaveBeenCalledWith(
      expect.objectContaining({
        className: 'Example',
        success: false,
      }),
    );
  });

  it('does not report when disabled', () => {
    const reporter = jest.fn();

    class Example {}

    const Decorated = constructMetrics({ reporter, enabled: false })(Example);

    expect(new Decorated()).toBeInstanceOf(Example);
    expect(reporter).not.toHaveBeenCalled();
  });
});
