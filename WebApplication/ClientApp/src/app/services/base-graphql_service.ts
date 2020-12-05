import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs'
import { ModalService } from './modal-service';
import { ExceptionHandlerService } from './exception-handler-service';
import { Apollo, QueryRef, gql } from 'apollo-angular';
import graphql from 'graphql-tag'
//import gql from 'graphql-tag';

//import { Apollo, gql } from 'apollo-angular';
//import { ApolloClient,InMemoryCache } from '@apollo/client';
//import { HttpLink } from 'apollo-angular-link-http';
//import { gql } from 'graphql-tag';

export abstract class BaseGraphQLService {

  private const_confirmDelete: string = "Are you sure to delete this item?";
  public onUploadFinished: Subject<string> = new Subject<string>();

  constructor(private apollo: Apollo,
    private httpClient: HttpClient,
    protected modalService: ModalService,
    private exceptionHandlerService: ExceptionHandlerService
   //, private httpLink: HttpLink
  ) {

    //this.apollo.create({
    // // link: this.httpLink.create({ uri: 'https://localhost:4200/graphql' }),
    //  cache: new InMemoryCache()
    //})
  }

  //private getInitialUrl(): string {
  //  return this.baseUrl + this.controllerName + '/';
  //}

  private getHeaders(): {
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

  //protected httpGetCount(): Observable<number> {
  //  return this.httpGet<number>('CountAsync');
  //}
  private query: QueryRef<any>;
  
  protected httpPost(query: string): Observable<any> {

    //const client = new ApolloClient({
    //  uri: "http://localhost:4200/graphql" 
    //});
    return this.apollo.query({
      query: gql`query GraphQLRequest 
      { ${query} }`
    });

    //this.apollo.watchQuery({
    //  query: gql`
    //      {
    //        hotels {
    //            id
    //            name
    //          }
    //      }
    //    `,
    //  })
    //  .valueChanges.subscribe((result: any) => {
    //    console.log( result?.data?.rates);
    //    console.log(  result.loading);
    //    console.log(  result.error);
    //  });


    //this.query = this.apollo.watchQuery({      
    //  query: My_QUERY,
    //  variables: {}
    //});
    
    //this.apollo.watchQuery({
    //  query: gql`query GraphQLRequest { ${query} }`
    //});
    //return this.apollo.query({
    //  query: gql`query GraphQLRequest { ${query} }`
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
