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

  public changeBank(bankId: number): void {
    this.selectedBankChanged.next(bankId);
  }

  public select(branch: IBranch): void {
    this.selectedChanged.next(branch);
  }

  public getItem(id: number): Observable<IBranch> {
    return super.httpGetItem<IBranch>(id);
  }

  public getListByBankId(bankId: number): Observable<IBranch[]> {
    return super.httpGet<IBranch[]>('ListAsync?bankId=' + bankId);
  }

  public getCountByBankId(bankId: number): Observable<number> {
    return super.httpGet<number>('CountAsync?bankId=' + bankId);
  }

  public save(branch: IBranch): void {
    if (branch.id > 0) {
      this.update(branch.id, branch);
    }
    else {
      this.insert(branch);
    }
  }

  private insert(branch: IBranch): void {
    super.httpPost('InsertAsync/', branch, this.dataChanged);
  }

  private update(id: number, branch: IBranch): void {
    super.httpPut('UpdateAsync/' + id, branch, this.dataChanged);
  }

  public delete(id: number): void {
    if (id > 0) {
      this.confirmDeleteSubscription = super.confirmDelete().subscribe((result: boolean) => {
        if (result) {
          super.httpDelete('DeleteAsync/' + id, this.dataChanged);
        }
        this.confirmDeleteSubscription.unsubscribe();
      });
    }
  }

  public deleteByBankIdAsync(bankId: number): void {
    super.httpDelete('DeleteByBankIdAsync?bankId=' + bankId);
  }

  public ngOnDestroy(): void {
    this.confirmDeleteSubscription.unsubscribe();
  }

}
