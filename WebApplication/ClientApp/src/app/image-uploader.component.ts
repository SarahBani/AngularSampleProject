import { HttpEventType } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseFormComponent } from './base-form.component';
import { ICustomActionResult } from './models/ICustomActionResult.model';

export abstract class ImageUploaderComponent extends BaseFormComponent implements OnInit {

  protected fileToUpload: File = null;
  protected isUploading: boolean = false;
  protected uploadedPercentage: number;
  protected uploadedImageUrl: string;

  public ngOnInit(): void {
  }

  public uploadImage(files: FileList) {
    this.getUploadFile(files.item(0))
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.uploadedPercentage = Math.round(100 * event.loaded / event.total);
        }
        else if (event.type === HttpEventType.Response) {
          let actionResult = <ICustomActionResult>event.body;
          this.uploadedImageUrl = actionResult.content;
        }
      }, error => {
        console.log(error);
      });
  }

  protected abstract getUploadFile(file: File): Observable<any>;

}
