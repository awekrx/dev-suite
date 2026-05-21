export type ClassTraceLogger = {
  error: (message: string, context?: Record<string, unknown>) => void;
  info: (message: string, context?: Record<string, unknown>) => void;
};

export type ClassTraceOptions = {
  logger?: ClassTraceLogger;
  shouldIncludeArgs?: boolean;
};
