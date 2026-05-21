import { Enabled } from '$core/types/debug-fn-enabled';

export type ConstructMetricsReport = {
  className: string;
  durationMs: number;
  success: boolean;
  error?: unknown;
};

export type ConstructMetricsOptions = {
  enabled?: Enabled;
  reporter?: (report: ConstructMetricsReport) => void;
};
