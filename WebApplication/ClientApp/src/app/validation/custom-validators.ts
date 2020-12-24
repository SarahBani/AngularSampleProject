import { FormControl } from "@angular/forms";

export class CustomValidators {

  constructor() {
  }

  public static matchValidator = (otherControlName: string) => {
    return (control: FormControl) => {
      let otherControl = control.parent?.get(otherControlName) as FormControl;
      if (control.value != otherControl?.value) {
        return ({ 'mismatch': true })
      }
      else {
        return null;
      }
    };
  };

  //public static emailExistAsyncValidator = (authService: AuthService) => {
  //  return (control: FormControl) => {
  //    const email = control.value;
  //    return authService.hasEmailExisted(email)
  //      .subscribe(result => {
  //        if (result) {
  //          return ({ 'emailexists': true })
  //        }
  //        else {
  //          return null;
  //        }
  //      }, error => {
  //        console.error(error);
  //      });
  //  };
  //};

}

//export function gte(val: number): ValidatorFn {
//  return (control: AbstractControl): ValidationErrors | null => {
//    let v: number = +control.value;
//    if (isNaN(v)) {
//      return { 'gte': true, 'requiredValue': val }
//    }
//    if (v <= +val) {
//      return { 'gte': true, 'requiredValue': val }
//    }
//    return null;
//  }
//}

//export const matchValidator = (otherControlName: string) => {
//  return (control: FormControl) => {
//    let otherControl = control.parent?.get(otherControlName) as FormControl;
//    if (control.value != otherControl?.value) {
//      return ({ 'mismatch': true })
//    }
//    else {
//      return null;
//    }
//  };
//};
