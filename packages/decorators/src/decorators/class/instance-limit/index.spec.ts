import { instanceLimit } from './index';

describe('instanceLimit decorator', () => {
  type Destroyable = {
    destroy: () => void;
  };

  it('prevents creating more than max instances', () => {
    class Example {}

    const Decorated = instanceLimit({ maxInstances: 1 })(Example);

    new Decorated();

    expect(() => new Decorated()).toThrow('Instance limit reached for Example');
  });

  it('frees slot when destroy is called', () => {
    class Example {}

    const Decorated = instanceLimit({ maxInstances: 1 })(Example);

    const first = new Decorated() as unknown as Destroyable;

    first.destroy();

    expect(() => new Decorated()).not.toThrow();
  });

  it('does not free more than one slot on repeated destroy', () => {
    class Example {}

    const Decorated = instanceLimit({ maxInstances: 1 })(Example);
    const first = new Decorated() as unknown as Destroyable;

    first.destroy();
    first.destroy();

    const second = new Decorated() as unknown as Destroyable;

    expect(() => new Decorated()).toThrow('Instance limit reached for Example');
    second.destroy();
  });
});
