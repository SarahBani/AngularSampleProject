import { AfterViewInit, Component, OnInit } from '@angular/core';
import {  FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-validation-errors',
  templateUrl: './validation-errors.component.html',
  styleUrls: ['./validation-errors.component.css'],
})
export class ValidationErrorsComponent implements OnInit, AfterViewInit {

  private controls = [];

  // Let Angular inject the control container
  constructor(private controlContainer: FormGroupDirective) {
  }

  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    this.setErrors();
  }

  private setErrors() {
    const formGroup = (<FormGroup>this.controlContainer.form);
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.controls[key];
      //const control = <FormControl>formGroup.get(key);
      if (control.errors != null) {
        let name = '';
        const nameParts = key.split('-');
        nameParts.forEach(part => {
          if (name != '') {
            name += ' ';
          }
          name += part[0].toUpperCase() + part.substr(1);
        });
        control['name'] = name;
        this.controls.push(control);
      }
    });
  }

  private isFormInvalid(): boolean {
    return this.controls.length > 0 && this.controls.some(q => !q.valid && q.touched);
  }

}
