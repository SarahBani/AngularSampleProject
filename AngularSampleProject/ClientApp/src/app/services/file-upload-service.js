//import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
//import { Injectable } from '@angular/core';
//import { Observable } from 'rxjs';
//import { catchError, map, tap } from 'rxjs/operators';
//declare var jquery: any;
//declare var $: any;
//@Injectable({ providedIn: 'root' })
//export class FileUploadService {
//  constructor(private httpClient: HttpClient,
//    @Inject('BASE_URL') private baseUrl: string) {
//  }
//  private getHeaders(): {
//    headers?: HttpHeaders; responseType: 'json';
//  } {
//    return {
//      headers: new HttpHeaders({
//        'Content-Type': 'application/json; charset=utf-8'
//      }),
//      responseType: 'json'
//    };
//  }
//  postFile(fileToUpload: File, url:string): Observable<boolean> {
//    const endpoint = url;
//    const formData: FormData = new FormData();
//    formData.append('fileKey', fileToUpload, fileToUpload.name);
//     this.httpClient.post(endpoint, formData, this.getHeaders())
//      .pipe(map((response) => {
//        return true;
//      }))
//      .pipe(catchError((error: HttpErrorResponse) => {
//        //this.handleError(e)
//        alert(error);
//      }))
//      .subscribe(result => {
//        if (result.isSuccessful) {
//          this.modalService.showSuccess(successMessage);
//        }
//      }, response => {
//        this.exceptionHandlerService.showModalException(response);
//      });
//  }
//}
//# sourceMappingURL=file-upload-service.js.map