import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IHotel } from '../models/Ihotel.model';
import { Observable, Subject, Subscription } from 'rxjs';
import { BaseService } from './base-service';
import { ModalService } from './modal-service';
import { ExceptionHandlerService } from './exception-handler-service';
import { ILoaderService } from './ILoader-service';
import { map } from 'rxjs/operators';
import { BaseGraphQLService } from './base-graphql_service';
import { Apollo } from 'apollo-angular';

@Injectable({ providedIn: 'root' })
export class HotelService extends BaseGraphQLService implements ILoaderService {

  public operationCompleted: Subject<boolean> = new Subject<boolean>();
  private confirmDeleteSubscription: Subscription;
  public changeLoaderStatus: Subject<boolean> = new Subject<boolean>();

  constructor(apollo: Apollo,
    http: HttpClient,
    modalService: ModalService,
    exceptionHandlerService: ExceptionHandlerService) {
    super(apollo, http, modalService, exceptionHandlerService);
  }

  public getItem(id: number): Observable<IHotel> {
    const query = `
      hotel {
        id
        name
      }
    `;
    return super.httpPost(query)
      .pipe(map((response) => {
        return response.data.hotel;
      }));
  }

  public getList(): Observable<IHotel[]> {
    const query = `
      hotels {
        id
        name,
        stars,
        address
      }
    `;
    return super.httpPost(query)
      .pipe(map((response) => {
        return response.data.countries;
      }));
  }

  //public getCount(): Observable<number> {
  //  return super.httpGetCount();
  //}

  public save(hotel: IHotel): void {
    if (hotel.id > 0) {
      this.update(hotel.id, hotel);
    }
    else {
      this.insert(hotel);
    }
  }

  private insert(hotel: IHotel): void {
    //const mutation = `createHotel ($hotel : hotel!){  
    //  createHotel(hotel : $hotel){  
    //    name,
    //    cityId,
    //    stars,
    //    address      
    //  }  
    //}`;
    const mutation = ` 
      createHotel(hotel: ` + hotel + `)
        {
          isSuccessful
          customExceptionMessage
        }    
      }
    `;
    super.httpPost(mutation)
      .pipe(map((response) => {
        return response.data;
      }));
  }

  private update(id: number, hotel: IHotel): void {
    const mutation = `
      updateHotel ($hotel : hotel!){  
        updateHotel(hotel : $hotel){  
          name,
          cityId,
          stars,
          address      
        }  
      }
    `;
    super.httpPost(mutation)
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
    deleteHotel ($id : id!){  
      deleteHotel(id : $id){       
      }  
    }
    `;
    super.httpPost(mutation)
      .subscribe(result => {
        this.onSuccess(result);
      }, error => {
        this.onError(error);
      });
  }

  protected onSuccess(result): void {
    if (result.isSuccessful) {
      this.operationCompleted.next(true);
    }
    else {
      this.operationCompleted.next(false);
      this.modalService.showError(result.customExceptionMessage);
    }
  }

  protected onError(error): void {
    super.showError(error);
    this.operationCompleted.next(false);
  }

}
