import { BaseLoading } from './base-loading';
import { ILoaderService } from '../services/ILoader-service';
import { FormGroup } from '@angular/forms';

export abstract class BaseFormGroup extends BaseLoading {

  protected myFormGroup: FormGroup;

  constructor(loaderService: ILoaderService = null) {
    super(loaderService);
    this.setFormGroup();
  }

  protected abstract setFormGroup(): void

  //protected passwordsMatchValidator(control: FormControl): { [s: string]: boolean } {
  //  if (control.value != this.myFormGroup?.get('password').value) {
  //    return ({ 'mismatch': true })
  //  }
  //  else {
  //    return null;
  //  }
  //}

}
