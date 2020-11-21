import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs'
import { ModalService } from './modal-service';
import { ExceptionHandlerService } from './exception-handler-service';

export abstract class BaseGraphQLService {

  private const_confirmDelete: string = "Are you sure to delete this item?";
  public onUploadFinished: Subject<string> = new Subject<string>();

  constructor(private httpClient: HttpClient,
    protected modalService: ModalService,
    private exceptionHandlerService: ExceptionHandlerService) {
  }

  //private getInitialUrl(): string {
  //  return this.baseUrl + this.controllerName + '/';
  //}

  //private getHeaders(): {
  //  headers?: HttpHeaders; responseType: 'json';
  //} {
  //  return {
  //    headers: new HttpHeaders({
  //      'Content-Type': 'application/json; charset=utf-8'
  //    }),
  //    responseType: 'json'
  //  };
  //}

  //protected httpGetCount(): Observable<number> {
  //  return this.httpGet<number>('CountAsync');
  //}

  protected httpGet(query: string): Observable<{ data, extensions }> {
    return this.httpClient.get<{ data, extensions }>(`graphql/query=${query}`);
  }

  //protected httpPost<T>(remainedUrl: string, body: T): Observable<ICustomActionResult> {
  //  return this.httpClient.post<ICustomActionResult>(
  //    this.getInitialUrl() + remainedUrl,
  //    body,
  //    this.getHeaders())
  //    .pipe(map((response: ICustomActionResult) => {
  //      return response;
  //    }));
  //}

  //protected httpPut<T>(remainedUrl: string, body: T): Observable<ICustomActionResult> {
  //  return this.httpClient.put<ICustomActionResult>(this.getInitialUrl() + remainedUrl,
  //    body,
  //    this.getHeaders())
  //    //.toPromise()
  //    //.map(res => res.json().data )
  //    .pipe(map((response: ICustomActionResult) => {
  //      return response;
  //    }));
  //}

  //protected httpDelete(remainedUrl: string): Observable<ICustomActionResult> {
  //  return this.httpClient.delete<ICustomActionResult>(this.getInitialUrl() + remainedUrl,
  //    this.getHeaders())
  //    .pipe(map((response: ICustomActionResult) => {
  //      return response;
  //    }));
  //}

  protected confirmDelete(): Observable<boolean> {
    return this.modalService.showConfirm(this.const_confirmDelete);
  }

  protected showError(error): void {
    console.warn('showError');
    console.error(error);
    this.exceptionHandlerService.showModalException(error);
  }

}
