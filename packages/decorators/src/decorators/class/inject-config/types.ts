export type InjectConfigOptions<ConfigShape extends Record<string, unknown>> = {
  config: ConfigShape;
  propertyKey?: PropertyKey;
};
