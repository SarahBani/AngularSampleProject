import { Injectable } from '@angular/core';
import { ICountry } from '../models/ICountry.model';
import { Observable, Subject } from 'rxjs';
import { ModalService } from './modal-service';
import { ExceptionHandlerService } from './exception-handler-service';
import { ILoaderService } from './ILoader-service';
import { map } from 'rxjs/operators';
import { BaseGraphQLService } from './base-graphql_service';
import { Apollo } from 'apollo-angular';

@Injectable({ providedIn: 'root' })
export class LocationService extends BaseGraphQLService implements ILoaderService {

  public changeLoaderStatus: Subject<boolean> = new Subject<boolean>();

  constructor(apollo: Apollo,
    modalService: ModalService,
    exceptionHandlerService: ExceptionHandlerService
  ) {
    super(apollo, modalService, exceptionHandlerService);
  }

  public getCountryItem(id: number): Observable<ICountry> {
    const query = `
      country {
        id
        name
        flagUrl,
        cities {
          id,
          name
        }
      }
    `;
    return super.httpPost(query)
      .pipe(map((response) => {
        return response.data.country;
      }));
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
      }
    `;
    return super.httpPost(query)
      .pipe(map((response) => {
        return response.data.countries;
      }));
  }

}
