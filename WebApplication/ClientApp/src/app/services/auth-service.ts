import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { IAuth } from "../models/IAuth.model";
import { BaseRestService } from "./base-rest-service";
import { ExceptionHandlerService } from "./exception-handler-service";
import { ILoaderService } from "./ILoader-service";
import { ModalService } from "./modal-service";
import { map, tap } from 'rxjs/operators';
import * as globals from 'globals';

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseRestService implements ILoaderService {

  protected controllerName: string = 'Auth';
  private tokenName: string = 'auth_token';
  public changeLoaderStatus: Subject<boolean> = new Subject<boolean>();
  public authenticationChanged: Subject<boolean> = new Subject<boolean>();

  constructor(modalService: ModalService,
    exceptionHandlerService: ExceptionHandlerService,
    httpClient: HttpClient,
    @Inject('BASE_URL') baseUrl: string) {
    super(modalService, exceptionHandlerService, httpClient, baseUrl);
  }

  public isAuthenticated() {
    return (localStorage.getItem(this.tokenName) != null);
  }

  public hasEmailExisted(email: string): Observable<boolean> {
    return super.httpGet<boolean>('HasEmailExisted/' + email);
  }

  public signUp(data: IAuth): void {
    super.httpPost('SignUp', data)
      .subscribe(result => {
        this.onSuccess(result);
      }, error => {
        this.onError(error);
      });
  }

  public login(data: IAuth): void {
    super.httpPost('Login', data)
      .pipe(map((response) => {
        if (response.isSuccessful) {
          localStorage.setItem('auth_token', response.content);
          this.authenticationChanged.next(true);
        }
        return response;
      }))
      .subscribe(result => {
        this.onSuccess(result);
      }, error => {
        this.onError(error);
      });
  }

  public logout(): void {
    localStorage.removeItem('auth_token');
    this.authenticationChanged.next(false);
  }

}
