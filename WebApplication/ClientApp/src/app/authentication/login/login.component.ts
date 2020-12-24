import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BaseLoading } from '../../base/base-loading';
import { IAuth } from '../../models/IAuth.model';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseLoading
  implements OnInit, OnDestroy {

  private myFormGroup: FormGroup;
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

  private setFormGroup(): void {
    this.myFormGroup = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required])
    });
  }

  private subscribe(): void {
    this.operationCompletedSubscription = this.authService.operationCompleted
      .subscribe((hasSucceed: boolean) => {
        if (hasSucceed) {
          this.myFormGroup.reset();
          this.router.navigate(['']);
        }
        else {
          super.hideLoader();
        }
      })
  }

  private onSubmit(): void {
    if (!this.myFormGroup.valid) {
      return;
    }
    super.showLoader();
    const data: IAuth = this.myFormGroup.value;
    this.authService.login(data);
  }

  private onSignUp() {
    this.router.navigate(['../sign-up'], { relativeTo: this.route });
  }

  public ngOnDestroy(): void {
    this.operationCompletedSubscription.unsubscribe();
  }

}
