import { Observable, Subject } from 'rxjs'
import { ModalService } from './modal-service';
import { ExceptionHandlerService } from './exception-handler-service';
import { Apollo, gql } from 'apollo-angular';
import { BaseService } from './base-service';

export abstract class BaseGraphQLService extends BaseService {

  constructor(protected apollo: Apollo,
    modalService: ModalService,
    exceptionHandlerService: ExceptionHandlerService,
    private useCache: boolean = true) {
    super(modalService, exceptionHandlerService);
  }

  //protected httpGetCount(): Observable<number> {
  //  return this.httpGet<number>('CountAsync');
  //}
  //private query: QueryRef<any>;

  protected requestQuery(name: string, query: string, variables = {}): Observable<any> {
    return this.apollo.query({
      query: gql`query ${name} { ${query} }`,
      fetchPolicy: (this.useCache ? "network-only" : "no-cache"),
      variables: variables
    })
  }

  protected requestMutation(name: string, mutation: string): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`mutation ${name} { ${mutation} }`
    });
  }

}
