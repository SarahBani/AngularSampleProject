import { Observable, Subject } from 'rxjs'
import { ModalService } from './modal-service';
import { ExceptionHandlerService } from './exception-handler-service';
import { Apollo, gql } from 'apollo-angular';

export abstract class BaseGraphQLService {

  private const_confirmDelete: string = "Are you sure to delete this item?";
  public onUploadFinished: Subject<string> = new Subject<string>();

  constructor(protected apollo: Apollo,
    protected modalService: ModalService,
    private exceptionHandlerService: ExceptionHandlerService,
    private useCache: boolean = true) {
  }

  //protected httpGetCount(): Observable<number> {
  //  return this.httpGet<number>('CountAsync');
  //}
  //private query: QueryRef<any>;

  protected requestQuery(name: string, query: string, variables = {}): Observable<any> {
    //const client = new ApolloClient({
    //  uri: "http://localhost:4200/graphql" 
    //});
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

  protected confirmDelete(): Observable<boolean> {
    return this.modalService.showConfirm(this.const_confirmDelete);
  }

  protected showError(error): void {
    console.warn('showError');
    console.error(error);
    this.exceptionHandlerService.showModalException(error);
  }

}
