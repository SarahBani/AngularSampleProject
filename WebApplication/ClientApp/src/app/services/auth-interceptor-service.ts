import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { exhaustMap, take } from "rxjs/operators";
import { AuthService } from "./auth-service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.userChanged.pipe(
      take(1),
      exhaustMap(user => {
        if (!user) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          //params: new HttpParams().set('auth', user.token),
          //headers: req.headers.set("Content-Type", "application/json; charset=utf-8")
          setHeaders: {
            "Content-Type": "application/json; charset=utf-8",
            'Authorization': `Bearer ${user.token}`
          }
        });
        return next.handle(modifiedReq);
      })
    );
  }

}
