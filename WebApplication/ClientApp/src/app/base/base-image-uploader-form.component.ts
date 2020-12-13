import { HttpEventType } from '@angular/common/http';
import { OnInit, Directive } from '@angular/core';
import { Observable } from 'rxjs';
import { ICustomActionResult } from '../models/ICustomActionResult.model';
import { BaseFormComponent } from './base-form.component';

@Directive()
export abstract class BaseImageUploaderFormComponent extends BaseFormComponent implements OnInit {

  protected fileToUpload: File = null;
  protected uploadedPercentage: number;
  protected uploadedImageUrl: string;

  public ngOnInit(): void {
  }

  protected uploadImage(file: File) {
    this.getUploadFile(file)
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.uploadedPercentage = Math.round(100 * event.loaded / event.total);
          console.log(this.uploadedPercentage);
        }
        else if (event.type === HttpEventType.Response) {
          let actionResult = <ICustomActionResult>event.body;
          this.uploadedImageUrl = actionResult.content;
        }
      }, error => super.showError(error));
  }

  protected abstract getUploadFile(file: File): Observable<any>;

  protected onDeleteImage(): void {
    this.uploadedImageUrl = null;
    this.uploadedPercentage = null;
  }

}
