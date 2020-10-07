export interface ICustomActionResult {
  isSuccessful: boolean;
  content: string;
  customExceptionMessage: string;
  baseException: object;
}
