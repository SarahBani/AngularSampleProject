import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs'
import { ModalService } from './modal-service';
import { ExceptionHandlerService } from './exception-handler-service';
//import { Apollo } from 'apollo-angular';
import gql from "graphql-tag";

export abstract class BaseGraphQLService {

  private const_confirmDelete: string = "Are you sure to delete this item?";
  public onUploadFinished: Subject<string> = new Subject<string>();

  constructor(//private apollo: Apollo,
    private httpClient: HttpClient,
    protected modalService: ModalService,
    private exceptionHandlerService: ExceptionHandlerService) {
  }

  //private getInitialUrl(): string {
  //  return this.baseUrl + this.controllerName + '/';
  //}

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

  //protected httpGetCount(): Observable<number> {
  //  return this.httpGet<number>('CountAsync');
  //}

  //protected httpGet(query: string): Observable<{ data, extensions }> {
  //  return this.httpClient.get<{ data, extensions }>(`graphql/query=QueryContent ${query}`);
  //}

  protected httpPost(query: string): Observable<any> {
    console.log(gql`query QueryContent { ${query} }`);
    return this.httpClient.post('graphql', `query QueryContent { ${query} }`, this.getHeaders());
    //this.apollo.watchQuery({
    //  query: gql`query QueryContent { ${query} }`
    //});
    //return this.apollo.query({
    //  query: gql`query QueryContent { ${query} }`
    //});
  }

  protected confirmDelete(): Observable<boolean> {
    return this.modalService.showConfirm(this.const_confirmDelete);
  }

  protected showError(error): void {
    console.warn('showError');
    console.error(error);
    this.exceptionHandlerService.showModalException(error);
  }

}
