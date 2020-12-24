import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth-service";

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService,
    private router: Router) { }

  //canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean
  //    | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
  //    throw new Error("Method not implemented.");
  //}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : boolean | Observable<boolean> | Promise<boolean> {
    //return this.authService.isAuthenticated()
    //    .then((authenticated: boolean) => {
    //        if (authenticated) {
    //            return true;
    //        }
    //        else {
    //            this.router.navigate(['/access-denied']);
    //        }
    //    });
    if (this.authService.isAuthenticated()) {
      return true;
    }
    else {
      this.router.navigate(['/access-denied']);
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.canActivate(childRoute, state);
  }

}
