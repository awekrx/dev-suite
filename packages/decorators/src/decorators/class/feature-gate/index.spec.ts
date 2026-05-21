import { featureGate } from './index';

describe('featureGate decorator', () => {
  it('throws when feature is disabled', () => {
    class Example {}

    const Decorated = featureGate({ isEnabled: false, featureName: 'beta' })(Example);

    expect(() => new Decorated()).toThrow('beta is disabled');
  });

  it('constructs class when feature is enabled', () => {
    class Example {}

    const Decorated = featureGate({ isEnabled: true })(Example);

    expect(() => new Decorated()).not.toThrow();
  });
});
