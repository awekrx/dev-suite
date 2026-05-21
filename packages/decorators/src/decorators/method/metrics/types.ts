import { Enabled } from '$core/types/debug-fn-enabled';

export type MetricsReport = {
  durationMs: number;
  name: PropertyKey;
  success: boolean;
  error?: unknown;
};

export type MetricsOptions = {
  enabled?: Enabled;
  reporter?: (report: MetricsReport) => void;
};
