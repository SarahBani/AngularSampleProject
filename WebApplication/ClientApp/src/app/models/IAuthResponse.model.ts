export interface IAuthResponse {
  id: number;
  username: string;
  token: string;
  tokenExpiration: Date;
}
