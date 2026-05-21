import { createClassDecorator } from './index';

describe('createClassDecorator', () => {
  it('runs before and after hooks during construction', () => {
    const before = jest.fn();
    const after = jest.fn();

    class Example {
      constructor(public readonly name: string) {}
    }

    const decoratedClass = createClassDecorator({ before, after })(Example);
    const instance = new decoratedClass('john');

    expect(instance).toBeInstanceOf(Example);
    expect(before).toHaveBeenCalledTimes(1);
    expect(after).toHaveBeenCalledTimes(1);
    expect(before.mock.calls[0]?.[0]).toMatchObject({ args: ['john'] });
    expect(after.mock.calls[0]?.[0]).toMatchObject({ response: instance });
  });

  it('allows wrap to control constructor args', () => {
    class Example {
      constructor(public readonly value: number) {}
    }

    const decoratedClass = createClassDecorator({
      wrap: ({ invoke }) => invoke([55]),
    })(Example);

    const instance = new decoratedClass(1);

    expect(instance.value).toBe(55);
  });
});
