import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ICustomActionResult } from '../models/ICustomActionResult.model';
import { ModalService } from './modal-service';
import { ExceptionHandlerService } from './exception-handler-service';

export abstract class BaseService {

  protected abstract controllerName: string;

  public onUploadFinished = new Subject<string>();

  constructor(private httpClient: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
    private modalService: ModalService = null,
    private exceptionHandlerService: ExceptionHandlerService = null) {
  }

  private getInitialUrl(): string {
    return this.baseUrl + this.controllerName + '/';
  }

  private getHeaders(): {
    headers?: HttpHeaders; responseType: 'json';
  } {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      }),
      responseType: 'json'
    };
  }

  protected httpGetItem<T>(id: number): Observable<T> {
    return this.httpGet('ItemAsync/' + id);
  }

  protected httpGetAll<T>(): Observable<T[]> {
    return this.httpGet<T[]>('ListAsync');
  }

  protected httpGetCount(): Observable<number> {
    return this.httpGet<number>('CountAsync');
  }

  //protected getList<T>(url: string): Observable<T[]> {
  //  return this.httpClient.get<T[]>(this.baseUrl + url, this.getHeaders())
  //    .pipe(map((response: T[]) => {
  //      return response;
  //      //}))
  //      //.pipe(catchError((error: HttpErrorResponse) => {
  //      //  if (error.error instanceof Error) {
  //      //    // A client-side or network error occurred. Handle it accordingly.
  //      //    console.error('An error occurred:', error.error.message);
  //      //  } else {
  //      //    // The backend returned an unsuccessful response code.
  //      //    // The response body may contain clues as to what went wrong,
  //      //    console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
  //      //  }

  //      //  // If you want to return a new response:
  //      //  //return of(new HttpResponse({body: [{name: "Default value..."}]}));

  //      //  // If you want to return the error on the upper level:
  //      //  //return throwError(error);

  //      //  // or just return nothing:
  //      //  return empty;
  //    }));
  //}

  protected httpGet<T>(remainedUrl: string): Observable<T> {
    return this.httpClient.get<T>(this.getInitialUrl() + remainedUrl, this.getHeaders())
      .pipe(map((response) => {
        return response;
        //}))
        //.pipe(catchError((error: HttpErrorResponse) => {
        //  if (error.error instanceof Error) {
        //    // A client-side or network error occurred. Handle it accordingly.
        //    console.error('An error occurred:', error.error.message);
        //  } else {
        //    // The backend returned an unsuccessful response code.
        //    // The response body may contain clues as to what went wrong,
        //    console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
        //  }

        //  // If you want to return a new response:
        //  //return of(new HttpResponse({body: [{name: "Default value..."}]}));

        //  // If you want to return the error on the upper level:
        //  //return throwError(error);

        //  // or just return nothing:
        //  return empty;
      }));
    //this.handleError(e)
  }

  protected httpPost<T>(remainedUrl: string,
    body: T,
    callback: Subject<void> = null,
    successMessage: string = ''): void {
    this.httpClient.post<ICustomActionResult>(
      this.getInitialUrl() + remainedUrl,
      body,
      this.getHeaders())
      //.toPromise()
      //.map(res => res.json().data )
      .pipe(map((response: ICustomActionResult) => {
        return response;
      }))
      .subscribe(result => {
        if (result.isSuccessful) {
          this.modalService.showSuccess(successMessage);
        }
        callback.next();
      }, response => {
        this.exceptionHandlerService.showModalException(response);
      });
  }

  protected httpPut<T>(remainedUrl: string,
    body: T,
    callback: Subject<void> = null,
    //callback: () => void,
    successMessage: string = ''): void {
    this.httpClient.put<ICustomActionResult>(this.getInitialUrl() + remainedUrl,
      body,
      this.getHeaders())
      //.toPromise()
      //.map(res => res.json().data )
      .pipe(map((response: ICustomActionResult) => {
        return response;
      }))
      .subscribe(result => {
        if (result.isSuccessful) {
          this.modalService.showSuccess(successMessage);
        }
        callback.next();
      }, response => {
        this.exceptionHandlerService.showModalException(response);
      });
  }

  protected httpDelete(remainedUrl: string,
    callback: Subject<any> = null,
    successMessage: string = ''): void {
    this.httpClient.delete<ICustomActionResult>(this.getInitialUrl() + remainedUrl,
      this.getHeaders())
      //.toPromise()
      //.map(res => res.json().data )
      .pipe(map((response: ICustomActionResult) => {
        return response;
      }))
      .subscribe(result => {
        if (result.isSuccessful) {
          this.modalService.showSuccess(successMessage);
        }
        callback.next();
      }, response => {
        this.exceptionHandlerService.showModalException(response);
      });
  }

  protected postFile(remainedUrl: string, fileToUpload: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.httpClient.post(this.getInitialUrl() + remainedUrl, formData, {
      reportProgress: true,
      observe: 'events'
    });

    //  .pipe(map((response) => {
    //    return true;
    //  }))
    //  //.pipe(catchError((error) => {
    //  //  //(error: HttpErrorResponse) => {
    //  //  //this.handleError(e)
    //  //  return false;
    //  //}))
    //  .subscribe(result => {
    //  }, response => {
    //      console.log(response);
    //   // this.exceptionHandlerService.showModalException(response);
    //  });
  }

}
