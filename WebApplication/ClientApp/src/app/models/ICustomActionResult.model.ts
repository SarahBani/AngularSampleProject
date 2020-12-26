export interface ICustomActionResult {
  isSuccessful: boolean;
  content: object;
  customExceptionMessage: string;
  baseException: object;
}
