import { EventEmitter, Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IBank } from '../models/Ibank.model';
import { Observable, Subject } from 'rxjs';
import { BaseService } from './base-service';

@Injectable({ providedIn: 'root' })
export class BankService extends BaseService {

  protected controllerName: string = 'Bank';
  public count: number;
  public selectedChanged = new Subject<IBank>();
  public dataUpdated = new Subject<void>();
  //public saveCompleted = new EventEmitter();

  constructor(http: HttpClient,
    @Inject('BASE_URL') baseUrl: string) {
    super(http, baseUrl);
  }

  public select(bank: IBank): void {
    this.selectedChanged.next(bank);
  }

  public getItem(id: number): Observable<IBank> {
    return super.httpGetItem<IBank>(id);
  }

  public getList(): Observable<IBank[]> {
    return super.httpGetAll<IBank>();
  }

  public getCount(): Observable<number> {
    return super.httpGetCount();
  }

  public save(bank: IBank): void {
    if (bank.id > 0) {
      this.update(bank.id, bank);
    }
    else {
      this.insert(bank);
    }
  }

  private insert(bank: IBank) {
    super.httpPost<IBank>('InsertAsync', bank, this.dataUpdated);
  }

  private update(id: number, bank: IBank) {
    super.httpPut('UpdateAsync/' + id, bank, this.dataUpdated);
  }

  public delete(id: number): void {
    super.httpDelete('DeleteAsync/' + id, this.dataUpdated);
  }

  public uploadLogo(file: File): Observable<any> {
    return super.postFile('UploadLogo/', file);
  }

}
