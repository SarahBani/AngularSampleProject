import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IBranch } from '../models/Ibranch.model';
import { Observable, Subject, Subscription } from 'rxjs';
import { BaseRestService } from './base-rest-service';
import { ModalService } from './modal-service';
import { ExceptionHandlerService } from './exception-handler-service';
import { ILoaderService } from './ILoader-service';

@Injectable({ providedIn: 'root' })
export class BranchService extends BaseRestService implements ILoaderService {

  protected controllerName: string = 'Branch';
  public count: number;
  public selectedBankChanged: Subject<number> = new Subject<number>();
  public changeLoaderStatus: Subject<boolean> = new Subject<boolean>();

  constructor(http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    modalService: ModalService,
    exceptionHandlerService: ExceptionHandlerService) {
    super(http, baseUrl, modalService, exceptionHandlerService);
  }

  public changeBank(bankId: number): void {
    this.selectedBankChanged.next(bankId);
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
    super.httpPost('InsertAsync/', branch)
      .subscribe(result => {
        this.onSuccess(result);
      }, error => {
        this.onError(error);
      });
  }

  private update(id: number, branch: IBranch): void {
    super.httpPut('UpdateAsync/' + id, branch)
      .subscribe(result => {
        this.onSuccess(result);
      }, error => {
        this.onError(error);
      });
  }

  public delete(id: number): void {
    if (id > 0) {
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

  public deleteByBankIdAsync(bankId: number): void {
    super.httpDelete('DeleteByBankIdAsync?bankId=' + bankId)
      .subscribe(result => {
        this.onSuccess(result);
      }, error => {
        this.onError(error);
      });
  }

}
