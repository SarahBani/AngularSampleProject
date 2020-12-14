import { Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ModalService } from './modal-service';
import { ExceptionHandlerService } from './exception-handler-service';
import { BaseService } from './base-service';

export abstract class BaseRestService extends BaseService {

  constructor(modalService: ModalService,
    exceptionHandlerService: ExceptionHandlerService,
    httpClient: HttpClient,
    @Inject('BASE_URL') baseUrl: string) {
    super(modalService, exceptionHandlerService, httpClient, baseUrl);
  }

  protected httpGetItem<T>(id: any): Observable<T> {
    return super.httpGet('ItemAsync/' + id);
  }

  protected httpGetAll<T>(): Observable<T[]> {
    return super.httpGet<T[]>('ListAsync');
  }

  protected httpGetCount(): Observable<number> {
    return super.httpGet<number>('CountAsync');
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

}
