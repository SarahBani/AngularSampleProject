import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICountry } from '../models/ICountry.model';
import { Observable, Subject } from 'rxjs';
import { ModalService } from './modal-service';
import { ExceptionHandlerService } from './exception-handler-service';
import { ILoaderService } from './ILoader-service';
import { map } from 'rxjs/operators';
import { BaseGraphQLService } from './base-graphql_service';

@Injectable({ providedIn: 'root' })
export class LocationService extends BaseGraphQLService implements ILoaderService {

  public changeLoaderStatus: Subject<boolean> = new Subject<boolean>();

  constructor(http: HttpClient,
    modalService: ModalService,
    exceptionHandlerService: ExceptionHandlerService) {
    super(http, modalService, exceptionHandlerService);
  }

  public getCountryItem(id: number): Observable<ICountry> {
    const query = `?query=
    {
      country {
        id
        name
        flagUrl,
        cities {
          id,
          name
        }
      }
    }`;
    return super.httpGet(query)
      .pipe(map((response) => {
        return response.data.country;
      }));
  }

  public getCountryList(): Observable<ICountry[]> {
    const query = `?query=
    {
      countries {
        id
        name
        flagUrl,
        cities {
          id,
          name
        }
      }
    }`;
    return super.httpGet(query)
      .pipe(map((response) => {
        return response.data.countries;
      }));
  }

  protected onError(error): void {
    super.showError(error);
  }

}
