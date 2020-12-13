import { Injectable } from '@angular/core';
import { IHotel } from '../models/Ihotel.model';
import { Observable, Subject } from 'rxjs';
import { ModalService } from './modal-service';
import { ExceptionHandlerService } from './exception-handler-service';
import { ILoaderService } from './ILoader-service';
import { map } from 'rxjs/operators';
import { BaseGraphQLService } from './base-graphql_service';
import { Apollo } from 'apollo-angular';

@Injectable({ providedIn: 'root' })
export class HotelService extends BaseGraphQLService implements ILoaderService {

  public changeLoaderStatus: Subject<boolean> = new Subject<boolean>();

  constructor(apollo: Apollo,
    modalService: ModalService,
    exceptionHandlerService: ExceptionHandlerService) {
    super(apollo, modalService, exceptionHandlerService, false);
  }

  public getList(): Observable<IHotel[]> {
    const query = `
      hotels {
        id
        name
        stars
        city {
          name
          country
          {
            name
          }
        }
      }`;
    return super.requestQuery('Hotels', query)
      .pipe(map(({ data }) => {
        return data?.hotels;
      }));
  }

  public getCount(): Observable<number> {
    const query = 'hotelsCount';
    return super.requestQuery('HotelsCount', query)
      .pipe(map(({ data }) => {
        return data?.hotelsCount;
      }));
  }

  public getItem(id: number): Observable<IHotel> {
    const query = `
      hotel(id: ${id}) {
        id
        name
        stars
        address
        city
        {
          id
          name
          country
          {
            id
            name
          }
        }
      }`;
    return super.requestQuery('Hotel', query)
      .pipe(map(({ data }) => {
        return data?.hotel;
      }));
  }

  //public getCount(): Observable<number> {
  //  return super.httpGetCount();
  //}

  public save(id: number,
    name: string,
    cityId: number,
    stars: number,
    address: string): void {
    if (id > 0) {
      this.update(id, name, cityId, stars, address);
    }
    else {
      this.insert(name, cityId, stars, address);
    }
  }

  private insert(
    name: string,
    cityId: number,
    stars: number,
    address: string): void {
    const mutation = `
      createHotel(hotel: { name: "${name}", cityId: ${cityId}, stars: ${stars}, address: "${address}"})
      {
        isSuccessful
        customExceptionMessage
      }`;

    super.requestMutation('CreateHotel', mutation)
      .pipe(map(({ data }) => {
        return data?.createHotel;
      }))
      .subscribe(result => {
        this.onSuccess(result);
      }, error => {
        this.onError(error);
      });
  }

  private update(id: number,
    name: string,
    cityId: number,
    stars: number,
    address: string): void {
    const mutation = `
        editHotel(hotel : { id: ${id}, name: "${name}", cityId: ${cityId}, stars: ${stars}, address: "${address}"})
        {
          isSuccessful
          customExceptionMessage
        }`;
    super.requestMutation('EditHotel', mutation)
      .pipe(map(({ data }) => {
        return data?.editHotel;
      }))
      .subscribe(result => {
        this.onSuccess(result);
      }, error => {
        this.onError(error);
      });
  }

  public delete(id: number): void {
    if (id != null) {
      this.confirmDeleteSubscription = super.confirmDelete().subscribe((result: boolean) => {
        if (result) {
          this.changeLoaderStatus.next(true);
          this.doDelete(id);
        }
        else {
          this.operationCompleted.next(false);
        }
        this.confirmDeleteSubscription.unsubscribe();
      });
    }
  }

  private doDelete(id: number): void {
    const mutation = `
      removeHotel(id : ${id}) {
          isSuccessful
          customExceptionMessage
      }`;
    super.requestMutation('RemoveHotel', mutation)
      .pipe(map(({ data }) => {
        return data?.removeHotel;
      }))
      .subscribe(result => {
        this.onSuccess(result);
      }, error => {
        this.onError(error);
      });
  }

}
