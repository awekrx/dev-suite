import { createClassDecorator } from '$core/decorators/class';

import { FeatureGateOptions } from './types';

const resolveEnabled = (isEnabled: FeatureGateOptions['isEnabled']) => {
  if (typeof isEnabled === 'function') {
    return isEnabled();
  }

  return isEnabled;
};

export const featureGate = (options: FeatureGateOptions) => {
  const { isEnabled, featureName = 'feature' } = options;

  return createClassDecorator({
    wrap: ({ invoke, args }) => {
      if (!resolveEnabled(isEnabled)) {
        throw new Error(`${featureName} is disabled`);
      }

      return invoke(args);
    },
  });
};

export * from './types';
