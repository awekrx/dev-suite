export type SanitizeOptions = {
  replacement?: string;
  rule?: RegExp | ((value: string) => string);
};
