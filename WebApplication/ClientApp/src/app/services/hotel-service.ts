import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IHotel } from '../models/Ihotel.model';
import { Observable, Subject, Subscription } from 'rxjs';
import { BaseService } from './base-service';
import { ModalService } from './modal-service';
import { ExceptionHandlerService } from './exception-handler-service';
import { ILoaderService } from './ILoader-service';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class HotelService extends BaseService implements ILoaderService {

  protected controllerName: string = 'Hotel';
  public operationCompleted: Subject<boolean> = new Subject<boolean>();
  private confirmDeleteSubscription: Subscription;
  public changeLoaderStatus: Subject<boolean> = new Subject<boolean>();

  constructor(http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    modalService: ModalService,
    exceptionHandlerService: ExceptionHandlerService) {
    super(http, baseUrl, modalService, exceptionHandlerService);
  }

  public getItem(id: number): Observable<IHotel> {
    return super.httpGetItem<IHotel>(id);
  }

  public getList()//: Observable<IHotel[]>
  {
    //return super.httpGetAll<IHotel>();
    //const query = `?query=
    //{
    //  posts (id:10){
    //    id
    //    title
    //    body
    //    userId
    //    comment {
    //      id
    //      email
    //      body
    //      name
    //      postId
    //    }
    //  }
    //}`;
    const query = `?query=
    {
      hotels {
        id
        name
      }
    }`;
    return this.httpClient.get < { data, extensions }>(`graphql/query=${query}`)
      .pipe(map((response) => {
        return response.data.hotels;
      }));
  }

  public getCount(): Observable<number> {
    return super.httpGetCount();
  }

  public save(hotel: IHotel): void {
    if (hotel.id > 0) {
      this.update(hotel.id, hotel);
    }
    else {
      this.insert(hotel);
    }
  }

  private insert(hotel: IHotel): void {
    super.httpPost<IHotel>('InsertAsync', hotel)
      .subscribe(result => {
        this.onSuccess(result);
      }, error => {
        this.onError(error);
      });
  }

  private update(id: number, hotel: IHotel): void {
    super.httpPut('UpdateAsync/' + id, hotel)
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
    super.httpDelete('DeleteAsync/' + id)
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
