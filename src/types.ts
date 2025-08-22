
export type CustomViolation = {
  id?: string;
  message: string;
  explanation?: string;
  suggestion?: string;
  helpUrl?: string;
  nodes?: string[];
  valid: boolean;
}