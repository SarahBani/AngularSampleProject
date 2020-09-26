import { EventEmitter, Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IBank } from '../models/Ibank.model';
import { Observable, Subject } from 'rxjs';
import { BaseService } from './base-service';

@Injectable({ providedIn: 'root' })
export class BankService extends BaseService {

  protected controllerName: string = 'Bank';

  public count: number;

  public saveCompleted = new EventEmitter();
  public selectedChanged = new Subject<IBank>();

  constructor(http: HttpClient,
    @Inject('BASE_URL') baseUrl: string) {
    super(http, baseUrl);
  }

  public select(bank: IBank): void {
    this.selectedChanged.next(bank);
  }

  public getItem(id: number): Observable<IBank> {
    return super.httpGetItem<IBank>(id);
    //return super.httpGet<IBank>('ItemAsync/' + id);
  }

  public getList(): Observable<IBank[]> {
    return super.httpGetAll<IBank>();
    //return super.httpGet<IBank[]>('ListAsync');  
  }

  public getCount(): Observable<number> {
    return super.httpCount();
    //return super.httpGet<number>('CountAsync');
  }

  public insert(bank: IBank): void {
    super.httpPost<IBank>('bank/InsertAsync', bank, this.saveCompleted);
  }

  public update(id: number, bank: IBank): void {
    super.httpPut('bank/UpdateAsync/' + id, bank, this.saveCompleted);
  }

  public delete(id: number): void {
    super.httpDelete('bank/DeleteAsync/' + id, this.saveCompleted);
  }

}
