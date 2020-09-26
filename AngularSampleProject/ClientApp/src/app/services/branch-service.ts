import { EventEmitter, Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IBranch } from '../models/Ibranch.model';
import { Observable, Subject } from 'rxjs';
import { BaseService } from './base-service';

@Injectable({ providedIn: 'root' })
export class BranchService extends BaseService {

  protected controllerName: string = 'Branch';

  selectedBankChanged = new Subject<number>();
  selectedChanged = new Subject<IBranch>();
  saveCompleted = new EventEmitter();
  public count: number;

  constructor(http: HttpClient,
    @Inject('BASE_URL') baseUrl: string) {
    super(http, baseUrl);
  }

  changeBank(bankId: number): void {
    this.selectedBankChanged.next(bankId);
  }

  select(branch: IBranch): void {
    this.selectedChanged.next(branch);
  }

  getItem(id: number): Observable<IBranch> {
    return super.httpGet<IBranch>('ItemAsync/' + id);
  }

  getListByBankId(bankId: number): Observable<IBranch[]> {
    return super.httpGet<IBranch[]>('ListAsync/' + bankId);
  }

  getCountByBankId(bankId: number): Observable<number> {
    return super.httpGet<number>('CountAsync/' + bankId);
  }

  insert(branch: IBranch): void {
    super.httpPost('InsertAsync', branch);
  }

  update(id: number, branch: IBranch): void {
    super.httpPut('UpdateAsync/' + id, branch);
  }

  delete(id: number): void {
    super.httpDelete('DeleteAsync/' + id);
  }

  deleteByBankIdAsync(bankId: number): void {
    super.httpDelete('DeleteByBankIdAsync/' + bankId);
  }

}
