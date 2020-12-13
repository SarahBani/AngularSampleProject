import { Injectable } from '@angular/core';
import { ICountry } from '../models/ICountry.model';
import { Observable } from 'rxjs';
import { ModalService } from './modal-service';
import { ExceptionHandlerService } from './exception-handler-service';
import { map } from 'rxjs/operators';
import { BaseGraphQLService } from './base-graphql_service';
import { Apollo } from 'apollo-angular';

@Injectable({ providedIn: 'root' })
export class LocationService extends BaseGraphQLService {

  constructor(apollo: Apollo,
    modalService: ModalService,
    exceptionHandlerService: ExceptionHandlerService) {
    super(apollo, modalService, exceptionHandlerService);
  }

  public getCountryList(): Observable<ICountry[]> {
    const query = `
      countries {
        id
        name
        flagUrl,
        cities {
          id,
          name
        }
      }`;
    return super.requestQuery('Countries', query)
      .pipe(map((response) => {
        return response?.data?.countries;
      }));
  }

  public getCountryItem(id: number): Observable<ICountry> {
    const query = `
      country(id: $id) {
        id
        name
        flagUrl,
        cities {
          id,
          name
        }
      }`;
    const variables = {
      id: id,
    };
    return super.requestQuery('Country($id: Int!)', query, variables)
      .pipe(map((response) => {
        return response?.data?.country;
      }));
  }

}
