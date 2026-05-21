export type FeatureGateOptions = {
  isEnabled: boolean | (() => boolean);
  featureName?: string;
};
