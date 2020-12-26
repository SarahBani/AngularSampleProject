export class User {

  constructor(public id: number,
    public username: string,
    public email: string,
    private _token: string,
    private _tokenExpirationDate: Date) {
  }

  public get token(): string {
    if (this.isExpired()) {
      return null;
    }
    return this._token;
  }

  private isExpired(): boolean {
    return (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate);
  }

  public get expirationDuration(): number {
    if (this.isExpired()) {
      return 0
    }
    return new Date(this._tokenExpirationDate).getTime() - new Date().getTime();
  }

}
