export type ViolationSeverity = 'error' | 'warning' | 'info';

export type CustomViolation = {
  id?: string;
  message: string;
  explanation?: string;
  suggestion?: string;
  helpUrl?: string;
  severity?: ViolationSeverity
  valid: boolean;
  nodes?: {
    html: string,
    line: number | null,
    column: number | null
  }[];
}