import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseFormGroup } from '../../base/base-form-group';
import { IAuthRequest } from '../../models/IAuthRequest.model';
import { AuthService } from '../../services/auth-service';
import { CustomValidators } from '../../validation/custom-validators';
import { Observable, of, Subscription } from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent extends BaseFormGroup
  implements OnInit, OnDestroy {

  private operationCompletedSubscription: Subscription;

  constructor(private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router) {
    super(authService);
    this.setFormGroup();
  }

  public ngOnInit(): void {
    this.subscribe();
  }

  protected setFormGroup(): void {
    super.myFormGroup = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email], [this.emailExistAsyncValidator.bind(this)]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'confirm-password': new FormControl(null,
        [Validators.required, CustomValidators.matchValidator('password')]) //this.matchValidator.bind(this)      
    });
  }

  private subscribe(): void {
    this.operationCompletedSubscription = this.authService.operationCompleted
      .subscribe((hasSucceed: boolean) => {
        if (hasSucceed) {
          this.myFormGroup.reset();
          this.onLogin();
        }
        else {
          super.hideLoader();
        }
      })
  }

  emailExistAsyncValidator(control: FormControl): Observable<boolean> {
    const email = control.value;
    return this.authService.hasEmailExisted(email)
      .pipe(map((response: boolean) => {
        if (response) {
          return { 'emailexists': true };
        }
        return null;
      }),
        catchError((err: any) => {
          console.log(err);
          return err.status === 404 ? of(null) : of({ 'emailexists': true });
        }));
  }

  private onSubmit(): void {
    if (!this.myFormGroup.valid) {
      return;
    }
    super.showLoader();
    const data: IAuthRequest = this.myFormGroup.value;
    this.authService.signUp(data);
  }

  private onLogin() {
    this.router.navigate(['../login'], { relativeTo: this.route });
  }

  public ngOnDestroy(): void {
    this.operationCompletedSubscription.unsubscribe();
  }

}
