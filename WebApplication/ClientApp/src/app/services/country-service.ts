import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICountry } from '../models/ICountry.model';
import { Observable, Subject } from 'rxjs';
import { BaseService } from './base-service';
import { ModalService } from './modal-service';
import { ExceptionHandlerService } from './exception-handler-service';
import { ILoaderService } from './ILoader-service';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CountryService extends BaseService implements ILoaderService {

  protected controllerName: string = 'Country';
  public changeLoaderStatus: Subject<boolean> = new Subject<boolean>();

  constructor(http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    modalService: ModalService,
    exceptionHandlerService: ExceptionHandlerService) {
    super(http, baseUrl, modalService, exceptionHandlerService);
  }

  public getItem(id: number): Observable<ICountry> {
    return super.httpGetItem<ICountry>(id);
  }

  public getList(): Observable<ICountry[]> {
    const query = `?query=
    {
      countries {
        id
        name
      }
    }`;
    return this.httpClient.get<{ data, extensions }>(`graphql/query=${query}`)
      .pipe(map((response) => {
        console.log(response);

        return response.data.countries;
      }));
  }

  protected onSuccess(result): void {
  }

  protected onError(error): void {
    super.showError(error);
  }

}
