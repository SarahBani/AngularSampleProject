import { Observable, Subject, Subscription } from 'rxjs';
import { ModalService } from './modal-service';
import { ExceptionHandlerService } from './exception-handler-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject } from '@angular/core';
import { ICustomActionResult } from '../models/ICustomActionResult.model';
import { map, tap } from 'rxjs/operators';

export abstract class BaseService {

  private const_confirmDelete: string = "Are you sure to delete this item?";
  public onUploadFinished: Subject<string> = new Subject<string>();
  public operationCompleted: Subject<boolean> = new Subject<boolean>();
  protected confirmDeleteSubscription: Subscription;

  protected abstract controllerName: string;

  constructor(protected modalService: ModalService,
    private exceptionHandlerService: ExceptionHandlerService,
    protected httpClient: HttpClient = null,
    @Inject('BASE_URL') protected baseUrl: string = null) {
  }

  protected getInitialUrl(): string {
    return this.baseUrl + this.controllerName + '/';
  }

  protected getHeaders(): {
    headers?: HttpHeaders;
    responseType: 'json';
  } {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      }),
      responseType: 'json'
    };
  }

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

  protected httpPost<T>(remainedUrl: string, body: T): Observable<ICustomActionResult> {
    return this.httpClient.post<ICustomActionResult>(
      this.getInitialUrl() + remainedUrl,
      body,
      this.getHeaders())
      .pipe(map((response: ICustomActionResult) => {
        return response;
      }));
  }

  //protected httpPut<T>(remainedUrl: string,
  //  body: T,
  //  callback: Subject<void> = null,
  //  //callback: () => void,
  //  successMessage: string = '')
  protected httpPut<T>(remainedUrl: string, body: T): Observable<ICustomActionResult> {
    return this.httpClient.put<ICustomActionResult>(this.getInitialUrl() + remainedUrl,
      body,
      this.getHeaders())
      //.toPromise()
      //.map(res => res.json().data )
      .pipe(map((response: ICustomActionResult) => {
        return response;
      }));
  }

  protected httpDelete(remainedUrl: string): Observable<ICustomActionResult> {
    return this.httpClient.delete<ICustomActionResult>(this.getInitialUrl() + remainedUrl,
      this.getHeaders())
      .pipe(map((response: ICustomActionResult) => {
        return response;
      }));
  }

  protected confirmDelete(): Observable<boolean> {
    return this.modalService.showConfirm(this.const_confirmDelete);
  }

  protected onSuccess(result): void {
    if (result.isSuccessful) {
      this.operationCompleted.next(true);
    }
    else {
      this.operationCompleted.next(false);
      this.modalService.showError(result.customExceptionMessage);
    }
  }

  protected onError(error): void {
    this.showError(error);
    this.operationCompleted.next(false);
  }

  protected showError(error): void {
    console.warn('showError');
    console.error(error);
    this.exceptionHandlerService.showModalException(error);
  }

  protected postFile(remainedUrl: string, fileToUpload: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.httpClient.post(this.getInitialUrl() + remainedUrl, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

}
