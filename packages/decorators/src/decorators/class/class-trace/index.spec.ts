import { classTrace } from './index';

describe('classTrace decorator', () => {
  it('logs start and success for valid construction', () => {
    const logger = {
      info: jest.fn(),
      error: jest.fn(),
    };

    class Example {}

    const Decorated = classTrace({ logger })(Example);

    new Decorated();

    expect(logger.info).toHaveBeenCalledWith('class.construct.start', { className: 'Example' });
    expect(logger.info).toHaveBeenCalledWith('class.construct.success', expect.any(Object));
    expect(logger.error).not.toHaveBeenCalled();
  });

  it('logs construction errors', () => {
    const logger = {
      info: jest.fn(),
      error: jest.fn(),
    };

    class Example {
      constructor() {
        throw new Error('boom');
      }
    }

    const Decorated = classTrace({ logger })(Example);

    expect(() => new Decorated()).toThrow('boom');
    expect(logger.error).toHaveBeenCalledWith('class.construct.error', expect.any(Object));
  });

  it('includes args only when includeArgs is true', () => {
    const logger = {
      info: jest.fn(),
      error: jest.fn(),
    };

    class Example {
      private readonly secret: string;

      constructor(secret: string) {
        this.secret = secret;
      }
    }

    const Decorated = classTrace({ logger, shouldIncludeArgs: true })(Example);

    new Decorated('token');

    expect(logger.info).toHaveBeenCalledWith('class.construct.start', { className: 'Example', args: ['token'] });
  });
});
