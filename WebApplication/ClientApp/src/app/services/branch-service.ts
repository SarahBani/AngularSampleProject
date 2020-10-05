import { Inject, Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IBranch } from '../models/Ibranch.model';
import { Observable, Subject, Subscription } from 'rxjs';
import { BaseService } from './base-service';
import { ModalService } from './modal-service';
import { ExceptionHandlerService } from './exception-handler-service';

@Injectable({ providedIn: 'root' })
export class BranchService extends BaseService implements OnDestroy {

  protected controllerName: string = 'Branch';
  public count: number;

  public selectedBankChanged = new Subject<number>();
  public selectedChanged = new Subject<IBranch>();
  public dataChanged = new Subject<void>();
  private confirmDeleteSubscription: Subscription;

  constructor(http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    modalService: ModalService,
    exceptionHandlerService: ExceptionHandlerService) {
    super(http, baseUrl, modalService, exceptionHandlerService);
  }

  changeBank(bankId: number): void {
    this.selectedBankChanged.next(bankId);
  }

  select(branch: IBranch): void {
    this.selectedChanged.next(branch);
  }

  getItem(id: number): Observable<IBranch> {
    return super.httpGetItem<IBranch>(id);
  }

  getListByBankId(bankId: number): Observable<IBranch[]> {
    return super.httpGet<IBranch[]>('ListAsync/' + bankId);
  }

  getCountByBankId(bankId: number): Observable<number> {
    return super.httpGet<number>('CountAsync/' + bankId);
  }

  insert(branch: IBranch): void {
    super.httpPost('InsertAsync/', branch);
  }

  update(id: number, branch: IBranch): void {
    super.httpPut('UpdateAsync/' + id, branch);
  }

  delete(id: number): void {
    if (id > 0) {
      this.confirmDeleteSubscription = super.confirmDelete().subscribe((result: boolean) => {
        if (result) {
          super.httpDelete('DeleteAsync/' + id, this.dataChanged);
        }
      });
    }
  }

  deleteByBankIdAsync(bankId: number): void {
    super.httpDelete('DeleteByBankIdAsync/' + bankId);
  }

  public ngOnDestroy(): void {
    this.confirmDeleteSubscription.unsubscribe();
  }

}
