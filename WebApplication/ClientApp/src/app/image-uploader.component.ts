import { HttpEventType } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICustomActionResult } from './models/ICustomActionResult.model';

export abstract class ImageUploaderComponent implements OnInit {

  public fileToUpload: File = null;
  public isUploading: boolean = false;
  public uploadedPercentage: number;
  public uploadedImageUrl: string;

  constructor() { }

  ngOnInit(): void {
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
