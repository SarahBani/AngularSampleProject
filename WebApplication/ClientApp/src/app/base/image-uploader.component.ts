import { HttpEventType } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICustomActionResult } from '../models/ICustomActionResult.model';
import { BaseFormComponent } from './base-form.component';

export abstract class ImageUploaderComponent extends BaseFormComponent implements OnInit {

  protected fileToUpload: File = null;
  protected uploadedPercentage: number;
  protected uploadedImageUrl: string;

  public ngOnInit(): void {
  }

  protected uploadImage(files: FileList) {
    if (files.length == 0) {
      return;
    }
    this.getUploadFile(files.item(0))
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
