import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { IAuthRequest } from "../models/IAuthRequest.model";
import { IAuthResponse } from "../models/IAuthResponse.model";
import { BaseRestService } from "./base-rest-service";
import { ExceptionHandlerService } from "./exception-handler-service";
import { ILoaderService } from "./ILoader-service";
import { ModalService } from "./modal-service";
import { map, tap } from 'rxjs/operators';
import * as globals from 'globals';
import { User } from "../models/User.model";

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseRestService implements ILoaderService {

  protected controllerName: string = 'Auth';
  public changeLoaderStatus: Subject<boolean> = new Subject<boolean>();
  //public authenticationChanged: Subject<boolean> = new Subject<boolean>();
  public userChanged: Subject<User> = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;
  private authStorageKeyName: string = 'auth_user';

  constructor(modalService: ModalService,
    exceptionHandlerService: ExceptionHandlerService,
    httpClient: HttpClient,
    @Inject('BASE_URL') baseUrl: string) {
    super(modalService, exceptionHandlerService, httpClient, baseUrl);
  }

  public hasEmailExisted(email: string): Observable<boolean> {
    return super.httpGet<boolean>('HasEmailExisted/' + email);
  }

  public signUp(data: IAuthRequest): void {
    super.httpPost('SignUp', data)
      .subscribe(result => {
        this.onSuccess(result);
      }, error => {
        this.onError(error);
      });
  }

  public login(data: IAuthRequest): void {
    super.httpPost('Login', data)
      .pipe(map((response) => {
        if (response.isSuccessful) {
          const content: IAuthResponse = <IAuthResponse>response.content;
          //localStorage.setItem('auth_token', content.token);
          //this.authenticationChanged.next(true);
          var user = new User(content.id,
            content.username,
            data.email,
            content.token,
            content.tokenExpiration);
          this.userChanged.next(user);
          localStorage.setItem(this.authStorageKeyName, JSON.stringify(user));
          this.autoLogout(user.expirationDuration);
        }
        return response;
      }))
      .subscribe(result => {
        this.onSuccess(result);
      }, error => {
        this.onError(error);
      });
  }

  public autoLogin() {
    let data: {
      id: number;
      username: string;
      email: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem(this.authStorageKeyName));
    if (!data) {
      return;
    }
    const user = new User(
      data.id,
      data.username,
      data.email,
      data._token,
      new Date(data._tokenExpirationDate)
    );
    if (user.token) {
      this.userChanged.next(user);
      this.autoLogout(user.expirationDuration);
    }
    else {
      localStorage.removeItem(this.authStorageKeyName);
    }
  }

  public autoLogout(tokenExpirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, tokenExpirationDuration);
  }

  public logout(): void {
    //localStorage.removeItem('auth_token');
    //this.authenticationChanged.next(false);    
    localStorage.removeItem(this.authStorageKeyName);
    this.userChanged.next(null);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

}
