import { injectConfig } from './index';

describe('injectConfig decorator', () => {
  it('injects config object into instance', () => {
    class Example {}

    const Decorated = injectConfig({ config: { env: 'test' } })(Example);
    const instance = new Decorated() as Record<string, unknown>;

    expect(instance['config']).toMatchObject({ env: 'test' });
  });

  it('supports custom property key', () => {
    class Example {}

    const Decorated = injectConfig({ config: { env: 'test' }, propertyKey: 'settings' })(Example);
    const instance = new Decorated() as Record<string, unknown>;

    expect(instance['settings']).toMatchObject({ env: 'test' });
  });
});
